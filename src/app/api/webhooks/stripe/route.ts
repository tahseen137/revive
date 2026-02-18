import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import {
  createFailedPayment,
  markPaymentRecovered,
  getPaymentByInvoiceId,
  set,
  get,
} from "@/lib/db";
import {
  calculateNextRetryTime,
  getMaxRetries,
  shouldSkipRetries,
} from "@/lib/retry-engine";
import { sendDunningEmail, sendRecoveryEmail } from "@/lib/email-service";
import { sanitizeEmail, sanitizeCustomerId } from "@/lib/sanitize";

function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-01-28.clover",
  });
}

interface SubscriptionRecord {
  stripeSubscriptionId: string;
  stripeCustomerId: string;
  status: "active" | "trialing" | "past_due" | "canceled" | "unpaid";
  plan: string;
  currentPeriodStart: number;
  currentPeriodEnd: number;
  cancelAtPeriodEnd: boolean;
  createdAt: number;
  updatedAt: number;
}

function getSubscriptionId(invoice: Stripe.Invoice): string | undefined {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inv = invoice as any;
  if (inv.parent?.subscription_details?.subscription) {
    const sub = inv.parent.subscription_details.subscription;
    return typeof sub === "string" ? sub : sub?.id;
  }
  if (inv.subscription) {
    return typeof inv.subscription === "string" ? inv.subscription : inv.subscription?.id;
  }
  return undefined;
}

async function saveSubscription(subscription: Stripe.Subscription): Promise<void> {
  const customerId = typeof subscription.customer === "string" 
    ? subscription.customer 
    : subscription.customer.id;
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sub = subscription as any;
  
  const record: SubscriptionRecord = {
    stripeSubscriptionId: subscription.id,
    stripeCustomerId: customerId,
    status: subscription.status as SubscriptionRecord["status"],
    plan: sub.items?.data?.[0]?.price?.metadata?.plan || subscription.metadata?.plan || "growth",
    currentPeriodStart: (sub.current_period_start || Date.now() / 1000) * 1000,
    currentPeriodEnd: (sub.current_period_end || Date.now() / 1000 + 30 * 24 * 60 * 60) * 1000,
    cancelAtPeriodEnd: sub.cancel_at_period_end || false,
    createdAt: (sub.created || Date.now() / 1000) * 1000,
    updatedAt: Date.now(),
  };

  await set(`subscription:${subscription.id}`, record);
  await set(`customer:${customerId}:subscription`, record);
  console.log(`[Webhook] Saved subscription ${subscription.id} (status: ${subscription.status})`);
}

