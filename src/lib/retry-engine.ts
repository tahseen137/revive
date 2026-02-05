/**
 * Smart Retry Engine for Revive
 * 
 * Intelligent retry strategies based on failure reason:
 * - card_declined: 4hrs → 24hrs → 72hrs with time optimization
 * - insufficient_funds: Payday-aware scheduling (1st, 15th, Fridays @ 10am)
 * - expired_card: Skip retries, immediate dunning (need new card)
 * - processing_error: Fast retry (1 hour)
 * - authentication_required: Dunning only (need customer action)
 * 
 * Features:
 * - Payday detection for insufficient_funds failures
 * - Time-of-day optimization (10am local time when possible)
 * - Exponential backoff with jitter for generic failures
 * - Detailed logging for each retry decision
 */

import Stripe from "stripe";
import {
  FailedPayment,
  getPaymentsDueForRetry,
  updateFailedPayment,
  markPaymentRecovered,
} from "./db";

// ============ Time Constants ============

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

// Target retry time: 10am local time (assuming Eastern for now)
const TARGET_HOUR_OF_DAY = 10;

interface RetrySchedule {
  delays: number[]; // delay before each retry attempt
  maxRetries: number;
  skipRetries: boolean; // go straight to dunning
  usePaydayDetection?: boolean; // use smart payday scheduling
  useTimeOptimization?: boolean; // schedule for 10am when possible
}

const RETRY_STRATEGIES: Record<string, RetrySchedule> = {
  // Standard card decline: 4hrs, 24hrs, 72hrs (with time optimization)
  card_declined: {
    delays: [4 * HOUR, 24 * HOUR, 72 * HOUR],
    maxRetries: 3,
    skipRetries: false,
    useTimeOptimization: true,
  },
  
  // Insufficient funds: Use payday detection
  // Will override delays with smart payday scheduling
  insufficient_funds: {
    delays: [24 * HOUR, 3 * DAY, 7 * DAY, 14 * DAY], // fallback if payday fails
    maxRetries: 4,
    skipRetries: false,
    usePaydayDetection: true,
    useTimeOptimization: true,
  },
  
  // Expired card: no retries, go straight to dunning
  expired_card: {
    delays: [],
    maxRetries: 0,
    skipRetries: true,
  },
  
  // Processing errors: quick retry (1 hour)
  processing_error: {
    delays: [1 * HOUR],
    maxRetries: 1,
    skipRetries: false,
  },
  
  // Authentication required: no retries, need customer action
  authentication_required: {
    delays: [],
    maxRetries: 0,
    skipRetries: true,
  },
  
  // Default fallback: exponential backoff with jitter
  default: {
    delays: [4 * HOUR, 24 * HOUR, 72 * HOUR],
    maxRetries: 3,
    skipRetries: false,
    useTimeOptimization: true,
  },
};

// ============ Payday Detection Logic ============

/**
 * Calculate the next likely payday date
 * Returns timestamp for next: 1st of month, 15th of month, or Friday @ 10am
 */
function getNextPayday(fromDate: Date = new Date()): Date {
  const candidates: Date[] = [];
  
  // Check next 30 days for paydays
  for (let i = 1; i <= 30; i++) {
    const date = new Date(fromDate);
    date.setDate(date.getDate() + i);
    date.setHours(TARGET_HOUR_OF_DAY, 0, 0, 0);
    
    const day = date.getDate();
    const dayOfWeek = date.getDay();
    
    // 1st of month
    if (day === 1) {
      candidates.push(new Date(date));
    }
    
    // 15th of month
    if (day === 15) {
      candidates.push(new Date(date));
    }
    
    // Friday (5 = Friday)
    if (dayOfWeek === 5) {
      candidates.push(new Date(date));
    }
  }
  
  // Return the earliest payday candidate
  candidates.sort((a, b) => a.getTime() - b.getTime());
  return candidates[0] || new Date(fromDate.getTime() + 7 * DAY);
}

/**
 * Get payday schedule for insufficient_funds retries
 * Attempts align with likely payday cycles
 */
function getPaydayRetrySchedule(retryCount: number, fromDate: Date = new Date()): number {
  const schedules = [
    // First retry: next payday (could be 1st, 15th, or Friday)
    () => getNextPayday(fromDate).getTime() - fromDate.getTime(),
    
    // Second retry: next payday after first
    () => {
      const firstPayday = getNextPayday(fromDate);
      return getNextPayday(firstPayday).getTime() - fromDate.getTime();
    },
    
    // Third retry: one more payday cycle
    () => {
      const firstPayday = getNextPayday(fromDate);
      const secondPayday = getNextPayday(firstPayday);
      return getNextPayday(secondPayday).getTime() - fromDate.getTime();
    },
    
    // Fourth retry: final attempt after 14 days
    () => 14 * DAY,
  ];
  
  const scheduleFunc = schedules[retryCount] || schedules[schedules.length - 1];
  return scheduleFunc();
}

