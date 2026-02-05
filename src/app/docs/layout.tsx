import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Documentation | Revive",
  description: "Complete API reference for integrating Revive into your application. Connect Stripe, configure webhooks, and recover failed payments programmatically.",
  openGraph: {
    title: "API Documentation | Revive",
    description: "Complete API reference for integrating Revive payment recovery into your application.",
    url: "https://revive-hq.com/docs",
    siteName: "Revive",
    type: "website",
  },
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
