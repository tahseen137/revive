import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "The Complete Guide to Stripe Dunning: How to Recover Failed Payments in 2026",
  description:
    "Learn what Stripe dunning is, where native tools fall short, and how smart retry strategies recover the 20-40% of SaaS revenue lost to involuntary churn.",
  keywords: [
    "stripe dunning",
    "stripe failed payments",
    "stripe dunning management",
    "stripe smart retries",
    "failed payment recovery",
    "involuntary churn",
    "stripe subscription recovery",
    "stripe revenue recovery",
  ],
  openGraph: {
    title: "The Complete Guide to Stripe Dunning: Recover Failed Payments in 2026",
    description:
      "What Stripe gives you out of the box, where it falls short, and how to recover the revenue you're silently losing.",
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
              <span className="text-sm text-zinc-500">8 min read</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
              The Complete Guide to Stripe Dunning: How to Recover Failed Payments in 2026
            </h1>

            <p className="text-xl text-zinc-400 leading-relaxed">
              Failed payments are the silent killer of SaaS revenue. If you&apos;re running subscriptions on Stripe, you&apos;ve almost certainly watched MRR quietly bleed out through failed charges you didn&apos;t catch in time. Here&apos;s how to stop it.
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-zinc max-w-none">
            <div className="text-zinc-300 space-y-6 leading-relaxed">

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                What Is Dunning?
              </h2>

              <p>
                Dunning is the process of automatically following up with customers whose payments have failed — retrying the charge, sending reminder emails, and ultimately deciding when to cancel a subscription that can&apos;t be revived.
              </p>

              <p>
                The word sounds archaic (it dates to 17th-century debt collection), but the concept is very much alive in 2026. For any SaaS business, <strong className="text-white">involuntary churn</strong> — customers who didn&apos;t choose to leave but lost access because a card failed — accounts for a significant slice of total churn. Industry estimates put it at <strong className="text-white">20–40% of all subscription cancellations</strong>.
              </p>

              <p>
                The fix isn&apos;t great onboarding or better retention emails. It&apos;s a tight dunning system that recovers failed payments before the customer even notices something went wrong.
              </p>

              <div className="glass rounded-xl p-6 my-8 border-l-4 border-brand-500">
                <p className="text-sm text-zinc-400 mb-2 font-medium uppercase tracking-wide">Key Stat</p>
                <p className="text-lg font-semibold text-white mb-2">
                  20–40% of subscription cancellations are involuntary — the customer wanted to stay, but a payment failed.
                </p>
                <p className="text-sm text-zinc-400 mb-0">
                  Most of this revenue is recoverable with the right dunning setup.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                What Stripe Gives You Out of the Box
              </h2>

              <p>
                Stripe&apos;s built-in dunning tools are called <strong className="text-white">Smart Retries</strong> and <strong className="text-white">Revenue Recovery</strong>. Here&apos;s what they include:
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">Smart Retries</h3>

              <p>
                Stripe&apos;s machine learning model analyzes billions of payment signals to pick the optimal time to retry a failed charge. Instead of retrying at fixed intervals (e.g., every 3 days), Stripe tries to find windows when the card is most likely to succeed — payday periods, times when the customer&apos;s bank is less congested, etc.
              </p>

              <p>
                You can configure Smart Retries in your Stripe Dashboard under <strong className="text-white">Billing → Revenue Recovery → Retry schedule</strong>. You choose how many times to retry and over what period (up to 8 retries over 30 days by default).
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">Automatic Emails</h3>

              <p>
                Stripe can send automatic payment failure emails directly to customers, prompting them to update their payment method. These emails are configurable but minimal — Stripe&apos;s branding shows through, and customization is limited compared to what most teams actually need.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">Customer Portal</h3>

              <p>
                Stripe&apos;s hosted customer portal lets subscribers update their payment method themselves. When paired with failure emails, this self-serve flow can recover a portion of failed payments passively.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">Subscription Lifecycle Actions</h3>

              <p>
                You can set Stripe to: mark invoices as unpaid, cancel subscriptions after a set number of failed retries, or pause subscriptions instead of canceling. These lifecycle rules are global — one setting applies to all your subscribers.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Where Native Stripe Dunning Falls Short
              </h2>

              <p>
                Stripe&apos;s tools are solid for a simple setup. But as your subscription business grows, the limitations become real:
              </p>

              <div className="space-y-4 my-6">
                <div className="glass rounded-xl p-5">
                  <p className="font-semibold text-white mb-1">1. One-size-fits-all retry logic</p>
                  <p className="text-zinc-400 text-sm mb-0">
                    Stripe applies the same retry schedule to everyone — the customer who&apos;s been paying you for three years and the one who signed up last week. There&apos;s no way to give high-LTV customers more retry attempts or gentler treatment.
                  </p>
                </div>

                <div className="glass rounded-xl p-5">
                  <p className="font-semibold text-white mb-1">2. No segmentation in email flows</p>
                  <p className="text-zinc-400 text-sm mb-0">
                    Every failed payment gets the same Stripe-branded email. You can&apos;t send different messaging to annual subscribers vs. monthly, enterprise customers vs. self-serve, or customers in different geographies.
                  </p>
                </div>

                <div className="glass rounded-xl p-5">
                  <p className="font-semibold text-white mb-1">3. Limited observability</p>
                  <p className="text-zinc-400 text-sm mb-0">
                    Stripe tells you that a payment failed. It doesn&apos;t easily surface patterns: which card types fail most, which customer segments have the highest recovery rate, or how your retry success rate trends over time.
                  </p>
                </div>

                <div className="glass rounded-xl p-5">
                  <p className="font-semibold text-white mb-1">4. No pre-dunning</p>
                  <p className="text-zinc-400 text-sm mb-0">
                    By the time Stripe sends a failure email, the card has already declined. Smart recovery starts before failure — notifying customers about expiring cards or potential issues before the charge even runs.
                  </p>
                </div>

                <div className="glass rounded-xl p-5">
                  <p className="font-semibold text-white mb-1">5. No A/B testing</p>
                  <p className="text-zinc-400 text-sm mb-0">
                    You can&apos;t test whether 4 retries outperforms 6, or whether a different email subject line improves payment update rates. Stripe&apos;s dunning is a black box.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Smart Stripe Dunning Strategies for 2026
              </h2>

              <p>
                Whether you&apos;re using Stripe&apos;s native tools or layering on something more advanced, here are the strategies that actually move the needle:
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">Retry on Payday Windows</h3>

              <p>
                Cards decline most often when balances are low. Scheduling retries around the 1st and 15th of the month — typical paydays in North America — improves success rates meaningfully. Stripe&apos;s ML does some of this automatically, but manual awareness helps.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">Send Pre-Expiry Alerts</h3>

              <p>
                Proactively email customers whose cards expire in the next 30–60 days. A simple &quot;your card is expiring soon&quot; message sent before the charge fails converts significantly better than a post-failure recovery email.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">Differentiate by Customer Tier</h3>

              <p>
                Give your best customers more retries and more time. A customer who&apos;s been paying $500/month for two years deserves a more patient recovery flow than a month-old free trial conversion.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">Personalize Your Messaging</h3>

              <p>
                Generic payment failure emails feel automated and easy to ignore. Emails that mention the product, the plan, and the specific amount feel more urgent and personal — and they convert better.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">Track Recovery Cohorts</h3>

              <p>
                Measure what percentage of failed payments you recover within 7 days, 14 days, and 30 days. If that number isn&apos;t improving over time, your dunning system isn&apos;t learning.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                How Revive Extends Stripe&apos;s Capabilities
              </h2>

              <p>
                <Link href="https://revive.motu.inc" className="text-brand-400 hover:text-brand-300">Revive</Link> is built specifically for Stripe-powered SaaS businesses that need more than what&apos;s available natively. Here&apos;s what Revive adds on top of Stripe:
              </p>

              <ul className="space-y-3 my-6 list-none pl-0">
                <li className="flex items-start gap-3">
                  <span className="text-brand-400 mt-1 flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-white">Segmented retry logic</strong>
                    <span className="text-zinc-400"> — Different retry schedules for different customer segments. High-value customers get more attempts and more time.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-400 mt-1 flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-white">Pre-dunning alerts</strong>
                    <span className="text-zinc-400"> — Automatic expiring card detection with personalized outreach before the charge fails.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-400 mt-1 flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-white">Custom email sequences</strong>
                    <span className="text-zinc-400"> — Branded, personalized dunning emails you control — not Stripe&apos;s generic templates. Triggered by failure type, customer tier, and subscription age.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-400 mt-1 flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-white">A/B testing built in</strong>
                    <span className="text-zinc-400"> — Test retry schedules, email timing, and messaging. See what actually recovers more revenue for your specific customer base.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-400 mt-1 flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-white">Recovery analytics</strong>
                    <span className="text-zinc-400"> — Dashboards that show recovery rate by segment, retry attempt, failure reason, and time period. Know exactly where revenue is slipping through.</span>
                  </div>
                </li>
              </ul>

              <p>
                Revive connects to your existing Stripe account via API — no migration, no new payment infrastructure. Your customers never notice a thing. You just recover more of what you&apos;ve already earned.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                The Revenue You&apos;re Leaving on the Table
              </h2>

              <p>
                If your MRR is $20,000 and involuntary churn accounts for 30% of your cancellations, you&apos;re losing roughly $6,000/month to failed payments. Even recovering 50% of that — a conservative number with good dunning — is $3,000/month in recovered revenue, or <strong className="text-white">$36,000/year</strong>.
              </p>

              <p>
                That&apos;s not a marginal improvement. That&apos;s a real revenue line that most Stripe businesses are simply leaving on the table because their dunning setup is set-and-forget.
              </p>

              <div className="glass rounded-xl p-8 my-12 text-center">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Ready to Stop Losing Revenue to Failed Payments?
                </h3>
                <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
                  Connect your Stripe account in under 5 minutes. See your recovery gap in your first session. No credit card required.
                </p>
                <Link
                  href="https://revive.motu.inc"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-brand-500 hover:bg-brand-400 text-white font-semibold transition-colors"
                >
                  Start Your Free Trial at Revive →
                </Link>
              </div>

              <p className="text-zinc-500 text-sm italic">
                Stripe dunning doesn&apos;t have to be a black box. With the right tools, failed payments become a recoverable revenue stream — not a write-off.
              </p>

            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
