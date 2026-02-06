# Revive — Full Codebase Audit Report

**Date:** February 5, 2026  
**Auditor:** Automated Code Audit  
**Scope:** All source files in `src/`, configuration, API routes, Stripe integration  
**Project:** Revive — Failed Payment Recovery SaaS (Next.js 14 App Router + Stripe)

---

## Executive Summary

Revive is a well-structured Next.js 14 application with solid business logic for payment recovery. However, there are **critical security issues** that must be fixed before any user touches the product — most notably **live Stripe API keys in plaintext** and **zero authentication on all API endpoints**. The Stripe integration is competent (webhook signature verification is present), but the overall auth model is missing entirely. Below is a prioritized list of every issue found.

---

## 🔴 CRITICAL — Fix Before Users Arrive

### 1. LIVE Stripe Secret Keys Exposed in `.env` Files

**Files:** `.env` (line 2), `.env.local` (line 2)  
**Impact:** Anyone with access to your machine, backup, or deployment can steal your live Stripe secret key and make charges, refunds, or transfer funds.

```
STRIPE_SECRET_KEY=sk_live_51SxH7xAJmUBqj9CQ...
STRIPE_WEBHOOK_SECRET=whsec_pNZV4WNFHPEJt8JH...
```

The `.gitignore` correctly excludes `.env` and `.env*.local`, so these aren't in the git history — **good**. But:

- The `.env` file contains a **real** webhook secret (`whsec_pNZV...`), while `.env.local` has a placeholder. The `.env` file should not exist or should only contain placeholders.
- The live secret key (`sk_live_...`) is present in **both** files.

