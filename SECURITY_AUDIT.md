# 🔒 Revive Security Audit Report

**Audit Date:** February 18, 2026  
**Auditor:** Senior Security Engineer (AI-assisted)  
**Scope:** Full codebase review including all API routes, authentication, Stripe integrations, secrets management, input validation, and infrastructure configuration.

---

## Executive Summary

Revive handles sensitive Stripe Connect credentials and payment recovery operations. This audit identified **3 critical**, **6 high**, **6 medium**, and **4 low** severity findings that should be addressed before handling significant transaction volume.

| Severity | Count | Status |
|----------|-------|--------|
| 🔴 CRITICAL | 3 | Fix immediately |
| 🟠 HIGH | 6 | Fix this week |
| 🟡 MEDIUM | 6 | Fix soon |
| 🟢 LOW | 4 | Nice to have |

---

## 🔴 CRITICAL Findings

### C1: Weak/Guessable Secrets in Production Environment

**Location:** `.env.local` (and likely Vercel environment variables)

**Issue:** The ADMIN_SECRET and CARD_UPDATE_SECRET are weak, predictable values:
```
ADMIN_SECRET=revive_admin_2026_change_in_production
CARD_UPDATE_SECRET=revive_card_update_hmac_secret_2026_change_in_production
```

**Risk:** An attacker who guesses these values can:
- Access admin waitlist endpoint and export all user emails
- Forge card update HMAC tokens to access any customer's payment update page
- Potentially trigger unauthorized payment method updates

**Recommendation:**
```bash
# Generate cryptographically secure secrets
openssl rand -base64 32  # For each secret
```

Update all secrets in Vercel with strong random values:
- `ADMIN_SECRET` — 32+ character random string
- `CARD_UPDATE_SECRET` — 32+ character random string  
- `API_SECRET_KEY` — 32+ character random string (currently not set!)
- `CRON_SECRET` — 32+ character random string (currently not set!)

---

### C2: `/api/stripe/disconnect` Endpoint Has No Authentication

**Location:** `src/app/api/stripe/disconnect/route.ts`

**Issue:** The disconnect endpoint accepts any POST request without authentication:
```typescript
export async function POST(request: NextRequest) {
  // NO AUTH CHECK HERE
  let targetAccountId: string | undefined;
  // ... proceeds to disconnect Stripe account
}
```

**Risk:** Any attacker can disconnect merchants' Stripe accounts by:
1. Calling `POST /api/stripe/disconnect` with `{ "stripeAccountId": "acct_xxx" }`
2. Or calling it with no body to disconnect the first active account

This would completely break payment recovery for affected merchants.

**Recommendation:**
```typescript
import { requireAuth } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const authError = requireAuth(request);
  if (authError) return authError;
  // ... rest of handler
}
```

---

### C3: ACP Endpoint Allows Cross-Origin Checkout Creation

**Location:** `src/app/api/acp/route.ts`

**Issue:** The AI Commerce Protocol endpoint has permissive CORS:
```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',  // 🚨 Allows ANY origin
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}
```

**Risk:** Any website can create checkout sessions on behalf of Revive:
1. Malicious site embeds a hidden form
2. Triggers `POST /api/acp` with attacker-controlled `buyer_email`
3. Creates legitimate Stripe checkout sessions
4. Could be used for payment fraud or to exhaust API limits

**Recommendation:**
```typescript
const ALLOWED_ORIGINS = [
  'https://revive-hq.com',
  'https://www.revive-hq.com',
  // Add specific AI agent domains that need access
];

function getCorsHeaders(origin: string | null) {
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin || '') ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    // ...
  };
}
```

---

## 🟠 HIGH Findings

### H1: No Authentication on `/api/stripe/status`

**Location:** `src/app/api/stripe/status/route.ts`

**Issue:** Returns connected account information without authentication:
```typescript
export async function GET() {
  // NO AUTH CHECK
  const { connected, account } = await hasActiveConnection();
  return NextResponse.json({
    connected: true,
    account: {
      stripeAccountId: account.stripeAccountId,
      email: account.email || null,
      businessName: account.businessName || null,
      // ...
    },
  });
}
```

**Risk:** Exposes business information and Stripe account IDs to anyone.

