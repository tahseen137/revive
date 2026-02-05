"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";

// ============ Types ============

interface DashboardStats {
  totalRecovered: number;
  recoveryRate: number;
  activeRetries: number;
  dunningCount: number;
  failedThisMonth: number;
  recoveredThisMonth: number;
  pendingRetries: number;
  mrrSaved: number;
  churnPrevented: number;
  totalPayments: number;
}

interface DailyTrend {
  date: string;
  recovered: number;
  failed: number;
  amount: number;
}

interface Payment {
  id: string;
  stripeInvoiceId: string;
  customer: string;
  email: string;
  amount: number;
  currency: string;
  status: string;
  failureReason: string;
  failureReasonDisplay: string;
  retries: number;
  maxRetries: number;
  nextRetryAt: string | null;
  emailsSent: number;
  lastEmailType: string | null;
  date: string;
  createdAt: string;
  recoveredAt: string | null;
}

// ============ Status Colors ============

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

// ============ Retry Schedule Display ============

const retrySchedule = [
  { attempt: "Attempt 1", delay: "4 hours", strategy: "Soft retry" },
  { attempt: "Attempt 2", delay: "24 hours", strategy: "Retry + Failed notice email" },
  { attempt: "Attempt 3", delay: "72 hours", strategy: "Retry + Card update reminder" },
  { attempt: "Attempt 4", delay: "7 days", strategy: "Final retry + Urgent warning" },
];

// ============ Dashboard Content ============

