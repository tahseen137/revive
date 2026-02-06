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

// ============ Demo Data Generator ============

const generateDemoData = () => {
  const demoStats: DashboardStats = {
    totalRecovered: 47320.50,
    recoveryRate: 68,
    activeRetries: 23,
    dunningCount: 8,
    failedThisMonth: 34,
    recoveredThisMonth: 23,
    pendingRetries: 23,
    mrrSaved: 12840.00,
    churnPrevented: 15,
    totalPayments: 156,
  };

  const demoTrend: DailyTrend[] = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    const recovered = Math.floor(Math.random() * 8) + 1;
    const failed = Math.floor(Math.random() * 4);
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      recovered,
      failed,
      amount: recovered * 149.99 + failed * 79.99,
    };
  });

  const demoPayments: Payment[] = [
    { id: '1', stripeInvoiceId: 'in_1', customer: 'Sarah Johnson', email: 'sarah.j@techcorp.com', amount: 149.99, currency: 'usd', status: 'recovered', failureReason: 'insufficient_funds', failureReasonDisplay: 'Insufficient funds', retries: 2, maxRetries: 4, nextRetryAt: null, emailsSent: 1, lastEmailType: 'payment_failed', date: '2 days ago', createdAt: new Date().toISOString(), recoveredAt: new Date().toISOString() },
    { id: '2', stripeInvoiceId: 'in_2', customer: 'Michael Chen', email: 'mchen@startup.io', amount: 299.00, currency: 'usd', status: 'retrying', failureReason: 'card_declined', failureReasonDisplay: 'Card declined', retries: 1, maxRetries: 4, nextRetryAt: new Date(Date.now() + 86400000).toISOString(), emailsSent: 1, lastEmailType: 'payment_failed', date: '1 day ago', createdAt: new Date().toISOString(), recoveredAt: null },
    { id: '3', stripeInvoiceId: 'in_3', customer: 'Emily Rodriguez', email: 'emily.r@company.com', amount: 79.99, currency: 'usd', status: 'dunning', failureReason: 'expired_card', failureReasonDisplay: 'Expired card', retries: 0, maxRetries: 0, nextRetryAt: null, emailsSent: 2, lastEmailType: 'card_update_reminder', date: '3 days ago', createdAt: new Date().toISOString(), recoveredAt: null },
    { id: '4', stripeInvoiceId: 'in_4', customer: 'James Wilson', email: 'jwilson@enterprise.com', amount: 499.00, currency: 'usd', status: 'retrying', failureReason: 'insufficient_funds', failureReasonDisplay: 'Insufficient funds', retries: 3, maxRetries: 4, nextRetryAt: new Date(Date.now() + 172800000).toISOString(), emailsSent: 3, lastEmailType: 'final_warning', date: '5 days ago', createdAt: new Date().toISOString(), recoveredAt: null },
    { id: '5', stripeInvoiceId: 'in_5', customer: 'Lisa Anderson', email: 'landerson@saas.co', amount: 149.99, currency: 'usd', status: 'recovered', failureReason: 'card_declined', failureReasonDisplay: 'Card declined', retries: 1, maxRetries: 4, nextRetryAt: null, emailsSent: 1, lastEmailType: 'payment_failed', date: '4 hours ago', createdAt: new Date().toISOString(), recoveredAt: new Date().toISOString() },
    { id: '6', stripeInvoiceId: 'in_6', customer: 'David Martinez', email: 'dmartinez@tech.com', amount: 199.99, currency: 'usd', status: 'retrying', failureReason: 'insufficient_funds', failureReasonDisplay: 'Insufficient funds', retries: 2, maxRetries: 4, nextRetryAt: new Date(Date.now() + 259200000).toISOString(), emailsSent: 2, lastEmailType: 'card_update_reminder', date: '1 day ago', createdAt: new Date().toISOString(), recoveredAt: null },
    { id: '7', stripeInvoiceId: 'in_7', customer: 'Jennifer Lee', email: 'jlee@startup.com', amount: 99.00, currency: 'usd', status: 'failed', failureReason: 'card_declined', failureReasonDisplay: 'Card declined', retries: 4, maxRetries: 4, nextRetryAt: null, emailsSent: 4, lastEmailType: 'final_warning', date: '2 weeks ago', createdAt: new Date().toISOString(), recoveredAt: null },
    { id: '8', stripeInvoiceId: 'in_8', customer: 'Robert Taylor', email: 'rtaylor@corp.io', amount: 249.00, currency: 'usd', status: 'recovered', failureReason: 'insufficient_funds', failureReasonDisplay: 'Insufficient funds', retries: 2, maxRetries: 4, nextRetryAt: null, emailsSent: 2, lastEmailType: 'card_update_reminder', date: '3 days ago', createdAt: new Date().toISOString(), recoveredAt: new Date().toISOString() },
    { id: '9', stripeInvoiceId: 'in_9', customer: 'Amanda White', email: 'awhite@business.com', amount: 149.99, currency: 'usd', status: 'retrying', failureReason: 'card_declined', failureReasonDisplay: 'Card declined', retries: 1, maxRetries: 4, nextRetryAt: new Date(Date.now() + 86400000).toISOString(), emailsSent: 1, lastEmailType: 'payment_failed', date: '12 hours ago', createdAt: new Date().toISOString(), recoveredAt: null },
    { id: '10', stripeInvoiceId: 'in_10', customer: 'Christopher Brown', email: 'cbrown@agency.com', amount: 399.00, currency: 'usd', status: 'dunning', failureReason: 'expired_card', failureReasonDisplay: 'Expired card', retries: 0, maxRetries: 0, nextRetryAt: null, emailsSent: 1, lastEmailType: 'card_update_reminder', date: '6 hours ago', createdAt: new Date().toISOString(), recoveredAt: null },
  ];

  return { demoStats, demoTrend, demoPayments };
};

