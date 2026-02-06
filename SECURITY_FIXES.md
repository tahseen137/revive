# Security Fixes Applied — February 5, 2026

All 6 CRITICAL issues from AUDIT_REPORT.md have been fixed, plus 2 HIGH-priority issues.

---

## 🔴 CRITICAL FIXES

### 1. ✅ Stripe Keys in .env Files
- **Deleted** `.env` file (contained live `sk_live_` and `whsec_` keys in plaintext)
- **Created** `.env.example` with placeholder values only (safe to commit)
- **Verified** `.gitignore` already covers `.env` and `.env*.local`
- `.env.local` left untouched (local development keys)
- **Action needed:** Rotate Stripe keys in [Stripe Dashboard](https://dashboard.stripe.com/apikeys) since the old ones were in the deleted `.env`

### 2. ✅ Authentication on ALL API Endpoints
- **Created** `src/lib/auth.ts` — centralized auth module with:
  - `requireAuth()` — validates `Authorization: Bearer <API_SECRET_KEY>` header OR `revive_session` cookie
  - `requireAdminAuth()` — validates against `ADMIN_SECRET`
  - `requireCronAuth()` — validates against `CRON_SECRET`
  - All use constant-time comparison (`crypto.timingSafeEqual`)
- **Protected endpoints:**
  - `GET /api/dashboard/stats` → `requireAuth()`
  - `GET /api/dashboard/payments` → `requireAuth()`
  - `POST /api/recovery/retry` → `requireAuth()`
  - `GET /api/recovery/status` → `requireAuth()`
  - `GET /api/health` → `requireAuth()`
  - `GET /api/admin/waitlist` → `requireAdminAuth()`
  - `GET /api/cron/retry` → `requireCronAuth()`
- **NOT protected** (by design):
  - `POST /api/webhooks/stripe` — uses Stripe signature verification
  - `POST /api/checkout` — public checkout creation
  - `POST /api/waitlist` — public waitlist signup
- **Dashboard login system:**
  - `POST /api/auth/login` — validates API key, sets `revive_session` HttpOnly cookie
  - `POST /api/auth/logout` — clears session cookie
  - Dashboard page shows login screen when unauthenticated
  - Cookie is HttpOnly, Secure (in production), SameSite=Lax, 7-day expiry

### 3. ✅ Tenant Isolation
- **Dashboard stats** (`/api/dashboard/stats`): Now requires `accountId` query parameter — returns 400 if missing. Uses `getPaymentsByAccount()` instead of `getAllPayments()`.
- **Dashboard payments** (`/api/dashboard/payments`): Now requires `accountId` query parameter — returns 400 if missing. Removed `getAllPayments()` fallback entirely.
- `getAllPayments()` is no longer called from any dashboard endpoint without scoping.

### 4. ✅ Admin Auth Bypass Fixed
- **Old behavior:** `ADMIN_SECRET` not set → `return true` (open access!)
- **New behavior:** `ADMIN_SECRET` not set → returns 500 "Server misconfigured" (access denied)
- Replaced inline `checkAuth()` with centralized `requireAdminAuth()` from `src/lib/auth.ts`
- Uses `crypto.timingSafeEqual` for constant-time comparison (prevents timing attacks)

### 5. ✅ Card Update URL Security
- **Old:** URL used raw payment ID as "token": `/update-payment?token={uuid}&customer={cus_xxx}`
- **New:** HMAC-based tokens with expiry:
  - `generateCardUpdateToken()` in `src/lib/auth.ts` — creates `base64url(paymentId:customerId:expiry:hmac-sha256)`
  - `validateCardUpdateToken()` — verifies HMAC + checks expiry (7 days)
  - New env var: `CARD_UPDATE_SECRET`
- **Old:** Hardcoded Stripe portal URL: `https://billing.stripe.com/p/login/test_{customer}`
- **New:** Server-side Stripe Customer Portal Session API (`stripe.billingPortal.sessions.create()`)
  - Creates secure, time-limited portal URLs per Stripe best practices
  - Created `POST /api/update-payment/validate` endpoint for token validation + portal URL generation
  - Supports connected accounts (passes `stripeAccount` option)
- **Updated** `src/app/update-payment/page.tsx` — client validates token via API before showing portal link

### 6. ✅ Cron Endpoint Auth Bypass Fixed
- **Old:** `if (cronSecret && authHeader !== ...)` — no secret = open access
- **New:** Uses `requireCronAuth()` which checks `if (!cronSecret)` → deny access
- Added `CRON_SECRET` to `.env.example`

---

## 🟠 HIGH-PRIORITY FIXES

### 7. ✅ Webhook Idempotency
- **Added** `getPaymentByInvoiceId()` to `src/lib/db.ts` — O(1) Redis key lookup via `invoice:{invoiceId} → paymentId` index
- **Added** invoice index in `createFailedPayment()` — `set(invoice:${invoiceId}, paymentId)`
- **`invoice.payment_failed` handler:** Now checks `getPaymentByInvoiceId()` before creating a record. Skips duplicates with log message.
- **`invoice.payment_succeeded` handler:** Uses efficient `getPaymentByInvoiceId()` instead of scanning `getAllPayments()` — O(1) instead of O(n).

### 8. ✅ Environment Validation
- **Created** `src/lib/env.ts` — validates required env vars at startup
- **Created** `src/instrumentation.ts` — Next.js instrumentation hook, calls `validateEnv()` on server startup
- **Production:** Throws error if any required var is missing (including Redis)
- **Development:** Logs warnings only
- **Required vars:** `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_APP_URL`, `API_SECRET_KEY`, `ADMIN_SECRET`, `CRON_SECRET`, `CARD_UPDATE_SECRET`
- **Required in production:** Redis credentials (`KV_REST_API_URL` + `KV_REST_API_TOKEN` or Upstash equivalents)
- **Enabled** `experimental.instrumentationHook: true` in `next.config.mjs`

### 9. ✅ Dashboard Polling Fix (bonus)
- Changed `setInterval(fetchData, 30000)` to only poll when `document.visibilityState === "visible"` — prevents wasted API calls when tab is backgrounded.

---

## Files Changed

| File | Change |
|------|--------|
| `.env` | **DELETED** — contained live Stripe keys |
| `.env.example` | **CREATED** — placeholder values only |
| `next.config.mjs` | Added `instrumentationHook: true` |
| `src/instrumentation.ts` | **CREATED** — startup env validation |
| `src/lib/auth.ts` | **CREATED** — centralized auth (Bearer + cookie + HMAC tokens) |
| `src/lib/env.ts` | **CREATED** — env var validation module |
| `src/lib/db.ts` | Added `getPaymentByInvoiceId()`, invoice index in `createFailedPayment()` |
| `src/lib/email-service.ts` | HMAC token generation for card update URLs |
| `src/app/api/dashboard/stats/route.ts` | Added auth + tenant isolation |
| `src/app/api/dashboard/payments/route.ts` | Added auth + tenant isolation |
| `src/app/api/recovery/retry/route.ts` | Added auth |
| `src/app/api/recovery/status/route.ts` | Added auth |
| `src/app/api/health/route.ts` | Added auth |
| `src/app/api/admin/waitlist/route.ts` | Fixed auth bypass, uses `requireAdminAuth()` |
| `src/app/api/cron/retry/route.ts` | Fixed auth bypass, uses `requireCronAuth()` |
| `src/app/api/webhooks/stripe/route.ts` | Added idempotency check, efficient invoice lookup |
| `src/app/api/auth/login/route.ts` | **CREATED** — dashboard login endpoint |
| `src/app/api/auth/logout/route.ts` | **CREATED** — dashboard logout endpoint |
| `src/app/api/update-payment/validate/route.ts` | **CREATED** — HMAC token validation + Stripe portal session |
| `src/app/update-payment/page.tsx` | Rewritten — validates token server-side, uses Stripe portal API |
| `src/app/dashboard/page.tsx` | Added login gate, auth check, visibility-aware polling |

---

## New Environment Variables Required

Add these to your Vercel project settings (or `.env.local` for development):

```bash
API_SECRET_KEY=<generate with: openssl rand -hex 32>
ADMIN_SECRET=<generate with: openssl rand -hex 32>
CRON_SECRET=<generate with: openssl rand -hex 32>
CARD_UPDATE_SECRET=<generate with: openssl rand -hex 32>
```

## Post-Deployment Checklist

- [ ] **Rotate Stripe keys** in Stripe Dashboard (old keys were in deleted `.env`)
- [ ] Set `API_SECRET_KEY` in Vercel env vars
- [ ] Set `ADMIN_SECRET` in Vercel env vars (strong random value)
- [ ] Set `CRON_SECRET` in Vercel env vars
- [ ] Set `CARD_UPDATE_SECRET` in Vercel env vars
- [ ] Set up Redis (Upstash/Vercel KV) and add `KV_REST_API_URL` + `KV_REST_API_TOKEN`
- [ ] Update Vercel Cron config to pass `Authorization: Bearer <CRON_SECRET>` header
- [ ] Configure Stripe Customer Portal in Stripe Dashboard (required for card update flow)
- [ ] Test dashboard login flow with new API key

## Build Status

✅ `npm run build` passes cleanly with all changes applied.
