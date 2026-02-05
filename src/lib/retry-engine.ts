/**
 * Smart Retry Engine for Revive
 * 
 * Retry strategies based on failure reason:
 * - card_declined: Standard 4-retry schedule (most common, often transient)
 * - insufficient_funds: Extended gaps (funds may appear on payday)
 * - expired_card: Skip retries, go to dunning (need new card)
 * - processing_error: Quick retries (usually transient)
 * - authentication_required: Dunning only (need customer action)
 */

import Stripe from "stripe";
import {
  FailedPayment,
  getPaymentsDueForRetry,
  updateFailedPayment,
  markPaymentRecovered,
} from "./db";

// ============ Retry Schedules (delays in ms) ============

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

interface RetrySchedule {
  delays: number[]; // delay before each retry attempt
  maxRetries: number;
  skipRetries: boolean; // go straight to dunning
}

const RETRY_STRATEGIES: Record<string, RetrySchedule> = {
  // Standard: 4hrs, 24hrs, 72hrs, 7 days
  card_declined: {
    delays: [4 * HOUR, 24 * HOUR, 72 * HOUR, 7 * DAY],
    maxRetries: 4,
    skipRetries: false,
  },
  
  // Insufficient funds: 24hrs, 3 days, 7 days, 14 days (payday cycles)
  insufficient_funds: {
    delays: [24 * HOUR, 3 * DAY, 7 * DAY, 14 * DAY],
    maxRetries: 4,
    skipRetries: false,
  },
  
  // Expired card: no retries, go straight to dunning
  expired_card: {
    delays: [],
    maxRetries: 0,
    skipRetries: true,
  },
  
  // Processing errors: quick retries (1hr, 4hrs, 24hrs, 72hrs)
  processing_error: {
    delays: [1 * HOUR, 4 * HOUR, 24 * HOUR, 72 * HOUR],
    maxRetries: 4,
    skipRetries: false,
  },
  
  // Authentication required: no retries, need customer action
  authentication_required: {
    delays: [],
    maxRetries: 0,
    skipRetries: true,
  },
  
  // Default fallback
  default: {
    delays: [4 * HOUR, 24 * HOUR, 72 * HOUR, 7 * DAY],
    maxRetries: 4,
    skipRetries: false,
  },
};

// ============ Strategy Selection ============

export function getRetryStrategy(failureCode: string): RetrySchedule {
  // Map Stripe failure codes to our strategy categories
  const codeToStrategy: Record<string, string> = {
    card_declined: "card_declined",
    generic_decline: "card_declined",
    do_not_honor: "card_declined",
    insufficient_funds: "insufficient_funds",
    expired_card: "expired_card",
    processing_error: "processing_error",
    incorrect_cvc: "expired_card", // need customer action
    authentication_required: "authentication_required",
    card_not_supported: "expired_card",
    currency_not_supported: "expired_card",
    lost_card: "expired_card",
    stolen_card: "expired_card",
  };
  
  const strategyKey = codeToStrategy[failureCode] || "default";
  return RETRY_STRATEGIES[strategyKey];
}

export function calculateNextRetryTime(payment: FailedPayment): number | null {
  const strategy = getRetryStrategy(payment.failureCode);
  
  if (strategy.skipRetries) return null;
  if (payment.retryCount >= strategy.maxRetries) return null;
  
  const delay = strategy.delays[payment.retryCount] || strategy.delays[strategy.delays.length - 1];
  return Date.now() + delay;
}

export function getMaxRetries(failureCode: string): number {
  return getRetryStrategy(failureCode).maxRetries;
}

export function shouldSkipRetries(failureCode: string): boolean {
  return getRetryStrategy(failureCode).skipRetries;
}

// ============ Retry Execution ============

export interface RetryResult {
  paymentId: string;
  success: boolean;
  error?: string;
  stripePaymentIntentId?: string;
}

/**
 * Attempt to retry a failed payment via Stripe
 */
