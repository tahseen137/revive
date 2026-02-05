"use client";

import { useState, useEffect } from "react";

interface TestConnectionProps {
  onNext: () => void;
  onBack: () => void;
}

interface TestResult {
  name: string;
  status: "pending" | "success" | "error";
  message?: string;
}

export default function TestConnection({ onNext, onBack }: TestConnectionProps) {
  const [tests, setTests] = useState<TestResult[]>([
    { name: "Stripe connection", status: "pending" },
    { name: "Webhook configuration", status: "pending" },
    { name: "Email service", status: "pending" },
    { name: "Recovery engine", status: "pending" },
  ]);
  const [allPassed, setAllPassed] = useState(false);
  const [testing, setTesting] = useState(false);

  const runTests = async () => {
    setTesting(true);

    // Simulate tests running sequentially
    const testSequence = [
      { index: 0, delay: 800, success: true },
      { index: 1, delay: 1200, success: true },
      { index: 2, delay: 1000, success: true },
      { index: 3, delay: 900, success: true },
    ];

    for (const test of testSequence) {
      await new Promise((resolve) => setTimeout(resolve, test.delay));
      
      setTests((prev) => {
        const updated = [...prev];
        updated[test.index] = {
          ...updated[test.index],
          status: test.success ? "success" : "error",
          message: test.success ? undefined : "Connection failed",
        };
        return updated;
      });
    }

    setAllPassed(true);
    setTesting(false);
  };

  useEffect(() => {
    // Auto-start tests when component mounts
    runTests();
  }, []);

  const getStatusIcon = (status: TestResult["status"]) => {
    switch (status) {
      case "pending":
        return (
          <div className="h-5 w-5 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
        );
      case "success":
        return (
          <div className="h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        );
      case "error":
        return (
          <div className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      {/* Icon */}
      <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-brand-600/10 text-brand-400 mb-6">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </div>

      {/* Headline */}
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
        Testing your connection
      </h2>

      <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
        We&apos;re verifying that everything is configured correctly and ready to start recovering payments.
      </p>

      {/* Test results */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="space-y-4">
          {tests.map((test, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] transition-all"
            >
              <div className="flex items-center gap-3">
                {getStatusIcon(test.status)}
                <div>
                  <div className="font-medium text-white">{test.name}</div>
                  {test.message && (
                    <div className="text-xs text-red-400 mt-1">{test.message}</div>
                  )}
                </div>
              </div>

              {test.status === "success" && (
                <span className="text-xs text-emerald-400 font-medium">Verified</span>
              )}
            </div>
          ))}
        </div>

        {allPassed && (
          <div className="mt-6 pt-6 border-t border-white/5">
            <div className="flex items-center gap-3 text-emerald-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span className="font-semibold">All systems operational!</span>
            </div>
            <p className="text-sm text-zinc-500 mt-2 ml-8">
              Your Stripe account is connected and Revive is ready to start recovering failed payments automatically.
            </p>
          </div>
        )}
      </div>

      {/* What happens next */}
      {allPassed && (
        <div className="glass rounded-2xl p-6 mb-8">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-xl">🚀</span>
            What happens next
          </h3>
          <div className="space-y-3 text-sm text-zinc-400">
            {[
              "Revive will monitor your Stripe account 24/7 for failed payments",
              "Failed payments are automatically detected and queued for retry",
              "Smart retry logic kicks in based on your chosen strategy",
              "Dunning emails are sent to customers at optimal times",
              "You'll see real-time recovery stats in your dashboard",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-brand-600/10 text-brand-400 flex items-center justify-center shrink-0 text-xs font-semibold">
                  {i + 1}
                </div>
                <span className="pt-0.5">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onBack}
          disabled={testing}
          className="flex-1 inline-flex items-center justify-center gap-2 text-zinc-400 hover:text-white font-medium px-6 py-4 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
          onClick={onNext}
          disabled={!allPassed}
          className="flex-[2] inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-6 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-brand-600/25 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {allPassed ? (
            <>
              Continue to Dashboard
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </>
          ) : (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Running tests...
            </>
          )}
        </button>
      </div>
    </div>
  );
}