**Recommendation:** Add `requireAuth()` check.

---

### H2: Missing Rate Limiting on Security-Sensitive Endpoints

**Location:** Multiple API routes

**Issue:** Only 2 endpoints have rate limiting:
- ✅ `/api/waitlist` — 5/min
- ✅ `/api/checkout` — 10/min

Missing rate limiting on:
- ❌ `/api/update-card/validate` — Token brute-force possible
- ❌ `/api/update-card` — Payment method updates
- ❌ `/api/recovery/retry` — Could exhaust Stripe API limits
- ❌ `/api/auth/login` — Password/API key brute-force
- ❌ `/api/feedback` — Spam submissions

**Risk:** 
- HMAC token brute-force (7-day window, predictable structure)
- Login brute-force attacks
- Resource exhaustion

**Recommendation:** Add rate limiting to all write endpoints:
```typescript
// New rate limiters in src/lib/rate-limit.ts
export const updateCardRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "60 s"),
      prefix: "ratelimit:update-card",
    })
  : null;

export const loginRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "300 s"), // 5 per 5 minutes
      prefix: "ratelimit:login",
    })
  : null;
```

---

### H3: Card Update Token Not Invalidated After Use

**Location:** `src/app/api/update-card/route.ts` and `src/lib/auth.ts`

**Issue:** The HMAC token validation only checks expiry, not previous use:
```typescript
export function validateCardUpdateToken(token: string): { paymentId: string; customerId: string } | null {
  // Checks expiry
  if (Date.now() > expiry) return null;
  // Verifies HMAC
  // BUT NEVER RECORDS THAT TOKEN WAS USED
}
```

**Risk:** A leaked or intercepted token can be reused multiple times within the 7-day window to:
- Update payment methods repeatedly
- Trigger multiple retry attempts

**Recommendation:** Track used tokens in Redis:
```typescript
export async function validateCardUpdateToken(token: string): Promise<...> {
  // ... existing validation ...
  
  // Check if token was already used
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  const used = await get(`token_used:${tokenHash}`);
  if (used) return null;
  
  return { paymentId, customerId };
}

export async function invalidateCardUpdateToken(token: string): Promise<void> {
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  await set(`token_used:${tokenHash}`, Date.now(), { ex: 7 * 24 * 60 * 60 }); // TTL matches token expiry
}
```

---

### H4: Recovery Status Endpoint Leaks Cross-Tenant Data

**Location:** `src/app/api/recovery/status/route.ts`

**Issue:** When only `customerId` is provided, returns all payments for that customer across ALL connected accounts:
```typescript
const payments = await getAllPayments();  // Gets ALL payments globally
if (customerId) {
  matchingPayments = payments.filter(
    (p) => p.stripeCustomerId === customerId  // No account isolation
  );
}
```

**Risk:** If a customer exists in multiple merchants' Stripe accounts, their payment data from other merchants could be exposed.

**Recommendation:** Require `accountId` parameter and enforce tenant isolation:
```typescript
if (!accountId) {
  return NextResponse.json(
    { error: "accountId is required" },
    { status: 400 }
  );
}
const payments = await getPaymentsByAccount(accountId);
```

---

### H5: PII Logged to Console

**Location:** Multiple API routes (see grep results)

**Issue:** Customer emails, payment amounts, Stripe IDs are logged:
```typescript
console.log(`[Webhook] Payment failed for invoice: ${invoice.id}`);
console.log(`[Pre-Dunning] ✅ Sent expiring card email to ${data.customerEmail}`);
console.log(`[Retry Engine] Customer: ${payment.customerEmail}`);
```

**Risk:** 
- Logs captured by Vercel/log aggregation services
- PII exposure in log management systems
- GDPR/privacy compliance issues

**Recommendation:** 
1. Remove or redact PII from logs
2. Use structured logging with PII fields excluded from production
3. Implement log sanitization:
```typescript
function sanitizeEmail(email: string): string {
  const [local, domain] = email.split('@');
  return `${local.substring(0, 2)}***@${domain}`;
}
```

---

### H6: No Webhook Signature Verification for Connect Webhooks

**Location:** `src/app/api/webhooks/stripe/route.ts`

