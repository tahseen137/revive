/**
 * Stripe Connect OAuth Redirect Endpoint
 *
 * Generates the Stripe Connect OAuth URL and redirects the user to
 * Stripe's authorization page. Uses Express accounts (simplest for
 * customers).
 *
 * GET /api/stripe/connect?return=onboarding
 */

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const clientId = process.env.STRIPE_CONNECT_CLIENT_ID;
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://revive-hq.com";

  if (!clientId || clientId === "ca_placeholder") {
    return NextResponse.json(
      {
        error: "Stripe Connect is not configured yet. Please set STRIPE_CONNECT_CLIENT_ID.",
      },
      { status: 500 }
    );
  }

  // Preserve where we should return after the OAuth flow
  const { searchParams } = new URL(request.url);
  const returnTo = searchParams.get("return") || "dashboard";

  // Build the Stripe Connect OAuth URL for Express accounts
  const connectUrl = new URL("https://connect.stripe.com/oauth/authorize");
  connectUrl.searchParams.set("response_type", "code");
  connectUrl.searchParams.set("client_id", clientId);
  connectUrl.searchParams.set("scope", "read_write");
  connectUrl.searchParams.set(
    "redirect_uri",
    `${baseUrl}/api/stripe/callback`
  );
  // Encode the return destination into state — Stripe will pass it back
  connectUrl.searchParams.set("state", returnTo);
  // Use "login" landing so returning users don't see registration
  connectUrl.searchParams.set("stripe_landing", "login");
  // Express account type
  connectUrl.searchParams.set("stripe_user[business_type]", "company");

  return NextResponse.redirect(connectUrl.toString());
}
