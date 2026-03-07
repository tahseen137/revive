import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Stripe Decline Code Guide: What Each Error Means + How to Fix It (2026)",
  description:
    "Complete guide to Stripe decline codes — insufficient_funds, card_declined, do_not_honor, expired_card and 11 more. What each means, retry strategy, and when to stop trying.",
  keywords: [
    "stripe decline codes",
    "stripe decline code guide",
    "stripe card declined",
    "insufficient_funds stripe",
    "do_not_honor stripe",
    "stripe payment failed",
    "stripe error codes list",
    "stripe decline code retry strategy",
  ],
  openGraph: {
    title: "Stripe Decline Code Guide: What Each Error Means + How to Fix It",
    description:
      "15 Stripe decline codes decoded — what they mean, optimal retry timing, and when to stop trying.",
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
              <span className="text-sm text-zinc-500">March 7, 2026</span>
              <span className="text-zinc-600">·</span>
              <span className="text-sm text-zinc-500">12 min read</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
              Stripe Decline Code Guide: What Each Error Means + How to Fix It
            </h1>

            <p className="text-xl text-zinc-400 leading-relaxed">
              When Stripe declines a payment, you get a specific code. Most founders ignore these codes and lose recoverable revenue. This guide covers the top 15 Stripe decline codes, what they actually mean, retry strategies for each, and when to stop trying.
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-zinc max-w-none">
            <div className="text-zinc-300 space-y-6 leading-relaxed">

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Why Stripe Decline Codes Matter
              </h2>

              <p>
                Involuntary churn — customers lost because of payment failures, not because they wanted to leave — accounts for <strong className="text-white">20–40% of all SaaS churn</strong>. Most of these failures are recoverable if you know what each decline code means and how to respond to it.
              </p>

              <p>
                The problem: most SaaS founders treat every failed payment identically. They send the same dunning email, retry on the same schedule, and give up after the same number of attempts — regardless of the decline code. That's leaving money on the table.
              </p>

              <p>
                Different codes need different strategies. Here's the complete playbook.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Soft Declines vs. Hard Declines: The Critical Distinction
              </h2>

              <p>
                Before diving into specific codes, understand this fundamental split:
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-white">Soft declines</strong> — temporary failures. The transaction might succeed if you retry later. Examples: <code className="bg-zinc-800 px-1 rounded text-sm">insufficient_funds</code>, <code className="bg-zinc-800 px-1 rounded text-sm">try_again_later</code>.</li>
                <li><strong className="text-white">Hard declines</strong> — permanent failures. No amount of retrying will work. Examples: <code className="bg-zinc-800 px-1 rounded text-sm">stolen_card</code>, <code className="bg-zinc-800 px-1 rounded text-sm">incorrect_number</code>. These require customer action.</li>
              </ul>

              <p>
                Retrying a hard decline wastes time and can hurt your reputation with card networks. Giving up on a soft decline loses you revenue. Know the difference.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                The Top 15 Stripe Decline Codes
              </h2>

              {/* Code 1 */}
              <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-6 my-6">
                <div className="flex items-center gap-3 mb-3">
                  <code className="text-brand-400 font-mono text-base font-bold">insufficient_funds</code>
                  <span className="px-2 py-0.5 rounded text-xs bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">Soft Decline</span>
                </div>
                <p className="text-zinc-300 mb-3"><strong className="text-white">What it means:</strong> The customer doesn't have enough money in their account right now.</p>
                <p className="text-zinc-300 mb-3"><strong className="text-white">Recovery rate:</strong> 35–45% with smart retry timing.</p>
                <p className="text-zinc-300 mb-3"><strong className="text-white">Retry strategy:</strong> Retry on paydays — the 1st and 15th of the month, or Fridays. Most people get paid on a cycle. If they declined on the 28th, retry on the 1st. Don't retry the next day.</p>
                <p className="text-zinc-300"><strong className="text-white">When to stop:</strong> After 4 attempts over 21 days. Then send a card-update email.</p>
              </div>

              {/* Code 2 */}
              <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-6 my-6">
                <div className="flex items-center gap-3 mb-3">
                  <code className="text-brand-400 font-mono text-base font-bold">card_declined</code>
                  <span className="px-2 py-0.5 rounded text-xs bg-orange-500/10 text-orange-400 border border-orange-500/20">Soft/Hard Mix</span>
                </div>
                <p className="text-zinc-300 mb-3"><strong className="text-white">What it means:</strong> Generic decline from the issuer with no specific reason given.</p>
                <p className="text-zinc-300 mb-3"><strong className="text-white">Recovery rate:</strong> 20–30% on retry.</p>
                <p className="text-zinc-300 mb-3"><strong className="text-white">Retry strategy:</strong> Retry once after 24 hours, then again after 72 hours. If still failing, send a customer email asking them to contact their bank or use a different card.</p>
                <p className="text-zinc-300"><strong className="text-white">When to stop:</strong> After 3 attempts. Hard decline if the pattern continues.</p>
              </div>

              {/* Code 3 */}
              <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-6 my-6">
                <div className="flex items-center gap-3 mb-3">
                  <code className="text-brand-400 font-mono text-base font-bold">do_not_honor</code>
                  <span className="px-2 py-0.5 rounded text-xs bg-orange-500/10 text-orange-400 border border-orange-500/20">Soft/Hard Mix</span>
                </div>
                <p className="text-zinc-300 mb-3"><strong className="text-white">What it means:</strong> The bank is blocking the transaction without telling you why. Could be fraud protection, spending limits, or a block on subscription charges from that issuer.</p>
                <p className="text-zinc-300 mb-3"><strong className="text-white">Recovery rate:</strong> 15–25% on retry, 40–50% if customer calls their bank.</p>
                <p className="text-zinc-300 mb-3"><strong className="text-white">Retry strategy:</strong> One retry after 24–48 hours. If it fails again, send an email explaining the customer should call their bank to authorize the charge from your merchant name.</p>
                <p className="text-zinc-300"><strong className="text-white">When to stop:</strong> After 2 retries. Focus on getting the customer to update their card.</p>
              </div>

              {/* Code 4 */}
              <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-6 my-6">
                <div className="flex items-center gap-3 mb-3">
                  <code className="text-brand-400 font-mono text-base font-bold">expired_card</code>
                  <span className="px-2 py-0.5 rounded text-xs bg-red-500/10 text-red-400 border border-red-500/20">Hard Decline</span>
                </div>
                <p className="text-zinc-300 mb-3"><strong className="text-white">What it means:</strong> The card is past its expiration date.</p>
                <p className="text-zinc-300 mb-3"><strong className="text-white">Recovery rate:</strong> 60–70% if you prompt the customer to update. Stripe's Card Account Updater automatically resolves this for ~30% of cases before you even know about it.</p>
                <p className="text-zinc-300 mb-3"><strong className="text-white">Retry strategy:</strong> Don't retry — it won't work. Instead: (1) check if Stripe's Card Account Updater has already updated the card automatically. (2) If not, send an immediate card-update email with a direct link to your Stripe Customer Portal.</p>
                <p className="text-zinc-300"><strong className="text-white">When to stop:</strong> N/A — no retries. Only customer action can fix this.</p>
              </div>

              {/* Code 5 */}
              <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-6 my-6">
                <div className="flex items-center gap-3 mb-3">
                  <code className="text-brand-400 font-mono text-base font-bold">authentication_required</code>
                  <span className="px-2 py-0.5 rounded text-xs bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">Soft Decline</span>
                </div>
                <p className="text-zinc-300 mb-3"><strong className="text-white">What it means:</strong> The bank requires 3D Secure (3DS) authentication. Common with European cards due to PSD2/SCA regulations.</p>
                <p className="text-zinc-300 mb-3"><strong className="text-white">Recovery rate:</strong> 70–80% if you redirect the user to complete 3DS.</p>
                <p className="text-zinc-300 mb-3"><strong className="text-white">Retry strategy:</strong> Never retry blindly — it'll fail again. Instead, send the customer a link to Stripe's Hosted Invoice Page which handles the 3DS flow automatically. This is the cleanest solution.</p>
                <p className="text-zinc-300"><strong className="text-white">When to stop:</strong> After 14 days without 3DS completion. Move to card-update request.</p>
              </div>

              {/* Code 6 */}
              <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-6 my-6">
                <div className="flex items-center gap-3 mb-3">
                  <code className="text-brand-400 font-mono text-base font-bold">fraudulent</code>
                  <span className="px-2 py-0.5 rounded text-xs bg-red-500/10 text-red-400 border border-red-500/20">Hard Decline</span>
                </div>
                <p className="text-zinc-300 mb-3"><strong className="text-white">What it means:</strong> The transaction was flagged as potentially fraudulent by the issuer.</p>
                <p className="text-zinc-300 mb-3"><strong className="text-white">Recovery rate:</strong> Near zero on retry. Retrying can damage your standing with card networks.</p>
                <p className="text-zinc-300 mb-3"><strong className="text-white">Retry strategy:</strong> Do NOT retry. Send the customer a sensitive email asking them to provide a new payment method. Don't accuse them of fraud — just say the card can't be used.</p>
                <p className="text-zinc-300"><strong className="text-white">When to stop:</strong> Immediately. Zero retries.</p>
              </div>

              {/* Code 7 */}
              <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-6 my-6">
                <div className="flex items-center gap-3 mb-3">
                  <code className="text-brand-400 font-mono text-base font-bold">lost_card</code>
                  <span className="px-2 py-0.5 rounded text-xs bg-red-500/10 text-red-400 border border-red-500/20">Hard Decline</span>
                </div>
                <p className="text-zinc-300 mb-3"><strong className="text-white">What it means:</strong> The customer reported the card lost. The bank has disabled it.</p>
                <p className="text-zinc-300 mb-3"><strong className="text-white">Retry strategy:</strong> Zero retries. Send a card-update email. The customer likely already knows their card is lost and has a replacement.</p>
                <p className="text-zinc-300"><strong className="text-white">When to stop:</strong> Immediately.</p>
              </div>

              {/* Code 8 */}
              <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-6 my-6">
                <div className="flex items-center gap-3 mb-3">
                  <code className="text-brand-400 font-mono text-base font-mono text-base font-bold">stolen_card</code>
                  <span className="px-2 py-0.5 rounded text-xs bg-red-500/10 text-red-400 border border-red-500/20">Hard Decline</span>
                </div>
                <p className="text-zinc-300 mb-3"><strong className="text-white">What it means:</strong> The card was reported stolen. Completely disabled.</p>
                <p className="text-zinc-300 mb-3"><strong className="text-white">Retry strategy:</strong> Zero retries. Same as lost_card — the customer needs a new card. Send a gentle card-update request.</p>
                <p className="text-zinc-300"><strong className="text-white">When to stop:</strong> Immediately.</p>
              </div>

              {/* Code 9 */}
              <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-6 my-6">
                <div className="flex items-center gap-3 mb-3">
                  <code className="text-brand-400 font-mono text-base font-bold">processing_error</code>
                  <span className="px-2 py-0.5 rounded text-xs bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">Soft Decline</span>
                </div>
                <p className="text-zinc-300 mb-3"><strong className="text-white">What it means:</strong> A technical error occurred during processing — not the customer's fault. Could be a network glitch or temporary issue with the issuer's systems.</p>
                <p className="text-zinc-300 mb-3"><strong className="text-white">Recovery rate:</strong> 50–65% on retry within a few hours.</p>
                <p className="text-zinc-300 mb-3"><strong className="text-white">Retry strategy:</strong> Retry within 2–4 hours. If that fails, retry again the next day. Don't email the customer unless retries fail — this is a system issue, not their problem.</p>
                <p className="text-zinc-300"><strong className="text-white">When to stop:</strong> After 3 attempts over 48 hours. Then send a soft customer notification.</p>
              </div>

              {/* Code 10 */}
              <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-6 my-6">
                <div className="flex items-center gap-3 mb-3">
                  <code className="text-brand-400 font-mono text-base font-bold">transaction_not_allowed</code>
                  <span className="px-2 py-0.5 rounded text-xs bg-orange-500/10 text-orange-400 border border-orange-500/20">Soft/Hard Mix</span>
                </div>
                <p className="text-zinc-300 mb-3"><strong className="text-white">What it means:</strong> The issuer has blocked this type of transaction specifically — common with corporate cards that have spending controls (e.g., "no subscription charges") or cross-border restrictions.</p>
                <p className="text-zinc-300 mb-3"><strong className="text-white">Retry strategy:</strong> Don't retry. Email the customer asking them to call their bank and whitelist your merchant name for subscription charges, or to use a personal card instead of a corporate card.</p>
                <p className="text-zinc-300"><strong className="text-white">When to stop:</strong> After the first failure. Retries waste time here.</p>
              </div>

              {/* Code 11 */}
              <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-6 my-6">
                <div className="flex items-center gap-3 mb-3">
                  <code className="text-brand-400 font-mono text-base font-bold">card_velocity_exceeded</code>
                  <span className="px-2 py-0.5 rounded text-xs bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">Soft Decline</span>
                </div>
                <p className="text-zinc-300 mb-3"><strong className="text-white">What it means:</strong> Too many transactions on this card in a short period. The issuer has flagged it as potentially unusual spending.</p>
                <p className="text-zinc-300 mb-3"><strong className="text-white">Retry strategy:</strong> Wait 24–48 hours before retrying. The velocity limit typically resets daily.</p>
                <p className="text-zinc-300"><strong className="text-white">When to stop:</strong> After 2 retries. If still failing, ask the customer to contact their bank.</p>
              </div>

              {/* Code 12 */}
              <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-6 my-6">
                <div className="flex items-center gap-3 mb-3">
                  <code className="text-brand-400 font-mono text-base font-bold">duplicate_transaction</code>
                  <span className="px-2 py-0.5 rounded text-xs bg-red-500/10 text-red-400 border border-red-500/20">Hard Decline</span>
                </div>
                <p className="text-zinc-300 mb-3"><strong className="text-white">What it means:</strong> Stripe detected a duplicate charge attempt (same amount, same card, very short window). This is almost always a bug in your code — not the customer's fault.</p>
                <p className="text-zinc-300 mb-3"><strong className="text-white">Retry strategy:</strong> Don't retry. Fix the bug. Check if you're triggering multiple PaymentIntent calls, or if a user double-clicked your checkout button.</p>
                <p className="text-zinc-300"><strong className="text-white">When to stop:</strong> Immediately. Debug your checkout flow.</p>
              </div>

              {/* Code 13 */}
              <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-6 my-6">
                <div className="flex items-center gap-3 mb-3">
                  <code className="text-brand-400 font-mono text-base font-bold">pickup_card</code>
                  <span className="px-2 py-0.5 rounded text-xs bg-red-500/10 text-red-400 border border-red-500/20">Hard Decline</span>
                </div>
                <p className="text-zinc-300 mb-3"><strong className="text-white">What it means:</strong> The card has been flagged by the bank for unusual activity or the account is closed. The bank wants the physical card back (in-person context), or in online context — it's dead.</p>
                <p className="text-zinc-300 mb-3"><strong className="text-white">Retry strategy:</strong> Zero retries. Treat like stolen_card. Send card-update request.</p>
                <p className="text-zinc-300"><strong className="text-white">When to stop:</strong> Immediately.</p>
              </div>

              {/* Code 14 */}
              <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-6 my-6">
                <div className="flex items-center gap-3 mb-3">
                  <code className="text-brand-400 font-mono text-base font-bold">try_again_later</code>
                  <span className="px-2 py-0.5 rounded text-xs bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">Soft Decline</span>
                </div>
                <p className="text-zinc-300 mb-3"><strong className="text-white">What it means:</strong> The issuer is temporarily unavailable or has a system issue. Try again.</p>
                <p className="text-zinc-300 mb-3"><strong className="text-white">Recovery rate:</strong> 55–65% on retry after a few hours.</p>
                <p className="text-zinc-300 mb-3"><strong className="text-white">Retry strategy:</strong> Retry after 2–6 hours. Don't email the customer — this isn't their problem. If still failing after 24 hours, treat as processing_error.</p>
                <p className="text-zinc-300"><strong className="text-white">When to stop:</strong> After 3 attempts over 72 hours.</p>
              </div>

              {/* Code 15 */}
              <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-6 my-6">
                <div className="flex items-center gap-3 mb-3">
                  <code className="text-brand-400 font-mono text-base font-bold">incorrect_cvc</code>
                  <span className="px-2 py-0.5 rounded text-xs bg-red-500/10 text-red-400 border border-red-500/20">Hard Decline</span>
                </div>
                <p className="text-zinc-300 mb-3"><strong className="text-white">What it means:</strong> The CVC/CVV code entered doesn't match what the bank has on file. This is rare for subscription charges (which don't re-verify CVC), but appears during initial card setup.</p>
                <p className="text-zinc-300 mb-3"><strong className="text-white">Retry strategy:</strong> Zero retries. The customer needs to re-enter their card information correctly. Send a card-update email with a link to the Customer Portal.</p>
                <p className="text-zinc-300"><strong className="text-white">When to stop:</strong> Immediately.</p>
              </div>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Quick Reference: Retry Decision Matrix
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-zinc-700">
                      <th className="text-left py-3 pr-4 text-zinc-400 font-medium">Decline Code</th>
                      <th className="text-left py-3 pr-4 text-zinc-400 font-medium">Type</th>
                      <th className="text-left py-3 pr-4 text-zinc-400 font-medium">Auto Retry?</th>
                      <th className="text-left py-3 text-zinc-400 font-medium">Max Attempts</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {[
                      ["insufficient_funds", "Soft", "Yes – payday timing", "4 over 21 days"],
                      ["card_declined", "Mixed", "Yes – 24h wait", "3"],
                      ["do_not_honor", "Mixed", "1 retry only", "2"],
                      ["expired_card", "Hard", "No", "0"],
                      ["authentication_required", "Soft", "No – needs 3DS", "0 (redirect)"],
                      ["fraudulent", "Hard", "No", "0"],
                      ["lost_card", "Hard", "No", "0"],
                      ["stolen_card", "Hard", "No", "0"],
                      ["processing_error", "Soft", "Yes – hours", "3 over 48h"],
                      ["transaction_not_allowed", "Mixed", "No", "0"],
                      ["card_velocity_exceeded", "Soft", "Yes – 24h wait", "2"],
                      ["duplicate_transaction", "Hard", "No – fix bug", "0"],
                      ["pickup_card", "Hard", "No", "0"],
                      ["try_again_later", "Soft", "Yes – hours", "3 over 72h"],
                      ["incorrect_cvc", "Hard", "No", "0"],
                    ].map(([code, type, retry, max]) => (
                      <tr key={code} className="hover:bg-zinc-800/50">
                        <td className="py-3 pr-4"><code className="text-brand-400 text-xs">{code}</code></td>
                        <td className="py-3 pr-4">
                          <span className={`px-2 py-0.5 rounded text-xs ${
                            type === "Soft" ? "bg-yellow-500/10 text-yellow-400" :
                            type === "Hard" ? "bg-red-500/10 text-red-400" :
                            "bg-orange-500/10 text-orange-400"
                          }`}>{type}</span>
                        </td>
                        <td className="py-3 pr-4 text-zinc-300 text-xs">{retry}</td>
                        <td className="py-3 text-zinc-300 text-xs">{max}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                The Webhook Events You Need to Handle
              </h2>

              <p>
                To build a proper decline code recovery engine, listen to these Stripe webhook events:
              </p>

              <pre className="bg-zinc-900 border border-zinc-700 rounded-lg p-4 overflow-x-auto text-sm">
                <code className="text-zinc-300">{`// The events you must handle
invoice.payment_failed         // Primary trigger — get the decline code here
invoice.payment_action_required // 3DS required — send auth link to customer
customer.subscription.updated  // Card updated — clear banners, send thank you
invoice.paid                   // Recovery success — restore full access
customer.subscription.deleted  // Final churn — trigger win-back flow

// Getting the decline code from invoice.payment_failed:
const declineCode = event.data.object.last_payment_error?.decline_code;

switch(declineCode) {
  case 'insufficient_funds':
    scheduleRetry(invoice.id, getNextPaydayDate()); // retry on 1st or 15th
    break;
  case 'authentication_required':
    sendHostedInvoiceLink(customer.email, invoice.hosted_invoice_url);
    break;
  case 'fraudulent':
  case 'lost_card':
  case 'stolen_card':
    sendCardUpdateEmail(customer.email, isUrgent: true);
    break;
  default:
    scheduleRetry(invoice.id, hoursFromNow(48));
}`}</code>
              </pre>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                When to Stop Retrying (And What to Do Instead)
              </h2>

              <p>
                Over-retrying hurts your reputation with card networks. Here are the signals that tell you to stop and pivot to customer communication:
              </p>

              <ul className="list-disc pl-6 space-y-3">
                <li><strong className="text-white">You've hit the max retry count</strong> for that decline code type (see matrix above)</li>
                <li><strong className="text-white">The same hard decline code appears twice</strong> — it won't change on retry</li>
                <li><strong className="text-white">21 days have passed</strong> since the original failure with no recovery</li>
                <li><strong className="text-white">The customer hasn't opened your dunning emails</strong> — they may have churned voluntarily</li>
              </ul>

              <p>
                When you stop retrying, the next step is a grace period + soft lock: keep the account active for 7 more days with a persistent banner, then suspend (don't delete) the account. Suspension is reversible — deletion loses the customer forever.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                How Revive Handles This Automatically
              </h2>

              <p>
                Building and maintaining this retry logic takes time. Every new Stripe update, every edge case, every dunning email sequence has to be kept up to date.
              </p>

              <p>
                <Link href="https://revive-hq.com" className="text-brand-400 hover:text-brand-300 underline">Revive</Link> handles all of this out of the box: decline-code-specific retry scheduling, a 3-step dunning email sequence, payday-aware retry timing for <code className="bg-zinc-800 px-1 rounded text-sm">insufficient_funds</code>, and automatic 3DS redirect flows for <code className="bg-zinc-800 px-1 rounded text-sm">authentication_required</code>.
              </p>

              <p>
                Connect your Stripe account and Revive starts recovering payments automatically. Free up to $500/mo recovered, then 15% of what we recover. You pay nothing if we recover nothing.
              </p>

              <div className="bg-zinc-900 border border-brand-500/30 rounded-lg p-6 my-8 text-center">
                <h3 className="text-xl font-bold text-white mb-3">Stop Losing Revenue to Failed Payments</h3>
                <p className="text-zinc-400 mb-4">Revive uses decline-code-specific retry logic to recover 20–40% more revenue than generic dunning.</p>
                <Link
                  href="https://revive-hq.com"
                  className="inline-block px-6 py-3 bg-brand-500 hover:bg-brand-400 text-white font-semibold rounded-lg transition-colors"
                >
                  Start Recovering Revenue →
                </Link>
              </div>

            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
