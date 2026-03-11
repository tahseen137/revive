/**
 * Win-back Campaign System for Revive
 * 
 * Targets churned customers (cancelled subscriptions) with personalized
 * re-engagement emails at 30, 60, and 90 days post-churn.
 * 
 * Expected win-back rate: 20-30% (Churnkey reports 34%)
 */

import { v4 as uuidv4 } from "uuid";
import { set, get, del } from "./db";

// ============ Types ============

export interface ChurnedCustomer {
  id: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  connectedAccountId: string;
  customerEmail: string;
  customerName: string;
  planName?: string;
  planAmount?: number; // cents
  currency: string;
  churnedAt: number; // unix timestamp ms
  churnReason?: "cancellation" | "payment_failed" | "trial_ended" | "downgrade";
  emailsSent: WinbackEmailRecord[];
  status: "active" | "reactivated" | "exhausted"; // active=eligible for emails, exhausted=all 3 sent
  reactivatedAt: number | null;
  createdAt: number;
  updatedAt: number;
}

export interface WinbackEmailRecord {
  type: "winback_30" | "winback_60" | "winback_90";
  timestamp: number;
  messageId?: string;
  offerCode?: string; // Stripe coupon code if personalized offer included
}

export interface WinbackOffer {
  discountPercent?: number; // e.g., 20 for 20% off
  discountMonths?: number; // how many months discount applies
  couponCode?: string; // Stripe coupon code
  message: string; // e.g., "Get 20% off for 3 months"
}

// ============ Database Keys ============

function churnKey(id: string): string {
  return `churned_customer:${id}`;
}

function accountChurnKey(accountId: string): string {
  return `account:${accountId}:churned_customers`;
}

function winbackQueueKey(): string {
  return "winback_queue";
}

// ============ Core Operations ============

export async function createChurnedCustomer(params: {
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  connectedAccountId: string;
  customerEmail: string;
  customerName: string;
  planName?: string;
  planAmount?: number;
  currency: string;
  churnReason?: ChurnedCustomer["churnReason"];
}): Promise<ChurnedCustomer> {
  const id = uuidv4();
  const now = Date.now();

  const customer: ChurnedCustomer = {
    id,
    stripeCustomerId: params.stripeCustomerId,
    stripeSubscriptionId: params.stripeSubscriptionId,
    connectedAccountId: params.connectedAccountId,
    customerEmail: params.customerEmail,
    customerName: params.customerName,
    planName: params.planName,
    planAmount: params.planAmount,
    currency: params.currency,
    churnedAt: now,
    churnReason: params.churnReason || "cancellation",
    emailsSent: [],
    status: "active",
    reactivatedAt: null,
    createdAt: now,
    updatedAt: now,
  };

  await set(churnKey(id), customer);
  
  // Add to account's churned customers set
  // (In a real implementation with Redis, we'd use SADD here)
  const accountKey = accountChurnKey(params.connectedAccountId);
  const existingIds = await get<string[]>(accountKey) || [];
  await set(accountKey, [...existingIds, id]);

  return customer;
}

export async function getChurnedCustomer(id: string): Promise<ChurnedCustomer | null> {
  return await get<ChurnedCustomer>(churnKey(id));
}

export async function updateChurnedCustomer(
  id: string,
  updates: Partial<ChurnedCustomer>
): Promise<ChurnedCustomer> {
  const existing = await getChurnedCustomer(id);
  if (!existing) {
    throw new Error(`Churned customer ${id} not found`);
  }

  const updated: ChurnedCustomer = {
    ...existing,
    ...updates,
    updatedAt: Date.now(),
  };

  await set(churnKey(id), updated);
  return updated;
}

export async function markReactivated(id: string): Promise<ChurnedCustomer> {
  return updateChurnedCustomer(id, {
    status: "reactivated",
    reactivatedAt: Date.now(),
  });
}

