import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Revive — Recover Failed Payments on Autopilot",
  description:
    "Stop losing revenue to failed payments. Revive automatically detects, retries, and recovers failed charges from your Stripe account.",
  keywords: [
    "failed payments",
    "payment recovery",
    "dunning",
    "churn reduction",
    "stripe",
    "SaaS",
    "revenue recovery",
  ],
  openGraph: {
    title: "Revive — Recover Failed Payments on Autopilot",
    description:
      "Stop losing revenue to failed payments. Revive automatically detects, retries, and recovers failed charges.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#09090b] text-zinc-100 antialiased">
        {children}
      </body>
    </html>
  );
}
