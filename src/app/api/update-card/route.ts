/**
 * Update customer payment method and retry failed invoice
 */

import { NextRequest, NextResponse } from "next/server";
import { validateCardUpdateToken, invalidateCardUpdateToken, isTokenUsed } from "@/lib/auth";
import { getFailedPayment, markPaymentRecovered, updateFailedPayment } from "@/lib/db";
import Stripe from "stripe";
import { sendRecoveryEmail } from "@/lib/email-service";
import { checkRateLimit, getClientIp, updateCardRateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = getClientIp(request);
  const rateLimitError = await checkRateLimit(updateCardRateLimit, ip);
  if (rateLimitError) return rateLimitError;

  try {
    const body = await request.json();
    const { token, paymentMethodId } = body;

    if (!token || !paymentMethodId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if token was already used
    const tokenUsed = await isTokenUsed(token);
    if (tokenUsed) {
      return NextResponse.json(
        { error: "This link has already been used" },
        { status: 403 }
      );
    }

    // Validate HMAC token
    const validated = validateCardUpdateToken(token);
    if (!validated) {
      return NextResponse.json(
        { error: "Invalid or expired link" },
        { status: 403 }
      );
    }

    // Get payment record
    const payment = await getFailedPayment(validated.paymentId);
    if (!payment || payment.stripeCustomerId !== validated.customerId) {
      return NextResponse.json(
        { error: "Payment record not found" },
        { status: 404 }
      );
    }

    // Initialize Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-01-28.clover",
    });

    const isConnectedAccount = payment.connectedAccountId && payment.connectedAccountId !== "direct";
    const stripeOptions = isConnectedAccount ? { stripeAccount: payment.connectedAccountId } : undefined;

    try {
      // 1. Attach payment method to customer
      await stripe.paymentMethods.attach(
        paymentMethodId,
        {
          customer: payment.stripeCustomerId,
        },
        stripeOptions
      );

      // 2. Set as default payment method
      await stripe.customers.update(
        payment.stripeCustomerId,
        {
          invoice_settings: {
            default_payment_method: paymentMethodId,
          },
        },
        stripeOptions
      );

      // 3. Retry the failed invoice
      const invoice = await stripe.invoices.retrieve(
        payment.stripeInvoiceId,
        stripeOptions
      );

      if (invoice.status === "open") {
        // Try to pay the invoice
        const paidInvoice = await stripe.invoices.pay(
          payment.stripeInvoiceId,
          stripeOptions
        );

        if (paidInvoice.status === "paid") {
          // Mark as recovered
          await markPaymentRecovered(payment.id);
          
          // Invalidate the token so it can't be reused
          await invalidateCardUpdateToken(token);
          
          // Send recovery confirmation email
          await sendRecoveryEmail(payment, "Revive"); // TODO: Get business name from connected account
          
          return NextResponse.json({
            success: true,
            message: "Payment method updated and payment successful!",
            redirectUrl: process.env.NEXT_PUBLIC_APP_URL || "https://revive-hq.com",
          });
        }
      }

      // Payment method updated but invoice couldn't be paid yet
      await updateFailedPayment(payment.id, {
        status: "retrying",
      });
      
      // Invalidate the token so it can't be reused
      await invalidateCardUpdateToken(token);

      return NextResponse.json({
        success: true,
        message: "Payment method updated. We'll retry your payment shortly.",
        redirectUrl: process.env.NEXT_PUBLIC_APP_URL || "https://revive-hq.com",
      });
    } catch (stripeError: unknown) {
      console.error("[Update Card] Stripe error:", stripeError);
      
      // Check if it's a card error
      if (stripeError && typeof stripeError === "object" && "type" in stripeError && "message" in stripeError) {
        const err = stripeError as { type: string; message?: string };
        if (err.type === "card_error") {
          return NextResponse.json(
            { error: err.message || "Card was declined. Please try a different card." },
            { status: 400 }
          );
        }
      }
      
      return NextResponse.json(
        { error: "Unable to process payment method. Please try again." },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    console.error("[Update Card] Error:", error);
    return NextResponse.json(
      { error: "An error occurred" },
      { status: 500 }
    );
  }
}