async function executeRetry(payment: FailedPayment): Promise<RetryResult> {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-01-28.clover",
  });
  
  try {
    // First, try to pay the invoice directly
    const invoice = await stripe.invoices.pay(payment.stripeInvoiceId, {
      stripeAccount: payment.connectedAccountId,
    });
    
    if (invoice.status === "paid") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pi = (invoice as any).payment_intent;
      return {
        paymentId: payment.id,
        success: true,
        stripePaymentIntentId: typeof pi === "string" ? pi : pi?.id,
      };
    }
    
    return {
      paymentId: payment.id,
      success: false,
      error: `Invoice status: ${invoice.status}`,
    };
  } catch (err: unknown) {
    const stripeErr = err as Stripe.errors.StripeError;
    
    // If invoice can't be paid directly, try creating a new payment intent
    if (stripeErr.code === "invoice_payment_intent_requires_action" ||
        stripeErr.code === "invoice_no_payment_method_types") {
      return {
        paymentId: payment.id,
        success: false,
        error: `Requires customer action: ${stripeErr.message}`,
      };
    }
    
    return {
      paymentId: payment.id,
      success: false,
      error: stripeErr.message || "Unknown Stripe error",
    };
  }
}

/**
 * Process all payments due for retry
 * Called by the cron job
 */
export async function processRetryQueue(): Promise<{
  processed: number;
  recovered: number;
  failed: number;
  rescheduled: number;
  results: RetryResult[];
}> {
  const duePayments = await getPaymentsDueForRetry();
  
  const results: RetryResult[] = [];
  let recovered = 0;
  let failed = 0;
  let rescheduled = 0;
  
  for (const payment of duePayments) {
    // Update status to retrying
    await updateFailedPayment(payment.id, { status: "retrying" });
    
    // Execute the retry
    const result = await executeRetry(payment);
    results.push(result);
    
    const now = Date.now();
    const newRetryCount = payment.retryCount + 1;
    
    if (result.success) {
      // Payment recovered!
      await updateFailedPayment(payment.id, {
        retryCount: newRetryCount,
        retryHistory: [
          ...payment.retryHistory,
          {
            attemptNumber: newRetryCount,
            timestamp: now,
            success: true,
            stripePaymentIntentId: result.stripePaymentIntentId,
          },
        ],
      });
      await markPaymentRecovered(payment.id);
      recovered++;
    } else {
      // Retry failed
      const strategy = getRetryStrategy(payment.failureCode);
      const nextRetryAt = newRetryCount < strategy.maxRetries
        ? calculateNextRetryTime({ ...payment, retryCount: newRetryCount })
        : null;
      
      const newStatus = nextRetryAt
        ? "pending"
        : newRetryCount >= strategy.maxRetries
          ? "dunning"
          : "failed";
      
      await updateFailedPayment(payment.id, {
        retryCount: newRetryCount,
        nextRetryAt,
        status: newStatus,
        retryHistory: [
          ...payment.retryHistory,
          {
            attemptNumber: newRetryCount,
            timestamp: now,
            success: false,
            error: result.error,
          },
        ],
      });
      
      if (nextRetryAt) {
        rescheduled++;
      } else {
        failed++;
      }
    }
  }
  
  return {
    processed: duePayments.length,
    recovered,
    failed,
    rescheduled,
    results,
  };
}

/**
 * Determine which dunning email to send based on payment state
 */
export function getDunningEmailType(payment: FailedPayment): "payment_failed" | "card_update_reminder" | "final_warning" | null {
  const sentTypes = new Set(payment.emailsSent.map(e => e.type));
  
  if (!sentTypes.has("payment_failed")) return "payment_failed";
  if (!sentTypes.has("card_update_reminder")) return "card_update_reminder";
  if (!sentTypes.has("final_warning")) return "final_warning";
  
  return null; // All emails sent
}

/**
 * Get human-readable retry schedule for a failure type
 */
export function getRetryScheduleDisplay(failureCode: string): {
  attempt: number;
  delay: string;
  strategy: string;
}[] {
  const schedule = getRetryStrategy(failureCode);
  
  if (schedule.skipRetries) {
    return [{
      attempt: 0,
      delay: "Immediate",
      strategy: "Dunning email only (retry won't help)",
    }];
  }
  
  return schedule.delays.map((delay, i) => {
    const hours = delay / HOUR;
    let delayStr: string;
    if (hours < 24) delayStr = `${hours}h later`;
    else delayStr = `${hours / 24}d later`;
    
    let strategy: string;
    if (i === 0) strategy = "Soft retry";
    else if (i === 1) strategy = "Retry + Payment failed email";
    else if (i === 2) strategy = "Retry + Card update reminder";
    else strategy = "Final retry + Urgent warning";
    
    return {
      attempt: i + 1,
      delay: delayStr,
      strategy,
    };
  });
}
