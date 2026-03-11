"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const plans = [
  {
    name: "Free",
    price: "$0",
    priceSuffix: "/forever",
    description: "Start recovering revenue. Free on your first $500/mo recovered.",
    features: [
      "Up to $500/mo recovered",
      "Basic smart retries",
      "1 dunning email sequence",
      "Real-time dashboard",
      "Stripe only",
      "Email support",
      "Powered by Revive branding",
    ],
    cta: "Connect & Start Free",
    ctaLink: "/api/connect",
    popular: false,
    highlight: false,
    priceId: null,
  },
  {
    name: "Indie",
    price: "$29",
    priceSuffix: "/month",
    description: "The full churn recovery stack for indie hackers. No revenue tax, no setup fees.",
    features: [
      "Unlimited recovered revenue",
      "Advanced AI retry optimization",
      "Custom dunning sequences",
      "Win-back campaigns (7/14/30 day)",
      "All platforms (Stripe, LS, Gumroad, Paddle)",
      "Advanced analytics & reports",
      "Priority email support",
      "No revenue share ever",
      "Webhook notifications",
    ],
    cta: "Start Indie Plan",
    ctaLink: null,
    popular: true,
    highlight: true,
    priceId: "indie",
    annualPrice: "$290/year",
    annualSavings: "Save $58 (16% off)",
  },
  {
    name: "Pro",
    price: "$99",
    priceSuffix: "/month",
    description: "AI-powered features for growing SaaS teams. Everything in Indie, plus:",
    features: [
      "Everything in Indie",
      "A/B testing (sequences, timing)",
      "Advanced analytics (cohorts, attribution)",
      "Team access (up to 5 seats)",
      "Webhooks + Slack notifications",
      "Monthly ROI reports (PDF export)",
      "White-label emails (remove branding)",
      "Priority chat support + onboarding call",
    ],
    cta: "Start Pro Plan",
    ctaLink: null,
    popular: false,
    highlight: false,
    priceId: "pro",
    annualPrice: "$990/year",
    annualSavings: "Save $198 (16% off)",
  },
];

const comparisonRows = [
  {
    feature: "Monthly base price",
    revive: "$29",
    churnkey: "$250",
    churnbuster: "$249",
    chargebee: "$849*",
    reviveWins: true,
  },
  {
    feature: "Revenue share",
    revive: "❌ None",
    churnkey: "✅ 10–25%",
    churnbuster: "❌ None",
    chargebee: "❌ None",
    reviveWins: true,
  },
  {
    feature: "Win-back campaigns",
    revive: "✅",
    churnkey: "❌",
    churnbuster: "❌",
    chargebee: "❌",
    reviveWins: true,
  },
  {
    feature: "Lemon Squeezy / Gumroad",
    revive: "✅",
    churnkey: "❌",
    churnbuster: "❌",
    chargebee: "❌",
    reviveWins: true,
  },
  {
    feature: "Smart retry optimization",
    revive: "✅",
    churnkey: "✅",
    churnbuster: "✅",
    chargebee: "✅",
    reviveWins: false,
  },
  {
    feature: "A/B testing",
    revive: "✅ Pro",
    churnkey: "✅ $700+",
    churnbuster: "❌",
    chargebee: "❌",
    reviveWins: true,
  },
  {
    feature: "Setup time",
    revive: "✅ 5 min",
    churnkey: "❌ Hours",
    churnbuster: "❌ Hours",
    chargebee: "❌ Hours",
    reviveWins: true,
  },
  {
    feature: "Indie-focused",
    revive: "✅",
    churnkey: "❌ Enterprise",
    churnbuster: "❌",
    chargebee: "❌ Enterprise",
    reviveWins: true,
  },
];