**Fix:**
1. **Immediately rotate your Stripe keys** in the [Stripe Dashboard](https://dashboard.stripe.com/apikeys) — consider the current ones compromised.
2. Delete the `.env` file entirely (it shouldn't exist alongside `.env.local`).
3. Replace `.env.local` with `.env.example` containing only placeholders.
4. Set real keys only in Vercel environment variables (never local files for production keys).

```bash
# .env.example (safe to commit)
STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_APP_URL=http://localhost:3000
STRIPE_CONNECT_CLIENT_ID=ca_xxx
RESEND_API_KEY=re_xxx
RESEND_FROM_EMAIL=notifications@yourdomain.com
NOTIFY_EMAIL=you@example.com
ADMIN_SECRET=change_me_in_production
```

---

### 2. Zero Authentication on ALL API Endpoints

**Files:** Every route in `src/app/api/`  
**Impact:** Anyone can access your dashboard stats, view all payments (including customer emails and amounts), trigger manual retries, and view internal health data.

**Affected Endpoints (completely unauthenticated):**
| Endpoint | Risk |
|---|---|
| `GET /api/dashboard/stats` | Leaks all recovery stats |
| `GET /api/dashboard/payments` | Leaks customer emails, names, amounts, failure reasons |
| `POST /api/recovery/retry` | Anyone can trigger Stripe payment retries |
| `GET /api/recovery/status` | Leaks payment details by invoice/customer ID |
| `GET /api/health` | Leaks env variable presence, DB type, global stats |
| `POST /api/checkout` | Unauthenticated checkout creation (less critical as Stripe handles payment) |
| `GET /api/email/preview` | Low risk but should still be protected |

**Fix:** Add authentication middleware. At minimum, use a session-based auth system or API key validation:

```typescript
// src/lib/auth.ts — Minimal API key auth
import { NextRequest, NextResponse } from "next/server";

export function requireAuth(request: NextRequest): NextResponse | null {
  const authHeader = request.headers.get("Authorization");
  const apiKey = process.env.API_SECRET_KEY;
  
  if (!apiKey) {
    console.error("API_SECRET_KEY not configured");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }
  
  if (!authHeader || authHeader !== `Bearer ${apiKey}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  return null; // Auth passed
}
```

For production, implement proper user authentication (NextAuth.js, Clerk, or Supabase Auth) since this is a multi-tenant SaaS.

---

### 3. No Tenant Isolation — Any User Can Access Any Account's Data

**Files:** `src/app/api/dashboard/stats/route.ts`, `src/app/api/dashboard/payments/route.ts`  
**Impact:** Even after adding auth, there's no concept of "which user owns which connected account." All endpoints return global data or accept arbitrary `accountId` parameters.

```typescript
// src/app/api/dashboard/payments/route.ts — line 12
const accountId = searchParams.get("accountId"); // User-supplied, no validation
let payments = accountId
  ? await getPaymentsByAccount(accountId)
  : await getAllPayments(); // Returns EVERY payment across all accounts
```

**Fix:** Implement a user→account ownership model. Each authenticated user should only access their connected accounts' data.

---

### 4. Weak Admin Authentication with Hardcoded Secret

**File:** `src/app/api/admin/waitlist/route.ts` (line 22), `.env.local` (line 9)

```
ADMIN_SECRET=revive_admin_2026_change_in_production
```

The admin endpoint falls back to **open access** when `ADMIN_SECRET` is not set:

```typescript
if (!adminSecret) {
  console.warn("ADMIN_SECRET not configured - admin endpoint is open!");
  return true; // Allow access if no secret is set (for development)
}
```

**Fix:**
1. Never allow open admin access — return `false` when secret is missing.
2. Use a strong, randomly generated secret.
3. Consider using a real admin auth system instead of a shared secret.

```typescript
function checkAuth(req: NextRequest): boolean {
  const authHeader = req.headers.get("Authorization");
  const adminSecret = process.env.ADMIN_SECRET;
  
  if (!adminSecret || !authHeader) return false;
  
  const token = authHeader.startsWith("Bearer ") 
    ? authHeader.substring(7) 
    : authHeader;
    
  // Use constant-time comparison to prevent timing attacks
  return token.length === adminSecret.length && 
    crypto.timingSafeEqual(Buffer.from(token), Buffer.from(adminSecret));
}
```

---

### 5. Card Update URL Uses Payment ID as Token (Insecure)

**File:** `src/lib/email-service.ts` (line 50)

```typescript
const cardUpdateUrl = `${appUrl}/update-payment?token=${payment.id}&customer=${payment.stripeCustomerId}`;
```

The "token" is just the UUID of the payment record, and the customer ID is a Stripe customer ID. Both are guessable/enumerable. Anyone could craft a URL to access the update-payment page for any customer.

**The update-payment page itself** (`src/app/update-payment/page.tsx`) constructs a Stripe portal URL using the customer ID directly:

```typescript
href={`https://billing.stripe.com/p/login/test_${customer}`}
```

This URL format is wrong (uses `test_` prefix) and the whole flow is insecure.

**Fix:**
1. Generate a cryptographic token (HMAC of payment ID + customer ID + expiry) for the URL.
2. Validate the token server-side before showing the page.
3. Use Stripe's Customer Portal Session API to create secure, time-limited portal URLs.

```typescript
// Generate secure token
import crypto from "crypto";
const secret = process.env.CARD_UPDATE_SECRET!;
const expiry = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
const data = `${payment.id}:${payment.stripeCustomerId}:${expiry}`;
const hmac = crypto.createHmac("sha256", secret).update(data).digest("hex");
const token = Buffer.from(`${data}:${hmac}`).toString("base64url");
```

---

### 6. Cron Endpoint Authentication Bypass

**File:** `src/app/api/cron/retry/route.ts` (line 16-19)

```typescript
const cronSecret = process.env.CRON_SECRET;
if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
```

If `CRON_SECRET` is not set (and it's not in `.env.local`), the cron endpoint is **completely open**. Anyone can trigger the entire retry queue.

**Fix:** Require the secret unconditionally:

```typescript
const cronSecret = process.env.CRON_SECRET;
if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
```

---

## 🟠 HIGH — Fix This Week

### 7. In-Memory Database Loses All Data on Restart

**File:** `src/lib/db.ts` (lines 76-78)

```typescript
const memStore = new Map<string, string>();
const memSortedSets = new Map<string, Map<string, number>>();
const memSets = new Map<string, Set<string>>();
```

Without Upstash Redis configured (`KV_REST_API_URL`/`UPSTASH_REDIS_REST_URL`), the app uses in-memory storage. Every Vercel cold start or redeploy wipes all payment records, retry queues, and stats.

**Fix:** 
1. Make Redis required in production. Add env validation at startup.
2. Use Vercel KV or Upstash Redis — both have free tiers.

```typescript
// At the top of db.ts
if (process.env.NODE_ENV === "production" && !getRedis()) {
  throw new Error("Redis is required in production. Set KV_REST_API_URL and KV_REST_API_TOKEN.");
}
```

---

### 8. No Duplicate Payment Detection in Webhook Handler

**File:** `src/app/api/webhooks/stripe/route.ts` (line ~65-130)

The webhook handler creates a new `FailedPayment` record every time `invoice.payment_failed` fires, without checking if a record already exists for that invoice. Stripe can deliver webhooks multiple times (retries, network issues).

**Fix:** Check for existing records before creating:

```typescript
case "invoice.payment_failed": {
  const invoice = event.data.object as Stripe.Invoice;
  
  // Idempotency: check if we already track this invoice
  const existing = (await getAllPayments()).find(
    p => p.stripeInvoiceId === invoice.id
  );
  if (existing) {
    console.log(`[Webhook] Already tracking invoice ${invoice.id}, skipping`);
    break;
  }
  // ... rest of handler
}
```

**Better approach:** Add a `getPaymentByInvoiceId()` function to db.ts with a Redis key lookup instead of scanning all payments.

---

### 9. N+1 Query Pattern in `getAllPayments()` and Related Functions

**File:** `src/lib/db.ts` (lines 159-170)

```typescript
export async function getAllPayments(): Promise<FailedPayment[]> {
  const ids = await smembers("all_payments");
  const payments: FailedPayment[] = [];
  for (const id of ids) {  // N individual Redis calls
    const payment = await getFailedPayment(id);
    if (payment) payments.push(payment);
  }
  return payments.sort((a, b) => b.createdAt - a.createdAt);
}
```

This fires N+1 Redis requests (1 SMEMBERS + N GETs). For 1000 payments, that's 1001 HTTP requests to Upstash.

**Fix:** Use Redis `MGET` for batch fetching:

```typescript
export async function getAllPayments(): Promise<FailedPayment[]> {
  const r = getRedis();
  const ids = await smembers("all_payments");
  if (ids.length === 0) return [];
  
  if (r) {
    const keys = ids.map(id => `failed_payment:${id}`);
    const results = await r.mget<string[]>(...keys);
    return results
      .filter(Boolean)
      .map(val => typeof val === "string" ? JSON.parse(val) : val as FailedPayment)
      .sort((a, b) => b.createdAt - a.createdAt);
  }
  // ... fallback for in-memory
}
```

Same pattern applies to `getPaymentsByAccount()`, `getPaymentsDueForRetry()`, and `getAllConnectedAccounts()`.

---

### 10. `invoice.payment_succeeded` Uses Full Scan to Find Matching Payment

**File:** `src/app/api/webhooks/stripe/route.ts` (line ~137-148)

```typescript
const allPayments = await getAllPayments();
const matchingPayment = allPayments.find(
  (p) => p.stripeInvoiceId === invoice.id && p.status !== "recovered"
);
```

This loads **every payment ever tracked** to find one by invoice ID. At scale, this is O(n) and hits Redis N+1 times.

**Fix:** Add a Redis index `invoice:{invoiceId} → paymentId`:

```typescript
// In createFailedPayment():
await set(`invoice:${data.stripeInvoiceId}`, id);

// In webhook:
const paymentId = await get<string>(`invoice:${invoice.id}`);
if (paymentId) {
  const payment = await getFailedPayment(paymentId);
  // ...
}
```

---

### 11. Waitlist Uses File System Storage (Breaks on Vercel)

**File:** `src/app/api/waitlist/route.ts` (lines 5-6)

```typescript
const WAITLIST_FILE = path.join(process.cwd(), "data", "waitlist.json");
const WAITLIST_LOG_FILE = path.join(process.cwd(), "data", "waitlist.log");
```

Vercel's serverless functions have a read-only filesystem. This will fail in production with `EROFS: read-only file system`.

**Fix:** Store waitlist signups in Redis (same Upstash instance):

```typescript
async function addToWaitlist(email: string, source: string) {
  const redis = getRedis();
  if (redis) {
    await redis.rpush("waitlist:emails", JSON.stringify({ email, timestamp: new Date().toISOString(), source }));
  }
}
```

---

### 12. No Environment Variable Validation

**Files:** Multiple — env vars are accessed with `!` assertions everywhere  
**Impact:** App crashes with unhelpful errors if any env var is missing.

```typescript
// src/app/api/checkout/route.ts
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { ... }); // Crashes if missing
```

**Fix:** Add a validation module that runs at build time:

```typescript
// src/lib/env.ts
import { z } from "zod"; // Add zod to dependencies

