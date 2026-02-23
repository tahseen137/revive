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
        <path d="M4 6h16M4 12h16M4 18h7" />
        <circle cx="17" cy="18" r="3" />
        <path d="M17 15v6M14 18h6" />
      </svg>
    ),
    title: "Multi-Platform Integration",
    description:
      "Connect Stripe, Lemon Squeezy, Gumroad, Paddle, or Polar.sh in one click via OAuth. No code changes, no webhooks to manage — works wherever you sell.",
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
      "Enterprise-grade encryption. Your credentials are encrypted at rest and in transit. We never store card data — all payments flow through your payment platform's secure API.",
  },
];

const stats = [
  { value: "$49/mo", label: "vs ChurnKey's $250" },
  { value: "$0", label: "Revenue Tax — vs ChurnKey's 25% cut" },
  { value: "5 min", label: "Setup — one script tag" },
  { value: "24/7", label: "Automated Recovery" },
];

const comparisonRows = [
  {
    feature: "Monthly fee",
    revive: "$49",
    churnkey: "$250",
    churnbuster: "$249",
    baremetrics: "$204",
    reviveIsGood: true,
  },
  {
    feature: "Revenue share",
    revive: "None",
    churnkey: "10–25%",
    churnbuster: "None",
    baremetrics: "None",
    reviveIsGood: true,
  },
  {
    feature: "Win-back campaigns",
    revive: "✅",
    churnkey: "❌",
    churnbuster: "❌",
    baremetrics: "❌",
    reviveIsGood: true,
  },
  {
    feature: "Lemon Squeezy / Gumroad",
    revive: "✅",
    churnkey: "❌",
    churnbuster: "❌",
    baremetrics: "❌",
    reviveIsGood: true,
  },
  {
    feature: "Setup time",
    revive: "5 min",
    churnkey: "Hours (per reviews)",
    churnbuster: "Hours",
    baremetrics: "Hours",
    reviveIsGood: true,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32" id="how-it-works">
        {/* Background effects */}
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-600/10 rounded-full blur-[120px]" />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300 text-xs font-medium mb-8 animate-fade-in">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-pulse" />
              5-minute setup &bull; No revenue tax &bull; Works with Stripe, Lemon Squeezy, Gumroad &amp; Paddle
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 animate-slide-up">
              Win back churned customers for{" "}
              <span className="gradient-text">$49/mo.</span>{" "}
              <span className="text-zinc-400 text-3xl md:text-4xl lg:text-5xl font-semibold block mt-3">
                Not $250 + 25% of your revenue.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up">
              Revive automatically recovers failed payments{" "}
              <strong className="text-zinc-300">AND</strong> re-engages customers who voluntarily cancelled. No ChurnKey, no Baremetrics, no revenue tax —{" "}
              <strong className="text-zinc-300">just flat $49/mo.</strong>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
              <Link
                href="/api/connect"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-brand-600/25 text-lg"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
                </svg>
                Connect Stripe — Start Free
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href="#how-it-works"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-zinc-400 hover:text-white font-medium px-8 py-4 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all"
              >
                See how it works
              </a>
            </div>

            <p className="text-sm text-zinc-500 mt-4 animate-slide-up">
              Free until it pays for itself. No engineers required.
            </p>
          </div>

          {/* Stats bar */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center glass rounded-xl p-6">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Support Strip */}
      <section className="py-12 border-t border-white/5 bg-zinc-950/60">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-center text-xs text-zinc-500 uppercase tracking-widest mb-8">
            Works with all major payment platforms — not just Stripe
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
            {/* Stripe */}
            <div className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[#6772e5]">
                <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
              </svg>
              <span className="font-semibold text-sm">Stripe</span>
            </div>
            {/* Lemon Squeezy */}
            <div className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition-colors">
              <span className="text-xl">🍋</span>
              <span className="font-semibold text-sm">Lemon Squeezy</span>
            </div>
            {/* Gumroad */}
            <div className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition-colors">
              <span className="text-xl">🛍️</span>
              <span className="font-semibold text-sm">Gumroad</span>
            </div>
            {/* Paddle */}
            <div className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition-colors">
              <span className="text-xl">🏓</span>
              <span className="font-semibold text-sm">Paddle</span>
            </div>
            {/* Polar.sh */}
            <div className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition-colors">
              <span className="text-xl">⭐</span>
              <span className="font-semibold text-sm">Polar.sh</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Revive — 3 columns */}
      <section className="py-20 md:py-32 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Why indie founders choose Revive
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              Enterprise churn tools were built for enterprise budgets. Revive wasn&apos;t.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* No Revenue Tax */}
            <div className="glass rounded-2xl p-8 flex flex-col hover:border-brand-500/20 transition-all">
              <div className="h-12 w-12 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">No Revenue Tax</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                ChurnKey takes 10-25% of everything they recover. We charge $49 flat. The more we recover, the more you save.
              </p>
            </div>

            {/* Works Everywhere */}
            <div className="glass rounded-2xl p-8 flex flex-col hover:border-brand-500/20 transition-all">
              <div className="h-12 w-12 rounded-xl bg-brand-600/10 text-brand-400 flex items-center justify-center mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 6h16M4 12h16M4 18h7" />
                  <circle cx="17" cy="18" r="3" />
                  <path d="M17 15v6M14 18h6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Works Everywhere</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                ChurnKey and Baremetrics only work with Stripe. Revive supports Stripe, Lemon Squeezy, Gumroad, Paddle, and Polar.sh.
              </p>
            </div>

            {/* Active Win-Back */}
            <div className="glass rounded-2xl p-8 flex flex-col hover:border-brand-500/20 transition-all">
              <div className="h-12 w-12 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Active Win-Back</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Competitors show dashboards. We act. Automated campaigns re-engage customers 7, 14, and 30 days after they cancel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Competitor Comparison Table */}
      <section className="py-20 md:py-32 border-t border-white/5 bg-zinc-950/40" id="compare">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              The math is simple
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              Compare what you actually pay at $10K MRR
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-4 px-4 text-zinc-500 text-sm font-medium w-44" />
                  {/* Revive column header — highlighted */}
                  <th className="py-4 px-4 text-center">
                    <div className="inline-flex flex-col items-center bg-brand-600/20 border border-brand-500/30 rounded-xl px-5 py-2">
                      <span className="text-brand-300 font-bold text-base">Revive</span>
                      <span className="text-brand-400/70 text-xs mt-0.5">That&apos;s us ✦</span>
                    </div>
                  </th>
                  <th className="py-4 px-4 text-center text-zinc-400 font-medium text-sm">ChurnKey</th>
                  <th className="py-4 px-4 text-center text-zinc-400 font-medium text-sm">Churn Buster</th>
                  <th className="py-4 px-4 text-center text-zinc-400 font-medium text-sm">Baremetrics</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, idx) => (
                  <tr key={row.feature} className={idx % 2 === 0 ? "bg-white/[0.02]" : ""}>
                    <td className="py-4 px-4 text-zinc-300 text-sm font-medium">{row.feature}</td>
                    {/* Revive cell — highlighted */}
                    <td className="py-4 px-4 text-center bg-brand-600/10 border-x border-brand-500/20">
                      <span className={`font-semibold text-sm ${
                        row.revive === "✅" ? "text-green-400 text-lg" : "text-brand-300"
                      }`}>
                        {row.revive}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`text-sm ${
                        row.churnkey === "❌" ? "text-red-400 text-lg" : "text-zinc-400"
                      }`}>
                        {row.churnkey}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`text-sm ${
                        row.churnbuster === "❌" ? "text-red-400 text-lg" : "text-zinc-400"
                      }`}>
                        {row.churnbuster}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`text-sm ${
                        row.baremetrics === "❌" ? "text-red-400 text-lg" : "text-zinc-400"
                      }`}>
                        {row.baremetrics}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 glass rounded-xl p-5 text-center">
            <p className="text-zinc-400 text-sm leading-relaxed">
              💡{" "}
              <strong className="text-zinc-200">
                At $10K MRR with 10% churn recovered:
              </strong>{" "}
              ChurnKey charges $250 + up to $250 in revenue tax ={" "}
              <span className="text-red-400 font-semibold">$500+/mo.</span>{" "}
              Revive charges{" "}
              <span className="text-green-400 font-semibold">$49.</span>
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
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
            <div className="hidden md:block absolute top-20 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-brand-500/50 via-brand-400/50 to-brand-500/50" />

            {[
              {
                step: 1,
                emoji: "🔗",
                title: "Connect Your Platform",
                description:
                  "One-click OAuth connection to Stripe, Lemon Squeezy, Gumroad, Paddle, or Polar.sh. No API keys, no webhooks, no code changes required.",
              },
              {
                step: 2,
                emoji: "🤖",
                title: "We Detect & Recover",
                description:
                  "Smart retries analyze decline codes. Win-back campaigns activate 7, 14, and 30 days after cancellation. Personalized emails with one-click payment updates.",
              },
              {
                step: 3,
                emoji: "💰",
                title: "Watch Revenue Grow",
                description:
                  "Real-time dashboard shows every dollar recovered. Track every retry and recovery, hands-free — for $49/mo flat.",
              },
            ].map((item) => (
              <div key={item.step} className="relative flex flex-col items-center text-center group">
                <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-brand-600 to-brand-500 flex items-center justify-center text-white font-bold text-xl mb-6 shadow-lg shadow-brand-600/25 group-hover:scale-110 transition-transform">
                  {item.step}
                </div>
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {item.emoji}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">{item.description}</p>
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
              Built for indie founders and SaaS teams across every major payment platform.
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
                <p className="text-sm text-zinc-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-20 md:py-32 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="glass rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-600/10 via-transparent to-purple-600/10" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/5 text-green-400 text-xs font-medium mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                Live Now — Connect &amp; Start Recovering
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Stop paying ChurnKey $500/mo when you could pay $49
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-3">
                Free until it pays for itself. Connect your payment platform and we&apos;ll show you how much you&apos;ve lost in the last 30 days.
              </p>
              <p className="text-zinc-500 text-sm max-w-xl mx-auto mb-8">
                No credit card required. No revenue tax. No ChurnKey.
              </p>
              <Link
                href="/api/connect"
                className="inline-flex items-center gap-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-10 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-brand-600/25 text-lg"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
                </svg>
                Connect Stripe — Start Free
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <p className="text-xs text-zinc-600 mt-6">
                🔒 Read-only access via OAuth. We never see your password or card data.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
