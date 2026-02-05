interface WelcomeProps {
  onNext: () => void;
}

export default function Welcome({ onNext }: WelcomeProps) {
  return (
    <div className="max-w-2xl mx-auto text-center animate-fade-in">
      {/* Icon */}
      <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 mb-6">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      </div>

      {/* Headline */}
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
        Welcome to <span className="gradient-text">Revive</span>
      </h1>

      <p className="text-lg text-zinc-400 mb-8 max-w-xl mx-auto leading-relaxed">
        Let&apos;s get you set up in less than 3 minutes. We&apos;ll connect your Stripe account, 
        configure your recovery preferences, and start recovering lost revenue automatically.
      </p>

      {/* What to expect */}
      <div className="glass rounded-2xl p-8 text-left mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="text-xl">🎯</span>
          What happens next
        </h2>
        <div className="space-y-4">
          {[
            {
              step: "1",
              title: "Connect Stripe",
              description: "One-click OAuth connection — no API keys, no webhooks to configure",
            },
            {
              step: "2",
              title: "Configure Recovery",
              description: "Choose your retry strategy and customize dunning email preferences",
            },
            {
              step: "3",
              title: "Test Connection",
              description: "We'll verify everything is working and ready to recover payments",
            },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-4">
              <div className="h-8 w-8 rounded-lg bg-brand-600/10 text-brand-400 flex items-center justify-center shrink-0 font-semibold">
                {item.step}
              </div>
              <div>
                <h3 className="font-medium text-white mb-1">{item.title}</h3>
                <p className="text-sm text-zinc-400">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: "⚡", label: "3 min setup" },
          { icon: "🔒", label: "Bank-grade security" },
          { icon: "📈", label: "Smart retry logic" },
        ].map((item) => (
          <div
            key={item.label}
            className="glass rounded-xl px-4 py-3 text-center"
          >
            <div className="text-2xl mb-1">{item.icon}</div>
            <div className="text-sm text-zinc-400">{item.label}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={onNext}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-brand-600/25"
      >
        Get Started
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

      <p className="text-xs text-zinc-600 mt-4">
        No credit card required • 14-day free trial • Cancel anytime
      </p>
    </div>
  );
}
