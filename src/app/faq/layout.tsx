import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Revive",
  description: "Frequently asked questions about Revive payment recovery. Learn about setup, pricing, security, smart retries, and dunning emails.",
  openGraph: {
    title: "FAQ | Revive",
    description: "Everything you need to know about Revive payment recovery, pricing, and setup.",
    url: "https://revive-hq.com/faq",
    siteName: "Revive",
    type: "website",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
