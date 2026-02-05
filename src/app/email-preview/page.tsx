import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const emailTemplates = [
  {
    id: "friendly-reminder",
    title: "Friendly Reminder",
    timing: "Sent 1 hour after payment failure",
    subject: "Quick heads up about your payment",
    from: "Your Company",
    to: "sarah@customer.com",
    preview: "Hi Sarah, your payment of $49.00 for Pro Plan didn't go through...",
    content: {
      greeting: "Hi Sarah,",
      body: "Your payment of <strong>$49.00</strong> for <strong>Pro Plan</strong> didn't go through. This usually happens when a card expires or has insufficient funds.",
      cta: "Update Payment Method",
      footer: "This is an automated notification about your subscription. If you believe this is a mistake, please contact our support team.",
    },
    tone: "friendly",
  },
  {
    id: "second-attempt",
    title: "Second Attempt",
    timing: "Sent 3 days after first failure",
    subject: "Action needed: Update your payment method",
    from: "Your Company",
    to: "sarah@customer.com",
    preview: "We tried charging your card again but it was declined...",
    content: {
      greeting: "Hi Sarah,",
      body: "We tried charging your card again but it was declined. Your subscription to <strong>Pro Plan</strong> will be paused in <strong>4 days</strong> unless we can process payment.",
      cta: "Update Payment Now",
      footer: "Don't want to lose access? Update your payment method to keep your account active.",
    },
    tone: "urgent",
  },
  {
    id: "urgent-notice",
    title: "Urgent Notice",
    timing: "Sent 7 days after first failure",
    subject: "Your subscription will be cancelled tomorrow",
    from: "Your Company",
    to: "sarah@customer.com",
    preview: "Your Pro Plan subscription is about to be cancelled...",
    content: {
      greeting: "Hi Sarah,",
      body: "Your <strong>Pro Plan</strong> subscription is about to be cancelled due to a failed payment. Update your payment method now to keep your account active.",
      cta: "Update Payment to Keep Access",
      footer: "This is your final notice. After 24 hours, your subscription will be automatically cancelled.",
    },
    tone: "critical",
  },
  {
    id: "win-back",
    title: "Win-back",
    timing: "Sent after subscription cancellation",
    subject: "We miss you! Come back with 20% off",
    from: "Your Company",
    to: "sarah@customer.com",
    preview: "We miss you! Your Pro Plan subscription was cancelled...",
    content: {
      greeting: "Hi Sarah,",
      body: "We miss you! Your <strong>Pro Plan</strong> subscription was cancelled due to a payment issue. Come back and we'll give you <strong>20% off</strong> your next month.",
      cta: "Reactivate with 20% Off",
      footer: "This offer is valid for 30 days. We'd love to have you back!",
    },
    tone: "welcoming",
  },
];

const toneColors = {
  friendly: {
    border: "border-green-500/20",
    bg: "bg-green-500/5",
    badge: "bg-green-500/10 text-green-400 border-green-500/20",
    button: "bg-green-600 hover:bg-green-500",
  },
  urgent: {
    border: "border-yellow-500/20",
    bg: "bg-yellow-500/5",
    badge: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    button: "bg-yellow-600 hover:bg-yellow-500",
  },
  critical: {
    border: "border-red-500/20",
    bg: "bg-red-500/5",
    badge: "bg-red-500/10 text-red-400 border-red-500/20",
    button: "bg-red-600 hover:bg-red-500",
  },
  welcoming: {
    border: "border-blue-500/20",
    bg: "bg-blue-500/5",
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    button: "bg-blue-600 hover:bg-blue-500",
  },
};

