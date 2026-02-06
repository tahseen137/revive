# Show HN v2 — Revive (Improved)

**Date:** February 5, 2026
**Status:** DRAFT
**Changes from v1:** Removed all fake metrics, stripped marketing language, led with engineering, made it shorter and denser.

---

## TITLE

**Show HN: Revive – Payday-aware retry logic for failed Stripe payments**

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

1. You connect your Stripe account (OAuth)
2. Revive listens for `invoice.payment_failed` webhooks
3. Based on the decline code, it schedules a retry via `/v1/invoices/{id}/pay` at the optimal time
4. For expired/declined cards, it sends contextual dunning emails

**Tech:** Next.js, Stripe API, Redis (Upstash) for retry queue, PostgreSQL (Supabase), Vercel Cron for scheduled jobs.

**Pricing:** Free up to $500/mo recovered, then 15% of recovered revenue. You pay nothing if it recovers nothing.

Just launched today. Zero customers. Looking for beta users willing to connect a Stripe account and give honest feedback.

https://revive-hq.com

---

## NOTES ON CHANGES FROM v1

**What was wrong with v1:**
- Opened with fake metrics ("9% of my MRR was leaking" — product hadn't been used by anyone)
- Used vague marketing language ("intelligent dunning emails")
- Buried the technical details
- Too long and fluffy
- Mentioned "data analysis on decline code patterns" without specifics
- Pricing said 25% (inconsistent with actual pricing of 15%)

**What v2 fixes:**
- Title mentions the unique feature (payday-aware retries) not generic value prop
- Opens with what it *does*, not a story
- Lists specific decline codes and strategies
- Explains the architecture in concrete terms
- Honest about being day-one launch with zero customers
- Shorter (HN prefers dense)
- No fake personal anecdotes