const envSchema = z.object({
  STRIPE_SECRET_KEY: z.string().min(1),
  STRIPE_WEBHOOK_SECRET: z.string().min(1),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
  // Optional
  RESEND_API_KEY: z.string().optional(),
  CRON_SECRET: z.string().min(1).optional(),
  ADMIN_SECRET: z.string().min(16),
});

export const env = envSchema.parse(process.env);
```

---

### 13. Connected Account Access Tokens Stored in Plaintext

**File:** `src/lib/db.ts` (ConnectedAccount interface + `saveConnectedAccount`)

```typescript
export interface ConnectedAccount {
  accessToken: string;      // Stripe OAuth access token — stored as-is
  refreshToken?: string;    // Stored as-is
}
```

These tokens grant full access to the connected Stripe account. If Redis is compromised, all connected accounts are compromised.

**Fix:** Encrypt tokens at rest using AES-256-GCM before storing in Redis:

```typescript
import crypto from "crypto";

const ENCRYPTION_KEY = process.env.TOKEN_ENCRYPTION_KEY!; // 32-byte hex key

function encrypt(text: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-gcm", Buffer.from(ENCRYPTION_KEY, "hex"), iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString("hex")}:${tag.toString("hex")}:${encrypted.toString("hex")}`;
}
```

---

## 🟡 MEDIUM — Fix Soon

### 14. `stripe-cli` Package in Production Dependencies

**File:** `package.json` (line 12)

```json
"stripe-cli": "^0.1.0"
```

This is a dev tool that shouldn't be in production `dependencies`. It adds to bundle size and may introduce vulnerabilities.

**Fix:** Move to `devDependencies` or remove entirely (install globally instead).

---

### 15. No Error Boundary Components

**Impact:** Any runtime error in a React component crashes the entire page with a white screen.

**Fix:** Add error boundaries:

```typescript
// src/app/error.tsx
"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-4">Something went wrong</h2>
        <button onClick={reset} className="bg-brand-600 text-white px-4 py-2 rounded">
          Try again
        </button>
      </div>
    </div>
  );
}
```

Also add `src/app/global-error.tsx` and `src/app/not-found.tsx`.

---

### 16. No Rate Limiting on Public Endpoints

**Files:** `src/app/api/waitlist/route.ts`, `src/app/api/checkout/route.ts`  
**Impact:** Spam bots can flood the waitlist. Abuse of checkout session creation.

**Fix:** Add rate limiting using Upstash Ratelimit:

```typescript
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "60 s"), // 5 requests per minute
});
```

---

### 17. Dashboard Polls Every 30 Seconds with No Visibility Check

**File:** `src/app/dashboard/page.tsx` (line ~125)

```typescript
const interval = setInterval(fetchData, 30000);
```

This polls even when the tab is backgrounded, wasting API calls and potentially hitting rate limits.

**Fix:** Use `document.visibilityState`:

```typescript
useEffect(() => {
  fetchData();
  const interval = setInterval(() => {
    if (document.visibilityState === "visible") fetchData();
  }, 30000);
  return () => clearInterval(interval);
}, [fetchData]);
```

---

### 18. Onboarding Test Connection Is Fake

**File:** `src/app/onboarding/components/TestConnection.tsx` (line ~26-33)

```typescript
const testSequence = [
  { index: 0, delay: 800, success: true },
  { index: 1, delay: 1200, success: true },
  // ... all hardcoded to succeed
];
```

The "test connection" step is entirely simulated — it always passes regardless of actual connection state. This could let users think they're set up when they're not.

**Fix:** Call the actual `/api/health` endpoint and verify Stripe connectivity:

```typescript
const runTests = async () => {
  try {
    const res = await fetch("/api/health");
    const data = await res.json();
    // Update test results based on actual data
    updateTest(0, data.db?.connected ? "success" : "error");
    updateTest(1, data.env?.hasWebhookSecret ? "success" : "error");
    // ...
  } catch (err) {
    // Mark tests as failed
  }
};
```

---

### 19. Onboarding Auto-Advances Past Test Step

**File:** `src/app/onboarding/page.tsx` (line ~65-70)

```typescript
useEffect(() => {
  if (currentStep === 4) {
    const timer = setTimeout(() => {
      setCurrentStep(5);
      handleComplete();
    }, 100); // Auto-advances after 100ms!
    return () => clearTimeout(timer);
  }
}, [currentStep]);
```

Step 4 (Test Connection) auto-advances to Complete after just 100ms, before the fake tests even finish. Users barely see the test step.

**Fix:** Remove auto-advance and let the TestConnection component call `onNext()` when tests pass.

---

### 20. Stripe API Version Pinned to Non-Existent Future Version

**File:** `src/lib/stripe.ts` (line 7), `src/lib/retry-engine.ts` (line ~141)

```typescript
apiVersion: "2026-01-28.clover",
```

This uses a Stripe API version that may not exist or may have breaking changes. The `apiVersion` should match the actual Stripe SDK version you're using.

**Fix:** Use the API version bundled with your Stripe SDK, or pin to a known version:

```typescript
// Let the SDK use its default version
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
```

---

### 21. Manual Retry Uses `finalizeInvoice` Instead of `pay`

**File:** `src/app/api/recovery/retry/route.ts` (line ~62)

```typescript
const invoice = await stripe.invoices.finalizeInvoice(invoiceId, {
  auto_advance: true,
});
```

`finalizeInvoice` is for draft invoices. For retrying a failed payment on an already-finalized invoice, you should use `stripe.invoices.pay()`. This likely throws an error for non-draft invoices.

The cron retry engine (`src/lib/retry-engine.ts` line ~147) correctly uses `stripe.invoices.pay()`.

**Fix:** Change to `stripe.invoices.pay()`:

```typescript
const invoice = await stripe.invoices.pay(invoiceId, {
  stripeAccount: payment.connectedAccountId === "direct" ? undefined : payment.connectedAccountId,
});
```

---

### 22. No `robots.txt` or `sitemap.xml`

**Impact:** Search engines don't have explicit crawling guidance. The blog has 9+ content-heavy pages that should be indexed.

**Fix:** Add `src/app/robots.ts` and `src/app/sitemap.ts`:

```typescript
// src/app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/dashboard"] },
    sitemap: "https://revive-hq.com/sitemap.xml",
  };
}
```

```typescript
// src/app/sitemap.ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://revive-hq.com";
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), priority: 0.8 },
    // ... all blog posts, alternatives pages, etc.
  ];
}
```

---

### 23. Google Fonts Loaded via CSS `@import` (Render Blocking)

**File:** `src/app/globals.css` (line 4)

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
```

