"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, Suspense } from "react";

// ============ Types ============

interface AnalyticsMetrics {
  totalRecoveredAllTime: number;
  recoveredThisMonth: number;
  recoveryRate: number;
  activeRetries: number;
  moneySavedVsCompetitor: number;
  churnkeyCost: number;
  reviveCost: number;
  totalPayments: number;
}

interface DailyTimeline {
  date: string;
  recoveredAmount: number;
  failedAmount: number;
  recoveredCount: number;
  failedCount: number;
}

interface RecoveryEntry {
  id: string;
  email: string;
  customerName: string;
  amount: number;
  currency: string;
  failureCode: string;
  failureReason: string;
  status: string;
  retryCount: number;
  maxRetries: number;
  retryStrategy: string;
  createdAt: string;
  updatedAt: string;
  recoveredAt: string | null;
}

interface FailureBreakdown {
  code: string;
  label: string;
  totalCount: number;
  recoveredCount: number;
  totalAmount: number;
  recoveredAmount: number;
  recoveryRate: number;
}

interface ROIData {
  totalLostWithoutRevive: number;
  totalRecovered: number;
  reviveFee: number;
  netSavings: number;
  roiPercent: number;
}

interface AnalyticsData {
  metrics: AnalyticsMetrics;
  dailyTimeline: DailyTimeline[];
  recentPayments: RecoveryEntry[];
  failureBreakdown: FailureBreakdown[];
  roi: ROIData;
  dbHealth: { connected: boolean; type: string };
}

// ============ Demo Data ============

function generateDemoAnalytics(): AnalyticsData {
  const now = Date.now();

  const dailyTimeline: DailyTimeline[] = Array.from(
    { length: 30 },
    (_, i) => {
      const d = new Date(now - (29 - i) * 86400000);
      const recoveredCount = Math.floor(Math.random() * 6) + 1;
      const failedCount = Math.floor(Math.random() * 3);
      return {
        date: d.toISOString().split("T")[0],
        recoveredAmount: recoveredCount * (80 + Math.random() * 200),
        failedAmount: failedCount * (50 + Math.random() * 150),
        recoveredCount,
        failedCount,
      };
    }
  );

  const statuses: string[] = [
    "recovered",
    "recovered",
    "recovered",
    "retrying",
    "pending",
    "failed",
    "dunning",
    "recovered",
    "retrying",
    "recovered",
  ];
  const failureCodes = [
    "insufficient_funds",
    "card_declined",
    "expired_card",
    "processing_error",
    "insufficient_funds",
    "card_declined",
    "insufficient_funds",
    "card_declined",
    "processing_error",
    "insufficient_funds",
  ];
  const names = [
    "Sarah Johnson",
    "Michael Chen",
    "Emily Rodriguez",
    "James Wilson",
    "Lisa Anderson",
    "David Martinez",
    "Jennifer Lee",
    "Robert Taylor",
    "Amanda White",
    "Christopher Brown",
  ];
  const emails = [
    "sarah.j@techcorp.com",
    "mchen@startup.io",
    "emily.r@company.com",
    "jwilson@enterprise.com",
    "landerson@saas.co",
    "dmartinez@tech.com",
    "jlee@startup.com",
    "rtaylor@corp.io",
    "awhite@business.com",
    "cbrown@agency.com",
  ];
  const strategies = [
    "Payday-aware retry",
    "Smart retry (4h→24h→72h)",
    "Dunning (card update)",
    "Fast retry (1h)",
    "Payday-aware retry",
    "Smart retry (4h→24h→72h)",
    "Payday-aware retry",
    "Smart retry (4h→24h→72h)",
    "Fast retry (1h)",
    "Payday-aware retry",
  ];

  const recentPayments: RecoveryEntry[] = statuses.map((status, i) => ({
    id: `demo-${i}`,
    email: emails[i],
    customerName: names[i],
    amount: Math.floor(Math.random() * 400 + 50),
    currency: "usd",
    failureCode: failureCodes[i],
    failureReason: failureCodes[i],
    status,
    retryCount: Math.floor(Math.random() * 4),
    maxRetries: 4,
    retryStrategy: strategies[i],
    createdAt: new Date(now - i * 3600000 * (2 + Math.random() * 10)).toISOString(),
    updatedAt: new Date(now - i * 3600000).toISOString(),
    recoveredAt:
      status === "recovered"
        ? new Date(now - i * 1800000).toISOString()
        : null,
  }));

  return {
    metrics: {
      totalRecoveredAllTime: 47320.5,
      recoveredThisMonth: 12840.0,
      recoveryRate: 68.5,
      activeRetries: 23,
      moneySavedVsCompetitor: 1384.0,
      churnkeyCost: 2615.0,
      reviveCost: 1231.0,
      totalPayments: 156,
    },
    dailyTimeline,
    recentPayments,
    failureBreakdown: [
      {
        code: "insufficient_funds",
        label: "Insufficient Funds",
        totalCount: 45,
        recoveredCount: 34,
        totalAmount: 18500,
        recoveredAmount: 14200,
        recoveryRate: 75.6,
      },
      {
        code: "card_declined",
        label: "Card Declined",
        totalCount: 38,
        recoveredCount: 25,
        totalAmount: 12400,
        recoveredAmount: 8300,
        recoveryRate: 65.8,
      },
      {
        code: "expired_card",
        label: "Expired Card",
        totalCount: 22,
        recoveredCount: 10,
        totalAmount: 7800,
        recoveredAmount: 3600,
        recoveryRate: 45.5,
      },
      {
        code: "processing_error",
        label: "Processing Error",
        totalCount: 15,
        recoveredCount: 13,
        totalAmount: 5200,
        recoveredAmount: 4500,
        recoveryRate: 86.7,
      },
      {
        code: "other",
        label: "Other",
        totalCount: 5,
        recoveredCount: 2,
        totalAmount: 1800,
        recoveredAmount: 720,
        recoveryRate: 40.0,
      },
    ],
    roi: {
      totalLostWithoutRevive: 45700,
      totalRecovered: 47320.5,
      reviveFee: 7098.08,
      netSavings: 40222.43,
      roiPercent: 567,
    },
    dbHealth: { connected: true, type: "demo" },
  };
}

