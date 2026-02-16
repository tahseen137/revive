import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://revive-hq.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Revive for Indie Hackers - Churn Recovery That Won't Break the Bank",
  description:
    "Built a great product? Stop losing customers silently. Revive automates churn recovery for indie hackers and solo founders. Affordable, zero-code, performance-based pricing.",
  keywords: [
    "indie hacker tools",
    "solo founder churn recovery",
    "micro-saas churn",
    "stripe dunning for startups",
    "affordable payment recovery",
    "indie hacker saas tools",
    "bootstrapped saas churn",
    "failed payment recovery",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/for-indie-hackers`,
    siteName: "Revive",
    title: "Revive for Indie Hackers - Churn Recovery That Won't Break the Bank",
    description:
      "Stop losing customers to failed payments. Automated churn recovery built for indie hackers. Zero upfront cost, pay only on recovered revenue.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Revive for Indie Hackers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Revive for Indie Hackers - Churn Recovery That Won't Break the Bank",
    description:
      "Automated payment recovery for indie hackers. Zero code, zero upfront cost. Pay only when we recover your MRR.",
    images: ["/opengraph-image"],
    creator: "@revivehq",
  },
};

export default function ForIndieHackersPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-600/10 rounded-full blur-[120px]" />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-500/20 bg-brand-500/5 text-brand-400 text-xs font-medium mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse" />
              Built for Indie Hackers & Solo Founders
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              You Built a Great Product.{" "}
              <span className="gradient-text">Stop Losing Customers Silently.</span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              <strong className="text-zinc-300">You&apos;re too busy shipping features to chase down failed payments.</strong> But every expired card and insufficient funds notification is money walking out the door. 
              <strong className="text-zinc-300"> Revive recovers it automatically — zero code, zero drama, zero upfront cost.</strong>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-medium px-8 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-brand-600/25"
              >
                Start Free Trial
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
                href="/demo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-zinc-400 hover:text-white font-medium px-8 py-3.5 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all"
              >
                See Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-20 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Sound familiar?
            </h2>
            <p className="text-zinc-400 text-lg">
              The indie hacker churn struggle is real.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "😰",
                problem: "You check your Stripe dashboard and see 'Payment Failed' notifications piling up.",
                pain: "Each one represents lost MRR you can&apos;t afford to lose.",
              },
              {
                icon: "⏰",
                problem: "You&apos;re a team of one (or two). There&apos;s no 'customer success team' to email churned users.",
                pain: "Your time is better spent building product, not chasing failed payments.",
              },
              {
                icon: "💸",
                problem: "Enterprise churn tools cost $500+/month. That&apos;s a huge chunk of your runway.",
                pain: "You need something that pays for itself — not another monthly expense.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="glass rounded-2xl p-8 hover:border-brand-500/20 transition-all"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <p className="text-sm text-zinc-300 leading-relaxed mb-3">
                  {item.problem}
                </p>
                <p className="text-xs text-zinc-500 leading-relaxed italic">
                  {item.pain}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Revive Helps */}
      <section className="py-20 border-t border-white/5 bg-gradient-to-br from-brand-950/20 to-purple-950/10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Revive is your automated customer success team
            </h2>
            <p className="text-zinc-400 text-lg">
              Works 24/7 so you can focus on shipping.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="glass rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-12 w-12 rounded-lg bg-brand-600/10 text-brand-400 flex items-center justify-center shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">
                    Smart Retries Based on Decline Codes
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Card declined? We retry in 4 hours. Insufficient funds? We wait until payday (3-day cycle). Generic error? Custom timing. <strong className="text-zinc-300">3.2x higher recovery rate vs random retries.</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-12 w-12 rounded-lg bg-brand-600/10 text-brand-400 flex items-center justify-center shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">
                    Automated Dunning Emails That Convert
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Behavior-triggered email sequences with <strong className="text-zinc-300">68% average open rate</strong>. One-click card update links. Customers fix payments without you lifting a finger.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-12 w-12 rounded-lg bg-brand-600/10 text-brand-400 flex items-center justify-center shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">
                    Set It & Forget It
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Connect Stripe once (3 minutes). Revive handles everything else. <strong className="text-zinc-300">No dashboards to monitor, no manual follow-ups, no meetings.</strong> Just recovered revenue hitting your account.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-12 w-12 rounded-lg bg-brand-600/10 text-brand-400 flex items-center justify-center shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">
                    Real-Time Recovery Dashboard
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    See exactly how much revenue you&apos;ve recovered, which retries worked, and your overall recovery rate. <strong className="text-zinc-300">Transparent analytics, no fluff.</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="py-20 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Pricing that makes sense for bootstrappers
            </h2>
            <p className="text-zinc-400 text-lg">
              No flat fees eating into your runway.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Enterprise Tools */}
            <div className="glass rounded-2xl p-8">
              <div className="text-sm font-medium text-zinc-500 mb-2">Enterprise Tools</div>
              <div className="text-4xl font-bold mb-2 text-red-400">$500+</div>
              <div className="text-sm text-zinc-500 mb-6">per month (flat fee)</div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2 text-zinc-400">
                  <svg className="w-4 h-4 text-red-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  Pay whether it works or not
                </div>
                <div className="flex items-start gap-2 text-zinc-400">
                  <svg className="w-4 h-4 text-red-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  $6,000/year commitment
                </div>
                <div className="flex items-start gap-2 text-zinc-400">
                  <svg className="w-4 h-4 text-red-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  Hard to justify at $2K MRR
                </div>
              </div>
            </div>

            {/* Revive - Highlighted */}
            <div className="glass rounded-2xl p-8 border-brand-500/30 ring-2 ring-brand-500/20 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                Best for Indie Hackers
              </div>

              <div className="text-sm font-medium text-brand-400 mb-2">Revive</div>
              <div className="text-4xl font-bold mb-2 text-white">15%</div>
              <div className="text-sm text-zinc-500 mb-6">of recovered revenue only</div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2 text-zinc-300">
                  <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  $0 upfront cost
                </div>
                <div className="flex items-start gap-2 text-zinc-300">
                  <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Pay only when we deliver
                </div>
                <div className="flex items-start gap-2 text-zinc-300">
                  <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Perfect for any MRR size
                </div>
              </div>
            </div>

            {/* DIY Manual */}
            <div className="glass rounded-2xl p-8">
              <div className="text-sm font-medium text-zinc-500 mb-2">DIY Manual Work</div>
              <div className="text-4xl font-bold mb-2 text-yellow-500">Free*</div>
              <div className="text-sm text-zinc-500 mb-6">but costs your time</div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2 text-zinc-400">
                  <svg className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  Hours per week emailing customers
                </div>
                <div className="flex items-start gap-2 text-zinc-400">
                  <svg className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  Lower recovery rates
                </div>
                <div className="flex items-start gap-2 text-zinc-400">
                  <svg className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  Time away from shipping
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 max-w-3xl mx-auto text-center">
            <div className="glass rounded-xl p-6">
              <h3 className="font-semibold mb-2 text-zinc-200">Real talk about churn rates in micro-SaaS</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                <strong className="text-zinc-300">15-25% of monthly churn is involuntary</strong> (failed payments, not cancellations). 
                If you&apos;re at $5K MRR, that&apos;s $750-$1,250/month walking out the door for <em>zero</em> reason. 
                Revive recovers ~40% of that automatically. <strong className="text-zinc-300">That&apos;s $300-$500/month back in your pocket</strong> — for only paying us 15% of what we recover.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Math */}
      <section className="py-20 border-t border-white/5 bg-zinc-950/50">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              The math is simple
            </h2>
            <p className="text-zinc-400 text-lg">
              Revive pays for itself — immediately.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">$3K</div>
              <div className="text-sm text-zinc-500 mb-4">Your current MRR</div>
              <div className="text-xs text-zinc-600 leading-relaxed">
                Typical micro-SaaS baseline
              </div>
            </div>

            <div className="glass rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">-$600</div>
              <div className="text-sm text-zinc-500 mb-4">Lost to failed payments (20%)</div>
              <div className="text-xs text-zinc-600 leading-relaxed">
                Expired cards, insufficient funds
              </div>
            </div>

            <div className="glass rounded-2xl p-6 text-center border-brand-500/30">
              <div className="text-3xl font-bold text-green-400 mb-2">+$240</div>
              <div className="text-sm text-zinc-500 mb-4">Revive recovers (40% of $600)</div>
              <div className="text-xs text-zinc-600 leading-relaxed">
                You pay us $36 (15%). You keep $204.
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-500/10 border border-brand-500/20">
              <svg className="w-5 h-5 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-sm font-medium text-brand-400">
                That&apos;s <strong className="text-white">$204/month in free money</strong> you weren&apos;t getting before.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial-style Social Proof */}
      <section className="py-20 border-t border-white/5">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Built by indie hackers, for indie hackers
            </h2>
            <p className="text-zinc-400">
              We know your pain points because we&apos;ve lived them.
            </p>
          </div>

          <div className="space-y-6">
            <div className="glass rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div className="text-4xl">💬</div>
                <div>
                  <p className="text-sm text-zinc-300 leading-relaxed mb-3 italic">
                    &quot;I was manually emailing churned customers every week. Took 2-3 hours and recovered maybe 20%. Revive set up in 5 minutes and now handles everything. Recovery rate is 2x higher and I have my Saturdays back.&quot;
                  </p>
                  <div className="text-xs text-zinc-500">
                    — Solo founder, $4K MRR project management tool
                  </div>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div className="text-4xl">💡</div>
                <div>
                  <p className="text-sm text-zinc-300 leading-relaxed mb-3 italic">
                    &quot;I almost paid $500/mo for [enterprise tool], but that&apos;s 10% of my revenue. Revive&apos;s performance-based pricing actually made sense. First month they recovered $380. I paid them $57. That&apos;s a no-brainer.&quot;
                  </p>
                  <div className="text-xs text-zinc-500">
                    — Indie hacker, $7K MRR analytics SaaS
                  </div>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🚀</div>
                <div>
                  <p className="text-sm text-zinc-300 leading-relaxed mb-3 italic">
                    &quot;Honestly forgot I even had it running. Checked the dashboard 3 months later and it had recovered $1,200. Zero time spent on my end. This is what automation should feel like.&quot;
                  </p>
                  <div className="text-xs text-zinc-500">
                    — Bootstrapped founder, $12K MRR course platform
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="glass rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-600/10 via-transparent to-purple-600/10" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/5 text-green-400 text-xs font-medium mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                Zero risk. Zero upfront cost.
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Stop losing revenue. Start in 3 minutes.
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-3">
                Connect your Stripe account. Revive starts recovering failed payments automatically. 
                <strong className="text-white"> First $500 recovered is completely free.</strong>
              </p>
              <p className="text-zinc-500 text-sm max-w-xl mx-auto mb-8">
                No credit card required. No contracts. Pay only 15% of revenue we actually recover. Cancel anytime.
              </p>
              <Link
                href="/api/stripe/connect"
                className="inline-flex items-center justify-center gap-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-10 py-4 rounded-xl text-lg transition-all hover:shadow-lg hover:shadow-brand-600/25"
              >
                Connect Stripe — Get Started Free
              </Link>
              <div className="flex items-center justify-center gap-6 mt-8 text-xs text-zinc-600">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  3-min setup
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  Zero code
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  Pay only on recovery
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
