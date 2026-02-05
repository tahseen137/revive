import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email Templates | Revive",
  description: "See the smart dunning email templates that Revive sends to recover failed payments. Personalized, beautifully designed, and optimized for conversion.",
  openGraph: {
    title: "Email Templates | Revive",
    description: "Recovery emails your customers actually read. See our smart dunning email templates.",
    url: "https://revive-hq.com/email-preview",
    siteName: "Revive",
    type: "website",
  },
};

export default function EmailPreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
