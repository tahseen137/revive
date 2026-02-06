/**
 * Connected Accounts Store for Revive
 *
 * Simple JSON file-based storage for connected Stripe accounts.
 * Will be replaced with a proper database later.
 *
 * In production (Vercel / serverless), we fall back to the existing
 * db.ts Redis/in-memory layer so the store survives across requests.
 */

import {
  saveConnectedAccount as dbSave,
  getConnectedAccount as dbGet,
  getAllConnectedAccounts as dbGetAll,
  del,
  ConnectedAccount,
} from "./db";

export type { ConnectedAccount } from "./db";

// Re-export through a single unified API

export async function saveConnectedAccount(
  account: ConnectedAccount
): Promise<void> {
  await dbSave(account);
}

export async function getConnectedAccount(
  accountId: string
): Promise<ConnectedAccount | null> {
  return dbGet(accountId);
}

export async function getAllConnectedAccounts(): Promise<ConnectedAccount[]> {
  return dbGetAll();
}

export async function removeConnectedAccount(
  accountId: string
): Promise<boolean> {
  const existing = await dbGet(accountId);
  if (!existing) return false;

  // Mark inactive first, then delete the key
  await dbSave({ ...existing, active: false });
  await del(`connected_account:${accountId}`);
  return true;
}

/**
 * Check if any account is currently connected and active.
 */
export async function hasActiveConnection(): Promise<{
  connected: boolean;
  account: ConnectedAccount | null;
}> {
  const accounts = await dbGetAll();
  const active = accounts.find((a) => a.active);
  return {
    connected: !!active,
    account: active || null,
  };
}
