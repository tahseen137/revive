"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const reasons = [
  {
    emoji: "🏆",
    title: "First Churn Tool on PH in 2026",
    description:
      "The Customer Success category on Product Hunt has zero launches in 2026. We're going first — and we need your support to make it count.",
    accent: "from-yellow-500/20 to-amber-500/10 border-yellow-500/30",
    iconBg: "bg-yellow-500/10 text-yellow-400",
  },
  {
    emoji: "💰",
    title: "80% Cheaper Than Alternatives",
    description:
      "$49/mo vs ChurnKey's $250+. We're not just cheaper — we have no revenue tax either. Keep every dollar you recover.",
    accent: "from-green-500/20 to-emerald-500/10 border-green-500/30",
    iconBg: "bg-green-500/10 text-green-400",
  },
  {
    emoji: "🌐",
    title: "Works Everywhere",
    description:
      "Stripe, Lemon Squeezy, Gumroad, Paddle, Polar.sh. The only churn tool that doesn't require you to use Stripe.",
    accent: "from-brand-600/20 to-brand-700/10 border-brand-600/30",
    iconBg: "bg-brand-600/10 text-brand-400",
  },
];

export default function LaunchPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase().trim(), source: "launch-page" }),
      });

      const data = await res.json();

      if (res.ok || res.status === 200 || res.status === 201) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(data?.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden pt-24 pb-20 px-4">
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-600/10 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-600/15 border border-brand-600/30 text-brand-400 text-sm font-medium mb-8">
              <span>🚀</span>
              <span>Launching on Product Hunt — Join the Waitlist</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
              The churn tool indie founders
              <br />
              <span className="text-brand-400">have been waiting for</span>
            </h1>

            <p className="text-2xl font-semibold text-zinc-300 mb-6">
              $49/mo. No revenue share. Works with Lemon Squeezy.
            </p>

            <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
              Every churn tool on the market starts at $250/mo and only works with Stripe. We built
              Revive for the other 90% of indie founders — the ones using Lemon Squeezy, Gumroad,
              and Paddle. Launching on Product Hunt soon.
            </p>

            {/* Urgency pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/80 border border-zinc-700/60 text-zinc-300 text-sm mb-10">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Target launch: <strong className="text-white">This week</strong>
            </div>

            {/* Email form */}
            <div ref={formRef}>
              {status === "success" ? (
                <div className="max-w-md mx-auto rounded-2xl bg-green-500/10 border border-green-500/30 px-6 py-5 text-center">
                  <div className="text-3xl mb-2">🎉</div>
                  <p className="text-green-400 font-semibold text-lg">
                    You&apos;re on the list!
                  </p>
                  <p className="text-zinc-400 text-sm mt-1">
                    We&apos;ll notify you on launch day.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="max-w-md mx-auto flex flex-col sm:flex-row gap-3"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email for launch day notification"
                    className="flex-1 px-4 py-3 rounded-xl bg-zinc-800/80 border border-zinc-700/60 text-white placeholder:text-zinc-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold whitespace-nowrap transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Adding…
                      </span>
                    ) : (
                      "Notify Me on Launch Day 🔔"
                    )}
                  </button>
                </form>
              )}

              {status === "error" && (
                <p className="mt-3 text-red-400 text-sm text-center">{errorMsg}</p>
              )}

              {status !== "success" && (
                <p className="mt-3 text-zinc-500 text-sm">
                  No spam. Just one email when we go live on Product Hunt.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ── Social Proof Strip ── */}
        <section className="py-6 border-y border-zinc-800/60 bg-zinc-900/40">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3">
              <div className="flex -space-x-2">
                {["🧑‍💻", "👩‍💻", "🧑‍🚀", "👨‍💻", "🧑‍🎨"].map((emoji, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-zinc-700 border-2 border-zinc-950 flex items-center justify-center text-sm"
                  >
                    {emoji}
                  </div>
                ))}
              </div>
              <p className="text-zinc-300 font-medium">
                Join <span className="text-white font-bold">100+</span> indie founders who&apos;ve already signed up
              </p>
            </div>
          </div>
        </section>

        {/* ── 3 Reasons ── */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3">3 Reasons to Support Our Launch</h2>
              <p className="text-zinc-400 text-lg">Why Revive is different — and why now matters</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reasons.map((reason) => (
                <div
                  key={reason.title}
                  className={`relative rounded-2xl bg-gradient-to-br ${reason.accent} border p-6 backdrop-blur-sm`}
                >
                  <div className={`w-12 h-12 rounded-xl ${reason.iconBg} flex items-center justify-center text-2xl mb-4`}>
                    {reason.emoji}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{reason.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{reason.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Comparison callout ── */}
        <section className="py-16 px-4 bg-zinc-900/40 border-y border-zinc-800/60">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8">
              Revive vs. The Competition
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-700/60">
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium">Feature</th>
                    <th className="py-3 px-4 text-brand-400 font-semibold">Revive</th>
                    <th className="py-3 px-4 text-zinc-400 font-medium">ChurnKey / Recover</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {[
                    ["Price", "$49/mo flat", "$250+/mo"],
                    ["Revenue share", "None ✅", "Up to 0.5% ❌"],
                    ["Lemon Squeezy", "✅ Supported", "❌ Stripe only"],
                    ["Gumroad", "✅ Supported", "❌ Stripe only"],
                    ["Paddle", "✅ Supported", "❌ Stripe only"],
                    ["Agentic recovery", "✅ Acts for you", "📊 Shows dashboards"],
                  ].map(([feature, revive, competitor]) => (
                    <tr key={feature} className="hover:bg-zinc-800/30 transition">
                      <td className="py-3 px-4 text-left text-zinc-300">{feature}</td>
                      <td className="py-3 px-4 text-green-400 font-medium">{revive}</td>
                      <td className="py-3 px-4 text-zinc-500">{competitor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="py-20 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800/60 px-8 py-12 backdrop-blur-sm">
              <div className="text-4xl mb-4">🚀</div>
              <h2 className="text-3xl font-bold mb-3">Be the first to know</h2>
              <p className="text-zinc-400 mb-8">
                Get notified the moment we launch on Product Hunt — and be first in line to upvote us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={scrollToForm}
                  className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold transition"
                >
                  Get Launch Day Notification 🔔
                </button>
                <Link
                  href="/api/connect"
                  className="px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700/60 text-white font-semibold transition"
                >
                  Try Revive Free Now →
                </Link>
              </div>
              <p className="mt-6 text-zinc-600 text-sm">
                No spam. Just one email when we go live.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
