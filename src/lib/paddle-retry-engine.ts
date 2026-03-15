/**
 * Paddle Retry Engine Extension
 * Handles payment retries for Paddle transactions
 */

import { getPaddle } from "./paddle";
import { FailedPayment } from "./db";

export interface PaddleRetryResult {
  paymentId: string;
  success: boolean;
  error?: string;
  transactionId?: string;
}

/**
 * Attempt to retry a failed Paddle payment
 * Paddle doesn't support direct invoice retries like Stripe,
 * so we resume the subscription which triggers automatic retry
 */
export async function executePaddleRetry(payment: FailedPayment): Promise<PaddleRetryResult> {
  console.log(`[Paddle Retry Engine] 🔄 Executing retry for payment ${payment.id}`);
  console.log(`  Transaction: ${payment.stripeInvoiceId.replace("paddle:", "")}`);
  console.log(`  Customer: ${payment.customerEmail}`);
  console.log(`  Amount: ${payment.amount / 100} ${payment.currency.toUpperCase()}`);
  console.log(`  Attempt: ${payment.retryCount + 1}/${payment.maxRetries}`);
  console.log(`  Original failure: ${payment.failureCode}`);

  try {
    const paddle = getPaddle();
    const transactionId = payment.stripeInvoiceId.replace("paddle:", "");

    // Get the transaction to find the subscription
    const { data: transaction } = await paddle.getTransaction(transactionId);

    if (!transaction.subscriptionId) {
      console.log(`  ❌ Transaction not associated with a subscription`);
      return {
        paymentId: payment.id,
        success: false,
        error: "Transaction not associated with subscription",
      };
    }

    // Get subscription status
    const { data: subscription } = await paddle.getSubscription(transaction.subscriptionId);

    console.log(`  📋 Subscription status: ${subscription.status}`);

    // Resume subscription if paused or past_due
    if (subscription.status === "past_due" || subscription.status === "paused") {
      console.log(`  🔄 Resuming subscription to trigger retry...`);
      
      const result = await paddle.resumeSubscription(
        transaction.subscriptionId,
        { effectiveFrom: "immediately" }
      );

      console.log(`  ✅ Subscription resumed - Paddle will retry payment automatically`);
      console.log(`  New status: ${result.data.status}`);

      return {
        paymentId: payment.id,
        success: true,
        transactionId: transaction.id,
      };
    }

    // If subscription is already active, payment may have succeeded
    if (subscription.status === "active") {
      console.log(`  ℹ️  Subscription already active - payment may have been recovered`);
      
      // Check transaction status
      const { data: latestTransaction } = await paddle.getTransaction(transactionId);
      
      if (latestTransaction.status === "paid" || latestTransaction.status === "completed") {
        console.log(`  ✅ Transaction now paid!`);
        return {
          paymentId: payment.id,
          success: true,
          transactionId: transaction.id,
        };
      }
    }

    // For canceled subscriptions, we can't retry
    if (subscription.status === "canceled") {
      console.log(`  ❌ Subscription canceled - cannot retry`);
      return {
        paymentId: payment.id,
        success: false,
        error: "Subscription canceled",
      };
    }

    console.log(`  ⚠️  Unexpected subscription status: ${subscription.status}`);
    return {
      paymentId: payment.id,
      success: false,
      error: `Unexpected status: ${subscription.status}`,
    };
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error("Unknown error");
    
    console.log(`  ❌ Retry failed: ${error.message}`);
    
    return {
      paymentId: payment.id,
      success: false,
      error: error.message,
    };
  }
}

/**
 * Determine if a payment is from Paddle
 */
export function isPaddlePayment(payment: FailedPayment): boolean {
  return payment.stripeInvoiceId?.startsWith("paddle:") || 
         payment.stripeCustomerId?.startsWith("paddle:") ||
         payment.connectedAccountId === "paddle";
}
