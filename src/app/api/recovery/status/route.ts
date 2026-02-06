/**
 * Recovery Status API
 * Get recovery status for a specific invoice or customer
 */

import { NextRequest, NextResponse } from "next/server";
import { getAllPayments } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  // Require authentication
  const authError = requireAuth(request);
  if (authError) return authError;
  const { searchParams } = new URL(request.url);
  const invoiceId = searchParams.get("invoiceId");
  const customerId = searchParams.get("customerId");

  if (!invoiceId && !customerId) {
    return NextResponse.json(
      { 
        error: {
          type: "invalid_request_error",
          message: "Either invoiceId or customerId is required",
          param: "invoiceId|customerId",
          code: "missing_parameter"
        }
      },
      { status: 400 }
    );
  }

  try {
    const payments = await getAllPayments();

    // Find matching payment(s)
    let matchingPayments = payments;

    if (invoiceId) {
      matchingPayments = payments.filter(
        (p) => p.stripeInvoiceId === invoiceId
      );
    } else if (customerId) {
      matchingPayments = payments.filter(
        (p) => p.stripeCustomerId === customerId
      );
    }

    if (matchingPayments.length === 0) {
      return NextResponse.json(
        {
          error: {
            type: "invalid_request_error",
            message: "No payment records found for the provided ID",
            code: "not_found"
          }
        },
        { status: 404 }
      );
    }

    // Return single payment if invoiceId, or array if customerId
    if (invoiceId) {
      const payment = matchingPayments[0];
      return NextResponse.json({
        payment: {
          id: payment.id,
          stripeInvoiceId: payment.stripeInvoiceId,
          stripeCustomerId: payment.stripeCustomerId,
          stripeSubscriptionId: payment.stripeSubscriptionId,
          customerEmail: payment.customerEmail,
          customerName: payment.customerName,
          status: payment.status,
          amount: payment.amount,
          currency: payment.currency,
          retryCount: payment.retryCount,
          maxRetries: payment.maxRetries,
          nextRetryAt: payment.nextRetryAt,
          failureReason: payment.failureReason,
          failureCode: payment.failureCode,
          retryHistory: payment.retryHistory,
          emailsSent: payment.emailsSent,
          createdAt: payment.createdAt,
          updatedAt: payment.updatedAt,
          recoveredAt: payment.recoveredAt,
        },
      });
    } else {
      return NextResponse.json({
        payments: matchingPayments.map((p) => ({
          id: p.id,
          stripeInvoiceId: p.stripeInvoiceId,
          status: p.status,
          amount: p.amount,
          currency: p.currency,
          retryCount: p.retryCount,
          maxRetries: p.maxRetries,
          nextRetryAt: p.nextRetryAt,
          failureReason: p.failureReason,
          createdAt: p.createdAt,
          recoveredAt: p.recoveredAt,
        })),
        total: matchingPayments.length,
      });
    }
  } catch (error: unknown) {
    console.error("[Recovery Status] Error:", error);
    return NextResponse.json(
      {
        error: {
          type: "api_error",
          message: "Failed to fetch recovery status",
          code: "internal_error"
        }
      },
      { status: 500 }
    );
  }
}
