/**
 * Mock data for Revive demo mode
 * 5 curated payments with realistic states/decline codes + supporting stats
 */

export interface MockPayment {
  id: string;
  stripeInvoiceId: string;
  customer: string;
  email: string;
  amount: number;
  currency: string;
  status: "recovered" | "retrying" | "pending" | "dunning" | "failed" | "expired_card";
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
  retryTimeline?: RetryTimelineEvent[];
  notes?: string;
}

export interface RetryTimelineEvent {
  timestamp: string;
  type: "failed" | "retry" | "email" | "recovered" | "dunning" | "card_updated";
  description: string;
  amount?: number;
  success?: boolean;
}

export interface MockStats {
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

export interface MockTrend {
  date: string;
  recovered: number;
  failed: number;
  amount: number;
}

// Helpers
const daysAgo = (days: number): Date => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d;
};
const hoursAgo = (h: number): Date => {
  const d = new Date();
  d.setHours(d.getHours() - h);
  return d;
};
const iso = (d: Date) => d.toISOString();

// ============ 5 Demo Payments ============
// Each represents a distinct scenario with specific decline codes.

export const MOCK_PAYMENTS: MockPayment[] = [
  // 1. card_declined → recovered (smart retry after 4h worked)
  {
    id: "demo-1",
    stripeInvoiceId: "in_demo_card_recovered",
    customer: "Sarah Johnson",
    email: "sarah.j@techcorp.com",
    amount: 149.00,
    currency: "usd",
    status: "recovered",
    failureReason: "card_declined",
    failureReasonDisplay: "Card declined",
    retries: 2,
    maxRetries: 4,
    nextRetryAt: null,
    emailsSent: 1,
    lastEmailType: "payment_recovered",
    date: "2 days ago",
    createdAt: iso(daysAgo(2)),
    recoveredAt: iso(hoursAgo(36)),
    notes: "✅ Recovered on 2nd retry after 4-hour smart delay",
    retryTimeline: [
      { timestamp: iso(daysAgo(2)), type: "failed", description: "Payment failed — card declined by issuer", amount: 149.00, success: false },
      { timestamp: iso(daysAgo(2)), type: "email", description: "Sent payment failed notification email" },
      { timestamp: iso(hoursAgo(44)), type: "retry", description: "Retry attempt #1 — still declined", amount: 149.00, success: false },
      { timestamp: iso(hoursAgo(36)), type: "retry", description: "Retry attempt #2 — SUCCESS 🎉", amount: 149.00, success: true },
      { timestamp: iso(hoursAgo(36)), type: "recovered", description: "Payment recovered", amount: 149.00 },
    ],
  },

  // 2. insufficient_funds → retrying (payday-aware schedule)
  {
    id: "demo-2",
    stripeInvoiceId: "in_demo_insuf_retrying",
    customer: "Michael Chen",
    email: "mchen@startup.io",
    amount: 299.00,
    currency: "usd",
    status: "retrying",
    failureReason: "insufficient_funds",
    failureReasonDisplay: "Insufficient funds",
    retries: 1,
    maxRetries: 4,
    nextRetryAt: iso(new Date(Date.now() + 2 * 86400000)),
    emailsSent: 1,
    lastEmailType: "payment_failed",
    date: "1 day ago",
    createdAt: iso(daysAgo(1)),
    recoveredAt: null,
    notes: "🔄 Payday retry scheduled for Feb 1 (expected deposit date)",
    retryTimeline: [
      { timestamp: iso(daysAgo(1)), type: "failed", description: "Payment failed — insufficient funds", amount: 299.00, success: false },
      { timestamp: iso(daysAgo(1)), type: "email", description: "Sent payment failed notification email" },
      { timestamp: iso(hoursAgo(12)), type: "retry", description: "Retry attempt #1 — still insufficient", amount: 299.00, success: false },
    ],
  },

  // 3. expired_card → retrying/dunning (card update email sent)
  {
    id: "demo-3",
    stripeInvoiceId: "in_demo_expired_dunning",
    customer: "Emily Rodriguez",
    email: "emily.r@company.com",
    amount: 79.00,
    currency: "usd",
    status: "dunning",
    failureReason: "expired_card",
    failureReasonDisplay: "Expired card",
    retries: 0,
    maxRetries: 0,
    nextRetryAt: null,
    emailsSent: 2,
    lastEmailType: "card_update_reminder",
    date: "3 days ago",
    createdAt: iso(daysAgo(3)),
    recoveredAt: null,
    notes: "📧 2 card update emails sent — awaiting customer action",
    retryTimeline: [
      { timestamp: iso(daysAgo(3)), type: "failed", description: "Payment failed — card is expired", amount: 79.00, success: false },
      { timestamp: iso(daysAgo(3)), type: "dunning", description: "Smart detection: no retry for expired card, sent card update link" },
      { timestamp: iso(daysAgo(1)), type: "email", description: "Sent follow-up card update reminder" },
    ],
  },

  // 4. card_declined → retrying (multiple retries in progress)
  {
    id: "demo-4",
    stripeInvoiceId: "in_demo_card_retrying",
    customer: "James Wilson",
    email: "jwilson@enterprise.com",
    amount: 499.00,
    currency: "usd",
    status: "retrying",
    failureReason: "card_declined",
    failureReasonDisplay: "Card declined",
    retries: 3,
    maxRetries: 4,
    nextRetryAt: iso(new Date(Date.now() + 86400000)),
    emailsSent: 3,
    lastEmailType: "final_warning",
    date: "5 days ago",
    createdAt: iso(daysAgo(5)),
    recoveredAt: null,
    notes: "⚠️ Final retry tomorrow — final warning email sent",
    retryTimeline: [
      { timestamp: iso(daysAgo(5)), type: "failed", description: "Payment failed — generic card decline", amount: 499.00, success: false },
      { timestamp: iso(daysAgo(5)), type: "email", description: "Sent payment failed notification" },
      { timestamp: iso(daysAgo(4)), type: "retry", description: "Retry #1 — declined", amount: 499.00, success: false },
      { timestamp: iso(daysAgo(3)), type: "retry", description: "Retry #2 — declined", amount: 499.00, success: false },
      { timestamp: iso(daysAgo(1)), type: "retry", description: "Retry #3 — declined", amount: 499.00, success: false },
      { timestamp: iso(daysAgo(1)), type: "email", description: "Sent final warning: 1 retry remaining" },
    ],
  },

  // 5. insufficient_funds → failed (maxed out retries, churned)
  {
    id: "demo-5",
    stripeInvoiceId: "in_demo_insuf_failed",
    customer: "Jennifer Lee",
    email: "jlee@startup.com",
    amount: 99.00,
    currency: "usd",
    status: "failed",
    failureReason: "insufficient_funds",
    failureReasonDisplay: "Insufficient funds",
    retries: 4,
    maxRetries: 4,
    nextRetryAt: null,
    emailsSent: 4,
    lastEmailType: "final_warning",
    date: "2 weeks ago",
    createdAt: iso(daysAgo(18)),
    recoveredAt: null,
    notes: "❌ All 4 retries exhausted — customer notified",
    retryTimeline: [
      { timestamp: iso(daysAgo(18)), type: "failed", description: "Initial payment failed — insufficient funds", amount: 99.00, success: false },
      { timestamp: iso(daysAgo(15)), type: "retry", description: "Retry #1 (3-day cycle) — still insufficient", amount: 99.00, success: false },
      { timestamp: iso(daysAgo(12)), type: "retry", description: "Retry #2 — still insufficient", amount: 99.00, success: false },
      { timestamp: iso(daysAgo(9)), type: "retry", description: "Retry #3 — still insufficient", amount: 99.00, success: false },
      { timestamp: iso(daysAgo(6)), type: "retry", description: "Retry #4 (final) — still insufficient", amount: 99.00, success: false },
      { timestamp: iso(daysAgo(6)), type: "email", description: "Sent final failure notification — all retries exhausted" },
    ],
  },
];

