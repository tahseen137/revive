"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaitlistForm from "@/components/WaitlistForm";

const plans = [
  {
    name: "Free",
    price: "0",
    priceSuffix: "/month",
    description: "Try it risk-free on your first $500 recovered",
    features: [
      "Up to $500 recovered/month",
      "Smart payment retries",
      "Basic dunning emails",
      "Real-time dashboard",
      "Stripe OAuth integration",
      "Email support",
    ],
    cta: "Get Started Free",
    popular: false,
    highlight: false,
  },
  {
    name: "Growth",
    price: "15%",
    priceSuffix: " of recovered revenue",
    description: "For SaaS companies serious about reducing churn (max $99/mo)",
    features: [
      "Unlimited payment retries",
      "Advanced dunning sequences",
      "Custom email templates",
      "AI-powered retry optimization",
      "Priority support",
      "30-day retry window",
      "Webhook notifications",
      "Recovery analytics & reports",
      "Team access (up to 5)",
    ],
    cta: "Join Early Access",
    popular: true,
    highlight: true,
  },
  {
    name: "Scale",
    price: "10%",
    priceSuffix: " of recovered revenue",
    description: "For high-volume SaaS recovering $10K+/month",
    features: [
      "Everything in Growth",
      "Lower rate at scale",
      "Dedicated account manager",
      "Custom retry strategies",
      "API access",
      "SLA guarantee",
      "White-label emails",
      "Unlimited team members",
      "Quarterly strategy reviews",
    ],
    cta: "Contact Us",
    popular: false,
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-600/8 rounded-full blur-[120px]" />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/5 text-green-400 text-xs font-medium mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              Pay only when we recover your revenue
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              You only pay when you get paid
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              No monthly fees. No setup costs. No risk. We take a small percentage of the revenue we actually recover for you — if we don&apos;t recover anything, you pay nothing.
            </p>
          </div>

          {/* How it works mini */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-16">
            {[
              { icon: "🔌", text: "Connect Stripe in 3 min" },
              { icon: "🤖", text: "We recover failed payments automatically" },
              { icon: "💰", text: "You keep 85-100% of recovered revenue" },
            ].map((step) => (
              <div key={step.text} className="text-center">
                <div className="text-2xl mb-2">{step.icon}</div>
                <p className="text-sm text-zinc-400">{step.text}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative glass rounded-2xl p-8 flex flex-col ${
                  plan.highlight
                    ? "border-brand-500/30 ring-1 ring-brand-500/20"
                    : ""
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
                  {plan.name === "Growth" && (
                    <div className="mt-2 text-xs text-green-400 font-medium">
                      Capped at $99/month
                    </div>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-zinc-300"
                    >
                      <svg
                        className="w-4 h-4 text-brand-500 mt-0.5 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    const el = document.getElementById("waitlist");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`w-full py-3.5 rounded-xl font-medium transition-all text-sm ${
                    plan.highlight
                      ? "bg-brand-600 hover:bg-brand-500 text-white hover:shadow-lg hover:shadow-brand-600/25"
                      : "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>

          {/* ROI Calculator */}
          <div className="mt-20 max-w-3xl mx-auto">
            <div className="glass rounded-2xl p-10 text-center">
              <h2 className="text-2xl font-bold mb-3">See what you could recover</h2>
              <p className="text-zinc-400 text-sm mb-8 max-w-lg mx-auto">
                The average SaaS company loses 9% of MRR to involuntary churn. Here&apos;s what Revive could save you:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { mrr: "$10K MRR", lost: "$900/mo lost", recovered: "$630/mo recovered", cost: "You pay: $94", net: "Net gain: $536/mo" },
                  { mrr: "$50K MRR", lost: "$4,500/mo lost", recovered: "$3,150/mo recovered", cost: "You pay: $472", net: "Net gain: $2,678/mo" },
                  { mrr: "$100K MRR", lost: "$9,000/mo lost", recovered: "$6,300/mo recovered", cost: "You pay: $630", net: "Net gain: $5,670/mo" },
                ].map((example) => (
                  <div key={example.mrr} className="bg-zinc-900/50 rounded-xl p-5 text-left">
                    <div className="text-brand-400 font-semibold text-sm mb-3">{example.mrr}</div>
                    <div className="space-y-1.5 text-xs text-zinc-400">
                      <div>❌ {example.lost}</div>
                      <div>✅ {example.recovered}</div>
                      <div>💳 {example.cost}</div>
                      <div className="text-green-400 font-semibold text-sm pt-2 border-t border-zinc-800">
                        {example.net}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-zinc-600 mt-4">Based on 9% involuntary churn rate and 70% recovery rate at the Growth tier (15%)</p>
            </div>
          </div>

          {/* Waitlist */}
          <div id="waitlist" className="mt-20 max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-3">Join early access — first 50 get 3 months free</h2>
            <p className="text-zinc-400 text-sm mb-6">No credit card required. We&apos;ll reach out within 24 hours.</p>
            <WaitlistForm />
          </div>

          {/* Comparison */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-10">How we compare</h2>
            <div className="glass rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left p-4 text-zinc-400 font-medium"></th>
                    <th className="p-4 text-brand-400 font-semibold">Revive</th>
                    <th className="p-4 text-zinc-400 font-medium">Churnkey</th>
                    <th className="p-4 text-zinc-400 font-medium">Baremetrics</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-300">
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">Starting price</td>
                    <td className="p-4 text-center font-semibold text-green-400">Free</td>
                    <td className="p-4 text-center">$500/mo</td>
                    <td className="p-4 text-center">$58/mo</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">Pricing model</td>
                    <td className="p-4 text-center font-semibold text-green-400">Pay per recovery</td>
                    <td className="p-4 text-center">Flat fee</td>
                    <td className="p-4 text-center">Flat fee</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">Smart retries</td>
                    <td className="p-4 text-center">✅</td>
                    <td className="p-4 text-center">✅</td>
                    <td className="p-4 text-center">❌</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">Dunning emails</td>
                    <td className="p-4 text-center">✅</td>
                    <td className="p-4 text-center">✅</td>
                    <td className="p-4 text-center">✅</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-zinc-400">Setup time</td>
                    <td className="p-4 text-center font-semibold text-green-400">3 min</td>
                    <td className="p-4 text-center">30 min</td>
                    <td className="p-4 text-center">15 min</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-zinc-400">Risk</td>
                    <td className="p-4 text-center font-semibold text-green-400">Zero</td>
                    <td className="p-4 text-center">$6K/yr upfront</td>
                    <td className="p-4 text-center">$696/yr upfront</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-12">
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "How does performance-based pricing work?",
                  a: "We only charge a percentage of the revenue we actually recover for you. If we recover $1,000 in failed payments, you keep $850 (Growth plan). If we recover nothing, you pay nothing. It's that simple.",
                },
                {
                  q: "What counts as \"recovered revenue\"?",
                  a: "Any failed payment that Revive successfully retries or that a customer pays after receiving our dunning emails. We only count it once the money is in your Stripe account.",
                },
                {
                  q: "How do you collect your fee?",
                  a: "We invoice you monthly based on recovered revenue. You'll see a clear breakdown in your dashboard showing every recovered payment and our fee. No surprises.",
                },
                {
                  q: "Can I switch between plans?",
                  a: "Yes! You can upgrade or downgrade at any time. As your recovered revenue grows past $10K/mo, you'll automatically qualify for the Scale rate (10%).",
                },
                {
                  q: "Is my Stripe data safe?",
                  a: "Absolutely. We use Stripe OAuth (Connect), so we never see your Stripe password. All data is encrypted in transit and at rest. We only access what's needed for payment recovery.",
                },
                {
                  q: "How is this different from Stripe's built-in retries?",
                  a: "Stripe's Smart Retries are basic — they recover about 10% of failed payments. Revive uses AI-powered retry timing based on decline codes, plus sends personalized dunning emails. Our customers see 40-70% recovery rates.",
                },
              ].map((item) => (
                <div
                  key={item.q}
                  className="glass rounded-xl p-6"
                >
                  <h3 className="font-medium mb-2">{item.q}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {item.a}
                  </p>
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
