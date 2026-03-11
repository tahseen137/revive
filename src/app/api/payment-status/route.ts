/**
 * Payment Status Check API
 * Returns whether the current user has any failed/past-due payments
 * Used by the Failed Payment Wall to determine when to show the blocking modal
 */

import { NextRequest, NextResponse } from "next/server";
import { getAllPayments } from "@/lib/db";

export const dynamic = "force-dynamic";

// CORS headers for cross-origin embeddable SDK
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

/**
 * OPTIONS /api/payment-status — CORS preflight
 */
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

/**
 * GET /api/payment-status?customerId=cus_xxx&accountId=acct_xxx
 * 
 * Query params:
 * - customerId: Stripe customer ID (required)
 * - accountId: Stripe Connect account ID (optional, for multi-tenant isolation)
 * 
 * Returns:
 * - hasFailedPayment: boolean
 * - payment: Failed payment details (if any)
 * - updateUrl: URL to update payment method
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const customerId = searchParams.get("customerId");
  const accountId = searchParams.get("accountId");

  if (!customerId) {
    return NextResponse.json(
      { 
        error: "customerId is required",
        code: "missing_parameter"
      },
      { status: 400, headers: corsHeaders }
    );
  }

  try {
    // Get payments (filtered by account if provided)
    const payments = accountId 
      ? (await getAllPayments()).filter(p => p.connectedAccountId === accountId)
      : await getAllPayments();
    
    // Find active failed payments (dunning, failed, or pending status)
    const failedPayments = payments.filter(
      (p) => p.stripeCustomerId === customerId && 
             (p.status === "dunning" || p.status === "failed" || p.status === "pending")
    );

    if (failedPayments.length === 0) {
      return NextResponse.json(
        { hasFailedPayment: false, payment: null },
        { headers: corsHeaders }
      );
    }

    // Return the most recent failed payment
    const payment = failedPayments.sort((a, b) => b.createdAt - a.createdAt)[0];

    // Generate card update URL — uses the existing secure token-based update flow
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://revive-hq.com";
    const updateUrl = `${appUrl}/update-card/${encodeURIComponent(payment.id)}`;

    return NextResponse.json(
      {
        hasFailedPayment: true,
        payment: {
          id: payment.id,
          amount: payment.amount,
          currency: payment.currency,
          status: payment.status,
          failureReason: payment.failureReason,
          failureCode: payment.failureCode,
          customerEmail: payment.customerEmail,
          createdAt: payment.createdAt,
        },
        updateUrl,
      },
      { headers: corsHeaders }
    );
  } catch (error: unknown) {
    console.error("[Payment Status] Error:", error);
    return NextResponse.json(
      {
        error: "Failed to check payment status",
        code: "internal_error"
      },
      { status: 500, headers: corsHeaders }
    );
  }
}
