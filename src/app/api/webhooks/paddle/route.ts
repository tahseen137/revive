import { NextRequest, NextResponse } from "next/server";
import { getPaddle, PaddleTransaction, PaddleSubscription } from "@/lib/paddle";
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

interface PaddleWebhookEvent {
  event_id: string;
  event_type: string;
  occurred_at: string;
  notification_id: string;
  data: unknown;
}

interface SubscriptionRecord {
  paddleSubscriptionId: string;
  paddleCustomerId: string;
  status: "active" | "trialing" | "past_due" | "paused" | "canceled";
  plan: string;
  currentPeriodStart: number;
  currentPeriodEnd: number;
  cancelAtPeriodEnd: boolean;
  createdAt: number;
  updatedAt: number;
}

/**
 * Map Paddle payment failure codes to Revive failure codes
 * Paddle uses different error codes than Stripe
 */
function mapPaddleFailureCode(paddleCode?: string): string {
  if (!paddleCode) return "card_declined";

  const codeMap: Record<string, string> = {
    // Card issues
    "card_declined": "card_declined",
    "card_expired": "expired_card",
    "insufficient_funds": "insufficient_funds",
    "invalid_card": "card_declined",
    
    // Processing issues
    "processing_error": "processing_error",
    "payment_method_not_supported": "processing_error",
    
    // Authentication
    "authentication_required": "authentication_required",
    "authentication_failed": "authentication_required",
    
    // Default
    "generic_decline": "card_declined",
  };

  return codeMap[paddleCode] || "card_declined";
}

