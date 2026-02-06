/**
 * Database abstraction layer for Revive
 * Uses Upstash Redis when configured, falls back to in-memory store
 * 
 * Data Model:
 * - failed_payment:{id} -> FailedPayment JSON
 * - account:{accountId}:payments -> Set of payment IDs
 * - retry_queue -> Sorted set of payment IDs by nextRetryAt
 * - stats:{accountId} -> RecoveryStats JSON
 * - connected_account:{accountId} -> ConnectedAccount JSON
 */

import { Redis } from "@upstash/redis";
import { v4 as uuidv4 } from "uuid";

// ============ Types ============

export interface FailedPayment {
  id: string;
  stripeInvoiceId: string;
  stripeCustomerId: string;
  stripeSubscriptionId?: string;
  connectedAccountId: string;
  customerEmail: string;
  customerName: string;
  amount: number; // cents
  currency: string;
  failureReason: string;
  failureCode: string;
  retryCount: number;
  maxRetries: number;
  nextRetryAt: number | null; // unix timestamp ms
  status: "pending" | "retrying" | "recovered" | "dunning" | "failed" | "expired_card";
  retryHistory: RetryAttempt[];
  emailsSent: EmailRecord[];
  createdAt: number;
  updatedAt: number;
  recoveredAt: number | null;
}

export interface RetryAttempt {
  attemptNumber: number;
  timestamp: number;
  success: boolean;
  error?: string;
  stripePaymentIntentId?: string;
}

export interface EmailRecord {
  type: "payment_failed" | "card_update_reminder" | "final_warning" | "payment_recovered";
  timestamp: number;
  messageId?: string;
}

export interface ConnectedAccount {
  stripeAccountId: string;
  accessToken: string;
  refreshToken?: string;
  email?: string;
  businessName?: string;
  connectedAt: number;
  active: boolean;
}

export interface RecoveryStats {
  totalFailedAmount: number;
  totalRecoveredAmount: number;
  totalFailedCount: number;
  totalRecoveredCount: number;
  activeRetries: number;
  avgRecoveryRate: number;
  lastUpdated: number;
}

// ============ Database Implementation ============

let redis: Redis | null = null;

function getRedis(): Redis | null {
  if (redis) return redis;
  
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  
  if (url && token) {
    redis = new Redis({ url, token });
    return redis;
  }
  
  return null;
}

// In-memory fallback for development/demo
const memStore = new Map<string, string>();
const memSortedSets = new Map<string, Map<string, number>>();
const memSets = new Map<string, Set<string>>();

// ============ Core Operations ============

export async function set(key: string, value: unknown): Promise<void> {
  const r = getRedis();
  if (r) {
    await r.set(key, JSON.stringify(value));
  } else {
    memStore.set(key, JSON.stringify(value));
  }
}

export async function get<T>(key: string): Promise<T | null> {
  const r = getRedis();
  if (r) {
    const val = await r.get<string>(key);
    if (val === null) return null;
    return typeof val === "string" ? JSON.parse(val) : val as T;
  } else {
    const val = memStore.get(key);
    if (!val) return null;
    return JSON.parse(val) as T;
  }
}

export async function del(key: string): Promise<void> {
  const r = getRedis();
  if (r) {
    await r.del(key);
  } else {
    memStore.delete(key);
  }
}

async function sadd(key: string, member: string): Promise<void> {
  const r = getRedis();
  if (r) {
    await r.sadd(key, member);
  } else {
    if (!memSets.has(key)) memSets.set(key, new Set());
    memSets.get(key)!.add(member);
  }
}

async function smembers(key: string): Promise<string[]> {
  const r = getRedis();
  if (r) {
    return await r.smembers(key);
  } else {
    const s = memSets.get(key);
    return s ? Array.from(s) : [];
  }
}

async function zadd(key: string, score: number, member: string): Promise<void> {
  const r = getRedis();
  if (r) {
    await r.zadd(key, { score, member });
  } else {
    if (!memSortedSets.has(key)) memSortedSets.set(key, new Map());
    memSortedSets.get(key)!.set(member, score);
  }
}

async function zrangebyscore(key: string, min: number, max: number): Promise<string[]> {
  const r = getRedis();
  if (r) {
    return await r.zrange(key, min, max, { byScore: true });
  } else {
    const sorted = memSortedSets.get(key);
    if (!sorted) return [];
    return Array.from(sorted.entries())
      .filter(([, score]) => score >= min && score <= max)
      .sort((a, b) => a[1] - b[1])
      .map(([member]) => member);
  }
}

