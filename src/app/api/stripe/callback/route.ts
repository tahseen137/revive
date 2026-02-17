/**
 * Stripe Connect OAuth Callback Endpoint
 *
 * Handles the redirect back from Stripe after authorization.
 * Exchanges the auth code for the connected account ID and stores it.
 *
 * GET /api/stripe/callback?code=...&state=...
 */

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { saveConnectedAccount } from "@/lib/connected-accounts";
import {
  analyzeConnectedAccount,
  formatAnalysisForDisplay,
} from "@/lib/recovery-analyzer";

function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-01-28.clover",
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");
  const state = searchParams.get("state") || "dashboard";

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://revive-hq.com";

  // ----- Error from Stripe (user denied, etc.) -----
  if (error) {
    console.error(
      `[Stripe Connect] OAuth error: ${error} — ${errorDescription}`
    );
    return NextResponse.redirect(
      `${baseUrl}/${state}?connect_error=${encodeURIComponent(
        errorDescription || error
      )}`
    );
  }

  // ----- Missing auth code -----
  if (!code) {
    return NextResponse.redirect(
      `${baseUrl}/${state}?connect_error=no_authorization_code`
    );
  }

  try {
    const stripe = getStripe();
    
    // Exchange the auth code for tokens + account ID
    const response = await stripe.oauth.token({
      grant_type: "authorization_code",
      code,
    });

    const connectedAccountId = response.stripe_user_id!;
    console.log(
      `[Stripe Connect] Successfully connected account: ${connectedAccountId}`
    );

    // Fetch account details for display
    let email: string | undefined;
    let businessName: string | undefined;
    try {
      const acct = await stripe.accounts.retrieve(connectedAccountId);
      email = acct.email ?? undefined;
      businessName =
        acct.business_profile?.name ??
        acct.settings?.dashboard?.display_name ??
        undefined;
    } catch (e) {
      console.error("[Stripe Connect] Could not fetch account details:", e);
    }

    // Persist the connected account
    await saveConnectedAccount({
      stripeAccountId: connectedAccountId,
      accessToken: response.access_token || "",
      refreshToken: response.refresh_token || undefined,
      email,
      businessName,
      connectedAt: Date.now(),
      active: true,
    });

    // Scan last 30 days of failed payments (conversion hook)
    let analysisParams = "";
    try {
      const analysis = await analyzeConnectedAccount(connectedAccountId);
      const display = formatAnalysisForDisplay(analysis);

      console.log(
        `[Stripe Connect] Scan: ${analysis.totalFailedPayments} failed payments, ` +
          `lost ${display.lostAmount}, recoverable ${display.recoverableAmount}`
      );

      analysisParams =
        `&lost=${encodeURIComponent(display.lostAmount)}` +
        `&recoverable=${encodeURIComponent(display.recoverableAmount)}` +
        `&failedCount=${analysis.totalFailedPayments}` +
        `&imported=${analysis.importedPayments}`;
    } catch (scanErr) {
      console.error(
        "[Stripe Connect] Post-connect scan failed (non-fatal):",
        scanErr
      );
    }

    // Build display name for the onboarding welcome screen
    const displayName = encodeURIComponent(businessName || email || connectedAccountId);

    // Route through the onboarding page first (3-second animated setup screen),
    // which then redirects to the final destination with all the same params.
    const onboardingUrl =
      `${baseUrl}/onboarding` +
      `?account=${encodeURIComponent(connectedAccountId)}` +
      `&name=${displayName}` +
      `&connected=true` +
      `&state=${encodeURIComponent(state)}` +
      analysisParams;

    return NextResponse.redirect(onboardingUrl);
  } catch (err: unknown) {
    console.error("[Stripe Connect] Token exchange error:", err);
    const message =
      err instanceof Error ? err.message : "Token exchange failed";
    return NextResponse.redirect(
      `${baseUrl}/${state}?connect_error=${encodeURIComponent(message)}`
    );
  }
}
