import { NextResponse } from "next/server";
import { dbHealthCheck, getStats } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const results: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    env: {
      hasRedisUrl: !!process.env.UPSTASH_REDIS_REST_URL,
      hasRedisToken: !!process.env.UPSTASH_REDIS_REST_TOKEN,
      hasKvUrl: !!process.env.KV_REST_API_URL,
      hasKvToken: !!process.env.KV_REST_API_TOKEN,
      hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
      hasWebhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET,
      hasResendKey: !!process.env.RESEND_API_KEY,
      appUrl: process.env.NEXT_PUBLIC_APP_URL,
    },
  };

  try {
    const health = await dbHealthCheck();
    results.db = health;
  } catch (e: unknown) {
    results.db = { error: e instanceof Error ? e.message : String(e) };
  }

  try {
    const stats = await getStats();
    results.stats = stats;
  } catch (e: unknown) {
    results.statsError = e instanceof Error ? e.message : String(e);
  }

  return NextResponse.json(results);
}