export async function getChurnedCustomersByAccount(
  accountId: string
): Promise<ChurnedCustomer[]> {
  const accountKey = accountChurnKey(accountId);
  const ids = await get<string[]>(accountKey) || [];
  
  const customers = await Promise.all(
    ids.map(id => getChurnedCustomer(id))
  );
  
  return customers.filter((c): c is ChurnedCustomer => c !== null);
}

// ============ Win-back Email Logic ============

/**
 * Determine which win-back email (if any) should be sent
 * Returns null if no email is due
 */
export function getNextWinbackEmailType(
  customer: ChurnedCustomer
): "winback_30" | "winback_60" | "winback_90" | null {
  if (customer.status !== "active") return null;

  const daysSinceChurn = Math.floor(
    (Date.now() - customer.churnedAt) / (1000 * 60 * 60 * 24)
  );

  const sentTypes = new Set(customer.emailsSent.map(e => e.type));

  // 90-day email (send on day 90+)
  if (daysSinceChurn >= 90 && !sentTypes.has("winback_90")) {
    return "winback_90";
  }

  // 60-day email (send on day 60-89)
  if (daysSinceChurn >= 60 && !sentTypes.has("winback_60")) {
    return "winback_60";
  }

  // 30-day email (send on day 30-59)
  if (daysSinceChurn >= 30 && !sentTypes.has("winback_30")) {
    return "winback_30";
  }

  return null;
}

/**
 * Generate personalized offer based on churn stage and customer history
 */
export function generateWinbackOffer(
  customer: ChurnedCustomer,
  emailType: "winback_30" | "winback_60" | "winback_90"
): WinbackOffer {
  // Progressive offers: more generous the longer they've been gone
  switch (emailType) {
    case "winback_30":
      // Early win-back: modest offer
      return {
        discountPercent: 15,
        discountMonths: 2,
        message: "Welcome back! Get 15% off for 2 months",
      };

    case "winback_60":
      // Mid-stage: stronger offer
      return {
        discountPercent: 25,
        discountMonths: 3,
        message: "We miss you! Get 25% off for 3 months",
      };

    case "winback_90":
      // Last chance: most generous offer
      return {
        discountPercent: 30,
        discountMonths: 3,
        message: "Last chance! Get 30% off for 3 months",
      };
  }
}

/**
 * Record that a win-back email was sent
 */
export async function recordWinbackEmailSent(
  customerId: string,
  emailType: "winback_30" | "winback_60" | "winback_90",
  messageId?: string,
  offerCode?: string
): Promise<void> {
  const customer = await getChurnedCustomer(customerId);
  if (!customer) return;

  const emailRecord: WinbackEmailRecord = {
    type: emailType,
    timestamp: Date.now(),
    messageId,
    offerCode,
  };

  customer.emailsSent.push(emailRecord);

  // If all 3 emails sent, mark as exhausted
  const sentTypes = new Set(customer.emailsSent.map(e => e.type));
  if (sentTypes.size === 3) {
    customer.status = "exhausted";
  }

  await updateChurnedCustomer(customerId, {
    emailsSent: customer.emailsSent,
    status: customer.status,
  });
}

/**
 * Get all customers eligible for win-back emails RIGHT NOW
 */
export async function getEligibleWinbackCustomers(
  accountId?: string
): Promise<Array<{ customer: ChurnedCustomer; emailType: string }>> {
  // Get all active churned customers
  // In production with Redis, we'd query a sorted set by churnedAt
  // For now, we'll fetch all and filter in memory
  
  const allCustomers: ChurnedCustomer[] = [];
  
  if (accountId) {
    allCustomers.push(...await getChurnedCustomersByAccount(accountId));
  } else {
    // In production, we'd iterate through all accounts
    // For MVP, we'll assume single account or pass accountId
    console.warn("getEligibleWinbackCustomers: accountId required for production");
  }

  const eligible: Array<{ customer: ChurnedCustomer; emailType: string }> = [];

  for (const customer of allCustomers) {
    const emailType = getNextWinbackEmailType(customer);
    if (emailType) {
      eligible.push({ customer, emailType: emailType as string });
    }
  }

  return eligible;
}
