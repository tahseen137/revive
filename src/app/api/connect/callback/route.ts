import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { saveConnectedAccount } from "@/lib/db";
import { analyzeConnectedAccount, formatAnalysisForDisplay } from "@/lib/recovery-analyzer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://revive-seven-eosin.vercel.app";

  if (error) {
    console.error("[Connect] OAuth error:", error);
    return NextResponse.redirect(
      `${appUrl}/dashboard?connect_error=${encodeURIComponent(error)}`
    );
  }

  if (!code) {
    return NextResponse.redirect(
      `${appUrl}/dashboard?connect_error=no_code`
    );
  }

  try {
    // Exchange auth code for access token
    const response = await stripe.oauth.token({
      grant_type: "authorization_code",
      code,
    });

    const connectedAccountId = response.stripe_user_id!;
    console.log(`[Connect] Connected Stripe account: ${connectedAccountId}`);

    // Store the connected account
    await saveConnectedAccount({
      stripeAccountId: connectedAccountId,
      accessToken: response.access_token || "",
      refreshToken: response.refresh_token || undefined,
      connectedAt: Date.now(),
      active: true,
    });

    // Scan their last 30 days of failed payments (the conversion hook!)
    console.log(`[Connect] Scanning last 30 days of failed payments...`);
    let analysisParams = "";
    
    try {
      const analysis = await analyzeConnectedAccount(connectedAccountId);
      const display = formatAnalysisForDisplay(analysis);
      
      console.log(`[Connect] Found ${analysis.totalFailedPayments} failed payments`);
      console.log(`[Connect] Lost: ${display.lostAmount}`);
      console.log(`[Connect] Recoverable: ${display.recoverableAmount}`);
      console.log(`[Connect] Imported: ${analysis.importedPayments} payments`);

      analysisParams = `&lost=${encodeURIComponent(display.lostAmount)}&recoverable=${encodeURIComponent(display.recoverableAmount)}&failedCount=${analysis.totalFailedPayments}&imported=${analysis.importedPayments}`;
    } catch (analysisError) {
      console.error("[Connect] Analysis error (non-fatal):", analysisError);
      // Continue without analysis — account is still connected
    }

    return NextResponse.redirect(
      `${appUrl}/dashboard?connected=true&account=${connectedAccountId}${analysisParams}`
    );
  } catch (err: unknown) {
    console.error("[Connect] Token exchange error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.redirect(
      `${appUrl}/dashboard?connect_error=${encodeURIComponent(message)}`
    );
  }
}
