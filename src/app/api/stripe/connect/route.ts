/**
 * Stripe Connect — Modern Account Links Flow
 *
 * Creates an Express connected account and redirects the user to
 * Stripe's hosted onboarding. This replaces the deprecated Standard
 * OAuth flow that Stripe disabled for new integrations.
 *
 * Flow:
 *   1. POST /api/stripe/connect → create Express account → account link → redirect
 *   2. User completes Stripe onboarding
 *   3. Stripe redirects to /api/stripe/callback?account=acct_xxx
 *   4. Callback saves the account and routes to /onboarding → /dashboard
 *
 * GET also works (for <a href> links) — creates account + redirects.
 */

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-01-28.clover",
  });
}

async function handleConnect(request: NextRequest) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://revive-hq.com";

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Stripe is not configured. Please set STRIPE_SECRET_KEY." },
      { status: 500 }
    );
  }

  try {
    const stripe = getStripe();

    // Step 1: Create an Express connected account
    const account = await stripe.accounts.create({
      type: "express",
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      settings: {
        payouts: {
          schedule: {
            interval: "manual",
          },
        },
      },
    });

    console.log(
      `[Stripe Connect] Created Express account: ${account.id}`
    );

    // Step 2: Create an Account Link for onboarding
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${baseUrl}/api/stripe/connect?retry=true`,
      return_url: `${baseUrl}/api/stripe/callback?account=${account.id}`,
      type: "account_onboarding",
    });

    // Step 3: Redirect to Stripe's hosted onboarding
    return NextResponse.redirect(accountLink.url);
  } catch (err: unknown) {
    console.error("[Stripe Connect] Account creation error:", err);
    const message =
      err instanceof Error ? err.message : "Failed to start Stripe connection";
    return NextResponse.redirect(
      `${baseUrl}/pricing?connect_error=${encodeURIComponent(message)}`
    );
  }
}

export async function GET(request: NextRequest) {
  return handleConnect(request);
}

export async function POST(request: NextRequest) {
  return handleConnect(request);
}
