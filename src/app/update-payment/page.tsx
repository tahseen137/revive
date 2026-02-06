"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";

function UpdatePaymentContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [portalUrl, setPortalUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setError("Invalid or expired link.");
      return;
    }

    // Validate token server-side and get a secure Stripe portal URL
    async function validateAndGetPortal() {
      try {
        const res = await fetch("/api/update-payment/validate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const data = await res.json();

        if (res.ok && data.portalUrl) {
          setPortalUrl(data.portalUrl);
        } else {
          setError(data.error || "Invalid or expired link.");
        }
      } catch {
        setError("Failed to validate link. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    validateAndGetPortal();
  }, [token]);

  return (
    <main className="min-h-screen bg-[#09090b] flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="glass rounded-2xl p-8 text-center">
          <div className="h-16 w-16 mx-auto mb-6 rounded-full bg-brand-600/10 flex items-center justify-center">
            <svg
              width="28"
              height="28"
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

          <h1 className="text-2xl font-bold mb-3">Update Your Payment Method</h1>
          <p className="text-zinc-400 text-sm mb-8">
            Your recent payment couldn&apos;t be processed. Update your card details below to keep your account active.
          </p>

          {loading ? (
            <div className="text-zinc-500 text-sm">Validating your link...</div>
          ) : portalUrl ? (
            <div className="space-y-4">
              <a
                href={portalUrl}
                className="block w-full bg-brand-600 hover:bg-brand-500 text-white font-medium py-3.5 rounded-xl transition-colors text-center"
              >
                Open Stripe Customer Portal →
              </a>

              <p className="text-xs text-zinc-600">
                You&apos;ll be redirected to Stripe&apos;s secure portal to update your payment method.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-sm text-amber-400">
                {error || "Invalid or expired link. Please check your email for the latest payment update link."}
              </div>
              <Link
                href="/"
                className="inline-block text-brand-400 hover:text-brand-300 text-sm transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-zinc-600 mt-6">
          Secured by Stripe. Your card details are never stored on our servers.
        </p>
      </div>
    </main>
  );
}

export default function UpdatePaymentPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#09090b] flex items-center justify-center">
          <div className="text-zinc-500">Loading...</div>
        </main>
      }
    >
      <UpdatePaymentContent />
    </Suspense>
  );
}