CSS `@import` is render-blocking. Use `next/font` instead for automatic optimization.

**Fix:**
```typescript
// src/app/layout.tsx
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// In the body tag:
<body className={`${inter.variable} bg-[#09090b] ...`}>
```

---

### 24. `processDunningQueue()` Loads ALL Payments Every Run

**File:** `src/lib/email-service.ts` (line ~105)

```typescript
const { getAllPayments } = await import("./db");
const payments = await getAllPayments();
```

Every cron run loads every payment to check if dunning emails are needed. Should be a targeted query for active, non-recovered payments.

**Fix:** Add a `getActiveDunningPayments()` function that only returns payments in `pending`, `retrying`, or `dunning` status.

---

## 🟢 LOW — Nice to Have

### 25. Duplicate Stripe Client Instantiation

**Files:** `src/lib/stripe.ts`, `src/lib/retry-engine.ts` (line ~141), `src/lib/recovery-analyzer.ts` (line ~29), `src/app/api/webhooks/stripe/route.ts` (line 14)

Stripe is instantiated in 4+ places. Some use the shared instance from `src/lib/stripe.ts`, others create new instances inline.

**Fix:** Always import from `src/lib/stripe.ts`.

---

### 26. `stripe-cli` and `sharp` Misplaced in Dependencies

**File:** `package.json`

- `stripe-cli` should be removed from `dependencies` (it's a CLI tool, install globally)
- `sharp` is in `devDependencies` but Next.js may need it at runtime for image optimization

**Fix:** Remove `stripe-cli`, move `sharp` to `dependencies`.

---

### 27. Unused `_stats` Variable in Dashboard Stats API

**File:** `src/app/api/dashboard/stats/route.ts` (line 12)

```typescript
const [_stats, payments, health] = await Promise.all([...]);
void _stats; // used for future per-account view
```

Dead code. The per-account stats from `getStats()` is fetched but never used.

---

### 28. ESLint Rules Overly Permissive

**File:** `.eslintrc.json`

```json
"@typescript-eslint/no-explicit-any": "off"
```

Turning off `no-explicit-any` allows unchecked type safety. The codebase uses `as any` in several places for Stripe API workarounds — these should have narrower types.

---

### 29. Blog Post Index Missing Several Blog Pages

**File:** `src/app/blog/page.tsx`

The blog index lists 6 posts but there are 9 blog post directories:
- ✅ Listed: `how-to-reduce-involuntary-churn`, `dunning-email-best-practices`, `failed-payment-recovery-strategies`, `involuntary-churn-vs-voluntary-churn`, `stripe-failed-payment-retry`, `saas-revenue-recovery`
- ❌ Missing: `stripe-payment-failure-codes-explained`, `true-cost-of-failed-payments`, `churnkey-vs-baremetrics-vs-revive`

---

### 30. OG Image Has Redundant Stats

**File:** `src/app/opengraph-image.tsx` (line ~105-108)

The OG image shows 3 stats: `$0 Min. Commitment`, `5 min Setup Time`, and `3 min Setup` — the last two are essentially duplicates.

---

### 31. Missing `loading.tsx` for Dashboard and Onboarding

Both the dashboard and onboarding use `Suspense` with inline fallbacks, but Next.js App Router supports dedicated `loading.tsx` files for better streaming behavior.

---

### 32. Recovery Config from Onboarding Never Used

**File:** `src/app/onboarding/page.tsx`

The onboarding flow lets users select a recovery strategy (aggressive/moderate/conservative) and saves it to localStorage, but the actual retry engine (`src/lib/retry-engine.ts`) uses hardcoded strategies. The user's selection has no effect.

**Fix:** Either wire up the config to actually influence retry behavior, or remove the configuration step to avoid misleading users.

---

### 33. Dashboard Sidebar Nav Items Are Non-Functional Buttons

**File:** `src/app/dashboard/page.tsx` (line ~170)

The sidebar has "Payments", "Emails", and "Settings" buttons that don't navigate anywhere. They're just `<button>` elements with no handlers.

---

### 34. Missing `Suspense` Boundary for Blog Pages with Metadata

Blog pages use `export const metadata` (server component) which is correct, but some pages like alternatives import `WaitlistForm` (client component). This works but consider lazy-loading heavy client components.

---

### 35. `postcss.config.mjs` Missing Autoprefixer

**File:** `postcss.config.mjs`

```javascript
const config = {
  plugins: {
    tailwindcss: {},
    // Missing: autoprefixer: {},
  },
};
```

Autoprefixer ensures CSS compatibility across browsers.

---

## Summary Table

| Priority | Count | Key Items |
|----------|-------|-----------|
| 🔴 CRITICAL | 6 | Live Stripe keys exposed, zero API auth, no tenant isolation, insecure card update URLs, weak admin auth, open cron endpoint |
| 🟠 HIGH | 7 | In-memory DB, no webhook idempotency, N+1 queries, full-scan lookups, file-system waitlist, no env validation, plaintext tokens |
| 🟡 MEDIUM | 11 | Error boundaries, rate limiting, fake tests, render-blocking fonts, missing sitemap/robots.txt, unused config, wrong Stripe API call |
| 🟢 LOW | 11 | Duplicate Stripe clients, dead code, missing blog entries, non-functional nav, misplaced deps |

---

## Recommended Fix Order

1. **Right now:** Rotate Stripe keys, delete `.env` file
2. **Today:** Add authentication to all API routes, fix cron auth, fix admin auth
3. **This week:** Set up Redis for production, add webhook idempotency, fix N+1 queries, fix waitlist storage
4. **Next week:** Add env validation, error boundaries, rate limiting, sitemap, robots.txt
5. **Before launch:** Fix onboarding test flow, wire up recovery config, add proper card update URL tokens

---

*Report generated by automated code audit. All line numbers approximate — verify against current source.*
