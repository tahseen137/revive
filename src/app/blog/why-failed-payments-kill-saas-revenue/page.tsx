import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Why Failed Payments Kill SaaS Revenue (And How to Stop It)",
  description:
    "Involuntary churn from failed payments kills 20–40% of SaaS revenue. Learn how smart retry logic, dunning emails, and grace periods recover it.",
  keywords: [
    "failed payment recovery SaaS",
    "involuntary churn",
    "dunning automation",
    "payment retry logic",
    "SaaS payment recovery",
    "dunning email sequence",
    "Stripe payment failure",
  ],
  openGraph: {
    title: "Why Failed Payments Kill SaaS Revenue (And How to Stop It)",
    description:
      "Involuntary churn accounts for 20–40% of SaaS churn. Here's the full recovery stack: smart retries, dunning emails, grace periods, and in-app alerts.",
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
                Payment Recovery
              </div>
              <span className="text-sm text-zinc-500">February 28, 2026</span>
              <span className="text-zinc-600">·</span>
              <span className="text-sm text-zinc-500">7 min read</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
              Why Failed Payments Kill SaaS Revenue (And How to Stop It)
            </h1>

            <p className="text-xl text-zinc-400 leading-relaxed">
              Involuntary churn — subscriptions lost to failed payments, not unhappy customers — accounts for 20–40% of total SaaS churn. Most of it is recoverable. Here&apos;s the full stack.
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-zinc max-w-none">
            <div className="text-zinc-300 space-y-6 leading-relaxed">

              <p>
                There&apos;s a revenue leak in most SaaS businesses that nobody talks about. It&apos;s not churn from unhappy customers, failed sales calls, or weak onboarding. It&apos;s customers who <em>wanted to stay</em> — and left anyway because their payment failed.
              </p>

              <p>
                Failed payment recovery is the highest-ROI retention work you can do. Here&apos;s why it happens, how bad it actually is, and exactly what to do about it.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                The Involuntary Churn Problem
              </h2>

              <p>
                When a subscription payment fails, most platforms cancel the subscription after a few retries. The customer gets a few generic emails, ignores them, and one day notices they lost access to a tool they were actively using.
              </p>

              <p>
                This is <strong className="text-white">involuntary churn</strong> — subscription cancellations driven by payment failure, not customer intent. It accounts for <strong className="text-white">20–40% of total SaaS churn</strong>.
              </p>

              <p>Think about that. Nearly half your churned customers might not have wanted to leave.</p>

              <p><strong className="text-white">Why payments fail:</strong></p>

              <ul className="space-y-2 ml-6 list-disc text-zinc-300">
                <li><strong className="text-white">Card expiration:</strong> The most common cause. Cards get reissued constantly.</li>
                <li><strong className="text-white">Insufficient funds:</strong> Temporary cash flow issues, especially with SMB customers.</li>
                <li><strong className="text-white">Fraud prevention:</strong> Banks increasingly block unfamiliar subscription charges.</li>
                <li><strong className="text-white">Card limit exceeded:</strong> Monthly spending caps from corporate cards.</li>
                <li><strong className="text-white">Soft declines:</strong> Temporary bank-side issues that resolve on retry.</li>
              </ul>

              <p>
                Most of these are fixable. The customer isn&apos;t gone — their payment just didn&apos;t go through. The question is whether you have the systems to recover them before they lose access and stop caring.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                How Much Revenue You&apos;re Losing
              </h2>

              <p>The math is uncomfortable.</p>

              <p>
                If you have $50K MRR and 3% of payments fail monthly, that&apos;s $1,500 per month at risk. Most SaaS platforms without dedicated recovery recover 25–35% of that. Best-in-class dunning systems recover 65–75%.
              </p>

              <div className="overflow-x-auto my-8">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-700">
                      <th className="text-left py-3 pr-4 text-zinc-400 font-medium">MRR</th>
                      <th className="text-left py-3 pr-4 text-zinc-400 font-medium">3% Failed</th>
                      <th className="text-left py-3 pr-4 text-zinc-400 font-medium">30% Recovery</th>
                      <th className="text-left py-3 pr-4 text-zinc-400 font-medium">70% Recovery</th>
                      <th className="text-left py-3 text-zinc-400 font-medium">Monthly Delta</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    <tr>
                      <td className="py-3 pr-4 text-white">$50K</td>
                      <td className="py-3 pr-4 text-zinc-300">$1,500</td>
                      <td className="py-3 pr-4 text-zinc-400">$450</td>
                      <td className="py-3 pr-4 text-green-400 font-semibold">$1,050</td>
                      <td className="py-3 text-brand-400 font-semibold">+$600</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-white">$100K</td>
                      <td className="py-3 pr-4 text-zinc-300">$3,000</td>
                      <td className="py-3 pr-4 text-zinc-400">$900</td>
                      <td className="py-3 pr-4 text-green-400 font-semibold">$2,100</td>
                      <td className="py-3 text-brand-400 font-semibold">+$1,200</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-white">$250K</td>
                      <td className="py-3 pr-4 text-zinc-300">$7,500</td>
                      <td className="py-3 pr-4 text-zinc-400">$2,250</td>
                      <td className="py-3 pr-4 text-green-400 font-semibold">$5,250</td>
                      <td className="py-3 text-brand-400 font-semibold">+$3,000</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-white">$500K</td>
                      <td className="py-3 pr-4 text-zinc-300">$15,000</td>
                      <td className="py-3 pr-4 text-zinc-400">$4,500</td>
                      <td className="py-3 pr-4 text-green-400 font-semibold">$10,500</td>
                      <td className="py-3 text-brand-400 font-semibold">+$6,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                At $250K MRR, the difference between bad and good payment recovery is <strong className="text-white">$36,000/year</strong> — without a single new customer.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Smart Retry Logic: Why Timing Matters
              </h2>

              <p>
                The default approach — retry the payment at the same time every day for a week — doesn&apos;t work well. Different decline codes have different recovery windows.
              </p>

              <div className="glass rounded-xl p-6 my-6 border border-zinc-700/50">
                <p className="text-sm text-zinc-400 mb-4 font-medium uppercase tracking-wide">Retry Routing by Decline Code</p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-4">
                    <code className="text-brand-400 text-xs shrink-0 mt-0.5">insufficient_funds</code>
                    <span className="text-zinc-300">Retry in 3 days, then 7 days — waits for payday</span>
                  </div>
                  <div className="flex items-start gap-4">
                    <code className="text-brand-400 text-xs shrink-0 mt-0.5">card_velocity_exceeded</code>
                    <span className="text-zinc-300">Wait 7 days, then 14 — limit resets monthly</span>
                  </div>
                  <div className="flex items-start gap-4">
                    <code className="text-brand-400 text-xs shrink-0 mt-0.5">do_not_honor</code>
                    <span className="text-zinc-300">Email customer immediately, retry after 48h</span>
                  </div>
                  <div className="flex items-start gap-4">
                    <code className="text-brand-400 text-xs shrink-0 mt-0.5">expired_card</code>
                    <span className="text-zinc-300">Skip retries entirely — send card update link immediately</span>
                  </div>
                </div>
              </div>

              <p>
                Stripe exposes the decline reason in webhooks. The routing logic isn&apos;t complicated to build — it just requires someone to build it. Most companies skip this and use Stripe&apos;s default schedule because it&apos;s the path of least resistance.
              </p>

              <div className="glass rounded-xl p-6 my-6 border-l-4 border-brand-500">
                <p className="text-sm text-zinc-400 mb-2 font-medium uppercase tracking-wide">The Card Updater Most Teams Miss</p>
                <p className="text-zinc-300 text-sm">
                  Stripe&apos;s Automatic Card Updater works with Visa, Mastercard, Discover, and Amex to automatically refresh expired card details before the payment fails. Banks push updated card numbers to the network when cards are reissued. Enable it — it&apos;s free for Stripe users and prevents a meaningful percentage of expiration-related failures before they happen.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Dunning Email Sequences That Actually Convert
              </h2>

              <p>Most dunning emails are terrible — transactional, generic, and timed wrong. An effective sequence:</p>

              <div className="space-y-4 my-6">
                <div className="glass rounded-xl p-5 border border-zinc-700/50">
                  <p className="text-xs text-zinc-500 mb-1">Email 1 · Day 0 (same day as failure)</p>
                  <p className="text-white font-semibold text-sm mb-2">Subject: Action needed: Update your payment details</p>
                  <p className="text-zinc-400 text-sm">Factual, not alarming. Explain what happened, give a direct link to update. No guilt.</p>
                </div>
                <div className="glass rounded-xl p-5 border border-zinc-700/50">
                  <p className="text-xs text-zinc-500 mb-1">Email 2 · Day 3</p>
                  <p className="text-white font-semibold text-sm mb-2">Subject: Your subscription is at risk — quick 30-second fix</p>
                  <p className="text-zinc-400 text-sm">Add urgency. Reiterate the impact (access will be suspended, not just &quot;subscription ends&quot;). Prominent update link.</p>
                </div>
                <div className="glass rounded-xl p-5 border border-zinc-700/50">
                  <p className="text-xs text-zinc-500 mb-1">Email 3 · Day 5</p>
                  <p className="text-white font-semibold text-sm mb-2">Subject: Final notice: [Product] access suspending soon</p>
                  <p className="text-zinc-400 text-sm">High urgency. Specific suspension date. If they have data or progress to lose — mention it explicitly.</p>
                </div>
              </div>

              <p><strong className="text-white">What converts:</strong></p>
              <ul className="space-y-2 ml-6 list-disc text-zinc-300">
                <li><strong className="text-white">One-click card update flows:</strong> Pre-authenticated links that drop users directly on the payment update screen, not a generic billing page.</li>
                <li><strong className="text-white">Personalization:</strong> Their name, their plan, their specific renewal amount. Generic feels spammy. Specific feels important.</li>
                <li><strong className="text-white">Mobile optimization:</strong> Most payment emails are opened on phones. If the update flow requires desktop, you&apos;re losing conversions.</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Grace Periods: The Buffer Most Companies Get Wrong
              </h2>

              <p>
                Cutting off access immediately maximizes payment urgency but maximizes churn. The customer who couldn&apos;t update their card because they were traveling comes back on day three to find their account gone — and takes the cancellation as final.
              </p>

              <p>Grace periods change the psychology. &quot;My account is at risk, I should deal with this&quot; beats &quot;my account is suspended, I need to deal with this.&quot;</p>

              <div className="glass rounded-xl p-6 my-6 border border-zinc-700/50">
                <p className="text-sm text-zinc-400 mb-3 font-medium uppercase tracking-wide">Recommended Grace Periods</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-300">Monthly plans</span>
                    <span className="text-white font-semibold">7–10 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-300">Annual plans</span>
                    <span className="text-white font-semibold">14–21 days</span>
                  </div>
                </div>
              </div>

              <p>
                Use the grace period as the urgency engine. Day 1: low urgency, informational. Day 5: moderate urgency. Day 7 (2 days before expiry): high urgency, specific date. Show a persistent in-app banner — but don&apos;t lock the product. Customers who stop seeing value accelerate toward leaving.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                The Full Recovery Stack
              </h2>

              <p>All four layers working together:</p>

              <div className="space-y-3 my-6">
                {[
                  { num: "01", title: "Card Updater", desc: "Prevents expiration failures before they happen. Enable in Stripe dashboard." },
                  { num: "02", title: "Smart retry scheduling", desc: "Route retries by decline code. Don't treat all failures the same." },
                  { num: "03", title: "Dunning email sequence", desc: "3 emails with escalating urgency. Personalized, mobile-optimized, direct update links." },
                  { num: "04", title: "In-app payment alerts", desc: "Persistent banner during grace period. Catches active users who missed emails." },
                ].map((item) => (
                  <div key={item.num} className="glass rounded-xl p-5 border border-zinc-700/50 flex gap-4">
                    <span className="text-brand-400 font-mono text-sm font-bold shrink-0">{item.num}</span>
                    <div>
                      <p className="text-white font-semibold text-sm mb-1">{item.title}</p>
                      <p className="text-zinc-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p>
                Running all four, best-in-class SaaS businesses recover 65–75% of failed payments. Running none: 25–35% at best.
              </p>

              <p>
                The economics are simple: every percentage point of recovery improvement has a direct MRR multiplier. And unlike most retention work, payment recovery doesn&apos;t require product changes, CS headcount, or pricing experiments. It&apos;s pure infrastructure.
              </p>

              <div className="mt-10 p-6 rounded-xl bg-brand-500/10 border border-brand-500/20">
                <p className="text-white font-semibold mb-2">Automate the full recovery stack with Revive</p>
                <p className="text-zinc-400 text-sm mb-4">
                  Smart retries by decline code, dunning email sequences, in-app payment alerts, and recovery analytics — all four layers, without custom code. Flat $49/month, no revenue share.
                </p>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-500 text-white text-sm font-medium hover:bg-brand-400 transition-colors"
                >
                  Start recovering payments →
                </Link>
              </div>

              <p className="text-sm text-zinc-500 mt-8">
                Related reading:{" "}
                <Link href="/blog/dunning-email-templates-7" className="text-brand-400 hover:text-brand-300">
                  7 Dunning Email Templates That Recover Failed Payments
                </Link>
                {" · "}
                <Link href="/blog/saas-churn-prevention-tactics-2026" className="text-brand-400 hover:text-brand-300">
                  5 Proven Churn Prevention Tactics for SaaS in 2026
                </Link>
                {" · "}
                <Link href="/blog/stripe-webhooks-payment-recovery" className="text-brand-400 hover:text-brand-300">
                  Building Payment Recovery with Stripe Webhooks
                </Link>
              </p>

              <div className="mt-8 pt-8 border-t border-zinc-800">
                <p className="text-sm text-zinc-500">
                  <strong className="text-zinc-400">About Revive:</strong> Payment recovery automation for SaaS. Smart retries, dunning emails, and in-app alerts. $49/mo flat, no revenue share.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-zinc-800">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to blog
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