// ============ Time-of-Day Optimization ============

/**
 * Adjust a timestamp to target 10am local time
 * If delay is > 12 hours, schedule for next 10am
 */
function optimizeTimeOfDay(timestamp: number): number {
  const date = new Date(timestamp);
  const hour = date.getHours();
  
  // If scheduled time is between 10am-11am, keep it
  if (hour >= TARGET_HOUR_OF_DAY && hour < TARGET_HOUR_OF_DAY + 1) {
    return timestamp;
  }
  
  // If scheduled time is before 10am today, move to 10am today
  if (hour < TARGET_HOUR_OF_DAY) {
    date.setHours(TARGET_HOUR_OF_DAY, 0, 0, 0);
    return date.getTime();
  }
  
  // If scheduled time is after 11am, move to 10am next day
  date.setDate(date.getDate() + 1);
  date.setHours(TARGET_HOUR_OF_DAY, 0, 0, 0);
  return date.getTime();
}

// ============ Exponential Backoff with Jitter ============

/**
 * Calculate exponential backoff delay with jitter
 * Formula: min(max_delay, base * 2^attempt) + random_jitter
 */
function exponentialBackoffWithJitter(
  attempt: number,
  baseDelay: number = 4 * HOUR,
  maxDelay: number = 7 * DAY
): number {
  // Exponential: base * 2^attempt
  const exponential = baseDelay * Math.pow(2, attempt);
  const capped = Math.min(exponential, maxDelay);
  
  // Add jitter: ±10% random variance
  const jitterPercent = 0.1;
  const jitter = capped * jitterPercent * (Math.random() * 2 - 1);
  
  return Math.floor(capped + jitter);
}

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
  
  console.log(`[Retry Engine] Calculating next retry for payment ${payment.id}`);
  console.log(`  Failure code: ${payment.failureCode}`);
  console.log(`  Current retry count: ${payment.retryCount}`);
  console.log(`  Max retries: ${strategy.maxRetries}`);
  
  if (strategy.skipRetries) {
    console.log(`  ❌ Strategy: Skip retries (${payment.failureCode} requires customer action)`);
    console.log(`  📧 Action: Send dunning email immediately`);
    return null;
  }
  
  if (payment.retryCount >= strategy.maxRetries) {
    console.log(`  ❌ Max retries reached (${payment.retryCount}/${strategy.maxRetries})`);
    console.log(`  📧 Action: Move to dunning status`);
    return null;
  }
  
  let delay: number;
  let schedulingReason: string;
  
  // Special handling for insufficient_funds with payday detection
  if (strategy.usePaydayDetection && payment.failureCode === "insufficient_funds") {
    delay = getPaydayRetrySchedule(payment.retryCount);
    schedulingReason = "payday detection";
    console.log(`  💰 Using payday detection for insufficient_funds`);
  }
  // Use exponential backoff for default strategy
  else if (payment.failureCode === "default" || !RETRY_STRATEGIES[payment.failureCode]) {
    delay = exponentialBackoffWithJitter(payment.retryCount);
    schedulingReason = "exponential backoff with jitter";
    console.log(`  📈 Using exponential backoff with jitter`);
  }
  // Use standard delay from strategy
  else {
    delay = strategy.delays[payment.retryCount] || strategy.delays[strategy.delays.length - 1];
    schedulingReason = "standard retry schedule";
    console.log(`  ⏰ Using standard retry schedule`);
  }
  
  let nextRetryAt = Date.now() + delay;
  
  // Apply time-of-day optimization if enabled and delay > 4 hours
  if (strategy.useTimeOptimization && delay > 4 * HOUR) {
    const beforeOptimization = nextRetryAt;
    nextRetryAt = optimizeTimeOfDay(nextRetryAt);
    
    if (beforeOptimization !== nextRetryAt) {
      console.log(`  🕐 Time optimization: Adjusted to 10am local time`);
      schedulingReason += " + 10am optimization";
    }
  }
  
  const delayHours = Math.round(delay / HOUR * 10) / 10;
  const retryDate = new Date(nextRetryAt);
  
  console.log(`  ✅ Next retry scheduled:`);
  console.log(`     Attempt: ${payment.retryCount + 1}/${strategy.maxRetries}`);
  console.log(`     Delay: ${delayHours} hours`);
  console.log(`     Schedule: ${retryDate.toLocaleString('en-US', { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit',
    timeZoneName: 'short'
  })}`);
  console.log(`     Strategy: ${schedulingReason}`);
  
  return nextRetryAt;
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
  
  console.log(`[Retry Engine] 🔄 Executing retry for payment ${payment.id}`);
  console.log(`  Invoice: ${payment.stripeInvoiceId}`);
  console.log(`  Customer: ${payment.customerEmail}`);
  console.log(`  Amount: ${payment.amount / 100} ${payment.currency.toUpperCase()}`);
  console.log(`  Attempt: ${payment.retryCount + 1}/${payment.maxRetries}`);
  console.log(`  Original failure: ${payment.failureCode}`);
  
  try {
    // First, try to pay the invoice directly
    const invoice = await stripe.invoices.pay(payment.stripeInvoiceId, {
      stripeAccount: payment.connectedAccountId === "direct" ? undefined : payment.connectedAccountId,
    });
    
    if (invoice.status === "paid") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pi = (invoice as any).payment_intent;
      const piId = typeof pi === "string" ? pi : pi?.id;
      
      console.log(`  ✅ SUCCESS! Payment recovered`);
      console.log(`  Payment Intent: ${piId}`);
      
      return {
        paymentId: payment.id,
        success: true,
        stripePaymentIntentId: piId,
      };
    }
    
    console.log(`  ❌ Payment failed - Invoice status: ${invoice.status}`);
    
    return {
      paymentId: payment.id,
      success: false,
      error: `Invoice status: ${invoice.status}`,
    };
  } catch (err: unknown) {
    const stripeErr = err as Stripe.errors.StripeError;
    
    console.log(`  ❌ Payment failed - ${stripeErr.code || 'Unknown error'}`);
    console.log(`  Error: ${stripeErr.message}`);
    
    // If invoice can't be paid directly, try creating a new payment intent
    if (stripeErr.code === "invoice_payment_intent_requires_action" ||
        stripeErr.code === "invoice_no_payment_method_types") {
      console.log(`  📧 Requires customer action - switching to dunning`);
      
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
  
  console.log(`\n[Retry Engine] 🚀 Processing retry queue`);
  console.log(`  Due for retry: ${duePayments.length} payments`);
  console.log(`  Timestamp: ${new Date().toISOString()}\n`);
  
  const results: RetryResult[] = [];
  let recovered = 0;
  let failed = 0;
  let rescheduled = 0;
  
  for (const payment of duePayments) {
    console.log(`\n--- Processing payment ${payment.id} ---`);
    
    // Update status to retrying
    await updateFailedPayment(payment.id, { status: "retrying" });
    
    // Execute the retry
    const result = await executeRetry(payment);
    results.push(result);
    
    const now = Date.now();
    const newRetryCount = payment.retryCount + 1;
    
    if (result.success) {
      // Payment recovered!
      console.log(`\n🎉 Payment ${payment.id} RECOVERED!`);
      console.log(`  Total attempts: ${newRetryCount}`);
      console.log(`  Amount recovered: ${payment.amount / 100} ${payment.currency.toUpperCase()}`);
      
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
      // Retry failed - decide next step
      const strategy = getRetryStrategy(payment.failureCode);
      const nextRetryAt = newRetryCount < strategy.maxRetries
        ? calculateNextRetryTime({ ...payment, retryCount: newRetryCount })
        : null;
      
      const newStatus = nextRetryAt
        ? "pending"
        : newRetryCount >= strategy.maxRetries
          ? "dunning"
          : "failed";
      
      if (nextRetryAt) {
        console.log(`\n⏭️  Payment ${payment.id} will retry again`);
        rescheduled++;
      } else {
        console.log(`\n📧 Payment ${payment.id} moved to dunning`);
        console.log(`  Reason: ${newRetryCount >= strategy.maxRetries ? 'Max retries reached' : 'No retry strategy'}`);
        failed++;
      }
      
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
    }
  }
  
  console.log(`\n[Retry Engine] 📊 Queue processing complete`);
  console.log(`  Total processed: ${duePayments.length}`);
  console.log(`  ✅ Recovered: ${recovered}`);
  console.log(`  ⏭️  Rescheduled: ${rescheduled}`);
  console.log(`  ❌ Failed/Dunning: ${failed}\n`);
  
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
  
  // Special display for insufficient_funds with payday detection
  if (schedule.usePaydayDetection && failureCode === "insufficient_funds") {
    return [
      {
        attempt: 1,
        delay: "Next payday (1st, 15th, or Friday)",
        strategy: "Smart payday detection @ 10am",
      },
      {
        attempt: 2,
        delay: "Following payday",
        strategy: "Second payday attempt",
      },
      {
        attempt: 3,
        delay: "Next payday cycle",
        strategy: "Third payday attempt",
      },
      {
        attempt: 4,
        delay: "14 days later",
        strategy: "Final attempt",
      },
    ];
  }
  
  return schedule.delays.map((delay, i) => {
    const hours = delay / HOUR;
    let delayStr: string;
    if (hours < 24) delayStr = `${hours}h later`;
    else delayStr = `${hours / 24}d later`;
    
    let strategy: string;
    if (schedule.useTimeOptimization && delay > 4 * HOUR) {
      delayStr += " @ 10am";
    }
    
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
