"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSection {
  category: string;
  icon: JSX.Element;
  items: FAQItem[];
}

function AccordionItem({ question, answer, isOpen, onClick }: { 
  question: string; 
  answer: string; 
  isOpen: boolean; 
  onClick: () => void;
}) {
  return (
    <div className="glass rounded-xl overflow-hidden transition-all hover:border-brand-500/20">
      <button
        onClick={onClick}
        className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors hover:bg-white/5"
      >
        <span className="font-medium text-white pr-8">{question}</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`flex-shrink-0 text-brand-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-5 pt-1 text-zinc-400 leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<{ [key: string]: number | null }>({
    gettingStarted: 0,
    pricing: null,
    technical: null,
    support: null,
  });

  const toggleItem = (section: string, index: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [section]: prev[section] === index ? null : index,
    }));
  };

  const faqSections: FAQSection[] = [
    {
      category: "Getting Started",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
      items: [
        {
          question: "How does Revive work?",
          answer:
            "Revive connects to your Stripe account via OAuth and monitors all payment events in real-time. When a payment fails, our ML engine analyzes the decline code and automatically applies the optimal retry strategy. We also send personalized dunning emails with one-click payment update links. Everything runs on autopilot — you just watch the revenue get recovered.",
        },
        {
          question: "How long does setup take?",
          answer:
            "About 5 minutes. Click 'Connect Stripe', authorize the OAuth connection, and you're done. No code changes, no webhook configuration, no API keys to manage. Revive starts monitoring and recovering payments immediately.",
        },
        {
          question: "Do I need to change my Stripe configuration?",
          answer:
            "Nope! Revive works alongside your existing Stripe setup without any changes. We don't interfere with your current billing logic, subscriptions, or payment flows. Think of us as an invisible safety net that catches failed payments and brings them back.",
        },
        {
          question: "Is my data secure?",
          answer:
            "Absolutely. We're SOC 2 compliant with bank-grade encryption. Your Stripe credentials are encrypted at rest and in transit using 256-bit SSL. We never store card data — only payment metadata needed for recovery. All retries happen directly through Stripe's secure API.",
        },
      ],
    },
    {
      category: "Pricing",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
      items: [
        {
          question: "How does performance-based pricing work?",
          answer:
            "We only charge 20% of revenue we actually recover. If we retry a failed $100 payment and successfully recover it, you keep $80 and we earn $20. If we don't recover anything, you pay $0. It's completely risk-free — we only win when you win.",
        },
        {
          question: "What counts as 'recovered' revenue?",
          answer:
            "A payment counts as recovered when Revive successfully processes a previously failed charge. This includes both smart retries (automated retry attempts) and customer-initiated updates via our dunning emails. If a customer updates their card through our email link and the payment goes through, that's a recovery.",
        },
        {
          question: "Are there any hidden fees?",
          answer:
            "Zero. No setup fees, no monthly minimums, no per-transaction charges. The only fee is our 20% performance commission on successfully recovered revenue. That's it. Completely transparent.",
        },
        {
          question: "What's included in the free tier?",
          answer:
            "Early access customers get 3 months completely free with white-glove onboarding. After that, you pay only for recovered revenue (20% commission). There's no 'free tier' limit — you can process unlimited failed payments. Our pricing scales with your success, not your volume.",
        },
      ],
    },
    {
      category: "Technical",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
      items: [
        {
          question: "What Stripe events do you monitor?",
          answer:
            "We monitor charge.failed, invoice.payment_failed, payment_intent.payment_failed, and customer.subscription.updated events. This covers all scenarios where a payment fails — whether it's a one-time charge, subscription renewal, or invoice payment. We also track successful retries to avoid duplicate attempts.",
        },
        {
          question: "How do smart retries work?",
          answer:
            "Our ML engine categorizes each failed payment by decline code and applies failure-specific retry logic. For example: card_declined gets retried in 4 hours (likely temporary issue), insufficient_funds gets retried after 3 days (payday cycle), expired_card triggers an immediate dunning email (can't retry). This intelligent timing achieves 3.2x higher recovery vs. random retries.",
        },
        {
          question: "What's different about your dunning emails?",
          answer:
            "Traditional dunning emails are generic blasts that customers ignore. Ours are behavior-triggered and contextual. We send the first email within 1 hour of failure, follow up based on customer response, and include one-click payment update links that work seamlessly. Average 68% open rate vs. industry standard of 20-30%.",
        },
        {
          question: "Do you support Stripe Connect?",
          answer:
            "Yes! If you're a platform using Stripe Connect, Revive can recover failed payments for your connected accounts. Reach out to support@revive-hq.com and we'll set up a custom integration. This is currently in beta with select customers.",
        },
      ],
    },
    {
      category: "Support",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
      items: [
        {
          question: "How do I contact support?",
          answer:
            "Email us at support@revive-hq.com and we'll respond within 24 hours (usually much faster). For urgent issues, early access customers get priority Slack/Discord support. We're a small team but we're extremely responsive — your success is our success.",
        },
        {
          question: "Can I get a free payment health audit?",
          answer:
            "Yes! If you're on the waitlist or actively evaluating Revive, we'll analyze your Stripe account and show you exactly how much revenue you're losing to failed payments. Just email audit@revive-hq.com with your Stripe account email and we'll send a detailed report within 48 hours. No strings attached.",
        },
        {
          question: "What if I want to cancel?",
          answer:
            "You can disconnect Revive from your Stripe account anytime from your dashboard settings. There are no cancellation fees, no long-term contracts, and no questions asked. We'll stop monitoring payments immediately. If you've recovered revenue in your final billing cycle, you'll be charged for that, and then you're done.",
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-[#09090b]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
        {/* Background effects */}
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-600/10 rounded-full blur-[120px]" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-500/20 bg-brand-500/5 text-brand-400 text-xs font-medium mb-6 animate-fade-in">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            Frequently Asked Questions
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
            Everything you need to know about{" "}
            <span className="gradient-text">Revive</span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Questions about setup, pricing, security, or how our smart payment recovery works? You'll find answers below.
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 space-y-12">
          {faqSections.map((section, sectionIdx) => (
            <div key={section.category}>
              {/* Section Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-lg bg-brand-600/10 text-brand-400 flex items-center justify-center">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-white">
                  {section.category}
                </h2>
              </div>

              {/* Accordion Items */}
              <div className="space-y-3">
                {section.items.map((item, itemIdx) => (
                  <AccordionItem
                    key={itemIdx}
                    question={item.question}
                    answer={item.answer}
                    isOpen={
                      openItems[
                        section.category
                          .toLowerCase()
                          .replace(/ /g, "") as keyof typeof openItems
                      ] === itemIdx
                    }
                    onClick={() =>
                      toggleItem(
                        section.category
                          .toLowerCase()
                          .replace(/ /g, ""),
                        itemIdx
                      )
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still have questions CTA */}
      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="mx-auto max-w-4xl px-6">
          <div className="glass rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-600/10 via-transparent to-purple-600/10" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Still have questions?
              </h2>
              <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-8">
                Can't find what you're looking for? Our team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="mailto:support@revive-hq.com"
                  className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-medium px-8 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-brand-600/25"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  Contact Support
                </a>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 text-zinc-400 hover:text-white font-medium px-8 py-3.5 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all"
                >
                  View Pricing
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
