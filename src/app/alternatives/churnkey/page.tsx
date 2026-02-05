import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaitlistForm from "@/components/WaitlistForm";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://revive-hq.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Churnkey Alternative: Why SaaS Founders Are Switching to Revive",
  description:
    "Churnkey costs $500+/mo with flat pricing. Revive offers performance-based pricing — pay only when we recover revenue. Compare features, pricing, and setup time.",
  keywords: [
    "churnkey alternative",
    "churnkey vs revive",
    "churnkey competitor",
    "payment recovery alternative",
    "dunning management alternative",
    "performance-based payment recovery",
    "stripe payment recovery",
    "churnkey pricing",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/alternatives/churnkey`,
    siteName: "Revive",
    title: "Churnkey Alternative: Why SaaS Founders Are Switching to Revive",
    description:
      "Churnkey costs $500+/mo. Revive is performance-based — pay only when we recover revenue. Compare features and pricing.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Churnkey Alternative — Revive",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Churnkey Alternative: Why SaaS Founders Are Switching to Revive",
    description:
      "Performance-based pricing vs $500+/mo flat fees. Compare Churnkey and Revive.",
    images: ["/opengraph-image"],
    creator: "@revivehq",
  },
};

export default function ChurnkeyAlternativePage() {
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
              Churnkey Alternative
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              Performance-based pricing beats{" "}
              <span className="gradient-text">$500/month flat fees</span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              Churnkey is a powerful retention platform — but you pay $500+/month whether it recovers $100 or $10,000. 
              <strong className="text-zinc-300"> Revive only charges when we actually recover your revenue.</strong> Same smart retries and dunning emails, zero upfront risk.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-medium px-8 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-brand-600/25"
              >
                Try Revive Free
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
                href="#comparison"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-zinc-400 hover:text-white font-medium px-8 py-3.5 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all"
              >
                See Full Comparison
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Comparison - Visual */}
      <section className="py-20 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              The pricing difference is huge
            </h2>
            <p className="text-zinc-400 text-lg">
              Same recovery tools. Completely different risk profile.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Churnkey Card */}
            <div className="glass rounded-2xl p-8 border-zinc-800">
              <div className="text-center mb-6">
                <div className="text-sm font-medium text-zinc-500 mb-2">Churnkey</div>
                <div className="text-5xl font-bold mb-2">$500</div>
                <div className="text-zinc-500 text-sm">per month flat fee</div>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="bg-zinc-900/50 rounded-lg p-4">
                  <div className="text-sm text-zinc-400 mb-1">Startup recovering $2K/mo</div>
                  <div className="text-red-400 font-semibold">$500 monthly cost = 25% of recovery</div>
                </div>
                <div className="bg-zinc-900/50 rounded-lg p-4">
                  <div className="text-sm text-zinc-400 mb-1">If you recover nothing this month</div>
                  <div className="text-red-400 font-semibold">Still pay $500</div>
                </div>
                <div className="bg-zinc-900/50 rounded-lg p-4">
                  <div className="text-sm text-zinc-400 mb-1">Annual commitment</div>
                  <div className="text-zinc-300 font-semibold">$6,000+ upfront risk</div>
                </div>
              </div>

              <ul className="space-y-3 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-zinc-600 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  High upfront cost
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-zinc-600 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  Pay even if recovery fails
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-zinc-600 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  Hard to justify for small MRR
                </li>
              </ul>
            </div>

            {/* Revive Card - Highlighted */}
            <div className="glass rounded-2xl p-8 border-brand-500/30 ring-1 ring-brand-500/20 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                Better Deal
              </div>

              <div className="text-center mb-6">
                <div className="text-sm font-medium text-brand-400 mb-2">Revive</div>
                <div className="text-5xl font-bold mb-2">15%</div>
                <div className="text-zinc-500 text-sm">of recovered revenue only</div>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                  <div className="text-sm text-zinc-400 mb-1">Startup recovering $2K/mo</div>
                  <div className="text-green-400 font-semibold">$300 monthly cost = 15% of recovery</div>
                </div>
                <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                  <div className="text-sm text-zinc-400 mb-1">If you recover nothing this month</div>
                  <div className="text-green-400 font-semibold">Pay $0</div>
                </div>
                <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                  <div className="text-sm text-zinc-400 mb-1">Annual commitment</div>
                  <div className="text-green-400 font-semibold">$0 upfront risk</div>
                </div>
              </div>

              <ul className="space-y-3 text-sm text-zinc-300">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Zero upfront cost
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Pay only on recovered revenue
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Perfect for any MRR size
                </li>
              </ul>
            </div>
          </div>

          <p className="text-center text-sm text-zinc-500 mt-8 max-w-2xl mx-auto">
            Both platforms have similar recovery capabilities. The difference is how you pay — upfront flat fees vs. performance-based pricing aligned with your success.
          </p>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section id="comparison" className="py-20 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Side-by-side feature comparison
            </h2>
            <p className="text-zinc-400 text-lg">
              Both are powerful tools. Choose based on pricing model and focus.
            </p>
          </div>

          <div className="glass rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left p-4 text-zinc-400 font-medium w-1/3">Feature</th>
                    <th className="p-4 text-brand-400 font-semibold">Revive</th>
                    <th className="p-4 text-zinc-400 font-medium">Churnkey</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-300">
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">Starting price</td>
                    <td className="p-4 text-center font-semibold text-green-400">Free (pay on recovery)</td>
                    <td className="p-4 text-center">$500/month</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">Pricing model</td>
                    <td className="p-4 text-center font-semibold text-green-400">15% of recovered revenue</td>
                    <td className="p-4 text-center">Flat monthly fee</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">Upfront risk</td>
                    <td className="p-4 text-center font-semibold text-green-400">$0</td>
                    <td className="p-4 text-center">$6,000/year</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">Smart payment retries</td>
                    <td className="p-4 text-center">✅</td>
                    <td className="p-4 text-center">✅</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">AI-powered retry timing</td>
                    <td className="p-4 text-center">✅</td>
                    <td className="p-4 text-center">✅</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">Dunning email sequences</td>
                    <td className="p-4 text-center">✅</td>
                    <td className="p-4 text-center">✅</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">One-click payment update</td>
                    <td className="p-4 text-center">✅</td>
                    <td className="p-4 text-center">✅</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">Cancel flow optimization</td>
                    <td className="p-4 text-center">❌ (recovery focus)</td>
                    <td className="p-4 text-center">✅ (full retention suite)</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">Pause/downgrade offers</td>
                    <td className="p-4 text-center">❌ (recovery focus)</td>
                    <td className="p-4 text-center">✅</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">Customer surveys</td>
                    <td className="p-4 text-center">❌</td>
                    <td className="p-4 text-center">✅</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">Setup time</td>
                    <td className="p-4 text-center font-semibold text-green-400">3-5 minutes</td>
                    <td className="p-4 text-center">20-30 minutes</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">Stripe OAuth (no API keys)</td>
                    <td className="p-4 text-center">✅</td>
                    <td className="p-4 text-center">✅</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">Code changes required</td>
                    <td className="p-4 text-center font-semibold text-green-400">Zero</td>
                    <td className="p-4 text-center">Minimal (for flows)</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">Real-time analytics</td>
                    <td className="p-4 text-center">✅</td>
                    <td className="p-4 text-center">✅</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-zinc-400">Best for</td>
                    <td className="p-4 text-center font-semibold text-brand-400">Payment recovery only</td>
                    <td className="p-4 text-center">Full retention suite</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 max-w-3xl mx-auto">
            <div className="glass rounded-xl p-6">
              <h3 className="font-semibold mb-3 text-zinc-200">The honest truth</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                <strong className="text-zinc-300">Churnkey is excellent</strong> if you need a full retention suite with cancel flows, surveys, and downgrade offers. It&apos;s a comprehensive platform. 
                <strong className="text-zinc-300"> Revive is laser-focused on one thing:</strong> recovering failed payments with zero upfront cost. 
                If you just need payment recovery without the $500/mo commitment, Revive is the better fit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Switch Section */}
      <section className="py-20 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Why SaaS founders are switching from Churnkey
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                ),
                title: "Lower Cost for Startups",
                description:
                  "$500/month is hard to justify when you're bootstrapped or early-stage. With Revive, you start free and only pay when we deliver results. Perfect for validating ROI before committing.",
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                ),
                title: "Zero Setup Friction",
                description:
                  "Connect Stripe via OAuth in 3 minutes. No code changes, no integration work. Churnkey requires embedding cancel flows in your app — Revive works instantly without touching your codebase.",
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M2 12h20" />
                  </svg>
                ),
                title: "Recovery-First Focus",
                description:
                  "You don't need cancel flows or surveys — you just need to stop losing revenue to failed payments. Revive does one thing exceptionally well: automated payment recovery.",
              },
            ].map((reason) => (
              <div
                key={reason.title}
                className="glass rounded-2xl p-8 hover:border-brand-500/20 transition-all"
              >
                <div className="h-12 w-12 rounded-lg bg-brand-600/10 text-brand-400 flex items-center justify-center mb-5">
                  {reason.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">
                  {reason.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When to Choose Churnkey */}
      <section className="py-20 border-t border-white/5 bg-zinc-950/50">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              When you should choose Churnkey instead
            </h2>
            <p className="text-zinc-400">
              We believe in honest comparisons. Here&apos;s when Churnkey might be the better choice:
            </p>
          </div>

          <div className="glass rounded-2xl p-8">
            <ul className="space-y-4 text-sm text-zinc-300">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-brand-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>
                  <strong className="text-white">You need a full retention suite.</strong> Cancel flows, pause offers, downgrade paths, customer surveys — Churnkey does it all.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-brand-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>
                  <strong className="text-white">You want to optimize voluntary churn,</strong> not just failed payments. Churnkey&apos;s cancel flows and surveys help you understand why customers leave.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-brand-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>
                  <strong className="text-white">Budget isn&apos;t a concern.</strong> If $6K/year is a rounding error for your company, Churnkey&apos;s flat pricing might be simpler than performance-based fees.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-brand-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>
                  <strong className="text-white">You have dev resources</strong> to integrate their cancel flows and embedded components. Revive is zero-code, but Churnkey offers deeper UI customization.
                </span>
              </li>
            </ul>
          </div>

          <p className="text-center text-sm text-zinc-500 mt-8">
            Both platforms work. The question is: do you need a full retention suite ($500/mo), or just payment recovery (pay per recovery)?
          </p>
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
                Try risk-free — no credit card required
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Start recovering revenue in under 5 minutes
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-3">
                Connect your Stripe account and let Revive start recovering failed payments automatically. 
                <strong className="text-white"> First $500 recovered is completely free.</strong>
              </p>
              <p className="text-zinc-500 text-sm max-w-xl mx-auto mb-8">
                No flat fees. No contracts. Pay only 15% of revenue we actually recover. Cancel anytime.
              </p>
              <WaitlistForm />
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
                  No code changes
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  Cancel anytime
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