async function zrem(key: string, member: string): Promise<void> {
  const r = getRedis();
  if (r) {
    await r.zrem(key, member);
  } else {
    memSortedSets.get(key)?.delete(member);
  }
}

// ============ Failed Payment Operations ============

export async function getPaymentByInvoiceId(invoiceId: string): Promise<FailedPayment | null> {
  // Use the invoice index for O(1) lookup
  const paymentId = await get<string>(`invoice:${invoiceId}`);
  if (paymentId) {
    return getFailedPayment(paymentId);
  }
  return null;
}

export async function createFailedPayment(
  data: Omit<FailedPayment, "id" | "retryCount" | "retryHistory" | "emailsSent" | "createdAt" | "updatedAt" | "recoveredAt">
): Promise<FailedPayment> {
  const id = uuidv4();
  const now = Date.now();
  
  const payment: FailedPayment = {
    ...data,
    id,
    retryCount: 0,
    retryHistory: [],
    emailsSent: [],
    createdAt: now,
    updatedAt: now,
    recoveredAt: null,
  };
  
  await set(`failed_payment:${id}`, payment);
  await sadd(`account:${data.connectedAccountId}:payments`, id);
  await sadd("all_payments", id);
  
  // Index by invoice ID for fast lookups & idempotency
  await set(`invoice:${data.stripeInvoiceId}`, id);
  
  // Add to retry queue if scheduled
  if (payment.nextRetryAt) {
    await zadd("retry_queue", payment.nextRetryAt, id);
  }
  
  // Update stats
  await updateStats(data.connectedAccountId, {
    addFailed: data.amount,
    addActiveRetry: payment.status === "pending" || payment.status === "retrying" ? 1 : 0,
  });
  
  return payment;
}

export async function getFailedPayment(id: string): Promise<FailedPayment | null> {
  return get<FailedPayment>(`failed_payment:${id}`);
}

export async function updateFailedPayment(id: string, updates: Partial<FailedPayment>): Promise<FailedPayment | null> {
  const existing = await getFailedPayment(id);
  if (!existing) return null;
  
  const updated: FailedPayment = {
    ...existing,
    ...updates,
    updatedAt: Date.now(),
  };
  
  await set(`failed_payment:${id}`, updated);
  
  // Update retry queue
  if (updates.nextRetryAt !== undefined) {
    if (updates.nextRetryAt) {
      await zadd("retry_queue", updates.nextRetryAt, id);
    } else {
      await zrem("retry_queue", id);
    }
  }
  
  return updated;
}

export async function getPaymentsDueForRetry(): Promise<FailedPayment[]> {
  const now = Date.now();
  const ids = await zrangebyscore("retry_queue", 0, now);
  
  const payments: FailedPayment[] = [];
  for (const id of ids) {
    const payment = await getFailedPayment(id);
    if (payment && (payment.status === "pending" || payment.status === "retrying")) {
      payments.push(payment);
    }
  }
  
  return payments;
}

export async function getPaymentsByAccount(accountId: string): Promise<FailedPayment[]> {
  const ids = await smembers(`account:${accountId}:payments`);
  const payments: FailedPayment[] = [];
  
  for (const id of ids) {
    const payment = await getFailedPayment(id);
    if (payment) payments.push(payment);
  }
  
  return payments.sort((a, b) => b.createdAt - a.createdAt);
}

export async function getAllPayments(): Promise<FailedPayment[]> {
  const ids = await smembers("all_payments");
  const payments: FailedPayment[] = [];
  
  for (const id of ids) {
    const payment = await getFailedPayment(id);
    if (payment) payments.push(payment);
  }
  
  return payments.sort((a, b) => b.createdAt - a.createdAt);
}

// ============ Connected Account Operations ============

export async function saveConnectedAccount(account: ConnectedAccount): Promise<void> {
  await set(`connected_account:${account.stripeAccountId}`, account);
  await sadd("all_connected_accounts", account.stripeAccountId);
}

export async function getConnectedAccount(accountId: string): Promise<ConnectedAccount | null> {
  return get<ConnectedAccount>(`connected_account:${accountId}`);
}

export async function getAllConnectedAccounts(): Promise<ConnectedAccount[]> {
  const ids = await smembers("all_connected_accounts");
  const accounts: ConnectedAccount[] = [];
  
  for (const id of ids) {
    const account = await getConnectedAccount(id);
    if (account) accounts.push(account);
  }
  
  return accounts;
}

