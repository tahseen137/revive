"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// ── Steps shown during the 3-second setup animation ──
const STEPS = [
  "Connecting to Stripe...",
  "Scanning your last 90 days of payments...",
  "Analyzing failure patterns...",
  "Setting up smart retry schedules...",
  "All set! Redirecting to your dashboard...",
];

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const accountId  = searchParams.get("account") || "";
  const accountName =
    searchParams.get("name") ||
    searchParams.get("business") ||
    accountId ||
    "your Stripe account";
  const lostAmount      = searchParams.get("lost")        || "";
  const recoverableAmount = searchParams.get("recoverable") || "";
  const failedCount     = searchParams.get("failedCount") || "";
  const importedCount   = searchParams.get("imported")    || "";

  const [step, setStep]       = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Step through labels every ~550ms
    const stepTimer = setInterval(() => {
      setStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 550);

    // Smooth progress bar to 100% over 3s
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        // Ease out toward 95 quickly, last 5% jumps on redirect
        return prev + (prev < 90 ? 3 : 0.5);
      });
    }, 80);

    // Hard redirect after 3 s
    const redirectTimer = setTimeout(() => {
      setProgress(100);
      const params = new URLSearchParams({ connected: "true" });
      if (accountId)        params.set("account",     accountId);
      if (lostAmount)       params.set("lost",         lostAmount);
      if (recoverableAmount) params.set("recoverable", recoverableAmount);
      if (failedCount)      params.set("failedCount",  failedCount);
      if (importedCount)    params.set("imported",     importedCount);
      router.push(`/dashboard?${params.toString()}`);
    }, 3000);

    return () => {
      clearInterval(stepTimer);
      clearInterval(progressTimer);
      clearTimeout(redirectTimer);
    };
  }, [router, accountId, lostAmount, recoverableAmount, failedCount, importedCount]);

  return (
    <main className="min-h-screen bg-[#09090b] flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/25">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
          </div>
          <span className="text-2xl font-bold tracking-tight">Revive</span>
        </div>

        {/* Headline */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold mb-2">Setting up your account&hellip;</h1>
          <p className="text-zinc-400 text-sm">
            Connected to{" "}
            <span className="text-white font-medium">{accountName}</span>
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-zinc-800/80 rounded-full h-1.5 mb-8 overflow-hidden">
          <div
            className="bg-gradient-to-r from-brand-600 to-brand-400 h-1.5 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Step list */}
        <div className="space-y-3 mb-10">
          {STEPS.map((s, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 text-sm transition-all duration-300 ${
                i < step  ? "text-emerald-400" :
                i === step ? "text-white" :
                "text-zinc-600"
              }`}
            >
              <div className={`h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                i < step  ? "bg-emerald-500/20" :
                i === step ? "bg-brand-500/20" :
                "bg-zinc-800"
              }`}>
                {i < step ? (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : i === step ? (
                  <div className="h-2 w-2 rounded-full bg-brand-400 animate-pulse" />
                ) : null}
              </div>
              <span>{s}</span>
            </div>
          ))}
        </div>

        {/* Scanning callout */}
        <div className="glass rounded-xl p-5">
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">🔍</span>
            <div>
              <p className="text-sm font-medium text-white mb-1">
                Scanning your last 90 days of payments
              </p>
              <p className="text-xs text-zinc-500 leading-relaxed">
                We&apos;re combing through your payment history to surface recovery opportunities.
                On average we find <strong className="text-zinc-300">5–15%</strong> of your MRR hiding in failed payments.
              </p>
              {failedCount && (
                <div className="mt-3 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand-400 animate-pulse" />
                  <span className="text-xs text-brand-400 font-medium">
                    Found {failedCount} failed payments so far&hellip;
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="text-xs text-zinc-600 text-center mt-6">
          Redirecting to your dashboard in a moment
        </p>
      </div>
    </main>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#09090b] flex items-center justify-center">
          <div className="text-zinc-500 text-sm">Loading&hellip;</div>
        </main>
      }
    >
      <OnboardingContent />
    </Suspense>
  );
}
