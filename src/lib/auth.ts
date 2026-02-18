/**
 * Authentication utilities for Revive API endpoints
 * 
 * Supports:
 * - Bearer token auth via API_SECRET_KEY (for API endpoints)
 * - Constant-time comparison to prevent timing attacks
 * - Card update token generation and validation with one-time use
 */

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { get, set } from "@/lib/db";

/**
 * Constant-time string comparison to prevent timing attacks.
 * Returns true if both strings are equal.
 */
function timingSafeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

/**
 * Require Bearer token authentication on an API endpoint.
 * Accepts auth via:
 *   1. Authorization: Bearer <API_SECRET_KEY> header
 *   2. `revive_session` cookie (set during dashboard login)
 * 
 * Returns null if auth passes, or a NextResponse error to return immediately.
 * 
 * Usage:
 *   const authError = requireAuth(request);
 *   if (authError) return authError;
 */
export function requireAuth(request: NextRequest): NextResponse | null {
  const apiKey = process.env.API_SECRET_KEY;

  if (!apiKey) {
    console.error("[Auth] API_SECRET_KEY not configured — denying access");
    return NextResponse.json(
      { error: "Server misconfigured" },
      { status: 500 }
    );
  }

  // Check Authorization header first
  const authHeader = request.headers.get("Authorization");
  if (authHeader) {
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.substring(7)
      : authHeader;

    if (timingSafeCompare(token, apiKey)) {
      return null; // Auth passed via header
    }
  }

  // Check session cookie (for dashboard frontend)
  const sessionCookie = request.cookies.get("revive_session")?.value;
  if (sessionCookie && timingSafeCompare(sessionCookie, apiKey)) {
    return null; // Auth passed via cookie
  }

  return NextResponse.json(
    { error: "Unauthorized" },
    { status: 401 }
  );
}

/**
 * Require admin secret authentication.
 * Uses ADMIN_SECRET env var with constant-time comparison.
 * Denies access if ADMIN_SECRET is not configured.
 */
export function requireAdminAuth(request: NextRequest): NextResponse | null {
  const adminSecret = process.env.ADMIN_SECRET;

  if (!adminSecret) {
    console.error("[Auth] ADMIN_SECRET not configured — denying access");
    return NextResponse.json(
      { error: "Server misconfigured" },
      { status: 500 }
    );
  }

  const authHeader = request.headers.get("Authorization");
  if (!authHeader) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.substring(7)
    : authHeader;

  if (!timingSafeCompare(token, adminSecret)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  return null; // Auth passed
}

/**
 * Require cron secret authentication.
 * Uses CRON_SECRET env var. Denies access if not configured.
 */
export function requireCronAuth(request: NextRequest): NextResponse | null {
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    console.error("[Auth] CRON_SECRET not configured — denying access");
    return NextResponse.json(
      { error: "Server misconfigured" },
      { status: 500 }
    );
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.substring(7)
    : authHeader;

  if (!timingSafeCompare(token, cronSecret)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  return null; // Auth passed
}

/**
 * Generate HMAC-based token for card update URLs.
 * Token format: base64url(paymentId:customerId:expiry:hmac)
 */
export function generateCardUpdateToken(paymentId: string, customerId: string): string {
  const secret = process.env.CARD_UPDATE_SECRET;
  if (!secret) throw new Error("CARD_UPDATE_SECRET not configured");

  const expiry = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
  const data = `${paymentId}:${customerId}:${expiry}`;
  const hmac = crypto.createHmac("sha256", secret).update(data).digest("hex");
  return Buffer.from(`${data}:${hmac}`).toString("base64url");
}

/**
 * Validate an HMAC-based card update token.
 * Returns { paymentId, customerId } if valid, null otherwise.
 */
export function validateCardUpdateToken(token: string): { paymentId: string; customerId: string } | null {
  const secret = process.env.CARD_UPDATE_SECRET;
  if (!secret) return null;

  try {
    const decoded = Buffer.from(token, "base64url").toString("utf-8");
    const parts = decoded.split(":");
    if (parts.length !== 4) return null;

    const [paymentId, customerId, expiryStr, providedHmac] = parts;
    const expiry = parseInt(expiryStr, 10);

    // Check expiry
    if (Date.now() > expiry) return null;

    // Verify HMAC
    const data = `${paymentId}:${customerId}:${expiryStr}`;
    const expectedHmac = crypto.createHmac("sha256", secret).update(data).digest("hex");

    if (!timingSafeCompare(providedHmac, expectedHmac)) return null;

    return { paymentId, customerId };
  } catch {
    return null;
  }
}

/**
 * Check if a card update token has already been used.
 * Returns true if token was previously invalidated.
 */
export async function isTokenUsed(token: string): Promise<boolean> {
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  const used = await get<number>(`token_used:${tokenHash}`);
  return used !== null;
}

/**
 * Invalidate a card update token after successful use.
 * Stores the token hash with a 7-day TTL matching token expiry.
 */
export async function invalidateCardUpdateToken(token: string): Promise<void> {
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  // Store with timestamp - TTL handled by Redis if configured
  await set(`token_used:${tokenHash}`, Date.now());
}
