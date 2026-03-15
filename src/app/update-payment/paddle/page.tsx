"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

/**
 * Paddle Payment Update Page
 * 
 * Paddle doesn't provide a direct "update card" URL like Stripe.
 * Instead, we need to:
 * 1. Fetch the subscription from Paddle
 * 2. Use Paddle.js to open the payment method update overlay
 * 3. Or redirect to Paddle's billing portal
 */

function PaddleUpdateContent() {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("transaction");
  const customerId = searchParams.get("customer");
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updateUrl, setUpdateUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPaddleUpdateUrl() {
      try {
        if (!transactionId || !customerId) {
          throw new Error("Missing transaction or customer ID");
        }

        // Call our API to get the Paddle update URL
        const response = await fetch(
          `/api/paddle/get-update-url?transaction=${transactionId}&customer=${customerId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch update URL");
        }

        const data = await response.json();
        
        if (data.updateUrl) {
          setUpdateUrl(data.updateUrl);
          // Auto-redirect after 2 seconds
          setTimeout(() => {
            window.location.href = data.updateUrl;
          }, 2000);
        } else {
          throw new Error("No update URL available");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchPaddleUpdateUrl();
  }, [transactionId, customerId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <h1 className="text-xl font-semibold text-gray-900">Loading payment update...</h1>
          <p className="text-gray-600 mt-2">Please wait while we prepare your payment information</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Payment Update</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <a
            href="/"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition"
          >
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-green-500 text-5xl mb-4">✓</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Redirecting to Payment Update</h1>
        <p className="text-gray-600 mb-6">
          You&apos;ll be redirected to Paddle&apos;s secure payment portal in a moment...
        </p>
        {updateUrl && (
          <a
            href={updateUrl}
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition"
          >
            Continue to Payment Update →
          </a>
        )}
      </div>
    </div>
  );
}

export default function PaddleUpdatePaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <h1 className="text-xl font-semibold text-gray-900">Loading...</h1>
        </div>
      </div>
    }>
      <PaddleUpdateContent />
    </Suspense>
  );
}