// ============ Types: Connected Account ============

interface ConnectedAccountInfo {
  stripeAccountId: string;
  email: string | null;
  businessName: string | null;
  connectedAt: number;
}

// ============ Dashboard Content ============

function DashboardContent() {
  const searchParams = useSearchParams();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [trend, setTrend] = useState<DailyTrend[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [connectLoading, setConnectLoading] = useState(false);
  const [dbType, setDbType] = useState<string>("");
  const [connectedAccount, setConnectedAccount] = useState<ConnectedAccountInfo | null>(null);
  const [disconnecting, setDisconnecting] = useState(false);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [loginKey, setLoginKey] = useState("");
  const [loginError, setLoginError] = useState("");

  // Connection analysis from URL params (after Stripe Connect)
  const connected = searchParams.get("connected");
  const lostAmount = searchParams.get("lost");
  const recoverableAmount = searchParams.get("recoverable");
  const failedCount = searchParams.get("failedCount");
  const importedCount = searchParams.get("imported");
  const connectError = searchParams.get("connect_error");

  // Fetch connected account status
  const fetchConnectionStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/stripe/status");
      if (res.ok) {
        const data = await res.json();
        if (data.connected && data.account) {
          setConnectedAccount(data.account);
        } else {
          setConnectedAccount(null);
        }
      }
    } catch (e) {
      console.error("Failed to check connection status:", e);
    }
  }, []);

  const handleDisconnect = async () => {
    if (!confirm("Are you sure you want to disconnect your Stripe account?")) return;
    setDisconnecting(true);
    try {
      const res = await fetch("/api/stripe/disconnect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stripeAccountId: connectedAccount?.stripeAccountId }),
      });
      if (res.ok) {
        setConnectedAccount(null);
      }
    } catch (e) {
      console.error("Disconnect failed:", e);
    } finally {
      setDisconnecting(false);
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const [statsRes, paymentsRes] = await Promise.all([
        fetch("/api/dashboard/stats"),
        fetch("/api/dashboard/payments?limit=10"),
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

      // If no real data, use demo data
      if (!statsRes.ok || !paymentsRes.ok) {
        const { demoStats, demoTrend, demoPayments } = generateDemoData();
        setStats(demoStats);
        setTrend(demoTrend);
        setPayments(demoPayments);
        setDbType("demo");
      }
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
      // Fallback to demo data
      const { demoStats, demoTrend, demoPayments } = generateDemoData();
      setStats(demoStats);
      setTrend(demoTrend);
      setPayments(demoPayments);
      setDbType("demo");
    } finally {
      setLoading(false);
    }
  }, []);

  // Check authentication on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        // Try fetching stats — if it returns 401, we're not authenticated
        const res = await fetch("/api/dashboard/stats?accountId=direct");
        if (res.status === 401) {
          setAuthenticated(false);
          setLoading(false);
        } else {
          setAuthenticated(true);
        }
      } catch {
        setAuthenticated(false);
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  useEffect(() => {
    if (authenticated !== true) return;
    fetchData();
    fetchConnectionStatus();
    // Refresh every 30 seconds for real-time feel (only when tab is visible)
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") fetchData();
    }, 30000);
    return () => clearInterval(interval);
  }, [fetchData, fetchConnectionStatus, authenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: loginKey }),
      });
      if (res.ok) {
        setAuthenticated(true);
        setLoginKey("");
      } else {
        setLoginError("Invalid API key");
      }
    } catch {
      setLoginError("Login failed. Please try again.");
    }
  };

  const handleConnect = () => {
    setConnectLoading(true);
    window.location.href = "/api/connect";
  };

  const maxTrendValue = Math.max(...trend.map((d) => d.amount), 1);
  const moneySavedThisMonth = (stats?.mrrSaved || 0);

  // Show login screen if not authenticated
  if (authenticated === false) {
    return (
      <main className="min-h-screen bg-[#09090b] flex items-center justify-center px-6">
        <div className="max-w-sm w-full">
          <div className="glass rounded-2xl p-8">
            <div className="text-center mb-6">
              <div className="h-12 w-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
              </div>
              <h1 className="text-xl font-semibold">Revive Dashboard</h1>
              <p className="text-sm text-zinc-500 mt-1">Enter your API key to continue</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={loginKey}
                onChange={(e) => setLoginKey(e.target.value)}
                placeholder="API Secret Key"
                className="w-full px-4 py-3 bg-zinc-900 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500/50 text-sm"
                autoFocus
              />
              {loginError && (
                <p className="text-red-400 text-xs">{loginError}</p>
              )}
              <button
                type="submit"
                className="w-full bg-brand-600 hover:bg-brand-500 text-white font-medium py-3 rounded-xl transition-colors text-sm"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  // Show loading while checking auth
  if (authenticated === null) {
    return (
      <main className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <div className="text-zinc-500">Loading...</div>
      </main>
    );
  }

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
              <div className={`h-2 w-2 rounded-full ${dbType === "upstash-redis" ? "bg-emerald-500" : dbType === "demo" ? "bg-amber-500" : "bg-amber-500"}`} />
              {dbType === "upstash-redis" ? "Redis Connected" : dbType === "demo" ? "Demo Mode" : "Demo Mode (In-Memory)"}
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
            {connectedAccount ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-zinc-400 hidden sm:inline">
                    {connectedAccount.businessName || connectedAccount.email || connectedAccount.stripeAccountId}
                  </span>
                  <span className="text-emerald-400 text-xs font-medium">Connected</span>
                </div>
                <button
                  onClick={handleDisconnect}
                  disabled={disconnecting}
                  className="text-xs text-zinc-500 hover:text-red-400 transition-colors disabled:opacity-50"
                >
                  {disconnecting ? "..." : "Disconnect"}
                </button>
              </div>
            ) : (
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
            )}
          </header>

          {/* Dashboard Content */}
          <div className="p-6 lg:p-8 space-y-6">
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

            {/* Enhanced Metrics Cards */}
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
                  {loading ? "—" : `$${(stats?.totalRecovered || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                </div>
                <div className="text-xs text-zinc-500">
                  All time • {stats?.recoveredThisMonth || 0} payments recovered
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
                  {loading ? "—" : `${stats?.recoveryRate || 0}%`}
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-2 mt-2">
                  <div
                    className="bg-gradient-to-r from-brand-500 to-brand-400 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(stats?.recoveryRate || 0, 100)}%` }}
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
                  {loading ? "—" : stats?.activeRetries || 0}
                </div>
                <div className="text-xs text-zinc-500">
                  Currently being retried • {stats?.dunningCount || 0} in dunning
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
                  {loading ? "—" : `$${moneySavedThisMonth.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                </div>
                <div className="text-xs text-zinc-500">
                  MRR saved • {stats?.churnPrevented || 0}% churn prevented
                </div>
              </div>
            </div>

            {/* Timeline Chart + Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recovery Timeline Chart */}
              <div className="lg:col-span-2 glass rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-medium">Recovery Timeline (Last 30 Days)</h3>
                  <div className="flex items-center gap-4 text-xs text-zinc-500">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded bg-gradient-to-t from-emerald-500/60 to-emerald-400/40" />
                      Recovered
                    </div>
                  </div>
                </div>
                <div className="h-64 flex items-end gap-1">
                  {trend.length > 0 ? (
                    trend.map((day, i) => {
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
                    })
                  ) : (
                    Array.from({ length: 30 }, (_, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t bg-zinc-800/20"
                        style={{ height: "2%" }}
                      />
                    ))
                  )}
                </div>
                <div className="mt-4 text-xs text-zinc-500 text-center">
                  Hover over bars for details
                </div>
              </div>

              {/* Quick Actions Panel */}
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
                  <div className="text-xs text-zinc-500 space-y-2">
                    <p>💡 <span className="text-zinc-400">Retry failed payments in bulk</span></p>
                    <p>📧 <span className="text-zinc-400">Send payment reminders to customers</span></p>
                    <p>📊 <span className="text-zinc-400">Export data for analysis</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity Feed */}
            <div className="glass rounded-xl overflow-hidden">
              <div className="p-6 border-b border-white/5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Recent Activity</h3>
                    <p className="text-xs text-zinc-500 mt-1">
                      Last 10 payment recovery attempts
                    </p>
                  </div>
                  {payments.length > 0 && (
                    <button
                      onClick={fetchData}
                      className="text-xs text-brand-400 hover:text-brand-300 transition-colors flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Refresh
                    </button>
                  )}
                </div>
              </div>

              {payments.length > 0 ? (
                <div className="divide-y divide-white/5">
                  {payments.map((payment) => (
                    <div
                      key={payment.id}
                      className="p-6 hover:bg-white/[0.02] transition-colors"
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
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <div className="text-4xl mb-4">💳</div>
                  <h4 className="font-medium mb-2">No activity yet</h4>
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
