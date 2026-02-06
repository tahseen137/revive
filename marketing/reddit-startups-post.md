# Reddit r/startups Post — Revive

**Date:** February 5, 2026
**Status:** DRAFT

---

## POST TITLE

**"Performance-based pricing for a SaaS tool — am I crazy, or is this underused?"**

---

## POST BODY

I just launched a tool called Revive that recovers failed Stripe payments. But honestly, this post is less about the tool and more about a pricing decision I made that I'd love to debate.

**The standard approach:** Most SaaS tools charge flat monthly pricing. $99/mo, $299/mo, enterprise tier, etc. Predictable for both sides. Makes sense.

**What I did instead:** Revive is free up to $500/mo in recovered revenue. After that, we take 15% of whatever we recover. If we recover nothing, you pay nothing.

**Why I went this route:**

The market I'm in (failed payment recovery) has established players — Churnkey, Baremetrics Recover, ProfitWell Retain. They're good tools. But they all have flat or tiered pricing starting at $100-500/mo.

If you're a SaaS doing $5K MRR and losing $400/mo to failed payments, a $300/mo recovery tool doesn't pencil out. You'd spend more on the fix than you lose to the problem.

Performance-based pricing eliminates that math. The tool only costs money when it's making you money. Small company? Small bill. Big company? Bigger bill, but proportional to value delivered.

---

**The risks I see with this model:**

1. **Revenue is unpredictable** — Some months I might make great money, other months almost nothing. Hard to plan around.
2. **Customers might game it** — Could someone route only their hardest-to-recover payments through Revive and handle easy ones themselves? Maybe, but I think the effort isn't worth it.
3. **Scaling costs** — As I recover more for clients, my infrastructure costs go up, but my margin stays at 15%. Need to make sure unit economics work.
4. **Trust problem** — How does the customer verify I'm reporting recovered amounts accurately? (Answer: everything maps back to Stripe's data, which they can independently verify.)

---

**The upside I'm betting on:**

1. **Zero friction to try it** — No credit card required until we've recovered $500+. The free tier is real, not a 14-day trial.
2. **Aligned incentives** — If my retry logic sucks, I make $0. I'm financially motivated to keep improving it.
3. **Differentiation** — In a market with established competitors, "you only pay when it works" is a real differentiator.
4. **Word of mouth** — Performance-based pricing is inherently shareable. "This tool recovered $2K for me and only charged $300" is a better story than "I pay $299/mo for this tool."

---

**Context on what the tool actually does (briefly):**

Failed payments happen for lots of reasons — expired cards, insufficient funds, bank declines, fraud flags. Stripe retries them, but with a one-size-fits-all approach.

Revive uses decline-code-specific retry logic. The one I'm most excited about: if a payment fails due to `insufficient_funds`, it retries around paydays (1st, 15th, Fridays) instead of blindly retrying the next day.

I just launched today. Zero customers, zero revenue. Building in public.

**Link:** [revive-hq.com](https://revive-hq.com)

---

**The question I'd love to discuss:**

For founders here — **would performance-based pricing make you more or less likely to try a new tool?**

On one hand, it removes risk. On the other, you might end up paying more than a flat fee if the tool works really well. Is that a bug or a feature?

Curious what this community thinks.

---

## FIRST COMMENT

To give more context on the market:

**Involuntary churn** (customers lost to payment failures, not cancellations) is a surprisingly big problem. Industry data suggests it accounts for 20-40% of all SaaS churn, depending on your market.

Most founders I've talked to don't even track it separately. They see "churned subscriber" and assume the customer left intentionally. But a huge chunk are just payment failures that weren't recovered.

The existing solutions work, but they're built for mid-market and up. If you're under $20K MRR, there's basically no recovery tool that makes financial sense at current pricing.

That's the gap I'm trying to fill.

---

## NOTES

- r/startups audience cares about business model and strategy, not just product
- The pricing debate angle should generate discussion
- Differentiated from the r/SaaS post which focused on technical Stripe retry logic
- Being upfront about risks builds credibility
- The question at the end is designed to spark comments
