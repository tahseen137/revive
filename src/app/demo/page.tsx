"use client";

import Link from "next/link";
import { useState } from "react";
import { MOCK_PAYMENTS, MOCK_STATS, MOCK_TREND, MOCK_ACTIVITY, type MockPayment } from "@/lib/mock-data";

// ============ Utilities (mirror dashboard) ============

const maskEmail = (email: string): string => {
  if (!email || !email.includes("@")) return email;
  const [local, domain] = email.split("@");
  if (local.length <= 2) return `${local[0]}***@${domain}`;
  return `${local[0]}***@${domain}`;
};

const getStatusIcon = (status: string): string => {
  const icons: Record<string, string> = {
    recovered: "✅",
    retrying: "🔄",
    pending: "🔄",
    dunning: "📧",
    failed: "❌",
    expired_card: "❌",
  };
  return icons[status] || "⏸️";
};

const statusColors: Record<string, string> = {
  recovered: "text-emerald-400 bg-emerald-400/10",
  retrying: "text-amber-400 bg-amber-400/10",
  pending: "text-blue-400 bg-blue-400/10",
  dunning: "text-orange-400 bg-orange-400/10",
  failed: "text-red-400 bg-red-400/10",
  expired_card: "text-red-400 bg-red-400/10",
};

const statusLabels: Record<string, string> = {
  recovered: "Recovered",
  retrying: "Retrying",
  pending: "Pending",
  dunning: "Dunning",
  failed: "Failed",
  expired_card: "Expired Card",
};

const maxTrendValue = Math.max(...MOCK_TREND.map((d) => d.amount), 1);

// ============ Demo Page ============