// ============ Utilities ============

const fmt = (n: number) =>
  n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const fmtCompact = (n: number) => {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toFixed(0);
};

const statusColor: Record<string, string> = {
  recovered: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  retrying: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  pending: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  dunning: "text-orange-400 bg-orange-400/10 border-orange-400/20",
  failed: "text-red-400 bg-red-400/10 border-red-400/20",
  expired_card: "text-red-400 bg-red-400/10 border-red-400/20",
};

const statusLabel: Record<string, string> = {
  recovered: "Recovered",
  retrying: "Retrying",
  pending: "Pending",
  dunning: "Dunning",
  failed: "Failed",
  expired_card: "Expired Card",
};

const statusDot: Record<string, string> = {
  recovered: "bg-emerald-400",
  retrying: "bg-amber-400",
  pending: "bg-blue-400",
  dunning: "bg-orange-400",
  failed: "bg-red-400",
  expired_card: "bg-red-400",
};

const failureColor: Record<string, string> = {
  insufficient_funds: "from-blue-500 to-blue-600",
  card_declined: "from-amber-500 to-amber-600",
  expired_card: "from-red-500 to-red-600",
  processing_error: "from-purple-500 to-purple-600",
  other: "from-zinc-500 to-zinc-600",
};

const failureBg: Record<string, string> = {
  insufficient_funds: "bg-blue-500/10",
  card_declined: "bg-amber-500/10",
  expired_card: "bg-red-500/10",
  processing_error: "bg-purple-500/10",
  other: "bg-zinc-500/10",
};

const failureText: Record<string, string> = {
  insufficient_funds: "text-blue-400",
  card_declined: "text-amber-400",
  expired_card: "text-red-400",
  processing_error: "text-purple-400",
  other: "text-zinc-400",
};

// ============ Analytics Content ============

