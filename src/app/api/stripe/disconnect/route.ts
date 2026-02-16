/**
 * Stripe Connect Disconnect Endpoint
 *
 * Allow users to disconnect their Stripe account.
 * Deauthorizes the OAuth connection on Stripe's side and removes it locally.
 *
 * POST /api/stripe/disconnect
 * Body: { stripeAccountId?: string }   (optional — disconnects the first active if omitted)
 */

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import {
  hasActiveConnection,
  removeConnectedAccount,
} from "@/lib/connected-accounts";

function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-01-28.clover",
  });
}

export async function POST(request: NextRequest) {
  try {
    let targetAccountId: string | undefined;

    // Accept optional body with stripeAccountId
    try {
      const body = await request.json();
      targetAccountId = body.stripeAccountId;
    } catch {
      // empty body is fine
    }

    // If no specific account requested, disconnect the first active one
    if (!targetAccountId) {
      const { connected, account } = await hasActiveConnection();
      if (!connected || !account) {
        return NextResponse.json(
          { error: "No connected Stripe account found" },
          { status: 404 }
        );
      }
      targetAccountId = account.stripeAccountId;
    }

    // 1. Deauthorize on Stripe's side
    const clientId = process.env.STRIPE_CONNECT_CLIENT_ID;
    if (clientId && clientId !== "ca_placeholder") {
      try {
        const stripe = getStripe();
        await stripe.oauth.deauthorize({
          client_id: clientId,
          stripe_user_id: targetAccountId,
        });
        console.log(
          `[Stripe Disconnect] Deauthorized account ${targetAccountId} on Stripe`
        );
      } catch (stripeErr) {
        // Log but don't fail — the account might already be deauthorized
        console.error(
          `[Stripe Disconnect] Stripe deauthorize error (non-fatal):`,
          stripeErr
        );
      }
    }

    // 2. Remove from our local store
    const removed = await removeConnectedAccount(targetAccountId);

    if (!removed) {
      return NextResponse.json(
        { error: "Account not found in local store" },
        { status: 404 }
      );
    }

    console.log(
      `[Stripe Disconnect] Removed account ${targetAccountId} from local store`
    );

    return NextResponse.json({
      success: true,
      disconnectedAccountId: targetAccountId,
      message: "Stripe account disconnected successfully",
    });
  } catch (error: unknown) {
    console.error("[Stripe Disconnect] Error:", error);
    return NextResponse.json(
      { error: "Failed to disconnect Stripe account" },
      { status: 500 }
    );
  }
}
