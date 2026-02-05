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
    title: "Smart Payment Retries",
    description:
      "Decline codes determine retry timing. Card declined? Retry in 4 hours. Insufficient funds? Wait for payday. Not random guessing — algorithmic recovery.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: "Dunning Email Sequences",
    description:
      "Personalized emails sent at optimal times with direct card update links. Professional templates that preserve your brand — and get customers to act.",
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
  { value: "$2.4M+", label: "Revenue Recovered" },
  { value: "94%", label: "Recovery Rate" },
  { value: "3 min", label: "Setup Time" },
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
              Now recovering payments for 200+ SaaS companies
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 animate-slide-up">
              Stop losing 9% of your MRR to{" "}
              <span className="gradient-text">failed payments</span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up">
              <strong className="text-zinc-300">$1 out of every $11 you earn disappears</strong> because of expired cards and insufficient funds. Revive recovers it automatically with intelligent retries and personalized dunning emails — <strong className="text-zinc-300">no code required.</strong>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
              <Link
                href="/pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-medium px-8 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-brand-600/25"
              >
                Start Recovering Revenue
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

      {/* How it works */}
      <section className="py-20 md:py-32 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Three steps. That&apos;s it.
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              Connect your Stripe account, configure your preferences, and let
              Revive handle the rest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Connect Stripe",
                description:
                  "One-click OAuth connection to your Stripe account. No API keys to copy, no webhooks to set up.",
              },
              {
                step: "02",
                title: "Configure Rules",
                description:
                  "Set your retry schedule, customize dunning emails, and choose your recovery strategy.",
              },
              {
                step: "03",
                title: "Recover Revenue",
                description:
                  "Revive monitors your account 24/7, automatically retrying failed payments and emailing customers.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative glass rounded-2xl p-8 group hover:border-brand-500/20 transition-all"
              >
                <div className="text-5xl font-bold text-zinc-800 group-hover:text-brand-900 transition-colors mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {item.description}
                </p>
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

      {/* Social proof / CTA */}
      <section className="py-20 md:py-32 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="glass rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-600/10 via-transparent to-purple-600/10" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Every day you wait is revenue you lose
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-3">
                The average SaaS company loses <strong className="text-white">$8,300/month</strong> to failed payments. Revive recovers it automatically — starting in 3 minutes.
              </p>
              <p className="text-zinc-500 text-sm max-w-xl mx-auto mb-8">
                Setup takes less time than reading this page. Connect Stripe, configure once, recover forever.
              </p>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 bg-white text-zinc-900 font-semibold px-8 py-4 rounded-xl hover:bg-zinc-100 transition-all hover:shadow-lg hover:shadow-white/10"
              >
                Start Recovering Revenue Now
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
              <p className="text-xs text-zinc-600 mt-4">
                14-day free trial • No credit card required • Setup in 3 minutes
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
