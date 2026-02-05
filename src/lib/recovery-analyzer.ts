/**
 * Recovery Analyzer for Revive
 * 
 * Scans a connected Stripe account's last 30 days of failed payments
 * to show: "You lost $X to failed payments. Revive would have recovered $Y."
 */

import Stripe from "stripe";
import { createFailedPayment } from "./db";
import { calculateNextRetryTime, getMaxRetries, shouldSkipRetries } from "./retry-engine";

const RECOVERY_RATE_ESTIMATE = 0.87; // 87% estimated recovery rate based on industry data

// Helper: extract subscription ID from invoice (Clover API structure)
function getInvoiceSubscriptionId(invoice: Stripe.Invoice): string | undefined {
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

interface AnalysisResult {
  totalFailedPayments: number;
  totalFailedAmount: number; // cents
  estimatedRecoverable: number; // cents
  byFailureReason: Record<string, { count: number; amount: number }>;
  topCustomers: { email: string; name: string; amount: number; count: number }[];
  importedPayments: number;
  currency: string;
}

/**
 * Scan a connected Stripe account for failed payments in the last 30 days
 */
export async function analyzeConnectedAccount(
  connectedAccountId: string,
): Promise<AnalysisResult> {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-01-28.clover",
  });

  const thirtyDaysAgo = Math.floor((Date.now() - 30 * 24 * 60 * 60 * 1000) / 1000);

  // Fetch failed invoices from the connected account
  const invoices: Stripe.Invoice[] = [];
  let hasMore = true;
  let startingAfter: string | undefined;

  while (hasMore) {
    const params: Stripe.InvoiceListParams = {
      status: "open", // unpaid invoices
      created: { gte: thirtyDaysAgo },
      limit: 100,
      expand: ["data.customer", "data.charge"],
    };
    if (startingAfter) params.starting_after = startingAfter;

    try {
      const result = await stripe.invoices.list(params, {
        stripeAccount: connectedAccountId,
      });
      invoices.push(...result.data);
      hasMore = result.has_more;
      if (result.data.length > 0) {
        startingAfter = result.data[result.data.length - 1].id;
      }
    } catch (err) {
      console.error("Error fetching invoices from connected account:", err);
      hasMore = false;
    }
  }

  // Also check for voided/uncollectible invoices (fully failed)
  try {
    const voidedInvoices = await stripe.invoices.list(
      {
        status: "uncollectible",
        created: { gte: thirtyDaysAgo },
        limit: 100,
        expand: ["data.customer"],
      },
      { stripeAccount: connectedAccountId }
    );
    invoices.push(...voidedInvoices.data);
  } catch (err) {
    console.error("Error fetching uncollectible invoices:", err);
  }

  // Analyze the results
  let totalFailedAmount = 0;
  const byFailureReason: Record<string, { count: number; amount: number }> = {};
  const customerMap = new Map<string, { email: string; name: string; amount: number; count: number }>();
  let importedCount = 0;
  let currency = "usd";

  for (const invoice of invoices) {
    const amount = invoice.amount_due || 0;
    totalFailedAmount += amount;
    currency = invoice.currency || "usd";

    // Determine failure reason
    let failureCode = "card_declined";
    let failureReason = "Payment failed";
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const invoiceAny = invoice as any;
    if (invoiceAny.last_finalization_error) {
      failureCode = invoiceAny.last_finalization_error.code || "card_declined";
      failureReason = invoiceAny.last_finalization_error.message || "Payment failed";
    }

    // Aggregate by failure reason
    if (!byFailureReason[failureCode]) {
      byFailureReason[failureCode] = { count: 0, amount: 0 };
    }
    byFailureReason[failureCode].count++;
    byFailureReason[failureCode].amount += amount;

    // Aggregate by customer
    const customer = invoice.customer as Stripe.Customer | null;
    const email = customer?.email || (typeof invoice.customer_email === "string" ? invoice.customer_email : "unknown");
    const name = customer?.name || email;
    
    if (!customerMap.has(email)) {
      customerMap.set(email, { email, name, amount: 0, count: 0 });
    }
    const cust = customerMap.get(email)!;
    cust.amount += amount;
    cust.count++;

    // Import the failed payment into our system
    try {
      const skipRetries = shouldSkipRetries(failureCode);
      const maxRetries = getMaxRetries(failureCode);
      
      const paymentData = {
        stripeInvoiceId: invoice.id,
        stripeCustomerId: typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id || "",
        stripeSubscriptionId: getInvoiceSubscriptionId(invoice),
        connectedAccountId,
        customerEmail: email,
        customerName: name,
        amount,
        currency,
        failureReason,
        failureCode,
        maxRetries,
        nextRetryAt: skipRetries ? null : calculateNextRetryTime({
          id: "",
          stripeInvoiceId: invoice.id,
          stripeCustomerId: "",
          connectedAccountId,
          customerEmail: email,
          customerName: name,
          amount,
          currency,
          failureReason,
          failureCode,
          retryCount: 0,
          maxRetries,
          nextRetryAt: null,
          status: "pending",
          retryHistory: [],
          emailsSent: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
          recoveredAt: null,
        }),
        status: skipRetries ? "expired_card" as const : "pending" as const,
      };

      await createFailedPayment(paymentData);
      importedCount++;
    } catch (err) {
      console.error(`Failed to import payment ${invoice.id}:`, err);
    }
  }

  // Sort customers by amount
  const topCustomers = Array.from(customerMap.values())
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 10);

  return {
    totalFailedPayments: invoices.length,
    totalFailedAmount,
    estimatedRecoverable: Math.round(totalFailedAmount * RECOVERY_RATE_ESTIMATE),
    byFailureReason,
    topCustomers,
    importedPayments: importedCount,
    currency,
  };
}

/**
 * Format analysis for display
 */
export function formatAnalysisForDisplay(analysis: AnalysisResult): {
  lostAmount: string;
  recoverableAmount: string;
  failedCount: number;
  topReason: string;
  topReasonCount: number;
} {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: analysis.currency.toUpperCase(),
  });

  // Find top failure reason
  let topReason = "card_declined";
  let topReasonCount = 0;
  for (const [reason, data] of Object.entries(analysis.byFailureReason)) {
    if (data.count > topReasonCount) {
      topReason = reason;
      topReasonCount = data.count;
    }
  }

  const reasonLabels: Record<string, string> = {
    card_declined: "Card Declined",
    insufficient_funds: "Insufficient Funds",
    expired_card: "Expired Card",
    processing_error: "Processing Error",
    authentication_required: "Auth Required",
  };

  return {
    lostAmount: formatter.format(analysis.totalFailedAmount / 100),
    recoverableAmount: formatter.format(analysis.estimatedRecoverable / 100),
    failedCount: analysis.totalFailedPayments,
    topReason: reasonLabels[topReason] || topReason,
    topReasonCount,
  };
}