function DashboardContent() {
  const searchParams = useSearchParams();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [trend, setTrend] = useState<DailyTrend[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [connectLoading, setConnectLoading] = useState(false);
  const [dbType, setDbType] = useState<string>("");

  // Connection analysis from URL params (after Stripe Connect)
  const connected = searchParams.get("connected");
  const lostAmount = searchParams.get("lost");
  const recoverableAmount = searchParams.get("recoverable");
  const failedCount = searchParams.get("failedCount");
  const importedCount = searchParams.get("imported");
  const connectError = searchParams.get("connect_error");

  const fetchData = useCallback(async () => {
    try {
      const [statsRes, paymentsRes] = await Promise.all([
        fetch("/api/dashboard/stats"),
        fetch("/api/dashboard/payments?limit=20"),
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData.stats);
        setTrend(statsData.dailyTrend || []);
        setDbType(statsData.dbHealth?.type || "unknown");
      }

      if (paymentsRes.ok) {
        const paymentsData = await paymentsRes.json();
        setPayments(paymentsData.payments || []);
      }
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    // Refresh every 30 seconds for real-time feel
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const handleConnect = () => {
    setConnectLoading(true);
    window.location.href = "/api/connect";
  };

  const maxTrendValue = Math.max(...trend.map((d) => d.recovered + d.failed), 1);

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
            {[
              { name: "Overview", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", active: true },
              { name: "Payments", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", active: false },
              { name: "Emails", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", active: false },
              { name: "Settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z", active: false },
            ].map((item) => (
              <button
                key={item.name}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  item.active ? "bg-white/5 text-white" : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02]"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d={item.icon} />
                </svg>
                {item.name}
              </button>
            ))}
          </nav>

          <div className="pt-6 border-t border-white/5">
            <div className="flex items-center gap-2 text-xs text-zinc-600">
              <div className={`h-2 w-2 rounded-full ${dbType === "upstash-redis" ? "bg-emerald-500" : "bg-amber-500"}`} />
              {dbType === "upstash-redis" ? "Redis Connected" : "Demo Mode (In-Memory)"}
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
                {loading ? "Loading..." : stats?.totalPayments
                  ? `Monitoring ${stats.totalPayments} payments`
                  : "Connect Stripe to start recovering revenue"}
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
            {/* Connection Analysis Banner */}
            {connected && lostAmount && (
              <div className="bg-gradient-to-r from-brand-600/10 via-brand-500/5 to-purple-600/10 border border-brand-500/20 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-brand-600/20 flex items-center justify-center shrink-0">
                    <span className="text-xl">🎯</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Stripe Connected Successfully!</h3>
                    <p className="text-zinc-400 text-sm mb-4">
                      We scanned your last 30 days and found{" "}
                      <span className="text-white font-medium">{failedCount} failed payments</span>{" "}
                      totaling <span className="text-red-400 font-semibold">{lostAmount}</span> in lost revenue.
                    </p>
                    <div className="flex items-center gap-6">
                      <div>
                        <div className="text-xs text-zinc-500 uppercase tracking-wider">Lost Revenue</div>
                        <div className="text-2xl font-bold text-red-400">{lostAmount}</div>
                      </div>
                      <div className="text-2xl text-zinc-600">→</div>
                      <div>
                        <div className="text-xs text-zinc-500 uppercase tracking-wider">Revive Can Recover</div>
                        <div className="text-2xl font-bold text-emerald-400">{recoverableAmount}</div>
                      </div>
                    </div>
                    {importedCount && parseInt(importedCount) > 0 && (
                      <p className="text-xs text-brand-400 mt-3">
                        ✓ {importedCount} payments imported and recovery started automatically
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Connection Error Banner */}
            {connectError && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                <p className="text-red-400 text-sm">
                  <strong>Connection Error:</strong> {decodeURIComponent(connectError)}.{" "}
                  <button onClick={handleConnect} className="underline hover:no-underline">Try again</button>
                </p>
              </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass rounded-xl p-6">
                <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Total Recovered</div>
                <div className="text-2xl font-bold text-emerald-400">
                  {loading ? "—" : `$${(stats?.totalRecovered || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                </div>
                <div className="text-xs text-zinc-500 mt-1">
                  {stats?.recoveredThisMonth || 0} payments this month
                </div>
              </div>

              <div className="glass rounded-xl p-6">
                <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Recovery Rate</div>
                <div className="text-2xl font-bold text-white">
                  {loading ? "—" : `${stats?.recoveryRate || 0}%`}
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-1.5 mt-3">
                  <div
                    className="bg-brand-500 h-1.5 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(stats?.recoveryRate || 0, 100)}%` }}
                  />
                </div>
              </div>

              <div className="glass rounded-xl p-6">
                <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Active Retries</div>
                <div className="text-2xl font-bold text-amber-400">
                  {loading ? "—" : stats?.activeRetries || 0}
                </div>
                <div className="text-xs text-zinc-500 mt-1">
                  {stats?.dunningCount || 0} in dunning
                </div>
              </div>

              <div className="glass rounded-xl p-6">
                <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Churn Prevented</div>
                <div className="text-2xl font-bold text-brand-400">
                  {loading ? "—" : `${stats?.churnPrevented || 0}%`}
                </div>
                <div className="text-xs text-zinc-500 mt-1">
                  ${(stats?.mrrSaved || 0).toLocaleString()} MRR saved
                </div>
              </div>
            </div>

            {/* Chart + Retry Schedule */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recovery Trend Chart */}
              <div className="lg:col-span-2 glass rounded-xl p-6">
                <h3 className="font-medium mb-6">Recovery Trend (Last 30 Days)</h3>
                <div className="h-64 flex items-end gap-1">
                  {trend.length > 0 ? (
                    trend.map((day, i) => {
                      const total = day.recovered + day.failed;
                      const height = total > 0 ? (total / maxTrendValue) * 100 : 2;
                      const recoveredPercent = total > 0 ? (day.recovered / total) * 100 : 0;
                      return (
                        <div
                          key={i}
                          className="flex-1 rounded-t-sm transition-all hover:opacity-80 relative group cursor-pointer"
                          style={{
                            height: `${Math.max(height, 2)}%`,
                            background: total > 0
                              ? `linear-gradient(to top, rgba(52, 211, 153, 0.5) ${recoveredPercent}%, rgba(239, 68, 68, 0.3) ${recoveredPercent}%)`
                              : "rgba(63, 63, 70, 0.2)",
                          }}
                        >
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-zinc-800 text-xs text-white px-2 py-1 rounded whitespace-nowrap z-10">
                            {day.date}: {day.recovered}↑ {day.failed}↓
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    // Empty state placeholder
                    Array.from({ length: 30 }, (_, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t-sm bg-zinc-800/20"
                        style={{ height: "2%" }}
                      />
                    ))
                  )}
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
                <h3 className="font-medium mb-4">Smart Retry Schedule</h3>
                <div className="space-y-4">
                  {retrySchedule.map((retry, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1 h-2 w-2 rounded-full bg-brand-500 shrink-0" />
                      <div>
                        <div className="text-sm font-medium">{retry.attempt}</div>
                        <div className="text-xs text-zinc-500">
                          +{retry.delay} — {retry.strategy}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 text-xs text-zinc-500">
                  <p>📧 Expired cards skip retries → dunning emails only</p>
                  <p className="mt-1">💳 Insufficient funds get longer gaps (payday cycles)</p>
                </div>
              </div>
            </div>

            {/* Payments Table */}
            <div className="glass rounded-xl overflow-hidden">
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Recent Failed Payments</h3>
                  <p className="text-xs text-zinc-500 mt-1">
                    {payments.length > 0
                      ? `Showing ${payments.length} most recent recovery attempts`
                      : "No payments tracked yet — connect Stripe to start"}
                  </p>
                </div>
                {payments.length > 0 && (
                  <button
                    onClick={fetchData}
                    className="text-xs text-brand-400 hover:text-brand-300 transition-colors"
                  >
                    Refresh ↻
                  </button>
                )}
              </div>

              {payments.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="text-left text-xs text-zinc-500 font-medium px-6 py-3">Customer</th>
                        <th className="text-left text-xs text-zinc-500 font-medium px-6 py-3">Amount</th>
                        <th className="text-left text-xs text-zinc-500 font-medium px-6 py-3">Reason</th>
                        <th className="text-left text-xs text-zinc-500 font-medium px-6 py-3">Status</th>
                        <th className="text-left text-xs text-zinc-500 font-medium px-6 py-3">Retries</th>
                        <th className="text-left text-xs text-zinc-500 font-medium px-6 py-3">Emails</th>
                        <th className="text-left text-xs text-zinc-500 font-medium px-6 py-3">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((payment) => (
                        <tr
                          key={payment.id}
                          className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="font-medium">{payment.customer}</div>
                            <div className="text-xs text-zinc-500">{payment.email}</div>
                          </td>
                          <td className="px-6 py-4 font-mono">
                            ${payment.amount.toFixed(2)}
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs text-zinc-400">{payment.failureReasonDisplay}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[payment.status] || "text-zinc-400 bg-zinc-400/10"}`}>
                              {statusLabels[payment.status] || payment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-zinc-400">
                            {payment.retries}/{payment.maxRetries}
                          </td>
                          <td className="px-6 py-4 text-zinc-400">
                            {payment.emailsSent > 0 ? (
                              <span className="text-xs">
                                📧 {payment.emailsSent}
                              </span>
                            ) : (
                              <span className="text-zinc-600">—</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-zinc-500 text-xs">
                            {payment.date}
                            {payment.nextRetryAt && (
                              <div className="text-brand-400">
                                Next: {new Date(payment.nextRetryAt).toLocaleDateString()}
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-12 text-center">
                  <div className="text-4xl mb-4">💳</div>
                  <h4 className="font-medium mb-2">No payments yet</h4>
                  <p className="text-sm text-zinc-500 max-w-sm mx-auto">
                    Connect your Stripe account and Revive will automatically detect and recover failed payments.
                  </p>
                  <button
                    onClick={handleConnect}
                    className="mt-4 text-sm text-brand-400 hover:text-brand-300 transition-colors"
                  >
                    Connect Stripe →
                  </button>
                </div>
              )}
            </div>

            {/* Email Templates Preview */}
            <div className="glass rounded-xl p-6">
              <h3 className="font-medium mb-4">Dunning Email Templates</h3>
              <p className="text-xs text-zinc-500 mb-4">Preview the automated emails sent during the recovery process.</p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { type: "payment_failed", label: "Payment Failed", icon: "⚠️" },
                  { type: "card_update_reminder", label: "Card Update", icon: "💳" },
                  { type: "final_warning", label: "Final Warning", icon: "🚨" },
                  { type: "payment_recovered", label: "Recovered", icon: "✅" },
                ].map((template) => (
                  <a
                    key={template.type}
                    href={`/api/email/preview?type=${template.type}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-3 rounded-lg border border-white/5 hover:border-brand-500/20 hover:bg-white/[0.02] transition-all text-sm"
                  >
                    <span>{template.icon}</span>
                    <span className="text-zinc-300">{template.label}</span>
                    <svg className="w-3 h-3 ml-auto text-zinc-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#09090b] flex items-center justify-center">
          <div className="text-zinc-500">Loading dashboard...</div>
        </main>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
