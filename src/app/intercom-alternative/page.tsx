import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://revive-hq.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Intercom Alternative for SaaS Churn Recovery | Revive",
  description:
    "Intercom is powerful for support. Revive is laser-focused on churn recovery. Purpose-built for failed payments, 10x cheaper, faster setup. Compare features and pricing.",
  keywords: [
    "intercom alternative",
    "intercom vs revive",
    "intercom churn recovery",
    "payment recovery alternative",
    "stripe dunning alternative",
    "intercom pricing",
    "churn recovery tool",
    "failed payment recovery",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/intercom-alternative`,
    siteName: "Revive",
    title: "Intercom Alternative for SaaS Churn Recovery | Revive",
    description:
      "Intercom is built for support. Revive is built for churn recovery. Compare features and pricing for failed payment recovery.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Intercom Alternative — Revive",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Intercom Alternative for SaaS Churn Recovery | Revive",
    description:
      "Purpose-built churn recovery vs full support suite. Compare Intercom and Revive.",
    images: ["/opengraph-image"],
    creator: "@revivehq",
  },
};

export default function IntercomAlternativePage() {
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
              Intercom Alternative
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              Looking for a{" "}
              <span className="gradient-text">Better Way to Win Back</span>{" "}
              Churned Customers?
            </h1>

            <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              <strong className="text-zinc-300">Intercom excels at customer support</strong> — live chat, knowledge bases, and proactive messaging. 
              <strong className="text-zinc-300"> Revive does one thing exceptionally well: recovering failed payments.</strong> Purpose-built for churn recovery, 10x cheaper, and zero code required.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-medium px-8 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-brand-600/25"
              >
                Start Free Trial
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
                href="#comparison"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-zinc-400 hover:text-white font-medium px-8 py-3.5 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all"
              >
                See Full Comparison
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Comparison Grid */}
      <section className="py-20 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Different tools for different problems
            </h2>
            <p className="text-zinc-400 text-lg">
              Both are excellent — but they solve completely different challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Intercom Card */}
            <div className="glass rounded-2xl p-8 border-zinc-800">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-lg bg-zinc-800 flex items-center justify-center text-white font-bold">
                  IC
                </div>
                <div>
                  <div className="text-xl font-bold">Intercom</div>
                  <div className="text-sm text-zinc-500">Full Support Suite</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-zinc-400 mb-2">Core Strengths</div>
                  <ul className="space-y-2 text-sm text-zinc-300">
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Live chat & messaging
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Knowledge base & help center
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Proactive customer engagement
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Team inbox & collaboration
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-zinc-800">
                  <div className="text-sm font-medium text-zinc-400 mb-2">Pricing</div>
                  <div className="text-2xl font-bold text-white mb-1">$74+</div>
                  <div className="text-sm text-zinc-500">per month (seat-based)</div>
                </div>

                <div className="pt-4 border-t border-zinc-800">
                  <div className="text-sm font-medium text-zinc-400 mb-2">Best For</div>
                  <div className="text-sm text-zinc-300">
                    Customer support, onboarding, and engagement across your entire customer lifecycle.
                  </div>
                </div>
              </div>
            </div>

            {/* Revive Card - Highlighted */}
            <div className="glass rounded-2xl p-8 border-brand-500/30 ring-1 ring-brand-500/20 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                Purpose-Built for Churn Recovery
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                </div>
                <div>
                  <div className="text-xl font-bold">Revive</div>
                  <div className="text-sm text-brand-400">Payment Recovery Engine</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-zinc-400 mb-2">Core Strengths</div>
                  <ul className="space-y-2 text-sm text-zinc-300">
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-brand-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      AI-powered smart payment retries
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-brand-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Automated dunning email sequences
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-brand-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      One-click payment updates
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-brand-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Real-time recovery analytics
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-zinc-800">
                  <div className="text-sm font-medium text-zinc-400 mb-2">Pricing</div>
                  <div className="text-2xl font-bold text-white mb-1">15%</div>
                  <div className="text-sm text-zinc-500">of recovered revenue only</div>
                </div>

                <div className="pt-4 border-t border-zinc-800">
                  <div className="text-sm font-medium text-zinc-400 mb-2">Best For</div>
                  <div className="text-sm text-zinc-300">
                    SaaS companies on Stripe who need to recover failed payments automatically — nothing else.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section id="comparison" className="py-20 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Honest feature comparison
            </h2>
            <p className="text-zinc-400 text-lg">
              Intercom is a full platform. Revive is laser-focused on one problem.
            </p>
          </div>

          <div className="glass rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left p-4 text-zinc-400 font-medium w-1/3">Feature</th>
                    <th className="p-4 text-brand-400 font-semibold">Revive</th>
                    <th className="p-4 text-zinc-400 font-medium">Intercom</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-300">
                  <tr className="border-b border-zinc-800/50 bg-brand-500/5">
                    <td className="p-4 text-zinc-300 font-medium" colSpan={3}>Payment Recovery</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">Smart payment retries</td>
                    <td className="p-4 text-center font-semibold text-green-400">✅ AI-powered</td>
                    <td className="p-4 text-center text-zinc-600">❌</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">Automated dunning emails</td>
                    <td className="p-4 text-center font-semibold text-green-400">✅ Purpose-built</td>
                    <td className="p-4 text-center text-zinc-600">❌</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">One-click payment update</td>
                    <td className="p-4 text-center">✅</td>
                    <td className="p-4 text-center text-zinc-600">❌</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">Recovery analytics</td>
                    <td className="p-4 text-center font-semibold text-green-400">✅ Real-time</td>
                    <td className="p-4 text-center text-zinc-600">❌</td>
                  </tr>

                  <tr className="border-b border-zinc-800/50 bg-zinc-500/5">
                    <td className="p-4 text-zinc-300 font-medium" colSpan={3}>Customer Support</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">Live chat</td>
                    <td className="p-4 text-center text-zinc-600">❌</td>
                    <td className="p-4 text-center font-semibold text-green-400">✅ Industry-leading</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">Knowledge base</td>
                    <td className="p-4 text-center text-zinc-600">❌</td>
                    <td className="p-4 text-center">✅</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">Team inbox</td>
                    <td className="p-4 text-center text-zinc-600">❌</td>
                    <td className="p-4 text-center">✅</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">Proactive messaging</td>
                    <td className="p-4 text-center text-zinc-600">❌</td>
                    <td className="p-4 text-center">✅</td>
                  </tr>

                  <tr className="border-b border-zinc-800/50 bg-brand-500/5">
                    <td className="p-4 text-zinc-300 font-medium" colSpan={3}>Setup & Pricing</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">Setup time</td>
                    <td className="p-4 text-center font-semibold text-green-400">3-5 minutes</td>
                    <td className="p-4 text-center">Several hours</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">Code changes required</td>
                    <td className="p-4 text-center font-semibold text-green-400">Zero</td>
                    <td className="p-4 text-center">Widget integration</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">Starting price</td>
                    <td className="p-4 text-center font-semibold text-green-400">$0 (pay on recovery)</td>
                    <td className="p-4 text-center">$74/mo per seat</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-zinc-400">Pricing model</td>
                    <td className="p-4 text-center font-semibold text-brand-400">Performance-based</td>
                    <td className="p-4 text-center">Seat-based subscription</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 max-w-3xl mx-auto">
            <div className="glass rounded-xl p-6">
              <h3 className="font-semibold mb-3 text-zinc-200">When to use Intercom</h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                <strong className="text-zinc-300">Choose Intercom if you need:</strong> A full customer communication platform with live chat, help desk, knowledge base, and proactive messaging. It&apos;s the gold standard for customer support and engagement.
              </p>
              <h3 className="font-semibold mb-3 text-zinc-200">When to use Revive</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                <strong className="text-zinc-300">Choose Revive if you need:</strong> Automated failed payment recovery and nothing else. No support tickets, no live chat — just smart retries and dunning emails that recover lost revenue automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Real-world use cases
            </h2>
            <p className="text-zinc-400">
              See which tool fits your situation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="glass rounded-2xl p-8">
              <div className="text-3xl mb-4">💬</div>
              <h3 className="text-lg font-semibold mb-3 text-white">
                "We need better customer support"
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                Your support team is overwhelmed with tickets. Customers can&apos;t find answers. You need live chat, help docs, and a team inbox.
              </p>
              <div className="text-sm font-medium text-zinc-300">
                → Use <span className="text-white">Intercom</span>
              </div>
            </div>

            <div className="glass rounded-2xl p-8 border-brand-500/30">
              <div className="text-3xl mb-4">💳</div>
              <h3 className="text-lg font-semibold mb-3 text-white">
                "Customers are churning due to failed payments"
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                Your Stripe dashboard shows dozens of failed charges. You&apos;re losing MRR to expired cards and insufficient funds. You need automated recovery.
              </p>
              <div className="text-sm font-medium text-brand-400">
                → Use <span className="text-white">Revive</span>
              </div>
            </div>

            <div className="glass rounded-2xl p-8">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold mb-3 text-white">
                "We want to engage users proactively"
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                You want to send targeted messages based on user behavior, run onboarding campaigns, and nurture trials into paying customers.
              </p>
              <div className="text-sm font-medium text-zinc-300">
                → Use <span className="text-white">Intercom</span>
              </div>
            </div>

            <div className="glass rounded-2xl p-8 border-brand-500/30">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-lg font-semibold mb-3 text-white">
                "We need payment recovery ASAP with zero dev work"
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                You don&apos;t have time to integrate a complex platform. You just need failed payments to stop bleeding revenue — today, not next quarter.
              </p>
              <div className="text-sm font-medium text-brand-400">
                → Use <span className="text-white">Revive</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Can You Use Both? */}
      <section className="py-20 border-t border-white/5 bg-zinc-950/50">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              Can you use both?
            </h2>
            <p className="text-zinc-400">
              Absolutely. Many companies do.
            </p>
          </div>

          <div className="glass rounded-2xl p-8">
            <p className="text-sm text-zinc-300 leading-relaxed mb-6">
              <strong className="text-white">Intercom and Revive solve different problems.</strong> Intercom handles your customer support and engagement. Revive handles failed payment recovery. They don&apos;t overlap.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/50 rounded-lg p-4">
                <div className="text-sm font-medium text-zinc-400 mb-2">Perfect Together</div>
                <ul className="space-y-2 text-sm text-zinc-300">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Intercom for support tickets & onboarding
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Revive for failed payment recovery
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Each tool does what it does best
                  </li>
                </ul>
              </div>

              <div className="bg-zinc-900/50 rounded-lg p-4">
                <div className="text-sm font-medium text-zinc-400 mb-2">Start Small</div>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  If budget is tight, start with Revive (zero upfront cost). Add Intercom later when you need dedicated support tooling. Revive pays for itself immediately.
                </p>
              </div>
            </div>
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
                No credit card required
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Start recovering revenue in 5 minutes
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-3">
                Connect your Stripe account and Revive starts recovering failed payments automatically. 
                <strong className="text-white"> Pay only 15% of revenue we actually recover.</strong>
              </p>
              <p className="text-zinc-500 text-sm max-w-xl mx-auto mb-8">
                Zero upfront cost. No contracts. Cancel anytime. First $500 recovered is free.
              </p>
              <Link
                href="/api/stripe/connect"
                className="inline-flex items-center justify-center gap-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-10 py-4 rounded-xl text-lg transition-all hover:shadow-lg hover:shadow-brand-600/25"
              >
                Connect Stripe — Get Started Free
              </Link>
              <div className="flex items-center justify-center gap-6 mt-8 text-xs text-zinc-600">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  3-min setup
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  No code changes
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  Cancel anytime
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
