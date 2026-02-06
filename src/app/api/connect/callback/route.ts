/**
 * Legacy Connect callback — redirects to /api/stripe/callback
 * Kept for backward compatibility in case Stripe's redirect_uri
 * was previously set to this path.
 */

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://revive-hq.com";

  // Forward all query params to the new endpoint
  const newUrl = new URL(`${baseUrl}/api/stripe/callback`);
  searchParams.forEach((value, key) => {
    newUrl.searchParams.set(key, value);
  });

  return NextResponse.redirect(newUrl.toString());
}
