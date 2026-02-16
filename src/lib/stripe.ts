import Stripe from "stripe";

let _stripe: Stripe | null = null;

/**
 * Get the Stripe client instance (lazy initialization)
 * This prevents build errors when STRIPE_SECRET_KEY is not set
 */
export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-01-28.clover",
    });
  }
  return _stripe;
}

// Legacy export for backwards compatibility
// (will throw at runtime if STRIPE_SECRET_KEY is not set during build)
export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2026-01-28.clover" })
  : (null as unknown as Stripe);

export default stripe;
