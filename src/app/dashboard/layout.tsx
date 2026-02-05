import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Revive",
  description: "Monitor your payment recovery performance, track failed payments, and view real-time analytics for your Stripe account.",
  openGraph: {
    title: "Dashboard | Revive",
    description: "Monitor your payment recovery performance and track failed payments in real-time.",
    url: "https://revive-hq.com/dashboard",
    siteName: "Revive",
    type: "website",
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
