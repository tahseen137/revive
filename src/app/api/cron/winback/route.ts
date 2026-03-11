/**
 * Cron job to process win-back email queue
 * 
 * Sends reactivation emails to churned customers at:
 * - 30 days post-churn
 * - 60 days post-churn
 * - 90 days post-churn
 * 
 * Schedule: Daily at 10am (when customers are most likely to engage)
 */

import { NextRequest, NextResponse } from "next/server";
import { processWinbackQueue } from "@/lib/winback-email-service";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    console.error("[Cron] Invalid CRON_SECRET");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.log("[Cron] Starting win-back email processing...");
  const startTime = Date.now();

  try {
    // Process win-back email queue
    // Note: In a multi-tenant setup, we'd iterate through all connected accounts
    // For MVP, we'll process all eligible customers
    const result = await processWinbackQueue();

    const duration = Date.now() - startTime;

    console.log(`[Cron] ✅ Win-back processing complete:`);
    console.log(`   Sent: ${result.sent}`);
    console.log(`   Failed: ${result.failed}`);
    console.log(`   Duration: ${duration}ms`);

    if (result.errors.length > 0) {
      console.error("[Cron] Errors:", result.errors);
    }

    return NextResponse.json({
      success: true,
      sent: result.sent,
      failed: result.failed,
      duration,
      errors: result.errors,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[Cron] Win-back processing failed:", message);
    
    return NextResponse.json(
      { 
        success: false, 
        error: message,
        sent: 0,
        failed: 0,
      },
      { status: 500 }
    );
  }
}
