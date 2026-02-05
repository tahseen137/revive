"use client";

import Link from "next/link";
import { useState } from "react";

// Demo data for the dashboard
const recoveryData = {
  totalRecovered: 12847.5,
  recoveryRate: 91.3,
  activeRetries: 23,
  failedThisMonth: 42,
  recoveredThisMonth: 34,
  pendingRetries: 8,
  mrr: 48500,
  churnPrevented: 3.2,
};

const recentPayments = [
  {
    id: "pi_1abc",
    customer: "Acme Corp",
    email: "billing@acme.co",
    amount: 299.0,
    status: "recovered",
    retries: 2,
    date: "2024-01-15",
  },
  {
    id: "pi_2def",
    customer: "TechStart Inc",
    email: "pay@techstart.io",
    amount: 149.0,
    status: "recovered",
    retries: 1,
    date: "2024-01-14",
  },
  {
    id: "pi_3ghi",
    customer: "DataFlow",
    email: "admin@dataflow.dev",
    amount: 79.0,
    status: "retrying",
    retries: 3,
    date: "2024-01-14",
  },
  {
    id: "pi_4jkl",
    customer: "CloudSync",
    email: "billing@cloudsync.app",
    amount: 199.0,
    status: "recovered",
    retries: 1,
    date: "2024-01-13",
  },
  {
    id: "pi_5mno",
    customer: "DevTools Pro",
    email: "team@devtools.pro",
    amount: 49.0,
    status: "dunning",
    retries: 4,
    date: "2024-01-13",
  },
  {
    id: "pi_6pqr",
    customer: "PixelPerfect",
    email: "hello@pixel.design",
    amount: 99.0,
    status: "failed",
    retries: 5,
    date: "2024-01-12",
  },
  {
    id: "pi_7stu",
    customer: "ScaleUp AI",
    email: "ops@scaleup.ai",
    amount: 499.0,
    status: "recovered",
    retries: 2,
    date: "2024-01-12",
  },
];

const statusColors: Record<string, string> = {
  recovered: "text-emerald-400 bg-emerald-400/10",
  retrying: "text-amber-400 bg-amber-400/10",
  dunning: "text-blue-400 bg-blue-400/10",
  failed: "text-red-400 bg-red-400/10",
};

const retrySchedule = [
  { day: "Day 1", time: "6:00 AM EST", strategy: "Soft retry" },
  { day: "Day 3", time: "10:00 AM EST", strategy: "Retry + Email #1" },
  { day: "Day 5", time: "2:00 PM EST", strategy: "Retry + Email #2" },
  { day: "Day 7", time: "9:00 AM EST", strategy: "Final retry + Urgent email" },
];

