# Indie Hackers Post — Revive

**Date:** February 5, 2026
**Status:** DRAFT

---

## TITLE

**Show IH: I just launched a failed payment recovery tool with $0 revenue — here's why I built it anyway**

---

## BODY

Hey IH 👋

I'm building in public, so here are my real numbers on launch day:

- **Revenue:** $0
- **Customers:** 0
- **MRR:** $0
- **Time building:** ~3 months

Now that we've got that out of the way — let me tell you why I think this is worth building.

---

**How I found the problem**

I was digging into why SaaS companies lose subscribers, and I kept running into the same stat: somewhere between 20-40% of all churn is *involuntary*. Not people who canceled. People whose credit card expired, or their bank flagged a transaction, or they just didn't have enough in their account that day.

These are customers who *want* to keep paying. They just... can't, temporarily.

And Stripe's built-in retry logic is surprisingly basic. It retries every failed payment on roughly the same schedule regardless of *why* it failed. Expired card? Same retry. Insufficient funds? Same retry. Temporary bank error? Same retry.

That felt like a solvable problem.

---

**What I built**

[Revive](https://revive-hq.com) — a Stripe integration that retries failed payments intelligently based on the decline code.

The feature I'm most proud of: **payday detection**. If a payment fails due to `insufficient_funds`, Revive doesn't just retry blindly the next day (when the customer still has no money). It retries around the 1st, 15th, and Fridays — when people typically get paid.

It sounds simple, but nobody else does this. The existing tools (Churnkey, Baremetrics Recover, ProfitWell Retain) are either expensive ($300+/mo minimum), bundled into larger platforms you might not need, or use flat pricing that doesn't make sense for smaller SaaS companies.

**Other stuff it does:**
- Pre-dunning emails (warns customers before their card expires)
- Decline-code-specific retry strategies
- Contextual dunning emails (not generic "your payment failed" messages)
- Analytics dashboard to track recovery rates

---

**Pricing: performance-based**

This is the part I want feedback on most.

Revive is **free up to $500/mo recovered**. After that, 15% of recovered revenue.

The idea: if you're small, it costs nothing. If you're bigger and we recover $5K for you, we take $750 — but you keep $4,250 you would have lost entirely.

If Revive recovers nothing, you pay nothing. Ever.

I went with this model because charging a $200/mo flat fee for a payment recovery tool felt backwards. You're already losing money to failed payments — the tool that fixes it shouldn't add to the bleeding.

---

**Why I'm sharing this at $0**

Because I believe in building in public honestly. I see too many launch posts that start with "I built X and hit $10K MRR in 2 weeks!" and I genuinely don't know if that helps anyone.

Here's the truth: I built this because the problem is real, the existing solutions have gaps, and I think the pricing model is differentiated. But I have zero data on whether it actually works for other people's businesses yet.

I need beta users. Not to pump my numbers — to find out if my assumptions are right.

---

**Tech stack (for the curious):**
- Next.js + TypeScript
- Stripe webhooks for real-time payment events
- Redis (Upstash) for retry queue management
- PostgreSQL (Supabase)
- Hosted on Vercel

---

**What I'd love from you:**

1. Does the pricing model make sense? Would you prefer a flat fee instead?
2. If you run a SaaS on Stripe — do you even know your involuntary churn rate? (Most founders I've talked to don't track it separately.)
3. What would make you trust a brand-new tool with zero social proof enough to try it?

That last one is genuine. I know "just launched, no customers" is a hard sell. I'm curious what would lower the bar for you.

**Link:** [revive-hq.com](https://revive-hq.com)

Thanks for reading. Happy to answer anything.

---

## NOTES

- IH loves building-in-public transparency — lean into the $0 revenue angle
- The "what would make you trust a new tool" question should spark good discussion
- Don't be defensive if people question the market or approach
- IH audience skews indie/solo founder — performance pricing resonates here
