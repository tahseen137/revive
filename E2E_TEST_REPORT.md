# Revive E2E Test Report
**Date:** 2026-02-18  
**Tester:** ClawdBot (automated)  
**Environment:** Production — https://revive-hq.com  
**Browser:** Chromium via OpenClaw (profile: openclaw)

---

## 🚦 Executive Summary

| Area | Status | Severity |
|------|--------|----------|
| Homepage | ✅ Loads correctly | — |
| **All "Connect Stripe" CTAs** | ❌ **BROKEN** — 401 Unauthorized | 🔴 CRITICAL |
| **Stripe Connect flow** | ⚠️ Works via direct URL, broken via CTAs | 🔴 CRITICAL |
| **Checkout / Growth Plan button** | ❌ **BROKEN** — 500 Stripe API error | 🔴 CRITICAL |
| Pricing page | ✅ All 3 tiers display correctly | — |
| Demo page (/demo) | ✅ Mock data displays well | — |
| Onboarding (/onboarding) | ⚠️ Animation works, destination auth unclear | 🟡 Medium |
| Dashboard (/dashboard) | ⚠️ Requires API key — confusing for new users | 🟡 Medium |
| FAQ page | ✅ Loads, all accordions visible | — |
| Changelog | ⚠️ Pricing inconsistency vs live pricing page | 🟡 Medium |
| API security | ✅ Auth endpoints properly gated | — |
| `/api/health` | ⚠️ Returns 401 (should be public) | 🟠 Low-Medium |

**Bottom line: Users cannot convert today. Every single "Connect Stripe" CTA across the site is broken.**

---

## 🔴 Critical Issues

### ISSUE #1 — ALL "Connect Stripe" CTAs Return 401

**Severity:** CRITICAL — Complete conversion blocker  
**Affected URLs:** Every CTA across the entire site

**Root Cause:**  
All Connect CTAs link to `/api/connect`, but the middleware (`src/middleware.ts`) does NOT include `/api/connect` in its `PUBLIC_ROUTES` list. The middleware blocks it and returns:
```json
{"error":"Unauthorized"}
```

The correct working endpoint is `/api/stripe/connect` (which IS whitelisted in `PUBLIC_ROUTES`), but the whole frontend links to the wrong path.

**Affected Files (12 occurrences):**
| File | Occurrences |
|------|-------------|
| `src/app/page.tsx` (Homepage) | 3 links |
| `src/app/demo/page.tsx` | 4 links |
| `src/app/pricing/page.tsx` | 2 links |
| `src/components/Navbar.tsx` | 2 links |
| `src/app/dashboard/page.tsx` | 1 JS redirect (`window.location.href = "/api/connect"`) |

**Evidence:**
```bash
$ curl -s -w "\nHTTP %{http_code}" https://revive-hq.com/api/connect
{"error":"Unauthorized"}
HTTP 401

$ curl -s -D - https://revive-hq.com/api/stripe/connect | grep location
location: https://connect.stripe.com/setup/e/acct_.../...
HTTP 307 ✅
```

**Fix (Option A — Recommended):** Add `/api/connect` to `PUBLIC_ROUTES` in `src/middleware.ts`:
```typescript
const PUBLIC_ROUTES = [
  // ...existing routes...
  '/api/connect',  // ← ADD THIS
  '/api/stripe/connect',
  // ...
];
```

**Fix (Option B):** Replace all 12 `href="/api/connect"` with `href="/api/stripe/connect"` sitewide.

---

### ISSUE #2 — "Start Growth Plan" Button Returns 500 (Checkout Broken)

**Severity:** CRITICAL — No paid upgrades possible  
**Affected URL:** `/pricing` → "Start Growth Plan" button

**Root Cause:**  
`src/app/api/checkout/route.ts` passes `customer_creation: "always"` in a Stripe Checkout `subscription` mode session. This parameter is only valid in `payment` mode. Stripe's API returns an error, caught by the console but silently swallowed in the UI — the button just spins and then stops.

**Evidence:**
```bash
$ curl -X POST -H "Content-Type: application/json" \
  -d '{"priceId":"growth"}' https://revive-hq.com/api/checkout
{"error":"`customer_creation` can only be used in `payment` mode."}
HTTP 500
```

Browser console (captured during test):
```
Failed to load resource: the server responded with a status of 500 ()
  URL: https://revive-hq.com/api/checkout
Checkout error: `customer_creation` can only be used in `payment` mode.
```

