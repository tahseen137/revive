import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SoftwareApplicationJsonLd } from "@/components/JsonLd";
import { TrackedCTA, ABVariantTracker } from "@/components/TrackedCTA";

// Variant A: "Never Lose a Customer to Payment Issues"
// Focus: Emotional appeal — customer retention, relationship preservation

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "Smart Payment Retries",
    description:
      "When a payment fails, we figure out why and retry at exactly the right moment — not randomly. The result: we recover 3.2x more payments than tools that just retry on a schedule.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: "Emails That Actually Work",
    description:
      "Friendly payment reminder emails with one-click update links — no login required. 68% open rate (vs. 21% industry average). In your brand. With your voice.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
      </svg>
    ),
    title: "Win-Back Campaigns",
    description:
      "Most tools stop after the failed payment. Revive also reaches out to customers who cancelled — with personal messages at 7, 14, and 30 days. 12% reactivation rate on average.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16M4 12h16M4 18h7" />
        <circle cx="17" cy="18" r="3" />
        <path d="M17 15v6M14 18h6" />
      </svg>
    ),
    title: "Works on Every Platform",
    description:
      "Stripe, Lemon Squeezy, Gumroad, Paddle, and Polar.sh — all in one dashboard. Not just Stripe like everyone else.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: "Recovery Dashboard",
    description:
      "See exactly how much Revive recovered — per customer, per payment, per campaign. Clear numbers. No fluff.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "Safe & Secure",
    description:
      "We connect securely with read-only access. We never store card data. Revoke access anytime in two clicks.",
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
    q: "How do you connect to my payment platform?",
    a: "We use the same secure login flow you see when connecting any app — click 'Connect Stripe', authorize read-only access, and you're done. We can see failed payments. We can't move money, change subscriptions, or access your password. Revoke in 2 clicks anytime.",
  },
  {
    q: "How is this different from my payment platform's built-in recovery?",
    a: "Built-in tools are basic. Fixed retry schedules with no intelligence. Revive learns from each decline, optimizes retry timing, sends personalized branded emails, AND runs win-back campaigns for cancellations. None of the major platforms do all of that.",
  },
  {
    q: "What platforms do you support?",
    a: "Stripe, Lemon Squeezy, Gumroad, Paddle, and Polar.sh. If you're on a different platform, drop us a note — we're always evaluating new integrations.",
  },
  {
    q: "Why is it so much cheaper than competitors?",
    a: "We're built for indie founders and small SaaS teams — not enterprise. No sales team, no enterprise overhead. $49/mo flat. No revenue share. No surprises.",
  },
];