export default function EmailPreviewPage() {
  return (
    <main className="min-h-screen bg-[#09090b]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-600/10 rounded-full blur-[120px]" />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-500/20 bg-brand-500/5 text-brand-400 text-xs font-medium mb-8">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Smart dunning emails that actually convert
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              Recovery emails your customers{" "}
              <span className="gradient-text">actually read</span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              These aren't generic "payment failed" messages. Every email is{" "}
              <strong className="text-zinc-300">
                personalized, beautifully designed, and optimized for conversion
              </strong>
              . See exactly what your customers will receive.
            </p>
          </div>
        </div>
      </section>

      {/* Email Templates */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="space-y-16">
            {emailTemplates.map((template, idx) => (
              <div key={template.id} className="space-y-4">
                {/* Template Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl md:text-3xl font-bold text-white">
                        {idx + 1}. {template.title}
                      </h2>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border ${
                          toneColors[template.tone as keyof typeof toneColors]
                            .badge
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {template.tone}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-500">{template.timing}</p>
                  </div>
                  <div className="text-sm text-zinc-400 bg-zinc-900/50 px-4 py-2 rounded-lg border border-zinc-800">
                    <span className="text-zinc-500">Avg. Open Rate:</span>{" "}
                    <strong className="text-white">
                      {idx === 0
                        ? "72%"
                        : idx === 1
                        ? "68%"
                        : idx === 2
                        ? "81%"
                        : "64%"}
                    </strong>
                  </div>
                </div>

                {/* Email Mockup - Browser-in-browser style */}
                <div className="glass rounded-2xl overflow-hidden border-2 border-zinc-800/50 hover:border-brand-500/20 transition-all">
                  {/* Email Client Header */}
                  <div className="bg-zinc-900/80 border-b border-zinc-800 px-6 py-4">
                    <div className="flex items-start gap-4">
                      {/* Email icon */}
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-brand-600 to-purple-600 flex items-center justify-center text-white">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </div>

                      {/* Email metadata */}
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-white text-sm">
                            {template.from}
                          </span>
                          <span className="text-zinc-600 text-xs">
                            &lt;billing@yourcompany.com&gt;
                          </span>
                        </div>
                        <div className="text-xs text-zinc-500 mb-2">
                          To: {template.to}
                        </div>
                        <div className="font-medium text-white text-base">
                          {template.subject}
                        </div>
                      </div>

                      {/* Timestamp */}
                      <div className="text-xs text-zinc-500 flex-shrink-0">
                        2:34 PM
                      </div>
                    </div>
                  </div>

                  {/* Email Body */}
                  <div className="bg-white p-8 md:p-12">
                    <div className="max-w-2xl mx-auto">
                      {/* Company logo placeholder */}
                      <div className="mb-8">
                        <div className="w-32 h-8 bg-gradient-to-r from-brand-600 to-purple-600 rounded flex items-center justify-center text-white font-bold text-sm">
                          Your Logo
                        </div>
                      </div>

                      {/* Email content */}
                      <div className="space-y-6 text-gray-800">
                        <p className="text-base leading-relaxed">
                          {template.content.greeting}
                        </p>
                        <p
                          className="text-base leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: template.content.body,
                          }}
                        />

                        {/* CTA Button */}
                        <div className="pt-2 pb-4">
                          <button
                            className={`inline-flex items-center gap-2 px-8 py-4 rounded-lg text-white font-semibold text-base transition-all shadow-lg ${
                              toneColors[
                                template.tone as keyof typeof toneColors
                              ].button
                            }`}
                          >
                            {template.content.cta}
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>

                        <p className="text-sm text-gray-600 leading-relaxed border-t border-gray-200 pt-6">
                          {template.content.footer}
                        </p>
                      </div>

                      {/* Email footer */}
                      <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                        <p className="text-xs text-gray-500 mb-3">
                          You're receiving this email because your payment for
                          Pro Plan was declined.
                        </p>
                        <div className="flex items-center justify-center gap-4 text-xs">
                          <a
                            href="#"
                            className="text-brand-600 hover:text-brand-700 font-medium"
                          >
                            Update Payment
                          </a>
                          <span className="text-gray-400">•</span>
                          <a
                            href="#"
                            className="text-gray-500 hover:text-gray-700"
                          >
                            Contact Support
                          </a>
                          <span className="text-gray-400">•</span>
                          <a
                            href="#"
                            className="text-gray-500 hover:text-gray-700"
                          >
                            Unsubscribe
                          </a>
                        </div>
                        <p className="text-xs text-gray-400 mt-4">
                          Your Company • 123 Market St, San Francisco, CA 94103
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explainer Section */}
      <section className="py-20 md:py-32 border-t border-white/5">
        <div className="mx-auto max-w-4xl px-6">
          <div className="glass rounded-3xl p-12 md:p-16 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-500/20 bg-brand-500/5 text-brand-400 text-xs font-medium mb-8">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              Intelligent automation
            </div>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Automatically personalized and sent at optimal times
            </h2>

            <p className="text-lg text-zinc-400 leading-relaxed mb-8 max-w-2xl mx-auto">
              These emails are{" "}
              <strong className="text-white">
                automatically personalized
              </strong>{" "}
              with customer names, amounts, and product details. They're sent at{" "}
              <strong className="text-white">
                optimal times based on the failure type
              </strong>
              . No setup required.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  ),
                  label: "Auto-personalized",
                  description: "Names, amounts, products",
                },
                {
                  icon: (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  ),
                  label: "Smart timing",
                  description: "Based on failure type",
                },
                {
                  icon: (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2Z" />
                      <polyline points="14 2 14 8 20 8" />
                      <path d="M9 15h6M9 11h6" />
                    </svg>
                  ),
                  label: "Brand customization",
                  description: "Your logo, colors, voice",
                },
              ].map((feature) => (
                <div key={feature.label} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-600/10 text-brand-400 mb-3">
                    {feature.icon}
                  </div>
                  <div className="font-semibold text-white mb-1">
                    {feature.label}
                  </div>
                  <div className="text-sm text-zinc-500">
                    {feature.description}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-white/5">
              <Link
                href="/onboarding"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-brand-600/25"
              >
                Start recovering revenue
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <p className="text-xs text-zinc-500 mt-4">
                No credit card required • 14-day free trial • 5-minute setup
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Benefits */}
      <section className="py-16 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                stat: "68%",
                label: "Average Open Rate",
                description:
                  "Far above industry average thanks to personalization",
              },
              {
                stat: "3.2x",
                label: "Higher Recovery",
                description: "Compared to retry-only strategies",
              },
              {
                stat: "Zero",
                label: "Manual Work",
                description: "Set it once, recover forever",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="text-center glass rounded-2xl p-8"
              >
                <div className="text-4xl font-bold text-brand-400 mb-2">
                  {item.stat}
                </div>
                <div className="text-lg font-semibold text-white mb-2">
                  {item.label}
                </div>
                <div className="text-sm text-zinc-500">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
