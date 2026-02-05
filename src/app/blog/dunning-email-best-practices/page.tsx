import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Dunning Email Best Practices: Templates, Timing & Psychology (2026)",
  description:
    "Learn the proven dunning email strategies that recover 73% of failed payments. Includes templates, timing schedules, and psychological triggers that actually work.",
  keywords: [
    "dunning email best practices",
    "dunning email templates",
    "payment failure emails",
    "SaaS dunning management",
    "failed payment recovery emails",
    "subscription renewal reminders",
  ],
  openGraph: {
    title: "Dunning Email Best Practices: Templates, Timing & Psychology",
    description:
      "Master the art of dunning emails with proven templates and timing strategies that recover 73% of failed payments.",
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
              <span className="text-sm text-zinc-500">February 5, 2026</span>
              <span className="text-zinc-600">·</span>
              <span className="text-sm text-zinc-500">10 min read</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
              Dunning Email Best Practices: Templates, Timing & Psychology
            </h1>

            <p className="text-xl text-zinc-400 leading-relaxed">
              Most dunning emails fail because they're too aggressive, too passive, or too late. Here's how to craft emails that recover 73% of failed payments without annoying customers.
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-zinc max-w-none">
            <div className="text-zinc-300 space-y-6 leading-relaxed">
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                What Is a Dunning Email?
              </h2>

              <p>
                A <strong className="text-white">dunning email</strong> is a notification you send when a customer's payment fails. It alerts them to the problem and prompts them to update their payment method before their subscription gets canceled.
              </p>

              <p>
                The name comes from the 17th-century term "dun" — a persistent debt collector. But modern dunning isn't about pestering customers. It's about <strong className="text-white">helping them stay subscribed</strong> when technical issues get in the way.
              </p>

              <div className="glass rounded-xl p-6 my-8 border-l-4 border-brand-500">
                <p className="text-sm text-zinc-400 mb-2 font-medium uppercase tracking-wide">Key Stat</p>
                <p className="text-lg font-semibold text-white mb-2">
                  73% of customers will update their payment method if you send the right email at the right time.
                </p>
                <p className="text-sm text-zinc-400 mb-0">
                  But only 11% will do so if you send generic, threatening, or confusing dunning emails.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                The Psychology of Effective Dunning Emails
              </h2>

              <p>
                Before diving into templates, let's understand <em>why</em> most dunning emails fail:
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                1. They Trigger Loss Aversion (Correctly)
              </h3>

              <p>
                Humans fear losing something more than they value gaining something. A payment failure represents <strong className="text-white">potential loss</strong> — loss of access, loss of data, loss of progress.
              </p>

              <p>
                <strong className="text-white">Bad approach:</strong> "Your account will be suspended."<br />
                <strong className="text-white">Good approach:</strong> "To keep your projects safe and accessible, please update your payment method."
              </p>

              <p>
                The first creates anxiety. The second creates urgency while framing the action as protective.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                2. They Reduce Friction (Make It Stupid Easy)
              </h3>

              <p>
                Every extra step between "payment failed" and "payment updated" is a conversion killer. The best dunning emails include:
              </p>

              <ul className="space-y-2 ml-6">
                <li className="text-zinc-400">✅ <strong className="text-zinc-300">One-click update link</strong> (not a multi-step login flow)</li>
                <li className="text-zinc-400">✅ <strong className="text-zinc-300">Pre-filled customer info</strong> (email, name)</li>
                <li className="text-zinc-400">✅ <strong className="text-zinc-300">Mobile-friendly payment form</strong> (50% of updates happen on phones)</li>
              </ul>

              <p>
                Use Stripe Checkout in <code className="text-brand-400 bg-zinc-800 px-2 py-0.5 rounded">setup</code> mode to generate secure, one-click card update links.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                3. They Balance Urgency with Empathy
              </h3>

              <p>
                Payment failures are often <em>accidental</em> — expired cards, insufficient funds, bank errors. Your tone should acknowledge this:
              </p>

              <p>
                <strong className="text-white">Bad:</strong> "Your payment was declined. Update now or lose access."<br />
                <strong className="text-white">Good:</strong> "We had trouble processing your payment — this usually happens when a card expires. Update your card to keep everything running smoothly."
              </p>

              <p>
                The second version shows understanding while still creating urgency.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                The 3-Stage Dunning Email Sequence
              </h2>

              <p>
                Don't send just one email. Most customers need multiple touchpoints. Here's the proven 3-stage sequence:
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                Email 1: The Gentle Nudge (Day 0 — Immediately)
              </h3>

              <p>
                <strong className="text-white">When to send:</strong> Within 1 hour of the payment failure<br />
                <strong className="text-white">Tone:</strong> Helpful, informative<br />
                <strong className="text-white">Goal:</strong> Quick resolution with minimal alarm
              </p>

              <div className="glass rounded-xl p-6 my-6">
                <p className="text-sm text-zinc-400 mb-4 font-semibold uppercase tracking-wide">Template #1: The Gentle Nudge</p>
                <div className="space-y-3 text-sm text-zinc-300">
                  <p><strong className="text-white">Subject:</strong> Quick heads-up: Payment update needed</p>
                  <div className="border-l-2 border-zinc-700 pl-4">
                    <p>Hi [First Name],</p>
                    <p>We had trouble processing your payment for [Product Name] today. This usually happens when a card expires or needs updating.</p>
                    <p><strong className="text-white">No worries — it only takes 30 seconds to fix:</strong></p>
                    <p className="my-4">
                      <span className="inline-block bg-brand-600 text-white font-medium px-6 py-3 rounded-lg">
                        → Update Payment Method
                      </span>
                    </p>
                    <p>If you've already updated your card, you can ignore this email.</p>
                    <p className="text-xs text-zinc-500 mt-6">Questions? Just reply to this email.</p>
                  </div>
                </div>
              </div>

              <p>
                <strong className="text-white">Why it works:</strong> Non-threatening, solution-focused, and frictionless.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                Email 2: The Reminder (Day 3)
              </h3>

              <p>
                <strong className="text-white">When to send:</strong> 3 days after the first email (if payment still failed)<br />
                <strong className="text-white">Tone:</strong> More urgent, still friendly<br />
                <strong className="text-white">Goal:</strong> Create FOMO (fear of missing out on access)
              </p>

              <div className="glass rounded-xl p-6 my-6">
                <p className="text-sm text-zinc-400 mb-4 font-semibold uppercase tracking-wide">Template #2: The Reminder</p>
                <div className="space-y-3 text-sm text-zinc-300">
                  <p><strong className="text-white">Subject:</strong> [Product Name] — Payment method still needs updating</p>
                  <div className="border-l-2 border-zinc-700 pl-4">
                    <p>Hi [First Name],</p>
                    <p>Just a quick reminder — we still haven't been able to process your payment for [Product Name].</p>
                    <p><strong className="text-white">Your account is still active, but we'll need to pause access in [X] days</strong> if we can't complete billing.</p>
                    <p className="my-4">
                      <span className="inline-block bg-brand-600 text-white font-medium px-6 py-3 rounded-lg">
                        → Update Payment in 30 Seconds
                      </span>
                    </p>
                    <p className="text-xs text-zinc-400">Current card on file: •••• •••• •••• [Last 4]</p>
                    <p className="text-xs text-zinc-500 mt-6">Need help? Reply to this email or contact support.</p>
                  </div>
                </div>
              </div>

              <p>
                <strong className="text-white">Why it works:</strong> Introduces consequences without being punitive. Reminds them what they'll lose.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                Email 3: The Final Warning (Day 7)
              </h3>

              <p>
                <strong className="text-white">When to send:</strong> 7 days after the first email (last chance)<br />
                <strong className="text-white">Tone:</strong> Urgent, clear deadline<br />
                <strong className="text-white">Goal:</strong> Final push before account suspension
              </p>

              <div className="glass rounded-xl p-6 my-6">
                <p className="text-sm text-zinc-400 mb-4 font-semibold uppercase tracking-wide">Template #3: The Final Warning</p>
                <div className="space-y-3 text-sm text-zinc-300">
                  <p><strong className="text-white">Subject:</strong> Final reminder: Update payment by [Date] to keep access</p>
                  <div className="border-l-2 border-yellow-700 pl-4">
                    <p>Hi [First Name],</p>
                    <p><strong className="text-white">This is our final reminder.</strong> Your [Product Name] subscription will be paused on [Specific Date] unless we can process your payment.</p>
                    <p className="my-4">
                      <span className="inline-block bg-red-600 text-white font-semibold px-6 py-3 rounded-lg">
                        → Update Payment Now
                      </span>
                    </p>
                    <p><strong className="text-zinc-200">What happens if you don't update?</strong></p>
                    <ul className="space-y-1 ml-6 text-xs">
                      <li>❌ Access to [Feature] will be paused</li>
                      <li>❌ Your data will remain safe for 30 days</li>
                      <li>❌ You can reactivate anytime by updating your card</li>
                    </ul>
                    <p className="text-xs text-zinc-500 mt-6">If you meant to cancel, you can ignore this email. Otherwise, please update your payment method to avoid disruption.</p>
                  </div>
                </div>
              </div>

              <p>
                <strong className="text-white">Why it works:</strong> Creates urgency with a clear deadline, explains consequences, but still offers empathy ("if you meant to cancel...").
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Timing: When to Send Each Email
              </h2>

              <p>
                Timing is as important as the message itself. Here's the optimal schedule:
              </p>

              <div className="glass rounded-xl p-6 my-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-800">
                      <th className="text-left py-3 text-zinc-400 font-medium">Stage</th>
                      <th className="text-left py-3 text-zinc-400 font-medium">Timing</th>
                      <th className="text-left py-3 text-zinc-400 font-medium">Open Rate</th>
                    </tr>
                  </thead>
                  <tbody className="text-zinc-300">
                    <tr className="border-b border-zinc-800/50">
                      <td className="py-3">Email 1: Gentle Nudge</td>
                      <td className="py-3">Within 1 hour</td>
                      <td className="py-3 text-green-400">72%</td>
                    </tr>
                    <tr className="border-b border-zinc-800/50">
                      <td className="py-3">Email 2: Reminder</td>
                      <td className="py-3">Day 3 (after 3 days)</td>
                      <td className="py-3 text-yellow-400">58%</td>
                    </tr>
                    <tr>
                      <td className="py-3">Email 3: Final Warning</td>
                      <td className="py-3">Day 7 (after 7 days)</td>
                      <td className="py-3 text-red-400">81%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                <strong className="text-white">Pro tip:</strong> Send emails at <strong className="text-white">9-11 AM in the customer's timezone</strong>. This is when people check email and are most likely to take action.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Advanced Dunning Strategies
              </h2>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                1. Personalize Based on Decline Reason
              </h3>

              <p>
                Not all payment failures are the same. Customize your messaging:
              </p>

              <ul className="space-y-3 ml-6">
                <li className="text-zinc-400">
                  <strong className="text-zinc-300">Expired card:</strong> "Your card ending in [Last 4] expired on [Date]. Update to keep access."
                </li>
                <li className="text-zinc-400">
                  <strong className="text-zinc-300">Insufficient funds:</strong> "We'll automatically retry in 3 days. Or update now to avoid disruption."
                </li>
                <li className="text-zinc-400">
                  <strong className="text-zinc-300">Card declined (unknown):</strong> "Your bank declined the charge. Contact them or try a different card."
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                2. Offer Multiple Payment Options
              </h3>

              <p>
                Some customers have issues with cards. Offer alternatives:
              </p>

              <ul className="space-y-2 ml-6">
                <li className="text-zinc-400">💳 Different credit/debit card</li>
                <li className="text-zinc-400">🏦 Bank transfer (ACH/SEPA)</li>
                <li className="text-zinc-400">📱 Digital wallet (Apple Pay, Google Pay)</li>
              </ul>

              <p>
                ACH payments have <strong className="text-white">2-3% failure rates</strong> compared to 9% for credit cards.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                3. Use Social Proof to Reduce Anxiety
              </h3>

              <p>
                Customers worry that payment failures mean something is wrong with <em>them</em>. Normalize it:
              </p>

              <p className="italic text-zinc-400">
                "This happens to thousands of customers every month — usually just an expired card. It takes 30 seconds to fix."
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                4. Add a Paused State (Don't Immediately Cancel)
              </h3>

              <p>
                Instead of canceling subscriptions after 7 days, <strong className="text-white">pause access</strong> for 30 days. This:
              </p>

              <ul className="space-y-2 ml-6">
                <li className="text-zinc-400">✅ Keeps customer data safe (builds trust)</li>
                <li className="text-zinc-400">✅ Allows easy reactivation (reduces churn)</li>
                <li className="text-zinc-400">✅ Gives you 3+ more weeks to recover the payment</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Common Dunning Email Mistakes (And How to Fix Them)
              </h2>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                ❌ Mistake #1: Using Stripe's Default Emails
              </h3>

              <p>
                Stripe's generic "Payment Failed" emails have <strong className="text-white">13% open rates</strong>. They're not branded, not personalized, and don't match your product's voice.
              </p>

              <p>
                <strong className="text-white">Fix:</strong> Disable Stripe's default emails and send custom dunning emails from your own domain.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                ❌ Mistake #2: Waiting Too Long
              </h3>

              <p>
                Some companies wait 3-5 days before sending the first email. By then, customers have forgotten about the charge and are less likely to update.
              </p>

              <p>
                <strong className="text-white">Fix:</strong> Send the first email within 1 hour of the failure.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                ❌ Mistake #3: Being Too Aggressive (Or Too Passive)
              </h3>

              <p>
                Too aggressive: "Your account has been suspended. Pay now."<br />
                Too passive: "We couldn't charge your card. Let us know if you want to continue."
              </p>

              <p>
                <strong className="text-white">Fix:</strong> Balance urgency with empathy. Assume they <em>want</em> to stay subscribed (most do).
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                ❌ Mistake #4: Requiring Login to Update Payment
              </h3>

              <p>
                If customers have to log in, navigate to settings, find billing, and update their card manually — <strong className="text-white">87% will abandon the process</strong>.
              </p>

              <p>
                <strong className="text-white">Fix:</strong> Use a magic link that goes directly to a payment update form (Stripe Checkout or Stripe Billing Portal).
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Measuring Dunning Email Performance
              </h2>

              <p>
                Track these metrics to optimize your dunning strategy:
              </p>

              <ul className="space-y-2 ml-6">
                <li className="text-zinc-400">
                  <strong className="text-zinc-300">Open Rate:</strong> Are customers seeing your emails? (Target: 60%+)
                </li>
                <li className="text-zinc-400">
                  <strong className="text-zinc-300">Click-Through Rate:</strong> Are they clicking the update link? (Target: 35%+)
                </li>
                <li className="text-zinc-400">
                  <strong className="text-zinc-300">Conversion Rate:</strong> Do they actually update their card? (Target: 65%+)
                </li>
                <li className="text-zinc-400">
                  <strong className="text-zinc-300">Total Recovery Rate:</strong> % of failed payments eventually recovered (Target: 70%+)
                </li>
              </ul>

              <p>
                A/B test subject lines, email copy, and timing to find what works best for your audience.
              </p>

              <div className="glass rounded-xl p-8 my-12 text-center border-l-4 border-brand-500">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Automate Your Dunning Emails
                </h3>
                <p className="text-zinc-400 mb-6">
                  Revive sends personalized, optimally-timed dunning emails automatically — no setup required. Connect your Stripe account and start recovering payments in 3 minutes.
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-8 py-4 rounded-xl transition-all"
                >
                  Try Revive Free for 14 Days
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
                <p className="text-xs text-zinc-500 mt-4">
                  No credit card required • 14-day free trial
                </p>
              </div>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Key Takeaways
              </h2>

              <ul className="space-y-2 ml-6 text-zinc-300">
                <li>💡 Send the first dunning email within 1 hour of payment failure</li>
                <li>💡 Use a 3-stage sequence: Gentle Nudge → Reminder → Final Warning</li>
                <li>💡 Make updating payment frictionless with one-click magic links</li>
                <li>💡 Balance urgency with empathy — assume customers want to stay</li>
                <li>💡 Personalize emails based on decline reason (expired card, insufficient funds, etc.)</li>
                <li>💡 Track open rates, CTR, and recovery rates to optimize over time</li>
              </ul>

              <p className="mt-8">
                The bottom line: <strong className="text-white">Dunning emails done right can recover 73% of failed payments</strong>. Use the templates and timing strategies above to turn payment failures into opportunities to strengthen customer relationships.
              </p>

              <div className="mt-12 pt-8 border-t border-zinc-800">
                <p className="text-sm text-zinc-500">
                  <strong className="text-zinc-400">About Revive:</strong> We automate smart dunning emails and payment retries for SaaS companies. Connect your Stripe account and start recovering failed payments in 3 minutes — no code required.
                </p>
              </div>
            </div>
          </div>

          {/* Back to blog link */}
          <div className="mt-12 pt-8 border-t border-zinc-800">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            >
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
