import Link from "next/link";

interface CompleteProps {
  recoveryConfig?: {
    strategy: string;
    emailsEnabled: boolean;
    senderName: string;
  };
}

export default function Complete({ recoveryConfig }: CompleteProps) {
  return (
    <div className="max-w-2xl mx-auto text-center animate-fade-in">
      {/* Success animation */}
      <div className="relative mb-8">
        <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 animate-pulse-slow">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl animate-pulse-slow" />
      </div>

      {/* Headline */}
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
        You&apos;re all set! 🎉
      </h1>

      <p className="text-lg text-zinc-400 mb-8 max-w-xl mx-auto leading-relaxed">
        Revive is now monitoring your Stripe account and will automatically recover failed payments 24/7.
      </p>

      {/* Summary */}
      <div className="glass rounded-2xl p-8 text-left mb-8">
        <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
          <span className="text-xl">📋</span>
          Your Configuration
        </h2>

        <div className="space-y-4">
          <div className="flex items-start justify-between p-4 rounded-lg bg-white/[0.02]">
            <div>
              <div className="text-sm text-zinc-500">Recovery Strategy</div>
              <div className="font-medium text-white capitalize">
                {recoveryConfig?.strategy || "Moderate"}
              </div>
            </div>
            <div className="h-8 w-8 rounded-lg bg-brand-600/10 text-brand-400 flex items-center justify-center text-lg">
              {recoveryConfig?.strategy === "aggressive" ? "🚀" : recoveryConfig?.strategy === "conservative" ? "🛡️" : "⚖️"}
            </div>
          </div>

          <div className="flex items-start justify-between p-4 rounded-lg bg-white/[0.02]">
            <div>
              <div className="text-sm text-zinc-500">Dunning Emails</div>
              <div className="font-medium text-white">
                {recoveryConfig?.emailsEnabled ? "Enabled" : "Disabled"}
              </div>
              {recoveryConfig?.emailsEnabled && (
                <div className="text-xs text-zinc-500 mt-1">
                  From: {recoveryConfig.senderName}
                </div>
              )}
            </div>
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              {recoveryConfig?.emailsEnabled ? "✓" : "✕"}
            </div>
          </div>

          <div className="flex items-start justify-between p-4 rounded-lg bg-white/[0.02]">
            <div>
              <div className="text-sm text-zinc-500">Stripe Connection</div>
              <div className="font-medium text-white">Connected & Verified</div>
            </div>
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              ✓
            </div>
          </div>
        </div>
      </div>

      {/* Next steps */}
      <div className="glass rounded-2xl p-8 text-left mb-8">
        <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
          <span className="text-xl">🎯</span>
          What to do next
        </h2>

        <div className="space-y-4">
          {[
            {
              title: "Check your dashboard",
              description: "View real-time recovery stats and payment history",
              icon: "📊",
            },
            {
              title: "Customize email templates",
              description: "Personalize dunning emails to match your brand voice",
              icon: "✉️",
            },
            {
              title: "Monitor recovery rate",
              description: "Track how much revenue Revive is saving each month",
              icon: "💰",
            },
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-white/[0.02]">
              <span className="text-2xl shrink-0">{step.icon}</span>
              <div>
                <h3 className="font-medium text-white mb-1">{step.title}</h3>
                <p className="text-sm text-zinc-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats preview */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Recovery", value: "Automated", icon: "📈" },
          { label: "Avg Setup Time", value: "3 min", icon: "⚡" },
          { label: "MRR Protected", value: "$0", icon: "🛡️" },
        ].map((stat) => (
          <div key={stat.label} className="glass rounded-xl p-4 text-center">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-lg font-bold text-white mb-1">{stat.value}</div>
            <div className="text-xs text-zinc-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <Link
          href="/dashboard"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-brand-600/25"
        >
          Go to Dashboard
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
        </Link>

        <Link
          href="/pricing"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-zinc-400 hover:text-white font-medium px-8 py-4 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all"
        >
          View Pricing
        </Link>
      </div>

      <p className="text-xs text-zinc-600 mt-6">
        Need help? <a href="mailto:support@revive-hq.com" className="text-brand-400 hover:text-brand-300">Contact support</a>
      </p>

      {/* Confetti effect indicator */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-10%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            {["🎉", "✨", "🎊", "💫", "🌟"][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>
    </div>
  );
}
