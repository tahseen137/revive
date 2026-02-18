/**
 * Stripe Connect Status Endpoint
 *
 * Check if a user has connected their Stripe account.
 *
 * GET /api/stripe/status
 */

import { NextRequest, NextResponse } from "next/server";
import {
  hasActiveConnection,
  getAllConnectedAccounts,
} from "@/lib/connected-accounts";
import { requireAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  // Require authentication
  const authError = requireAuth(request);
  if (authError) return authError;

  try {
    const { connected, account } = await hasActiveConnection();

    if (!connected || !account) {
      return NextResponse.json({
        connected: false,
        account: null,
      });
    }

    // Return safe subset — never expose tokens
    return NextResponse.json({
      connected: true,
      account: {
        stripeAccountId: account.stripeAccountId,
        email: account.email || null,
        businessName: account.businessName || null,
        connectedAt: account.connectedAt,
      },
      // Also include total connected count for admin purposes
      totalAccounts: (await getAllConnectedAccounts()).filter((a) => a.active)
        .length,
    });
  } catch (error: unknown) {
    console.error("[Stripe Status] Error:", error);
    return NextResponse.json(
      { error: "Failed to check connection status" },
      { status: 500 }
    );
  }
}