const testimonials = [
  {
    quote: "Revive paid for itself in the first week. The AI-powered retry logic recovered $1.2K that would've been lost forever.",
    author: "Sarah Chen",
    title: "Founder, TaskFlow",
    avatar: "👩‍💼",
  },
  {
    quote: "Switched from ChurnKey and saved $450/month. Same features, fraction of the cost. No-brainer for indie founders.",
    author: "Marcus Rivera",
    title: "CEO, DesignKit",
    avatar: "👨‍💻",
  },
  {
    quote: "Setup took 4 minutes. Recovery started the same day. Finally, a churn tool built for bootstrappers.",
    author: "Emma Walsh",
    title: "Founder, ContentAI",
    avatar: "👩‍🎨",
  },
];

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [mrrSlider, setMrrSlider] = useState(50); // 50K MRR default
  const [calculatedStats, setCalculatedStats] = useState({
    mrr: 50000,
    lost: 4500,
    recovered: 3150,
    plan: "Indie ($29)",
    net: 3121,
  });

  useEffect(() => {
    // Calculate churn stats based on slider value
    const mrr = mrrSlider * 1000;
    const lost = Math.round(mrr * 0.09); // 9% involuntary churn
    const recovered = Math.round(lost * 0.7); // 70% recovery rate
    const planCost = recovered > 500 ? 29 : 0; // Free if under $500 recovered, else Indie
    const plan = recovered > 500 ? "Indie ($29)" : "Free tier";
    const net = recovered - planCost;

    setCalculatedStats({ mrr, lost, recovered, plan, net });
  }, [mrrSlider]);

  const handleCheckout = async (priceId: string) => {
    setLoading(priceId);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Checkout error:", data.error);
        setLoading(null);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setLoading(null);
    }
  };

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-600/8 rounded-full blur-[120px]" />

        <div className="relative mx-auto max-w-6xl px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/5 text-green-400 text-xs font-medium mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              Simple, predictable pricing — no revenue tax
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Churnkey for indie hackers — $29/mo, not $250
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Start recovering revenue for free. Upgrade to Indie for $29/mo flat — no percentage cuts, no setup fees, no surprises. Add AI-powered features with Pro at $99/mo.
            </p>
          </div>

          {/* How It Works */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-16">
            {[
              { icon: "🔌", text: "Connect Stripe in 5 min" },
              { icon: "🤖", text: "We recover failed payments automatically" },
              { icon: "💰", text: "Keep 100% of recovered revenue" },
            ].map((step) => (
              <div key={step.text} className="text-center">
                <div className="text-2xl mb-2">{step.icon}</div>
                <p className="text-sm text-zinc-400">{step.text}</p>
              </div>
            ))}
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative glass rounded-2xl p-8 flex flex-col ${
                  plan.highlight ? "border-brand-500/30 ring-1 ring-brand-500/20" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
                  <p className="text-sm text-zinc-500">{plan.description}</p>
                </div>

                <div className="mb-8">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-zinc-500 ml-1 text-sm">{plan.priceSuffix}</span>
                  {plan.name === "Free" && (
                    <div className="mt-2 text-xs text-green-400 font-medium">
                      First $500/mo recovered — always free
                    </div>
                  )}
                  {plan.annualPrice && (
                    <div className="mt-2 space-y-1">
                      <div className="text-xs text-brand-400 font-medium">
                        {plan.annualPrice}
                      </div>
                      <div className="text-xs text-zinc-500">
                        {plan.annualSavings}
                      </div>
                    </div>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-zinc-300">
                      <svg className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {plan.priceId ? (
                  <button
                    onClick={() => handleCheckout(plan.priceId!)}
                    disabled={loading === plan.priceId}
                    className={`w-full py-3.5 rounded-xl font-medium transition-all text-sm disabled:opacity-50 ${
                      plan.highlight
                        ? "bg-brand-600 hover:bg-brand-500 text-white hover:shadow-lg hover:shadow-brand-600/25"
                        : "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700"
                    }`}
                  >
                    {loading === plan.priceId ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      plan.cta
                    )}
                  </button>
                ) : plan.ctaLink ? (
                  <Link
                    href={plan.ctaLink}
                    className={`w-full py-3.5 rounded-xl font-medium transition-all text-sm text-center block ${
                      plan.name === "Free"
                        ? "bg-brand-600 hover:bg-brand-500 text-white hover:shadow-lg hover:shadow-brand-600/25"
                        : "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                ) : null}
              </div>
            ))}
          </div>

          {/* Pricing leadership callout */}
          <div className="mt-8 text-center">
            <p className="text-brand-400 text-sm font-medium">
              ChurnKey starts at $250/mo. We&apos;re $29. Same outcome, 89% less cost.
            </p>
          </div>

          {/* Trust Signals */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="glass rounded-2xl p-8">
              <div className="text-center mb-6">
                <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium">
                  Trusted integrations & security
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
                {/* Payment platforms */}
                <div className="text-center">
                  <div className="text-3xl mb-2">💳</div>
                  <div className="text-xs text-zinc-400 font-medium">Stripe</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🍋</div>
                  <div className="text-xs text-zinc-400 font-medium">Lemon Squeezy</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🏓</div>
                  <div className="text-xs text-zinc-400 font-medium">Paddle</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🛒</div>
                  <div className="text-xs text-zinc-400 font-medium">Gumroad</div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-zinc-800 flex justify-center gap-8 text-xs text-zinc-500">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>SOC-2 Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>GDPR Ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>256-bit Encryption</span>
                </div>
              </div>
            </div>
          </div>

          {/* Competitor Comparison Table */}
          <div className="mt-24 max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3">Why founders switch to Revive</h2>
              <p className="text-zinc-400 text-sm">A real cost comparison at $10K MRR</p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-zinc-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left py-4 px-5 text-zinc-400 font-medium w-[28%]">Feature</th>
                    <th className="py-4 px-5 text-center w-[18%] bg-brand-600/10 border-x border-brand-500/30">
                      <span className="text-brand-400 font-bold">Revive</span>
                      <span className="block text-xs text-brand-500/70 font-normal mt-0.5">$29/mo</span>
                    </th>
                    <th className="py-4 px-5 text-center text-zinc-400 font-medium w-[18%]">
                      ChurnKey
                      <span className="block text-xs text-zinc-600 font-normal mt-0.5">$250+/mo</span>
                    </th>
                    <th className="py-4 px-5 text-center text-zinc-400 font-medium w-[18%]">
                      Churn Buster
                      <span className="block text-xs text-zinc-600 font-normal mt-0.5">$249/mo</span>
                    </th>
                    <th className="py-4 px-5 text-center text-zinc-400 font-medium w-[18%]">
                      Chargebee
                      <span className="block text-xs text-zinc-600 font-normal mt-0.5">$849/mo*</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={`border-b border-zinc-800/60 ${i % 2 === 0 ? "bg-zinc-900/20" : ""}`}
                    >
                      <td className="py-3.5 px-5 text-zinc-300 font-medium">{row.feature}</td>
                      {/* Revive column — highlighted */}
                      <td className="py-3.5 px-5 text-center bg-brand-600/10 border-x border-brand-500/20">
                        <span className={row.reviveWins ? "text-green-400 font-semibold" : "text-zinc-300"}>
                          {row.revive}
                        </span>
                      </td>
                      {/* ChurnKey */}
                      <td className="py-3.5 px-5 text-center text-zinc-500">{row.churnkey}</td>
                      {/* Churn Buster */}
                      <td className="py-3.5 px-5 text-center text-zinc-500">{row.churnbuster}</td>
                      {/* Chargebee */}
                      <td className="py-3.5 px-5 text-center text-zinc-500">{row.chargebee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-zinc-600 mt-4 text-center">
              *Chargebee Retention requires their $599/mo Performance billing plan minimum = $849/mo total
            </p>

            {/* Cost callout box */}
            <div className="mt-6 rounded-xl border border-brand-500/25 bg-brand-600/8 p-5">
              <div className="text-center space-y-3">
                <p className="text-sm text-zinc-300 leading-relaxed">
                  <span className="text-brand-400 font-semibold">At $10K MRR with $1K recovered monthly:</span>{" "}
                  ChurnKey charges $250/mo base + up to $250 revenue tax = <span className="text-red-400 font-medium">$500+/mo</span>. Revive charges{" "}
                  <span className="text-green-400 font-semibold">$29 flat</span>. That&apos;s{" "}
                  <span className="text-green-400 font-bold">$471/mo saved</span>.
                </p>
                <div className="pt-3 border-t border-brand-500/20">
                  <p className="text-xs text-brand-400 font-medium">
                    💡 Revive pays for itself when you recover just $29 in failed payments — typically within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive ROI Calculator */}
          <div className="mt-20 max-w-3xl mx-auto">
            <div className="glass rounded-2xl p-10">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-3">See what you could recover</h2>
                <p className="text-zinc-400 text-sm max-w-lg mx-auto">
                  The average SaaS company loses 9% of MRR to involuntary churn. Here&apos;s what Revive saves you:
                </p>
              </div>

              {/* Interactive Slider */}
              <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm text-zinc-400 font-medium">Your Monthly Recurring Revenue (MRR)</label>
                  <span className="text-brand-400 font-bold text-lg">
                    ${mrrSlider >= 1000 ? `${(mrrSlider / 1000).toFixed(0)}M` : `${mrrSlider}K`}
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="500"
                  step="5"
                  value={mrrSlider}
                  onChange={(e) => setMrrSlider(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
                  style={{
                    background: `linear-gradient(to right, rgb(var(--brand-600)) 0%, rgb(var(--brand-600)) ${(mrrSlider / 500) * 100}%, rgb(39 39 42) ${(mrrSlider / 500) * 100}%, rgb(39 39 42) 100%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-zinc-600 mt-2">
                  <span>$5K</span>
                  <span>$500K+</span>
                </div>
              </div>

              {/* Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
                  <div className="text-xs text-zinc-500 mb-2">Current situation (without Revive)</div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-zinc-500 mb-1">Monthly churn loss</div>
                      <div className="text-2xl font-bold text-red-400">
                        -${calculatedStats.lost.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-xs text-zinc-600 pt-3 border-t border-zinc-800">
                      9% of ${(calculatedStats.mrr / 1000).toFixed(0)}K MRR lost to failed payments
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-brand-600/10 to-green-600/10 rounded-xl p-6 border border-brand-500/20">
                  <div className="text-xs text-brand-400 mb-2">With Revive</div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-zinc-500 mb-1">Monthly revenue recovered</div>
                      <div className="text-2xl font-bold text-green-400">
                        +${calculatedStats.recovered.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500 mb-1">Revive cost</div>
                      <div className="text-sm font-semibold text-zinc-300">
                        {calculatedStats.plan}
                      </div>
                    </div>
                    <div className="text-sm font-bold text-green-400 pt-3 border-t border-brand-500/20">
                      Net gain: ${calculatedStats.net.toLocaleString()}/mo
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-xs text-zinc-600">
                  Based on 9% involuntary churn rate and 70% recovery rate
                </p>
                <p className="text-sm text-brand-400 font-medium mt-2">
                  Revive pays for itself if you recover just $29 in failed payments
                </p>
              </div>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="mt-20 max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold mb-3">Trusted by indie founders</h2>
              <p className="text-zinc-400 text-sm">Real results from real founders</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <div key={testimonial.author} className="glass rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-3xl">{testimonial.avatar}</div>
                    <div>
                      <div className="font-semibold text-sm">{testimonial.author}</div>
                      <div className="text-xs text-zinc-500">{testimonial.title}</div>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    &quot;{testimonial.quote}&quot;
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Connect CTA */}
          <div className="mt-20 max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-3">Ready to stop losing revenue?</h2>
            <p className="text-zinc-400 text-sm mb-6">Connect your payment platform and see exactly how much you&apos;ve lost — and how much we can recover.</p>
            <Link
              href="/api/connect"
              className="inline-flex items-center gap-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-brand-600/25"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
              </svg>
              Connect & Start Free
            </Link>
          </div>

          {/* FAQ Section */}
          <div className="mt-20 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-12">Frequently asked questions</h2>
            <div className="space-y-6">
              {[
                {
                  q: "How does the Free tier work?",
                  a: "The Free tier lets you recover up to $500/month in failed payments at no cost. Perfect for early-stage founders. You get basic retries, 1 dunning sequence, and Stripe-only support. When you hit $500/mo recovered, upgrade to Indie.",
                },
                {
                  q: "What's included in the Indie plan?",
                  a: "Indie ($29/mo) removes all limits. Recover unlimited failed payments with advanced AI optimization, custom dunning sequences, win-back campaigns, and support for all platforms (Stripe, Lemon Squeezy, Gumroad, Paddle). There's no percentage cut — you keep 100%.",
                },
                {
                  q: "What makes Pro tier worth $99/mo?",
                  a: "Pro ($99/mo) adds AI-powered features for growing teams: A/B testing for dunning sequences, advanced analytics (cohorts, attribution), team access (5 seats), webhooks, Slack notifications, monthly ROI reports, and white-label emails. If you recover $1,000+/mo, Pro pays for itself 10x over.",
                },
                {
                  q: "Do you take a percentage of recovered revenue?",
                  a: "No. Unlike ChurnKey who charges $250/mo base + up to 25% of recovered revenue, Revive charges flat pricing. Free tier = $0. Indie = $29. Pro = $99. You keep 100% of what we recover.",
                },
                {
                  q: "Which payment platforms do you support?",
                  a: "Free tier: Stripe only. Indie & Pro: Stripe, Lemon Squeezy, Gumroad, and Paddle. Unlike competitors who are Stripe-only, we're built for indie founders using any platform.",
                },
                {
                  q: "Is my payment data safe?",
                  a: "Absolutely. We use OAuth integrations (Stripe Connect, etc.), so we never see your credentials. All data is encrypted in transit and at rest. We're SOC-2 compliant and GDPR-ready.",
                },
              ].map((item) => (
                <div key={item.q} className="glass rounded-xl p-6">
                  <h3 className="font-medium mb-2">{item.q}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
