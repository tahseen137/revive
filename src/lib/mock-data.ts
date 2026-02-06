/**
 * Mock data for Revive demo/sandbox mode
 * Demonstrates the full power of the retry engine with realistic scenarios
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

// Helper function to create dates relative to now
const daysAgo = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

const hoursAgo = (hours: number): Date => {
  const date = new Date();
  date.setHours(date.getHours() - hours);
  return date;
};

const formatDate = (date: Date): string => {
  return date.toISOString();
};

// Featured success stories (as requested in the spec)
const featuredPayments: MockPayment[] = [
  // 1. The Payday Success Story - $47/mo subscription, insufficient_funds, recovered on payday
  {
    id: "featured-1",
    stripeInvoiceId: "in_payday_success",
    customer: "Marcus Thompson",
    email: "marcus.t@freelance.dev",
    amount: 47.00,
    currency: "usd",
    status: "recovered",
    failureReason: "insufficient_funds",
    failureReasonDisplay: "Insufficient funds",
    retries: 2,
    maxRetries: 4,
    nextRetryAt: null,
    emailsSent: 2,
    lastEmailType: "payment_recovered",
    date: "5 days ago",
    createdAt: formatDate(daysAgo(9)),
    recoveredAt: formatDate(daysAgo(5)),
    notes: "💰 Payday Detection Success - Retried on Feb 1 (payday) and recovered!",
    retryTimeline: [
      {
        timestamp: formatDate(daysAgo(9)),
        type: "failed",
        description: "Initial payment failed - insufficient funds",
        amount: 47.00,
        success: false,
      },
      {
        timestamp: formatDate(daysAgo(9)),
        type: "email",
        description: "Sent payment failed notification",
      },
      {
        timestamp: formatDate(daysAgo(7)),
        type: "retry",
        description: "Retry attempt #1 - still insufficient funds",
        amount: 47.00,
        success: false,
      },
      {
        timestamp: formatDate(daysAgo(5)),
        type: "retry",
        description: "Retry attempt #2 on PAYDAY (Feb 1) - SUCCESS! 🎉",
        amount: 47.00,
        success: true,
      },
      {
        timestamp: formatDate(daysAgo(5)),
        type: "email",
        description: "Sent payment recovered confirmation",
      },
      {
        timestamp: formatDate(daysAgo(5)),
        type: "recovered",
        description: "Payment recovered successfully",
        amount: 47.00,
      },
    ],
  },

  // 2. Expired Card + Quick Update = Win
  {
    id: "featured-2",
    stripeInvoiceId: "in_expired_card_win",
    customer: "Sarah Chen",
    email: "sarah.chen@startup.io",
    amount: 129.00,
    currency: "usd",
    status: "recovered",
    failureReason: "expired_card",
    failureReasonDisplay: "Expired card",
    retries: 0,
    maxRetries: 0,
    nextRetryAt: null,
    emailsSent: 2,
    lastEmailType: "payment_recovered",
    date: "3 days ago",
    createdAt: formatDate(daysAgo(4)),
    recoveredAt: formatDate(daysAgo(3)),
    notes: "📧 Dunning email triggered card update within 24h - customer saved!",
    retryTimeline: [
      {
        timestamp: formatDate(daysAgo(4)),
        type: "failed",
        description: "Payment failed - card expired",
        amount: 129.00,
        success: false,
      },
      {
        timestamp: formatDate(daysAgo(4)),
        type: "dunning",
        description: "Detected expired card - sent card update reminder",
      },
      {
        timestamp: formatDate(daysAgo(3)),
        type: "card_updated",
        description: "Customer updated card information",
      },
      {
        timestamp: formatDate(daysAgo(3)),
        type: "recovered",
        description: "Payment processed with new card - SUCCESS! 🎉",
        amount: 129.00,
      },
      {
        timestamp: formatDate(daysAgo(3)),
        type: "email",
        description: "Sent payment recovered confirmation",
      },
    ],
  },

  // 3. Processing Error - Quick Auto-Retry Win
  {
    id: "featured-3",
    stripeInvoiceId: "in_processing_error",
    customer: "David Rodriguez",
    email: "d.rodriguez@company.com",
    amount: 299.00,
    currency: "usd",
    status: "recovered",
    failureReason: "processing_error",
    failureReasonDisplay: "Processing error",
    retries: 1,
    maxRetries: 4,
    nextRetryAt: null,
    emailsSent: 1,
    lastEmailType: "payment_recovered",
    date: "2 days ago",
    createdAt: formatDate(daysAgo(2)),
    recoveredAt: formatDate(hoursAgo(47)),
    notes: "⚡ Auto-retry in 1 hour recovered this temporary processing error",
    retryTimeline: [
      {
        timestamp: formatDate(daysAgo(2)),
        type: "failed",
        description: "Payment failed - temporary processing error",
        amount: 299.00,
        success: false,
      },
      {
        timestamp: formatDate(hoursAgo(47)),
        type: "retry",
        description: "Auto-retry after 1 hour - SUCCESS! 🎉",
        amount: 299.00,
        success: true,
      },
      {
        timestamp: formatDate(hoursAgo(47)),
        type: "email",
        description: "Sent payment recovered confirmation",
      },
      {
        timestamp: formatDate(hoursAgo(47)),
        type: "recovered",
        description: "Payment recovered automatically",
        amount: 299.00,
      },
    ],
  },

  // 4. Stolen Card - Correctly NOT Retried (shows intelligence)
  {
    id: "featured-4",
    stripeInvoiceId: "in_stolen_card",
    customer: "Jessica Williams",
    email: "j.williams@email.com",
    amount: 79.00,
    currency: "usd",
    status: "failed",
    failureReason: "card_declined",
    failureReasonDisplay: "Card reported stolen",
    retries: 0,
    maxRetries: 0,
    nextRetryAt: null,
    emailsSent: 1,
    lastEmailType: "card_update_reminder",
    date: "1 day ago",
    createdAt: formatDate(daysAgo(1)),
    recoveredAt: null,
    notes: "🛡️ Smart detection - stolen card marked unrecoverable (no wasteful retries)",
    retryTimeline: [
      {
        timestamp: formatDate(daysAgo(1)),
        type: "failed",
        description: "Payment failed - card reported stolen",
        amount: 79.00,
        success: false,
      },
      {
        timestamp: formatDate(daysAgo(1)),
        type: "dunning",
        description: "Intelligent retry logic: marked unrecoverable, sent card update request",
      },
    ],
  },
];

// Generate additional realistic payments to reach 50 total
const generateAdditionalPayments = (): MockPayment[] => {
  const firstNames = [
    "Emily", "Michael", "Sophia", "James", "Olivia", "William", "Ava", "Robert",
    "Isabella", "John", "Mia", "Christopher", "Charlotte", "Daniel", "Amelia",
    "Matthew", "Harper", "Andrew", "Evelyn", "Joshua", "Abigail", "Ryan",
    "Emma", "Nicholas", "Elizabeth", "Alexander", "Sofia", "Tyler", "Madison",
    "Kevin", "Avery", "Jacob", "Ella", "Brandon", "Scarlett", "Dylan", "Grace",
    "Nathan", "Chloe", "Samuel", "Victoria", "Benjamin", "Riley", "Logan", "Aria",
  ];

  const lastNames = [
    "Smith", "Johnson", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor",
    "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson",
    "Garcia", "Martinez", "Robinson", "Clark", "Rodriguez", "Lewis", "Lee",
    "Walker", "Hall", "Allen", "Young", "King", "Wright", "Lopez", "Hill",
    "Scott", "Green", "Adams", "Baker", "Nelson", "Carter", "Mitchell", "Perez",
    "Roberts", "Turner", "Phillips", "Campbell", "Parker", "Evans", "Edwards",
  ];

  const domains = [
    "gmail.com", "company.com", "startup.io", "business.co", "tech.dev",
    "agency.com", "consulting.com", "software.io", "design.co", "creative.com",
    "enterprise.com", "saas.io", "digital.co", "ventures.com", "corp.com",
  ];

  const failureTypes = [
    { reason: "insufficient_funds", display: "Insufficient funds", maxRetries: 4 },
    { reason: "card_declined", display: "Card declined", maxRetries: 4 },
    { reason: "expired_card", display: "Expired card", maxRetries: 0 },
    { reason: "processing_error", display: "Processing error", maxRetries: 4 },
    { reason: "generic_decline", display: "Generic decline", maxRetries: 4 },
  ];

  const statuses: Array<"recovered" | "retrying" | "pending" | "dunning" | "failed"> = [
    "recovered", "recovered", "recovered", "recovered", "recovered", // 87% recovery rate
    "recovered", "recovered", "recovered", "recovered", "recovered",
    "recovered", "recovered", "recovered", "recovered", "recovered",
    "recovered", "recovered", "recovered", "recovered", "recovered",
    "recovered", "recovered", "recovered", "recovered", "recovered",
    "recovered", "recovered", "recovered", "recovered", "recovered",
    "recovered", "recovered", "recovered", "recovered", "recovered",
    "recovered", "recovered", "recovered", "recovered", "recovered",
    "retrying", "retrying", "retrying", "dunning", "dunning", "failed",
  ];

  const amounts = [29, 39, 47, 49, 59, 79, 89, 99, 129, 149, 179, 199, 249, 299, 399, 499];

  const payments: MockPayment[] = [];

  for (let i = 0; i < 46; i++) {
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[Math.floor(i / firstNames.length) % lastNames.length];
    const name = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domains[i % domains.length]}`;
    
    const failure = failureTypes[i % failureTypes.length];
    const status = statuses[i];
    const amount = amounts[i % amounts.length];
    const daysOld = Math.floor(i / 2) + 1;
    
    const retries = status === "recovered" 
      ? Math.floor(Math.random() * 3) + 1
      : status === "retrying"
      ? Math.floor(Math.random() * 3)
      : status === "dunning" || failure.reason === "expired_card"
      ? 0
      : Math.floor(Math.random() * 2);

    const emailsSent = status === "recovered" 
      ? retries + 1
      : status === "retrying"
      ? retries
      : status === "dunning"
      ? Math.floor(Math.random() * 2) + 1
      : 1;

    const lastEmailType = status === "recovered"
      ? "payment_recovered"
      : status === "dunning"
      ? "card_update_reminder"
      : status === "retrying"
      ? "payment_failed"
      : "final_warning";

    payments.push({
      id: `gen-${i + 1}`,
      stripeInvoiceId: `in_demo_${i + 1}`,
      customer: name,
      email,
      amount,
      currency: "usd",
      status,
      failureReason: failure.reason,
      failureReasonDisplay: failure.display,
      retries,
      maxRetries: failure.maxRetries,
      nextRetryAt: status === "retrying" 
        ? formatDate(new Date(Date.now() + (Math.random() * 3 + 1) * 86400000))
        : null,
      emailsSent,
      lastEmailType,
      date: daysOld === 1 ? "1 day ago" : daysOld < 7 ? `${daysOld} days ago` : `${Math.floor(daysOld / 7)} week${Math.floor(daysOld / 7) > 1 ? 's' : ''} ago`,
      createdAt: formatDate(daysAgo(daysOld)),
      recoveredAt: status === "recovered" 
        ? formatDate(daysAgo(Math.max(1, daysOld - Math.floor(Math.random() * 3) - 1)))
        : null,
    });
  }

  return payments;
};

// Combine featured + generated payments
export const MOCK_PAYMENTS: MockPayment[] = [
  ...featuredPayments,
  ...generateAdditionalPayments(),
];

// Calculate stats from mock data
const calculateStats = (): MockStats => {
  const recovered = MOCK_PAYMENTS.filter(p => p.status === "recovered");
  const retrying = MOCK_PAYMENTS.filter(p => p.status === "retrying");
  const dunning = MOCK_PAYMENTS.filter(p => p.status === "dunning");
  const failed = MOCK_PAYMENTS.filter(p => p.status === "failed");
  
  const totalRecovered = recovered.reduce((sum, p) => sum + p.amount, 0);
  const mrrSaved = recovered.reduce((sum, p) => sum + p.amount, 0); // Assuming MRR = recovered amount
  
  // Recovery rate: recovered / (recovered + failed)
  const completedAttempts = recovered.length + failed.length;
  const recoveryRate = completedAttempts > 0 
    ? Math.round((recovered.length / completedAttempts) * 100)
    : 0;

  return {
    totalRecovered,
    recoveryRate,
    activeRetries: retrying.length,
    dunningCount: dunning.length,
    failedThisMonth: MOCK_PAYMENTS.length,
    recoveredThisMonth: recovered.length,
    pendingRetries: retrying.length,
    mrrSaved,
    churnPrevented: Math.round((recovered.length / MOCK_PAYMENTS.length) * 100),
    totalPayments: MOCK_PAYMENTS.length,
  };
};

export const MOCK_STATS: MockStats = calculateStats();

// Generate 30-day trend data
export const MOCK_TREND: MockTrend[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  
  // More recoveries toward the end (showing improvement over time)
  const baseRecoveries = i < 10 ? 2 : i < 20 ? 4 : 6;
  const recovered = baseRecoveries + Math.floor(Math.random() * 3);
  const failed = Math.floor(Math.random() * 2);
  const avgAmount = 150;
  
  return {
    date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    recovered,
    failed,
    amount: recovered * avgAmount,
  };
});

// Activity feed items (mix of everything)
export const MOCK_ACTIVITY = [
  {
    time: "2 minutes ago",
    type: "recovery",
    message: "Payment recovered for Emily Anderson ($149.00)",
    icon: "✅",
  },
  {
    time: "15 minutes ago",
    type: "email",
    message: "Dunning email sent to Marcus Thompson",
    icon: "📧",
  },
  {
    time: "1 hour ago",
    type: "retry",
    message: "Retry attempt #2 for Sarah Chen - Success!",
    icon: "🔄",
  },
  {
    time: "2 hours ago",
    type: "email",
    message: "Payment recovered notification sent to David Rodriguez",
    icon: "📧",
  },
  {
    time: "3 hours ago",
    type: "recovery",
    message: "Payment recovered for Michael Brown ($299.00)",
    icon: "✅",
  },
  {
    time: "5 hours ago",
    type: "retry",
    message: "Payday retry scheduled for 3 customers",
    icon: "📅",
  },
];
