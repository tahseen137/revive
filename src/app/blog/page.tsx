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
    slug: "saas-subscription-pause-strategy",
    title: "Why SaaS Should Offer Pause (Not Just Cancel) for Failed Payments",
    description:
      "Offering a subscription pause instead of forcing cancellation recovers 2–3x more revenue from failed payments. Here's the psychology, the data, and the Stripe implementation guide.",
    date: "March 7, 2026",
    readTime: "7 min read",
    category: "Retention Strategy",
    author: "Revive Team",
  },
  {
    slug: "stripe-dunning-guide-saas",
    title: "The Complete Stripe Dunning Guide for SaaS Founders in 2026",
    description:
      "A practical Stripe dunning guide for SaaS founders: why 9-16% of cards fail monthly, how to set up retry logic and email sequences, and what actually recovers revenue.",
    date: "February 28, 2026",
    readTime: "9 min read",
    category: "Payment Recovery",
  },
  {
    slug: "saas-mrr-expansion-tactics",
    title: "5 SaaS MRR Expansion Tactics That Actually Work in 2026",
    description:
      "Most SaaS founders obsess over upsells and ignore the 5–9% of MRR leaking to failed payments. Here are 5 MRR expansion tactics that recover revenue you already earned.",
    date: "February 28, 2026",
    readTime: "10 min read",
    category: "Growth & Retention",
    author: "Revive Team",
  },
  {
    slug: "saas-churn-rate-vs-retention-rate",
    title: "Churn Rate vs Retention Rate: What Every SaaS Founder Gets Wrong",
    description:
      "Churn rate and retention rate look like mirrors of each other — they're not. Learn how they differ, why NRR matters more, and how failed payment recovery improves all three.",
    date: "February 28, 2026",
    readTime: "9 min read",
    category: "Growth & Retention",
    author: "Revive Team",
  },
  {
    slug: "stripe-dunning",
    title: "The Complete Guide to Stripe Dunning: How to Recover Failed Payments in 2026",
    description:
      "Learn what Stripe dunning is, where native Stripe tools fall short, and how smart retry strategies recover the 20-40% of SaaS revenue lost to involuntary churn.",
    date: "February 28, 2026",
    readTime: "8 min read",
    category: "Payment Recovery",
    author: "Revive Team",
  },
  {
    slug: "saas-subscriber-lifecycle-trial-to-churn",
    title: "The SaaS Subscriber Lifecycle: From Trial to Churn (and How to Keep Them)",
    description:
      "Map the full SaaS subscriber lifecycle — trial, new paid, active, at-risk, churned — with the biggest risk and best intervention at each stage.",
    date: "February 28, 2026",
    readTime: "10 min read",
    category: "Growth & Retention",
    author: "Revive Team",
  },
  {
    slug: "mrr-churn-calculator-how-much-are-you-losing",
    title: "How Much MRR Are You Losing to Churn? (Free Calculator)",
    description:
      "Interactive calculator shows your exact MRR loss from churn — including the recoverable slice from failed payments. Run your numbers.",
    date: "February 28, 2026",
    readTime: "8 min read",
    category: "Growth & Retention",
    author: "Revive Team",
  },
  {
    slug: "why-failed-payments-kill-saas-revenue",
    title: "Why Failed Payments Kill SaaS Revenue (And How to Stop It)",
    description:
      "Involuntary churn from failed payments accounts for 20–40% of SaaS churn. Learn how smart retry logic, dunning emails, and grace periods recover it.",
    date: "February 28, 2026",
    readTime: "7 min read",
    category: "Payment Recovery",
    author: "Revive Team",
  },
  {
    slug: "saas-churn-prevention-tactics-2026",
    title: "5 Proven Churn Prevention Tactics for SaaS in 2026",
    description:
      "Reduce SaaS churn by 30–50% with these five proven tactics: dunning automation, health scores, proactive CSM outreach, payment retry logic, and win-back campaigns.",
    date: "February 28, 2026",
    readTime: "9 min read",
    category: "Growth & Retention",
    author: "Revive Team",
  },
  {
    slug: "dunning-email-templates-7",
    title: "7 Dunning Email Templates That Recover Failed Payments",
    description:
      "Steal these 7 dunning email templates used by SaaS companies recovering 60-70% of failed payments. Full copy, subject lines, and timing for each template.",
    date: "February 27, 2026",
    readTime: "10 min read",
    category: "Payment Recovery",
    author: "Revive Team",
  },
  {
    slug: "stripe-webhooks-payment-recovery",
    title: "Building Payment Recovery with Stripe Webhooks: Complete Guide",
    description:
      "Build a complete Stripe payment recovery system: webhook setup, decline code routing, smart retry scheduling with BullMQ, and dunning email automation in Node.js.",
    date: "February 27, 2026",
    readTime: "15 min read",
    category: "Developer Guide",
    author: "Revive Team",
  },
  {
    slug: "saas-churn-metrics-2026",
    title: "SaaS Churn Metrics That Actually Matter in 2026 (With Benchmarks)",
    description:
      "The 6 churn metrics that drive decisions — NRR, involuntary churn rate, cohort retention, recovery rate — with formulas and 2026 benchmarks for SMB and enterprise SaaS.",
    date: "February 27, 2026",
    readTime: "12 min read",
    category: "Growth & Retention",
    author: "Revive Team",
  },
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
    slug: "stripe-decline-codes-guide",
    title: "Stripe Decline Code Guide: What Each Error Means + How to Fix It",
    description:
      "The top 15 Stripe decline codes decoded — insufficient_funds, do_not_honor, expired_card, authentication_required and more. Retry strategy and recovery playbook for each.",
    date: "March 7, 2026",
    readTime: "12 min read",
    category: "Technical Reference",
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
  {
    slug: "mrr-expansion",
    title: "How Payment Recovery Expands MRR for SaaS Businesses",
    description:
      "Payment failure is the most overlooked form of involuntary churn. Learn how smart payment recovery directly expands MRR by recovering 70–78% of failed payment revenue.",
    date: "February 28, 2026",
    readTime: "9 min read",
    category: "Business Strategy",
    author: "Revive Team",
  },
  {
    slug: "smart-retry-logic",
    title: "Stripe Smart Retries vs Custom Dunning Logic: What Actually Recovers More Revenue",
    description:
      "Honest comparison of Stripe Smart Retries vs custom dunning logic. With code examples and recovery rate data showing exactly what closes the gap from 40% to 78% recovery.",
    date: "February 28, 2026",
    readTime: "8 min read",
    category: "Technical Guide",
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
