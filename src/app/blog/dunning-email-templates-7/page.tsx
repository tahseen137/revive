import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "7 Dunning Email Templates That Recover Failed Payments (2026)",
  description:
    "Steal these 7 dunning email templates used by SaaS companies recovering 60-70% of failed payments. Includes subject lines, full copy, and timing for each.",
  keywords: [
    "dunning email templates",
    "failed payment email templates",
    "payment recovery email templates",
    "SaaS dunning emails",
    "subscription payment failure email",
    "dunning sequence templates",
  ],
  openGraph: {
    title: "7 Dunning Email Templates That Recover Failed Payments",
    description:
      "Steal these 7 dunning email templates used by SaaS companies recovering 60-70% of failed payments.",
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
              <span className="text-sm text-zinc-500">February 27, 2026</span>
              <span className="text-zinc-600">·</span>
              <span className="text-sm text-zinc-500">10 min read</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
              7 Dunning Email Templates That Recover Failed Payments
            </h1>

            <p className="text-xl text-zinc-400 leading-relaxed">
              Most dunning emails are terrible — not because founders don't care, but because nobody teaches you how to write them. Here are 7 templates you can steal, with timing and reasoning for each.
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-zinc max-w-none">
            <div className="text-zinc-300 space-y-6 leading-relaxed">

              <p>
                Companies recovering 60-70% of failed payments aren't doing anything magical. They're following a few non-obvious principles and sending the right message at the right time.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Why most dunning emails fail
              </h2>

              <p>
                The biggest mistake isn't the copy. It's the assumption that all payment failures are the same. A card expiring is completely different from insufficient funds, which is completely different from a bank blocking an international charge. When you send the same generic "your payment failed" email for all three, you're treating very different situations identically.
              </p>

              <p>
                Three other common mistakes: adding friction (forcing login to update a card), waiting too long (first email should go out within an hour), and being too aggressive (most failures are accidental — treat them that way).
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Template 1: The Soft Alert (Day 0 — within 1 hour)
              </h2>

              <p>This is the most important email in the sequence. Most people write it wrong.</p>

              <div className="glass rounded-xl p-6 my-6 border border-zinc-700/50 font-mono text-sm">
                <p className="text-brand-400 font-semibold mb-3">Subject: Quick heads up about your [Product] account</p>
                <p className="text-zinc-300 whitespace-pre-line">{`Hi [First Name],

Bit of an annoying thing — we couldn't process your payment for [Product Name] today. Usually this happens because a card expired or has different billing info than expected.

Takes about 30 seconds to fix:

→ Update Payment Method [link]

If you've already updated your card or this looks like an error, feel free to ignore this — we'll retry automatically in a couple days.

—
[Your Name]
[Product] · questions? Just reply to this`}</p>
              </div>

              <p>
                <strong className="text-white">Why this works:</strong> Non-threatening. Assumes good faith. The "retry automatically" line reduces urgency anxiety — you're not saying "act NOW or we cancel you." That comes later.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Template 2: Specific Decline — Insufficient Funds (Day 0)
              </h2>

              <p>When you know the specific reason, use it. Stripe's <code className="text-brand-400">decline_code</code> field tells you a lot.</p>

              <div className="glass rounded-xl p-6 my-6 border border-zinc-700/50 font-mono text-sm">
                <p className="text-brand-400 font-semibold mb-3">Subject: Your [Product] payment — we'll retry in 3 days</p>
                <p className="text-zinc-300 whitespace-pre-line">{`Hi [First Name],

We tried to process your [Product Name] payment today but the card showed insufficient funds. It happens — no big deal.

We'll automatically retry in 3 days. If you'd rather take care of it now or try a different card:

→ Update Payment Method [link]

Either way, your account is staying active through this.

—
[Your Name]`}</p>
              </div>

              <p>
                <strong className="text-white">Why this works:</strong> Honest about the reason without being embarrassing. The "retry in 3 days" line suggests you're handling it, which reduces customer anxiety. Some will update immediately; others will let you retry and succeed on payday.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Template 3: Expired Card (Day 0)
              </h2>

              <p>Expired cards are the most fixable failure type. Say that explicitly.</p>

              <div className="glass rounded-xl p-6 my-6 border border-zinc-700/50 font-mono text-sm">
                <p className="text-brand-400 font-semibold mb-3">Subject: Your card expired — here's the fast fix</p>
                <p className="text-zinc-300 whitespace-pre-line">{`Hi [First Name],

Looks like the card we have on file for [Product Name] expired recently. Super common — happens to everyone.

Update it here (takes 60 seconds):

→ Update Payment Method [link]

Your current card: •••• •••• •••• [Last 4], expired [MM/YY]

—
[Your Name]`}</p>
              </div>

              <p>
                <strong className="text-white">Why this works:</strong> Shows you know specifically what happened. Including the last 4 digits and expiry makes it feel genuinely personalized, not automated.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Template 4: The 3-Day Follow-Up (Day 3)
              </h2>

              <div className="glass rounded-xl p-6 my-6 border border-zinc-700/50 font-mono text-sm">
                <p className="text-brand-400 font-semibold mb-3">Subject: [Product] — payment still needs attention</p>
                <p className="text-zinc-300 whitespace-pre-line">{`Hi [First Name],

Just following up — we haven't been able to process your [Product Name] payment yet, and we want to make sure your account stays active.

Your access is still on right now, but we'll need to pause things in about 4 days if we can't complete billing.

→ Update Payment in 60 Seconds [link]

If something feels off or you have questions, just reply — we're real people.

—
[Your Name]`}</p>
              </div>

              <p>
                <strong className="text-white">Why this works:</strong> Soft countdown without being aggressive. The "real people" line is important — it reduces friction for customers who are confused and might just need to ask a question.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Template 5: The Win-Back Offer (Day 5 — optional)
              </h2>

              <p>This is the underused middle email. Add it if you're seeing significant drop-off between day 3 and day 7.</p>

              <div className="glass rounded-xl p-6 my-6 border border-zinc-700/50 font-mono text-sm">
                <p className="text-brand-400 font-semibold mb-3">Subject: Something I wanted to offer you</p>
                <p className="text-zinc-300 whitespace-pre-line">{`Hi [First Name],

We still haven't been able to process your [Product Name] payment, and I just wanted to check in.

If cost is the issue, I'd be happy to talk about options — whether that's a plan that fits better, a short pause, or something else. I don't want you to lose access over something we can probably work out.

If it's just the payment method, here's the direct link:

→ Update Payment [link]

Either way — just let me know.

—
[Your Name]`}</p>
              </div>

              <p>
                <strong className="text-white">Why this works:</strong> For high-value customers especially, this kind of personal outreach converts surprisingly well. The "plan that fits better" line opens a door to retention conversations.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Template 6: The Final Warning (Day 7)
              </h2>

              <div className="glass rounded-xl p-6 my-6 border border-zinc-700/50 font-mono text-sm">
                <p className="text-brand-400 font-semibold mb-3">Subject: Your [Product] account pauses tomorrow</p>
                <p className="text-zinc-300 whitespace-pre-line">{`Hi [First Name],

We've tried a few times to process your payment for [Product Name] without success. Tomorrow, on [Specific Date], we're going to need to pause your account access.

Your data stays safe — we keep everything for 30 days so you can reactivate anytime. But access to [Feature 1], [Feature 2] will be paused until billing is resolved.

→ Update Payment Now — Takes 2 Minutes [link]

If you meant to cancel, you don't need to do anything. No hard feelings.

—
[Your Name]`}</p>
              </div>

              <p>
                <strong className="text-white">Why this works:</strong> Specific date (not "soon"), specific consequences, data safety reassurance, and explicit permission to leave. That last part sounds counterintuitive but actually reduces churn — it makes people feel respected, not pressured.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Template 7: The Reactivation Email (Day 30)
              </h2>

              <p>After account pause. Most companies never send this — a meaningful portion of paused accounts will reactivate if you reach out once more.</p>

              <div className="glass rounded-xl p-6 my-6 border border-zinc-700/50 font-mono text-sm">
                <p className="text-brand-400 font-semibold mb-3">Subject: Your [Product] account is waiting for you</p>
                <p className="text-zinc-300 whitespace-pre-line">{`Hi [First Name],

It's been about a month since your [Product Name] account was paused. We've kept all your data safe, and your account is ready to reactivate whenever you're ready.

[One sentence about a new feature or improvement, if applicable.]

→ Reactivate Your Account [link]

And if there's something that made the experience not worth it, I'd genuinely love to hear it.

—
[Your Name]`}</p>
              </div>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Timing that works
              </h2>

              <div className="overflow-x-auto my-6">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-700">
                      <th className="text-left py-3 pr-6 text-zinc-400 font-medium">Email</th>
                      <th className="text-left py-3 pr-6 text-zinc-400 font-medium">Timing</th>
                      <th className="text-left py-3 text-zinc-400 font-medium">Open Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    <tr>
                      <td className="py-3 pr-6 text-white">Decline-specific (T1/2/3)</td>
                      <td className="py-3 pr-6 text-zinc-300">Within 1 hour</td>
                      <td className="py-3 text-zinc-300">~68-72%</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-6 text-white">3-day follow-up (T4)</td>
                      <td className="py-3 pr-6 text-zinc-300">Day 3</td>
                      <td className="py-3 text-zinc-300">~52-58%</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-6 text-white">Win-back offer (T5)</td>
                      <td className="py-3 pr-6 text-zinc-300">Day 5 (optional)</td>
                      <td className="py-3 text-zinc-300">~45%</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-6 text-white">Final warning (T6)</td>
                      <td className="py-3 pr-6 text-zinc-300">Day 7</td>
                      <td className="py-3 text-zinc-300">~78-82%</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-6 text-white">Reactivation (T7)</td>
                      <td className="py-3 pr-6 text-zinc-300">Day 30</td>
                      <td className="py-3 text-zinc-300">~35-40%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>Day 7 has the highest open rates because people know it's the last chance. Send at 9–11 AM local time. Avoid Friday afternoons.</p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Four things that kill dunning performance
              </h2>

              <ul className="space-y-4 ml-6 list-disc text-zinc-300">
                <li><strong className="text-white">Using Stripe's default emails.</strong> Open rates around 13-15%. Turn them off and send your own.</li>
                <li><strong className="text-white">Requiring login to update payment.</strong> 80%+ abandon at the login screen. Use Stripe Checkout in setup mode for frictionless payment update links.</li>
                <li><strong className="text-white">Sending from a no-reply address.</strong> All dunning emails perform better from a real address.</li>
                <li><strong className="text-white">One-and-done sequences.</strong> A single email might get you 20-25% recovery. The multi-email sequence above drives 60-70%.</li>
              </ul>

              <div className="glass rounded-xl p-6 my-8 border-l-4 border-brand-500">
                <p className="text-sm text-zinc-400 mb-2 font-medium uppercase tracking-wide">Quick Summary</p>
                <p className="text-white font-medium mb-2">Dunning emails work when they&apos;re:</p>
                <ul className="space-y-2 ml-4 list-disc text-zinc-300 text-sm">
                  <li>Decline-specific (expired card ≠ insufficient funds ≠ generic)</li>
                  <li>Frictionless (one-click update, no login required)</li>
                  <li>Timed right (first email within 1 hour)</li>
                  <li>Human in tone (assume good faith, real reply-to)</li>
                  <li>Part of a multi-email sequence</li>
                </ul>
              </div>

              <p>
                Most companies are leaving 40-50% of their potential recovery on the table. These templates close that gap.
              </p>

              <div className="mt-10 p-6 rounded-xl bg-brand-500/10 border border-brand-500/20">
                <p className="text-white font-semibold mb-2">Want this automated?</p>
                <p className="text-zinc-400 text-sm mb-4">
                  Revive automates this entire sequence — decline-specific emails, optimal timing, one-click update links, smart retries — for $49/mo flat, no revenue share.
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
                <Link href="/blog/dunning-email-best-practices" className="text-brand-400 hover:text-brand-300">
                  Dunning Email Best Practices: Timing & Psychology
                </Link>
                {" · "}
                <Link href="/blog/failed-payment-recovery-strategies" className="text-brand-400 hover:text-brand-300">
                  Complete Failed Payment Recovery Strategies
                </Link>
                {" · "}
                <Link href="/blog/saas-churn-metrics-2026" className="text-brand-400 hover:text-brand-300">
                  SaaS Churn Metrics That Actually Matter
                </Link>
              </p>

              <div className="mt-8 pt-8 border-t border-zinc-800">
                <p className="text-sm text-zinc-500">
                  <strong className="text-zinc-400">About Revive:</strong> Payment recovery automation for SaaS. Smart retries, dunning emails, and win-back campaigns. $49/mo flat, no revenue share. Connect Stripe in 3 minutes.
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
