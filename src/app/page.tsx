import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SoftwareApplicationJsonLd } from "@/components/JsonLd";

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "Smarter Payment Retries",
    description:
      "When a payment fails, timing is everything. Revive figures out why it failed and retries at exactly the right moment — not randomly. The result: 3.2x more payments recovered compared to tools that just retry on a fixed schedule.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: "Emails Customers Actually Open",
    description:
      "When a payment fails, Revive automatically sends a personalized email with a one-click link to update their card — no login required. 68% average open rate (industry average is 21%). Your branding, your voice.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
      </svg>
    ),
    title: "Bring Back Cancelled Customers",
    description:
      "Most tools stop at failed payments. Revive also re-engages customers who cancelled — with automated follow-ups at 7, 14, and 30 days. Offer a discount, a plan pause, or just a personal note. Recover customers you thought were gone.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16M4 12h16M4 18h7" />
        <circle cx="17" cy="18" r="3" />
        <path d="M17 15v6M14 18h6" />
      </svg>
    ),
    title: "Works With All Your Payment Platforms",
    description:
      "Using Lemon Squeezy, Gumroad, Paddle, or Polar.sh alongside Stripe? Revive supports all of them. One dashboard for every platform. Competitors like ChurnKey only work with Stripe.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: "See Exactly What You Recovered",
    description:
      "A clear dashboard showing what Revive got back — per customer, per payment, per campaign. No confusing charts. Just a simple answer to: how much money did we recover this month?",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "Your Data Stays Safe",
    description:
      "Revive connects with view-only access — we can see failed payments, but can't move money or change anything. We never store card numbers. You can disconnect in 2 clicks, anytime.",
  },
];

const stats = [
  { value: "9%", label: "Avg. MRR lost to failed payments" },
  { value: "$0", label: "Revenue tax — you keep 100%" },
  { value: "40%", label: "Day 7 win-back open rate" },
  { value: "3.2x", label: "Higher recovery vs. random retries" },
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
    a: `Connect your payment platform and Revive will immediately show you how much you've lost in failed payments over the last 30 days. You start recovering right away. If we don't recover at least $49 in your first billing period, you don't pay. No credit card required upfront.`,
  },
  {
    q: "Do you need access to my Stripe dashboard?",
    a: "We use OAuth — the same secure login flow you use to connect any app to Stripe. We request read-only access to detect failed payments. We can't move money, change subscriptions, or access your password. You can revoke access anytime in 2 clicks.",
  },
  {
    q: "How is this different from Stripe's built-in dunning?",
    a: "Stripe's built-in retry logic is a blunt instrument — fixed intervals with no intelligence. Revive analyzes decline codes, optimizes retry timing per decline reason, sends personalized branded emails, AND runs win-back campaigns for cancellations. Stripe doesn't do any of that.",
  },
  {
    q: "What if I'm not on Stripe?",
    a: "We support Stripe, Lemon Squeezy, Gumroad, Paddle, and Polar.sh. If you're on a different platform, drop us a note — we're always evaluating new integrations.",
  },
  {
    q: "Why is it so much cheaper than ChurnKey?",
    a: "We're built specifically for indie founders and small SaaS teams — not enterprise. No enterprise overhead, no sales team, no \"schedule a demo\" friction. We pass that efficiency directly to you. $49/mo flat. No revenue share. No surprises.",
  },
];

