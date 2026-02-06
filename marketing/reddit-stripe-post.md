# Reddit r/stripe Post — Revive

**Date:** February 5, 2026
**Status:** DRAFT

---

## POST TITLE

**"What I learned about Stripe decline codes after building a retry system from scratch"**

---

## POST BODY

I just spent 3 months building a custom payment retry system on top of the Stripe API, and I learned a lot about how decline codes actually work in practice vs. what the docs tell you. Sharing in case it helps anyone else.

---

**The decline code hierarchy nobody talks about**

Stripe gives you a `decline_code` on failed charges, but not all decline codes are created equal. After analyzing failure patterns, they roughly fall into three buckets:

**Recoverable (worth retrying):**
- `insufficient_funds` — The customer doesn't have money *right now*. This is the single biggest category of failed payments, and it's almost always temporary.
- `expired_card` — The card is dead, but the customer probably has a new one. Card updater (via network tokenization) handles some of these, but not all.
- `processing_error` — Stripe or the issuing bank had a temporary hiccup. Retry immediately or within hours.

**Probably recoverable (retry with caution):**
- `generic_decline` — The frustrating catch-all. Could be anything. Worth 1-2 retries.
- `do_not_honor` — The issuing bank said no. Sometimes temporary (fraud flag that clears), sometimes permanent. Hard to tell.

**Not recoverable (stop retrying):**
- `stolen_card` / `lost_card` — Obvious. Stop.
- `card_not_supported` — Wrong card type for this merchant category.
- `fraudulent` — Stripe or the bank thinks it's fraud. Retrying just makes things worse.

**What Stripe Smart Retries does:** Stripe's built-in Smart Retries is actually decent for basic cases. It uses machine learning across their network to optimize retry timing. But it treats retry logic as a black box — you can't configure it per decline code, you can't add your own timing logic, and you can't coordinate it with customer communication.

---

**The `insufficient_funds` insight**

This is the one that surprised me most. `insufficient_funds` is the most common recoverable decline, but the timing of your retry matters enormously.

If someone's payment fails on the 28th because they're broke, retrying on the 29th (Stripe's default behavior) has a terrible success rate. They're still broke.

But retrying on the **1st or 15th** — when most salaried people get paid — has a much better chance. Same for **Fridays** (weekly pay cycles).

I call this "payday detection" and it's the core of what I built. The logic is:

```
if decline_code == 'insufficient_funds':
  next_retry = next_payday(today)  # 1st, 15th, or next Friday
  # whichever comes first
```

Simple concept, but I haven't seen any tool that does this explicitly. Stripe Smart Retries might implicitly account for some timing patterns, but it's not transparent about it.

---

**Webhook architecture tips**

If you're building anything that reacts to payment failures, here's what I wish I knew earlier:

**1. Use `invoice.payment_failed` not `charge.failed`**

For subscription payments, `invoice.payment_failed` gives you the full context — which subscription, which customer, how many attempts have been made. `charge.failed` is lower-level and you have to piece things together yourself.

**2. Handle `invoice.payment_failed` idempotently**

Stripe can send the same webhook multiple times. If your retry logic creates a job on the first webhook, you don't want a duplicate job on the retry. Use the invoice ID as an idempotency key.

**3. Watch for `customer.subscription.updated` with `status: past_due`**

This fires when a subscription enters `past_due` state (payment failed, grace period started). It's your window to act. Once it hits `canceled` or `unpaid`, it's usually too late — the customer's already been cut off.

**4. `payment_intent.payment_failed` vs `invoice.payment_failed`**

Confusingly, both exist. For subscriptions, use the invoice-level event. `payment_intent.payment_failed` is more relevant for one-time charges.

**5. Stripe's `next_payment_attempt` field**

When a payment fails, the invoice object has a `next_payment_attempt` timestamp. This tells you when Stripe plans to retry. If you want to override with your own retry timing, you need to either:
- Turn off Stripe's automatic retries (risky)
- Or use `pay` endpoint to manually trigger a retry at your preferred time

I went with the manual approach — turn off automatic retries for subscriptions where I'm managing the retry logic, then use `/v1/invoices/{id}/pay` at the right moment.

---

**Card updater and network tokens**

One more thing worth knowing: Stripe's automatic card updater (powered by Visa Account Updater / Mastercard Automatic Billing Updater) can automatically update expired cards. But:

- It only works for some card networks and issuers
- It can take 24-72 hours to kick in
- It won't help with cards that were canceled (not just expired)
- Network tokens (if enabled) handle this more reliably but require setup

For `expired_card` declines, I send a dunning email immediately but also wait 48 hours to see if the card updater fixes it automatically before escalating.

---

**I ended up building this into a tool**

After building all this for a specific project, I realized it could be useful for other Stripe-based SaaS companies, so I packaged it up as [Revive](https://revive-hq.com). Just launched today — very early, zero customers yet, still learning.

But regardless of whether you use a tool for this, the decline code categorization and payday retry timing are things you can implement yourself. The Stripe API gives you everything you need; you just have to be thoughtful about how you use it.

Happy to answer questions about any of this. The Stripe API is deep — there's a lot that's not obvious from the docs.

---

## FIRST COMMENT

One more thing that bit me: **idempotency keys for manual retries**.

When you use `/v1/invoices/{id}/pay` to manually retry a payment, always pass an idempotency key. If your job queue retries the API call (network error, timeout), you don't want to double-charge the customer.

Stripe handles most double-charge scenarios gracefully, but I've seen edge cases where the same invoice gets two successful charges if you're not careful. The customer gets refunded eventually, but it's a support headache.

Format I use: `retry_{invoice_id}_{attempt_number}_{date}`

---

## NOTES

- r/stripe is a technical audience — they want API details, not marketing
- Frame as knowledge sharing, not product launch
- The product mention is at the end and brief
- The webhook tips and decline code breakdown provide genuine standalone value
- Expect technical follow-up questions — be ready to go deep
- Don't be defensive if someone says "Stripe Smart Retries already does this"
