# Cold Outreach Templates — Revive

## Reddit DM Template (for users posting about payment failures)

**Subject:** Re: your post about failed payments

---

Hey! Saw your post about [specific pain point from their post].

I've been deep in this problem for a while. A few things that actually move the needle:

1. **Retry timing matters more than retry count** — card_declined retries work best at 4hr intervals, insufficient_funds at 3 days (payday-aligned), expired cards should skip retries entirely and go straight to dunning
2. **Dunning emails get 40-68% open rates** when they include a one-click card update link vs generic "your payment failed" messages
3. **First 72 hours are critical** — recovery rate drops 80% after day 3

What's your current MRR if you don't mind? Happy to take a look at your decline codes and give you a rough recovery projection — no strings attached.

I'm actually building a tool specifically for this: https://revive-hq.com — performance-based pricing so you only pay if we recover revenue. But honestly, even if you DIY it, those 3 things above should help.

---

## Indie Hackers Comment Template

Great post — [acknowledge their specific struggle].

Failed payments are such a silent killer. Here's what I've seen work:

- **Smart retry timing by decline code** (not just "retry 3x and pray")
- **Dunning emails with one-click card update** — way higher conversion than "please log in and update your card"
- **First 72hr window** — after that, recovery drops dramatically

We're building https://revive-hq.com for exactly this — only pay a % of what we actually recover. Wrote a deep dive here: https://revive-hq.com/blog/failed-payment-recovery-strategies

---

## Twitter DM Template (for SaaS founders)

**DM:**

Hey [name]! Love what you're building with [product].

Quick question — how are you handling failed Stripe payments? Most SaaS companies lose 9-15% of MRR to involuntary churn without realizing it.

We built a tool that recovers 40-70% of those with smart retries + dunning emails. Performance-based pricing — you only pay when we actually recover revenue.

Would love to give you a free audit of your recovery potential: https://revive-hq.com

---

## Email Template (for waitlist follow-up)

**Subject:** Your MRR recovery potential (quick analysis)

Hi [name],

Thanks for joining the Revive early access list!

Quick question: what's your current MRR? I'd love to run a quick analysis showing your estimated recovery potential.

Here's what we typically see:
- $10K MRR → ~$630/mo recoverable → $536/mo net gain (after our 15%)
- $50K MRR → ~$3,150/mo recoverable → $2,678/mo net gain

Three things I can tell you right now that will help whether you use Revive or not:

1. Retry timing based on decline codes (not random intervals)
2. One-click card update links in dunning emails
3. Hit customers within 72 hours — recovery drops 80% after day 3

Want me to run the numbers for your setup?

Best,
Revive Team
https://revive-hq.com

---

## LinkedIn Template (for SaaS CTOs/Founders)

**Connection request note (300 chars max):**

Hi [name]! Building a payment recovery tool for SaaS companies on Stripe. Saw you're building [product] — curious how you handle involuntary churn? Would love to connect and share some data on recovery rates.

---

## Notes:
- Always lead with VALUE, not pitch
- Reference their specific situation
- Offer free audit/analysis as hook
- Mention performance-based pricing (removes risk objection)
- Include blog links for credibility
- Follow up once after 3 days, then stop
