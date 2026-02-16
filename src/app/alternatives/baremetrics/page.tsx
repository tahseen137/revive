import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://revive-hq.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Baremetrics Recover Alternative: Performance-Based Payment Recovery",
  description:
    "Baremetrics is analytics-first with recovery as an add-on. Revive is purpose-built for payment recovery with AI-powered retries and performance-based pricing. Compare features and costs.",
  keywords: [
    "baremetrics alternative",
    "baremetrics recover alternative",
    "baremetrics vs revive",
    "baremetrics competitor",
    "payment recovery alternative",
    "stripe payment recovery",
    "baremetrics pricing",
    "failed payment recovery",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/alternatives/baremetrics`,
    siteName: "Revive",
    title: "Baremetrics Recover Alternative: Performance-Based Payment Recovery",
    description:
      "Baremetrics is analytics-first. Revive is purpose-built for payment recovery with performance-based pricing.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Baremetrics Alternative — Revive",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Baremetrics Recover Alternative: Performance-Based Payment Recovery",
    description:
      "Purpose-built payment recovery vs analytics add-on. Compare Baremetrics and Revive.",
    images: ["/opengraph-image"],
    creator: "@revivehq",
  },
};

export default function BaremetricsAlternativePage() {
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
              Baremetrics Recover Alternative
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              Purpose-built recovery beats{" "}
              <span className="gradient-text">analytics add-ons</span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              Baremetrics is an excellent analytics platform — but payment recovery is a secondary feature. 
              <strong className="text-zinc-300"> Revive is laser-focused on one thing: recovering failed payments with AI-powered retries and dunning emails.</strong> Plus, you only pay when we actually recover revenue.
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

      {/* Key Differences */}
      <section className="py-20 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              The key differences
            </h2>
            <p className="text-zinc-400 text-lg">
              Both tools recover failed payments. But the approach is completely different.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Baremetrics Card */}
            <div className="glass rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="text-lg font-semibold text-zinc-300 mb-3">Baremetrics Recover</div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
                  Analytics-first platform
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
                  <div className="text-sm font-medium text-zinc-300 mb-2">What it is</div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Powerful SaaS metrics dashboard with payment recovery as an add-on feature. Great if you need analytics + basic recovery.
                  </p>
                </div>
                
                <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
                  <div className="text-sm font-medium text-zinc-300 mb-2">Pricing structure</div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Starts at $58/mo for analytics. Recovery requires higher-tier plans ($108+/mo). Pay monthly even if recovery fails.
                  </p>
                </div>

                <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
                  <div className="text-sm font-medium text-zinc-300 mb-2">Recovery features</div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Basic email dunning and credit card forms. Less sophisticated than dedicated recovery tools.
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-zinc-400 pt-4 border-t border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Excellent metrics dashboard
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Cohort analysis & forecasting
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-600">○</span> Basic recovery tools
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-600">○</span> Recovery not the main focus
                </div>
              </div>
            </div>

            {/* Revive Card - Highlighted */}
            <div className="glass rounded-2xl p-8 border-brand-500/30 ring-1 ring-brand-500/20 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                Recovery-First
              </div>

              <div className="text-center mb-6">
                <div className="text-lg font-semibold text-white mb-3">Revive</div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-sm font-medium mb-4">
                  Purpose-built for recovery
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="bg-brand-500/5 rounded-lg p-4 border border-brand-500/20">
                  <div className="text-sm font-medium text-white mb-2">What it is</div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    AI-powered payment recovery engine. Everything is optimized for one goal: recovering failed payments automatically.
                  </p>
                </div>
                
                <div className="bg-brand-500/5 rounded-lg p-4 border border-brand-500/20">
                  <div className="text-sm font-medium text-white mb-2">Pricing structure</div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Pay only 15% of revenue we recover. First $500 recovered is free. If we recover nothing, you pay $0.
                  </p>
                </div>

                <div className="bg-brand-500/5 rounded-lg p-4 border border-brand-500/20">
                  <div className="text-sm font-medium text-white mb-2">Recovery features</div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    AI-powered retry timing based on decline codes. Behavior-triggered email sequences. One-click payment updates.
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-zinc-300 pt-4 border-t border-brand-500/10">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> AI-powered smart retries
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Advanced dunning sequences
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Recovery-first optimization
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Performance-based pricing
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-zinc-500 mt-8 max-w-2xl mx-auto">
            If you need comprehensive SaaS analytics, Baremetrics is excellent. If you just need payment recovery without paying for analytics you don&apos;t use, Revive is purpose-built for that.
          </p>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section id="comparison" className="py-20 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Side-by-side comparison
            </h2>
            <p className="text-zinc-400 text-lg">
              Honest breakdown of features, pricing, and focus areas.
            </p>
          </div>

          <div className="glass rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left p-4 text-zinc-400 font-medium w-1/3">Feature</th>
                    <th className="p-4 text-brand-400 font-semibold">Revive</th>
                    <th className="p-4 text-zinc-400 font-medium">Baremetrics</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-300">
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">Primary focus</td>
                    <td className="p-4 text-center font-semibold text-brand-400">Payment recovery</td>
                    <td className="p-4 text-center">Analytics + metrics</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">Starting price</td>
                    <td className="p-4 text-center font-semibold text-green-400">Free ($0)</td>
                    <td className="p-4 text-center">$58/month</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">Recovery pricing</td>
                    <td className="p-4 text-center font-semibold text-green-400">15% of recovered</td>
                    <td className="p-4 text-center">$108+/mo (flat fee)</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">Upfront commitment</td>
                    <td className="p-4 text-center font-semibold text-green-400">$0</td>
                    <td className="p-4 text-center">$1,296+/year</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">AI-powered retry timing</td>
                    <td className="p-4 text-center">✅</td>
                    <td className="p-4 text-center">❌ (basic retries)</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">Dunning email sequences</td>
                    <td className="p-4 text-center">✅ (behavior-triggered)</td>
                    <td className="p-4 text-center">✅ (basic)</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">One-click payment update</td>
                    <td className="p-4 text-center">✅</td>
                    <td className="p-4 text-center">✅</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">Payday-aware retries</td>
                    <td className="p-4 text-center">✅</td>
                    <td className="p-4 text-center">❌</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">SaaS metrics dashboard</td>
                    <td className="p-4 text-center">❌ (recovery only)</td>
                    <td className="p-4 text-center">✅ (comprehensive)</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">MRR, churn, LTV tracking</td>
                    <td className="p-4 text-center">❌</td>
                    <td className="p-4 text-center">✅</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">Cohort analysis</td>
                    <td className="p-4 text-center">❌</td>
                    <td className="p-4 text-center">✅</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">Forecasting</td>
                    <td className="p-4 text-center">❌</td>
                    <td className="p-4 text-center">✅</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">Setup time</td>
                    <td className="p-4 text-center font-semibold text-green-400">3-5 minutes</td>
                    <td className="p-4 text-center">10-15 minutes</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">Code changes required</td>
                    <td className="p-4 text-center font-semibold text-green-400">Zero</td>
                    <td className="p-4 text-center">Zero</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">Recovery analytics</td>
                    <td className="p-4 text-center">✅ (detailed)</td>
                    <td className="p-4 text-center">✅ (basic)</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-zinc-400">Best for</td>
                    <td className="p-4 text-center font-semibold text-brand-400">Dedicated recovery</td>
                    <td className="p-4 text-center">Metrics + basic recovery</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 max-w-3xl mx-auto">
            <div className="glass rounded-xl p-6">
              <h3 className="font-semibold mb-3 text-zinc-200">Bottom line</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                <strong className="text-zinc-300">Baremetrics is a fantastic tool</strong> for understanding your SaaS metrics — MRR, churn, cohorts, forecasting. 
                Payment recovery is an add-on feature, not the core focus. 
                <strong className="text-zinc-300"> Revive does one thing and does it exceptionally well:</strong> recover failed payments with AI-powered automation. 
                If you don&apos;t need analytics and just want payment recovery, Revive offers better recovery features at zero upfront cost.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="py-20 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Cost comparison: Real examples
            </h2>
            <p className="text-zinc-400 text-lg">
              See what you&apos;d pay with each platform based on actual recovery amounts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { scenario: "Startup", mrr: "$10K MRR", recovered: "$700 recovered/mo" },
              { scenario: "Growth", mrr: "$50K MRR", recovered: "$3,500 recovered/mo" },
              { scenario: "Scale", mrr: "$100K MRR", recovered: "$7,000 recovered/mo" },
            ].map((example) => (
              <div key={example.scenario} className="glass rounded-xl p-6">
                <div className="text-center mb-6">
                  <div className="text-sm font-medium text-brand-400 mb-1">{example.scenario}</div>
                  <div className="text-xs text-zinc-500">{example.mrr}</div>
                  <div className="text-sm text-zinc-300 mt-2">{example.recovered}</div>
                </div>

                <div className="space-y-4">
                  <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
                    <div className="text-xs text-zinc-500 mb-2">Baremetrics (flat fee)</div>
                    <div className="text-lg font-bold text-zinc-300">
                      {example.scenario === "Startup" && "$108"}
                      {example.scenario === "Growth" && "$183"}
                      {example.scenario === "Scale" && "$275"}
                      <span className="text-xs text-zinc-500">/month</span>
                    </div>
                    <div className="text-xs text-zinc-600 mt-1">
                      Pay regardless of results
                    </div>
                  </div>

                  <div className="bg-green-500/5 rounded-lg p-4 border border-green-500/20">
                    <div className="text-xs text-zinc-500 mb-2">Revive (performance)</div>
                    <div className="text-lg font-bold text-green-400">
                      {example.scenario === "Startup" && "$105"}
                      {example.scenario === "Growth" && "$525"}
                      {example.scenario === "Scale" && "$700"}
                      <span className="text-xs text-zinc-500">/month</span>
                    </div>
                    <div className="text-xs text-green-600 mt-1">
                      Only if recovery succeeds
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-zinc-800 text-center">
                  <div className="text-xs text-zinc-500">Annual difference</div>
                  <div className={`text-sm font-semibold ${
                    example.scenario === "Startup" ? "text-green-400" : "text-red-400"
                  }`}>
                    {example.scenario === "Startup" && "Revive: $36/yr more"}
                    {example.scenario === "Growth" && "Baremetrics: $4,104/yr cheaper"}
                    {example.scenario === "Scale" && "Baremetrics: $5,100/yr cheaper"}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 max-w-3xl mx-auto glass rounded-xl p-6">
            <div className="text-sm text-zinc-400 leading-relaxed space-y-2">
              <p>
                <strong className="text-zinc-300">For startups with lower recovery volumes,</strong> Revive&apos;s performance-based model is comparable or slightly better. 
                Zero upfront risk makes it easier to get started.
              </p>
              <p>
                <strong className="text-zinc-300">At higher recovery volumes,</strong> Baremetrics&apos; flat fee becomes more economical if you also value their analytics platform. 
                But remember: you&apos;re paying for metrics + basic recovery, not advanced recovery features.
              </p>
              <p className="text-brand-400">
                <strong>Revive&apos;s advantage:</strong> You get advanced AI-powered recovery tools (better than Baremetrics Recover) with zero upfront commitment. 
                If recovery fails one month, you pay nothing.
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
              Why choose Revive over Baremetrics Recover
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                ),
                title: "AI-Powered Smart Timing",
                description:
                  "Revive analyzes decline codes to optimize retry timing. Card declined? 4 hours. Insufficient funds? Payday-aware retries. Baremetrics uses basic retry schedules.",
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                ),
                title: "Recovery-First Design",
                description:
                  "Every feature is optimized for one goal: recovering failed payments. Baremetrics is primarily an analytics tool with recovery as a secondary add-on.",
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                ),
                title: "Zero Upfront Risk",
                description:
                  "Pay only when we recover revenue. If you don't need Baremetrics' analytics features, why pay $108+/month upfront? Start with Revive for free.",
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

      {/* When to Choose Baremetrics */}
      <section className="py-20 border-t border-white/5 bg-zinc-950/50">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              When you should choose Baremetrics instead
            </h2>
            <p className="text-zinc-400">
              Honest comparison: here&apos;s when Baremetrics might be the better fit.
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
                  <strong className="text-white">You need comprehensive SaaS analytics.</strong> Baremetrics excels at MRR tracking, cohort analysis, forecasting, and customer insights. If analytics is your priority, Baremetrics is worth it.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-brand-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>
                  <strong className="text-white">You recover $7K+/month consistently.</strong> At high recovery volumes, Baremetrics&apos; flat fee becomes more economical than percentage-based pricing (if you also use their analytics).
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-brand-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>
                  <strong className="text-white">You want an all-in-one tool.</strong> If you prefer a single platform for metrics + recovery (even if recovery features are basic), Baremetrics offers that convenience.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-brand-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>
                  <strong className="text-white">You&apos;re already a Baremetrics customer.</strong> If you&apos;re already paying for their analytics, adding Recover as an incremental cost might make sense vs. switching to Revive.
                </span>
              </li>
            </ul>
          </div>

          <p className="text-center text-sm text-zinc-500 mt-8">
            Baremetrics = analytics platform with basic recovery. Revive = advanced recovery with no analytics. Choose based on what you actually need.
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
                No credit card required — start free
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Get better recovery features at zero upfront cost
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-3">
                Stop paying flat fees for basic recovery tools. 
                <strong className="text-white"> Revive offers advanced AI-powered recovery with performance-based pricing.</strong> 
                First $500 recovered is completely free.
              </p>
              <p className="text-zinc-500 text-sm max-w-xl mx-auto mb-8">
                3-minute setup. No code changes. Cancel anytime. Pay only 15% of revenue we actually recover.
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
                  Zero upfront cost
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  AI-powered retries
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  No contracts
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
