import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog & Roadmap",
  description:
    "See what's new in Revive and what's coming next. Track our progress as we build the best payment recovery platform for SaaS.",
};

interface ChangelogEntry {
  date: string;
  title: string;
  emoji: string;
  items: string[];
}

interface RoadmapSection {
  title: string;
  emoji: string;
  description: string;
  items: string[];
}

const changelogEntries: ChangelogEntry[] = [
  {
    date: "Feb 5, 2026",
    title: "Launch Day",
    emoji: "🚀",
    items: [
      "Smart retry engine with ML-powered timing optimization",
      "Dunning email system with behavioral triggers",
      "Stripe webhook integration for real-time payment monitoring",
      "Simple flat-rate pricing — no percentage cuts, ever",
      "Real-time analytics dashboard",
      "Interactive onboarding wizard",
      "Complete API documentation",
    ],
  },
  {
    date: "Feb 4, 2026",
    title: "Built",
    emoji: "🔨",
    items: [
      "Core payment recovery engine",
      "Marketing website and landing page",
      "Company blog and content hub",
      "SEO optimization and structured data",
    ],
  },
];

const roadmapSections: RoadmapSection[] = [
  {
    title: "Coming Soon",
    emoji: "🔜",
    description: "Actively in development — shipping within 60 days",
    items: [
      "Slack/Discord notifications for recovered payments",
      "Pre-expiration card warnings (reduce failed payments before they happen)",
      "Multi-provider support (Paddle, Braintree)",
      "Team accounts with role-based permissions",
    ],
  },
  {
    title: "Future",
    emoji: "🔮",
    description: "On our roadmap — help us prioritize!",
    items: [
      "AI-powered optimal retry timing based on customer behavior",
      "Revenue forecasting and churn prediction",
      "Custom dunning email builder with drag & drop editor",
      "Zapier and Make.com integration for workflow automation",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-600/10 rounded-full blur-[120px]" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-500/20 bg-brand-500/5 text-brand-400 text-xs font-medium mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse" />
            Product Updates
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-4">
            Changelog & Roadmap
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            See what we&apos;ve shipped and what&apos;s coming next. Building in public, one release at a time.
          </p>
        </div>
      </section>

      {/* Changelog Section */}
      <section className="py-12 md:py-20 border-t border-white/5">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              📝 Changelog
            </h2>
            <p className="text-zinc-400">
              Everything we&apos;ve shipped, newest first
            </p>
          </div>

          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-[11px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-brand-500/50 via-brand-400/30 to-transparent" />

            <div className="space-y-12">
              {changelogEntries.map((entry, idx) => (
                <div key={idx} className="relative pl-12">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-gradient-to-br from-brand-600 to-brand-500 shadow-lg shadow-brand-600/50 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>

                  {/* Content card */}
                  <div className="glass rounded-xl p-6 md:p-8 hover:border-brand-500/20 transition-all group">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-3xl">{entry.emoji}</span>
                          <h3 className="text-2xl font-bold text-white">
                            {entry.title}
                          </h3>
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-sm">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                          {entry.date}
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-2">
                      {entry.items.map((item, itemIdx) => (
                        <li
                          key={itemIdx}
                          className="flex items-start gap-3 text-zinc-300"
                        >
                          <svg
                            className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-12 md:py-20 border-t border-white/5">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              🗺️ Roadmap
            </h2>
            <p className="text-zinc-400">
              What&apos;s coming next — help us prioritize by{" "}
              <a
                href="mailto:founders@revive-hq.com"
                className="text-brand-400 hover:text-brand-300 underline"
              >
                sharing feedback
              </a>
            </p>
          </div>

          <div className="space-y-8">
            {roadmapSections.map((section, idx) => (
              <div
                key={idx}
                className="glass rounded-xl p-6 md:p-8 hover:border-brand-500/20 transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-4xl">{section.emoji}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {section.title}
                    </h3>
                    <p className="text-sm text-zinc-500">{section.description}</p>
                  </div>
                </div>

                <ul className="space-y-3 mt-6">
                  {section.items.map((item, itemIdx) => (
                    <li
                      key={itemIdx}
                      className="flex items-start gap-3 text-zinc-300"
                    >
                      <div className="w-2 h-2 rounded-full bg-brand-500 flex-shrink-0 mt-2" />
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Feedback CTA */}
          <div className="mt-12 glass rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">
              Have a feature request?
            </h3>
            <p className="text-zinc-400 text-sm mb-6">
              We&apos;re building Revive for you. Tell us what would make your life easier.
            </p>
            <a
              href="mailto:founders@revive-hq.com?subject=Feature%20Request"
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-medium px-6 py-3 rounded-lg transition-all hover:shadow-lg hover:shadow-brand-600/25"
            >
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
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Send us your ideas
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