export async function getSubscriptionByCustomer(customerId: string): Promise<SubscriptionRecord | null> {
  return get<SubscriptionRecord>(`customer:${customerId}:subscription`);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
    }

    const stripe = getStripe();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const connectWebhookSecret = process.env.STRIPE_CONNECT_WEBHOOK_SECRET;
    
    if (!webhookSecret && !connectWebhookSecret) {
      console.error("[Webhook] No webhook secrets configured");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    let event: Stripe.Event;

    // Try primary webhook secret first, then Connect webhook secret
    try {
      if (webhookSecret) {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      } else {
        throw new Error("No primary secret");
      }
    } catch (primaryErr: unknown) {
      // Try Connect webhook secret as fallback
      if (connectWebhookSecret) {
        try {
          event = stripe.webhooks.constructEvent(body, signature, connectWebhookSecret);
        } catch (connectErr: unknown) {
          const message = connectErr instanceof Error ? connectErr.message : "Invalid signature";
          console.error("[Webhook] Signature verification failed for both secrets");
          return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
        }
      } else {
        const message = primaryErr instanceof Error ? primaryErr.message : "Invalid signature";
        console.error("[Webhook] Signature verification failed:", message);
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
      }
    }

    console.log(`[Webhook] Received event: ${event.type} (${event.id})`);

    switch (event.type) {
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        console.log(`[Webhook] Payment failed for invoice: ${invoice.id}`);

        const existingPayment = await getPaymentByInvoiceId(invoice.id);
        if (existingPayment) {
          console.log(`[Webhook] Already tracking invoice ${invoice.id}, skipping`);
          break;
        }

        let customerEmail = "";
        let customerName = "";
        
        if (typeof invoice.customer === "string") {
          try {
            const customer = await stripe.customers.retrieve(invoice.customer, {
              stripeAccount: event.account || undefined,
            });
            if (customer && !customer.deleted) {
              customerEmail = customer.email || "";
              customerName = customer.name || customer.email || "";
            }
          } catch (e) {
            console.error("Failed to fetch customer:", e);
          }
        } else if (invoice.customer && typeof invoice.customer === "object" && !invoice.customer.deleted) {
          customerEmail = invoice.customer.email || "";
          customerName = invoice.customer.name || invoice.customer.email || "";
        }

        if (!customerEmail && invoice.customer_email) {
          customerEmail = invoice.customer_email;
          customerName = customerName || customerEmail;
        }

        let failureCode = "card_declined";
        let failureReason = "Payment failed";
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const invoiceAny = invoice as any;
        if (invoiceAny.last_finalization_error) {
          failureCode = invoiceAny.last_finalization_error.code || "card_declined";
          failureReason = invoiceAny.last_finalization_error.message || "Payment failed";
        }

        const connectedAccountId = event.account || "direct";
        const skipRetries = shouldSkipRetries(failureCode);
        const maxRetries = getMaxRetries(failureCode);

        const tempPayment = {
          id: "",
          stripeInvoiceId: invoice.id,
          stripeCustomerId: typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id || "",
          connectedAccountId,
          customerEmail,
          customerName,
          amount: invoice.amount_due || 0,
          currency: invoice.currency || "usd",
          failureReason,
          failureCode,
          retryCount: 0,
          maxRetries,
          nextRetryAt: null as number | null,
          status: "pending" as const,
          retryHistory: [],
          emailsSent: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
          recoveredAt: null,
        };

        const nextRetryAt = skipRetries ? null : calculateNextRetryTime(tempPayment);

        const payment = await createFailedPayment({
          stripeInvoiceId: invoice.id,
          stripeCustomerId: tempPayment.stripeCustomerId,
          stripeSubscriptionId: getSubscriptionId(invoice),
          connectedAccountId,
          customerEmail,
          customerName,
          amount: invoice.amount_due || 0,
          currency: invoice.currency || "usd",
          failureReason,
          failureCode,
          maxRetries,
          nextRetryAt,
          status: skipRetries ? "expired_card" : "pending",
        });

        console.log(`[Webhook] Created failed payment: ${payment.id}`);

        if (skipRetries && customerEmail) {
          await sendDunningEmail(payment);
        }
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        const matchingPayment = await getPaymentByInvoiceId(invoice.id);

        if (matchingPayment && matchingPayment.status !== "recovered") {
          console.log(`[Webhook] 🎉 Recovered payment: ${matchingPayment.id}`);
          await markPaymentRecovered(matchingPayment.id);
          if (matchingPayment.customerEmail) {
            await sendRecoveryEmail(matchingPayment);
          }
        }
        break;
      }

      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`[Webhook] Checkout completed: ${session.id}`);
        break;
      }

      case "customer.subscription.created": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(`[Webhook] Subscription created: ${subscription.id}`);
        await saveSubscription(subscription);
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(`[Webhook] Subscription updated: ${subscription.id} → ${subscription.status}`);
        await saveSubscription(subscription);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(`[Webhook] Subscription cancelled: ${subscription.id}`);
        await saveSubscription(subscription);
        break;
      }

      default:
        console.log(`[Webhook] Unhandled event: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: unknown) {
    console.error("[Webhook] Error:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
