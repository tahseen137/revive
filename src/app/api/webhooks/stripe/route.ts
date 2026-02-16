import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import {
  createFailedPayment,
  markPaymentRecovered,
  getPaymentByInvoiceId,
  getAllPayments,
} from "@/lib/db";
import {
  calculateNextRetryTime,
  getMaxRetries,
  shouldSkipRetries,
} from "@/lib/retry-engine";
import { sendDunningEmail, sendRecoveryEmail } from "@/lib/email-service";

function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-01-28.clover",
  });
}

// Helper to extract subscription ID from invoice (Clover API uses parent.subscription_details)
function getSubscriptionId(invoice: Stripe.Invoice): string | undefined {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inv = invoice as any;
  // Clover API: invoice.parent?.subscription_details?.subscription
  if (inv.parent?.subscription_details?.subscription) {
    const sub = inv.parent.subscription_details.subscription;
    return typeof sub === "string" ? sub : sub?.id;
  }
  // Legacy fallback
  if (inv.subscription) {
    return typeof inv.subscription === "string" ? inv.subscription : inv.subscription?.id;
  }
  return undefined;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing stripe-signature header" },
        { status: 400 }
      );
    }

    const stripe = getStripe();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      return NextResponse.json(
        { error: "STRIPE_WEBHOOK_SECRET is not configured" },
        { status: 500 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Invalid signature";
      console.error("Webhook signature verification failed:", message);
      return NextResponse.json(
        { error: `Webhook Error: ${message}` },
        { status: 400 }
      );
    }

    console.log(`[Webhook] Received event: ${event.type} (${event.id})`);

    switch (event.type) {
      // ============ CORE: Payment Failed ============
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        console.log(`[Webhook] Payment failed for invoice: ${invoice.id}`);

        // Idempotency: check if we already track this invoice
        const existingPayment = await getPaymentByInvoiceId(invoice.id);
        if (existingPayment) {
          console.log(`[Webhook] Already tracking invoice ${invoice.id} (payment ${existingPayment.id}), skipping duplicate`);
          break;
        }

        // Get customer details
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

        // Fallback to invoice-level email
        if (!customerEmail && invoice.customer_email) {
          customerEmail = invoice.customer_email;
          customerName = customerName || customerEmail;
        }

        // Determine failure reason
        let failureCode = "card_declined";
        let failureReason = "Payment failed";
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const invoiceAny = invoice as any;
        if (invoiceAny.last_finalization_error) {
          failureCode = invoiceAny.last_finalization_error.code || "card_declined";
          failureReason = invoiceAny.last_finalization_error.message || "Payment failed";
        }

        // Determine connected account
        const connectedAccountId = event.account || "direct";

        // Determine retry strategy
        const skipRetries = shouldSkipRetries(failureCode);
        const maxRetries = getMaxRetries(failureCode);

        // Build the payment record for next retry calculation
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

        // Store in database
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

        console.log(`[Webhook] Created failed payment record: ${payment.id}`);
        console.log(`[Webhook]   Customer: ${customerEmail}`);
        console.log(`[Webhook]   Amount: ${invoice.amount_due} ${invoice.currency}`);
        console.log(`[Webhook]   Failure: ${failureCode}`);
        console.log(`[Webhook]   Strategy: ${skipRetries ? "dunning only" : `retry (max ${maxRetries})`}`);
        console.log(`[Webhook]   Next retry: ${nextRetryAt ? new Date(nextRetryAt).toISOString() : "none"}`);

        // Send initial dunning email for expired cards (no retries)
        if (skipRetries && customerEmail) {
          await sendDunningEmail(payment);
        }

        break;
      }

      // ============ Payment Succeeded (recovery detection) ============
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        console.log(`[Webhook] Payment succeeded for invoice: ${invoice.id}`);

        // Check if this was a previously failed payment we're tracking
        // Use efficient index lookup instead of scanning all payments
        const matchingPayment = await getPaymentByInvoiceId(invoice.id);

        if (matchingPayment && matchingPayment.status !== "recovered") {
          console.log(`[Webhook] 🎉 Recovered payment: ${matchingPayment.id}`);
          await markPaymentRecovered(matchingPayment.id);
          
          // Send recovery confirmation email
          if (matchingPayment.customerEmail) {
            await sendRecoveryEmail(matchingPayment);
          }
        }

        break;
      }

      // ============ Subscription Events ============
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`[Webhook] Checkout completed: ${session.id}`);
        break;
      }

      case "customer.subscription.created": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(`[Webhook] Subscription created: ${subscription.id}`);
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(`[Webhook] Subscription updated: ${subscription.id} → ${subscription.status}`);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(`[Webhook] Subscription cancelled: ${subscription.id}`);
        break;
      }

      default:
        console.log(`[Webhook] Unhandled event: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: unknown) {
    console.error("[Webhook] Error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
