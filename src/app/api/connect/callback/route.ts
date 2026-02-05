import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://revive.vercel.app";

  if (error) {
    console.error("Stripe Connect OAuth error:", error);
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
    const response = await stripe.oauth.token({
      grant_type: "authorization_code",
      code,
    });

    const connectedAccountId = response.stripe_user_id;
    console.log("Connected Stripe account:", connectedAccountId);

    // TODO: Store connectedAccountId in database associated with user
    // For now, redirect with success

    return NextResponse.redirect(
      `${appUrl}/dashboard?connected=true&account=${connectedAccountId}`
    );
  } catch (err: unknown) {
    console.error("Stripe Connect token exchange error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.redirect(
      `${appUrl}/dashboard?connect_error=${encodeURIComponent(message)}`
    );
  }
}
