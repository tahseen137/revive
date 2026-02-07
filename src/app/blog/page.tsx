import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Blog — Payment Recovery & Churn Reduction for SaaS",
  description:
    "Learn how to reduce involuntary churn, recover failed payments, and maximize SaaS revenue with smart dunning strategies.",
  openGraph: {
    title: "Blog — Payment Recovery & Churn Reduction for SaaS",
    description:
      "Expert guides on failed payment recovery, dunning management, and involuntary churn reduction for SaaS founders.",
  },
};

const blogPosts = [
  {
    slug: "how-to-reduce-involuntary-churn",
    title: "How to Reduce Involuntary Churn: The Complete Guide for SaaS",
    description:
      "Involuntary churn costs SaaS companies billions. Learn the proven strategies to recover failed payments and reduce churn caused by payment failures.",
    date: "February 4, 2026",
    readTime: "12 min read",
    category: "Churn Reduction",
    author: "Revive Team",
  },
  {
    slug: "dunning-email-best-practices",
    title: "Dunning Email Best Practices: Templates, Timing & Psychology",
    description:
      "Learn the proven dunning email strategies that recover 73% of failed payments. Includes templates, timing schedules, and psychological triggers that actually work.",
    date: "February 5, 2026",
    readTime: "10 min read",
    category: "Payment Recovery",
    author: "Revive Team",
  },
  {
    slug: "failed-payment-recovery-strategies",
    title: "Failed Payment Recovery Strategies: Complete Guide for SaaS",
    description:
      "Master the complete failed payment recovery playbook: smart retries, dunning automation, account updaters, and pre-billing prevention. Recover 94% of failed charges.",
    date: "February 5, 2026",
    readTime: "13 min read",
    category: "Payment Recovery",
    author: "Revive Team",
  },
  {
    slug: "involuntary-churn-vs-voluntary-churn",
    title: "Involuntary Churn vs Voluntary Churn: Differences & How to Fight Each",
    description:
      "Learn the critical differences between involuntary and voluntary churn, how to identify each type, and the specific strategies to reduce both in your SaaS business.",
    date: "February 5, 2026",
    readTime: "11 min read",
    category: "Churn Reduction",
    author: "Revive Team",
  },
  {
    slug: "stripe-failed-payment-retry",
    title: "Stripe Failed Payment Retry: Complete Technical Guide",
    description:
      "Master Stripe's payment retry system: how default retries work, decline codes, smart schedules, webhooks, and how to build custom retry logic that recovers 94% of failed payments.",
    date: "February 5, 2026",
    readTime: "14 min read",
    category: "Technical Guide",
    author: "Revive Team",
  },
  {
    slug: "saas-revenue-recovery",
    title: "SaaS Revenue Recovery: ROI of Payment Recovery Tools",
    description:
      "Calculate the true ROI of payment recovery tools for SaaS. Learn how automating failed payment recovery can save $50K-$500K annually with 10-50x return on investment.",
    date: "February 5, 2026",
    readTime: "12 min read",
    category: "Business Strategy",
    author: "Revive Team",
  },
  {
    slug: "stripe-payment-failure-codes-explained",
    title: "Stripe Payment Failure Codes Explained: Complete Reference Guide",
    description:
      "Understand every Stripe decline code, what causes them, and exactly how to respond. From card_declined to insufficient_funds — master payment failure handling.",
    date: "February 5, 2026",
    readTime: "15 min read",
    category: "Technical Guide",
    author: "Revive Team",
  },
  {
    slug: "true-cost-of-failed-payments",
    title: "The True Cost of Failed Payments: Beyond Lost Revenue",
    description:
      "Failed payments cost more than the invoice amount. Discover the hidden costs: customer support, churn, CAC loss, and reputation damage. Calculate your real cost.",
    date: "February 5, 2026",
    readTime: "10 min read",
    category: "Business Strategy",
    author: "Revive Team",
  },
  {
    slug: "churnkey-vs-baremetrics-vs-revive",
    title: "Churnkey vs Baremetrics vs Revive: Payment Recovery Comparison 2026",
    description:
      "Honest comparison of the top payment recovery tools for SaaS. Features, pricing, recovery rates, and which one is best for your business size and needs.",
    date: "February 5, 2026",
    readTime: "11 min read",
    category: "Comparisons",
    author: "Revive Team",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="mx-auto max-w-4xl px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              SaaS Payment Recovery Blog
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Proven strategies to reduce involuntary churn, recover failed
              payments, and protect your MRR.
            </p>
          </div>

          {/* Blog posts grid */}
          <div className="space-y-8">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block glass rounded-2xl p-8 hover:border-brand-500/20 transition-all group"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-medium">
                    {post.category}
                  </div>
                  <div className="text-xs text-zinc-500">
                    {post.date} · {post.readTime}
                  </div>
                </div>

                <h2 className="text-2xl font-bold tracking-tight mb-3 group-hover:text-brand-400 transition-colors">
                  {post.title}
                </h2>

                <p className="text-zinc-400 mb-4 leading-relaxed">
                  {post.description}
                </p>

                <div className="flex items-center gap-2 text-sm text-brand-400 font-medium">
                  Read article
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 glass rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-3">
              Ready to reduce involuntary churn?
            </h3>
            <p className="text-zinc-400 mb-6">
              Start recovering failed payments automatically in 3 minutes.
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-medium px-6 py-3 rounded-xl transition-all"
            >
              Get Started Free
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
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
