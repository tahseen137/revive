import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Stripe Payment Failure Codes Explained: Complete Guide (2026)",
  description:
    "Comprehensive guide to every Stripe decline code — what each one means, why it happens, and the optimal retry strategy to recover failed payments.",
  keywords: [
    "stripe payment failure codes",
    "stripe decline codes",
    "card_declined stripe",
    "stripe error codes",
    "payment failure reasons",
    "stripe insufficient funds",
  ],
  openGraph: {
    title: "Stripe Payment Failure Codes Explained: Complete Reference",
    description:
      "The complete guide to Stripe decline codes, what causes them, and how to fix each one.",
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
                Technical Reference
              </div>
              <span className="text-sm text-zinc-500">February 5, 2026</span>
              <span className="text-zinc-600">·</span>
              <span className="text-sm text-zinc-500">15 min read</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
              Stripe Payment Failure Codes Explained: What Each One Means and How to Fix It
            </h1>

            <p className="text-xl text-zinc-400 leading-relaxed">
              Your Stripe payment failed. But why? This complete reference explains every major Stripe decline code, what causes it, and the optimal retry strategy for each.
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-zinc max-w-none">
            <div className="text-zinc-300 space-y-6 leading-relaxed">
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Understanding Stripe Decline Codes
              </h2>

              <p>
                When a payment fails on Stripe, you don't just get "payment failed" — you get a <strong className="text-white">specific decline code</strong> that tells you <em>why</em> it failed. Understanding these codes is critical because:
              </p>

              <ul className="space-y-2 ml-6">
                <li className="text-zinc-400">🎯 <strong className="text-zinc-300">Different codes require different strategies</strong> — retrying an expired card won't work, but retrying insufficient funds might</li>
                <li className="text-zinc-400">⏱️ <strong className="text-zinc-300">Timing matters</strong> — some failures should be retried immediately, others need days</li>
                <li className="text-zinc-400">📧 <strong className="text-zinc-300">Customer communication varies</strong> — your dunning email should match the decline reason</li>
              </ul>

              <div className="glass rounded-xl p-6 my-8 border-l-4 border-brand-500">
                <p className="text-sm text-zinc-400 mb-2 font-medium uppercase tracking-wide">Bookmark This Page</p>
                <p className="text-lg font-semibold text-white mb-2">
                  This is a reference guide. Keep it handy when debugging payment failures.
                </p>
                <p className="text-sm text-zinc-400 mb-0">
                  Every SaaS founder dealing with Stripe should understand these codes to minimize revenue loss from failed payments.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                How Stripe Decline Codes Work
              </h2>

              <p>
                When Stripe attempts to charge a card, it communicates with the customer's bank (the issuing bank). The bank either approves or <strong className="text-white">declines</strong> the charge, sending back a decline code that explains why.
              </p>

              <p>
                Stripe surfaces these codes in:
              </p>

              <ul className="space-y-2 ml-6">
                <li className="text-zinc-400">✅ Your Stripe Dashboard (Payments → Failed)</li>
                <li className="text-zinc-400">✅ Webhook events (<code className="text-brand-400 bg-zinc-800 px-2 py-0.5 rounded">charge.failed</code>)</li>
                <li className="text-zinc-400">✅ API responses (in the <code className="text-brand-400 bg-zinc-800 px-2 py-0.5 rounded">decline_code</code> field)</li>
              </ul>

              <p>
                Each code falls into one of three categories:
              </p>

              <div className="glass rounded-xl p-6 my-6">
                <ul className="space-y-3 text-zinc-300">
                  <li>
                    <strong className="text-white">1. Retriable Failures</strong> — Temporary issues that might succeed if retried later (e.g., insufficient funds, processing errors)
                  </li>
                  <li>
                    <strong className="text-white">2. Non-Retriable Failures</strong> — Permanent issues that won't succeed without customer action (e.g., expired card, card reported stolen)
                  </li>
                  <li>
                    <strong className="text-white">3. Fraud/Risk Failures</strong> — Security blocks that require verification or alternative payment methods
                  </li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                The Most Common Stripe Decline Codes (And What to Do About Each)
              </h2>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                1. <code className="text-brand-400 bg-zinc-800 px-2 py-1 rounded">card_declined</code> — Generic Decline
              </h3>

              <p>
                <strong className="text-white">What it means:</strong> The bank declined the charge, but didn't provide a specific reason. This is the most common decline code.
              </p>

              <p>
                <strong className="text-white">Why it happens:</strong>
              </p>

              <ul className="space-y-2 ml-6">
                <li className="text-zinc-400">💰 Insufficient funds (but the bank didn't specify this)</li>
                <li className="text-zinc-400">🚨 Fraud detection triggered by unusual activity</li>
                <li className="text-zinc-400">🔒 Daily spending limit reached</li>
                <li className="text-zinc-400">🌍 International transaction blocked</li>
              </ul>

              <p>
                <strong className="text-white">Optimal retry strategy:</strong>
              </p>

              <div className="glass rounded-xl p-6 my-6 bg-zinc-900/50">
                <p className="text-zinc-300 mb-3"><strong className="text-white">Retry schedule:</strong> 4 hours → 1 day → 3 days → 7 days</p>
                <p className="text-zinc-300 mb-3"><strong className="text-white">Email customer?</strong> Yes, after 2nd retry failure</p>
                <p className="text-zinc-300 mb-0"><strong className="text-white">Likelihood of recovery:</strong> 45-50% if retried strategically</p>
              </div>

              <p>
                <strong className="text-white">What to tell the customer:</strong> "Your bank declined the charge. This can happen for several reasons — try contacting your bank or using a different payment method."
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                2. <code className="text-brand-400 bg-zinc-800 px-2 py-1 rounded">insufficient_funds</code> — Not Enough Money
              </h3>

              <p>
                <strong className="text-white">What it means:</strong> The cardholder doesn't have enough funds available to cover the charge.
              </p>

              <p>
                <strong className="text-white">Why it happens:</strong>
              </p>

              <ul className="space-y-2 ml-6">
                <li className="text-zinc-400">💸 Low account balance at billing time</li>
                <li className="text-zinc-400">📅 Billing date hit before payday</li>
                <li className="text-zinc-400">💳 Credit limit reached</li>
              </ul>

              <p>
                <strong className="text-white">Optimal retry strategy:</strong>
              </p>

              <div className="glass rounded-xl p-6 my-6 bg-zinc-900/50">
                <p className="text-zinc-300 mb-3"><strong className="text-white">Retry schedule:</strong> 2 days → 5 days → 10 days → 15 days</p>
                <p className="text-zinc-300 mb-3"><strong className="text-white">Email customer?</strong> Yes, but gently (don't embarrass them)</p>
                <p className="text-zinc-300 mb-0"><strong className="text-white">Likelihood of recovery:</strong> 60-70% if you wait for payday (usually 1st or 15th)</p>
              </div>

              <p>
                <strong className="text-white">What to tell the customer:</strong> "We had trouble processing your payment. We'll automatically retry in a few days, or you can update your payment method now."
              </p>

              <div className="glass rounded-xl p-6 my-6 border-l-4 border-yellow-500">
                <p className="text-sm text-zinc-400 mb-2 font-medium uppercase tracking-wide">Pro Tip</p>
                <p className="text-zinc-300 mb-0">
                  Time your retries around common paydays (1st, 15th, last day of month). This can increase recovery rates by 20-30%.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                3. <code className="text-brand-400 bg-zinc-800 px-2 py-1 rounded">expired_card</code> — Card Expired
              </h3>

              <p>
                <strong className="text-white">What it means:</strong> The card on file has passed its expiration date.
              </p>

              <p>
                <strong className="text-white">Why it happens:</strong>
              </p>

              <ul className="space-y-2 ml-6">
                <li className="text-zinc-400">📅 Customer didn't update their card info after receiving a new one</li>
                <li className="text-zinc-400">💳 20-40% of cards expire annually — this is extremely common</li>
              </ul>

              <p>
                <strong className="text-white">Optimal retry strategy:</strong>
              </p>

              <div className="glass rounded-xl p-6 my-6 bg-zinc-900/50">
                <p className="text-zinc-300 mb-3"><strong className="text-white">Retry schedule:</strong> <span className="text-red-400">Don't retry</span> — it will fail every time</p>
                <p className="text-zinc-300 mb-3"><strong className="text-white">Email customer?</strong> <span className="text-green-400">Yes, immediately</span> with a card update link</p>
                <p className="text-zinc-300 mb-0"><strong className="text-white">Likelihood of recovery:</strong> 70-80% if you email within 24 hours</p>
              </div>

              <p>
                <strong className="text-white">What to tell the customer:</strong> "Your card ending in [last 4] expired on [date]. Update your payment method to keep your subscription active."
              </p>

              <p>
                <strong className="text-white">Prevention:</strong> Enable <strong className="text-white">Stripe's Card Account Updater</strong> to automatically refresh expired cards (reduces expired card failures by 30-40%).
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                4. <code className="text-brand-400 bg-zinc-800 px-2 py-1 rounded">lost_card</code> / <code className="text-brand-400 bg-zinc-800 px-2 py-1 rounded">stolen_card</code> — Card Reported Lost or Stolen
              </h3>

              <p>
                <strong className="text-white">What it means:</strong> The cardholder reported the card as lost or stolen to their bank.
              </p>

              <p>
                <strong className="text-white">Why it happens:</strong>
              </p>

              <ul className="space-y-2 ml-6">
                <li className="text-zinc-400">🚨 Card was genuinely lost or stolen</li>
                <li className="text-zinc-400">💳 Customer got a new card and deactivated the old one</li>
              </ul>

              <p>
                <strong className="text-white">Optimal retry strategy:</strong>
              </p>

              <div className="glass rounded-xl p-6 my-6 bg-zinc-900/50">
                <p className="text-zinc-300 mb-3"><strong className="text-white">Retry schedule:</strong> <span className="text-red-400">Never retry</span> — this will trigger fraud alerts</p>
                <p className="text-zinc-300 mb-3"><strong className="text-white">Email customer?</strong> <span className="text-green-400">Yes, immediately</span></p>
                <p className="text-zinc-300 mb-0"><strong className="text-white">Likelihood of recovery:</strong> 60-65% if customer receives new card</p>
              </div>

              <p>
                <strong className="text-white">What to tell the customer:</strong> "We can't process payments with the card ending in [last 4]. Please add your new card to keep your account active."
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                5. <code className="text-brand-400 bg-zinc-800 px-2 py-1 rounded">do_not_honor</code> — Bank Refused (No Specific Reason)
              </h3>

              <p>
                <strong className="text-white">What it means:</strong> The bank declined the transaction but didn't provide a specific reason. Often related to suspected fraud.
              </p>

              <p>
                <strong className="text-white">Why it happens:</strong>
              </p>

              <ul className="space-y-2 ml-6">
                <li className="text-zinc-400">🚨 Fraud detection system flagged the transaction</li>
                <li className="text-zinc-400">🌍 Unusual purchase pattern (e.g., international charge)</li>
                <li className="text-zinc-400">🔒 Bank's internal risk rules</li>
              </ul>

              <p>
                <strong className="text-white">Optimal retry strategy:</strong>
              </p>

              <div className="glass rounded-xl p-6 my-6 bg-zinc-900/50">
                <p className="text-zinc-300 mb-3"><strong className="text-white">Retry schedule:</strong> 1 day → 3 days → 7 days</p>
                <p className="text-zinc-300 mb-3"><strong className="text-white">Email customer?</strong> Yes, ask them to contact their bank</p>
                <p className="text-zinc-300 mb-0"><strong className="text-white">Likelihood of recovery:</strong> 30-40% (often requires customer to call bank)</p>
              </div>

              <p>
                <strong className="text-white">What to tell the customer:</strong> "Your bank declined the charge for security reasons. Please contact your bank to authorize the payment, or use a different card."
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                6. <code className="text-brand-400 bg-zinc-800 px-2 py-1 rounded">incorrect_cvc</code> — Wrong CVV Code
              </h3>

              <p>
                <strong className="text-white">What it means:</strong> The CVV (card security code) provided doesn't match the card.
              </p>

              <p>
                <strong className="text-white">Why it happens:</strong>
              </p>

              <ul className="space-y-2 ml-6">
                <li className="text-zinc-400">🔢 Customer typo when entering CVV</li>
                <li className="text-zinc-400">💳 Using a saved card with incorrect CVV on file</li>
              </ul>

              <p>
                <strong className="text-white">Optimal retry strategy:</strong>
              </p>

              <div className="glass rounded-xl p-6 my-6 bg-zinc-900/50">
                <p className="text-zinc-300 mb-3"><strong className="text-white">Retry schedule:</strong> <span className="text-red-400">Don't retry</span> — same CVV will fail again</p>
                <p className="text-zinc-300 mb-3"><strong className="text-white">Email customer?</strong> Yes, ask them to re-enter card details</p>
                <p className="text-zinc-300 mb-0"><strong className="text-white">Likelihood of recovery:</strong> 80-85% if they re-enter correctly</p>
              </div>

              <p>
                <strong className="text-white">What to tell the customer:</strong> "We couldn't verify your card's security code (CVV). Please re-enter your card details."
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                7. <code className="text-brand-400 bg-zinc-800 px-2 py-1 rounded">processing_error</code> — Temporary Technical Issue
              </h3>

              <p>
                <strong className="text-white">What it means:</strong> A temporary error occurred while processing the payment (usually on Stripe's or the bank's side).
              </p>

              <p>
                <strong className="text-white">Why it happens:</strong>
              </p>

              <ul className="space-y-2 ml-6">
                <li className="text-zinc-400">⚡ Network timeout or connectivity issue</li>
                <li className="text-zinc-400">🏦 Bank's payment system temporarily down</li>
                <li className="text-zinc-400">🔧 Rare Stripe infrastructure issue</li>
              </ul>

              <p>
                <strong className="text-white">Optimal retry strategy:</strong>
              </p>

              <div className="glass rounded-xl p-6 my-6 bg-zinc-900/50">
                <p className="text-zinc-300 mb-3"><strong className="text-white">Retry schedule:</strong> 1 hour → 6 hours → 24 hours</p>
                <p className="text-zinc-300 mb-3"><strong className="text-white">Email customer?</strong> Only if retries fail after 24h</p>
                <p className="text-zinc-300 mb-0"><strong className="text-white">Likelihood of recovery:</strong> 85-90% (usually resolves on its own)</p>
              </div>

              <p>
                <strong className="text-white">What to tell the customer:</strong> "We had a temporary technical issue processing your payment. We'll retry automatically — no action needed."
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                8. <code className="text-brand-400 bg-zinc-800 px-2 py-1 rounded">incorrect_number</code> — Invalid Card Number
              </h3>

              <p>
                <strong className="text-white">What it means:</strong> The card number provided is invalid or doesn't exist.
              </p>

              <p>
                <strong className="text-white">Why it happens:</strong>
              </p>

              <ul className="space-y-2 ml-6">
                <li className="text-zinc-400">🔢 Typo when entering card number</li>
                <li className="text-zinc-400">💳 Fake or test card number used</li>
              </ul>

              <p>
                <strong className="text-white">Optimal retry strategy:</strong>
              </p>

              <div className="glass rounded-xl p-6 my-6 bg-zinc-900/50">
                <p className="text-zinc-300 mb-3"><strong className="text-white">Retry schedule:</strong> <span className="text-red-400">Never retry</span></p>
                <p className="text-zinc-300 mb-3"><strong className="text-white">Email customer?</strong> Yes, immediately</p>
                <p className="text-zinc-300 mb-0"><strong className="text-white">Likelihood of recovery:</strong> 75-80% if customer corrects the typo</p>
              </div>

              <p>
                <strong className="text-white">What to tell the customer:</strong> "The card number you provided appears to be incorrect. Please double-check and re-enter your card details."
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                9. <code className="text-brand-400 bg-zinc-800 px-2 py-1 rounded">card_velocity_exceeded</code> — Too Many Charges Too Fast
              </h3>

              <p>
                <strong className="text-white">What it means:</strong> The card has been used too many times in a short period, triggering velocity limits.
              </p>

              <p>
                <strong className="text-white">Why it happens:</strong>
              </p>

              <ul className="space-y-2 ml-6">
                <li className="text-zinc-400">🚨 Anti-fraud mechanism (too many charges in 24h)</li>
                <li className="text-zinc-400">🔁 Multiple retry attempts in quick succession</li>
              </ul>

              <p>
                <strong className="text-white">Optimal retry strategy:</strong>
              </p>

              <div className="glass rounded-xl p-6 my-6 bg-zinc-900/50">
                <p className="text-zinc-300 mb-3"><strong className="text-white">Retry schedule:</strong> Wait 24-48 hours, then retry once</p>
                <p className="text-zinc-300 mb-3"><strong className="text-white">Email customer?</strong> Yes, explain the situation</p>
                <p className="text-zinc-300 mb-0"><strong className="text-white">Likelihood of recovery:</strong> 50-60% after waiting period</p>
              </div>

              <p>
                <strong className="text-white">What to tell the customer:</strong> "Your bank flagged this charge due to multiple recent transactions. We'll retry in 24 hours, or you can use a different payment method."
              </p>

              <div className="glass rounded-xl p-6 my-6 border-l-4 border-red-500">
                <p className="text-sm text-zinc-400 mb-2 font-medium uppercase tracking-wide">Warning</p>
                <p className="text-zinc-300 mb-0">
                  Don't retry velocity errors immediately — you'll trigger further blocks. Wait at least 24 hours.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                10. <code className="text-brand-400 bg-zinc-800 px-2 py-1 rounded">fraudulent</code> / <code className="text-brand-400 bg-zinc-800 px-2 py-1 rounded">card_not_supported</code> — Fraud Block
              </h3>

              <p>
                <strong className="text-white">What it means:</strong> Stripe's fraud detection system (Stripe Radar) blocked the charge as potentially fraudulent.
              </p>

              <p>
                <strong className="text-white">Why it happens:</strong>
              </p>

              <ul className="space-y-2 ml-6">
                <li className="text-zinc-400">🚨 High-risk transaction pattern</li>
                <li className="text-zinc-400">🌍 Mismatch between card country and IP address</li>
                <li className="text-zinc-400">💳 Card linked to previous fraudulent activity</li>
              </ul>

              <p>
                <strong className="text-white">Optimal retry strategy:</strong>
              </p>

              <div className="glass rounded-xl p-6 my-6 bg-zinc-900/50">
                <p className="text-zinc-300 mb-3"><strong className="text-white">Retry schedule:</strong> <span className="text-red-400">Never retry</span> — fraud blocks are permanent</p>
                <p className="text-zinc-300 mb-3"><strong className="text-white">Email customer?</strong> Yes, ask for identity verification or alternative payment</p>
                <p className="text-zinc-300 mb-0"><strong className="text-white">Likelihood of recovery:</strong> 20-30% (requires manual review)</p>
              </div>

              <p>
                <strong className="text-white">What to tell the customer:</strong> "This transaction was flagged for security reasons. Please contact us to verify your identity or use a different payment method."
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Quick Reference: Stripe Decline Codes Cheat Sheet
              </h2>

              <div className="glass rounded-xl p-6 my-8 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-800">
                      <th className="text-left py-3 text-zinc-400 font-medium">Code</th>
                      <th className="text-left py-3 text-zinc-400 font-medium">Should You Retry?</th>
                      <th className="text-left py-3 text-zinc-400 font-medium">Recovery Rate</th>
                    </tr>
                  </thead>
                  <tbody className="text-zinc-300">
                    <tr className="border-b border-zinc-800/50">
                      <td className="py-3"><code className="text-brand-400">card_declined</code></td>
                      <td className="py-3 text-yellow-400">Yes (4h → 1d → 3d → 7d)</td>
                      <td className="py-3">45-50%</td>
                    </tr>
                    <tr className="border-b border-zinc-800/50">
                      <td className="py-3"><code className="text-brand-400">insufficient_funds</code></td>
                      <td className="py-3 text-yellow-400">Yes (2d → 5d → 10d)</td>
                      <td className="py-3">60-70%</td>
                    </tr>
                    <tr className="border-b border-zinc-800/50">
                      <td className="py-3"><code className="text-brand-400">expired_card</code></td>
                      <td className="py-3 text-red-400">No — email customer</td>
                      <td className="py-3">70-80%</td>
                    </tr>
                    <tr className="border-b border-zinc-800/50">
                      <td className="py-3"><code className="text-brand-400">lost_card</code></td>
                      <td className="py-3 text-red-400">No — email customer</td>
                      <td className="py-3">60-65%</td>
                    </tr>
                    <tr className="border-b border-zinc-800/50">
                      <td className="py-3"><code className="text-brand-400">do_not_honor</code></td>
                      <td className="py-3 text-yellow-400">Yes (1d → 3d → 7d)</td>
                      <td className="py-3">30-40%</td>
                    </tr>
                    <tr className="border-b border-zinc-800/50">
                      <td className="py-3"><code className="text-brand-400">incorrect_cvc</code></td>
                      <td className="py-3 text-red-400">No — email customer</td>
                      <td className="py-3">80-85%</td>
                    </tr>
                    <tr className="border-b border-zinc-800/50">
                      <td className="py-3"><code className="text-brand-400">processing_error</code></td>
                      <td className="py-3 text-green-400">Yes (1h → 6h → 24h)</td>
                      <td className="py-3">85-90%</td>
                    </tr>
                    <tr className="border-b border-zinc-800/50">
                      <td className="py-3"><code className="text-brand-400">incorrect_number</code></td>
                      <td className="py-3 text-red-400">No — email customer</td>
                      <td className="py-3">75-80%</td>
                    </tr>
                    <tr className="border-b border-zinc-800/50">
                      <td className="py-3"><code className="text-brand-400">card_velocity_exceeded</code></td>
                      <td className="py-3 text-yellow-400">Wait 24h, then retry once</td>
                      <td className="py-3">50-60%</td>
                    </tr>
                    <tr>
                      <td className="py-3"><code className="text-brand-400">fraudulent</code></td>
                      <td className="py-3 text-red-400">No — manual review</td>
                      <td className="py-3">20-30%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                How to Implement Smart Retry Logic Based on Decline Codes
              </h2>

              <p>
                Now that you know what each code means, here's how to build (or choose) a retry system that adapts to decline codes:
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                Option 1: Build Custom Retry Logic (Developer Route)
              </h3>

              <p>
                Use Stripe webhooks to listen for <code className="text-brand-400 bg-zinc-800 px-2 py-0.5 rounded">charge.failed</code> events:
              </p>

              <div className="glass rounded-xl p-6 my-6 bg-zinc-900">
                <pre className="text-xs text-zinc-300 overflow-x-auto"><code>{`// Example webhook handler (Node.js)
stripe.webhooks.constructEvent(request.body, sig, webhookSecret);

if (event.type === 'charge.failed') {
  const charge = event.data.object;
  const declineCode = charge.outcome?.decline_code;
  
  // Route to appropriate retry strategy
  if (declineCode === 'insufficient_funds') {
    scheduleRetry(charge.id, { days: 2 });
  } else if (declineCode === 'expired_card') {
    sendDunningEmail(customer, 'expired_card');
  } else if (declineCode === 'processing_error') {
    scheduleRetry(charge.id, { hours: 1 });
  }
  // ... handle other codes
}`}</code></pre>
              </div>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                Option 2: Use a Payment Recovery Tool (No-Code Route)
              </h3>

              <p>
                Tools like <strong className="text-white">Revive</strong> automatically handle decline-code-specific retry logic without any code:
              </p>

              <ul className="space-y-2 ml-6">
                <li className="text-zinc-400">✅ Reads Stripe decline codes automatically</li>
                <li className="text-zinc-400">✅ Schedules retries based on best practices for each code</li>
                <li className="text-zinc-400">✅ Sends personalized dunning emails matching the decline reason</li>
                <li className="text-zinc-400">✅ Shows recovery metrics by decline code type</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Advanced: Less Common Decline Codes
              </h2>

              <p>
                Here are a few more decline codes you might encounter:
              </p>

              <ul className="space-y-3 ml-6 text-zinc-300">
                <li>
                  <code className="text-brand-400 bg-zinc-800 px-2 py-0.5 rounded">generic_decline</code> — Similar to <code className="text-brand-400 bg-zinc-800 px-2 py-0.5 rounded">card_declined</code>, no specific reason given
                </li>
                <li>
                  <code className="text-brand-400 bg-zinc-800 px-2 py-0.5 rounded">call_issuer</code> — Bank wants cardholder to call them (often fraud-related)
                </li>
                <li>
                  <code className="text-brand-400 bg-zinc-800 px-2 py-0.5 rounded">pickup_card</code> — Bank wants to physically retrieve the card (rare, serious fraud indicator)
                </li>
                <li>
                  <code className="text-brand-400 bg-zinc-800 px-2 py-0.5 rounded">restricted_card</code> — Card is restricted by the bank (e.g., region-locked)
                </li>
                <li>
                  <code className="text-brand-400 bg-zinc-800 px-2 py-0.5 rounded">currency_not_supported</code> — Card doesn't support the charge currency
                </li>
                <li>
                  <code className="text-brand-400 bg-zinc-800 px-2 py-0.5 rounded">duplicate_transaction</code> — Identical transaction attempted twice in short window
                </li>
              </ul>

              <p className="mt-6">
                For a complete list, see <a href="https://stripe.com/docs/declines/codes" target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:text-brand-300 underline">Stripe's official decline codes documentation</a>.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Best Practices for Handling Stripe Declines
              </h2>

              <ol className="space-y-3 ml-6 text-zinc-300">
                <li>
                  <strong className="text-white">1. Log every decline code</strong> — Track which codes you see most often to identify patterns (e.g., if 50% are expired cards, prioritize Card Account Updater)
                </li>
                <li>
                  <strong className="text-white">2. Don't retry indiscriminately</strong> — Retrying expired cards wastes resources and annoys banks
                </li>
                <li>
                  <strong className="text-white">3. Customize dunning emails per decline reason</strong> — An email about an expired card should look different than one about insufficient funds
                </li>
                <li>
                  <strong className="text-white">4. Monitor retry success rates by code</strong> — If <code className="text-brand-400 bg-zinc-800 px-2 py-0.5 rounded">insufficient_funds</code> retries aren't working, adjust timing
                </li>
                <li>
                  <strong className="text-white">5. Offer backup payment methods</strong> — When a card fails repeatedly, let customers add ACH, PayPal, or other options
                </li>
              </ol>

              <div className="glass rounded-xl p-8 my-12 text-center border-l-4 border-brand-500">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Automate Decline Code Handling
                </h3>
                <p className="text-zinc-400 mb-6">
                  Revive automatically reads Stripe decline codes and applies the optimal retry strategy for each failure type — no code required. Connect your Stripe account and start recovering more payments in 3 minutes.
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
                <li>💡 Not all payment failures are equal — each Stripe decline code requires a different strategy</li>
                <li>💡 Expired cards, lost cards, and incorrect CVVs should NOT be retried — email the customer immediately</li>
                <li>💡 Insufficient funds failures recover best when retried around payday (1st, 15th, end of month)</li>
                <li>💡 Processing errors usually resolve on their own — retry quickly (1h → 6h → 24h)</li>
                <li>💡 Generic declines (<code className="text-brand-400 bg-zinc-800 px-2 py-0.5 rounded">card_declined</code>) benefit from spaced-out retries (4h → 1d → 3d → 7d)</li>
                <li>💡 Track which decline codes are most common to optimize your prevention and recovery strategies</li>
              </ul>

              <p className="mt-8">
                The bottom line: <strong className="text-white">Smart retry logic based on decline codes can increase your payment recovery rate by 40-60%</strong>. Stop treating all failed payments the same — adapt your strategy to the specific reason each one failed.
              </p>

              <div className="mt-12 pt-8 border-t border-zinc-800">
                <p className="text-sm text-zinc-500">
                  <strong className="text-zinc-400">About Revive:</strong> We automatically handle Stripe decline codes with optimized retry schedules and personalized dunning emails. Connect your Stripe account in one click and start recovering more failed payments today.
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
