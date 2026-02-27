import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Connect Revive to Stripe in 5 Minutes | Revive Docs",
  description: "Step-by-step guide to connect your Stripe account to Revive. Includes screenshots, troubleshooting tips, and FAQs. Setup takes less than 5 minutes.",
  openGraph: {
    title: "Connect Revive to Stripe in 5 Minutes",
    description: "Step-by-step setup guide with troubleshooting and FAQs. No code required.",
    url: "https://revive-hq.com/docs/stripe-setup",
    siteName: "Revive",
    type: "article",
  },
};

export default function StripeSetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