async function saveSubscription(subscription: PaddleSubscription): Promise<void> {
  const record: SubscriptionRecord = {
    paddleSubscriptionId: subscription.id,
    paddleCustomerId: subscription.customerId,
    status: subscription.status === "paused" ? "past_due" : subscription.status,
    plan: "growth", // Extract from subscription items metadata if available
    currentPeriodStart: new Date(subscription.currentBillingPeriod.startsAt).getTime(),
    currentPeriodEnd: new Date(subscription.currentBillingPeriod.endsAt).getTime(),
    cancelAtPeriodEnd: subscription.scheduledChange?.action === "cancel",
    createdAt: new Date(subscription.createdAt).getTime(),
    updatedAt: Date.now(),
  };

  await set(`paddle:subscription:${subscription.id}`, record);
  await set(`paddle:customer:${subscription.customerId}:subscription`, record);
  console.log(`[Paddle Webhook] Saved subscription ${subscription.id} (status: ${subscription.status})`);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("paddle-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing paddle-signature header" }, { status: 400 });
    }

    const webhookSecret = process.env.PADDLE_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      console.error("[Paddle Webhook] PADDLE_WEBHOOK_SECRET not configured");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // Verify webhook signature
    const paddle = getPaddle();
    const isValid = paddle.verifyWebhookSignature(body, signature, webhookSecret);
    
    if (!isValid) {
      console.error("[Paddle Webhook] Invalid signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(body) as PaddleWebhookEvent;
    console.log(`[Paddle Webhook] Received event: ${event.event_type} (${event.event_id})`);

    switch (event.event_type) {
      case "transaction.payment_failed": {
        const transaction = event.data as PaddleTransaction;
        console.log(`[Paddle Webhook] Payment failed for transaction: ${transaction.id}`);

        // Use transaction ID as invoice ID for Paddle
        const existingPayment = await getPaymentByInvoiceId(`paddle:${transaction.id}`);
        if (existingPayment) {
          console.log(`[Paddle Webhook] Already tracking transaction ${transaction.id}, skipping`);
          break;
        }

        // Fetch customer details
        let customerEmail = "";
        let customerName = "";
        
        try {
          const { data: customer } = await paddle.getCustomer(transaction.customerId);
          customerEmail = customer.email || "";
          customerName = customer.name || customer.email || "";
        } catch (e) {
          console.error("[Paddle Webhook] Failed to fetch customer:", e);
        }

        // Extract failure details
        const failedPayment = transaction.payments.find(p => p.status === "failed");
        const paddleFailureCode = failedPayment?.errorCode || "generic_decline";
        const failureCode = mapPaddleFailureCode(paddleFailureCode);
        const failureReason = `Payment failed: ${paddleFailureCode}`;

        const skipRetries = shouldSkipRetries(failureCode);
        const maxRetries = getMaxRetries(failureCode);

        // Extract amount (Paddle uses string amounts in cents)
        const amount = parseInt(transaction.details.totals.grandTotal, 10);
        const currency = transaction.details.totals.currencyCode.toLowerCase();

        const tempPayment = {
          id: "",
          stripeInvoiceId: `paddle:${transaction.id}`, // Use paddle: prefix to distinguish
          stripeCustomerId: `paddle:${transaction.customerId}`,
          connectedAccountId: "paddle",
          customerEmail,
          customerName,
          amount,
          currency,
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
          stripeInvoiceId: `paddle:${transaction.id}`,
          stripeCustomerId: `paddle:${transaction.customerId}`,
          stripeSubscriptionId: transaction.subscriptionId ? `paddle:${transaction.subscriptionId}` : undefined,
          connectedAccountId: "paddle",
          customerEmail,
          customerName,
          amount,
          currency,
          failureReason,
          failureCode,
          maxRetries,
          nextRetryAt,
          status: skipRetries ? "expired_card" : "pending",
        });

        console.log(`[Paddle Webhook] Created failed payment: ${payment.id}`);

        // Send dunning email for non-retryable failures
        if (skipRetries && customerEmail) {
          await sendDunningEmail(payment);
        }
        break;
      }

      case "transaction.completed":
      case "transaction.paid": {
        const transaction = event.data as PaddleTransaction;
        const matchingPayment = await getPaymentByInvoiceId(`paddle:${transaction.id}`);

        if (matchingPayment && matchingPayment.status !== "recovered") {
          console.log(`[Paddle Webhook] 🎉 Recovered payment: ${matchingPayment.id}`);
          await markPaymentRecovered(matchingPayment.id);
          if (matchingPayment.customerEmail) {
            await sendRecoveryEmail(matchingPayment);
          }
        }
        break;
      }

      case "subscription.created": {
        const subscription = event.data as PaddleSubscription;
        console.log(`[Paddle Webhook] Subscription created: ${subscription.id}`);
        await saveSubscription(subscription);
        break;
      }

      case "subscription.updated": {
        const subscription = event.data as PaddleSubscription;
        console.log(`[Paddle Webhook] Subscription updated: ${subscription.id} → ${subscription.status}`);
        await saveSubscription(subscription);
        break;
      }

      case "subscription.canceled": {
        const subscription = event.data as PaddleSubscription;
        console.log(`[Paddle Webhook] Subscription cancelled: ${subscription.id}`);
        await saveSubscription(subscription);
        
        // Track churned customer for win-back campaigns
        try {
          const { createChurnedCustomer } = await import("@/lib/winback");
          
          // Fetch customer details
          let customerEmail = "";
          let customerName = "";
          
          try {
            const { data: customer } = await paddle.getCustomer(subscription.customerId);
            customerEmail = customer.email || "";
            customerName = customer.name || customer.email || "";
          } catch (e) {
            console.error("[Paddle Webhook] Failed to fetch customer for churn tracking:", e);
          }
          
          if (customerEmail) {
            const planName = "Unknown Plan"; // Extract from subscription items if needed
            const planAmount = 0; // Extract from subscription items if needed
            const currency = "usd"; // Extract from subscription items if needed
            
            const churnedCustomer = await createChurnedCustomer({
              stripeCustomerId: `paddle:${subscription.customerId}`,
              stripeSubscriptionId: `paddle:${subscription.id}`,
              connectedAccountId: "paddle",
              customerEmail,
              customerName,
              planName,
              planAmount,
              currency,
              churnReason: "cancellation",
            });
            
            console.log(`[Paddle Webhook] ⚠️  Created churned customer for win-back: ${churnedCustomer.id}`);
          }
        } catch (err: unknown) {
          console.error("[Paddle Webhook] Failed to create churned customer:", err);
          // Don't fail the webhook if churn tracking fails
        }
        break;
      }

      case "subscription.past_due": {
        const subscription = event.data as PaddleSubscription;
        console.log(`[Paddle Webhook] ⚠️  Subscription past due: ${subscription.id}`);
        await saveSubscription(subscription);
        break;
      }

      case "subscription.paused": {
        const subscription = event.data as PaddleSubscription;
        console.log(`[Paddle Webhook] Subscription paused: ${subscription.id}`);
        await saveSubscription(subscription);
        break;
      }

      case "subscription.resumed": {
        const subscription = event.data as PaddleSubscription;
        console.log(`[Paddle Webhook] Subscription resumed: ${subscription.id}`);
        await saveSubscription(subscription);
        break;
      }

      default:
        console.log(`[Paddle Webhook] Unhandled event: ${event.event_type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: unknown) {
    console.error("[Paddle Webhook] Error:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