**Issue:** Only uses `STRIPE_WEBHOOK_SECRET`, but based on the memories, there should be separate secrets for direct vs Connect webhooks:
```typescript
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
// Missing: STRIPE_CONNECT_WEBHOOK_SECRET handling
```

Per memory: "Webhook handler updated to try both STRIPE_WEBHOOK_SECRET and STRIPE_CONNECT_WEBHOOK_SECRET"

**Risk:** Connect account webhooks may fail signature verification or be accepted without proper verification.

**Recommendation:** Implement dual-secret verification:
```typescript
let event: Stripe.Event;
try {
  event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
} catch (err) {
  // Try Connect webhook secret
  const connectSecret = process.env.STRIPE_CONNECT_WEBHOOK_SECRET;
  if (connectSecret) {
    try {
      event = stripe.webhooks.constructEvent(body, signature, connectSecret);
    } catch {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
  } else {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }
}
```

---

## 🟡 MEDIUM Findings

### M1: No Security Headers in Next.js Config

**Location:** `next.config.mjs`

**Issue:** Missing security headers:
```javascript
const nextConfig = {
  // Empty — no security headers
};
```

**Risk:** Missing protections against clickjacking, XSS, MIME sniffing attacks.

**Recommendation:**
```javascript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; frame-src https://js.stripe.com https://hooks.stripe.com; connect-src 'self' https://api.stripe.com;"
          },
        ],
      },
    ];
  },
};
```

---

### M2: Missing Global Auth Middleware

**Location:** `src/middleware.ts` (does not exist)

**Issue:** No global middleware to enforce authentication. Each route handles auth individually, increasing risk of missing auth checks.

**Recommendation:** Create `src/middleware.ts`:
```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_ROUTES = [
  '/api/webhooks/stripe',
  '/api/waitlist',
  '/api/feedback',
  '/api/stripe/connect',
  '/api/stripe/callback',
  '/api/update-card',
  '/api/health',
];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Skip public routes
  if (PUBLIC_ROUTES.some(route => path.startsWith(route))) {
    return NextResponse.next();
  }
  
  // Require auth for all other API routes
  if (path.startsWith('/api/')) {
    const auth = request.headers.get('authorization');
    const cookie = request.cookies.get('revive_session');
    
    if (!auth && !cookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
```

---

### M3: Email Preview Endpoint Has No Authentication

**Location:** `src/app/api/email/preview/route.ts`

**Issue:** Anyone can view email templates:
```typescript
export async function GET(request: NextRequest) {
  // NO AUTH CHECK
  const type = searchParams.get("type") ?? "";
  // Returns full HTML template
}
```

**Risk:** Exposes email template structure, branding, and URLs which could aid phishing attempts.

**Recommendation:** Add auth or restrict to development only:
```typescript
if (process.env.NODE_ENV === 'production') {
  return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
}
```

---

### M4: API_SECRET_KEY Not Configured

**Location:** `.env.local`

**Issue:** `API_SECRET_KEY` is not set in the environment file, meaning:
- Dashboard login will fail (`/api/auth/login`)
- All protected API endpoints will return 500 "Server misconfigured"

**Recommendation:** Add to `.env.local` and Vercel:
```bash
API_SECRET_KEY=$(openssl rand -base64 32)
```

---

### M5: CRON_SECRET Not Configured

**Location:** `.env.local`

**Issue:** `CRON_SECRET` is not set, meaning:
- Cron endpoints will reject requests in production (good)
- But in development, cron auth is bypassed (see email/send route)

**Risk:** Development environment allows unauthenticated cron execution.

**Recommendation:** Always configure CRON_SECRET:
```bash
CRON_SECRET=$(openssl rand -base64 32)
```

---

### M6: Connected Account Tokens Stored Incorrectly

**Location:** `src/app/api/stripe/callback/route.ts`

**Issue:** Access tokens stored as empty strings:
```typescript
await saveConnectedAccount({
  stripeAccountId: accountId,
  accessToken: "", // Empty string stored
  refreshToken: undefined,
  // ...
});
```

