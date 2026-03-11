import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://revive-hq.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Stripe Failed Payment Recovery — Automate Retries & Recover MRR | Revive",
  description:
    "Stripe failed payments are costing you 3-8% of MRR every month. Revive automates smart retries, sends decline-specific dunning emails, and recovers 65%+ of failed charges. No code required.",
  keywords: [
    "stripe failed payment recovery",
    "stripe failed payment retry",
    "stripe payment failure recovery",
    "recover stripe failed payments",
    "stripe dunning automation",
    "stripe payment retry logic",
    "stripe invoice payment failed",
    "stripe failed subscription recovery",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/stripe-failed-payments`,
    siteName: "Revive",
    title: "Stripe Failed Payment Recovery — Recover 65%+ of Failed Charges",
    description:
      "Smart retries + decline-specific dunning emails. Recover 65%+ of Stripe failed payments automatically.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Revive — Stripe Failed Payment Recovery" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stripe Failed Payment Recovery | Revive",
    description: "Recover 65%+ of Stripe failed payments. Smart retries, decline-specific dunning, no code required.",
    images: ["/opengraph-image"],
    creator: "@revivehq",
  },
};

const declineCodes = [
  { code: "expired_card", action: "Email with 1-click update link within 1 hour", recovery: "~85%" },
  { code: "insufficient_funds", action: "Retry day 3 + day 7 (payday timing)", recovery: "~60%" },
  { code: "do_not_honor", action: "Retry in 4-6 hours + email fallback", recovery: "~45%" },
  { code: "card_declined", action: "Decline-specific email sequence", recovery: "~35%" },
  { code: "card_velocity_exceeded", action: "Retry after 24 hours", recovery: "~55%" },
];

const stats = [
  { value: "3–8%", label: "MRR lost monthly to failed payments (average SaaS)" },
  { value: "65%+", label: "Recovery rate with smart retries + dunning" },
  { value: "<3 min", label: "Time to connect Revive to your Stripe account" },
  { value: "$49/mo", label: "Flat fee — no revenue share, no per-recovery cut" },
];

export default function StripeFailedPaymentsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-600/10 rounded-full blur-[120px]" />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-500/20 bg-brand-500/5 text-brand-400 text-xs font-medium mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse" />
              Stripe-Native Payment Recovery
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              Recover{" "}
              <span className="gradient-text">Stripe Failed Payments</span>
              {" "}Automatically
            </h1>

            <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              Every <code className="text-brand-400 bg-brand-500/10 px-1.5 py-0.5 rounded text-sm">invoice.payment_failed</code> event is revenue you can recover.
              Revive handles smart retries, decline-specific dunning emails, and frictionless card updates — so you recover 65%+ of failed charges without writing a line of code.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-medium px-8 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-brand-600/25"
              >
                Connect Stripe — Free Trial
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/demo" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-zinc-400 hover:text-white font-medium px-8 py-3.5 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all">
                See How It Works
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div key={stat.value} className="glass rounded-2xl p-5 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-zinc-500 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              What&apos;s actually happening when Stripe fires <code className="text-brand-400 text-2xl">invoice.payment_failed</code>
            </h2>
            <p className="text-zinc-400 text-lg">
              Not all payment failures are equal. How you respond to each decline code determines your recovery rate.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-zinc-700">
                  <th className="text-left py-4 pr-6 text-zinc-400 font-medium">Decline Code</th>
                  <th className="text-left py-4 pr-6 text-zinc-400 font-medium">Revive&apos;s Action</th>
                  <th className="text-left py-4 text-zinc-400 font-medium">Recovery Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {declineCodes.map((row) => (
                  <tr key={row.code}>
                    <td className="py-4 pr-6">
                      <code className="text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded text-xs">{row.code}</code>
                    </td>
                    <td className="py-4 pr-6 text-zinc-300">{row.action}</td>
                    <td className="py-4 text-white font-semibold">{row.recovery}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-zinc-600 mt-4 text-center">
            Without decline-specific logic, most SaaS businesses recover 25-35% of failed payments. Revive targets 65%+.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              How Revive recovers Stripe failed payments
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Stripe fires a webhook",
                description: "When invoice.payment_failed fires, Revive receives it instantly. We extract the decline code, attempt count, and customer data.",
              },
              {
                step: "02",
                title: "Smart retry + email triggered",
                description: "Based on the decline code, Revive schedules an optimal retry window and sends a personalized dunning email with a frictionless card update link.",
              },
              {
                step: "03",
                title: "Payment recovered",
                description: "When the retry succeeds or the customer updates their card, Stripe fires invoice.payment_succeeded. Revive marks it recovered and logs the MRR.",
              },
            ].map((item) => (
              <div key={item.step} className="glass rounded-2xl p-8 relative">
                <div className="text-5xl font-bold text-zinc-800 mb-4">{item.step}</div>
                <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Everything you need for Stripe payment recovery
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: "⚡", title: "Decline-aware retry scheduling", desc: "Retry timing adapts to each decline code. insufficient_funds waits for payday. do_not_honor retries in 4-6 hours. expired_card skips retries and emails immediately." },
              { icon: "✉️", title: "Decline-specific dunning emails", desc: "Different email copy for expired card vs. insufficient funds vs. bank decline. Customers get relevant context, not a generic 'payment failed' message." },
              { icon: "🔗", title: "Frictionless card update links", desc: "One-click Stripe Checkout links let customers update payment without logging in. Removes the #1 drop-off point in card update flows." },
              { icon: "📊", title: "Recovery analytics dashboard", desc: "Track recovery rate by decline code, dunning email open rates, MRR recovered, and average time to payment resolution." },
              { icon: "🔔", title: "Real-time Slack/email alerts", desc: "Get notified when high-value accounts fail payment, when recovery rates drop, or when a customer's card updater resolves automatically." },
              { icon: "🛡️", title: "Idempotent webhook processing", desc: "Handles duplicate webhook deliveries gracefully. No double-charges, no duplicate emails — even if Stripe retries the webhook." },
            ].map((feature) => (
              <div key={feature.title} className="glass rounded-2xl p-6 flex gap-4">
                <div className="text-3xl shrink-0">{feature.icon}</div>
                <div>
                  <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* vs. Manual / DIY */}
      <section className="py-20 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Revive vs. building it yourself
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="glass rounded-2xl p-8">
              <h3 className="text-lg font-bold text-zinc-400 mb-6">DIY webhook system</h3>
              <ul className="space-y-3 text-sm text-zinc-400">
                {[
                  "2-4 weeks to build retry logic + queue",
                  "Decline code routing = more weeks",
                  "Email sequences + templates",
                  "Frictionless card update flow",
                  "Idempotency + error handling",
                  "Monitoring + alerting",
                  "Ongoing maintenance as Stripe API changes",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-zinc-600 mt-0.5">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass rounded-2xl p-8 border border-brand-500/20">
              <h3 className="text-lg font-bold text-white mb-6">Revive</h3>
              <ul className="space-y-3 text-sm text-zinc-300">
                {[
                  "Connect Stripe OAuth in 3 minutes",
                  "All decline codes handled automatically",
                  "Pre-built email templates, customizable",
                  "1-click card update links built in",
                  "Idempotent by design",
                  "Dashboard + Slack alerts included",
                  "Updates automatically with Stripe API",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-brand-400 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Stop leaving Stripe revenue on the table
            </h2>
            <p className="text-zinc-400 mb-8">
              At $10K MRR with a 5% payment failure rate, you&apos;re losing $500–$700/month in recoverable revenue. Revive pays for itself in the first week.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-medium px-8 py-3.5 rounded-xl transition-all">
                Start Free Trial
              </Link>
              <Link href="/pricing" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-zinc-400 hover:text-white font-medium px-8 py-3.5 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all">
                See Pricing
              </Link>
            </div>
            <p className="text-xs text-zinc-600 mt-4">$49/mo flat. No revenue share. No setup fees. Cancel anytime.</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
