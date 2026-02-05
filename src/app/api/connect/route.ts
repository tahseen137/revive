import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.STRIPE_CONNECT_CLIENT_ID;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://revive.vercel.app";

  if (!clientId) {
    return NextResponse.json(
      { error: "Stripe Connect not configured" },
      { status: 500 }
    );
  }

  const connectUrl = new URL("https://connect.stripe.com/oauth/authorize");
  connectUrl.searchParams.set("response_type", "code");
  connectUrl.searchParams.set("client_id", clientId);
  connectUrl.searchParams.set("scope", "read_write");
  connectUrl.searchParams.set("redirect_uri", `${appUrl}/api/connect/callback`);
  connectUrl.searchParams.set(
    "stripe_landing",
    "login"
  );

  return NextResponse.redirect(connectUrl.toString());
}