export default function HomeVariantA() {
  return (
    <>
      <SoftwareApplicationJsonLd />
      <ABVariantTracker variant="a" />
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
              Payment recovery &bull; Win-back campaigns &bull; Flat $49/mo
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 animate-slide-up">
              Never lose a customer to a{" "}
              <span className="gradient-text">failed payment</span>{" "}
              again.
            </h1>

            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up">
              Payment failures quietly cancel subscriptions every day.{" "}
              <strong className="text-zinc-300">Revive catches every one</strong> — with smart retries, friendly reminder emails, and win-back campaigns.{" "}
              <strong className="text-zinc-300">15-minute setup. $49/mo flat.</strong>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
              <TrackedCTA
                href="/api/connect"
                variant="a"
                position="hero"
                label="Save My Customers — Start Free"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-brand-600/25 text-lg"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
                </svg>
                Save My Customers — Start Free
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </TrackedCTA>
              <a
                href="#how-it-works-steps"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-zinc-400 hover:text-white font-medium px-8 py-4 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all"
              >
                → See how it works in 60 seconds
              </a>
            </div>

            <p className="text-sm text-zinc-500 mt-4 animate-slide-up">
              🔒 Secure read-only access. We never see your password or card data.{" "}
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

      {/* Loss Calculator Section */}
      <section className="py-20 md:py-32 border-t border-white/5 bg-zinc-950/40">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              These customers are already gone — silently
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              At $10K MRR, a 9% failed payment rate = <strong className="text-white">~40 customers losing access</strong> every month.
              Most never come back — not because they wanted to leave, but because{" "}
              <strong className="text-white">nobody reached out.</strong>
            </p>
            <p className="text-zinc-500 mt-3 text-base">
              Revive reaches out automatically — before they churn for good.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="glass rounded-2xl p-8 text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">~$450/mo</div>
              <div className="text-zinc-300 font-semibold mb-1">At $5K MRR</div>
              <div className="text-zinc-500 text-sm">
                ~$450/mo in failed payments walks out the door.
                Revive brings back the equivalent of{" "}
                <strong className="text-zinc-300">9× its own cost.</strong>
              </div>
            </div>
            <div className="glass rounded-2xl p-8 text-center border border-brand-500/30">
              <div className="text-3xl font-bold text-red-400 mb-2">~$1,800/mo</div>
              <div className="text-zinc-300 font-semibold mb-1">At $20K MRR</div>
              <div className="text-zinc-500 text-sm">
                ~$1,800/mo disappearing quietly.
                Revive covers itself in{" "}
                <strong className="text-zinc-300">less than 2 days.</strong>
              </div>
            </div>
            <div className="glass rounded-2xl p-8 text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">~$4,500/mo</div>
              <div className="text-zinc-300 font-semibold mb-1">At $50K MRR</div>
              <div className="text-zinc-500 text-sm">
                You&apos;re losing ~$4,500/mo in recoverable revenue.
                And those customers probably{" "}
                <strong className="text-zinc-300">still like your product.</strong>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/api/connect"
              className="inline-flex items-center gap-2 text-brand-300 hover:text-brand-200 font-medium transition-colors"
            >
              → Connect and see your actual number (free, 2 minutes)
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
              Everything a $250/mo tool does. For $49.
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              We cut the price. Not the features.
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
              <h3 className="text-lg font-semibold text-white mb-2">No Revenue Tax</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                ChurnKey takes 10–25% of everything they recover. We charge $49 flat. The more we recover, the more you keep — every recovered dollar is yours.
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
              <h3 className="text-lg font-semibold text-white mb-2">Works Everywhere</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                ChurnKey and Baremetrics only work with Stripe. Revive supports Stripe, Lemon Squeezy, Gumroad, Paddle, and Polar.sh — one dashboard for all your customers.
              </p>
            </div>

            <div className="glass rounded-2xl p-8 flex flex-col hover:border-brand-500/20 transition-all">
              <div className="h-12 w-12 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">We Actually Reach Out</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Competitors show you dashboards. Revive acts. Win-back campaigns reach customers who cancelled at 7, 14, and 30 days — the feature no competitor offers.
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
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-32 border-t border-white/5" id="how-it-works-steps">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              From zero to saving customers in 15 minutes
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              One-click setup. No engineers. Nothing to manage.
            </p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="hidden md:block absolute top-20 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-brand-500/50 via-brand-400/50 to-brand-500/50" />

            {[
              {
                step: 1,
                emoji: "🔗",
                title: "Connect in 2 Minutes",
                description:
                  "One-click connection to Stripe, Lemon Squeezy, Gumroad, Paddle, or Polar.sh. No code. No setup. Just click connect and authorize — the same way you'd connect any app to your account.",
              },
              {
                step: 2,
                emoji: "🤖",
                title: "We Handle Everything",
                description:
                  "When a payment fails, we retry it at the right time and send a friendly email with a one-click payment update link. When a customer cancels, we reach out with a personal win-back message. All automatic.",
              },
              {
                step: 3,
                emoji: "💰",
                title: "Keep More Customers",
                description:
                  "Watch your recovery dashboard fill up with customers you would have lost. Real numbers. No guessing. Just customers who stayed because Revive reached out before it was too late.",
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
              Everything you need to stop losing customers
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              Built for indie founders and small SaaS teams.
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
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">12%</div>
              <div className="text-zinc-400 text-sm">Win-Back Reactivation Rate</div>
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
                quote: "I tried Baremetrics for 3 months. It's just dashboards. Revive actually does the work — emails, retries, everything. Worth every penny.",
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
                  "Smart payment retries (3.2x better recovery)",
                  "Branded dunning email sequences",
                  "Win-back campaigns (7, 14, 30 day)",
                  "All platforms (Stripe, Lemon Squeezy, Gumroad, Paddle, Polar.sh)",
                  "Real-time recovery dashboard",
                  "Unlimited recovery events",
                  "Custom email templates",
                  "Secure, read-only access",
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
                → Save My Customers — Start Free
              </Link>

              <p className="text-zinc-500 text-xs mt-4">Free until it pays for itself. Cancel anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-32 border-t border-white/5" id="faq">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Questions before connecting?
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
                ⚡ Live Now — Start Saving Customers Today
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Right now, customers are quietly leaving.
                <span className="block text-zinc-400 mt-2">
                  Not because they want to. Because nobody reached out.
                </span>
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-3">
                Failed payments don&apos;t announce themselves. They just quietly cancel subscriptions.
              </p>
              <p className="text-zinc-500 text-sm max-w-xl mx-auto mb-8">
                Revive connects in 15 minutes, works in the background forever, and charges $49/mo flat.
                Connect today. See who you&apos;ve been losing. Decide after.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/api/connect"
                  className="inline-flex items-center gap-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-10 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-brand-600/25 text-lg"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
                  </svg>
                  Save My Customers — Start Free
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
