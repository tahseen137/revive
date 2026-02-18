/**
 * Dashboard login endpoint
 * Sets a session cookie when the correct API key is provided.
 */

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { checkRateLimit, getClientIp, loginRateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  // Rate limiting - stricter for login (5 per 5 minutes)
  const ip = getClientIp(request);
  const rateLimitError = await checkRateLimit(loginRateLimit, ip);
  if (rateLimitError) return rateLimitError;

  try {
    const body = await request.json();
    const { apiKey } = body;

    const serverKey = process.env.API_SECRET_KEY;
    if (!serverKey) {
      return NextResponse.json(
        { error: "Server misconfigured" },
        { status: 500 }
      );
    }

    if (!apiKey || apiKey.length !== serverKey.length || !crypto.timingSafeEqual(Buffer.from(apiKey), Buffer.from(serverKey))) {
      return NextResponse.json(
        { error: "Invalid API key" },
        { status: 401 }
      );
    }

    // Set session cookie (HttpOnly, Secure in production, SameSite)
    const isProduction = process.env.NODE_ENV === "production";
    const response = NextResponse.json({ success: true });
    response.cookies.set("revive_session", serverKey, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
