/**
 * Helper functions for generating payment update URLs
 * Supports both Stripe and Paddle
 */

import { FailedPayment } from "./db";

/**
 * Generate the payment update URL for a failed payment
 * Returns different URLs based on payment provider (Stripe vs Paddle)
 */
export function getPaymentUpdateUrl(payment: FailedPayment): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://revivehq.com";
  
  // Check if this is a Paddle payment
  const isPaddle = payment.stripeInvoiceId?.startsWith("paddle:") || 
                   payment.stripeCustomerId?.startsWith("paddle:") ||
                   payment.connectedAccountId === "paddle";

  if (isPaddle) {
    // For Paddle, we'll create a custom update page that redirects to Paddle's update flow
    // Paddle doesn't have a direct "update card" URL like Stripe
    const transactionId = payment.stripeInvoiceId.replace("paddle:", "");
    return `${baseUrl}/update-payment/paddle?transaction=${transactionId}&customer=${payment.stripeCustomerId.replace("paddle:", "")}`;
  }

  // For Stripe, use the existing update-payment page
  return `${baseUrl}/update-payment?invoice=${payment.stripeInvoiceId}&customer=${payment.stripeCustomerId}`;
}

/**
 * Get the provider name from a payment
 */
export function getPaymentProvider(payment: FailedPayment): "stripe" | "paddle" {
  const isPaddle = payment.stripeInvoiceId?.startsWith("paddle:") || 
                   payment.stripeCustomerId?.startsWith("paddle:") ||
                   payment.connectedAccountId === "paddle";
  
  return isPaddle ? "paddle" : "stripe";
}

/**
 * Get provider-specific invoice ID (strips prefix if present)
 */
export function getProviderInvoiceId(payment: FailedPayment): string {
  return payment.stripeInvoiceId.replace(/^paddle:/, "").replace(/^stripe:/, "");
}

/**
 * Get provider-specific customer ID (strips prefix if present)
 */
export function getProviderCustomerId(payment: FailedPayment): string {
  return payment.stripeCustomerId.replace(/^paddle:/, "").replace(/^stripe:/, "");
}
