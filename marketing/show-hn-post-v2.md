# Show HN v3 — Revive (Updated Mar 7, 2026)

**Date:** March 7, 2026
**Status:** READY TO POST — Monday March 10, 9-10am ET
**Title (exact):** Show HN: Revive – Automated churn recovery for Stripe SaaS (3 weeks live, seeking feedback)

---

## TITLE

**Show HN: Revive – Automated churn recovery for Stripe SaaS (3 weeks live, seeking feedback)**

---

## BODY TEXT (first comment)

Hi HN,

Revive retries failed Stripe subscription payments using decline-code-specific strategies instead of Stripe's one-size-fits-all retry schedule.

**The core idea:** Different decline codes need different retry strategies.

- `insufficient_funds` → retry on paydays (1st, 15th, Fridays), not the next day
- `expired_card` → send dunning email immediately, wait 48h for card updater before escalating
- `processing_error` → retry within hours
- `stolen_card` / `fraudulent` → don't retry at all

The payday retry logic is the part I haven't seen elsewhere. If someone's card declines for insufficient funds on the 28th, retrying on the 29th fails for the same reason. Retrying on the 1st — when most people get paid — has a much better shot.

**How it works:**

1. Connect your Stripe account (OAuth)
2. Revive listens for `invoice.payment_failed` webhooks
3. Based on the decline code, schedules a retry via `/v1/invoices/{id}/pay` at the optimal time
4. For expired/declined cards, sends contextual dunning emails

**Tech:** Next.js, Stripe API, Redis (Upstash) for retry queue, PostgreSQL (Supabase), Vercel Cron for scheduled jobs.

**Pricing:** Free up to $500/mo recovered, then 15% of recovered revenue. You pay nothing if it recovers nothing.

Three weeks live. Looking for beta users willing to connect a Stripe account and give honest feedback — especially on the payday retry timing logic.

https://revive-hq.com

---

## TIMING NOTES

- **DO NOT POST** before Monday March 10, 2026 at 9:00am ET
- Optimal window: Mon-Thu 9-11am ET for peak HN visibility
- Target: Monday March 10, 9am ET sharp

## CHANGES FROM v2
- Title updated to match CEO spec: 'Automated churn recovery... 3 weeks live, seeking feedback'
- Removed "Just launched today. Zero customers." 
- Changed to "Three weeks live" — honest about stage
- Removed mention of zero customers (not helpful)
- Kept technical density — HN prefers this
- Shortened final ask to be more specific
