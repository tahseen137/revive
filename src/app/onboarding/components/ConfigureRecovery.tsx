"use client";

import { useState } from "react";

interface RecoveryConfig {
  strategy: "aggressive" | "moderate" | "conservative";
  emailsEnabled: boolean;
  senderName: string;
}

interface ConfigureRecoveryProps {
  onNext: (config: RecoveryConfig) => void;
  onBack: () => void;
  initialConfig?: RecoveryConfig;
}

const strategies = {
  aggressive: {
    name: "Aggressive",
    icon: "🚀",
    description: "Maximum recovery speed",
    details: "Retry within 4 hours, 4+ attempts, daily emails",
    schedule: ["4 hours", "24 hours", "48 hours", "7 days"],
  },
  moderate: {
    name: "Moderate",
    icon: "⚖️",
    description: "Balanced approach",
    details: "Smart timing, 3-4 attempts, spaced emails",
    schedule: ["4 hours", "3 days", "7 days"],
  },
  conservative: {
    name: "Conservative",
    icon: "🛡️",
    description: "Customer-friendly",
    details: "Gentle retries, 2-3 attempts, minimal emails",
    schedule: ["24 hours", "7 days"],
  },
};

export default function ConfigureRecovery({ onNext, onBack, initialConfig }: ConfigureRecoveryProps) {
  const [config, setConfig] = useState<RecoveryConfig>(
    initialConfig || {
      strategy: "moderate",
      emailsEnabled: true,
      senderName: "Billing Team",
    }
  );

  const handleNext = () => {
    // Save to localStorage
    localStorage.setItem("revive_recovery_config", JSON.stringify(config));
    onNext(config);
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      {/* Icon */}
      <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-brand-600/10 text-brand-400 mb-6">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      </div>

      {/* Headline */}
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
        Configure your recovery strategy
      </h2>

      <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
        Choose how aggressively Revive should retry failed payments and communicate with customers.
      </p>

      {/* Strategy selection */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-zinc-300 mb-4">
          Retry Strategy
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(Object.keys(strategies) as Array<keyof typeof strategies>).map((key) => {
            const strategy = strategies[key];
            const isSelected = config.strategy === key;

            return (
              <button
                key={key}
                onClick={() => setConfig({ ...config, strategy: key })}
                className={`
                  glass rounded-xl p-6 text-left transition-all
                  ${isSelected ? "border-brand-500/40 bg-brand-500/5 ring-2 ring-brand-500/20" : "border-white/5 hover:border-brand-500/20"}
                `}
              >
                <div className="text-3xl mb-3">{strategy.icon}</div>
                <h3 className="font-semibold text-white mb-1">{strategy.name}</h3>
                <p className="text-sm text-zinc-400 mb-3">{strategy.description}</p>
                <p className="text-xs text-zinc-500">{strategy.details}</p>

                {isSelected && (
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <div className="text-xs text-zinc-500 mb-2">Retry schedule:</div>
                    <div className="flex flex-wrap gap-2">
                      {strategy.schedule.map((time, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center px-2 py-1 rounded-md bg-brand-500/10 text-brand-400 text-xs"
                        >
                          +{time}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Email preferences */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="font-semibold text-white mb-4">Dunning Email Preferences</h3>

        {/* Enable/Disable emails */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] mb-4">
          <div>
            <div className="font-medium text-white">Send dunning emails</div>
            <div className="text-sm text-zinc-500">
              Automatically notify customers when payments fail
            </div>
          </div>
          <button
            onClick={() => setConfig({ ...config, emailsEnabled: !config.emailsEnabled })}
            className={`
              relative inline-flex h-6 w-11 items-center rounded-full transition-colors
              ${config.emailsEnabled ? "bg-brand-600" : "bg-zinc-700"}
            `}
          >
            <span
              className={`
                inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                ${config.emailsEnabled ? "translate-x-6" : "translate-x-1"}
              `}
            />
          </button>
        </div>

        {/* Sender name */}
        {config.emailsEnabled && (
          <div className="space-y-2">
            <label htmlFor="senderName" className="block text-sm font-medium text-zinc-300">
              Sender Name
            </label>
            <input
              id="senderName"
              type="text"
              value={config.senderName}
              onChange={(e) => setConfig({ ...config, senderName: e.target.value })}
              placeholder="e.g., Billing Team, Support, Your Company Name"
              className="w-full px-4 py-3 rounded-lg bg-zinc-900/50 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20 transition-all"
            />
            <p className="text-xs text-zinc-500">
              Emails will be sent from: {config.senderName || "Your Team"} &lt;noreply@revive-hq.com&gt;
            </p>
          </div>
        )}
      </div>

      {/* Preview */}
      {config.emailsEnabled && (
        <div className="glass rounded-2xl p-6 mb-8">
          <h3 className="font-semibold text-white mb-3">Email Preview</h3>
          <div className="bg-zinc-900/50 rounded-lg p-4 text-sm font-mono">
            <div className="text-zinc-500 mb-2">From: {config.senderName} &lt;noreply@revive-hq.com&gt;</div>
            <div className="text-zinc-500 mb-2">Subject: Payment Failed - Action Required</div>
            <div className="border-t border-zinc-800 pt-3 mt-3 text-zinc-400">
              <p className="mb-2">Hi [Customer],</p>
              <p className="mb-2">We tried to process your payment but it failed...</p>
              <p className="text-xs text-zinc-600">[Full preview available after setup]</p>
            </div>
          </div>
          <a
            href="/api/email/preview?type=payment_failed"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-brand-400 hover:text-brand-300 mt-3 transition-colors"
          >
            View full template
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </a>
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
          onClick={handleNext}
          className="flex-[2] inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-6 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-brand-600/25"
        >
          Continue
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
        </button>
      </div>
    </div>
  );
}
