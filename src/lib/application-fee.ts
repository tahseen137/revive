/**
 * Application Fee Logic for Revive
 *
 * Revive's business model: 15% of recovered revenue as an application fee
 * via Stripe Connect's application_fee_amount.
 *
 * When we retry a payment on a connected account, we add the fee so
 * Revive earns money only when the customer successfully recovers revenue.
 */

/** Revive's take rate — 15% of the recovered amount */
export const APPLICATION_FEE_PERCENT = 15;

/**
 * Calculate the application fee in the smallest currency unit (e.g. cents).
 *
 * @param amountInSmallestUnit - The total charge amount (e.g. 4999 for $49.99)
 * @returns The fee amount in the same unit, rounded down to avoid overcharging
 */
export function calculateApplicationFee(amountInSmallestUnit: number): number {
  // Floor to avoid charging more than the percentage
  return Math.floor((amountInSmallestUnit * APPLICATION_FEE_PERCENT) / 100);
}

/**
 * Build the Stripe-compatible params that should be merged into an
 * invoice.pay() or paymentIntent.create() call when processing a
 * payment on behalf of a connected account.
 *
 * Example usage:
 *   const feeParams = getApplicationFeeParams(payment.amount, payment.connectedAccountId);
 *   await stripe.invoices.pay(invoiceId, feeParams.invoicePayParams, feeParams.requestOptions);
 */
export function getApplicationFeeParams(
  amountInSmallestUnit: number,
  connectedAccountId: string
): {
  applicationFeeAmount: number;
  invoicePayParams: Record<string, unknown>;
  requestOptions: { stripeAccount: string };
} {
  const fee = calculateApplicationFee(amountInSmallestUnit);

  return {
    applicationFeeAmount: fee,
    invoicePayParams: {
      application_fee_amount: fee,
    },
    requestOptions: {
      stripeAccount: connectedAccountId,
    },
  };
}

/**
 * Human-readable summary of the fee for a given amount.
 */
export function formatFeeBreakdown(
  amountCents: number,
  currency: string = "usd"
): {
  totalFormatted: string;
  feeFormatted: string;
  netFormatted: string;
  feePercent: number;
} {
  const fee = calculateApplicationFee(amountCents);
  const net = amountCents - fee;

  const fmt = (cents: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(cents / 100);

  return {
    totalFormatted: fmt(amountCents),
    feeFormatted: fmt(fee),
    netFormatted: fmt(net),
    feePercent: APPLICATION_FEE_PERCENT,
  };
}
