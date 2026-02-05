"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

const plans = [
  {
    name: "Starter",
    price: 29,
    priceId: "starter",
    description: "For early-stage SaaS with up to $10k MRR",
    features: [
      "Up to 500 payment retries/mo",
      "Basic dunning email sequences",
      "Real-time recovery dashboard",
      "Stripe OAuth integration",
      "Email support",
      "7-day retry window",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Growth",
    price: 79,
    priceId: "growth",
    description: "For scaling SaaS with up to $100k MRR",
    features: [
      "Unlimited payment retries",
      "Advanced dunning sequences",
      "Custom email templates",
      "Smart retry optimization (AI)",
      "Priority support",
      "30-day retry window",
      "Webhook notifications",
      "Team access (up to 5)",
      "Recovery analytics & reports",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
];

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (priceId: string) => {
    setLoading(priceId);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-600/8 rounded-full blur-[120px]" />

        <div className="relative mx-auto max-w-5xl px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Simple, transparent pricing
            </h1>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              Start recovering revenue in minutes. 14-day free trial on all plans.
              Cancel anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative glass rounded-2xl p-8 flex flex-col ${
                  plan.popular
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
                  <span className="text-5xl font-bold">${plan.price}</span>
                  <span className="text-zinc-500 ml-1">/month</span>
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
                  onClick={() => handleCheckout(plan.priceId)}
                  disabled={loading === plan.priceId}
                  className={`w-full py-3.5 rounded-xl font-medium transition-all text-sm ${
                    plan.popular
                      ? "bg-brand-600 hover:bg-brand-500 text-white hover:shadow-lg hover:shadow-brand-600/25"
                      : "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading === plan.priceId ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Creating checkout...
                    </span>
                  ) : (
                    plan.cta
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-24 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-12">
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "How does the free trial work?",
                  a: "You get full access to all features for 14 days. No credit card required to start. If you love it, pick a plan. If not, no charge.",
                },
                {
                  q: "Can I switch plans?",
                  a: "Yes! Upgrade or downgrade at any time. Changes take effect immediately, and we'll prorate the difference.",
                },
                {
                  q: "What happens to my data if I cancel?",
                  a: "Your data is retained for 30 days after cancellation. After that, it's permanently deleted per our privacy policy.",
                },
                {
                  q: "Do you take a percentage of recovered revenue?",
                  a: "No. You pay a flat monthly fee regardless of how much revenue we recover for you. No hidden fees, no percentage cuts.",
                },
                {
                  q: "Is my Stripe data safe?",
                  a: "Absolutely. We use Stripe OAuth (Connect), so we never see your Stripe password. All data is encrypted in transit and at rest.",
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
