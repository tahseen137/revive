/**
 * Validate card update token and return payment details
 */

import { NextRequest, NextResponse } from "next/server";
import { validateCardUpdateToken } from "@/lib/auth";
import { getFailedPayment } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { error: "Missing token" },
        { status: 400 }
      );
    }

    // Validate HMAC token
    const validated = validateCardUpdateToken(token);
    if (!validated) {
      return NextResponse.json(
        { error: "Invalid or expired link. Please check your email for the latest payment update link." },
        { status: 403 }
      );
    }

    // Verify the payment record exists
    const payment = await getFailedPayment(validated.paymentId);
    if (!payment || payment.stripeCustomerId !== validated.customerId) {
      return NextResponse.json(
        { error: "Payment record not found." },
        { status: 404 }
      );
    }

    // Return payment details (safe subset)
    return NextResponse.json({
      amount: payment.amount,
      currency: payment.currency,
      customerName: payment.customerName,
      failureReason: getFriendlyFailureReason(payment.failureCode),
      businessName: "Revive", // TODO: Get from connected account
      invoiceId: payment.stripeInvoiceId,
    });
  } catch (error: unknown) {
    console.error("[Update Card] Validation error:", error);
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}

function getFriendlyFailureReason(code?: string): string {
  const map: Record<string, string> = {
    card_declined: "Card was declined",
    generic_decline: "Card was declined",
    insufficient_funds: "Insufficient funds",
    expired_card: "Card has expired",
    processing_error: "Temporary processing error",
    incorrect_cvc: "Incorrect security code",
    authentication_required: "Authentication required",
    do_not_honor: "Bank declined the charge",
    lost_card: "Card reported lost",
    stolen_card: "Card reported stolen",
    card_not_supported: "Card type not supported",
  };
  return map[code || ""] || "Payment could not be processed";
}
