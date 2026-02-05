/**
 * Manual Retry API
 * Manually trigger a retry for a failed payment
 */

import { NextRequest, NextResponse } from "next/server";
import { getAllPayments, updateFailedPayment } from "@/lib/db";
import { calculateNextRetryTime } from "@/lib/retry-engine";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { invoiceId } = body;

    if (!invoiceId) {
      return NextResponse.json(
        {
          error: {
            type: "invalid_request_error",
            message: "invoiceId is required",
            param: "invoiceId",
            code: "missing_parameter"
          }
        },
        { status: 400 }
      );
    }

    // Find the payment record
    const payments = await getAllPayments();
    const payment = payments.find((p) => p.stripeInvoiceId === invoiceId);

    if (!payment) {
      return NextResponse.json(
        {
          error: {
            type: "invalid_request_error",
            message: "Payment record not found for invoice ID",
            param: "invoiceId",
            code: "not_found"
          }
        },
        { status: 404 }
      );
    }

    // Check if payment is eligible for retry
    if (payment.status === "recovered") {
      return NextResponse.json(
        {
          error: {
            type: "invalid_request_error",
            message: "Payment has already been recovered",
            code: "already_recovered"
          }
        },
        { status: 400 }
      );
    }

    if (payment.retryCount >= payment.maxRetries) {
      return NextResponse.json(
        {
          error: {
            type: "invalid_request_error",
            message: "Payment has reached maximum retry attempts",
            code: "max_retries_exceeded"
          }
        },
        { status: 400 }
      );
    }

    // Attempt to finalize the invoice (Stripe will attempt payment)
    try {
      const invoice = await stripe.invoices.finalizeInvoice(invoiceId, {
        auto_advance: true,
      });

      // Update retry history
      const newRetryHistory = [
        ...payment.retryHistory,
        {
          attemptNumber: payment.retryCount + 1,
          timestamp: Date.now(),
          success: invoice.status === "paid",
          error: invoice.status === "paid" ? undefined : "manual_retry_failed",
        },
      ];

      const newRetryCount = payment.retryCount + 1;
      const nextRetryAt = calculateNextRetryTime({
        ...payment,
        retryCount: newRetryCount,
        retryHistory: newRetryHistory,
      });

      // Update payment record
      await updateFailedPayment(payment.id, {
        retryCount: newRetryCount,
        retryHistory: newRetryHistory,
        nextRetryAt: invoice.status === "paid" ? null : nextRetryAt,
        status: invoice.status === "paid" ? "recovered" : "retrying",
        updatedAt: Date.now(),
        recoveredAt: invoice.status === "paid" ? Date.now() : payment.recoveredAt,
      });

      return NextResponse.json({
        success: true,
        message: invoice.status === "paid" 
          ? "Payment retry succeeded - payment recovered!"
          : "Payment retry initiated",
        payment: {
          id: payment.id,
          stripeInvoiceId: payment.stripeInvoiceId,
          status: invoice.status === "paid" ? "recovered" : "retrying",
          retryCount: newRetryCount,
          nextRetryAt: invoice.status === "paid" ? null : nextRetryAt,
        },
      });
    } catch (stripeError: unknown) {
      // Stripe error - still count as a retry attempt
      const errorMessage = stripeError instanceof Error ? stripeError.message : "Unknown Stripe error";
      
      const newRetryHistory = [
        ...payment.retryHistory,
        {
          attemptNumber: payment.retryCount + 1,
          timestamp: Date.now(),
          success: false,
          error: errorMessage,
        },
      ];

      const newRetryCount = payment.retryCount + 1;
      const nextRetryAt = calculateNextRetryTime({
        ...payment,
        retryCount: newRetryCount,
        retryHistory: newRetryHistory,
      });

      await updateFailedPayment(payment.id, {
        retryCount: newRetryCount,
        retryHistory: newRetryHistory,
        nextRetryAt,
        status: newRetryCount >= payment.maxRetries ? "failed" : "pending",
        updatedAt: Date.now(),
      });

      return NextResponse.json(
        {
          error: {
            type: "stripe_error",
            message: `Retry attempt failed: ${errorMessage}`,
            code: "retry_failed"
          },
          payment: {
            id: payment.id,
            retryCount: newRetryCount,
            nextRetryAt,
          }
        },
        { status: 402 }
      );
    }
  } catch (error: unknown) {
    console.error("[Manual Retry] Error:", error);
    return NextResponse.json(
      {
        error: {
          type: "api_error",
          message: "Failed to process retry request",
          code: "internal_error"
        }
      },
      { status: 500 }
    );
  }
}
