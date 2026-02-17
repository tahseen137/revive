/**
 * Stripe Connect Callback Endpoint
 *
 * Handles the return from Stripe's Express onboarding (Account Links flow).
 * The account ID is passed via query param. We verify the account exists,
 * save it, scan for failed payments, and route through onboarding → dashboard.
 *
 * GET /api/stripe/callback?account=acct_xxx
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
  const accountId = searchParams.get("account");
  const error = searchParams.get("error");

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://revive-hq.com";

  // ----- Error from Stripe -----
  if (error) {
    console.error(`[Stripe Connect] Callback error: ${error}`);
    return NextResponse.redirect(
      `${baseUrl}/pricing?connect_error=${encodeURIComponent(error)}`
    );
  }

  // ----- Missing account ID -----
  if (!accountId) {
    return NextResponse.redirect(
      `${baseUrl}/pricing?connect_error=missing_account_id`
    );
  }

  try {
    const stripe = getStripe();

    // Verify the account exists and check onboarding status
    const account = await stripe.accounts.retrieve(accountId);

    if (!account) {
      return NextResponse.redirect(
        `${baseUrl}/pricing?connect_error=account_not_found`
      );
    }

    const email = account.email ?? undefined;
    const businessName =
      account.business_profile?.name ??
      account.settings?.dashboard?.display_name ??
      undefined;

    // Check if onboarding is complete
    const isComplete =
      account.details_submitted && account.charges_enabled;

    if (!isComplete) {
      console.log(
        `[Stripe Connect] Account ${accountId} onboarding incomplete — ` +
          `details_submitted=${account.details_submitted}, charges_enabled=${account.charges_enabled}`
      );
      // Still save, but redirect back to finish onboarding
      // Generate a new account link to resume
      try {
        const accountLink = await stripe.accountLinks.create({
          account: accountId,
          refresh_url: `${baseUrl}/api/stripe/connect?retry=true`,
          return_url: `${baseUrl}/api/stripe/callback?account=${accountId}`,
          type: "account_onboarding",
        });
        return NextResponse.redirect(accountLink.url);
      } catch {
        // If account link fails, redirect to pricing with message
        return NextResponse.redirect(
          `${baseUrl}/pricing?connect_error=onboarding_incomplete`
        );
      }
    }

    console.log(
      `[Stripe Connect] Successfully connected account: ${accountId} (${businessName || email})`
    );

    // Persist the connected account
    await saveConnectedAccount({
      stripeAccountId: accountId,
      accessToken: "", // Not needed with Account Links flow
      refreshToken: undefined,
      email,
      businessName,
      connectedAt: Date.now(),
      active: true,
    });

    // Scan last 30 days of failed payments (conversion hook)
    let analysisParams = "";
    try {
      const analysis = await analyzeConnectedAccount(accountId);
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
    const displayName = encodeURIComponent(
      businessName || email || accountId
    );

    // Route through the onboarding page (animated setup screen),
    // which then redirects to the dashboard with all params.
    const onboardingUrl =
      `${baseUrl}/onboarding` +
      `?account=${encodeURIComponent(accountId)}` +
      `&name=${displayName}` +
      `&connected=true` +
      analysisParams;

    return NextResponse.redirect(onboardingUrl);
  } catch (err: unknown) {
    console.error("[Stripe Connect] Callback error:", err);
    const message =
      err instanceof Error ? err.message : "Connection verification failed";
    return NextResponse.redirect(
      `${baseUrl}/pricing?connect_error=${encodeURIComponent(message)}`
    );
  }
}
