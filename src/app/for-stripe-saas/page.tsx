import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://revive-hq.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Churn Recovery for Stripe SaaS - Automated Winback with Revive",
  description:
    "Your Stripe dashboard shows churned customers. Revive brings them back. Native Stripe integration detects cancellations and triggers automated winback sequences. See the ROI.",
  keywords: [
    "stripe churn recovery",
    "stripe dunning management",
    "stripe failed payment recovery",
    "stripe saas tools",
    "stripe payment retry",
    "stripe webhook automation",
    "stripe subscription recovery",
    "reduce stripe churn",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/for-stripe-saas`,
    siteName: "Revive",
    title: "Churn Recovery for Stripe SaaS - Automated Winback with Revive",
    description:
      "Stripe shows the churn. Revive fixes it. Automated payment recovery triggered by Stripe events. One-click OAuth setup.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Revive for Stripe SaaS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Churn Recovery for Stripe SaaS - Automated Winback with Revive",
    description:
      "Native Stripe integration. Automated payment recovery. Zero code required. See ROI calculator.",
    images: ["/opengraph-image"],
    creator: "@revivehq",
  },
};

export default function ForStripeSaaSPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-600/10 rounded-full blur-[120px]" />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-500/20 bg-brand-500/5 text-brand-400 text-xs font-medium mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse" />
              Built for Stripe-Powered SaaS
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              Your Stripe Dashboard Shows{" "}
              <span className="gradient-text">Churned Customers.</span>{" "}
              Revive Brings Them Back.
            </h1>

            <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              <strong className="text-zinc-300">Every SaaS founder stares at that churn number in their Stripe dashboard.</strong> Failed payments, expired cards, insufficient funds — it&apos;s revenue slipping away. 
              <strong className="text-zinc-300"> Revive integrates with Stripe to detect cancellations instantly and trigger automated recovery sequences.</strong>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-medium px-8 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-brand-600/25"
              >
                Connect Your Stripe Account
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
              <Link
                href="#roi"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-zinc-400 hover:text-white font-medium px-8 py-3.5 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all"
              >
                See ROI Calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works with Stripe */}
      <section className="py-20 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              How Revive integrates with Stripe
            </h2>
            <p className="text-zinc-400 text-lg">
              One-click OAuth. Zero code changes. Instant recovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                ),
                title: "Secure OAuth Connection",
                desc: "One-click Stripe OAuth. No API keys to copy. No webhooks to configure. Revive connects directly to your Stripe account securely.",
              },
              {
                step: 2,
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                  </svg>
                ),
                title: "Detect Failed Payments",
                desc: "Revive monitors your Stripe events in real-time. The moment a payment fails, we categorize it by decline code.",
              },
              {
                step: 3,
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                ),
                title: "Trigger Recovery Sequences",
                desc: "Smart retries based on decline reason. Personalized dunning emails sent at optimal times. One-click payment update links.",
              },
              {
                step: 4,
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                ),
                title: "Track Recovery in Real-Time",
                desc: "Dashboard shows every retry, every email, every recovered payment. Sync directly with your Stripe data.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="glass rounded-2xl p-6 text-center group hover:border-brand-500/20 transition-all"
              >
                <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-brand-600 to-brand-500 flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto shadow-lg shadow-brand-600/25 group-hover:scale-110 transition-transform">
                  {item.step}
                </div>
                
                <div className="h-12 w-12 rounded-lg bg-brand-600/10 text-brand-400 flex items-center justify-center mb-4 mx-auto">
                  {item.icon}
                </div>
                
                <h3 className="text-base font-semibold mb-2 text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stripe-Specific Features */}
      <section className="py-20 border-t border-white/5 bg-gradient-to-br from-brand-950/20 to-purple-950/10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Built natively for Stripe webhooks & events
            </h2>
            <p className="text-zinc-400 text-lg">
              We speak Stripe&apos;s language fluently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="glass rounded-2xl p-8">
              <h3 className="text-lg font-semibold mb-3 text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Listens to Stripe Events
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                Revive monitors <code className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded text-brand-400">invoice.payment_failed</code>, 
                <code className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded text-brand-400 ml-1">charge.failed</code>, and 
                <code className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded text-brand-400 ml-1">customer.subscription.deleted</code> events in real-time.
              </p>
              <p className="text-sm text-zinc-400 leading-relaxed">
                The moment Stripe fires an event, Revive kicks into action — analyzing decline codes and starting smart recovery flows.
              </p>
            </div>

            <div className="glass rounded-2xl p-8">
              <h3 className="text-lg font-semibold mb-3 text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Smart Decline Code Analysis
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                Not all failed payments are equal. Revive reads Stripe decline codes and applies the right strategy:
              </p>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <span className="text-brand-400 shrink-0">•</span>
                  <span><strong className="text-zinc-300">card_declined</strong> → Retry in 4 hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-400 shrink-0">•</span>
                  <span><strong className="text-zinc-300">insufficient_funds</strong> → Payday-aware 3-day cycle</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-400 shrink-0">•</span>
                  <span><strong className="text-zinc-300">expired_card</strong> → Immediate email with update link</span>
                </li>
              </ul>
            </div>

            <div className="glass rounded-2xl p-8">
              <h3 className="text-lg font-semibold mb-3 text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                One-Click Payment Updates
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Customers receive emails with Stripe-hosted update links. They click, enter new card details on a secure Stripe page, and boom — subscription reactivated. 
                <strong className="text-zinc-300"> No logging into your app. No support tickets. No friction.</strong>
              </p>
            </div>

            <div className="glass rounded-2xl p-8">
              <h3 className="text-lg font-semibold mb-3 text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Syncs Perfectly with Stripe Data
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Revive&apos;s dashboard pulls directly from your Stripe account. Every metric matches your Stripe dashboard exactly. 
                No data silos, no discrepancies — just <strong className="text-zinc-300">one source of truth.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section id="roi" className="py-20 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Calculate your potential ROI
            </h2>
            <p className="text-zinc-400 text-lg">
              See what recovering even 10% of churned MRR looks like.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-2xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-sm text-zinc-500 mb-2">Your Monthly MRR</div>
                  <div className="text-4xl font-bold text-white mb-1">$50K</div>
                  <div className="text-xs text-zinc-600">Example SaaS baseline</div>
                </div>

                <div className="text-center">
                  <div className="text-sm text-zinc-500 mb-2">Involuntary Churn (avg 15%)</div>
                  <div className="text-4xl font-bold text-red-400 mb-1">-$7.5K</div>
                  <div className="text-xs text-zinc-600">Lost to failed payments monthly</div>
                </div>

                <div className="text-center">
                  <div className="text-sm text-zinc-500 mb-2">Revive Recovers (40%)</div>
                  <div className="text-4xl font-bold text-green-400 mb-1">+$3K</div>
                  <div className="text-xs text-zinc-600">Recovered MRR per month</div>
                </div>
              </div>

              <div className="border-t border-zinc-800 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-zinc-900/50 rounded-lg p-6">
                    <div className="text-sm text-zinc-500 mb-2">Your Cost (15% of recovery)</div>
                    <div className="text-3xl font-bold text-white mb-1">$450</div>
                    <div className="text-xs text-zinc-600">per month</div>
                  </div>

                  <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-6">
                    <div className="text-sm text-zinc-500 mb-2">Your Net Gain</div>
                    <div className="text-3xl font-bold text-green-400 mb-1">$2,550</div>
                    <div className="text-xs text-green-600">pure profit per month</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-zinc-800">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-zinc-400">Annual Impact</div>
                    <div className="text-2xl font-bold text-white">$30,600</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-zinc-400">Payback Period</div>
                    <div className="text-2xl font-bold text-brand-400">Immediate</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-zinc-500 max-w-2xl mx-auto">
                <strong className="text-zinc-400">Conservative estimates.</strong> Actual recovery rates vary by industry, product, and pricing tier. 
                Many customers see 50%+ recovery rates with Revive&apos;s smart retry engine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Integration Details */}
      <section className="py-20 border-t border-white/5 bg-zinc-950/50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Zero-code integration. Seriously.
            </h2>
            <p className="text-zinc-400 text-lg">
              No API keys. No webhook endpoints. No code changes.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-6 text-white text-center">
                Traditional Stripe Integration vs Revive
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm font-medium text-red-400 mb-3">❌ Traditional Way</div>
                  <ul className="space-y-2 text-sm text-zinc-400">
                    <li className="flex items-start gap-2">
                      <span className="shrink-0">1.</span>
                      <span>Copy API keys from Stripe dashboard</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="shrink-0">2.</span>
                      <span>Configure webhook endpoints</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="shrink-0">3.</span>
                      <span>Write code to handle events</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="shrink-0">4.</span>
                      <span>Build retry logic and email templates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="shrink-0">5.</span>
                      <span>Test, debug, deploy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="shrink-0">6.</span>
                      <span>Maintain and iterate over time</span>
                    </li>
                  </ul>
                  <div className="mt-4 text-xs text-zinc-600">
                    Time investment: 20-40 hours + ongoing maintenance
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-green-400 mb-3">✅ The Revive Way</div>
                  <ul className="space-y-2 text-sm text-zinc-300">
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Click &quot;Connect with Stripe&quot;</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Authorize Revive via OAuth</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Done. Recovery starts immediately.</span>
                    </li>
                  </ul>
                  <div className="mt-4 text-xs text-green-600">
                    Time investment: 3 minutes + zero maintenance
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-500/10 border border-brand-500/20">
                <svg className="w-5 h-5 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span className="text-sm font-medium text-zinc-300">
                  Bank-grade security. 256-bit encryption for all data. Your Stripe credentials are encrypted at rest and in transit.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compatible with Any Stripe Setup */}
      <section className="py-20 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Works with any Stripe setup
            </h2>
            <p className="text-zinc-400 text-lg">
              No matter how you use Stripe, Revive fits seamlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "✅",
                title: "Stripe Billing",
                desc: "Subscriptions, metered billing, usage-based — all supported.",
              },
              {
                icon: "✅",
                title: "Stripe Checkout",
                desc: "Works perfectly with Checkout sessions and customer portal.",
              },
              {
                icon: "✅",
                title: "Custom Stripe Integration",
                desc: "Already built your own Stripe integration? Revive layers on top without conflicts.",
              },
              {
                icon: "✅",
                title: "Multi-Currency",
                desc: "Supports all Stripe currencies and international payments.",
              },
              {
                icon: "✅",
                title: "Multiple Products",
                desc: "One Revive account handles unlimited Stripe products and plans.",
              },
              {
                icon: "✅",
                title: "Test & Live Mode",
                desc: "Test in Stripe test mode. Deploy to live when ready.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="glass rounded-2xl p-6 text-center"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-base font-semibold mb-2 text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="glass rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-600/10 via-transparent to-purple-600/10" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/5 text-green-400 text-xs font-medium mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                Stripe OAuth • 3-Minute Setup • Zero Code
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Connect your Stripe account and start recovering revenue
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-3">
                One click to connect. Instant recovery. 
                <strong className="text-white"> Pay only 15% of revenue we actually recover.</strong>
              </p>
              <p className="text-zinc-500 text-sm max-w-xl mx-auto mb-8">
                No upfront cost. No contracts. First $500 recovered is free. Cancel anytime.
              </p>
              <Link
                href="/api/stripe/connect"
                className="inline-flex items-center justify-center gap-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-10 py-4 rounded-xl text-lg transition-all hover:shadow-lg hover:shadow-brand-600/25"
              >
                Connect Stripe — Start Recovering
              </Link>
              <div className="flex items-center justify-center gap-6 mt-8 text-xs text-zinc-600">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  OAuth secure
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  256-bit encrypted
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  100% Stripe compatible
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
