"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const faqs = [
  {
    q: "Does Revive get access to my Stripe balance or payouts?",
    a: "No. Revive uses Stripe's OAuth with read-only access to payment and subscription data, plus the ability to trigger payment retries. We cannot transfer funds, modify your payout schedule, or access your bank details.",
  },
  {
    q: "Can I connect multiple Stripe accounts?",
    a: "Yes — each Revive workspace can be connected to one Stripe account. If you manage multiple businesses, create a separate Revive workspace for each Stripe account.",
  },
  {
    q: "What happens to existing failed payments when I first connect?",
    a: "Revive scans your Stripe history and surfaces invoices currently in a failed state. It will not automatically retry old failed payments — you can review and manually trigger retries from the dashboard.",
  },
  {
    q: "Does Revive work with Stripe Connect?",
    a: "Revive works with standard Stripe accounts. Stripe Connect (platform accounts with connected sub-accounts) is on the roadmap. Email support@revive-hq.com if this is a blocker.",
  },
  {
    q: "What if I'm in test mode? Can I try it first?",
    a: "Yes. Connect your Stripe test account first (toggle 'Test mode' in your Stripe dashboard before authorizing). Revive will operate in sandbox mode so you can simulate failures and recoveries risk-free.",
  },
  {
    q: "Can I disconnect Stripe from Revive?",
    a: "Yes. Go to Settings → Integrations → Stripe and click 'Disconnect'. This removes Revive's OAuth token. Active retry schedules will be paused immediately. You can reconnect at any time.",
  },
  {
    q: "Will Revive modify my Stripe subscription or customer data?",
    a: "Revive only retries invoice payments via Stripe's /v1/invoices/:id/pay endpoint. It does not modify customer records, subscription plans, prices, or billing cycles.",
  },
  {
    q: "How does Revive know which payment method to retry?",
    a: "Revive retries using the same default payment method on the customer's Stripe record. If the customer updates their card via Revive's hosted update-card page, Stripe stores the new default and Revive uses it on the next retry.",
  },
  {
    q: "What are the Stripe webhook events Revive requires?",
    a: "Revive registers four events: invoice.payment_failed, invoice.payment_succeeded, customer.subscription.updated, and customer.subscription.deleted. These are automatically configured on connect — you don't need to add them manually.",
  },
  {
    q: "My webhook endpoint shows 'disabled' in Stripe. What do I do?",
    a: "This can happen if Stripe receives consistent 5xx errors from Revive's webhook endpoint. Check Revive's status page (revive-hq.com/status) and contact support if degraded. You can re-enable the webhook manually in Stripe's Developer → Webhooks panel.",
  },
];

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function WarningIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function StepScreenshot({ step, title, description }: { step: number; title: string; description: string }) {
  return (
    <div className="my-6 border border-zinc-800 rounded-2xl overflow-hidden">
      <div className="bg-zinc-900 border-b border-zinc-800 px-5 py-3 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-zinc-700" />
          <div className="w-3 h-3 rounded-full bg-zinc-700" />
          <div className="w-3 h-3 rounded-full bg-zinc-700" />
        </div>
        <span className="text-xs text-zinc-500 font-mono">revive-hq.com</span>
      </div>
      <div className="bg-[#0f0f0f] p-8 flex flex-col items-center justify-center gap-4 min-h-[200px]">
        <div className="h-12 w-12 rounded-full bg-brand-600/10 border border-brand-500/20 flex items-center justify-center">
          <span className="text-brand-400 font-bold text-lg">Step {step}</span>
        </div>
        <div className="text-center max-w-sm">
          <h4 className="font-semibold text-white mb-2">{title}</h4>
          <p className="text-sm text-zinc-400">{description}</p>
        </div>
        <div className="text-xs text-zinc-600 italic">Screenshot: {title}</div>
      </div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-zinc-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left hover:bg-white/3 transition-colors"
      >
        <span className="font-medium text-sm text-white">{q}</span>
        <span className={`text-zinc-400 mt-0.5 transition-transform flex-shrink-0 ${open ? "rotate-45" : ""}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm text-zinc-400 border-t border-zinc-800 pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

function TroubleshootItem({ icon, title, problem, solution }: { icon: string; title: string; problem: string; solution: string }) {
  return (
    <div className="glass rounded-xl p-6 border-l-2 border-yellow-500/50">
      <div className="flex gap-3 items-start">
        <span className="text-2xl">{icon}</span>
        <div>
          <h4 className="font-semibold text-white mb-1">{title}</h4>
          <p className="text-sm text-zinc-400 mb-3"><strong className="text-red-400">Problem:</strong> {problem}</p>
          <p className="text-sm text-zinc-300"><strong className="text-green-400">Fix:</strong> {solution}</p>
        </div>
      </div>
    </div>
  );
}

export default function StripeSetupPage() {
  return (
    <main className="min-h-screen bg-[#09090b]">
      <Navbar />

      <div className="pt-20">
        {/* Hero */}
        <div className="border-b border-white/5 bg-gradient-to-b from-zinc-900/60 to-transparent">
          <div className="max-w-4xl mx-auto px-6 py-14">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
              <Link href="/docs" className="hover:text-zinc-300 transition-colors">Docs</Link>
              <span>/</span>
              <span className="text-zinc-300">Stripe Setup Guide</span>
            </nav>

            <div className="flex items-center gap-3 mb-5">
              <div className="h-11 w-11 rounded-xl bg-[#635BFF]/10 border border-[#635BFF]/30 flex items-center justify-center text-xl">
                ⚡
              </div>
              <div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Integration Guide</div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-xs rounded-md border border-green-500/20 font-medium">5 min setup</span>
                  <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-xs rounded-md border border-blue-500/20 font-medium">No code required</span>
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
              How to Connect Revive to Stripe in 5 Minutes
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
              This guide walks you through connecting your Stripe account to Revive — from authorization to your first recovered payment. No engineering resources required.
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
              {[
                { label: "Setup time", value: "< 5 min" },
                { label: "Code changes", value: "None" },
                { label: "Steps", value: "4" },
                { label: "Revive access", value: "Read + Retry" },
              ].map((stat) => (
                <div key={stat.label} className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 text-center">
                  <div className="text-xl font-bold text-brand-400">{stat.value}</div>
                  <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-14">
          {/* Prerequisites */}
          <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6 mb-14">
            <h2 className="text-lg font-semibold text-blue-300 mb-4 flex items-center gap-2">
              <span>📋</span> Before You Start
            </h2>
            <ul className="space-y-3">
              {[
                "A Revive account (free at revive-hq.com — no credit card required)",
                "A Stripe account with at least one active subscription product",
                "Admin access to your Stripe account (to authorize the OAuth connection)",
                "5 minutes of uninterrupted focus",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm text-blue-200/80">
                  <CheckIcon className="text-blue-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 pt-5 border-t border-blue-500/20">
              <p className="text-sm text-blue-300/70">
                <strong className="text-blue-300">No Revive account?</strong>{" "}
                <Link href="/dashboard" className="text-blue-400 hover:underline font-medium">
                  Sign up free →
                </Link>{" "}
                It takes 30 seconds and no credit card.
              </p>
            </div>
          </div>

          {/* Step-by-step guide */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-3">Step-by-Step Guide</h2>
            <p className="text-zinc-400 mb-10">Follow these four steps exactly as listed. Each step builds on the previous one.</p>

            {/* Step 1 */}
            <div className="relative mb-14">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Sign in to Revive and open the Dashboard</h3>
                  <p className="text-zinc-400 mb-4">
                    Go to <a href="https://revive-hq.com/dashboard" className="text-brand-400 hover:underline">revive-hq.com/dashboard</a> and sign in with your email. If this is your first time, you'll land on the onboarding screen. Either way, you'll see the main dashboard with a prompt to connect Stripe.
                  </p>
                  <StepScreenshot
                    step={1}
                    title="Revive Dashboard — Connect Stripe prompt"
                    description="The dashboard shows a 'Connect with Stripe' button prominently if no account is connected. Click it to begin OAuth authorization."
                  />
                  <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-400">
                    <strong className="text-zinc-200">What you'll see:</strong> A blue "Connect with Stripe" button in the center of the dashboard, or in the top navigation if you've dismissed the banner. Click it.
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative mb-14">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Authorize Revive on Stripe's OAuth page</h3>
                  <p className="text-zinc-400 mb-4">
                    You'll be redirected to Stripe's authorization screen — <strong className="text-white">this is Stripe's official page</strong>, not a Revive page. You're granting Revive access to view your payment data and trigger retries. Review the permissions, then click <strong className="text-white">"Connect my Stripe account"</strong>.
                  </p>
                  <StepScreenshot
                    step={2}
                    title="Stripe OAuth Authorization Screen"
                    description="Stripe's official authorization page listing the permissions Revive is requesting. Review them, then click 'Connect my Stripe account'."
                  />
                  <div className="space-y-3">
                    <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-green-300 mb-3">✅ What Revive CAN do after this authorization:</h4>
                      <ul className="space-y-1.5 text-sm text-green-200/70">
                        <li className="flex gap-2"><CheckIcon className="text-green-400 shrink-0 w-4 h-4 mt-0.5" /> View subscription and invoice data</li>
                        <li className="flex gap-2"><CheckIcon className="text-green-400 shrink-0 w-4 h-4 mt-0.5" /> Trigger invoice payment retries</li>
                        <li className="flex gap-2"><CheckIcon className="text-green-400 shrink-0 w-4 h-4 mt-0.5" /> Read customer payment method info (not raw card numbers)</li>
                        <li className="flex gap-2"><CheckIcon className="text-green-400 shrink-0 w-4 h-4 mt-0.5" /> Receive webhook notifications for payment events</li>
                      </ul>
                    </div>
                    <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-red-300 mb-3">🚫 What Revive CANNOT do:</h4>
                      <ul className="space-y-1.5 text-sm text-red-200/70">
                        <li className="flex gap-2"><span className="text-red-400 font-bold shrink-0">×</span> Transfer funds or initiate payouts</li>
                        <li className="flex gap-2"><span className="text-red-400 font-bold shrink-0">×</span> Access your Stripe balance</li>
                        <li className="flex gap-2"><span className="text-red-400 font-bold shrink-0">×</span> Modify subscription plans or prices</li>
                        <li className="flex gap-2"><span className="text-red-400 font-bold shrink-0">×</span> Create new charges or customers</li>
                        <li className="flex gap-2"><span className="text-red-400 font-bold shrink-0">×</span> View raw card numbers or bank account details</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative mb-14">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Confirm webhooks are registered</h3>
                  <p className="text-zinc-400 mb-4">
                    After authorizing, Revive automatically registers the required Stripe webhooks. You'll see a confirmation banner in the Revive dashboard. To verify independently, open your <a href="https://dashboard.stripe.com/webhooks" target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:underline">Stripe Developer → Webhooks</a> page and confirm this endpoint is listed:
                  </p>
                  <div className="bg-[#0a0a0a] border border-zinc-700 rounded-xl p-5 font-mono text-sm mb-4">
                    <div className="text-zinc-500 text-xs mb-2">Webhook endpoint (should appear in your Stripe account)</div>
                    <div className="text-green-400">https://revive-hq.com/api/webhooks/stripe</div>
                    <div className="mt-3 text-zinc-500 text-xs">Listening for:</div>
                    <div className="mt-1 space-y-1 text-zinc-300 text-xs">
                      <div>• invoice.payment_failed</div>
                      <div>• invoice.payment_succeeded</div>
                      <div>• customer.subscription.updated</div>
                      <div>• customer.subscription.deleted</div>
                    </div>
                  </div>
                  <StepScreenshot
                    step={3}
                    title="Stripe Webhooks Dashboard — Revive endpoint listed"
                    description="In Stripe Developer → Webhooks, you should see the Revive endpoint with 4 events listed and status 'Enabled'."
                  />
                  <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4 text-sm">
                    <strong className="text-yellow-300">⚠️ Don't see the webhook?</strong>
                    <p className="text-yellow-200/70 mt-1">Wait 30 seconds and refresh Stripe. If still missing, click "Re-register webhooks" in Revive Settings → Integrations. If that doesn't work, skip to the <a href="#troubleshooting" className="text-yellow-300 hover:underline">Troubleshooting section</a> below.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative mb-14">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm">
                  ✓
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Configure your recovery settings</h3>
                  <p className="text-zinc-400 mb-4">
                    You're connected. Now configure how Revive should handle failed payments. Go to <strong className="text-white">Settings → Recovery</strong> and configure:
                  </p>
                  <div className="space-y-4 mb-6">
                    <div className="glass rounded-xl p-5">
                      <h4 className="font-semibold text-sm text-white mb-2">🔄 Retry Schedule</h4>
                      <p className="text-sm text-zinc-400">
                        Default: 3 retries at 3 days, 7 days, and 14 days after failure. You can customize this to match your billing cycle and customer behavior. Longer SaaS products (annual plans) benefit from more aggressive early retries; monthly products do better with a shorter window.
                      </p>
                    </div>
                    <div className="glass rounded-xl p-5">
                      <h4 className="font-semibold text-sm text-white mb-2">📧 Dunning Emails</h4>
                      <p className="text-sm text-zinc-400 mb-3">
                        Enable dunning emails to automatically notify customers when their payment fails. Revive sends personalized, branded emails at each retry attempt with a link to update their payment method.
                      </p>
                      <div className="bg-zinc-900/70 border border-zinc-800 rounded-lg p-4 text-xs font-mono text-zinc-400">
                        <div className="text-zinc-500 mb-2">Example email sequence:</div>
                        <div>Day 0: "Your payment didn't go through" + update link</div>
                        <div>Day 3: "Friendly reminder — retry #1 in 24h"</div>
                        <div>Day 7: "Last chance — your account may be paused"</div>
                      </div>
                    </div>
                    <div className="glass rounded-xl p-5">
                      <h4 className="font-semibold text-sm text-white mb-2">🔗 Update Payment Link</h4>
                      <p className="text-sm text-zinc-400">
                        Revive generates a hosted page at <code className="text-brand-400 bg-brand-500/10 px-1 py-0.5 rounded text-xs">revive-hq.com/update-payment?token=...</code> where customers can update their card. The link expires after 7 days for security. You can embed this URL in your own emails too.
                      </p>
                    </div>
                  </div>
                  <StepScreenshot
                    step={4}
                    title="Revive Settings → Recovery Configuration"
                    description="The recovery settings panel where you configure retry schedule, dunning email templates, and payment update link behavior."
                  />
                  <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-6 mt-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-9 w-9 rounded-full bg-green-500/20 flex items-center justify-center">
                        <CheckIcon className="text-green-400 w-4 h-4" />
                      </div>
                      <h4 className="font-semibold text-green-300">You're live!</h4>
                    </div>
                    <p className="text-sm text-green-200/70">
                      Revive is now monitoring your Stripe account 24/7. The next time a payment fails, it will appear in your dashboard within seconds and the retry sequence will begin automatically.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What Happens Next */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-3">What Happens After Setup?</h2>
            <p className="text-zinc-400 mb-8">Here's the exact sequence of events from the moment a payment fails to when Revive recovers it.</p>
            <div className="space-y-4">
              {[
                {
                  time: "T+0 seconds",
                  event: "Payment fails in Stripe",
                  detail: "Stripe fires invoice.payment_failed to the Revive webhook endpoint. Revive receives it within 1–2 seconds.",
                  color: "red",
                },
                {
                  time: "T+5 seconds",
                  event: "Revive creates a recovery record",
                  detail: "The invoice is logged in Revive's database with the failure reason (e.g., insufficient_funds, card_declined, expired_card). Recovery type and retry schedule are assigned.",
                  color: "orange",
                },
                {
                  time: "T+30 seconds",
                  event: "Dunning email sent (if enabled)",
                  detail: "An initial notification is sent to the customer with a secure payment update link. Revive tracks open rates and click-throughs.",
                  color: "yellow",
                },
                {
                  time: "T+3 days",
                  event: "First retry attempt",
                  detail: "Revive calls Stripe's invoice pay endpoint. If the payment succeeds, the invoice is marked recovered. If not, it schedules retry #2.",
                  color: "blue",
                },
                {
                  time: "T+7 days (if needed)",
                  event: "Second retry + escalation email",
                  detail: "A more urgent dunning email is sent. Second retry is triggered.",
                  color: "purple",
                },
                {
                  time: "T+14 days (if needed)",
                  event: "Final retry",
                  detail: "Last automated attempt. If it fails, the invoice is marked 'exhausted' and you're notified to take manual action or let Stripe cancel the subscription.",
                  color: "red",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 glass rounded-xl p-5">
                  <div className={`shrink-0 px-3 py-1 rounded-lg text-xs font-mono font-semibold bg-${item.color}-500/10 text-${item.color}-400 border border-${item.color}-500/20 h-fit`}>
                    {item.time}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-white mb-1">{item.event}</div>
                    <div className="text-sm text-zinc-400">{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Troubleshooting */}
          <section id="troubleshooting" className="mb-20">
            <h2 className="text-3xl font-bold mb-3">Troubleshooting</h2>
            <p className="text-zinc-400 mb-8">The most common issues and exactly how to fix them.</p>
            <div className="space-y-5">
              <TroubleshootItem
                icon="🔴"
                title="Webhook not registering"
                problem="After connecting Stripe, the webhook doesn't appear in your Stripe Developer → Webhooks panel."
                solution="Wait 60 seconds and refresh Stripe. If still missing, go to Revive Settings → Integrations → Stripe → Re-register webhooks. If that fails, manually add the endpoint in Stripe: URL = https://revive-hq.com/api/webhooks/stripe, Events = invoice.payment_failed, invoice.payment_succeeded, customer.subscription.updated, customer.subscription.deleted."
              />
              <TroubleshootItem
                icon="🟡"
                title="'Authorization failed' on the Stripe OAuth page"
                problem="Clicking 'Connect with Stripe' throws an OAuth error before you even reach Stripe's authorization screen."
                solution="Clear your browser cookies for revive-hq.com and try again in an incognito window. If the error persists, your Revive account may have a session issue — log out, log back in, and retry."
              />
              <TroubleshootItem
                icon="🟠"
                title="Dashboard shows 0 failed payments when I know I have some"
                problem="You've just connected Stripe but the dashboard is empty despite having recent failed invoices in Stripe."
                solution="Revive does not retroactively import failed invoices on initial connect — it only tracks events from the moment the webhook is active. For existing failures, go to Dashboard → Import → 'Scan for existing failures' to pull in any invoices currently in a past_due state."
              />
              <TroubleshootItem
                icon="🔵"
                title="Dunning emails are not sending"
                problem="Revive is detecting failures and scheduling retries, but customers aren't receiving emails."
                solution="Check Settings → Email → Dunning is toggled ON. Verify the 'From' email domain has been verified in Settings → Email → Sender. If you're in Stripe test mode, dunning emails are sent to the verified Revive account email only (not to test customers)."
              />
              <TroubleshootItem
                icon="🟣"
                title="Retry triggered but payment still failing"
                problem="Revive is retrying the invoice but Stripe keeps declining."
                solution="This is a payment method issue, not a Revive issue. Check the decline code in the recovery record (e.g., 'insufficient_funds' = customer needs to add funds; 'do_not_honor' = card blocked). Send the customer the update-payment link manually: Dashboard → select invoice → 'Copy update link'."
              />
              <TroubleshootItem
                icon="⚪"
                title="Stripe account disconnected unexpectedly"
                problem="Revive shows 'Stripe disconnected' and stopped monitoring payments."
                solution="This happens when the OAuth token is revoked from Stripe's side (e.g., someone manually removed the app in Stripe → Settings → Authorized apps). Simply reconnect by clicking 'Connect Stripe' in Revive Settings. No data is lost."
              />
            </div>
            <div className="mt-8 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
              <h4 className="font-semibold mb-2">Still stuck?</h4>
              <p className="text-sm text-zinc-400 mb-4">
                Email us at <a href="mailto:support@revive-hq.com" className="text-brand-400 hover:underline">support@revive-hq.com</a> with:
              </p>
              <ul className="text-sm text-zinc-400 space-y-1">
                <li>• Your Revive account email</li>
                <li>• Your Stripe account ID (starts with acct_)</li>
                <li>• A screenshot of the error or the step where you're stuck</li>
                <li>• Your browser and OS</li>
              </ul>
              <p className="text-sm text-zinc-400 mt-4">We respond within 4 hours on business days.</p>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-3">Frequently Asked Questions</h2>
            <p className="text-zinc-400 mb-8">Everything you want to know about the Stripe integration, security, and how Revive accesses your data.</p>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <FaqItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </section>

          {/* Next Steps */}
          <section className="mb-14">
            <h2 className="text-3xl font-bold mb-8">What to Read Next</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <Link href="/docs" className="glass rounded-xl p-6 hover:border-brand-500/40 transition-all group">
                <div className="text-2xl mb-3">📖</div>
                <h3 className="font-semibold text-white mb-2 group-hover:text-brand-400 transition-colors">API Reference</h3>
                <p className="text-sm text-zinc-400">Full REST API docs — endpoints, webhooks, authentication, and error codes.</p>
              </Link>
              <Link href="/dashboard" className="glass rounded-xl p-6 hover:border-brand-500/40 transition-all group">
                <div className="text-2xl mb-3">📊</div>
                <h3 className="font-semibold text-white mb-2 group-hover:text-brand-400 transition-colors">Your Dashboard</h3>
                <p className="text-sm text-zinc-400">View recovery stats, manage active retries, and configure email templates.</p>
              </Link>
              <Link href="/blog/stripe-payment-failure-codes-explained" className="glass rounded-xl p-6 hover:border-brand-500/40 transition-all group">
                <div className="text-2xl mb-3">🔍</div>
                <h3 className="font-semibold text-white mb-2 group-hover:text-brand-400 transition-colors">Stripe Decline Codes</h3>
                <p className="text-sm text-zinc-400">Learn what each Stripe failure code means and the best recovery strategy for each.</p>
              </Link>
            </div>
          </section>

          {/* Bottom CTA */}
          <div className="glass rounded-2xl p-10 text-center border-l-2 border-brand-500">
            <h3 className="text-2xl font-bold mb-3">Ready to connect?</h3>
            <p className="text-zinc-400 mb-6 max-w-md mx-auto">
              You now know everything you need. The actual setup takes 5 minutes — the rest is automatic.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-7 py-3.5 rounded-xl transition-all"
              >
                Connect Stripe Now
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href="mailto:support@revive-hq.com"
                className="inline-flex items-center justify-center gap-2 text-zinc-400 hover:text-white font-medium px-7 py-3.5 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all"
              >
                Email Support
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