export default function DemoPage() {
  const [selectedPayment, setSelectedPayment] = useState<MockPayment | null>(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = (p: MockPayment) => {
    setSelectedPayment(p);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedPayment(null), 300);
  };

  return (
    <main className="min-h-screen bg-[#09090b]">
      <div className="flex">
        {/* ── Sidebar (mirrors real dashboard) ── */}
        <aside className="hidden lg:flex flex-col w-64 min-h-screen border-r border-white/5 bg-[#0a0a0c] p-6">
          <Link href="/" className="flex items-center gap-2 mb-10">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
            </div>
            <span className="text-lg font-semibold tracking-tight">Revive</span>
          </Link>

          <nav className="space-y-1 flex-1">
            <Link href="/demo" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm bg-white/5 text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Overview
            </Link>
            <Link href="/demo#analytics" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Analytics
            </Link>
            <Link href="/demo#payments" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Payments
            </Link>
            <Link href="/demo#emails" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Emails
            </Link>
            <Link href="/demo" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </Link>
          </nav>

          <div className="pt-6 border-t border-white/5">
            <div className="flex items-center gap-2 text-xs text-zinc-600">
              <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
              Demo Mode
            </div>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <div className="flex-1 min-h-screen">
          {/* Top Bar */}
          <header className="border-b border-white/5 px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-semibold">Dashboard</h1>
              <p className="text-sm text-zinc-500">
                Monitoring {MOCK_STATS.totalPayments} payments &bull; {MOCK_STATS.recoveryRate}% recovery rate
              </p>
            </div>
            <Link
              href="/api/connect"
              className="flex items-center gap-2 bg-[#635bff] hover:bg-[#5851db] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors shadow-lg shadow-[#635bff]/20"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
              </svg>
              Connect Stripe
            </Link>
          </header>

          {/* ── Page Body ── */}
          <div className="p-6 lg:p-8 space-y-6">

            {/* ── Demo Banner ── */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-amber-500/8 via-amber-400/5 to-orange-500/8 border border-amber-500/20 rounded-xl px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="text-amber-400 flex-shrink-0">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </span>
                <p className="text-sm text-amber-200/90">
                  <span className="font-semibold text-amber-300">This is demo data.</span>{" "}
                  Connect your Stripe to see your real numbers.
                </p>
              </div>
              <Link
                href="/api/connect"
                className="flex-shrink-0 inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Connect Stripe →
              </Link>
            </div>

            {/* ── 4 Metric Cards ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Total Recovered */}
              <div className="glass rounded-xl p-6 hover:border-brand-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/10 group">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Total Revenue Recovered</div>
                  <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold text-emerald-400 mb-1">
                  ${MOCK_STATS.totalRecovered.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="text-xs text-zinc-500">
                  All time &bull; {MOCK_STATS.recoveredThisMonth} payments recovered
                </div>
              </div>

              {/* Recovery Rate */}
              <div className="glass rounded-xl p-6 hover:border-brand-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/10 group">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Recovery Rate</div>
                  <div className="h-8 w-8 rounded-lg bg-brand-500/10 flex items-center justify-center group-hover:bg-brand-500/20 transition-colors">
                    <svg className="w-4 h-4 text-brand-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {MOCK_STATS.recoveryRate}%
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-2 mt-2">
                  <div
                    className="bg-gradient-to-r from-brand-500 to-brand-400 h-2 rounded-full"
                    style={{ width: `${MOCK_STATS.recoveryRate}%` }}
                  />
                </div>
              </div>

              {/* Active Failed Payments */}
              <div className="glass rounded-xl p-6 hover:border-brand-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/10 group">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Active Failed Payments</div>
                  <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                    <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold text-amber-400 mb-1">
                  {MOCK_STATS.activeRetries}
                </div>
                <div className="text-xs text-zinc-500">
                  Currently being retried &bull; {MOCK_STATS.dunningCount} in dunning
                </div>
              </div>

              {/* Money Saved This Month */}
              <div className="glass rounded-xl p-6 hover:border-brand-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/10 group">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Recovered This Month</div>
                  <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold text-purple-400 mb-1">
                  ${MOCK_STATS.mrrSaved.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="text-xs text-zinc-500">
                  MRR saved &bull; {MOCK_STATS.churnPrevented}% churn prevented
                </div>
              </div>
            </div>

            {/* ── Chart + Activity ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="analytics">
              {/* Recovery Timeline Chart */}
              <div className="lg:col-span-2 glass rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-medium">Recovery Timeline (Last 30 Days)</h3>
                    <p className="text-xs text-zinc-500 mt-1">Hover over bars to see details</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <div className="h-3 w-3 rounded bg-gradient-to-t from-emerald-500/60 to-emerald-400/40" />
                    Recovered
                  </div>
                </div>
                <div className="h-64 flex items-end gap-1">
                  {MOCK_TREND.map((day, i) => {
                    const height = day.amount > 0 ? (day.amount / maxTrendValue) * 100 : 2;
                    return (
                      <div
                        key={i}
                        className="flex-1 rounded-t transition-all hover:opacity-80 relative group cursor-pointer"
                        style={{
                          height: `${Math.max(height, 2)}%`,
                          background: day.amount > 0
                            ? "linear-gradient(to top, rgba(52,211,153,0.6), rgba(52,211,153,0.3))"
                            : "rgba(63,63,70,0.2)",
                        }}
                      >
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-zinc-800 text-xs text-white px-3 py-2 rounded-lg whitespace-nowrap z-10 shadow-xl border border-white/10">
                          <div className="font-medium mb-1">{day.date}</div>
                          <div className="text-emerald-400">${day.amount.toFixed(2)} recovered</div>
                          <div className="text-zinc-400">{day.recovered} payments</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 text-xs text-zinc-500 text-center">Hover over bars for details</div>
              </div>

              {/* Quick Actions (mirror real dashboard) */}
              <div className="glass rounded-xl p-6">
                <h3 className="font-medium mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-brand-500/10 border border-brand-500/20 hover:bg-brand-500/20 hover:border-brand-500/30 text-brand-400 transition-all duration-200 group">
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-sm font-medium">Retry All Failed</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 hover:border-purple-500/30 text-purple-400 transition-all duration-200 group">
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-sm font-medium">Send Dunning Emails</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/30 text-emerald-400 transition-all duration-200 group">
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-sm font-medium">Export CSV</span>
                  </button>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5">
                  {/* Live Activity */}
                  <h4 className="text-xs text-zinc-500 uppercase tracking-wider font-medium mb-3 flex items-center gap-2">
                    Live Activity
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </h4>
                  <div className="space-y-3">
                    {MOCK_ACTIVITY.slice(0, 4).map((a, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs">
                        <span className="flex-shrink-0">{a.icon}</span>
                        <div>
                          <p className="text-zinc-400 leading-snug">{a.message}</p>
                          <p className="text-zinc-600 mt-0.5">{a.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Recent Activity (5 demo payments) ── */}
            <div className="glass rounded-xl overflow-hidden" id="payments">
              <div className="p-6 border-b border-white/5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Recent Activity</h3>
                    <p className="text-xs text-zinc-500 mt-1">
                      Click any payment to see the full recovery timeline
                    </p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 font-medium border border-purple-500/20">
                    Demo Data
                  </span>
                </div>
              </div>

              <div className="divide-y divide-white/5">
                {MOCK_PAYMENTS.map((payment) => (
                  <div
                    key={payment.id}
                    onClick={() => openModal(payment)}
                    className="p-6 hover:bg-white/[0.02] transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-2xl flex-shrink-0 mt-1">
                        {getStatusIcon(payment.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <div className="font-medium text-white">{payment.customer}</div>
                            <div className="text-sm text-zinc-500">{maskEmail(payment.email)}</div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="font-mono font-semibold text-white">${payment.amount.toFixed(2)}</div>
                            <div className="text-xs text-zinc-500">{payment.date}</div>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full font-medium ${statusColors[payment.status] || "text-zinc-400 bg-zinc-400/10"}`}>
                            {statusLabels[payment.status] || payment.status}
                          </span>
                          <span className="text-zinc-500">{payment.failureReasonDisplay}</span>
                          <span className="text-zinc-600">•</span>
                          <span className="text-zinc-400">
                            {payment.retries > 0
                              ? `${payment.retries} ${payment.retries === 1 ? "retry" : "retries"}`
                              : "No retries yet"}
                          </span>
                          {payment.emailsSent > 0 && (
                            <>
                              <span className="text-zinc-600">•</span>
                              <span className="text-zinc-400">
                                📧 {payment.emailsSent} {payment.emailsSent === 1 ? "email" : "emails"} sent
                              </span>
                            </>
                          )}
                        </div>
                        {payment.notes && (
                          <div className="mt-2 text-xs text-brand-400 bg-brand-500/5 px-3 py-1.5 rounded-lg inline-block">
                            {payment.notes}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Bottom CTA ── */}
            <div className="glass rounded-2xl p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-600/5 via-transparent to-purple-600/5" />
              <div className="relative">
                <h3 className="text-xl font-semibold mb-2">Ready to see your real numbers?</h3>
                <p className="text-zinc-400 text-sm max-w-md mx-auto mb-6">
                  Connect your Stripe account and we&apos;ll instantly show you how much you&apos;ve lost to failed payments — and start recovering it automatically.
                </p>
                <Link
                  href="/api/connect"
                  className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:shadow-lg hover:shadow-brand-600/25"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
                  </svg>
                  Connect Stripe — It&apos;s Free
                </Link>
                <p className="text-xs text-zinc-600 mt-3">
                  🔒 Read-only access via Stripe OAuth. 5-minute setup. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Payment Timeline Modal ── */}
      {showModal && selectedPayment && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="glass rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#09090b]/95 backdrop-blur-xl border-b border-white/10 p-6 z-10">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{selectedPayment.customer}</h3>
                  <p className="text-sm text-zinc-500">{maskEmail(selectedPayment.email)}</p>
                </div>
                <button onClick={closeModal} className="text-zinc-500 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <span className={`inline-flex items-center px-3 py-1.5 rounded-full font-medium text-sm ${statusColors[selectedPayment.status]}`}>
                  {getStatusIcon(selectedPayment.status)} {statusLabels[selectedPayment.status]}
                </span>
                <span className="text-2xl font-bold text-white">${selectedPayment.amount.toFixed(2)}</span>
                <span className="text-sm text-zinc-500">{selectedPayment.failureReasonDisplay}</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="p-6">
              {selectedPayment.retryTimeline && selectedPayment.retryTimeline.length > 0 ? (
                <div className="space-y-0">
                  <h4 className="font-medium text-sm text-zinc-400 uppercase tracking-wider mb-6">Recovery Timeline</h4>
                  {selectedPayment.retryTimeline.map((event, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center text-base ${
                          event.type === "recovered" ? "bg-emerald-500/20 text-emerald-400" :
                          event.type === "failed" ? "bg-red-500/20 text-red-400" :
                          event.type === "retry" && event.success ? "bg-emerald-500/20" :
                          event.type === "retry" ? "bg-amber-500/20" :
                          event.type === "email" ? "bg-blue-500/20" :
                          event.type === "dunning" ? "bg-orange-500/20" :
                          "bg-purple-500/20"
                        }`}>
                          {event.type === "recovered" && "✅"}
                          {event.type === "failed" && "❌"}
                          {event.type === "retry" && (event.success ? "✅" : "🔄")}
                          {event.type === "email" && "📧"}
                          {event.type === "dunning" && "⚠️"}
                          {event.type === "card_updated" && "💳"}
                        </div>
                        {i < selectedPayment.retryTimeline!.length - 1 && (
                          <div className="w-0.5 flex-1 bg-white/10 my-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="text-sm text-white font-medium mb-1">{event.description}</div>
                        <div className="text-xs text-zinc-500">
                          {new Date(event.timestamp).toLocaleString("en-US", {
                            month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
                          })}
                        </div>
                        {event.amount && (
                          <div className="text-sm text-brand-400 mt-1 font-mono">${event.amount.toFixed(2)}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-zinc-500 py-8">No timeline events yet.</p>
              )}
            </div>

            {/* Modal Footer CTA */}
            <div className="border-t border-white/10 p-6 bg-brand-500/5">
              <p className="text-sm text-zinc-400 mb-4">
                This is demo data. Connect your Stripe account to see real recovery timelines for your customers.
              </p>
              <Link
                href="/api/connect"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-medium px-5 py-2.5 rounded-lg transition-colors text-sm"
              >
                Get Started with Revive →
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
