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

const PLANS: Record<string, { name: string; amount: number; interval: "month"; trialDays?: number }> = {
  growth: {
    name: "Revive Growth",
    amount: 9900, // $99/month
    interval: "month",
    trialDays: 14,
  },
  // Legacy plans for existing subscribers
  starter: { name: "Revive Starter", amount: 2900, interval: "month" },
};

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rateLimitError = await checkRateLimit(checkoutRateLimit, ip);
  if (rateLimitError) return rateLimitError;

  try {
    const body = await request.json();
    const { priceId, successUrl, cancelUrl } = body;

    if (!priceId || !PLANS[priceId]) {
      return NextResponse.json({ error: "Invalid plan selected" }, { status: 400 });
    }

    const plan = PLANS[priceId];
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_BASE_URL || "https://revive-hq.com";

    const stripe = getStripe();
    
    const subscriptionData: Stripe.Checkout.SessionCreateParams.SubscriptionData = {
      metadata: { plan: priceId },
    };
    
    if (plan.trialDays) {
      subscriptionData.trial_period_days = plan.trialDays;
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: plan.name,
              description: `${plan.name} — Unlimited payment recovery with advanced features`,
            },
            unit_amount: plan.amount,
            recurring: { interval: plan.interval },
          },
          quantity: 1,
        },
      ],
      success_url: successUrl || `${appUrl}/dashboard?session_id={CHECKOUT_SESSION_ID}&upgraded=true`,
      cancel_url: cancelUrl || `${appUrl}/pricing`,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      subscription_data: subscriptionData,
      customer_creation: "always",
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    console.error("Checkout error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
