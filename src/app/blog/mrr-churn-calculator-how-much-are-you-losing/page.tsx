"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogPost() {
  const [customers, setCustomers] = useState(100);
  const [churnRate, setChurnRate] = useState(5);
  const [avgRevenue, setAvgRevenue] = useState(49);

  const monthlyChurned = Math.round(customers * (churnRate / 100));
  const mrrLost = monthlyChurned * avgRevenue;
  const annualLost = mrrLost * 12;
  const involuntaryChurnMrr = Math.round(mrrLost * 0.30);
  const recoverableMrr = Math.round(involuntaryChurnMrr * 0.65);

  return (
    <main className="min-h-screen">
      <Navbar />

      <article className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="mx-auto max-w-3xl px-6">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-medium">
                Growth & Retention
              </div>
              <span className="text-sm text-zinc-500">February 28, 2026</span>
              <span className="text-zinc-600">·</span>
              <span className="text-sm text-zinc-500">8 min read</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
              How Much MRR Are You Losing to Churn? (Free Calculator)
            </h1>

            <p className="text-xl text-zinc-400 leading-relaxed">
              Most SaaS founders know their churn rate. Few have done the math on how much it actually costs in MRR — especially the slice that&apos;s recoverable. Run your numbers below.
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="glass rounded-2xl p-8 border border-zinc-700/50 mb-12">
            <h2 className="text-xl font-bold text-white mb-6">Your Churn Cost Calculator</h2>

            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  Total customers: <span className="text-white font-bold">{customers.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min="10"
                  max="5000"
                  step="10"
                  value={customers}
                  onChange={(e) => setCustomers(Number(e.target.value))}
                  className="w-full accent-brand-500"
                />
                <div className="flex justify-between text-xs text-zinc-600 mt-1">
                  <span>10</span><span>5,000</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  Monthly churn rate: <span className="text-white font-bold">{churnRate}%</span>
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="20"
                  step="0.5"
                  value={churnRate}
                  onChange={(e) => setChurnRate(Number(e.target.value))}
                  className="w-full accent-brand-500"
                />
                <div className="flex justify-between text-xs text-zinc-600 mt-1">
                  <span>0.5%</span><span>20%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  Average revenue per customer (MRR): <span className="text-white font-bold">${avgRevenue}</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="1000"
                  step="5"
                  value={avgRevenue}
                  onChange={(e) => setAvgRevenue(Number(e.target.value))}
                  className="w-full accent-brand-500"
                />
                <div className="flex justify-between text-xs text-zinc-600 mt-1">
                  <span>$5</span><span>$1,000</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass rounded-xl p-4 text-center">
                <p className="text-xs text-zinc-500 mb-1">Customers churned/mo</p>
                <p className="text-2xl font-bold text-white">{monthlyChurned}</p>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <p className="text-xs text-zinc-500 mb-1">MRR lost/mo</p>
                <p className="text-2xl font-bold text-red-400">${mrrLost.toLocaleString()}</p>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <p className="text-xs text-zinc-500 mb-1">Annual revenue lost</p>
                <p className="text-2xl font-bold text-red-400">${annualLost.toLocaleString()}</p>
              </div>
              <div className="glass rounded-xl p-4 text-center border border-brand-500/30">
                <p className="text-xs text-zinc-500 mb-1">Recoverable/mo*</p>
                <p className="text-2xl font-bold text-brand-400">${recoverableMrr.toLocaleString()}</p>
              </div>
            </div>

            <p className="text-xs text-zinc-600 mt-4">
              *Recoverable MRR assumes 30% of churn is involuntary (failed payments) and a 65% payment recovery rate with smart dunning. Actual results vary.
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-zinc max-w-none">
            <div className="text-zinc-300 space-y-6 leading-relaxed">

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                The Math Most Founders Never Do
              </h2>

              <p>
                A 5% monthly churn rate sounds manageable in isolation. But watch what that number actually means:
              </p>

              <div className="glass rounded-xl p-6 my-6 border border-zinc-700/50">
                <p className="text-sm text-zinc-400 mb-4 font-medium uppercase tracking-wide">Worked Example: 100 customers × 5% churn × $49 avg</p>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Customers churned per month</span>
                    <span className="text-white font-semibold">5 customers</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">MRR lost per month</span>
                    <span className="text-red-400 font-semibold">$245</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">MRR lost per year</span>
                    <span className="text-red-400 font-semibold">$2,940</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-zinc-700 pt-3">
                    <span className="text-zinc-400">Customers needed to grow 10% with 5% churn</span>
                    <span className="text-white font-semibold">15 new/month</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Customers needed to grow 10% with 1% churn</span>
                    <span className="text-brand-400 font-semibold">11 new/month</span>
                  </div>
                </div>
              </div>

              <p>
                At 5% churn, you need 15 new customers per month just to grow 10%. At 1% churn, you need 11. That&apos;s 36% more sales activity needed — every month — to achieve the same growth rate. Churn isn&apos;t just about the customers you&apos;re losing. It&apos;s a tax on every new customer you acquire.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                The Recoverable Slice Nobody Counts
              </h2>

              <p>
                Here&apos;s where it gets interesting. Of your total churn, roughly 20–40% is <strong className="text-white">involuntary</strong> — customers who churned because of a failed payment, not because they wanted to leave.
              </p>

              <p>
                Their card expired. Their bank blocked an unfamiliar subscription charge. They temporarily exceeded their card limit. They got a new card and forgot to update it. These are not customers who evaluated your product and decided to leave. They&apos;re customers who got administratively removed.
              </p>

              <div className="glass rounded-xl p-6 my-6 border-l-4 border-yellow-500/50">
                <p className="text-sm text-zinc-400 mb-2 font-medium uppercase tracking-wide">The Real Cost of Involuntary Churn</p>
                <p className="text-white">
                  On $10,000 MRR, involuntary churn costs you $600–$1,000/month. At $50K MRR, that&apos;s $3,000–$5,000 walking out the door in customers who didn&apos;t actually want to leave. Most of it is recoverable.
                </p>
              </div>

              <p>
                A proper dunning system — smart payment retries, personalized email sequences, in-app payment alerts — recovers 60–75% of failed payments before they become permanent churn. The math: at $10K MRR with 30% involuntary churn, that&apos;s $3K at risk per month. Recovering 65% of it = $1,950 saved per month, $23,400/year.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Why 5% Monthly Churn Is an Emergency
              </h2>

              <p>
                Most SaaS benchmarks cite &quot;good&quot; churn at 1–2% monthly and &quot;acceptable&quot; at 3–5%. But those numbers hide a brutal compounding reality.
              </p>

              <div className="overflow-x-auto my-6">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-700">
                      <th className="text-left py-3 pr-4 text-zinc-400 font-medium">Monthly Churn</th>
                      <th className="text-left py-3 pr-4 text-zinc-400 font-medium">Annual Churn</th>
                      <th className="text-left py-3 text-zinc-400 font-medium">Customers Left After 12 Months*</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    <tr>
                      <td className="py-3 pr-4 text-white font-semibold">1%</td>
                      <td className="py-3 pr-4 text-zinc-300">~11.4%</td>
                      <td className="py-3 text-green-400">~89 of 100</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-white font-semibold">2%</td>
                      <td className="py-3 pr-4 text-zinc-300">~21.5%</td>
                      <td className="py-3 text-yellow-400">~79 of 100</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-white font-semibold">5%</td>
                      <td className="py-3 pr-4 text-zinc-300">~46%</td>
                      <td className="py-3 text-orange-400">~54 of 100</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-white font-semibold">10%</td>
                      <td className="py-3 pr-4 text-zinc-300">~72%</td>
                      <td className="py-3 text-red-400">~28 of 100</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-zinc-600">*Without new customer acquisition</p>

              <p>
                At 5% monthly churn, you replace your entire customer base roughly every 20 months. You&apos;re not building a company — you&apos;re running a treadmill.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                The Highest-ROI Churn Fix: Involuntary Recovery First
              </h2>

              <p>Reducing voluntary churn requires product work, CS investment, or pricing experiments. Those take months and have uncertain outcomes.</p>

              <p>
                Reducing involuntary churn requires infrastructure. Smart payment retries, a dunning email sequence, in-app alerts. You can implement it in a week, see results in the first month, and it runs automatically from there.
              </p>

              <p><strong className="text-white">The ROI calculation is unusually clean:</strong></p>

              <div className="glass rounded-xl p-6 my-6 border border-zinc-700/50">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Your MRR</span>
                    <span className="text-white">$50,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Payment failure rate (~3%)</span>
                    <span className="text-white">$1,500/mo at risk</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Without dunning (30% recovery)</span>
                    <span className="text-red-400">$1,050/mo lost</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">With Revive (70% recovery)</span>
                    <span className="text-green-400">$450/mo lost</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-zinc-700 pt-3">
                    <span className="text-white font-semibold">Net MRR saved</span>
                    <span className="text-brand-400 font-bold">+$600/mo</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold">Annual impact</span>
                    <span className="text-brand-400 font-bold">+$7,200/year</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Cost of Revive</span>
                    <span className="text-zinc-300">$49/month flat</span>
                  </div>
                </div>
              </div>

              <p>
                The first recovered payment more than covers the monthly cost. Everything after that is pure recovered revenue.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                What to Do With Your Number
              </h2>

              <p>
                Pull up your calculator result above and look at the &quot;Recoverable/mo&quot; figure. That&apos;s the revenue sitting on the table right now — customers who didn&apos;t want to leave, failed payments you didn&apos;t recover.
              </p>

              <p>
                If that number is under $200, your involuntary churn problem is small enough that manual processes might suffice. Check your Stripe payment logs monthly and email failed payments manually.
              </p>

              <p>
                If it&apos;s over $200/month, the automation ROI is clear. Set up smart retries, build a dunning sequence, add an in-app alert for users in grace periods — or use a tool that does all three out of the box.
              </p>

              <p>
                Either way: know the number. Churn you can&apos;t measure, you can&apos;t manage.
              </p>

              <div className="mt-10 p-6 rounded-xl bg-brand-500/10 border border-brand-500/20">
                <p className="text-white font-semibold mb-2">Start recovering your involuntary churn</p>
                <p className="text-zinc-400 text-sm mb-4">
                  Revive connects to Stripe and handles smart retries, dunning emails, and in-app alerts automatically. Flat $49/month — most customers recover the cost in the first week.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-brand-500 text-white text-sm font-medium hover:bg-brand-400 transition-colors"
                  >
                    Start free with Revive →
                  </Link>
                  <Link
                    href="/calculator"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-zinc-600 text-zinc-300 text-sm font-medium hover:border-zinc-500 hover:text-white transition-colors"
                  >
                    Full revenue recovery calculator
                  </Link>
                </div>
              </div>

              <p className="text-sm text-zinc-500 mt-8">
                Related reading:{" "}
                <Link href="/blog/why-failed-payments-kill-saas-revenue" className="text-brand-400 hover:text-brand-300">
                  Why Failed Payments Kill SaaS Revenue
                </Link>
                {" · "}
                <Link href="/blog/saas-churn-metrics-2026" className="text-brand-400 hover:text-brand-300">
                  SaaS Churn Metrics That Actually Matter in 2026
                </Link>
                {" · "}
                <Link href="/blog/saas-churn-prevention-tactics-2026" className="text-brand-400 hover:text-brand-300">
                  5 Proven Churn Prevention Tactics for SaaS
                </Link>
              </p>

              <div className="mt-8 pt-8 border-t border-zinc-800">
                <p className="text-sm text-zinc-500">
                  <strong className="text-zinc-400">About Revive:</strong> Payment recovery automation for SaaS. Smart retries, dunning emails, and in-app alerts. $49/mo flat, no revenue share.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-zinc-800">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to blog
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
