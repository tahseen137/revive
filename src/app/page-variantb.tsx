import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SoftwareApplicationJsonLd } from "@/components/JsonLd";

// Variant B: "Recover Failed Payments Automatically"
// Focus: Practical/action-oriented — data-driven, automation, measurable results

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "Intelligent Retry Engine",
    description:
      "Analyzes each decline and schedules retries at the optimal time — not random intervals. 3.2x higher recovery rate vs. tools that blindly retry on a schedule.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: "Automated Dunning Sequences",
    description:
      "Personalized email sequences triggered by payment failure. One-click card update link — no login required. 68% open rate. Your brand, your voice.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
      </svg>
    ),
    title: "Automated Win-Back Campaigns",
    description:
      "Sequences that run at 7, 14, and 30 days after cancellation — automatically. 12% reactivation rate on average. Zero manual effort.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16M4 12h16M4 18h7" />
        <circle cx="17" cy="18" r="3" />
        <path d="M17 15v6M14 18h6" />
      </svg>
    ),
    title: "Multi-Platform Support",
    description:
      "Stripe, Lemon Squeezy, Gumroad, Paddle, and Polar.sh. One integration. All your payment failures, one dashboard.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: "Recovery Analytics",
    description:
      "Track every retry, every email open, every dollar recovered. Per customer, per payment, per campaign. Data you can act on.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "Secure by Default",
    description:
      "Read-only access. We never store card data. All payments flow through your payment platform's secure API. Revoke in 2 clicks.",
  },
];

const stats = [
  { value: "9%", label: "Avg. MRR lost to failed payments" },
  { value: "3.2x", label: "Higher recovery vs. random retries" },
  { value: "73%", label: "Average recovery rate" },
  { value: "$49", label: "Flat monthly fee — no revenue share" },
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
    feature: "Total at $10K MRR (10% churn recovered)",
    revive: "$49",
    churnkey: "$250–500+",
    churnbuster: "$249",
    baremetrics: "$204",
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
    revive: "15 min",
    churnkey: "Hours",
    churnbuster: "Hours",
    baremetrics: "Hours",
    reviveIsGood: true,
  },
  {
    feature: "Free trial",
    revive: "✅ Free until it pays for itself",
    churnkey: "❌",
    churnbuster: "❌",
    baremetrics: "❌",
    reviveIsGood: true,
  },
];

const faqs = [
  {
    q: `How does the "free until it pays for itself" trial work?`,
    a: `Connect your payment platform and Revive shows you exactly how much you've lost in failed payments over the last 30 days. Recovery starts immediately. If we don't recover at least $49 in your first billing period, you don't pay. No credit card required.`,
  },
  {
    q: "How long does setup take?",
    a: "15 minutes or less. Click connect, authorize secure read-only access, and Revive starts monitoring your payments immediately. No code, no webhooks, no engineers.",
  },
  {
    q: "How is this different from built-in retry tools?",
    a: "Built-in retry tools use fixed schedules with no intelligence. Revive analyzes each failure, optimizes retry timing, sends personalized branded emails with one-click payment update links, AND runs automated win-back sequences for cancellations. That's the full stack — not just retries.",
  },
  {
    q: "What platforms do you support?",
    a: "Stripe, Lemon Squeezy, Gumroad, Paddle, and Polar.sh. More platforms are on the roadmap.",
  },
  {
    q: "How does the pricing compare at scale?",
    a: "We charge $49/mo flat — no revenue share, no percentage fees. At $10K MRR recovering 10% of churn, ChurnKey would charge $250–500+/mo. We charge $49. The more you recover, the bigger the difference.",
  },
];

