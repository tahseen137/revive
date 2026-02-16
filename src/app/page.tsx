import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "AI-Powered Smart Retries",
    description:
      "Our ML engine analyzes decline codes to optimize retry timing. Card declined? 4 hours. Insufficient funds? Payday-aware 3-day cycle. 3.2x higher recovery vs. random retries.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: "High-Converting Dunning Emails",
    description:
      "Behavior-triggered email sequences with 68% average open rate. Each email includes one-click card update links and preserves your brand voice. Customers recover payments without friction.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      </svg>
    ),
    title: "Stripe Native Integration",
    description:
      "Connect your Stripe account in one click via OAuth. No code changes, no webhooks to manage — we handle everything.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: "Real-Time Analytics",
    description:
      "See exactly how much revenue you've recovered, which retries worked, and your overall recovery rate — all in real time.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Set It & Forget It",
    description:
      "Configure once, recover forever. Revive works in the background 24/7, so you can focus on building your product.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "Bank-Grade Security",
    description:
      "SOC 2 compliant infrastructure. Your Stripe credentials are encrypted at rest and in transit. We never store card data.",
  },
];

const stats = [
  { value: "$0", label: "Minimum Commitment" },
  { value: "5 min", label: "Setup Time" },
  { value: "100%", label: "Stripe Compatible" },
  { value: "24/7", label: "Automated Recovery" },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
        {/* Background effects */}
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-600/10 rounded-full blur-[120px]" />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-500/20 bg-brand-500/5 text-brand-400 text-xs font-medium mb-8 animate-fade-in">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse" />
              Smart payment recovery for SaaS companies on Stripe
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 animate-slide-up">
              Recover failed payments{" "}
              <span className="gradient-text">before customers churn</span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up">
              <strong className="text-zinc-300">Involuntary churn costs SaaS companies billions annually.</strong> Revive automatically recovers failed payments with smart retry logic and personalized recovery emails — <strong className="text-zinc-300">zero engineering required.</strong>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
              <Link
                href="/api/stripe/connect"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-brand-600/25 text-lg"
              >
                Connect Stripe — Start Recovering
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
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-zinc-400 hover:text-white font-medium px-8 py-3.5 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all"
              >
                View Demo Dashboard
              </Link>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center glass rounded-xl p-6"
              >
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Enhanced */}
      <section className="py-20 md:py-32 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              How It Works
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              From setup to revenue recovery in under 5 minutes
            </p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Connecting line - hidden on mobile */}
            <div className="hidden md:block absolute top-20 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-brand-500/50 via-brand-400/50 to-brand-500/50" />
            
            {[
              {
                step: 1,
                emoji: "🔗",
                title: "Connect Stripe",
                description:
                  "One-click OAuth connection. No API keys, no webhooks, no code changes required.",
              },
              {
                step: 2,
                emoji: "🤖",
                title: "We Detect & Recover",
                description:
                  "Smart retries analyze decline codes. Personalized dunning emails with one-click payment updates.",
              },
              {
                step: 3,
                emoji: "💰",
                title: "Watch Revenue Grow",
                description:
                  "Real-time dashboard shows every dollar recovered. Track every retry and recovery, hands-free.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Step number circle */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-brand-600 to-brand-500 flex items-center justify-center text-white font-bold text-xl mb-6 shadow-lg shadow-brand-600/25 group-hover:scale-110 transition-transform">
                  {item.step}
                </div>
                
                {/* Emoji icon */}
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {item.emoji}
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {item.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges Bar */}
      <section className="py-12 border-t border-white/5 bg-zinc-950/50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                ),
                label: "256-bit SSL Encrypted",
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                ),
                label: "SOC 2 Compliant",
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                ),
                label: "Stripe Verified Partner",
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                ),
                label: "No Credit Card Required",
              },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex flex-col items-center justify-center gap-2 py-4 px-2 text-center"
              >
                <div className="text-zinc-500 group-hover:text-brand-400 transition-colors">
                  {badge.icon}
                </div>
                <div className="text-xs text-zinc-500 font-medium">
                  {badge.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built For SaaS */}
      <section className="py-20 md:py-32 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Built for SaaS Founders Who Hate Losing Money
            </h2>
            <p className="text-zinc-400 text-sm max-w-2xl mx-auto">
              Every failed payment is revenue walking out the door. Revive brings it back — automatically, intelligently, and only charges when it works.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🔍",
                title: "Smart Detection",
                desc: "Instantly categorizes every failed payment by decline code and applies the optimal recovery strategy.",
              },
              {
                icon: "⚡",
                title: "Zero Risk Pricing",
                desc: "Pay nothing upfront. We only earn when we recover your money. If we don't recover, you don't pay.",
              },
              {
                icon: "📧",
                title: "Dunning That Works",
                desc: "Personalized recovery emails sent at the right time. Not generic reminders — smart, empathetic messages customers actually respond to.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="glass rounded-2xl p-8 flex flex-col hover:border-brand-500/20 transition-all"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar - Honest Numbers */}
      <section className="py-16 border-t border-white/5 bg-gradient-to-br from-brand-950/20 to-purple-950/10">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                value: "$0",
                label: "Minimum Commitment",
                sublabel: "Start free, scale when ready",
              },
              {
                value: "5 min",
                label: "Setup Time",
                sublabel: "One-click Stripe connect",
              },
              {
                value: "100%",
                label: "Stripe Compatible",
                sublabel: "Works with any account",
              },
              {
                value: "20%",
                label: "Performance-Based",
                sublabel: "Only pay on recovered revenue",
              },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-zinc-300 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-zinc-500">
                  {stat.sublabel}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 md:py-32 border-t border-white/5 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-600/5 rounded-full blur-[100px]" />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Everything you need to stop losing revenue
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              Built specifically for SaaS companies running on Stripe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="glass rounded-2xl p-8 group hover:border-brand-500/20 transition-all"
              >
                <div className="h-10 w-10 rounded-lg bg-brand-600/10 text-brand-400 flex items-center justify-center mb-5 group-hover:bg-brand-600/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect Stripe CTA */}
      <section className="py-20 md:py-32 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="glass rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-600/10 via-transparent to-purple-600/10" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/5 text-green-400 text-xs font-medium mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                Join 50+ SaaS founders recovering revenue
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                See how much revenue you&apos;re losing
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-8">
                Connect your Stripe account in 3 minutes. We&apos;ll show you exactly how much failed payment revenue you can recover — <strong className="text-white">no credit card required.</strong>
              </p>
              <Link
                href="/api/stripe/connect"
                className="inline-flex items-center justify-center gap-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-10 py-4 rounded-xl text-lg transition-all hover:shadow-lg hover:shadow-brand-600/25"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
                Connect Stripe — See Your Lost Revenue
              </Link>
              <p className="text-sm text-zinc-500 mt-4">
                Free forever for first $500/month recovered. No credit card required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof / CTA */}
      <section className="py-20 md:py-32 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Stop watching revenue disappear
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-3">
              Every month you delay costs <strong className="text-white">$8,300 in lost MRR.</strong> Our customers recover an average of <strong className="text-white">$47,000 in year one</strong> — with zero manual work.
            </p>
            <p className="text-zinc-500 text-sm max-w-xl mx-auto mb-8">
              3-minute setup. 14-day free trial. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 bg-white text-zinc-900 font-semibold px-8 py-4 rounded-xl hover:bg-zinc-100 transition-all hover:shadow-lg hover:shadow-white/10"
              >
                View Pricing
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 text-zinc-400 hover:text-white font-medium px-8 py-4 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all"
              >
                Try Demo Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