export default function DashboardPage() {
  const [connectLoading, setConnectLoading] = useState(false);

  const handleConnect = () => {
    setConnectLoading(true);
    window.location.href = "/api/connect";
  };

  return (
    <main className="min-h-screen bg-[#09090b]">
      {/* Dashboard Sidebar + Header */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 min-h-screen border-r border-white/5 bg-[#0a0a0c] p-6">
          <Link href="/" className="flex items-center gap-2 mb-10">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
            </div>
            <span className="text-lg font-semibold tracking-tight">Revive</span>
          </Link>

          <nav className="space-y-1 flex-1">
            {[
              {
                name: "Overview",
                icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
                active: true,
              },
              {
                name: "Payments",
                icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                active: false,
              },
              {
                name: "Dunning",
                icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                active: false,
              },
              {
                name: "Settings",
                icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
                active: false,
              },
            ].map((item) => (
              <button
                key={item.name}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  item.active
                    ? "bg-white/5 text-white"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02]"
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={item.icon} />
                </svg>
                {item.name}
              </button>
            ))}
          </nav>

          <div className="pt-6 border-t border-white/5">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-400 to-purple-500 flex items-center justify-center text-xs font-medium">
                JS
              </div>
              <div>
                <div className="text-sm font-medium">John Smith</div>
                <div className="text-xs text-zinc-500">Starter Plan</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-h-screen">
          {/* Top Bar */}
          <header className="border-b border-white/5 px-6 lg:px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">Dashboard</h1>
              <p className="text-sm text-zinc-500">
                Monitor your payment recovery in real-time
              </p>
            </div>
            <button
              onClick={handleConnect}
              disabled={connectLoading}
              className="flex items-center gap-2 bg-[#635bff] hover:bg-[#5851db] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors disabled:opacity-50"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
              </svg>
              {connectLoading ? "Connecting..." : "Connect Stripe"}
            </button>
          </header>

          {/* Dashboard Content */}
          <div className="p-6 lg:p-8 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass rounded-xl p-6">
                <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2">
                  Total Recovered
                </div>
                <div className="text-2xl font-bold text-emerald-400">
                  ${recoveryData.totalRecovered.toLocaleString()}
                </div>
                <div className="text-xs text-emerald-500/70 mt-1">
                  ↑ 23% from last month
                </div>
              </div>

              <div className="glass rounded-xl p-6">
                <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2">
                  Recovery Rate
                </div>
                <div className="text-2xl font-bold text-white">
                  {recoveryData.recoveryRate}%
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-1.5 mt-3">
                  <div
                    className="bg-brand-500 h-1.5 rounded-full"
                    style={{ width: `${recoveryData.recoveryRate}%` }}
                  />
                </div>
              </div>

              <div className="glass rounded-xl p-6">
                <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2">
                  Active Retries
                </div>
                <div className="text-2xl font-bold text-amber-400">
                  {recoveryData.activeRetries}
                </div>
                <div className="text-xs text-zinc-500 mt-1">
                  {recoveryData.pendingRetries} pending
                </div>
              </div>

              <div className="glass rounded-xl p-6">
                <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2">
                  Churn Prevented
                </div>
                <div className="text-2xl font-bold text-brand-400">
                  {recoveryData.churnPrevented}%
                </div>
                <div className="text-xs text-zinc-500 mt-1">
                  of MRR saved this month
                </div>
              </div>
            </div>

            {/* Recovery chart placeholder + retry schedule */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chart */}
              <div className="lg:col-span-2 glass rounded-xl p-6">
                <h3 className="font-medium mb-6">Recovery Trend (Last 30 Days)</h3>
                <div className="h-64 flex items-end gap-1">
                  {Array.from({ length: 30 }, (_, i) => {
                    const height = 20 + Math.random() * 80;
                    const isRecovered = Math.random() > 0.3;
                    return (
                      <div
                        key={i}
                        className="flex-1 rounded-t-sm transition-all hover:opacity-80"
                        style={{
                          height: `${height}%`,
                          backgroundColor: isRecovered
                            ? "rgba(52, 211, 153, 0.5)"
                            : "rgba(239, 68, 68, 0.3)",
                        }}
                        title={`Day ${i + 1}: ${isRecovered ? "Recovered" : "Failed"}`}
                      />
                    );
                  })}
                </div>
                <div className="flex items-center gap-6 mt-4 text-xs text-zinc-500">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-400/50" />
                    Recovered
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-400/30" />
                    Failed
                  </div>
                </div>
              </div>

              {/* Retry Schedule */}
              <div className="glass rounded-xl p-6">
                <h3 className="font-medium mb-4">Retry Schedule</h3>
                <div className="space-y-4">
                  {retrySchedule.map((retry, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1 h-2 w-2 rounded-full bg-brand-500 shrink-0" />
                      <div>
                        <div className="text-sm font-medium">{retry.day}</div>
                        <div className="text-xs text-zinc-500">
                          {retry.time} — {retry.strategy}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 text-xs text-brand-400 hover:text-brand-300 transition-colors py-2 border border-brand-500/20 rounded-lg">
                  Customize Schedule →
                </button>
              </div>
            </div>

            {/* Recent Payments Table */}
            <div className="glass rounded-xl overflow-hidden">
              <div className="p-6 border-b border-white/5">
                <h3 className="font-medium">Recent Failed Payments</h3>
                <p className="text-xs text-zinc-500 mt-1">
                  Showing {recentPayments.length} most recent payment recovery
                  attempts
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left text-xs text-zinc-500 font-medium px-6 py-3">
                        Customer
                      </th>
                      <th className="text-left text-xs text-zinc-500 font-medium px-6 py-3">
                        Amount
                      </th>
                      <th className="text-left text-xs text-zinc-500 font-medium px-6 py-3">
                        Status
                      </th>
                      <th className="text-left text-xs text-zinc-500 font-medium px-6 py-3">
                        Retries
                      </th>
                      <th className="text-left text-xs text-zinc-500 font-medium px-6 py-3">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentPayments.map((payment) => (
                      <tr
                        key={payment.id}
                        className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="font-medium">{payment.customer}</div>
                          <div className="text-xs text-zinc-500">
                            {payment.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-mono">
                          ${payment.amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              statusColors[payment.status]
                            }`}
                          >
                            {payment.status.charAt(0).toUpperCase() +
                              payment.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-zinc-400">
                          {payment.retries}x
                        </td>
                        <td className="px-6 py-4 text-zinc-500">
                          {payment.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
