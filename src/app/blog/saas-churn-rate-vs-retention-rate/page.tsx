import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "SaaS Churn Rate vs Retention Rate: What Every Founder Gets Wrong (2026)",
  description:
    "Churn rate and retention rate look like mirrors of each other — they're not. Learn the difference, how failed payments affect both, and how to improve them without product changes.",
  keywords: [
    "saas churn rate vs retention rate",
    "churn rate vs retention rate",
    "saas churn rate",
    "saas retention rate",
    "net revenue retention",
    "involuntary churn",
    "passive churn",
    "saas metrics",
  ],
  openGraph: {
    title: "SaaS Churn Rate vs Retention Rate: What Every Founder Gets Wrong",
    description:
      "Confusing churn rate and retention rate leads to bad decisions. Learn how they differ, why NRR matters more, and how failed payment recovery improves all three.",
  },
};

export default function BlogPost() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <article className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="mx-auto max-w-3xl px-6">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-medium">
                Growth &amp; Retention
              </div>
              <span className="text-sm text-zinc-500">February 28, 2026</span>
              <span className="text-zinc-600">·</span>
              <span className="text-sm text-zinc-500">9 min read</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
              Churn Rate vs Retention Rate: What Every SaaS Founder Gets Wrong
            </h1>

            <p className="text-xl text-zinc-400 leading-relaxed">
              Most SaaS founders track churn rate. Fewer understand what it&apos;s actually telling them — or how it relates to retention rate, which tells a different story. Confusing them leads to bad decisions about where to invest and what your actual growth trajectory looks like.
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-zinc max-w-none">
            <div className="text-zinc-300 space-y-6 leading-relaxed">

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                What Is Churn Rate?
              </h2>

              <p>
                <strong className="text-white">Churn rate</strong> is the percentage of customers (or revenue) you lose in a given period.
              </p>

              <div className="glass rounded-xl p-5 my-6 font-mono text-sm">
                <p className="text-zinc-400 text-xs uppercase tracking-wide mb-3">Formula</p>
                <p className="text-white mb-1">Monthly Churn Rate = (Customers Lost in Month / Customers at Start of Month) × 100</p>
              </div>

              <p>
                <strong className="text-white">Example:</strong> You start March with 200 customers. 8 leave by March 31st. Your monthly churn rate is 4%.
              </p>

              <p>
                <strong className="text-white">Revenue churn</strong> works the same way but uses MRR instead of customer count:
              </p>

              <div className="glass rounded-xl p-5 my-6 font-mono text-sm">
                <p className="text-white mb-0">Revenue Churn Rate = (MRR Lost in Month / MRR at Start of Month) × 100</p>
              </div>

              <p>
                Revenue churn is usually more revealing than customer churn. Losing 3 customers who pay $500/month is a bigger problem than losing 10 customers who pay $20/month — but customer-count churn treats them identically.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                What Is Retention Rate?
              </h2>

              <p>
                <strong className="text-white">Retention rate</strong> is the percentage of customers (or revenue) you <em>keep</em> in a given period.
              </p>

              <div className="glass rounded-xl p-5 my-6 font-mono text-sm">
                <p className="text-zinc-400 text-xs uppercase tracking-wide mb-3">Formula</p>
                <p className="text-white mb-1">Monthly Retention Rate = ((Customers at End of Month - New Customers) / Customers at Start of Month) × 100</p>
                <p className="text-zinc-500 text-xs mt-2 mb-0">Quick version: Retention Rate = 100% - Churn Rate</p>
              </div>

              <p>
                At 4% monthly churn, your retention rate is 96%. Simple so far. Here&apos;s where it gets nuanced.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Why Retention Rate and Churn Rate Tell Different Stories
              </h2>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                Churn is a point-in-time measure. Retention shows compounding.
              </h3>

              <p>
                A 4% monthly churn rate sounds manageable. But compounded over 12 months:
              </p>

              <div className="glass rounded-xl p-5 my-6 font-mono text-sm">
                <p className="text-white mb-1">Annual retention = (1 - 0.04)^12 = 0.613 = 61.3%</p>
              </div>

              <p>
                You&apos;re keeping just <strong className="text-white">61% of your customers year over year</strong>. That means your business is running on a treadmill — you need to acquire new customers just to stay flat, let alone grow. The churn rate alone doesn&apos;t make this obvious. Retention rate over time does.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                Net Revenue Retention reveals expansion
              </h3>

              <p>
                Here&apos;s what churn rate misses entirely: expansion revenue. If customers upgrade, add seats, or increase usage, that shows up nowhere in churn rate calculations.
              </p>

              <div className="glass rounded-xl p-5 my-6 font-mono text-sm">
                <p className="text-zinc-400 text-xs uppercase tracking-wide mb-3">Net Revenue Retention (NRR)</p>
                <p className="text-white mb-0">NRR = (Starting MRR + Expansion MRR - Churned MRR - Contraction MRR) / Starting MRR × 100</p>
              </div>

              <p>
                A SaaS company with 5% monthly churn but strong upsell can have NRR above 100% — meaning existing customers are worth more each month, even accounting for losses. Stripe, Snowflake, and Datadog have all reported NRR above 120%.
              </p>

              <div className="glass rounded-xl p-6 my-8 border-l-4 border-brand-500">
                <p className="text-sm text-zinc-400 mb-2 font-medium uppercase tracking-wide">Why This Matters</p>
                <p className="text-lg font-semibold text-white mb-2">
                  VCs care more about NRR than churn rate.
                </p>
                <p className="text-sm text-zinc-400 mb-0">
                  NRR tells you whether your existing customer base grows or shrinks on its own — the most important signal in SaaS.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                The Three Types of Churn (and Which One Founders Ignore)
              </h2>

              <p>
                Not all churn is the same. The three types require different responses:
              </p>

              <div className="space-y-4 my-6">
                <div className="glass rounded-xl p-5">
                  <p className="font-semibold text-white mb-1">1. Voluntary Churn</p>
                  <p className="text-zinc-400 text-sm mb-0">
                    The customer actively canceled. They made a deliberate decision to leave. Root causes: product isn&apos;t valuable enough, found a better alternative, budget cuts. <span className="text-zinc-300">Fix: Better onboarding, product improvements, pricing adjustments.</span>
                  </p>
                </div>

                <div className="glass rounded-xl p-5 border border-brand-500/20">
                  <p className="font-semibold text-white mb-1">2. Passive / Involuntary Churn</p>
                  <p className="text-zinc-400 text-sm mb-0">
                    The customer&apos;s subscription failed to renew because their payment method failed. They didn&apos;t cancel on purpose — in many cases, they don&apos;t even know they&apos;ve churned. <span className="text-zinc-300">Fix: Payment failure recovery.</span>
                  </p>
                </div>

                <div className="glass rounded-xl p-5">
                  <p className="font-semibold text-white mb-1">3. Unavoidable Churn</p>
                  <p className="text-zinc-400 text-sm mb-0">
                    Company went bankrupt. Acquired by a competitor. Industry-wide downturn. Nothing you can do. Accepting this frees up energy for what you can control.
                  </p>
                </div>
              </div>

              <p>
                Most SaaS founders obsess over voluntary churn and ignore passive churn. That&apos;s a mistake. <strong className="text-white">Across Stripe-powered businesses, failed payments account for 20–40% of total churn.</strong> It&apos;s involuntary, largely preventable, and recoverable in a way that voluntary churn is not.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                How Failed Payment Recovery Improves Both Metrics
              </h2>

              <p>
                When a payment fails and the customer churns involuntarily, it hits both your churn rate and your retention rate simultaneously — even though the customer wasn&apos;t trying to leave. Recovering that failed payment means:
              </p>

              <ul className="space-y-2 my-4 list-none pl-0">
                <li className="flex items-start gap-3">
                  <span className="text-brand-400 mt-1 flex-shrink-0">✓</span>
                  <span><strong className="text-white">Churn rate decreases</strong> — that customer doesn&apos;t count as lost</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-400 mt-1 flex-shrink-0">✓</span>
                  <span><strong className="text-white">Retention rate increases</strong> — they stay in your cohort</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-400 mt-1 flex-shrink-0">✓</span>
                  <span><strong className="text-white">NRR improves</strong> — their MRR continues contributing to your base</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-400 mt-1 flex-shrink-0">✓</span>
                  <span><strong className="text-white">Revenue recovered</strong> — obviously</span>
                </li>
              </ul>

              <p>
                The math compounds quickly. For a SaaS company at $100K MRR with 35% passive churn:
              </p>

              <div className="glass rounded-xl p-5 my-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-zinc-400 text-xs uppercase tracking-wide mb-2">Without Recovery</p>
                    <p className="text-white font-semibold">~$1,400/month lost</p>
                    <p className="text-zinc-500 text-xs">~$16,800/year in lost MRR</p>
                  </div>
                  <div>
                    <p className="text-zinc-400 text-xs uppercase tracking-wide mb-2">With 70%+ Recovery</p>
                    <p className="text-brand-400 font-semibold">~$11,760/year recovered</p>
                    <p className="text-zinc-500 text-xs">For zero product work</p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                What&apos;s a Good Churn Rate for SaaS?
              </h2>

              <p>Context matters:</p>

              <div className="overflow-x-auto my-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-800">
                      <th className="text-left py-3 px-4 text-zinc-400 font-medium">Stage</th>
                      <th className="text-left py-3 px-4 text-zinc-400 font-medium">Monthly Churn</th>
                      <th className="text-left py-3 px-4 text-zinc-400 font-medium">Annual Retention</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-zinc-800/50">
                      <td className="py-3 px-4 text-zinc-300">Early-stage (&lt;$1M ARR)</td>
                      <td className="py-3 px-4 text-zinc-300">3–8%</td>
                      <td className="py-3 px-4 text-zinc-300">55–70%</td>
                    </tr>
                    <tr className="border-b border-zinc-800/50">
                      <td className="py-3 px-4 text-zinc-300">Growth-stage ($1–10M ARR)</td>
                      <td className="py-3 px-4 text-zinc-300">1.5–3%</td>
                      <td className="py-3 px-4 text-zinc-300">70–85%</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-zinc-300">Mature ($10M+ ARR)</td>
                      <td className="py-3 px-4 text-zinc-300">0.5–1.5%</td>
                      <td className="py-3 px-4 text-zinc-300">85–95%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                If your churn rate is above 3% monthly at growth stage, passive churn from failed payments is likely a meaningful contributor — and it&apos;s the easiest one to fix.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                The Metric That Actually Matters
              </h2>

              <p>
                Churn rate tells you how fast you&apos;re losing customers. Retention rate tells you how long they stay. NRR tells you whether your existing customers are enough to sustain growth.
              </p>

              <p>
                All three matter. But if you&apos;re not segmenting churn by <em>type</em>, you&apos;re making decisions with incomplete data. Passive churn from payment failures doesn&apos;t require a product change, a pricing overhaul, or a sales motion to fix. It requires catching failed payments early, retrying at the right times, and reaching out before the customer even knows there&apos;s a problem.
              </p>

              <div className="glass rounded-xl p-8 my-12 text-center">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Start Recovering Passive Churn — Free
                </h3>
                <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
                  Revive connects to your Stripe account and automatically recovers failed payments. Free up to $500/month recovered. No credit card required.
                </p>
                <Link
                  href="https://revive.motu.inc"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-brand-500 hover:bg-brand-400 text-white font-semibold transition-colors"
                >
                  Start Free at Revive →
                </Link>
              </div>

              <p className="text-zinc-500 text-sm italic">
                SaaS metrics vary by market, pricing model, and customer segment. Benchmarks sourced from Stripe, Baremetrics, and ChartMogul industry data.
              </p>

            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
