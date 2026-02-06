"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PaymentData {
  amount: number;
  currency: string;
  customerName: string;
  failureReason: string;
  businessName: string;
  invoiceId: string;
}

function CardUpdateForm({ token, paymentData }: { token: string; paymentData: PaymentData }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create payment method from card element
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error("Card element not found");
      }

      const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (pmError) {
        setError(pmError.message || "Failed to process card");
        setLoading(false);
        return;
      }

      // Send payment method to backend
      const res = await fetch("/api/update-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          paymentMethodId: paymentMethod.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update payment method");
      }

      setSuccess(true);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        if (data.redirectUrl) {
          window.location.href = data.redirectUrl;
        } else {
          router.push("/");
        }
      }, 2000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center space-y-4">
        <div className="h-16 w-16 mx-auto rounded-full bg-green-500/10 flex items-center justify-center">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-green-500"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white">Payment Updated!</h2>
        <p className="text-zinc-400">Your payment method has been updated successfully. We're processing your payment now.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Card Information
          </label>
          <div className="glass rounded-xl p-4">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#ffffff",
                    "::placeholder": {
                      color: "#71717a",
                    },
                  },
                  invalid: {
                    color: "#ef4444",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-brand-600 hover:bg-brand-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-medium py-3.5 rounded-xl transition-all disabled:cursor-not-allowed"
      >
        {loading ? "Processing..." : `Update Card & Retry Payment`}
      </button>

      <p className="text-xs text-zinc-600 text-center">
        🔒 Secured by Stripe. Your card details are encrypted and never stored on our servers.
      </p>
    </form>
  );
}

export default function UpdateCardPage() {
  const params = useParams();
  const token = params.token as string;
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function validateToken() {
      try {
        const res = await fetch("/api/update-card/validate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Invalid or expired link");
        }

        setPaymentData(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to load payment details");
      } finally {
        setLoading(false);
      }
    }

    validateToken();
  }, [token]);

  const formatCurrency = (cents: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(cents / 100);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#09090b] flex items-center justify-center px-6">
        <div className="text-zinc-500">Loading...</div>
      </main>
    );
  }

  if (error || !paymentData) {
    return (
      <main className="min-h-screen bg-[#09090b] flex items-center justify-center px-6">
        <div className="max-w-md w-full">
          <div className="glass rounded-2xl p-8 text-center">
            <div className="h-16 w-16 mx-auto mb-6 rounded-full bg-amber-500/10 flex items-center justify-center">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-amber-400"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-3 text-white">Link Expired</h1>
            <p className="text-zinc-400 text-sm">
              {error || "This payment update link has expired or is invalid. Please check your email for the latest link."}
            </p>
          </div>
        </div>
      </main>
    );
  }

  const elementsOptions: StripeElementsOptions = {
    mode: "setup",
    currency: paymentData.currency.toLowerCase(),
    appearance: {
      theme: "night",
      variables: {
        colorPrimary: "#6d28d9",
        colorBackground: "#18181b",
        colorText: "#ffffff",
        colorDanger: "#ef4444",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        borderRadius: "12px",
      },
    },
  };

  return (
    <main className="min-h-screen bg-[#09090b] flex items-center justify-center px-6 py-12">
      <div className="max-w-lg w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="h-14 w-14 mx-auto mb-4 rounded-full bg-brand-600/10 flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-brand-400"
            >
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-white">{paymentData.businessName}</h1>
          <p className="text-zinc-400 text-sm">Update your payment method</p>
        </div>

        {/* Payment Details Card */}
        <div className="glass rounded-2xl p-6 mb-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-zinc-800">
              <span className="text-sm text-zinc-400">Amount Due</span>
              <span className="text-2xl font-bold text-white">
                {formatCurrency(paymentData.amount, paymentData.currency)}
              </span>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-400">Customer</span>
              <span className="text-white">{paymentData.customerName}</span>
            </div>

            {paymentData.failureReason && (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-sm">
                <div className="text-amber-400 font-medium mb-1">Payment Failed</div>
                <div className="text-zinc-400">{paymentData.failureReason}</div>
              </div>
            )}
          </div>
        </div>

        {/* Card Form */}
        <div className="glass rounded-2xl p-6">
          <Elements stripe={stripePromise} options={elementsOptions}>
            <CardUpdateForm token={token} paymentData={paymentData} />
          </Elements>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-zinc-600 mt-6">
          Powered by <span className="text-brand-400 font-medium">Revive</span> — Automated Payment Recovery
        </p>
      </div>
    </main>
  );
}