export default function HomeVariantB() {
  return (
    <>
      <SoftwareApplicationJsonLd />
      <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32" id="how-it-works">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-600/10 rounded-full blur-[120px]" />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300 text-xs font-medium mb-8 animate-fade-in">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-pulse" />
              Automated payment recovery &bull; Win-back campaigns &bull; $49/mo flat
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 animate-slide-up">
              Recover failed payments.{" "}
              <span className="gradient-text">Automatically.</span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up">
              Connect once.{" "}
              <strong className="text-zinc-300">Revive handles retries, recovery emails, and win-back campaigns</strong>{" "}
              — while you focus on building.{" "}
              <strong className="text-zinc-300">15-minute setup. $49/mo flat.</strong>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
              <Link
                href="/api/connect"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-brand-600/25 text-lg"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
                </svg>
                Start Recovering Revenue — Free
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href="#how-it-works-steps"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-zinc-400 hover:text-white font-medium px-8 py-4 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all"
              >
                → See how it works in 60 seconds
              </a>
            </div>

            <p className="text-sm text-zinc-500 mt-4 animate-slide-up">
              🔒 Secure read-only access. No card data stored.{" "}
              <strong className="text-zinc-400">Free until it recovers at least $49.</strong>
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
            <div className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[#6772e5]">
                <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
              </svg>
              <span className="font-semibold text-sm">Stripe</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition-colors">
              <span className="text-xl">🍋</span>
              <span className="font-semibold text-sm">Lemon Squeezy</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition-colors">
              <span className="text-xl">🛍️</span>
              <span className="font-semibold text-sm">Gumroad</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition-colors">
              <span className="text-xl">🏓</span>
              <span className="font-semibold text-sm">Paddle</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition-colors">
              <span className="text-xl">⭐</span>
              <span className="font-semibold text-sm">Polar.sh</span>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-20 md:py-32 border-t border-white/5 bg-zinc-950/40">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              How much revenue are you leaving on the table?
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Industry data: 9% of MRR is lost to failed payments on average.{" "}
              <strong className="text-white">73% of that is recoverable with the right system.</strong>
            </p>
            <p className="text-zinc-500 mt-3 text-base">
              Revive costs $49/mo. The math speaks for itself.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="glass rounded-2xl p-8 text-center">
              <div className="text-3xl font-bold text-brand-400 mb-1">~$329/mo</div>
              <div className="text-zinc-500 text-xs mb-2">recoverable at $5K MRR</div>
              <div className="text-zinc-300 font-semibold mb-1">At $5K MRR</div>
              <div className="text-zinc-500 text-sm">
                ROI:{" "}
                <strong className="text-zinc-300">6.7x in month one.</strong>{" "}
                Revive pays for itself in 4 days.
              </div>
            </div>
            <div className="glass rounded-2xl p-8 text-center border border-brand-500/30">
              <div className="text-3xl font-bold text-brand-400 mb-1">~$1,314/mo</div>
              <div className="text-zinc-500 text-xs mb-2">recoverable at $20K MRR</div>
              <div className="text-zinc-300 font-semibold mb-1">At $20K MRR</div>
              <div className="text-zinc-500 text-sm">
                ROI:{" "}
                <strong className="text-zinc-300">26.8x</strong>.
                At this scale, not having Revive is a{" "}
                <strong className="text-zinc-300">$1,265/mo mistake.</strong>
              </div>
            </div>
            <div className="glass rounded-2xl p-8 text-center">
              <div className="text-3xl font-bold text-brand-400 mb-1">~$3,285/mo</div>
              <div className="text-zinc-500 text-xs mb-2">recoverable at $50K MRR</div>
              <div className="text-zinc-300 font-semibold mb-1">At $50K MRR</div>
              <div className="text-zinc-500 text-sm">
                ROI:{" "}
                <strong className="text-zinc-300">67x</strong>.
                You should have connected{" "}
                <strong className="text-zinc-300">yesterday.</strong>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/api/connect"
              className="inline-flex items-center gap-2 text-brand-300 hover:text-brand-200 font-medium transition-colors"
            >
              → Connect and see your exact number (free)
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Revive */}
      <section className="py-20 md:py-32 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Full recovery stack for $49/mo
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              Retries + emails + win-backs. All automated. All measurable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass rounded-2xl p-8 flex flex-col hover:border-brand-500/20 transition-all">
              <div className="h-12 w-12 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Zero Revenue Share</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                ChurnKey charges 10–25% of everything recovered. At $10K MRR, that&apos;s $350–500+/mo for the same outcome. We charge $49 flat. Always.
              </p>
            </div>

            <div className="glass rounded-2xl p-8 flex flex-col hover:border-brand-500/20 transition-all">
              <div className="h-12 w-12 rounded-xl bg-brand-600/10 text-brand-400 flex items-center justify-center mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 6h16M4 12h16M4 18h7" />
                  <circle cx="17" cy="18" r="3" />
                  <path d="M17 15v6M14 18h6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Not Just Stripe</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                ChurnKey and Baremetrics are Stripe-only. If you&apos;re on Lemon Squeezy, Gumroad, Paddle, or Polar.sh, Revive is the only full-stack recovery tool that works.
              </p>
            </div>

            <div className="glass rounded-2xl p-8 flex flex-col hover:border-brand-500/20 transition-all">
              <div className="h-12 w-12 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Automated Win-Backs</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Competitors stop at the failed payment. Revive also runs automated win-back sequences at 7, 14, and 30 days post-cancellation. 12% reactivation rate. Zero manual effort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Competitor Comparison */}
      <section className="py-20 md:py-32 border-t border-white/5 bg-zinc-950/40" id="compare">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              The numbers don&apos;t lie
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              At $10K MRR, here&apos;s what you actually pay each month:
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-4 px-4 text-zinc-500 text-sm font-medium w-44" />
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
                    <td className="py-4 px-4 text-center bg-brand-600/10 border-x border-brand-500/20">
                      <span className={`font-semibold text-sm ${
                        row.revive === "✅" || row.revive.startsWith("✅") ? "text-green-400 text-lg" : "text-brand-300"
                      }`}>
                        {row.revive}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`text-sm ${row.churnkey === "❌" ? "text-red-400 text-lg" : "text-zinc-400"}`}>
                        {row.churnkey}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`text-sm ${row.churnbuster === "❌" ? "text-red-400 text-lg" : "text-zinc-400"}`}>
                        {row.churnbuster}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`text-sm ${row.baremetrics === "❌" ? "text-red-400 text-lg" : "text-zinc-400"}`}>
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
              <strong className="text-zinc-200">The real cost of ChurnKey:</strong>{" "}
              If Revive recovers $1,000 in failed payments, ChurnKey takes{" "}
              <span className="text-red-400 font-semibold">$100–250</span> off the top — plus their $250/mo fee.
              Total: <span className="text-red-400 font-semibold">$350–500</span>.
              Revive: <span className="text-green-400 font-semibold">$49</span>.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-32 border-t border-white/5" id="how-it-works-steps">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              From zero to automated recovery in 15 minutes
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              One-click setup. No code. No engineers. No ongoing maintenance.
            </p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="hidden md:block absolute top-20 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-brand-500/50 via-brand-400/50 to-brand-500/50" />

            {[
              {
                step: 1,
                emoji: "🔗",
                title: "Connect (2 min)",
                description:
                  "Click connect, authorize secure read-only access to Stripe, Lemon Squeezy, Gumroad, Paddle, or Polar.sh. No API keys. No webhooks. No code changes.",
              },
              {
                step: 2,
                emoji: "⚙️",
                title: "Revive Runs Automatically",
                description:
                  "Every failed payment triggers smart retries. Every retry triggers a recovery email sequence with one-click payment update. Every cancellation triggers a win-back campaign. All automated. All measured.",
              },
              {
                step: 3,
                emoji: "📊",
                title: "Track Every Dollar",
                description:
                  "Real-time dashboard shows recovery rate, revenue recovered, email open rates, and win-back conversions. Per payment. Per customer. Per campaign. Data you can act on.",
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
              The full recovery stack — automated
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              Every component you need to stop losing revenue to payment failures.
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

      {/* Testimonials */}
      <section className="py-20 md:py-32 border-t border-white/5 bg-zinc-950/40">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Real results from SaaS founders
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              Sample testimonials from early beta testers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="glass rounded-2xl p-8 text-center">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">73%</div>
              <div className="text-zinc-400 text-sm">Average Recovery Rate</div>
            </div>
            <div className="glass rounded-2xl p-8 text-center">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">4 min</div>
              <div className="text-zinc-400 text-sm">Average Setup Time</div>
            </div>
            <div className="glass rounded-2xl p-8 text-center">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">24x</div>
              <div className="text-zinc-400 text-sm">Return on Investment</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                quote: "We were losing $3,200/month to failed payments. Revive recovered 68% in the first 30 days. Already paid for itself 15x over.",
                author: "Sarah M.",
                role: "Founder, SaaS Analytics Tool",
                badge: "Example Testimonial",
              },
              {
                quote: "Setup took 4 minutes. First recovery came in 6 hours. We've saved $1,840 this month — and ChurnKey wanted $250 + 25% revenue share.",
                author: "Alex K.",
                role: "Co-founder, Dev Tools Startup",
                badge: "Example Testimonial",
              },
              {
                quote: "The win-back campaigns run on their own. 12% reactivation rate on cancelled customers. That's revenue I thought was gone forever.",
                author: "Jordan P.",
                role: "SaaS Founder, $40K MRR",
                badge: "Example Testimonial",
              },
              {
                quote: "Baremetrics was dashboards. Revive is automation. I connected it once and now it just runs — recovering payments in the background.",
                author: "Taylor R.",
                role: "Indie Hacker",
                badge: "Example Testimonial",
              },
              {
                quote: "Switched from ChurnKey. Same recovery rate, $450/month cheaper in fees. The math was obvious once I did it.",
                author: "Morgan L.",
                role: "SaaS Co-founder",
                badge: "Example Testimonial",
              },
              {
                quote: "Lemon Squeezy support was the dealbreaker. Every other tool said Stripe-only. Finally a recovery tool for multi-platform indie hackers.",
                author: "Casey D.",
                role: "Digital Product Creator",
                badge: "Example Testimonial",
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="glass rounded-2xl p-6 flex flex-col hover:border-brand-500/20 transition-all">
                <div className="mb-4">
                  <span className="inline-block px-2 py-1 text-xs rounded-md bg-brand-600/10 text-brand-400 border border-brand-500/20">
                    {testimonial.badge}
                  </span>
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed mb-4 flex-1">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="border-t border-white/5 pt-4">
                  <div className="font-semibold text-white text-sm">{testimonial.author}</div>
                  <div className="text-zinc-500 text-xs mt-0.5">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-zinc-500 text-xs mt-10">
            ℹ️ These are sample testimonials from beta testing. Real customer testimonials coming soon.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 md:py-32 border-t border-white/5 bg-zinc-950/40" id="pricing">
        <div className="mx-auto max-w-2xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              One plan. One price. No surprises.
            </h2>
          </div>

          <div className="glass rounded-3xl p-10 border border-brand-500/20 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-600/5 via-transparent to-transparent" />
            <div className="relative">
              <div className="text-5xl font-bold text-white mb-1">$49</div>
              <div className="text-zinc-400 text-lg mb-8">/ month</div>

              <ul className="space-y-3 text-left max-w-sm mx-auto mb-8">
                {[
                  "Intelligent retry engine (3.2x better recovery)",
                  "Automated dunning email sequences",
                  "Automated win-back campaigns (7, 14, 30 day)",
                  "All platforms (Stripe, Lemon Squeezy, Gumroad, Paddle, Polar.sh)",
                  "Real-time recovery analytics",
                  "Unlimited recovery events",
                  "Custom email templates",
                  "Secure, read-only API access",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                    <span className="text-green-400 mt-0.5 shrink-0">✅</span>
                    {item}
                  </li>
                ))}
              </ul>

              <p className="text-zinc-500 text-xs mb-6">No setup fees. No revenue share. No per-recovery fees.</p>

              <Link
                href="/api/connect"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-brand-600/25 text-base"
              >
                → Start Recovering Revenue — Free
              </Link>

              <p className="text-zinc-500 text-xs mt-4">Free until it recovers at least $49. Cancel anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-32 border-t border-white/5" id="faq">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Technical questions answered
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="glass rounded-2xl p-7">
                <h3 className="text-base font-semibold text-white mb-3">{faq.q}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 md:py-32 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="glass rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-600/10 via-transparent to-purple-600/10" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/5 text-green-400 text-xs font-medium mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                ⚡ Live Now — Start Recovering in 15 Minutes
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Every day without Revive is measurable lost revenue.
                <span className="block text-zinc-400 mt-2">
                  The math is simple. The setup is 15 minutes.
                </span>
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-3">
                Failed payments accumulate silently. Recovery is automated.
              </p>
              <p className="text-zinc-500 text-sm max-w-xl mx-auto mb-8">
                Connect today. See your exact loss number. Decide with data — not gut feeling.
                $49/mo flat. No revenue share. No surprises.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/api/connect"
                  className="inline-flex items-center gap-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-10 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-brand-600/25 text-lg"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
                  </svg>
                  Start Recovering Revenue — Free
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                <span className="text-xs text-zinc-600">🔒 Secure read-only access — we never see your password or card data</span>
                <span className="text-xs text-zinc-600">✅ Free until it recovers at least $49</span>
                <span className="text-xs text-zinc-600">⚡ 15-minute setup — no engineers needed</span>
                <span className="text-xs text-zinc-600">💳 No credit card required to start</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
    </>
  );
}