**Fix:** Remove `customer_creation: "always"` from the checkout session params in `subscription` mode:
```typescript
// REMOVE this line from stripe.checkout.sessions.create():
customer_creation: "always",  // ← DELETE — not valid in subscription mode
```

---

## 🟡 Medium Issues

### ISSUE #3 — Stripe Connect Shows "Tahseen-Ur Rahman" (Not "Revive")

**Severity:** Medium — Trust / Branding  
**Affected URL:** `https://connect.stripe.com/setup/e/...` (Stripe onboarding page)

When `/api/stripe/connect` correctly redirects users to Stripe's hosted Express onboarding, the page displays:
> "Tahseen-Ur Rahman partners with Stripe for secure payments and financial services."

This is the platform owner's personal name — not the product name "Revive." Users signing up for Revive will see a stranger's name, which looks untrustworthy and unprofessional.

**Fix:** Update the Stripe platform/Connect account display name to "Revive" in the Stripe Dashboard → Settings → Business details.

---

### ISSUE #4 — `/api/health` Returns 401 (Monitoring Broken)

**Severity:** Low-Medium — Ops/monitoring impact  
**Affected URL:** `/api/health`

```bash
$ curl -s https://revive-hq.com/api/health
{"error":"Unauthorized"}
HTTP 401
```

`/api/health` IS listed in `PUBLIC_ROUTES` in middleware, but returns 401 in production. This suggests the deployed build may have a different middleware than what's in the repo, OR the route itself requires auth.

This means uptime monitoring (UptimeRobot, Pingdom, etc.) using this endpoint would falsely report outages.

**Fix:** Verify `/api/health` is properly whitelisted and returns `{"status":"ok"}` without auth.

---

### ISSUE #5 — Changelog Contradicts Current Pricing

**Severity:** Medium — Trust / Confusion  
**Affected URL:** `/changelog`

The Changelog (Launch Day entry, Feb 5, 2026) lists:
> ✓ "Performance-based pricing (20% of recovered revenue)"

But the current Pricing page says:
> "No. Unlike competitors who take 15-25% of recovered revenue, Revive charges a flat monthly fee."

This is a direct contradiction. Users researching before buying may read the changelog and think they'll be charged 20%, then feel deceived.

**Fix:** Update the changelog entry to reflect actual pricing: `"Flat-rate pricing — Free up to $500/mo, then $99/mo flat"`.

---

### ISSUE #6 — Each `/api/stripe/connect` Visit Creates a New Orphaned Stripe Account

**Severity:** Medium — Data hygiene / Stripe limits  
**Affected URL:** `/api/stripe/connect`

Every GET request to `/api/stripe/connect` calls `stripe.accounts.create()` and creates a new Express connected account before redirecting the user. If a user:
- Refreshes the Stripe onboarding page
- Clicks "Back" and tries again
- Abandons the flow

…a new orphaned account is created each time. This will pollute the Stripe dashboard and may eventually hit Stripe account creation rate limits.

**Fix:** Use a session/cookie to check if an account was already created for this user session before creating a new one. Or use a stateless approach where account creation happens only after the user returns from Stripe.

---

## 🟢 What's Working Well

### Homepage
- **Loads fast**, no visual errors
- Dark theme, clean design
- All marketing copy is compelling and consistent
- Stats bar ($0, 5 min, $500, 24/7) is well-placed
- "How It Works" 3-step section is clear
- Trust badges (256-bit SSL, Stripe Verified Partner) display correctly
- Footer navigation works

### Pricing Page (`/pricing`)
- **All 3 tiers render correctly**:
  - Free: $0/forever — 6 features listed ✅
  - Growth: $99/month (Most Popular badge) — 10 features listed ✅  
  - Scale: Custom — 10 features listed ✅
- Recovery calculator is working and shows realistic numbers ($10K, $50K, $100K MRR scenarios)
- FAQ section expands correctly
- "Contact Sales" links to `mailto:sales@revive-hq.com` ✅
- Visual hierarchy is good

### Demo Page (`/demo`)
- **Excellent mock data** — feels like a real product
- Shows: $47,320.50 total recovered, 73% recovery rate, 3 active failed payments
- Recovery Timeline chart renders correctly
- 5 realistic customer records with status indicators (Recovered, Retrying, Dunning, Failed)
- Live Activity feed on the right sidebar
- "Demo Mode" badge in bottom left — good transparency
- Quick Actions buttons visible (Retry All Failed, Send Dunning Emails, Export CSV) — not tested for functionality in demo mode

