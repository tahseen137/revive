import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding | Revive",
  description: "Connect your Stripe account and start recovering failed payments in under 5 minutes. No code changes required.",
  openGraph: {
    title: "Onboarding | Revive",
    description: "Connect your Stripe account and start recovering failed payments in under 5 minutes.",
    url: "https://revive-hq.com/onboarding",
    siteName: "Revive",
    type: "website",
  },
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
