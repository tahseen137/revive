'use client';

/**
 * Failed Payment Wall Component (Light Theme)
 * 
 * Displays a blocking modal when a user has a failed payment.
 * Prevents access to the app until payment method is updated.
 * 
 * This is a key retention feature — Churnkey reports 4-12% recovery lift
 * from in-app payment walls beyond email dunning alone.
 */

import { useEffect, useState } from 'react';

// Inline SVG icon components (no external dependency needed)
function XCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 9l-6 6M9 9l6 6" />
    </svg>
  );
}

function CreditCardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

function AlertTriangleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

interface FailedPayment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  failureReason: string;
  failureCode: string;
  customerEmail: string;
  createdAt: number;
}

interface PaymentWallProps {
  customerId: string | null;
  enabled?: boolean; // Allow disabling for testing/demo mode
}

export default function PaymentWall({ customerId, enabled = true }: PaymentWallProps) {
  const [isBlocking, setIsBlocking] = useState(false);
  const [payment, setPayment] = useState<FailedPayment | null>(null);
  const [updateUrl, setUpdateUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!customerId || !enabled) {
      setLoading(false);
      return;
    }

    async function checkPaymentStatus() {
      try {
        const response = await fetch(`/api/payment-status?customerId=${encodeURIComponent(customerId!)}`);
        
        if (!response.ok) {
          throw new Error('Failed to check payment status');
        }

        const data = await response.json();

        if (data.hasFailedPayment) {
          setIsBlocking(true);
          setPayment(data.payment);
          setUpdateUrl(data.updateUrl);
        }
      } catch (err) {
        console.error('[PaymentWall] Error checking status:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    checkPaymentStatus();
  }, [customerId, enabled]);

  // Don't render anything if not blocking
  if (!isBlocking || !payment || loading) {
    return null;
  }

  // Format amount for display
  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  // User-friendly decline reason
  const getDeclineMessage = (failureCode: string) => {
    switch (failureCode) {
      case 'card_declined':
        return 'Your card was declined by your bank.';
      case 'insufficient_funds':
        return 'Your card has insufficient funds.';
      case 'expired_card':
        return 'Your card has expired.';
      case 'incorrect_cvc':
        return 'The CVC code you entered was incorrect.';
      case 'processing_error':
        return 'There was a processing error. Please try again.';
      case 'authentication_required':
        return 'Your bank requires additional authentication.';
      default:
        return 'Your payment could not be processed.';
    }
  };

  return (
    <>
      {/* Backdrop - blocks all interaction */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]"
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in duration-300">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-red-100 p-4 rounded-full">
              <AlertTriangleIcon className="w-12 h-12 text-red-600" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
            Payment Required
          </h2>

          {/* Message */}
          <p className="text-gray-600 text-center mb-6">
            Your subscription payment has failed. Please update your payment method to continue using our service.
          </p>

          {/* Payment Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Amount Due:</span>
              <span className="font-semibold text-gray-900">
                {formatAmount(payment.amount, payment.currency)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Status:</span>
              <span className="font-semibold text-red-600 uppercase">
                {payment.status}
              </span>
            </div>
            <div className="text-sm text-gray-600 mt-3 pt-3 border-t border-gray-200">
              <XCircleIcon className="w-4 h-4 inline mr-2 text-red-500" />
              {getDeclineMessage(payment.failureCode)}
            </div>
          </div>

          {/* CTA Button */}
          <a
            href={updateUrl}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
          >
            <CreditCardIcon className="w-5 h-5" />
            Update Payment Method
          </a>

          {/* Help Text */}
          <p className="text-xs text-gray-500 text-center mt-4">
            Need help? Contact us at{' '}
            <a href="mailto:support@revive-hq.com" className="text-violet-600 hover:underline">
              support@revive-hq.com
            </a>
          </p>

          {/* Error Display (if any) */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
