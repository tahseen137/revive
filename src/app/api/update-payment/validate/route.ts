/**
 * Validate card update token and return a secure Stripe Customer Portal URL
 */

import { NextRequest, NextResponse } from "next/server";
import { validateCardUpdateToken } from "@/lib/auth";
import { getFailedPayment } from "@/lib/db";
import Stripe from "stripe";

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

    // Create a secure Stripe Customer Portal session
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-01-28.clover",
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    try {
      // Use Stripe's Customer Portal Session API for a secure, time-limited URL
      const isConnectedAccount = payment.connectedAccountId && payment.connectedAccountId !== "direct";
      const session = await stripe.billingPortal.sessions.create(
        {
          customer: payment.stripeCustomerId,
          return_url: `${appUrl}/update-payment?success=true`,
        },
        isConnectedAccount ? { stripeAccount: payment.connectedAccountId } : undefined
      );

      return NextResponse.json({ portalUrl: session.url });
    } catch (stripeError: unknown) {
      console.error("[Update Payment] Stripe portal error:", stripeError);
      // Fallback: return a generic error rather than exposing Stripe details
      return NextResponse.json(
        { error: "Unable to create payment update session. Please contact support." },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    console.error("[Update Payment] Validation error:", error);
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
