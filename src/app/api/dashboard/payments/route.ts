/**
 * Dashboard Payments API
 * Returns real payment data from the database
 */

import { NextRequest, NextResponse } from "next/server";
import { getAllPayments, getPaymentsByAccount } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const accountId = searchParams.get("accountId");
  const limit = parseInt(searchParams.get("limit") || "50", 10);
  const offset = parseInt(searchParams.get("offset") || "0", 10);
  const status = searchParams.get("status"); // filter by status

  try {
    let payments = accountId
      ? await getPaymentsByAccount(accountId)
      : await getAllPayments();

    // Filter by status if specified
    if (status) {
      const statuses = status.split(",");
      payments = payments.filter((p) => statuses.includes(p.status));
    }

    // Sort by most recent first
    payments.sort((a, b) => b.createdAt - a.createdAt);

    const total = payments.length;
    const paginatedPayments = payments.slice(offset, offset + limit);

    // Format for frontend
    const formatted = paginatedPayments.map((p) => ({
      id: p.id,
      stripeInvoiceId: p.stripeInvoiceId,
      customer: p.customerName,
      email: p.customerEmail,
      amount: p.amount / 100, // cents to dollars
      currency: p.currency,
      status: p.status,
      failureReason: p.failureCode,
      failureReasonDisplay: getFailureDisplay(p.failureCode),
      retries: p.retryCount,
      maxRetries: p.maxRetries,
      nextRetryAt: p.nextRetryAt ? new Date(p.nextRetryAt).toISOString() : null,
      emailsSent: p.emailsSent.length,
      lastEmailType: p.emailsSent.length > 0
        ? p.emailsSent[p.emailsSent.length - 1].type
        : null,
      date: new Date(p.createdAt).toISOString().split("T")[0],
      createdAt: new Date(p.createdAt).toISOString(),
      recoveredAt: p.recoveredAt ? new Date(p.recoveredAt).toISOString() : null,
      retryHistory: p.retryHistory.map((r) => ({
        attempt: r.attemptNumber,
        time: new Date(r.timestamp).toISOString(),
        success: r.success,
        error: r.error,
      })),
    }));

    return NextResponse.json({
      payments: formatted,
      total,
      limit,
      offset,
      hasMore: offset + limit < total,
    });
  } catch (error: unknown) {
    console.error("[Dashboard Payments] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch payments" },
      { status: 500 }
    );
  }
}

function getFailureDisplay(code: string): string {
  const map: Record<string, string> = {
    card_declined: "Card Declined",
    generic_decline: "Card Declined",
    insufficient_funds: "Insufficient Funds",
    expired_card: "Expired Card",
    processing_error: "Processing Error",
    incorrect_cvc: "Incorrect CVC",
    authentication_required: "Auth Required",
    do_not_honor: "Bank Declined",
    lost_card: "Lost Card",
    stolen_card: "Stolen Card",
  };
  return map[code] || code;
}
