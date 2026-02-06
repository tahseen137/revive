/**
 * Legacy Connect endpoint — redirects to /api/stripe/connect
 * Kept for backward compatibility with existing links / onboarding flow.
 */

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const returnTo = searchParams.get("return") || "dashboard";

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://revive-hq.com";

  return NextResponse.redirect(
    `${baseUrl}/api/stripe/connect?return=${encodeURIComponent(returnTo)}`
  );
}
