"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface FailedPaymentData {
  id: string;
  amount: number;
  currency: string;
  status: string;
  failureReason: string;
  failureCode: string;
  customerEmail: string;
  createdAt: number;
}

interface PaymentStatusResponse {
  hasFailedPayment: boolean;
  payment: FailedPaymentData | null;
  updateUrl?: string;
}

interface FailedPaymentWallProps {
  /**
   * Stripe Customer ID to check payment status for
   * If not provided, will attempt to read from cookie or session
   */
  customerId?: string;
  
  /**
   * How often to poll for payment status (in milliseconds)
   * Default: 30 seconds
   */
  pollInterval?: number;

  /**
   * Whether to show the wall in demo mode (for testing)
   */
  demoMode?: boolean;
}

/**
 * Failed Payment Wall Component
 * 
 * Blocks access to the app when the current user has a failed payment.
 * Shows a modal with:
 * - Clear explanation of the payment failure
 * - Button to update payment method
 * - Professional, non-aggressive messaging
 * 
 * Integrates with existing Stripe webhook handlers and card update flow.
 */
export function FailedPaymentWall({
  customerId,
  pollInterval = 30000,
  demoMode = false,
}: FailedPaymentWallProps) {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch payment status
  const checkPaymentStatus = async () => {
    try {
      // In demo mode, simulate a failed payment
      if (demoMode) {
        setPaymentStatus({
          hasFailedPayment: true,
          payment: {
            id: "demo_payment_123",
            amount: 4900,
            currency: "usd",
            status: "dunning",
            failureReason: "Your card was declined",
            failureCode: "card_declined",
            customerEmail: "demo@example.com",
            createdAt: Date.now(),
          },
          updateUrl: "/update-card/demo_token",
        });
        setLoading(false);
        return;
      }

      // Try to get customerId from props, cookie, or localStorage
      const customerIdToCheck =
        customerId ||
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("revive_customer_id="))
          ?.split("=")[1] ||
        localStorage.getItem("revive_customer_id");

      if (!customerIdToCheck) {
        // No customer ID available - assume no failed payment
        setPaymentStatus({ hasFailedPayment: false, payment: null });
        setLoading(false);
        return;
      }

      const response = await fetch(
        `/api/payment-status?customerId=${encodeURIComponent(customerIdToCheck)}`
      );

      if (!response.ok) {
        throw new Error(`Failed to check payment status: ${response.statusText}`);
      }

      const data: PaymentStatusResponse = await response.json();
      setPaymentStatus(data);
      setError(null);
    } catch (err) {
      console.error("[FailedPaymentWall] Error checking payment status:", err);
      setError(err instanceof Error ? err.message : "Failed to check payment status");
      // On error, don't block access - fail open
      setPaymentStatus({ hasFailedPayment: false, payment: null });
    } finally {
      setLoading(false);
    }
  };

  // Initial check
  useEffect(() => {
    checkPaymentStatus();
  }, [customerId, demoMode]);

  // Poll for updates
  useEffect(() => {
    if (!pollInterval) return;

    const interval = setInterval(() => {
      checkPaymentStatus();
    }, pollInterval);

    return () => clearInterval(interval);
  }, [customerId, pollInterval, demoMode]);

  // Don't show anything while loading initial status
  if (loading) {
    return null;
  }

  // Don't block if no failed payment
  if (!paymentStatus?.hasFailedPayment || !paymentStatus.payment) {
    return null;
  }

  const payment = paymentStatus.payment;
  const updateUrl = paymentStatus.updateUrl || "/update-card";

  return (
    <>
      {/* Backdrop overlay - blocks all interaction */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]" />

      {/* Modal */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl max-w-lg w-full p-8 relative">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-center mb-3 text-white">
            Payment Update Required
          </h2>

          {/* Message */}
          <div className="space-y-4 mb-8 text-zinc-300">
            <p className="text-center">
              We weren't able to process your recent payment.
            </p>

            {payment.failureReason && (
              <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4">
                <p className="text-sm">
                  <span className="font-semibold text-zinc-200">Reason:</span>{" "}
                  {payment.failureReason}
                </p>
              </div>
            )}

            <p className="text-sm text-center">
              Please update your payment method to continue using Revive. Your account access
              will be restored immediately after updating your payment information.
            </p>

            {/* Amount due */}
            <div className="text-center pt-2">
              <p className="text-sm text-zinc-400">Amount Due</p>
              <p className="text-3xl font-bold text-white">
                ${(payment.amount / 100).toFixed(2)}{" "}
                <span className="text-lg text-zinc-400">{payment.currency.toUpperCase()}</span>
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <Link
            href={updateUrl}
            className="block w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-4 px-6 rounded-lg text-center transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02]"
          >
            Update Payment Method
          </Link>

          {/* Help text */}
          <p className="text-xs text-zinc-500 text-center mt-6">
            Need help? Contact us at{" "}
            <a
              href="mailto:support@revive-hq.com"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              support@revive-hq.com
            </a>
          </p>

          {/* Debug info (only in demo mode) */}
          {demoMode && (
            <div className="mt-6 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded text-xs text-yellow-200">
              <p className="font-semibold mb-1">⚠️ Demo Mode Active</p>
              <p>Payment ID: {payment.id}</p>
              <p>Status: {payment.status}</p>
              <p>Code: {payment.failureCode}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/**
 * Lightweight hook for checking payment status without rendering UI
 * Useful for conditionally rendering components or redirecting
 */
export function usePaymentStatus(customerId?: string) {
  const [hasFailedPayment, setHasFailedPayment] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const customerIdToCheck =
          customerId ||
          document.cookie
            .split("; ")
            .find((row) => row.startsWith("revive_customer_id="))
            ?.split("=")[1] ||
          localStorage.getItem("revive_customer_id");

        if (!customerIdToCheck) {
          setHasFailedPayment(false);
          setLoading(false);
          return;
        }

        const response = await fetch(
          `/api/payment-status?customerId=${encodeURIComponent(customerIdToCheck)}`
        );

        if (response.ok) {
          const data: PaymentStatusResponse = await response.json();
          setHasFailedPayment(data.hasFailedPayment);
        }
      } catch (err) {
        console.error("[usePaymentStatus] Error:", err);
        setHasFailedPayment(false);
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
  }, [customerId]);

  return { hasFailedPayment, loading };
}
