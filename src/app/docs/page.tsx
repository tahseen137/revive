"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const navigation = [
  { id: "getting-started", title: "Getting Started" },
  { id: "webhook-events", title: "Webhook Events" },
  { id: "endpoints", title: "REST API Endpoints" },
  { id: "authentication", title: "Authentication" },
  { id: "rate-limits", title: "Rate Limits" },
  { id: "errors", title: "Error Codes" },
];

const codeExamples = {
  health: {
    curl: `curl https://revive-hq.com/api/health \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
    javascript: `const response = await fetch('https://revive-hq.com/api/health', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});
const data = await response.json();`,
  },
  dashboard: {
    curl: `curl https://revive-hq.com/api/dashboard/stats \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
    javascript: `const response = await fetch('https://revive-hq.com/api/dashboard/stats', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});
const stats = await response.json();`,
  },
  webhookSetup: {
    curl: `# Configure in Stripe Dashboard:
# 1. Go to Developers → Webhooks
# 2. Add endpoint: https://revive-hq.com/api/webhooks/stripe
# 3. Select events:
#    - invoice.payment_failed
#    - invoice.payment_succeeded
#    - customer.subscription.updated
#    - customer.subscription.deleted`,
    javascript: `// Webhook handler example (if self-hosting)
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/webhooks/stripe', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const event = stripe.webhooks.constructEvent(
    req.body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET
  );
  
  // Handle event
  switch (event.type) {
    case 'invoice.payment_failed':
      // Revive handles this automatically
      break;
  }
  res.json({received: true});
});`,
  },
  recoveryStatus: {
    curl: `curl "https://revive-hq.com/api/recovery/status?invoiceId=in_xxx" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
    javascript: `const response = await fetch(
  'https://revive-hq.com/api/recovery/status?invoiceId=in_xxx',
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    }
  }
);
const status = await response.json();`,
  },
  recoveryRetry: {
    curl: `curl -X POST https://revive-hq.com/api/recovery/retry \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"invoiceId": "in_xxx"}'`,
    javascript: `const response = await fetch('https://revive-hq.com/api/recovery/retry', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    invoiceId: 'in_xxx'
  })
});
const result = await response.json();`,
  },
};

function CodeBlock({ code, language = "bash" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <div className="absolute right-3 top-3 z-10">
        <button
          onClick={copy}
          className="px-3 py-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg border border-zinc-700 transition-all opacity-0 group-hover:opacity-100"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-4 overflow-x-auto text-sm">
        <code className={`language-${language} text-zinc-300`}>{code}</code>
      </pre>
    </div>
  );
}

