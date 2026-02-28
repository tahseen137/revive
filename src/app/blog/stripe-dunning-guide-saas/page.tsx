import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "The Complete Stripe Dunning Guide for SaaS Founders in 2026 | Revive",
  description:
    "A practical Stripe dunning guide for SaaS founders: why 9-16% of cards fail monthly, how to set up retry logic and email sequences, and what actually recovers revenue.",
  keywords: [
    "stripe dunning guide SaaS",
    "stripe dunning",
    "SaaS payment recovery",
    "stripe failed payment recovery",
    "dunning email sequence",
    "stripe smart retries",
    "involuntary churn SaaS",
    "stripe subscription recovery 2026",
  ],
  openGraph: {
    title: "The Complete Stripe Dunning Guide for SaaS Founders in 2026",
    description:
      "Why 9-16% of your Stripe subscriptions fail monthly, what to do about it, and how to build a dunning system that recovers 60-75% of that revenue.",
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
              <span className="text-sm text-zinc-500">9 min read</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
              The Complete Stripe Dunning Guide for SaaS Founders in 2026
            </h1>

            <p className="text-xl text-zinc-400 leading-relaxed">
              Every month, 9-16% of your Stripe subscriptions will fail on renewal. Most founders do not have
              a real plan for this. Here is everything you need to build one: retry logic, email sequences,
              timing, and the numbers that actually matter.
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-zinc max-w-none">
            <div className="text-zinc-300 space-y-6 leading-relaxed">

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                What Is Dunning (And Why It Matters More Than You Think)
              </h2>

              <p>
                Dunning is what happens between a failed payment and a cancelled subscription. It is the retry
                attempts, the reminder emails, the card update flows -- everything you do to recover revenue
                before you are forced to revoke access.
              </p>

              <p>
                For most SaaS founders, dunning is an afterthought. You set up Stripe, enable Smart Retries,
                and assume it handles itself. It does not -- not really.
              </p>

              <p>
                Stripe Smart Retries recover roughly 38% of failed payments on their own. That means
                62% of your failed payments are still failing after Stripe gives up. On $30K MRR with a
                10% monthly failure rate, that is about $1,860 walking out the door every month
                from customers who wanted to stay.
              </p>

              <div className="glass rounded-xl p-6 my-8 border-l-4 border-brand-500">
                <p className="text-sm text-zinc-400 mb-2 font-medium uppercase tracking-wide">The Math</p>
                <p className="text-lg font-semibold text-white mb-2">
                  $30K MRR x 10% failure rate x 62% unrecovered = $1,860/month in preventable losses.
                </p>
                <p className="text-sm text-zinc-400 mb-0">
                  A proper dunning system gets you to 60-75% recovery -- roughly tripling what Stripe handles alone.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Why Do Stripe Payments Fail?
              </h2>

              <p>
                Before you build a dunning system, you need to understand what you are actually dealing with.
                Not all failures are equal -- and treating them the same is the #1 mistake founders make.
              </p>

              <p>The main failure categories, by frequency:</p>

              <ul className="space-y-3 text-zinc-300">
                <li>
                  <strong className="text-white">Insufficient funds (30-44% of failures)</strong> -- The customer
                  account does not have money right now. This is the worst failure type to recover from.
                  Recovery rates are 25-35%, and even recovered customers often fail again within 60 days.
                  You are dealing with actual financial stress, not forgetfulness.
                </li>
                <li>
                  <strong className="text-white">Card-related failures (25-32% of failures)</strong> -- Expired cards,
                  replaced cards, cards re-issued after fraud. This is your best opportunity. These customers
                  want to pay -- they just need to update their card. Recovery rates are 60-75% with
                  fast outreach and a frictionless card update flow.
                </li>
                <li>
                  <strong className="text-white">Bank/issuer declines (15-20% of failures)</strong> -- Generic declines
                  from the bank, often triggered by fraud detection or international transactions.
                  Mixed recovery. Timing matters a lot -- retrying immediately rarely works; waiting
                  24-48 hours often does.
                </li>
                <li>
                  <strong className="text-white">Hard declines (~10% of failures)</strong> -- Card reported stolen,
                  account closed, fraud flags. Do not retry these. Immediately notify the customer
                  and ask them to add a new payment method.
                </li>
              </ul>

              <p>
                The practical implication: your dunning system needs to send different emails to different
                failure types. A "update your card" email to someone who has insufficient funds makes them
                feel bad and does not help. A "your card expired" email to someone whose card was genuinely
                expired? That closes fast.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Stripe Smart Retries: What You Get Out of the Box
              </h2>

              <p>
                Stripe Smart Retries uses machine learning to pick the best time to retry a failed payment.
                It analyzes signals like time of day, day of week, and historical success patterns to
                choose retry windows most likely to succeed.
              </p>

              <p>Enable it in your Stripe Dashboard under Billing &gt; Subscriptions &gt; Smart Retries.</p>

              <p>What it does well:</p>
              <ul className="space-y-2">
                <li>Handles soft declines (temporary failures) better than fixed schedules</li>
                <li>Automatically backs off on hard declines</li>
                <li>Recovers ~38% of failed payments -- better than no retries at all</li>
                <li>Zero setup, works immediately after enabling</li>
              </ul>

              <p>What it does not do:</p>
              <ul className="space-y-2">
                <li>Send any customer communication (no emails, no alerts)</li>
                <li>Provide a card update flow for customers</li>
                <li>Segment by failure reason</li>
                <li>Handle pre-dunning (warning customers before their card expires)</li>
              </ul>

              <p>
                Smart Retries is the floor, not the ceiling. You still need emails, card update pages,
                and segment-specific sequences to get from 38% to 60-75% recovery.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Building Your Dunning Email Sequence
              </h2>

              <p>
                Most founders set up a 3-email sequence. The timing matters more than the copy -- and the
                first email matters most of all.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                Email 1: Day 0 (Within 2 Hours of Failure)
              </h3>

              <p>
                This is your highest-value email. Send it within 2 hours of the failed payment, while the
                customer is likely still at their desk and still has their card app open.
              </p>

              <p>
                Customers who convert via Day 0 emails do so at 2-3x the rate of customers who first
                hear about the problem on Day 3. By Day 3, they have rationalized it -- "I will deal with it
                later" -- and later often means never.
              </p>

              <p>What to include:</p>
              <ul className="space-y-2">
                <li>What failed and why (segment by failure reason if possible)</li>
                <li>A <strong className="text-white">single-click card update link</strong> -- no login required</li>
                <li>What they will lose if they do not act (access, features, data)</li>
                <li>A personal tone -- not a robot, not an invoice</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                Email 2: Day 3-5 (Gentle Reminder)
              </h3>

              <p>
                Still friendly. Acknowledge they might have missed the first email. Repeat the update link.
                Include the amount due. Do not threaten anything yet.
              </p>

              <p>
                This email catches people who were genuinely busy or who missed the first one. Keep it short --
                one paragraph, one link, one ask.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                Email 3: Day 7-10 (Final Notice)
              </h3>

              <p>
                Now you can be direct about consequences. Their subscription will be cancelled on a specific
                date. This creates real urgency -- a countdown is more motivating than vague language.
              </p>

              <p>
                Include the cancellation date. Keep the update link. Consider offering a brief concession
                (a discount, a plan pause) for high-value customers.
              </p>

              <div className="glass rounded-xl p-6 my-8 border-l-4 border-zinc-600">
                <p className="text-sm text-zinc-400 mb-3 font-medium uppercase tracking-wide">
                  Segmentation Note
                </p>
                <p className="text-zinc-300 mb-0">
                  If you can identify the failure reason from Stripe webhooks, customize the email copy accordingly.
                  "Your card ending in 4242 has expired -- update it here" outperforms "there was an issue with
                  your payment" by 30-40% in open rates. Specificity signals legitimacy and makes the action obvious.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                The Card Update Page: Your Highest-Leverage Feature
              </h2>

              <p>
                Most SaaS founders underestimate how much friction kills payment recovery. If your card
                update flow requires logging in, navigating to billing settings, and then entering a new
                card -- you are losing customers who would have paid.
              </p>

              <p>
                What actually works: a tokenized, no-login-required card update page. The customer clicks
                the link in the email, enters their new card number, clicks submit. Done in 30 seconds.
                Works on mobile.
              </p>

              <p>How to build it with Stripe:</p>

              <ul className="space-y-2">
                <li>
                  Generate a unique, time-limited token when the payment fails and store it against the
                  customer record
                </li>
                <li>
                  Include the token in the dunning email as a URL parameter
                </li>
                <li>
                  On the update page, validate the token, then use Stripe.js to collect the new card details
                </li>
                <li>
                  After a successful card update, immediately retry the failed charge
                </li>
              </ul>

              <p>
                The no-login requirement is non-negotiable. Customers who have not logged into your app
                in a month are not going to remember their password to update a card. Do not make them.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Pre-Dunning: Stop Failures Before They Happen
              </h2>

              <p>
                The best dunning email is the one you never have to send, because the payment never failed
                in the first place.
              </p>

              <p>
                Pre-dunning means reaching out to customers before their card expires. Stripe stores card
                expiry dates on the PaymentMethod object -- you can query them and send alerts 30 days before expiry.
              </p>

              <p>A simple pre-dunning message:</p>

              <div className="glass rounded-xl p-6 my-6 bg-zinc-900/50">
                <p className="text-sm text-zinc-400 mb-3 font-medium">Example Pre-Dunning Email</p>
                <p className="text-zinc-300 mb-2">
                  <strong className="text-white">Subject:</strong> Your card expires next month -- quick update needed
                </p>
                <p className="text-zinc-300 mb-0">
                  "Hey [Name], your card ending in 4242 expires in 30 days. Your subscription renews on [date] --
                  update your card now so nothing gets interrupted. [Update Link] Takes 30 seconds."
                </p>
              </div>

              <p>
                Pre-dunning converts at 60-70% -- far higher than post-failure recovery, because the customer
                has not experienced any friction yet. They just update the card and move on.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                What a Full Dunning System Looks Like
              </h2>

              <p>Putting it all together, a complete SaaS dunning system has:</p>

              <ul className="space-y-3">
                <li>
                  <strong className="text-white">Stripe Smart Retries enabled</strong> -- baseline protection,
                  recover 38% automatically
                </li>
                <li>
                  <strong className="text-white">Stripe webhook listener</strong> for invoice.payment_failed events
                  -- triggers your email sequence
                </li>
                <li>
                  <strong className="text-white">Failure reason parsing</strong> -- segment insufficient_funds,
                  expired_card, do_not_honor into different email tracks
                </li>
                <li>
                  <strong className="text-white">3-email sequence</strong> -- Day 0, Day 3-5, Day 7-10, with
                  failure-specific copy
                </li>
                <li>
                  <strong className="text-white">Tokenized card update page</strong> -- no login required,
                  mobile-friendly, retries the charge immediately on success
                </li>
                <li>
                  <strong className="text-white">Pre-dunning cron</strong> -- 30-day expiry alerts for cards
                  about to expire
                </li>
                <li>
                  <strong className="text-white">Recovery dashboard</strong> -- track recovery rate by failure type,
                  see exactly what you are recovering
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                What to Measure
              </h2>

              <p>Three numbers that matter:</p>

              <ul className="space-y-3">
                <li>
                  <strong className="text-white">Recovery rate</strong> -- What percentage of failed payments
                  eventually succeed? Below 40% means your system is underperforming. 60-75% is a realistic
                  target with a solid dunning setup.
                </li>
                <li>
                  <strong className="text-white">Time to recovery</strong> -- How many days between the first
                  failure and successful payment? A customer who recovers in 3 days is far less likely to
                  churn than one who has been in your dunning flow for 25 days.
                </li>
                <li>
                  <strong className="text-white">Revenue recovered per month</strong> -- The dollar figure.
                  Calculate it as (recovered payments) x (average subscription value).
                </li>
              </ul>

              <p>
                You can check your baseline right now in Stripe Dashboard under Billing then Revenue recovery.
                If your recovery rate is below 40%, there is real money being left on the table.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Build It Yourself or Use a Tool?
              </h2>

              <p>
                If you are pre-$10K MRR and have an engineer available, building a basic dunning sequence
                yourself is reasonable. A webhook listener, 3 transactional emails, and a card update page
                takes about a week. It will not be perfect, but it beats doing nothing.
              </p>

              <p>
                If you are at $10K-$50K MRR, use a tool. Not because you cannot build it, but because
                the failure segmentation, email deliverability, retry timing optimization, and ongoing
                maintenance are all engineering work that does not build your core product.
              </p>

              <p>
                We built <Link href="/" className="text-brand-400 hover:text-brand-300 transition-colors">Revive</Link> exactly
                for this range. It connects to your Stripe account in 15 minutes, handles failure segmentation
                automatically, sends branded emails from your domain with tokenized card update links,
                and shows you exactly how much you have recovered. No engineering time required after setup.
              </p>

              <div className="glass rounded-xl p-8 my-10 text-center border border-brand-500/30">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Check Your Stripe Recovery Rate
                </h3>
                <p className="text-zinc-400 mb-6">
                  Go to Stripe Dashboard, then Billing, then Revenue recovery. If your rate is below 40%,
                  Revive can close that gap -- usually in the first 30 days.
                </p>
                <Link
                  href="/launch"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-500 hover:bg-brand-400 text-white font-semibold transition-colors"
                >
                  See How Much You Are Losing
                </Link>
              </div>

            </div>
          </div>

          {/* Back link */}
          <div className="mt-16 pt-8 border-t border-zinc-800">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 19-7-7 7-7"/>
                <path d="M19 12H5"/>
              </svg>
              Back to Blog
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