function AnalyticsContent() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [loginKey, setLoginKey] = useState("");
  const [loginError, setLoginError] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [feedFilter, setFeedFilter] = useState<string>("all");
  const [exporting, setExporting] = useState(false);

  // Check auth
  useEffect(() => {
    async function checkAuth() {
      try {
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

  const fetchAnalytics = useCallback(async () => {
    try {
      const params = new URLSearchParams({ accountId: "direct" });
      if (dateFrom) params.set("from", dateFrom);
      if (dateTo) params.set("to", dateTo);

      const res = await fetch(`/api/analytics?${params}`);
      if (res.ok) {
        const d = await res.json();
        setData(d);
      } else {
        // Fallback to demo
        setData(generateDemoAnalytics());
      }
    } catch {
      setData(generateDemoAnalytics());
    } finally {
      setLoading(false);
    }
  }, [dateFrom, dateTo]);

  useEffect(() => {
    if (authenticated !== true) return;
    fetchAnalytics();
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") fetchAnalytics();
    }, 30000);
    return () => clearInterval(interval);
  }, [fetchAnalytics, authenticated]);

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

  const handleExportCSV = async () => {
    setExporting(true);
    try {
      const params = new URLSearchParams({ accountId: "direct" });
      if (dateFrom) params.set("from", dateFrom);
      if (dateTo) params.set("to", dateTo);
      const res = await fetch(`/api/analytics/export?${params}`);
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `revive-recovery-${new Date().toISOString().split("T")[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setExporting(false);
    }
  };

  const handleDateFilter = () => {
    setLoading(true);
    fetchAnalytics();
  };

  // Login screen
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
              <h1 className="text-xl font-semibold">Revive Analytics</h1>
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
              {loginError && <p className="text-red-400 text-xs">{loginError}</p>}
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

  if (authenticated === null) {
    return (
      <main className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <div className="text-zinc-500">Loading...</div>
      </main>
    );
  }

  const metrics = data?.metrics;
  const timeline = data?.dailyTimeline || [];
  const payments = data?.recentPayments || [];
  const breakdowns = data?.failureBreakdown || [];
  const roi = data?.roi;

  const maxTimelineVal = Math.max(
    ...timeline.map((d) => d.recoveredAmount + d.failedAmount),
    1
  );

  const filteredPayments =
    feedFilter === "all"
      ? payments
      : payments.filter((p) => p.status === feedFilter);

  const totalBreakdownCount = breakdowns.reduce(
    (s, b) => s + b.totalCount,
    0
  );

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
            <Link href="/dashboard" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Overview
            </Link>
            <Link href="/analytics" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm bg-white/5 text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Analytics
            </Link>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Payments
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </button>
          </nav>
          <div className="pt-6 border-t border-white/5">
            <div className="flex items-center gap-2 text-xs text-zinc-600">
              <div className={`h-2 w-2 rounded-full ${data?.dbHealth?.type === "upstash-redis" ? "bg-emerald-500" : "bg-amber-500"}`} />
              {data?.dbHealth?.type === "upstash-redis" ? "Redis Connected" : data?.dbHealth?.type === "demo" ? "Demo Mode" : "Loading..."}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-h-screen">
          {/* Top Bar */}
          <header className="border-b border-white/5 px-6 lg:px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">Recovery Analytics</h1>
              <p className="text-sm text-zinc-500">
                {loading
                  ? "Loading analytics..."
                  : metrics
                  ? `${metrics.totalPayments} payments tracked`
                  : "No data yet"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Date Range Filter */}
              <div className="hidden sm:flex items-center gap-2">
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="bg-zinc-900 border border-white/10 rounded-lg text-xs text-zinc-400 px-3 py-2 focus:outline-none focus:border-brand-500/50"
                />
                <span className="text-zinc-600 text-xs">to</span>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="bg-zinc-900 border border-white/10 rounded-lg text-xs text-zinc-400 px-3 py-2 focus:outline-none focus:border-brand-500/50"
                />
                <button
                  onClick={handleDateFilter}
                  className="text-xs bg-brand-600/20 text-brand-400 border border-brand-500/20 px-3 py-2 rounded-lg hover:bg-brand-600/30 transition-colors"
                >
                  Filter
                </button>
              </div>
              {/* Export */}
              <button
                onClick={handleExportCSV}
                disabled={exporting}
                className="flex items-center gap-2 text-sm bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-lg hover:bg-emerald-500/20 transition-colors disabled:opacity-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {exporting ? "Exporting..." : "Export CSV"}
              </button>
            </div>
          </header>

          {/* Content */}
          <div className="p-6 lg:p-8 space-y-6">
            {/* ========== 1. METRICS CARDS ========== */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Total Revenue Recovered */}
              <div className="glass rounded-xl p-6 hover:border-emerald-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/5 group">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Revenue Recovered</div>
                  <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold text-emerald-400 mb-1">
                  {loading ? "—" : `$${fmt(metrics?.totalRecoveredAllTime || 0)}`}
                </div>
                <div className="text-xs text-zinc-500">
                  ${fmt(metrics?.recoveredThisMonth || 0)} this month
                </div>
              </div>

              {/* Recovery Rate */}
              <div className="glass rounded-xl p-6 hover:border-brand-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/5 group">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Recovery Rate</div>
                  <div className="h-8 w-8 rounded-lg bg-brand-500/10 flex items-center justify-center group-hover:bg-brand-500/20 transition-colors">
                    <svg className="w-4 h-4 text-brand-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {loading ? "—" : `${metrics?.recoveryRate || 0}%`}
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-2 mt-2">
                  <div
                    className="bg-gradient-to-r from-brand-500 to-brand-400 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(metrics?.recoveryRate || 0, 100)}%` }}
                  />
                </div>
              </div>

              {/* Active Retries */}
              <div className="glass rounded-xl p-6 hover:border-amber-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5 group">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Active Retries</div>
                  <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                    <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold text-amber-400 mb-1">
                  {loading ? "—" : metrics?.activeRetries || 0}
                </div>
                <div className="text-xs text-zinc-500">
                  Currently in retry queue
                </div>
              </div>

              {/* Money Saved vs Competitors */}
              <div className="glass rounded-xl p-6 hover:border-purple-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5 group">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Saved vs Churnkey</div>
                  <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold text-purple-400 mb-1">
                  {loading ? "—" : `$${fmt(metrics?.moneySavedVsCompetitor || 0)}`}
                </div>
                <div className="text-xs text-zinc-500">
                  Churnkey: ${fmtCompact(metrics?.churnkeyCost || 0)} • Revive: ${fmtCompact(metrics?.reviveCost || 0)}
                </div>
              </div>
            </div>

            {/* ========== 2. TIMELINE CHART ========== */}
            <div className="glass rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-medium">Recovery Timeline — Last 30 Days</h3>
                <div className="flex items-center gap-4 text-xs text-zinc-500">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded bg-gradient-to-t from-emerald-500/60 to-emerald-400/40" />
                    Recovered
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded bg-gradient-to-t from-red-500/40 to-red-400/20" />
                    Failed
                  </div>
                </div>
              </div>
              <div className="h-64 flex items-end gap-[3px]">
                {timeline.length > 0
                  ? timeline.map((day, i) => {
                      const total = day.recoveredAmount + day.failedAmount;
                      const totalH = total > 0 ? (total / maxTimelineVal) * 100 : 2;
                      const recoveredH =
                        total > 0
                          ? (day.recoveredAmount / total) * totalH
                          : 0;
                      const failedH = totalH - recoveredH;
                      return (
                        <div
                          key={i}
                          className="flex-1 flex flex-col justify-end relative group cursor-pointer"
                          style={{ height: "100%" }}
                        >
                          {/* Failed portion (top) */}
                          {failedH > 0 && (
                            <div
                              className="w-full rounded-t transition-all hover:opacity-80"
                              style={{
                                height: `${Math.max(failedH, 1)}%`,
                                background:
                                  "linear-gradient(to top, rgba(239, 68, 68, 0.4), rgba(239, 68, 68, 0.2))",
                              }}
                            />
                          )}
                          {/* Recovered portion (bottom) */}
                          <div
                            className={`w-full transition-all hover:opacity-80 ${failedH <= 0 ? "rounded-t" : ""}`}
                            style={{
                              height: `${Math.max(recoveredH, total > 0 ? 1 : 2)}%`,
                              background:
                                total > 0
                                  ? "linear-gradient(to top, rgba(52, 211, 153, 0.6), rgba(52, 211, 153, 0.3))"
                                  : "rgba(63, 63, 70, 0.2)",
                            }}
                          />
                          {/* Tooltip */}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-zinc-800 text-xs text-white px-3 py-2 rounded-lg whitespace-nowrap z-10 shadow-xl border border-white/10">
                            <div className="font-medium mb-1">
                              {new Date(day.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                            <div className="text-emerald-400">
                              ${fmt(day.recoveredAmount)} recovered ({day.recoveredCount})
                            </div>
                            <div className="text-red-400">
                              ${fmt(day.failedAmount)} failed ({day.failedCount})
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : Array.from({ length: 30 }, (_, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t bg-zinc-800/20"
                        style={{ height: "2%" }}
                      />
                    ))}
              </div>
              <div className="mt-3 flex justify-between text-xs text-zinc-600">
                <span>
                  {timeline[0]
                    ? new Date(timeline[0].date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : ""}
                </span>
                <span>
                  {timeline[timeline.length - 1]
                    ? new Date(
                        timeline[timeline.length - 1].date
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : ""}
                </span>
              </div>
            </div>

            {/* ========== 3. RECOVERY FEED + 4. BREAKDOWN ========== */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recovery Feed */}
              <div className="lg:col-span-2 glass rounded-xl overflow-hidden">
                <div className="p-6 border-b border-white/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Payment Recovery Feed</h3>
                      <p className="text-xs text-zinc-500 mt-1">
                        Recent recovery attempts
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {["all", "recovered", "retrying", "pending", "failed"].map(
                        (f) => (
                          <button
                            key={f}
                            onClick={() => setFeedFilter(f)}
                            className={`text-xs px-2.5 py-1 rounded-full transition-colors capitalize ${
                              feedFilter === f
                                ? "bg-white/10 text-white"
                                : "text-zinc-500 hover:text-zinc-300"
                            }`}
                          >
                            {f}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className="max-h-[500px] overflow-y-auto divide-y divide-white/5">
                  {filteredPayments.length > 0 ? (
                    filteredPayments.map((p) => (
                      <div
                        key={p.id}
                        className="px-6 py-4 hover:bg-white/[0.02] transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`mt-1.5 h-2 w-2 rounded-full flex-shrink-0 ${statusDot[p.status] || "bg-zinc-500"}`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <span className="font-medium text-sm text-white">
                                  {p.customerName}
                                </span>
                                <span className="text-zinc-500 text-xs ml-2">
                                  {p.email}
                                </span>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <span className="font-mono font-semibold text-sm text-white">
                                  ${fmt(p.amount)}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs">
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded-full border font-medium ${
                                  statusColor[p.status] ||
                                  "text-zinc-400 bg-zinc-400/10 border-zinc-400/20"
                                }`}
                              >
                                {statusLabel[p.status] || p.status}
                              </span>
                              <span className="text-zinc-500">
                                {p.retryStrategy}
                              </span>
                              <span className="text-zinc-600">•</span>
                              <span className="text-zinc-500">
                                {p.retryCount}/{p.maxRetries} retries
                              </span>
                              <span className="text-zinc-600">•</span>
                              <span className="text-zinc-600">
                                {new Date(p.updatedAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-12 text-center">
                      <div className="text-3xl mb-3">📊</div>
                      <p className="text-sm text-zinc-500">
                        No payments match this filter
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Failure Breakdown */}
              <div className="glass rounded-xl p-6">
                <h3 className="font-medium mb-5">Recovery by Failure Type</h3>
                <div className="space-y-5">
                  {breakdowns.map((b) => {
                    const pct =
                      totalBreakdownCount > 0
                        ? (b.totalCount / totalBreakdownCount) * 100
                        : 0;
                    return (
                      <div key={b.code}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-3 w-3 rounded-full bg-gradient-to-br ${
                                failureColor[b.code] || failureColor.other
                              }`}
                            />
                            <span className="text-sm font-medium">
                              {b.label}
                            </span>
                          </div>
                          <span
                            className={`text-xs font-mono ${
                              failureText[b.code] || failureText.other
                            }`}
                          >
                            {b.recoveryRate}%
                          </span>
                        </div>
                        {/* Bar */}
                        <div className="w-full bg-zinc-800 rounded-full h-2.5 mb-1.5">
                          <div
                            className={`h-2.5 rounded-full bg-gradient-to-r ${
                              failureColor[b.code] || failureColor.other
                            } transition-all duration-700`}
                            style={{
                              width: `${Math.max(b.recoveryRate, 2)}%`,
                            }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-zinc-500">
                          <span>
                            {b.recoveredCount} / {b.totalCount} recovered
                          </span>
                          <span>${fmtCompact(b.recoveredAmount)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Distribution donut visual */}
                <div className="mt-6 pt-5 border-t border-white/5">
                  <h4 className="text-xs text-zinc-500 uppercase tracking-wider mb-3">
                    Failure Distribution
                  </h4>
                  <div className="flex gap-2 flex-wrap">
                    {breakdowns
                      .filter((b) => b.totalCount > 0)
                      .map((b) => {
                        const pct =
                          totalBreakdownCount > 0
                            ? Math.round(
                                (b.totalCount / totalBreakdownCount) * 100
                              )
                            : 0;
                        return (
                          <div
                            key={b.code}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                              failureBg[b.code] || failureBg.other
                            } ${failureText[b.code] || failureText.other}`}
                          >
                            {b.label}: {pct}%
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>

            {/* ========== 5. ROI CALCULATOR ========== */}
            {roi && (
              <div className="glass rounded-xl p-6 bg-gradient-to-r from-brand-600/5 via-transparent to-emerald-600/5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-brand-600/20 flex items-center justify-center">
                    <span className="text-xl">💰</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Your ROI with Revive</h3>
                    <p className="text-xs text-zinc-500">
                      See exactly how much Revive is saving you
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                      Without Revive, You&apos;d Lose
                    </div>
                    <div className="text-2xl font-bold text-red-400">
                      ${fmt(roi.totalLostWithoutRevive)}
                    </div>
                    <div className="text-xs text-zinc-600 mt-1">
                      Total failed payment volume
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                      Revive Recovered
                    </div>
                    <div className="text-2xl font-bold text-emerald-400">
                      ${fmt(roi.totalRecovered)}
                    </div>
                    <div className="text-xs text-zinc-600 mt-1">
                      Revenue brought back
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                      Revive Cost
                    </div>
                    <div className="text-2xl font-bold text-zinc-300">
                      ${fmt(roi.reviveFee)}
                    </div>
                    <div className="text-xs text-zinc-600 mt-1">
                      15% of recovered revenue
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                      Net Savings
                    </div>
                    <div className="text-2xl font-bold text-brand-400">
                      ${fmt(roi.netSavings)}
                    </div>
                    <div className="text-xs text-emerald-400/70 mt-1 font-medium">
                      {roi.roiPercent}% ROI
                    </div>
                  </div>
                </div>

                {/* ROI visual bar */}
                <div className="mt-6 pt-5 border-t border-white/5">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-zinc-500">Lost</span>
                    <div className="flex-1 h-6 bg-zinc-800 rounded-full overflow-hidden flex">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-l-full transition-all duration-1000 flex items-center justify-center"
                        style={{
                          width: `${
                            roi.totalLostWithoutRevive > 0
                              ? Math.min(
                                  (roi.totalRecovered /
                                    roi.totalLostWithoutRevive) *
                                    100,
                                  100
                                )
                              : 0
                          }%`,
                        }}
                      >
                        <span className="text-xs font-medium text-white px-2 truncate">
                          Recovered
                        </span>
                      </div>
                      <div className="h-full flex-1 flex items-center">
                        <span className="text-xs text-zinc-500 px-2 truncate">
                          Remaining
                        </span>
                      </div>
                    </div>
                    <span className="text-zinc-500">Recovered</span>
                  </div>
                </div>
              </div>
            )}

            {/* ========== 6. MOBILE DATE FILTER ========== */}
            <div className="sm:hidden glass rounded-xl p-4">
              <h4 className="text-sm font-medium mb-3">Date Range Filter</h4>
              <div className="flex flex-col gap-2">
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="bg-zinc-900 border border-white/10 rounded-lg text-xs text-zinc-400 px-3 py-2.5 focus:outline-none focus:border-brand-500/50 w-full"
                  placeholder="From"
                />
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="bg-zinc-900 border border-white/10 rounded-lg text-xs text-zinc-400 px-3 py-2.5 focus:outline-none focus:border-brand-500/50 w-full"
                  placeholder="To"
                />
                <button
                  onClick={handleDateFilter}
                  className="text-sm bg-brand-600 text-white py-2.5 rounded-lg hover:bg-brand-500 transition-colors"
                >
                  Apply Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function AnalyticsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#09090b] flex items-center justify-center">
          <div className="text-zinc-500">Loading analytics...</div>
        </main>
      }
    >
      <AnalyticsContent />
    </Suspense>
  );
}
