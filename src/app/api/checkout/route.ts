import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { checkoutRateLimit, checkRateLimit, getClientIp } from "@/lib/rate-limit";

function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-01-28.clover",
  });
}

const PLANS: Record<string, { name: string; amount: number; interval: "month" }> = {
  growth: { name: "Revive Growth", amount: 9900, interval: "month" },
};

export async function POST(request: NextRequest) {
  // Rate limit check: 10 requests per minute per IP
  const ip = getClientIp(request);
  const rateLimitError = await checkRateLimit(checkoutRateLimit, ip);
  if (rateLimitError) return rateLimitError;

  try {
    const body = await request.json();
    const { priceId } = body;

    if (!priceId || !PLANS[priceId]) {
      return NextResponse.json(
        { error: "Invalid plan selected" },
        { status: 400 }
      );
    }

    const plan = PLANS[priceId];
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://revive.vercel.app";

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: plan.name,
              description: `${plan.name} - Monthly subscription for payment recovery`,
            },
            unit_amount: plan.amount,
            recurring: {
              interval: plan.interval,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/pricing`,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      subscription_data: {
        trial_period_days: 14,
        metadata: {
          plan: priceId,
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    console.error("Checkout error:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
