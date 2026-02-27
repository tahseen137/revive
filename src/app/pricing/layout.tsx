import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Revive",
  description:
    "Simple flat-rate pricing. $49/month — no revenue share, no hidden fees. Recover failed payments and keep 100% of what you recover.",
  alternates: {
    canonical: "https://revive-hq.com/pricing",
  },
  openGraph: {
    title: "Pricing | Revive — Flat $49/month, No Revenue Share",
    description:
      "One simple plan. $49/month flat rate. No revenue share, no per-recovery fees. Keep 100% of recovered payments.",
    url: "https://revive-hq.com/pricing",
    siteName: "Revive",
    type: "website",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
