import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { FeedbackWidget } from "@/components/FeedbackWidget";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://revive-hq.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Revive — Recover Failed Payments on Autopilot",
    template: "%s | Revive",
  },
  description:
    "Stop losing revenue to failed payments. Revive automatically detects, retries, and recovers failed charges from your Stripe account with smart retry logic and dunning emails.",
  keywords: [
    "failed payment recovery",
    "payment recovery",
    "dunning management",
    "involuntary churn",
    "stripe payment recovery",
    "SaaS revenue recovery",
    "smart retries",
    "automated dunning emails",
    "churn reduction",
    "failed payments SaaS",
  ],
  authors: [{ name: "Revive" }],
  creator: "Revive",
  publisher: "Revive",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Revive",
    title: "Revive — Recover Failed Payments on Autopilot",
    description:
      "Smart payment retries + dunning emails. Recover failed payments automatically. Built for SaaS companies on Stripe.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Revive — Recover Failed Payments on Autopilot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Revive — Recover Failed Payments on Autopilot",
    description:
      "Smart payment retries + dunning emails. Recover failed payments automatically.",
    images: ["/opengraph-image"],
    creator: "@revivehq",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="bg-[#09090b] text-zinc-100 antialiased font-sans">
        {children}
        <FeedbackWidget />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
