"use client";

import Link from "next/link";
import { useState } from "react";
import { MOCK_PAYMENTS, MOCK_STATS, MOCK_TREND, MOCK_ACTIVITY, type MockPayment } from "@/lib/mock-data";

// ============ Utility Functions ============

const maskEmail = (email: string): string => {
  if (!email || !email.includes('@')) return email;
  const [local, domain] = email.split('@');
  if (local.length <= 2) return `${local[0]}***@${domain}`;
  return `${local[0]}***@${domain}`;
};

const getStatusIcon = (status: string): string => {
  const icons: Record<string, string> = {
    recovered: '✅',
    retrying: '🔄',
    pending: '🔄',
    dunning: '📧',
    failed: '❌',
    expired_card: '❌',
  };
  return icons[status] || '⏸️';
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

// ============ Demo Page Component ============

export default function DemoPage() {
  const [selectedPayment, setSelectedPayment] = useState<MockPayment | null>(null);
  const [showTimeline, setShowTimeline] = useState(false);

  const maxTrendValue = Math.max(...MOCK_TREND.map((d) => d.amount), 1);

  const handlePaymentClick = (payment: MockPayment) => {
    setSelectedPayment(payment);
    setShowTimeline(true);
  };

  const closeTimeline = () => {
    setShowTimeline(false);
    setTimeout(() => setSelectedPayment(null), 300);
  };

  return (
    <main className="min-h-screen bg-[#09090b]">
      <div className="flex">
        {/* Sidebar */}
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
              Demo Overview
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
          </nav>

          <div className="pt-6 border-t border-white/5">
            <div className="flex items-center gap-2 text-xs text-zinc-600">
              <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
              Demo Mode
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-h-screen">
          {/* Top Bar */}
          <header className="border-b border-white/5 px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-semibold">Demo Dashboard</h1>
              <p className="text-sm text-zinc-500">
                Monitoring {MOCK_STATS.totalPayments} payments • {MOCK_STATS.recoveryRate}% recovery rate
              </p>
            </div>
            <Link
              href="/#waitlist"
              className="flex items-center gap-2 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-all shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
              </svg>
              Connect Your Stripe
            </Link>
          </header>

          {/* Dashboard Content */}
          <div className="p-6 lg:p-8 space-y-6">
            {/* Demo Mode Banner */}
            <div className="relative overflow-hidden bg-gradient-to-r from-purple-600/10 via-brand-500/10 to-pink-600/10 border border-purple-500/20 rounded-2xl p-6">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-pink-500/5 animate-pulse" />
              <div className="relative flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-purple-600/20 flex items-center justify-center shrink-0">
                  <span className="text-2xl">🎭</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                    You're Viewing Demo Data
                    <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-medium">SANDBOX</span>
                  </h3>
                  <p className="text-zinc-400 text-sm mb-4">
                    This dashboard shows what Revive can do for YOUR business. The data below is simulated, 
                    but the recovery engine is 100% real. Connect your Stripe account to see your actual numbers.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/#waitlist"
                      className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                      Connect Stripe & See Real Data →
                    </Link>
                    <Link
                      href="/"
                      className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Success Stories Highlight */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass rounded-xl p-5 border-emerald-500/20 hover:border-emerald-500/40 transition-all group cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-xl">💰</span>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">Payday Win</span>
                </div>
                <div className="text-2xl font-bold text-emerald-400 mb-1">$47.00</div>
                <div className="text-xs text-zinc-400">Recovered on payday (Feb 1)</div>
                <div className="text-xs text-zinc-500 mt-2">Marcus T. • Insufficient funds</div>
              </div>

              <div className="glass rounded-xl p-5 border-blue-500/20 hover:border-blue-500/40 transition-all group cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-xl">📧</span>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 font-medium">24h Save</span>
                </div>
                <div className="text-2xl font-bold text-blue-400 mb-1">$129.00</div>
                <div className="text-xs text-zinc-400">Card updated in 24h</div>
                <div className="text-xs text-zinc-500 mt-2">Sarah C. • Expired card</div>
              </div>

              <div className="glass rounded-xl p-5 border-purple-500/20 hover:border-purple-500/40 transition-all group cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-xl">⚡</span>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-purple-500/10 text-purple-400 font-medium">Auto-Fix</span>
                </div>
                <div className="text-2xl font-bold text-purple-400 mb-1">$299.00</div>
                <div className="text-xs text-zinc-400">Recovered in 1 hour</div>
                <div className="text-xs text-zinc-500 mt-2">David R. • Processing error</div>
              </div>

              <div className="glass rounded-xl p-5 border-zinc-500/20 hover:border-zinc-500/40 transition-all group cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div className="h-10 w-10 rounded-lg bg-zinc-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-xl">🛡️</span>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-zinc-500/10 text-zinc-400 font-medium">Smart Skip</span>
                </div>
                <div className="text-2xl font-bold text-zinc-400 mb-1">$79.00</div>
                <div className="text-xs text-zinc-400">Stolen card (no retry)</div>
                <div className="text-xs text-zinc-500 mt-2">Jessica W. • Marked unrecoverable</div>
              </div>
            </div>

            {/* Main Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  All time • {MOCK_STATS.recoveredThisMonth} payments recovered
                </div>
              </div>

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
                    className="bg-gradient-to-r from-brand-500 to-brand-400 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${MOCK_STATS.recoveryRate}%` }}
                  />
                </div>
              </div>

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
                  Currently being retried • {MOCK_STATS.dunningCount} in dunning
                </div>
              </div>

              <div className="glass rounded-xl p-6 hover:border-brand-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/10 group">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Money Saved This Month</div>
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
                  MRR saved • {MOCK_STATS.churnPrevented}% churn prevented
                </div>
              </div>
            </div>

            {/* Timeline Chart + Activity Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recovery Timeline Chart */}
              <div className="lg:col-span-2 glass rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-medium">Recovery Timeline (Last 30 Days)</h3>
                    <p className="text-xs text-zinc-500 mt-1">Hover over bars to see details</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-zinc-500">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded bg-gradient-to-t from-emerald-500/60 to-emerald-400/40" />
                      Recovered
                    </div>
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
                            ? 'linear-gradient(to top, rgba(52, 211, 153, 0.6), rgba(52, 211, 153, 0.3))'
                            : 'rgba(63, 63, 70, 0.2)',
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
              </div>

              {/* Live Activity Feed */}
              <div className="glass rounded-xl p-6">
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  Live Activity
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                </h3>
                <div className="space-y-4">
                  {MOCK_ACTIVITY.map((activity, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <span className="text-lg flex-shrink-0">{activity.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-zinc-300 text-xs">{activity.message}</p>
                        <p className="text-zinc-600 text-xs mt-0.5">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Payments Table */}
            <div className="glass rounded-xl overflow-hidden" id="payments">
              <div className="p-6 border-b border-white/5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">All Payments</h3>
                    <p className="text-xs text-zinc-500 mt-1">
                      Click any payment to see the full recovery timeline
                    </p>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-white/5 max-h-[600px] overflow-y-auto">
                {MOCK_PAYMENTS.slice(0, 15).map((payment) => (
                  <div
                    key={payment.id}
                    onClick={() => handlePaymentClick(payment)}
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
                          <span className="text-zinc-500">
                            {payment.failureReasonDisplay}
                          </span>
                          <span className="text-zinc-600">•</span>
                          <span className="text-zinc-400">
                            {payment.retries > 0 ? `${payment.retries} ${payment.retries === 1 ? 'retry' : 'retries'}` : 'No retries yet'}
                          </span>
                          {payment.emailsSent > 0 && (
                            <>
                              <span className="text-zinc-600">•</span>
                              <span className="text-zinc-400">
                                📧 {payment.emailsSent} {payment.emailsSent === 1 ? 'email' : 'emails'} sent
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
          </div>
        </div>
      </div>

      {/* Timeline Modal */}
      {showTimeline && selectedPayment && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={closeTimeline}
        >
          <div
            className="glass rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-[#09090b]/95 backdrop-blur-xl border-b border-white/10 p-6 z-10">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{selectedPayment.customer}</h3>
                  <p className="text-sm text-zinc-500">{maskEmail(selectedPayment.email)}</p>
                </div>
                <button
                  onClick={closeTimeline}
                  className="text-zinc-500 hover:text-white transition-colors"
                >
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
              </div>
            </div>

            <div className="p-6">
              {selectedPayment.retryTimeline && selectedPayment.retryTimeline.length > 0 ? (
                <div className="space-y-6">
                  <h4 className="font-medium text-sm text-zinc-400 uppercase tracking-wider">Recovery Timeline</h4>
                  {selectedPayment.retryTimeline.map((event, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          event.type === 'recovered' ? 'bg-emerald-500/20 text-emerald-400' :
                          event.type === 'failed' ? 'bg-red-500/20 text-red-400' :
                          event.type === 'retry' && event.success ? 'bg-emerald-500/20 text-emerald-400' :
                          event.type === 'retry' ? 'bg-amber-500/20 text-amber-400' :
                          event.type === 'email' ? 'bg-blue-500/20 text-blue-400' :
                          event.type === 'dunning' ? 'bg-orange-500/20 text-orange-400' :
                          'bg-purple-500/20 text-purple-400'
                        }`}>
                          {event.type === 'recovered' && '✅'}
                          {event.type === 'failed' && '❌'}
                          {event.type === 'retry' && (event.success ? '✅' : '🔄')}
                          {event.type === 'email' && '📧'}
                          {event.type === 'dunning' && '⚠️'}
                          {event.type === 'card_updated' && '💳'}
                        </div>
                        {i < selectedPayment.retryTimeline!.length - 1 && (
                          <div className="w-0.5 h-full bg-white/10 flex-1 my-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="text-sm text-white font-medium mb-1">{event.description}</div>
                        <div className="text-xs text-zinc-500">
                          {new Date(event.timestamp).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
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
                <div className="text-center py-8 text-zinc-500">
                  <p>No detailed timeline available for this payment.</p>
                </div>
              )}
            </div>

            <div className="border-t border-white/10 p-6 bg-brand-500/5">
              <p className="text-sm text-zinc-400 mb-4">
                This is demo data. Connect your Stripe account to see real recovery timelines for your customers.
              </p>
              <Link
                href="/#waitlist"
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