### Onboarding Page (`/onboarding`)
- **Beautiful animated loading screen** with 5-step progress
- Smooth progress bar animation
- Step labels animate correctly (Connecting → Scanning → Analyzing → Setting up → Redirecting)
- "Scanning your last 90 days" callout card looks great
- Redirects to `/dashboard` after 3 seconds as designed

### FAQ Page (`/faq`)
- All 4 sections load: Getting Started, Pricing, Technical, Support
- Accordion items appear to work
- "Contact Support" CTA visible in footer section

### Changelog Page (`/changelog`)
- Timeline format looks good
- Shows: Launch Day (Feb 5), Built (Feb 4), Coming Soon features, Future roadmap
- "Send us your ideas" CTA present

### API Security
```
/api/stripe/status  → 401 ✅ (properly secured after security fix)
/api/dashboard/stats → 401 ✅
/api/analytics → 401 ✅
```

---

## 📊 Full API Test Results

| Endpoint | Method | HTTP Code | Response | Expected | Pass? |
|----------|--------|-----------|----------|----------|-------|
| `/api/stripe/status` | GET | 401 | `{"error":"Unauthorized"}` | 401 | ✅ |
| `/api/health` | GET | 401 | `{"error":"Unauthorized"}` | 200 | ❌ |
| `/api/connect` | GET | 401 | `{"error":"Unauthorized"}` | 307 → Stripe | ❌ |
| `/api/stripe/connect` | GET | 307 | Redirects to Stripe | 307 | ✅ |
| `/api/stripe/callback` | GET (no params) | 307 | Redirects to pricing w/ error | 307 | ✅ |
| `/api/connect/callback` | GET | 401 | `{"error":"Unauthorized"}` | — | ❌ |
| `/api/checkout` | POST (growth) | 500 | `customer_creation` error | 200 + Stripe URL | ❌ |
| `/api/waitlist` | POST | 200 | `{"message":"You're on the list!"}` | 200 | ✅ |

---

## 🗺️ Page-by-Page Results

### `/` — Homepage
- **Status:** ✅ Loads correctly
- **Screenshot:** Full-page dark themed landing page
- **CTAs:**
  - "Start Free — No Credit Card" → `/api/connect` ❌ (401)
  - "View Demo Dashboard" → `/dashboard` ⚠️ (shows API key login, not demo)
  - "Connect Stripe — See Your Lost Revenue" → `/api/connect` ❌ (401)
  - Nav "Connect Stripe" → `/api/connect` ❌ (401)
- **UX Notes:** When clicking any Connect CTA via client-side navigation (Next.js RSC), the 401 response causes unexpected behavior. Direct browser navigation to `/api/connect` shows raw JSON error.

### `/pricing` — Pricing Page
- **Status:** ✅ Renders all 3 tiers
- **Screenshot:** 3-column pricing grid with Free/Growth/Scale
- **CTAs:**
  - "Connect Stripe — Start Free" → `/api/connect` ❌ (401)
  - "Start Growth Plan" → POST `/api/checkout` ❌ (500 error, silent fail)
  - "Contact Sales" → `mailto:sales@revive-hq.com` ✅
- **UX Notes:** Growth Plan button appears to spin briefly then nothing happens. No error message shown to user — completely silent failure.

### `/demo` — Demo Dashboard
- **Status:** ✅ Mock data loads and displays correctly
- **Screenshot:** Full dashboard with charts, payment list, live activity
- **CTAs:**
  - All 4 "Connect Stripe" links → `/api/connect` ❌ (401)
- **UX Notes:** Demo page itself is excellent. The connect CTAs just don't work.

### `/onboarding` — Onboarding Flow
- **Status:** ⚠️ Animation works; end redirect unclear without Stripe session
- **Screenshot:** 5-step loading animation with progress bar
- **Behavior:** 
  - Animates correctly for 3 seconds
  - Redirects to `/dashboard?connected=true` 
  - Without a real Stripe account session, `/dashboard` shows API key login
- **UX Notes:** Users arriving here without completing Stripe OAuth will see the animation then hit the login wall. No error or helpful message.

### `/dashboard` — Dashboard
- **Status:** ⚠️ Shows API key login screen
- **Screenshot:** "Revive Dashboard — Enter your API key to continue" modal
- **UX Notes:** The "View Demo Dashboard" link from the homepage goes here, not to `/demo`. This is confusing — users who click "View Demo" will hit a login wall instead of the demo.

### `/faq` — FAQ
- **Status:** ✅ 
- **Sections:** Getting Started (4), Pricing (4), Technical (4), Support (3)
- **UX Notes:** Good content. Accordions load correctly.