// ============ Stats Operations ============

async function updateStats(
  accountId: string,
  delta: { addFailed?: number; addRecovered?: number; addActiveRetry?: number; removeActiveRetry?: number }
): Promise<void> {
  const existing = await get<RecoveryStats>(`stats:${accountId}`) || {
    totalFailedAmount: 0,
    totalRecoveredAmount: 0,
    totalFailedCount: 0,
    totalRecoveredCount: 0,
    activeRetries: 0,
    avgRecoveryRate: 0,
    lastUpdated: Date.now(),
  };
  
  if (delta.addFailed) {
    existing.totalFailedAmount += delta.addFailed;
    existing.totalFailedCount += 1;
  }
  if (delta.addRecovered) {
    existing.totalRecoveredAmount += delta.addRecovered;
    existing.totalRecoveredCount += 1;
  }
  if (delta.addActiveRetry) {
    existing.activeRetries += delta.addActiveRetry;
  }
  if (delta.removeActiveRetry) {
    existing.activeRetries = Math.max(0, existing.activeRetries - delta.removeActiveRetry);
  }
  
  existing.avgRecoveryRate = existing.totalFailedCount > 0
    ? (existing.totalRecoveredCount / existing.totalFailedCount) * 100
    : 0;
  existing.lastUpdated = Date.now();
  
  await set(`stats:${accountId}`, existing);
  
  // Also update global stats
  const globalStats = await get<RecoveryStats>("stats:global") || {
    totalFailedAmount: 0,
    totalRecoveredAmount: 0,
    totalFailedCount: 0,
    totalRecoveredCount: 0,
    activeRetries: 0,
    avgRecoveryRate: 0,
    lastUpdated: Date.now(),
  };
  
  if (delta.addFailed) {
    globalStats.totalFailedAmount += delta.addFailed;
    globalStats.totalFailedCount += 1;
  }
  if (delta.addRecovered) {
    globalStats.totalRecoveredAmount += delta.addRecovered;
    globalStats.totalRecoveredCount += 1;
  }
  if (delta.addActiveRetry) {
    globalStats.activeRetries += delta.addActiveRetry;
  }
  if (delta.removeActiveRetry) {
    globalStats.activeRetries = Math.max(0, globalStats.activeRetries - delta.removeActiveRetry);
  }
  
  globalStats.avgRecoveryRate = globalStats.totalFailedCount > 0
    ? (globalStats.totalRecoveredCount / globalStats.totalFailedCount) * 100
    : 0;
  globalStats.lastUpdated = Date.now();
  
  await set("stats:global", globalStats);
}

export async function getStats(accountId?: string): Promise<RecoveryStats> {
  const key = accountId ? `stats:${accountId}` : "stats:global";
  return await get<RecoveryStats>(key) || {
    totalFailedAmount: 0,
    totalRecoveredAmount: 0,
    totalFailedCount: 0,
    totalRecoveredCount: 0,
    activeRetries: 0,
    avgRecoveryRate: 0,
    lastUpdated: Date.now(),
  };
}

export async function markPaymentRecovered(paymentId: string): Promise<FailedPayment | null> {
  const payment = await getFailedPayment(paymentId);
  if (!payment) return null;
  
  const now = Date.now();
  const updated = await updateFailedPayment(paymentId, {
    status: "recovered",
    recoveredAt: now,
    nextRetryAt: null,
  });
  
  await zrem("retry_queue", paymentId);
  
  await updateStats(payment.connectedAccountId, {
    addRecovered: payment.amount,
    removeActiveRetry: 1,
  });
  
  return updated;
}

export async function markPaymentFinalFailed(paymentId: string): Promise<FailedPayment | null> {
  const payment = await getFailedPayment(paymentId);
  if (!payment) return null;
  
  const updated = await updateFailedPayment(paymentId, {
    status: "failed",
    nextRetryAt: null,
  });
  
  await zrem("retry_queue", paymentId);
  
  await updateStats(payment.connectedAccountId, {
    removeActiveRetry: 1,
  });
  
  return updated;
}

// ============ Health Check ============

export async function dbHealthCheck(): Promise<{ connected: boolean; type: string }> {
  const r = getRedis();
  if (r) {
    try {
      await r.ping();
      return { connected: true, type: "upstash-redis" };
    } catch {
      return { connected: false, type: "upstash-redis" };
    }
  }
  return { connected: true, type: "in-memory" };
}
