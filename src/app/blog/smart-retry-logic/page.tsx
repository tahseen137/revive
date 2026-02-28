import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Stripe Smart Retries vs Custom Dunning Logic: What Recovers More Revenue | Revive",
  description:
    "Honest comparison of Stripe Smart Retries vs custom dunning logic for SaaS payment recovery. Code examples, recovery rate data, and what actually closes the gap from 40% to 78% recovery.",
  keywords: [
    "payment retry logic SaaS",
    "Stripe Smart Retries",
    "custom dunning logic",
    "payment recovery SaaS",
    "failed payment retry",
    "dunning automation",
    "Stripe Billing",
  ],
  openGraph: {
    title: "Stripe Smart Retries vs Custom Dunning Logic: What Recovers More Revenue",
    description:
      "Stripe Smart Retries get you to 40–45% recovery. A full dunning strategy gets you to 78%. Here's exactly what closes that gap — with code.",
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
                Technical Guide
              </div>
              <span className="text-sm text-zinc-500">February 28, 2026</span>
              <span className="text-zinc-600">·</span>
              <span className="text-sm text-zinc-500">8 min read</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
              Stripe Smart Retries vs Custom Dunning Logic: What Actually Recovers More Revenue
            </h1>

            <p className="text-xl text-zinc-400 leading-relaxed">
              Stripe&apos;s Smart Retries are a good baseline — but they&apos;re not a payment recovery strategy.
              Here&apos;s an honest comparison, with code, of what Stripe handles natively versus what custom
              logic recovers on top.
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-zinc max-w-none">
            <div className="text-zinc-300 space-y-6 leading-relaxed">
              <p>
                Stripe&apos;s Smart Retries sound like exactly what you need. Machine learning. Optimal timing. Built right into your existing payments stack. Just enable it and let it run.
              </p>

              <p>
                For many SaaS businesses, that&apos;s where the conversation ends — and it&apos;s costing them.
              </p>

              <p>
                Stripe Smart Retries are a good baseline. But they&apos;re not a complete payment recovery strategy. Here&apos;s an honest comparison of what Stripe handles natively versus what custom dunning logic recovers on top, with the code to back it up.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                What Stripe Smart Retries Actually Do
              </h2>

              <p>
                Stripe&apos;s built-in retry logic (available in Billing settings) uses ML models to predict the optimal retry time for each failed payment. It analyzes signals like:
              </p>

              <ul className="space-y-2 ml-6">
                <li className="text-zinc-400">Time of day and day of week payment success rates</li>
                <li className="text-zinc-400">Customer&apos;s historical payment behavior</li>
                <li className="text-zinc-400">Card network patterns</li>
                <li className="text-zinc-400">Failure reason codes (<code className="text-brand-400">insufficient_funds</code> vs. <code className="text-brand-400">card_declined</code> vs. <code className="text-brand-400">do_not_honor</code>)</li>
              </ul>

              <p>
                When a payment fails, Stripe schedules 3–4 retry attempts over approximately 8 days. If all retries fail, the subscription moves to a configured state — <code className="text-brand-400">canceled</code>, <code className="text-brand-400">unpaid</code>, or <code className="text-brand-400">past_due</code> — based on your settings.
              </p>

              <div className="glass rounded-xl p-6 my-8">
                <p className="text-sm font-semibold text-zinc-300 mb-4">What Smart Retries get right:</p>
                <ul className="space-y-2 text-zinc-400">
                  <li>✅ Zero engineering effort to enable</li>
                  <li>✅ Genuinely smarter than naive fixed-interval retries</li>
                  <li>✅ Handles the retry timing problem reasonably well</li>
                </ul>
                <p className="text-sm font-semibold text-zinc-300 mb-4 mt-6">What Smart Retries miss:</p>
                <ul className="space-y-2 text-zinc-400">
                  <li>❌ No email communication on failures (you configure that separately, if at all)</li>
                  <li>❌ No in-app notifications</li>
                  <li>❌ No pause flow — it&apos;s cancel or nothing</li>
                  <li>❌ No segmentation by customer value or plan tier</li>
                  <li>❌ Limited retry window (8 days default)</li>
                  <li>❌ No insight into what&apos;s recoverable vs. truly lost</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                The Recovery Gap: Where Custom Logic Wins
              </h2>

              <p>
                A typical SaaS company with no dunning strategy recovers about <strong className="text-white">20%</strong> of failed payments through customer-initiated card updates. Stripe Smart Retries alone push that to <strong className="text-white">40–45%</strong>.
              </p>

              <p>
                A complete dunning strategy — retries + email sequences + in-app flows — recovers <strong className="text-white">70–78%</strong>.
              </p>

              <div className="glass rounded-xl p-6 my-8 border-l-4 border-brand-500">
                <p className="text-sm text-zinc-400 mb-2 font-medium uppercase tracking-wide">The Math</p>
                <p className="text-lg font-semibold text-white mb-2">
                  On $5,000/month in payment failures, that 30-point gap means $750 extra recovered — every month.
                </p>
                <p className="text-sm text-zinc-400 mb-0">
                  Stripe only: $2,000 recovered. Full dunning: $3,750 recovered. The math scales linearly.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Layer 1: Extending the Retry Window
              </h2>

              <p>
                Stripe&apos;s default retry window is ~8 days. For some failure types — particularly <code className="text-brand-400">insufficient_funds</code> — that&apos;s often too short.
              </p>

              <p>
                Consider a customer who gets paid on the 15th. Their card failed on the 10th. Stripe retries through the 18th and gives up. But if you extended the window to 21 days, the payment would succeed on the 16th.
              </p>

              <p>
                With Stripe&apos;s API, you can implement extended retry logic by catching <code className="text-brand-400">invoice.payment_failed</code> webhooks and scheduling your own retry attempts:
              </p>

              <div className="bg-zinc-900 rounded-xl p-6 my-6 overflow-x-auto">
                <pre className="text-sm text-zinc-300 font-mono whitespace-pre-wrap"><code>{`// webhook handler for invoice.payment_failed
app.post('/webhooks/stripe', async (req, res) => {
  const event = stripe.webhooks.constructEvent(
    req.body, req.headers['stripe-signature'], process.env.WEBHOOK_SECRET
  );

  if (event.type === 'invoice.payment_failed') {
    const invoice = event.data.object;
    const failureCode = invoice.last_payment_error?.decline_code;
    
    // Extend window for insufficient_funds — likely paycheck-timing issue
    if (failureCode === 'insufficient_funds') {
      await scheduleRetry(invoice.id, { delayDays: 5 }); // retry on payday window
    }
    
    // Immediate re-try for do_not_honor — often a bank block, resolves quickly
    if (failureCode === 'do_not_honor') {
      await scheduleRetry(invoice.id, { delayHours: 24 });
    }
  }
  res.json({ received: true });
});`}</code></pre>
              </div>

              <p>Different failure codes warrant different retry strategies:</p>

              <div className="overflow-x-auto my-8">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-700">
                      <th className="text-left py-3 px-4 text-zinc-300 font-semibold">Failure Code</th>
                      <th className="text-left py-3 px-4 text-zinc-300 font-semibold">Meaning</th>
                      <th className="text-left py-3 px-4 text-zinc-300 font-semibold">Optimal Retry Strategy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["insufficient_funds", "Card limit / account empty", "Wait 5–7 days (payday cycle)"],
                      ["do_not_honor", "Bank declined generically", "Retry in 24–48 hours"],
                      ["card_declined", "Card blocked or flagged", "Prompt customer to update card"],
                      ["expired_card", "Card past expiration", "Email immediately, request new card"],
                      ["lost_card / stolen_card", "Fraud block", "Email immediately, no retries"],
                    ].map(([code, meaning, strategy]) => (
                      <tr key={code} className="border-b border-zinc-800">
                        <td className="py-3 px-4 font-mono text-brand-400 text-xs">{code}</td>
                        <td className="py-3 px-4 text-zinc-400">{meaning}</td>
                        <td className="py-3 px-4 text-zinc-300">{strategy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Layer 2: Email Dunning Sequences
              </h2>

              <p>
                Stripe Billing has a basic dunning email feature. It sends a single notification when a payment fails. That&apos;s better than nothing. It&apos;s not good enough.
              </p>

              <p>
                A three-email dunning sequence consistently outperforms single-notification approaches by <strong className="text-white">20–30% in recovery rate</strong>. Here&apos;s the sequence that works:
              </p>

              <div className="glass rounded-xl p-6 my-6">
                <p className="text-xs font-semibold text-brand-400 mb-3 uppercase tracking-wide">Email 1 — Day 0 (failure day): Soft notification</p>
                <div className="bg-zinc-900/50 rounded-lg p-4 font-mono text-sm text-zinc-300 whitespace-pre-wrap">{`Subject: Quick heads-up about your subscription

Hey [Name],

We tried to renew your [Product] subscription today but had a 
small hiccup with your payment method.

No worries — this happens sometimes. Just click below to update 
your payment info and you'll be all set:

→ [Update Payment Method]

Your account is still active. Just want to make sure you stay connected.

— [Founder Name]`}</div>
              </div>

              <div className="glass rounded-xl p-6 my-6">
                <p className="text-xs font-semibold text-brand-400 mb-3 uppercase tracking-wide">Email 2 — Day 3: Gentle reminder</p>
                <div className="bg-zinc-900/50 rounded-lg p-4 font-mono text-sm text-zinc-300 whitespace-pre-wrap">{`Subject: Your account is still active, but...

Hey [Name],

Just a quick reminder — we still weren't able to process your 
[Product] renewal. Your account is active for a few more days.

One click fixes this:
→ [Update Payment Method]

Takes about 30 seconds. Happy to help if you run into anything.`}</div>
              </div>

              <div className="glass rounded-xl p-6 my-6">
                <p className="text-xs font-semibold text-red-400 mb-3 uppercase tracking-wide">Email 3 — Day 6: Final notice</p>
                <div className="bg-zinc-900/50 rounded-lg p-4 font-mono text-sm text-zinc-300 whitespace-pre-wrap">{`Subject: [Name], your access expires in 24 hours

Tomorrow we'll need to pause your [Product] account due to the 
payment issue. You'll lose access to [key feature].

Update now to avoid any interruption:
→ [Update Payment Method]

If you're running into something, just reply to this email.`}</div>
              </div>

              <p className="text-zinc-400 text-sm">
                Keys: plain text formatting (not HTML templates), sent from a real person&apos;s address, and a single pre-authenticated link that drops them directly on the billing update page — not your login screen.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Layer 3: In-App Notifications
              </h2>

              <p>
                Email gets a 40–50% open rate on dunning messages. That means half your customers with payment issues aren&apos;t seeing your emails.
              </p>

              <p>In-app notifications catch them when they actually log in:</p>

              <div className="bg-zinc-900 rounded-xl p-6 my-6 overflow-x-auto">
                <pre className="text-sm text-zinc-300 font-mono whitespace-pre-wrap"><code>{`// Check payment status on app load
const { data: subscription } = await supabase
  .from('subscriptions')
  .select('status, days_until_cancellation')
  .eq('user_id', userId)
  .single();

if (subscription.status === 'past_due') {
  showPaymentBanner({
    daysRemaining: subscription.days_until_cancellation,
    updateUrl: generateBillingPortalUrl(userId),
  });
}`}</code></pre>
              </div>

              <p>
                A simple banner at the top of your app — &quot;Your payment failed. Update your card to avoid losing access.&quot; — recovers <strong className="text-white">10–15% more revenue</strong> on top of what email sequences capture. Entirely absent from Stripe&apos;s built-in tooling.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Layer 4: Pause Instead of Cancel
              </h2>

              <p>The default Stripe behavior when all retries fail: cancel the subscription.</p>

              <p>
                The problem: canceling a customer creates a re-acquisition problem. They have to sign up again, re-enter their card, potentially re-complete onboarding. Friction compounds at every step, and most canceled customers don&apos;t come back.
              </p>

              <p>A pause flow changes the equation:</p>

              <div className="bg-zinc-900 rounded-xl p-6 my-6 overflow-x-auto">
                <pre className="text-sm text-zinc-300 font-mono whitespace-pre-wrap"><code>{`// Instead of canceling, pause the subscription
await stripe.subscriptions.update(subscriptionId, {
  pause_collection: {
    behavior: 'mark_uncollectible',
    resumes_at: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60), // 30 days
  },
});`}</code></pre>
              </div>

              <div className="glass rounded-xl p-6 my-8 border-l-4 border-green-500">
                <p className="text-lg font-semibold text-white mb-2">
                  Customers who exit via pause are 4× more likely to reactivate than customers who cancel.
                </p>
                <p className="text-sm text-zinc-400 mb-0">
                  Their data persists. Settings remain. One click to reactivate — no re-onboarding, no friction.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                The Build-vs-Buy Decision
              </h2>

              <p>
                Building a complete dunning system — retry logic, email sequences, in-app notifications, pause flows, analytics — takes a few weeks of engineering time and ongoing maintenance as Stripe&apos;s API evolves.
              </p>

              <p>
                The logic isn&apos;t complicated. But it&apos;s finicky. Webhook idempotency, retry deduplication, email deliverability, authenticated billing portal links — there are a dozen small things to get right.
              </p>

              <div className="glass rounded-xl p-8 my-10 text-center">
                <p className="text-lg font-semibold text-white mb-2">
                  Revive handles all of it out of the box
                </p>
                <ul className="text-left text-zinc-400 space-y-2 max-w-sm mx-auto mb-6">
                  <li>✓ Failure-code-aware retry scheduling</li>
                  <li>✓ Three-email dunning sequences (customizable)</li>
                  <li>✓ Drop-in JavaScript for in-app payment banners</li>
                  <li>✓ Automatic pause flows for at-risk subscribers</li>
                  <li>✓ Real-time recovery analytics</li>
                </ul>
                <p className="text-zinc-400 mb-6">
                  Connect Stripe in 15 minutes. Flat $49/month. No revenue share.
                </p>
                <Link
                  href="https://revive-hq.com?utm_source=blog&utm_campaign=smart-retry"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-colors"
                >
                  See How Revive Handles Payment Recovery →
                </Link>
              </div>

              <hr className="border-zinc-800 my-10" />

              <p className="text-sm text-zinc-500">
                <em>Related: </em>
                <Link href="/blog/mrr-expansion" className="text-brand-400 hover:text-brand-300">How Payment Recovery Expands MRR</Link>
                {" · "}
                <Link href="/blog/stripe-failed-payment-retry" className="text-brand-400 hover:text-brand-300">Stripe Failed Payment Retry: Complete Technical Guide</Link>
                {" · "}
                <Link href="/blog/dunning-email-best-practices" className="text-brand-400 hover:text-brand-300">Dunning Email Best Practices</Link>
              </p>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