// ============ Stats — matches the brief exactly ============
export const MOCK_STATS: MockStats = {
  totalRecovered: 47_320.50,
  recoveryRate: 73,
  activeRetries: 3,       // payments in retrying/dunning
  dunningCount: 1,
  failedThisMonth: 5,
  recoveredThisMonth: 19, // count of recoveries this month
  pendingRetries: 3,
  mrrSaved: 2_847.00,     // $2,847 recovered THIS month
  churnPrevented: 73,
  totalPayments: 156,
};

// ============ 30-Day Trend ============
export const MOCK_TREND: MockTrend[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  // Upward trend toward end of month (shows Revive working)
  const base = i < 10 ? 2 : i < 20 ? 4 : 6;
  const recovered = base + Math.floor(Math.random() * 3);
  const failed = Math.max(0, Math.floor(Math.random() * 2));
  return {
    date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    recovered,
    failed,
    amount: recovered * 149.95,
  };
});

// ============ Activity Feed ============
export const MOCK_ACTIVITY = [
  { time: "2 min ago",  icon: "✅", message: "Payment recovered for Sarah Johnson ($149.00)" },
  { time: "18 min ago", icon: "📧", message: "Card update reminder sent to Emily Rodriguez" },
  { time: "1 hr ago",   icon: "🔄", message: "Payday retry scheduled for Michael Chen" },
  { time: "3 hr ago",   icon: "📧", message: "Final warning email sent to James Wilson" },
  { time: "5 hr ago",   icon: "✅", message: "Payment recovered via dunning: $249.00" },
  { time: "Yesterday",  icon: "📅", message: "3 payday retries queued for Feb 1" },
];