While this is intentional (Account Links flow doesn't use OAuth tokens), the data model is confusing and the `accessToken` field in `ConnectedAccount` interface suggests tokens should be stored.

**Recommendation:** Update the interface to reflect reality:
```typescript
interface ConnectedAccount {
  stripeAccountId: string;
  // Remove accessToken/refreshToken since Account Links doesn't use them
  email?: string;
  businessName?: string;
  connectedAt: number;
  active: boolean;
}
```

---

## 🟢 LOW Findings

### L1: Dependency Vulnerabilities

**Location:** `package.json` / `node_modules`

**Issue:** npm audit reports 16 vulnerabilities:
- 5 low severity
- 8 moderate severity  
- 3 high severity (in `glob`, `qs`, `tmp` — dev dependencies)

**Recommendation:**
```bash
npm audit fix
# For breaking changes (dev deps only):
npm audit fix --force
```

---

### L2: Weak Email Validation

**Location:** `src/app/api/waitlist/route.ts`

**Issue:** Minimal email validation:
```typescript
if (!email || !email.includes("@")) {
  return NextResponse.json(
    { error: "Please enter a valid email address" },
    { status: 400 }
  );
}
```

**Recommendation:** Use proper email validation:
```typescript
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!email || !EMAIL_REGEX.test(email)) {
  return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
}
```

---

### L3: Inconsistent Error Messages

**Location:** Various API routes

**Issue:** Some errors expose implementation details:
```typescript
// Leaks internal detail
return NextResponse.json({ error: "STRIPE_WEBHOOK_SECRET is not configured" }, { status: 500 });

// Better
return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
```

**Recommendation:** Use generic error messages in production:
```typescript
const isDev = process.env.NODE_ENV !== 'production';
return NextResponse.json(
  { error: isDev ? detailedError : "Internal server error" },
  { status: 500 }
);
```

---

### L4: No Git History Secrets Found

**Location:** Git history

**Finding:** Grep of git history for secrets patterns found no hardcoded secrets committed.

✅ Good: No `sk_live_`, `sk_test_`, or `whsec_` values in code history.

---

## Remediation Priority

### Immediate (Before Next Deploy)
1. ❗ Fix `/api/stripe/disconnect` auth (C2)
2. ❗ Generate strong random secrets (C1)
3. ❗ Restrict ACP CORS (C3)
4. ❗ Configure missing env vars: `API_SECRET_KEY`, `CRON_SECRET`

### This Week
1. Add auth to `/api/stripe/status` (H1)
2. Add rate limiting to sensitive endpoints (H2)
3. Implement token invalidation (H3)
4. Fix tenant isolation in recovery status (H4)
5. Sanitize PII in logs (H5)
6. Add Connect webhook secret handling (H6)

### Soon
1. Add security headers (M1)
2. Create auth middleware (M2)
3. Secure email preview endpoint (M3)
4. Run `npm audit fix` (L1)

---

## Files Changed Summary

| File | Issues |
|------|--------|
| `src/app/api/stripe/disconnect/route.ts` | C2: Missing auth |
| `src/app/api/acp/route.ts` | C3: Permissive CORS |
| `src/app/api/stripe/status/route.ts` | H1: Missing auth |
| `src/app/api/update-card/route.ts` | H2: No rate limit, H3: Token reuse |
| `src/app/api/recovery/status/route.ts` | H4: Cross-tenant leak |
| `src/app/api/webhooks/stripe/route.ts` | H5: PII logging, H6: Single webhook secret |
| `src/lib/auth.ts` | H3: No token invalidation |
| `next.config.mjs` | M1: No security headers |
| `src/middleware.ts` | M2: Does not exist |
| `.env.local` | C1: Weak secrets, M4/M5: Missing secrets |

---

## Verification Checklist

After fixes, verify:
- [ ] All secrets are 32+ character random strings
- [ ] `curl -X POST https://revive-hq.com/api/stripe/disconnect` returns 401
- [ ] ACP endpoint rejects non-whitelisted origins
- [ ] Rate limit headers appear on protected endpoints
- [ ] Card update tokens cannot be reused
- [ ] Security headers present in responses
- [ ] npm audit shows 0 high/critical vulnerabilities

---

*Report generated by automated security audit. Manual penetration testing recommended before handling significant payment volume.*