function ApiEndpoint({
  method,
  path,
  description,
}: {
  method: string;
  path: string;
  description: string;
}) {
  const methodColors: Record<string, string> = {
    GET: "bg-green-500/10 text-green-400 border-green-500/20",
    POST: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    PUT: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    DELETE: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <div className="flex items-start gap-3 mb-4">
      <span
        className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold border ${
          methodColors[method] || methodColors.GET
        }`}
      >
        {method}
      </span>
      <div className="flex-1">
        <code className="text-brand-400 font-mono text-sm">{path}</code>
        <p className="text-zinc-400 text-sm mt-1">{description}</p>
      </div>
    </div>
  );
}

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("getting-started");
  const [activeLanguage, setActiveLanguage] = useState<"curl" | "javascript">("curl");

  return (
    <main className="min-h-screen bg-[#09090b]">
      <Navbar />

      <div className="pt-20">
        {/* Header */}
        <div className="border-b border-white/5 bg-gradient-to-b from-zinc-900/50 to-transparent">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-brand-600/10 border border-brand-500/20 flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-brand-400"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <line x1="10" y1="9" x2="8" y2="9" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold">API Documentation</h1>
            </div>
            <p className="text-lg text-zinc-400 max-w-2xl">
              Complete reference for integrating Revive into your application. Connect Stripe, configure webhooks, and recover failed payments programmatically.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex gap-12">
            {/* Sidebar */}
            <aside className="w-64 shrink-0 sticky top-24 h-fit hidden lg:block">
              <nav className="space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveSection(item.id);
                      document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`block px-4 py-2 rounded-lg text-sm transition-all ${
                      activeSection === item.id
                        ? "bg-brand-600/10 text-brand-400 font-medium border-l-2 border-brand-500"
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.title}
                  </a>
                ))}
              </nav>

              <div className="mt-8 p-4 glass rounded-xl">
                <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                  Need Help?
                </div>
                <Link
                  href="mailto:support@revive-hq.com"
                  className="text-sm text-brand-400 hover:text-brand-300"
                >
                  support@revive-hq.com
                </Link>
              </div>
            </aside>

            {/* Content */}
            <div className="flex-1 max-w-3xl">
              {/* Getting Started */}
              <section id="getting-started" className="mb-20 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-3xl">🚀</span>
                  Getting Started
                </h2>

                <div className="space-y-6">
                  <div className="glass rounded-2xl p-6 border-l-2 border-brand-500">
                    <h3 className="text-xl font-semibold mb-3">Quick Setup Guide</h3>
                    <p className="text-zinc-400 mb-4">
                      Revive connects to your Stripe account and automatically handles failed payment recovery. Setup takes less than 3 minutes.
                    </p>

                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600/10 text-brand-400 font-semibold text-sm">
                          1
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Connect Your Stripe Account</h4>
                          <p className="text-sm text-zinc-400">
                            Click "Connect with Stripe" in your{" "}
                            <Link href="/dashboard" className="text-brand-400 hover:underline">
                              dashboard
                            </Link>
                            . We use OAuth for secure, one-click authorization.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600/10 text-brand-400 font-semibold text-sm">
                          2
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Configure Webhooks</h4>
                          <p className="text-sm text-zinc-400 mb-2">
                            Revive automatically registers the required webhooks. You can verify in your{" "}
                            <a
                              href="https://dashboard.stripe.com/webhooks"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-brand-400 hover:underline"
                            >
                              Stripe Dashboard
                            </a>
                            :
                          </p>
                          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-lg p-3 text-xs font-mono text-zinc-400">
                            Endpoint: https://revive-hq.com/api/webhooks/stripe
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600/10 text-brand-400 font-semibold text-sm">
                          3
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Customize Recovery Settings</h4>
                          <p className="text-sm text-zinc-400">
                            Configure retry schedules, dunning email templates, and recovery preferences in Settings.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-600/10 text-green-400 font-semibold text-sm">
                          ✓
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1 text-green-400">You&apos;re Live!</h4>
                          <p className="text-sm text-zinc-400">
                            Revive now monitors your account 24/7 and automatically recovers failed payments.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4">
                    <div className="flex gap-3">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-blue-400 shrink-0 mt-0.5"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12.01" y2="8" />
                      </svg>
                      <div>
                        <p className="text-sm text-blue-300 font-medium mb-1">
                          No code changes required
                        </p>
                        <p className="text-sm text-blue-200/70">
                          Revive works entirely through Stripe webhooks. You don&apos;t need to modify your application code or payment flow.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Webhook Events */}
              <section id="webhook-events" className="mb-20 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-3xl">🔔</span>
                  Webhook Events
                </h2>

                <p className="text-zinc-400 mb-6">
                  Revive listens to the following Stripe webhook events to automatically detect and recover failed payments:
                </p>

                <div className="space-y-4">
                  <div className="glass rounded-xl p-6 border-l-2 border-red-500">
                    <div className="flex items-start justify-between mb-2">
                      <code className="text-red-400 font-mono font-semibold">invoice.payment_failed</code>
                      <span className="px-2 py-0.5 bg-red-500/10 text-red-400 text-xs rounded-md border border-red-500/20">
                        Critical
                      </span>
                    </div>
                    <p className="text-sm text-zinc-400 mb-3">
                      Triggered when an invoice payment attempt fails. Revive immediately creates a recovery record, analyzes the failure reason, and schedules smart retries based on the decline code.
                    </p>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-500">Triggers:</span>
                        <span className="text-zinc-300">Payment record creation, retry scheduling</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-500">Actions:</span>
                        <span className="text-zinc-300">Dunning email sent (if applicable), retry scheduled</span>
                      </div>
                    </div>
                  </div>

                  <div className="glass rounded-xl p-6 border-l-2 border-green-500">
                    <div className="flex items-start justify-between mb-2">
                      <code className="text-green-400 font-mono font-semibold">invoice.payment_succeeded</code>
                      <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-xs rounded-md border border-green-500/20">
                        Recovery
                      </span>
                    </div>
                    <p className="text-sm text-zinc-400 mb-3">
                      Triggered when a payment succeeds. If this invoice was previously marked as failed, Revive marks it as recovered and sends a confirmation email to the customer.
                    </p>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-500">Triggers:</span>
                        <span className="text-zinc-300">Recovery detection, analytics update</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-500">Actions:</span>
                        <span className="text-zinc-300">Mark as recovered, send confirmation, update stats</span>
                      </div>
                    </div>
                  </div>

                  <div className="glass rounded-xl p-6 border-l-2 border-blue-500">
                    <div className="flex items-start justify-between mb-2">
                      <code className="text-blue-400 font-mono font-semibold">customer.subscription.updated</code>
                      <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-xs rounded-md border border-blue-500/20">
                        Monitoring
                      </span>
                    </div>
                    <p className="text-sm text-zinc-400 mb-3">
                      Triggered when subscription details change (e.g., payment method updated, plan changed). Revive uses this to detect manual payment method updates and adjust retry strategies.
                    </p>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-500">Use case:</span>
                        <span className="text-zinc-300">Customer updated card → cancel pending retries</span>
                      </div>
                    </div>
                  </div>

                  <div className="glass rounded-xl p-6 border-l-2 border-yellow-500">
                    <div className="flex items-start justify-between mb-2">
                      <code className="text-yellow-400 font-mono font-semibold">customer.subscription.deleted</code>
                      <span className="px-2 py-0.5 bg-yellow-500/10 text-yellow-400 text-xs rounded-md border border-yellow-500/20">
                        Cleanup
                      </span>
                    </div>
                    <p className="text-sm text-zinc-400 mb-3">
                      Triggered when a subscription is cancelled. Revive stops all pending retries for this subscription and marks the recovery attempt as cancelled.
                    </p>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-500">Actions:</span>
                        <span className="text-zinc-300">Cancel pending retries, update analytics</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
                  <h4 className="font-semibold text-sm mb-3">Example Webhook Configuration</h4>
                  <div className="flex gap-2 mb-3">
                    <button
                      onClick={() => setActiveLanguage("curl")}
                      className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
                        activeLanguage === "curl"
                          ? "bg-brand-600 text-white"
                          : "bg-zinc-800 text-zinc-400 hover:text-white"
                      }`}
                    >
                      Shell
                    </button>
                    <button
                      onClick={() => setActiveLanguage("javascript")}
                      className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
                        activeLanguage === "javascript"
                          ? "bg-brand-600 text-white"
                          : "bg-zinc-800 text-zinc-400 hover:text-white"
                      }`}
                    >
                      JavaScript
                    </button>
                  </div>
                  <CodeBlock
                    code={codeExamples.webhookSetup[activeLanguage]}
                    language={activeLanguage === "curl" ? "bash" : "javascript"}
                  />
                </div>
              </section>

              {/* REST API Endpoints */}
              <section id="endpoints" className="mb-20 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-3xl">⚡</span>
                  REST API Endpoints
                </h2>

                <p className="text-zinc-400 mb-6">
                  Programmatically access Revive&apos;s recovery data and trigger manual actions. All endpoints require authentication.
                </p>

                {/* Health Check */}
                <div className="mb-8">
                  <div className="glass rounded-xl p-6 mb-4">
                    <ApiEndpoint
                      method="GET"
                      path="/api/health"
                      description="Health check endpoint. Returns system status and connection info."
                    />
                    <div className="space-y-3 mt-4">
                      <div>
                        <h4 className="text-sm font-semibold text-zinc-300 mb-2">Response</h4>
                        <CodeBlock
                          code={`{
  "timestamp": "2026-02-05T18:30:00.000Z",
  "env": {
    "hasRedisUrl": true,
    "hasStripeKey": true,
    "hasWebhookSecret": true
  },
  "db": {
    "status": "connected",
    "latency": 45
  },
  "stats": {
    "totalPayments": 847,
    "recovered": 796
  }
}`}
                          language="json"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
                    <h4 className="font-semibold text-sm mb-3">Example Request</h4>
                    <div className="flex gap-2 mb-3">
                      <button
                        onClick={() => setActiveLanguage("curl")}
                        className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
                          activeLanguage === "curl"
                            ? "bg-brand-600 text-white"
                            : "bg-zinc-800 text-zinc-400 hover:text-white"
                        }`}
                      >
                        cURL
                      </button>
                      <button
                        onClick={() => setActiveLanguage("javascript")}
                        className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
                          activeLanguage === "javascript"
                            ? "bg-brand-600 text-white"
                            : "bg-zinc-800 text-zinc-400 hover:text-white"
                        }`}
                      >
                        JavaScript
                      </button>
                    </div>
                    <CodeBlock
                      code={codeExamples.health[activeLanguage]}
                      language={activeLanguage === "curl" ? "bash" : "javascript"}
                    />
                  </div>
                </div>

                {/* Dashboard Stats */}
                <div className="mb-8">
                  <div className="glass rounded-xl p-6 mb-4">
                    <ApiEndpoint
                      method="GET"
                      path="/api/dashboard/stats"
                      description="Get comprehensive recovery statistics and metrics."
                    />
                    <div className="space-y-3 mt-4">
                      <div>
                        <h4 className="text-sm font-semibold text-zinc-300 mb-2">Query Parameters</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex gap-2">
                            <code className="text-brand-400">accountId</code>
                            <span className="text-zinc-500">•</span>
                            <span className="text-zinc-400">Optional: Filter by Stripe account ID</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-zinc-300 mb-2">Response</h4>
                        <CodeBlock
                          code={`{
  "stats": {
    "totalRecovered": 24750.00,
    "recoveryRate": 94.2,
    "activeRetries": 18,
    "dunningCount": 5,
    "failedThisMonth": 42,
    "recoveredThisMonth": 38,
    "mrrSaved": 3250.00,
    "churnPrevented": 87.5
  },
  "dailyTrend": [
    {
      "date": "2026-02-05",
      "recovered": 3,
      "failed": 1,
      "amount": 450.00
    }
  ],
  "dbHealth": {
    "status": "connected"
  }
}`}
                          language="json"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
                    <h4 className="font-semibold text-sm mb-3">Example Request</h4>
                    <CodeBlock
                      code={codeExamples.dashboard[activeLanguage]}
                      language={activeLanguage === "curl" ? "bash" : "javascript"}
                    />
                  </div>
                </div>

                {/* Webhook Receiver */}
                <div className="mb-8">
                  <div className="glass rounded-xl p-6">
                    <ApiEndpoint
                      method="POST"
                      path="/api/webhooks/stripe"
                      description="Stripe webhook receiver. Handles all payment and subscription events."
                    />
                    <div className="mt-4 bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-3">
                      <p className="text-sm text-yellow-200/80">
                        <strong className="text-yellow-300">Note:</strong> This endpoint is automatically configured when you connect Stripe. Direct calls are not recommended.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recovery Status */}
                <div className="mb-8">
                  <div className="glass rounded-xl p-6 mb-4">
                    <ApiEndpoint
                      method="GET"
                      path="/api/recovery/status"
                      description="Get recovery status for a specific invoice or customer."
                    />
                    <div className="space-y-3 mt-4">
                      <div>
                        <h4 className="text-sm font-semibold text-zinc-300 mb-2">Query Parameters</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex gap-2">
                            <code className="text-brand-400">invoiceId</code>
                            <span className="text-zinc-500">•</span>
                            <span className="text-zinc-400">Stripe invoice ID (e.g., in_xxx)</span>
                          </div>
                          <div className="flex gap-2">
                            <code className="text-brand-400">customerId</code>
                            <span className="text-zinc-500">•</span>
                            <span className="text-zinc-400">Alternative: Stripe customer ID</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-zinc-300 mb-2">Response</h4>
                        <CodeBlock
                          code={`{
  "payment": {
    "id": "pay_xxx",
    "stripeInvoiceId": "in_xxx",
    "status": "retrying",
    "amount": 4900,
    "currency": "usd",
    "retryCount": 2,
    "maxRetries": 5,
    "nextRetryAt": 1738792800000,
    "failureReason": "insufficient_funds",
    "retryHistory": [
      {
        "attemptedAt": 1738706400000,
        "result": "failed",
        "reason": "insufficient_funds"
      }
    ],
    "emailsSent": [
      {
        "type": "dunning_initial",
        "sentAt": 1738706400000,
        "opened": true
      }
    ]
  }
}`}
                          language="json"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
                    <h4 className="font-semibold text-sm mb-3">Example Request</h4>
                    <CodeBlock
                      code={codeExamples.recoveryStatus[activeLanguage]}
                      language={activeLanguage === "curl" ? "bash" : "javascript"}
                    />
                  </div>
                </div>

                {/* Manual Retry */}
                <div className="mb-8">
                  <div className="glass rounded-xl p-6 mb-4">
                    <ApiEndpoint
                      method="POST"
                      path="/api/recovery/retry"
                      description="Manually trigger a retry for a failed payment."
                    />
                    <div className="space-y-3 mt-4">
                      <div>
                        <h4 className="text-sm font-semibold text-zinc-300 mb-2">Request Body</h4>
                        <CodeBlock
                          code={`{
  "invoiceId": "in_xxx"
}`}
                          language="json"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-zinc-300 mb-2">Response</h4>
                        <CodeBlock
                          code={`{
  "success": true,
  "message": "Payment retry initiated",
  "payment": {
    "id": "pay_xxx",
    "status": "retrying",
    "retryCount": 3,
    "nextRetryAt": 1738879200000
  }
}`}
                          language="json"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
                    <h4 className="font-semibold text-sm mb-3">Example Request</h4>
                    <CodeBlock
                      code={codeExamples.recoveryRetry[activeLanguage]}
                      language={activeLanguage === "curl" ? "bash" : "javascript"}
                    />
                  </div>
                </div>
              </section>

              {/* Authentication */}
              <section id="authentication" className="mb-20 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-3xl">🔐</span>
                  Authentication
                </h2>

                <p className="text-zinc-400 mb-6">
                  All API requests require authentication using an API key. You can generate API keys in your dashboard settings.
                </p>

                <div className="glass rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-3">Using API Keys</h3>
                  <p className="text-sm text-zinc-400 mb-4">
                    Include your API key in the <code className="text-brand-400 bg-brand-500/10 px-1.5 py-0.5 rounded">Authorization</code> header:
                  </p>
                  <CodeBlock code={`Authorization: Bearer YOUR_API_KEY`} language="bash" />
                </div>

                <div className="space-y-4">
                  <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                    <div className="flex gap-3">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-red-400 shrink-0 mt-0.5"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      <div>
                        <p className="text-sm text-red-300 font-medium mb-1">
                          Keep your API keys secure
                        </p>
                        <p className="text-sm text-red-200/70">
                          Never commit API keys to version control or expose them in client-side code. Use environment variables and rotate keys regularly.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="glass rounded-xl p-6">
                    <h4 className="font-semibold mb-3">Key Management Best Practices</h4>
                    <ul className="space-y-2 text-sm text-zinc-400">
                      <li className="flex gap-2">
                        <span className="text-brand-400">•</span>
                        <span>Use separate keys for development, staging, and production</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-brand-400">•</span>
                        <span>Rotate keys every 90 days or immediately if compromised</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-brand-400">•</span>
                        <span>Store keys in secure environment variables or secret managers</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-brand-400">•</span>
                        <span>Monitor API key usage in your dashboard for suspicious activity</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Rate Limits */}
              <section id="rate-limits" className="mb-20 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-3xl">⏱️</span>
                  Rate Limits
                </h2>

                <p className="text-zinc-400 mb-6">
                  To ensure fair usage and system stability, API requests are rate-limited per account.
                </p>

                <div className="glass rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4">Standard Limits</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
                      <div className="text-2xl font-bold text-brand-400 mb-1">100</div>
                      <div className="text-sm text-zinc-400">requests per minute</div>
                    </div>
                    <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
                      <div className="text-2xl font-bold text-brand-400 mb-1">5,000</div>
                      <div className="text-sm text-zinc-400">requests per hour</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="glass rounded-xl p-6">
                    <h4 className="font-semibold mb-3">Rate Limit Headers</h4>
                    <p className="text-sm text-zinc-400 mb-3">
                      Every API response includes rate limit information in the headers:
                    </p>
                    <CodeBlock
                      code={`X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1738706460`}
                      language="bash"
                    />
                  </div>

                  <div className="glass rounded-xl p-6">
                    <h4 className="font-semibold mb-3">Handling Rate Limits</h4>
                    <p className="text-sm text-zinc-400 mb-3">
                      When you exceed the rate limit, you&apos;ll receive a <code className="text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded">429 Too Many Requests</code> response:
                    </p>
                    <CodeBlock
                      code={`{
  "error": {
    "type": "rate_limit_error",
    "message": "Too many requests. Please retry after 60 seconds.",
    "retryAfter": 60
  }
}`}
                      language="json"
                    />
                  </div>

                  <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4">
                    <div className="flex gap-3">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-blue-400 shrink-0 mt-0.5"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12.01" y2="8" />
                      </svg>
                      <div>
                        <p className="text-sm text-blue-300 font-medium mb-1">
                          Need higher limits?
                        </p>
                        <p className="text-sm text-blue-200/70">
                          Contact{" "}
                          <a href="mailto:support@revive-hq.com" className="text-blue-400 hover:underline">
                            support@revive-hq.com
                          </a>{" "}
                          to discuss custom rate limits for your use case.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Error Codes */}
              <section id="errors" className="mb-20 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-3xl">⚠️</span>
                  Error Codes
                </h2>

                <p className="text-zinc-400 mb-6">
                  Revive uses conventional HTTP response codes and returns detailed error messages in JSON format.
                </p>

                <div className="space-y-4">
                  <div className="glass rounded-xl overflow-hidden">
                    <div className="bg-green-500/5 border-b border-green-500/20 px-6 py-3">
                      <div className="flex items-center gap-2">
                        <code className="text-green-400 font-mono font-semibold">2xx</code>
                        <span className="text-green-300 font-medium">Success</span>
                      </div>
                    </div>
                    <div className="p-6 space-y-3">
                      <div>
                        <code className="text-sm font-mono text-zinc-300">200 OK</code>
                        <p className="text-sm text-zinc-400 mt-1">Request succeeded</p>
                      </div>
                      <div>
                        <code className="text-sm font-mono text-zinc-300">201 Created</code>
                        <p className="text-sm text-zinc-400 mt-1">Resource successfully created</p>
                      </div>
                    </div>
                  </div>

                  <div className="glass rounded-xl overflow-hidden">
                    <div className="bg-yellow-500/5 border-b border-yellow-500/20 px-6 py-3">
                      <div className="flex items-center gap-2">
                        <code className="text-yellow-400 font-mono font-semibold">4xx</code>
                        <span className="text-yellow-300 font-medium">Client Errors</span>
                      </div>
                    </div>
                    <div className="p-6 space-y-3">
                      <div>
                        <code className="text-sm font-mono text-zinc-300">400 Bad Request</code>
                        <p className="text-sm text-zinc-400 mt-1">Invalid request format or parameters</p>
                      </div>
                      <div>
                        <code className="text-sm font-mono text-zinc-300">401 Unauthorized</code>
                        <p className="text-sm text-zinc-400 mt-1">Missing or invalid API key</p>
                      </div>
                      <div>
                        <code className="text-sm font-mono text-zinc-300">403 Forbidden</code>
                        <p className="text-sm text-zinc-400 mt-1">API key doesn&apos;t have required permissions</p>
                      </div>
                      <div>
                        <code className="text-sm font-mono text-zinc-300">404 Not Found</code>
                        <p className="text-sm text-zinc-400 mt-1">Requested resource doesn&apos;t exist</p>
                      </div>
                      <div>
                        <code className="text-sm font-mono text-zinc-300">429 Too Many Requests</code>
                        <p className="text-sm text-zinc-400 mt-1">Rate limit exceeded</p>
                      </div>
                    </div>
                  </div>

                  <div className="glass rounded-xl overflow-hidden">
                    <div className="bg-red-500/5 border-b border-red-500/20 px-6 py-3">
                      <div className="flex items-center gap-2">
                        <code className="text-red-400 font-mono font-semibold">5xx</code>
                        <span className="text-red-300 font-medium">Server Errors</span>
                      </div>
                    </div>
                    <div className="p-6 space-y-3">
                      <div>
                        <code className="text-sm font-mono text-zinc-300">500 Internal Server Error</code>
                        <p className="text-sm text-zinc-400 mt-1">Something went wrong on our end</p>
                      </div>
                      <div>
                        <code className="text-sm font-mono text-zinc-300">503 Service Unavailable</code>
                        <p className="text-sm text-zinc-400 mt-1">Temporary service disruption</p>
                      </div>
                    </div>
                  </div>

                  <div className="glass rounded-xl p-6">
                    <h4 className="font-semibold mb-3">Error Response Format</h4>
                    <p className="text-sm text-zinc-400 mb-3">
                      All error responses follow a consistent structure:
                    </p>
                    <CodeBlock
                      code={`{
  "error": {
    "type": "invalid_request_error",
    "message": "Invalid invoice ID format",
    "param": "invoiceId",
    "code": "invalid_format"
  }
}`}
                      language="json"
                    />
                  </div>
                </div>
              </section>

              {/* Footer CTA */}
              <div className="glass rounded-2xl p-8 text-center border-l-2 border-brand-500">
                <h3 className="text-2xl font-bold mb-3">Ready to recover lost revenue?</h3>
                <p className="text-zinc-400 mb-6">
                  Connect your Stripe account and start recovering failed payments in minutes.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-medium px-6 py-3 rounded-xl transition-all"
                  >
                    Get Started Free
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <a
                    href="mailto:support@revive-hq.com"
                    className="inline-flex items-center justify-center gap-2 text-zinc-400 hover:text-white font-medium px-6 py-3 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all"
                  >
                    Contact Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
