import type { Metadata } from "next";
import { FAQPageJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "FAQ | Revive",
  description: "Frequently asked questions about Revive payment recovery. Learn about setup, pricing, security, smart retries, and dunning emails.",
  alternates: {
    canonical: "https://revive-hq.com/faq",
  },
  openGraph: {
    title: "FAQ | Revive",
    description: "Everything you need to know about Revive payment recovery, pricing, and setup.",
    url: "https://revive-hq.com/faq",
    siteName: "Revive",
    type: "website",
  },
};

// Key FAQ items for structured data (FAQ rich snippets)
const faqItems = [
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
    question: "Is my data secure?",
    answer:
      "Absolutely. We use bank-grade 256-bit encryption for all data at rest and in transit. We never store card data — only payment metadata needed for recovery. Your Stripe credentials are securely encrypted, and all retries happen directly through Stripe's secure API.",
  },
  {
    question: "How does the pricing work?",
    answer:
      "Revive charges a flat $49/month with no revenue share. You keep 100% of every payment recovered. No hidden fees, no setup costs, no long-term contracts.",
  },
  {
    question: "How do smart retries work?",
    answer:
      "Our ML engine categorizes each failed payment by decline code and applies failure-specific retry logic. For example: card_declined gets retried in 4 hours, insufficient_funds gets retried after 3 days (payday cycle), expired_card triggers an immediate dunning email. This intelligent timing achieves 3.2x higher recovery vs. random retries.",
  },
  {
    question: "What payment platforms does Revive support?",
    answer:
      "Revive supports Stripe, Lemon Squeezy, Gumroad, Paddle, and Polar.sh. Connect via read-only OAuth and start recovering in minutes — no code changes required.",
  },
  {
    question: "What if I want to cancel?",
    answer:
      "You can disconnect Revive from your account anytime from your dashboard settings. There are no cancellation fees, no long-term contracts, and no questions asked.",
  },
];

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <FAQPageJsonLd faqs={faqItems} />
      {children}
    </>
  );
}
