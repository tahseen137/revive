/**
 * Cron endpoint: Process retry queue
 * 
 * Called by Vercel Cron every 15 minutes to:
 * 1. Retry failed payments that are due
 * 2. Send dunning emails where appropriate
 * 
 * Protected by CRON_SECRET to prevent unauthorized access.
 */

import { NextRequest, NextResponse } from "next/server";
import { processRetryQueue } from "@/lib/retry-engine";
import { processDunningQueue } from "@/lib/email-service";

export const maxDuration = 60; // Allow up to 60s for processing

export async function GET(request: NextRequest) {
  // Verify the request is from Vercel Cron
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.log("[Cron] Starting retry processing...");

  try {
    // 1. Process payment retries
    const retryResults = await processRetryQueue();
    console.log(`[Cron] Retries: ${retryResults.processed} processed, ${retryResults.recovered} recovered, ${retryResults.failed} failed, ${retryResults.rescheduled} rescheduled`);

    // 2. Process dunning emails
    const dunningResults = await processDunningQueue();
    console.log(`[Cron] Dunning: ${dunningResults.sent} sent, ${dunningResults.skipped} skipped, ${dunningResults.errors} errors`);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      retries: {
        processed: retryResults.processed,
        recovered: retryResults.recovered,
        failed: retryResults.failed,
        rescheduled: retryResults.rescheduled,
      },
      dunning: {
        sent: dunningResults.sent,
        skipped: dunningResults.skipped,
        errors: dunningResults.errors,
      },
    });
  } catch (error: unknown) {
    console.error("[Cron] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