### `/changelog` — Changelog
- **Status:** ✅ with pricing inconsistency (see Issue #5)
- **Content:** Launch Day (Feb 5), Built (Feb 4), Coming Soon, Future Roadmap

---

## 🔗 Stripe Connect Flow (Step-by-Step)

**Tested via direct URL** (`/api/stripe/connect`):

1. **Browser navigates to** `https://revive-hq.com/api/stripe/connect`  
   → Server creates Stripe Express account (calls `stripe.accounts.create()`)  
   → Server creates Account Link (calls `stripe.accountLinks.create()`)

2. **Browser redirected to** `https://connect.stripe.com/setup/e/acct_xxx/...`  
   → Stripe's hosted Express onboarding loads  
   → **Page shows:** "Tahseen-Ur Rahman partners with Stripe..." (branding issue!)  
   → **Page shows:** "Sign in to Express" with email field

3. **After Stripe onboarding completes:**  
   → Stripe redirects to `https://revive-hq.com/api/stripe/callback?account=acct_xxx`  
   → Callback retrieves account, saves to DB, scans for failed payments  
   → Redirects to `/onboarding?account=...&lost=...&recoverable=...`

4. **Onboarding page** animates for 3 seconds → redirects to `/dashboard?connected=true`

**UNTESTED:** End-to-end after entering real Stripe credentials (requires actual Stripe account)

---

## 💡 Recommended Fix Priority

| Priority | Issue | Fix Time | Impact |
|----------|-------|----------|--------|
| 🔴 P0 | Add `/api/connect` to PUBLIC_ROUTES in middleware | 2 min | Unblocks ALL conversions |
| 🔴 P0 | Remove `customer_creation: "always"` from checkout | 2 min | Enables paid upgrades |
| 🟠 P1 | Fix "View Demo Dashboard" link to `/demo` instead of `/dashboard` | 2 min | Better user journey |
| 🟠 P1 | Add health endpoint to unauthenticated routes | 5 min | Monitoring |
| 🟡 P2 | Update Stripe platform name to "Revive" | 10 min | Trust/branding |
| 🟡 P2 | Fix changelog pricing inconsistency (20% vs $99 flat) | 5 min | Trust |
| 🟡 P2 | Prevent orphaned Stripe accounts per session | 1-2 hrs | Data hygiene |

---

## 🐛 Issues Summary

| # | Severity | Issue | File(s) |
|---|----------|-------|---------|
| 1 | 🔴 CRITICAL | All CTAs use `/api/connect` (401) instead of `/api/stripe/connect` | `middleware.ts`, all page files |
| 2 | 🔴 CRITICAL | Checkout 500: `customer_creation` invalid in subscription mode | `api/checkout/route.ts` |
| 3 | 🟡 MEDIUM | Stripe onboarding shows personal name, not "Revive" | Stripe Dashboard settings |
| 4 | 🟠 LOW-MED | `/api/health` returns 401 (breaks monitoring) | `api/health/route.ts` |
| 5 | 🟡 MEDIUM | Changelog says 20% fee, pricing says $99 flat | `changelog/page.tsx` |
| 6 | 🟡 MEDIUM | Every `/api/stripe/connect` visit creates orphaned Stripe account | `api/stripe/connect/route.ts` |
| 7 | 🟢 LOW | "View Demo Dashboard" nav link goes to API key login, not `/demo` | `page.tsx`, `Navbar.tsx` |
| 8 | 🟢 LOW | Demo page sidebar links (Analytics, Payments, Emails) use `#anchor` or `/demo` — Settings is misleadingly linked | `demo/page.tsx` |

---

## ✅ Test Coverage

- [x] Homepage load + CTA audit
- [x] `/api/stripe/connect` redirect chain
- [x] Stripe Express onboarding page
- [x] `/pricing` — all 3 tiers
- [x] `/pricing` — Growth Plan checkout flow
- [x] `/demo` — mock data display
- [x] `/onboarding` — animation + redirect
- [x] `/dashboard` — authenticated access
- [x] `/faq` — page load
- [x] `/changelog` — page load + content audit
- [x] API endpoints: `/api/stripe/status`, `/api/health`, `/api/connect`, `/api/stripe/connect`, `/api/stripe/callback`, `/api/checkout`, `/api/waitlist`
- [ ] Full Stripe OAuth with real account (requires actual credentials)
- [ ] Email dunning send
- [ ] Webhook processing
- [ ] Analytics export
- [ ] Card update flow (`/update-card/[token]`)

---

*Report generated by automated E2E test — revive-hq.com production, 2026-02-18*