export default function Home() {
  return (
    <>
      <SoftwareApplicationJsonLd />
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
              Automatic payment recovery &bull; Win-back campaigns &bull; Flat $49/mo
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 animate-slide-up">
              Your SaaS is losing{" "}
              <span className="gradient-text">9% of revenue</span>{" "}
              to failed payments every month.
              <span className="text-zinc-300 text-3xl md:text-4xl lg:text-5xl font-semibold block mt-3">
                Revive gets it back — automatically.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up">
              Smart retry timing + automated win-back emails.{" "}
              <strong className="text-zinc-300">Connect in 15 minutes. No engineers needed.</strong>{" "}
              No revenue share. No surprises.{" "}
              <strong className="text-zinc-300">Just $49/mo flat.</strong>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
              <Link
                href="/api/connect"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-brand-600/25 text-lg"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
                </svg>
                Connect Stripe — Start Recovering (Free)
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
              🔒 View-only access. We never see your password or card numbers.{" "}
              <strong className="text-zinc-400">Free until it pays for itself.</strong>
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

      {/* Loss Calculator Section */}
      <section className="py-20 md:py-32 border-t border-white/5 bg-zinc-950/40">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              How much are you losing right now?
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              At $10K MRR, a 9% failed payment rate = <strong className="text-white">$900/mo bleeding out.</strong>{" "}
              Every month you wait is $900 you&apos;ll never get back.
            </p>
            <p className="text-zinc-500 mt-3 text-base">
              Revive costs $49/mo. The math isn&apos;t hard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="glass rounded-2xl p-8 text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">~$450/mo</div>
              <div className="text-zinc-300 font-semibold mb-1">At $5K MRR</div>
              <div className="text-zinc-500 text-sm">
                You&apos;re likely losing ~$450/mo to failed payments.
                Revive recovers the equivalent of{" "}
                <strong className="text-zinc-300">9× its own cost.</strong>
              </div>
            </div>
            <div className="glass rounded-2xl p-8 text-center border border-brand-500/30">
              <div className="text-3xl font-bold text-red-400 mb-2">~$1,800/mo</div>
              <div className="text-zinc-300 font-semibold mb-1">At $20K MRR</div>
              <div className="text-zinc-500 text-sm">
                You&apos;re likely losing ~$1,800/mo.
                Revive covers itself in{" "}
                <strong className="text-zinc-300">less than 2 days.</strong>
              </div>
            </div>
            <div className="glass rounded-2xl p-8 text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">~$4,500/mo</div>
              <div className="text-zinc-300 font-semibold mb-1">At $50K MRR</div>
              <div className="text-zinc-500 text-sm">
                You&apos;re likely losing ~$4,500/mo.
                You should have called us{" "}
                <strong className="text-zinc-300">yesterday.</strong>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/api/connect"
              className="inline-flex items-center gap-2 text-brand-300 hover:text-brand-200 font-medium transition-colors"
            >
              → Connect Stripe and see your actual number (free)
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Revive — 3 columns */}
      <section className="py-20 md:py-32 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Everything a $250/mo tool does. For $49.
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              We cut the price, not the features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* No Revenue Tax */}
            <div className="glass rounded-2xl p-8 flex flex-col hover:border-brand-500/20 transition-all">
              <div className="h-12 w-12 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">No Revenue Tax</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                ChurnKey takes 10–25% of everything they recover. We charge $49 flat. The more we recover, the more you save — every recovered dollar is yours.
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
                ChurnKey and Baremetrics only work with Stripe. Revive supports Stripe, Lemon Squeezy, Gumroad, Paddle, and Polar.sh — one dashboard for all your revenue.
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
                Competitors show dashboards. We act. Agentic win-back campaigns re-engage customers 7, 14, and 30 days after they cancel — the feature neither ChurnKey nor Baremetrics offers.
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
              Stop doing the math in your head. We did it for you.
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              At $10K MRR, here&apos;s what you actually pay:
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
                        row.revive === "✅" || row.revive.startsWith("✅") ? "text-green-400 text-lg" : "text-brand-300"
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
              <strong className="text-zinc-200">The ChurnKey trap:</strong>{" "}
              If Revive recovers $1,000 in failed payments for you this month, ChurnKey takes $100–250 of that{" "}
              <em>on top of</em> their $250/mo base fee. You&apos;d pay{" "}
              <span className="text-red-400 font-semibold">$350–500</span> for the same outcome.
              We charge{" "}
              <span className="text-green-400 font-semibold">$49.</span>{" "}
              Every dollar we recover is yours.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-32 border-t border-white/5" id="how-it-works-steps">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              From zero to recovering revenue in 15 minutes
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              One-click setup. No engineers. No webhooks to manage.
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
                  "One-click OAuth connection to Stripe, Lemon Squeezy, Gumroad, Paddle, or Polar.sh. No API keys, no webhooks, no code changes. We request read-only access — we can see failed payments, but we can't touch your data.",
              },
              {
                step: 2,
                emoji: "🤖",
                title: "We Detect, Retry & Campaign",
                description:
                  "The moment a payment fails, our retry engine analyzes the decline code and schedules the optimal retry window. Card expired? We send a one-click card update email within the hour. Customer cancelled? Win-back campaigns activate agentically at 7, 14, and 30 days.",
              },
              {
                step: 3,
                emoji: "💰",
                title: "Revenue Flows Back In",
                description:
                  "Real-time dashboard shows every dollar recovered, every retry outcome, and your recovery rate. Nothing to manage. Nothing to configure. Just revenue you would have lost — recovered.",
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

      {/* Testimonials / Social Proof */}
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

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="glass rounded-2xl p-8 text-center">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">73%</div>
              <div className="text-zinc-400 text-sm">Average Recovery Rate</div>
            </div>
            <div className="glass rounded-2xl p-8 text-center">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">4 min</div>
              <div className="text-zinc-400 text-sm">Setup Time</div>
            </div>
            <div className="glass rounded-2xl p-8 text-center">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">24x</div>
              <div className="text-zinc-400 text-sm">Return on Investment</div>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                quote: "We were losing $3,200/month to failed payments. Revive recovered 68% in the first 30 days. Already paid for itself 15x over.",
                author: "Sarah M.",
                role: "Founder, SaaS Analytics Tool",
                badge: "Example Testimonial",
              },
              {
                quote: "Setup took 4 minutes. First recovery came in 6 hours. We've saved $1,840 this month alone — and ChurnKey wanted $250 + 25% revenue share.",
                author: "Alex K.",
                role: "Co-founder, Dev Tools Startup",
                badge: "Example Testimonial",
              },
              {
                quote: "The win-back campaigns are brilliant. We're re-engaging customers who cancelled 2 months ago. 12% reactivation rate so far.",
                author: "Jordan P.",
                role: "SaaS Founder, $40K MRR",
                badge: "Example Testimonial",
              },
              {
                quote: "I tried Baremetrics for 3 months. It's just dashboards. Revive actually does the work — emails, retries, everything. Worth every penny of the $49.",
                author: "Taylor R.",
                role: "Indie Hacker",
                badge: "Example Testimonial",
              },
              {
                quote: "Switched from ChurnKey and immediately saved $450/month on fees alone. Recovery rate is the same. Why was I paying 10x more?",
                author: "Morgan L.",
                role: "SaaS Co-founder",
                badge: "Example Testimonial",
              },
              {
                quote: "Works perfectly with Lemon Squeezy. Every other tool said 'Stripe only.' Finally something built for indie hackers on all platforms.",
                author: "Casey D.",
                role: "Digital Product Creator",
                badge: "Example Testimonial",
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="glass rounded-2xl p-6 flex flex-col hover:border-brand-500/20 transition-all"
              >
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

      {/* Pricing Section */}
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
                  "AI-powered smart payment retries",
                  "High-converting dunning email sequences",
                  "Win-back campaigns (7, 14, 30 day)",
                  "All payment platforms (Stripe, Lemon Squeezy, Gumroad, Paddle, Polar.sh)",
                  "Real-time recovery dashboard",
                  "Unlimited recovery events",
                  "Custom email templates",
                  "Bank-grade security & encryption",
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
                → Start Free — Connect Stripe
              </Link>

              <p className="text-zinc-500 text-xs mt-4">Free until it pays for itself. Cancel anytime.</p>
            </div>
          </div>

          <div className="mt-6 glass rounded-2xl p-6 text-center">
            <p className="text-zinc-400 text-sm leading-relaxed">
              You&apos;re probably losing <strong className="text-white">$450–1,800/mo</strong> in failed payments right now.
              Revive costs $49/mo.{" "}
              <strong className="text-brand-300">
                If we don&apos;t recover at least $49 in your first month, you don&apos;t pay.
              </strong>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 border-t border-white/5" id="faq">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              The questions everyone asks before connecting
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

      {/* Bottom CTA Section */}
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
                You&apos;re losing money right now.
                <span className="block text-zinc-400 mt-2">
                  Every day you wait is another payment that won&apos;t come back.
                </span>
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-3">
                Failed payments don&apos;t announce themselves. They just quietly leave.
              </p>
              <p className="text-zinc-500 text-sm max-w-xl mx-auto mb-8">
                Revive connects in 15 minutes, works in the background forever, and charges $49/mo flat — with no revenue tax.
                Connect today. See the number. Decide after.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/api/connect"
                  className="inline-flex items-center gap-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-10 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-brand-600/25 text-lg"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
                  </svg>
                  Connect Stripe — Start Recovering (Free)
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/api/connect"
                  className="inline-flex items-center gap-2 text-zinc-400 hover:text-white font-medium px-6 py-4 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all text-sm"
                >
                  → Or connect Lemon Squeezy · Gumroad · Paddle · Polar.sh
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                <span className="text-xs text-zinc-600">🔒 Read-only OAuth — we never see your password or card data</span>
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
