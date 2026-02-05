"use client";

import { useState } from "react";

interface ConnectStripeProps {
  onNext: () => void;
  onBack: () => void;
}

export default function ConnectStripe({ onNext, onBack }: ConnectStripeProps) {
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = () => {
    setConnecting(true);
    setError(null);
    
    // Store that we're in onboarding flow
    localStorage.setItem("onboarding_flow", "true");
    localStorage.setItem("onboarding_step", "2");
    
    // Redirect to Stripe Connect with return parameter
    window.location.href = "/api/connect?return=onboarding";
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      {/* Icon */}
      <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-[#635bff]/10 text-[#635bff] mb-6">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
        </svg>
      </div>

      {/* Headline */}
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
        Connect your Stripe account
      </h2>

      <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
        Revive uses Stripe Connect to securely access your payment data. 
        We&apos;ll never store your API keys or see sensitive card information.
      </p>

      {/* Security badges */}
      <div className="glass rounded-2xl p-8 mb-6">
        <div className="flex items-center gap-2 text-emerald-400 mb-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
          </svg>
          <span className="font-semibold">Bank-grade security</span>
        </div>

        <div className="space-y-3 text-sm text-zinc-400">
          {[
            "✓ OAuth 2.0 authentication (no API keys to manage)",
            "✓ SOC 2 compliant infrastructure",
            "✓ End-to-end encryption for all data",
            "✓ We never store or see card numbers",
            "✓ Disconnect anytime from your Stripe dashboard",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2">
              <span className="text-zinc-600 shrink-0">•</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* What we'll access */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="font-semibold mb-3 text-white">What Revive will access:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          {[
            { icon: "💳", label: "Failed payments", desc: "To detect and retry" },
            { icon: "👤", label: "Customer info", desc: "Email addresses only" },
            { icon: "📧", label: "Invoice data", desc: "For recovery context" },
            { icon: "🔔", label: "Webhook events", desc: "Real-time updates" },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02]">
              <span className="text-xl shrink-0">{item.icon}</span>
              <div>
                <div className="font-medium text-white">{item.label}</div>
                <div className="text-xs text-zinc-500">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onBack}
          className="flex-1 inline-flex items-center justify-center gap-2 text-zinc-400 hover:text-white font-medium px-6 py-4 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <button
          onClick={handleConnect}
          disabled={connecting}
          className="flex-[2] inline-flex items-center justify-center gap-2 bg-[#635bff] hover:bg-[#5851db] text-white font-semibold px-6 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-[#635bff]/25 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {connecting ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Connecting to Stripe...
            </>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
              </svg>
              Connect with Stripe
            </>
          )}
        </button>
      </div>

      <p className="text-xs text-zinc-600 mt-4 text-center">
        You&apos;ll be redirected to Stripe&apos;s secure login page
      </p>
    </div>
  );
}
