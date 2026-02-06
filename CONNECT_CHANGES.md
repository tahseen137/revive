# Stripe Connect OAuth Integration — Changes Summary

**Date:** 2026-02-05  
**Build status:** ✅ Passes (`npm run build`)

---

## New Files

### API Endpoints

| Endpoint | File | Method | Purpose |
|----------|------|--------|---------|
| `/api/stripe/connect` | `src/app/api/stripe/connect/route.ts` | GET | Generates Stripe Connect OAuth URL and redirects to Stripe's authorization page. Supports `?return=` param for post-auth redirect (e.g. `onboarding`, `dashboard`). |
| `/api/stripe/callback` | `src/app/api/stripe/callback/route.ts` | GET | Handles OAuth callback from Stripe. Exchanges auth code for connected account ID, fetches account details, stores the connection, runs a 30-day failed payment scan, then redirects with results. |
| `/api/stripe/status` | `src/app/api/stripe/status/route.ts` | GET | Returns current connection status. Exposes account ID, email, business name, and connected timestamp. Never exposes tokens. |
| `/api/stripe/disconnect` | `src/app/api/stripe/disconnect/route.ts` | POST | Disconnects a Stripe account. Deauthorizes on Stripe's side via `stripe.oauth.deauthorize()`, then removes from local store. Accepts optional `{ stripeAccountId }` body. |

### Libraries

| File | Purpose |
|------|---------|
| `src/lib/connected-accounts.ts` | Unified API for managing connected Stripe accounts. Wraps the existing `db.ts` Redis/in-memory layer with `saveConnectedAccount`, `getConnectedAccount`, `getAllConnectedAccounts`, `removeConnectedAccount`, and `hasActiveConnection` helpers. |
| `src/lib/application-fee.ts` | Application fee calculation logic. Exports `calculateApplicationFee(amount)` (15% of recovered revenue), `getApplicationFeeParams()` for Stripe API calls, and `formatFeeBreakdown()` for human-readable display. |

---

## Modified Files

### `src/app/api/connect/route.ts` (Legacy Redirect)
- Now redirects to `/api/stripe/connect` for backward compatibility.

### `src/app/api/connect/callback/route.ts` (Legacy Redirect)
- Now redirects to `/api/stripe/callback`, forwarding all query params.

### `src/app/onboarding/components/ConnectStripe.tsx` (Major Update)
- **Connection status check:** On mount, calls `/api/stripe/status` to see if already connected.
- **Three states:** Loading → Already Connected → Not Connected.
- **Already Connected view:** Shows account info card with business name, email, connection date, and active badge. Has "Continue" button and small "Disconnect" link.
- **Not Connected view:** Same OAuth flow as before, now pointing to `/api/stripe/connect?return=onboarding`.
- **Disconnect capability:** Calls `/api/stripe/disconnect` with confirmation dialog.

### `src/app/dashboard/page.tsx` (Dashboard Integration)
- **Connection status in header:** Shows connected account name/email with green dot and "Connected" badge when linked. Shows "Disconnect" button. Falls back to "Connect Stripe" button when not connected.
- **New state:** `connectedAccount`, `disconnecting` state variables.
- **`fetchConnectionStatus()`:** Calls `/api/stripe/status` on mount.
- **`handleDisconnect()`:** Calls `/api/stripe/disconnect` with confirmation.

### `src/lib/retry-engine.ts` (Application Fee Logic)
- **Import:** Now imports `calculateApplicationFee` and `APPLICATION_FEE_PERCENT` from `application-fee.ts`.
- **`executeRetry()`:** When retrying a payment on a connected account (not `"direct"`), adds `application_fee_amount` to the `stripe.invoices.pay()` call. Logs the fee amount. This means Revive earns 15% of every successfully recovered payment.

### `.env` / `.env.local`
- Added `NEXT_PUBLIC_BASE_URL=https://revive-hq.com`.

---

## Architecture Notes

### OAuth Flow
```
User clicks "Connect with Stripe"
  → GET /api/stripe/connect?return=onboarding
  → Redirects to https://connect.stripe.com/oauth/authorize
  → User authorizes on Stripe
  → Stripe redirects to /api/stripe/callback?code=...&state=onboarding
  → Server exchanges code for account ID
  → Stores connected account in Redis/in-memory
  → Scans last 30 days of failed payments
  → Redirects to /onboarding?connected=true&lost=...&recoverable=...
```

### Application Fee Flow
```
Failed payment detected (webhook or scan)
  → Queued for smart retry
  → Cron job triggers retry
  → stripe.invoices.pay(invoiceId, { application_fee_amount: 15% }, { stripeAccount: connected })
  → If successful: Revive earns 15%, customer recovers 85%
  → If failed: No fee charged, retry rescheduled
```

### Storage
- Uses existing `db.ts` abstraction (Upstash Redis in production, in-memory for dev).
- Connected accounts stored under `connected_account:{accountId}` keys.
- No new database dependencies required.

### Environment Variables Required
| Variable | Description | Status |
|----------|-------------|--------|
| `STRIPE_SECRET_KEY` | Stripe secret key | ✅ Set |
| `STRIPE_CONNECT_CLIENT_ID` | Stripe Connect OAuth client ID | ⚠️ Placeholder (`ca_placeholder`) — set real value when Connect identity verification completes |
| `NEXT_PUBLIC_BASE_URL` | Production URL for OAuth callbacks | ✅ Set to `https://revive-hq.com` |

### What's Next
1. **Set real `STRIPE_CONNECT_CLIENT_ID`** once Stripe identity verification completes for acct_1SxH7xAJmUBqj9CQ.
2. **Configure Stripe Connect redirect URI** in Stripe Dashboard → Connect Settings → set `https://revive-hq.com/api/stripe/callback`.
3. **Add proper database** (Postgres/Planetscale) to replace JSON/in-memory storage.
4. **Add multi-tenant support** — currently treats all connected accounts globally; future: associate accounts with authenticated users.
5. **Webhook for `account.application.deauthorized`** — Stripe sends this when a user disconnects from their side; handle it to clean up local state.
