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
    slug: "failed-payment-recovery-for-saas",
    title: "Failed Payment Recovery for SaaS: Smart Retries That Actually Work",
    description:
      "Most SaaS companies retry failed payments wrong. Discover the data-driven retry strategies that recover 94% of failed charges — without annoying customers.",
    date: "February 4, 2026",
    readTime: "10 min read",
    category: "Payment Recovery",
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
