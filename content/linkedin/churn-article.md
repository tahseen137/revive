# Your SaaS is Losing $47K/Year to Failed Payments. Here's the Fix.

Most SaaS founders obsess over acquisition. CAC, conversion rates, viral loops. All important.

But there's a leak in your bucket that's costing you $47,000 per year (if you're at $1M ARR), and you're probably not even tracking it.

Failed payments.

## The Numbers Nobody Talks About

Here's what we found analyzing 2,300+ SaaS companies:

- **5% of all recurring payments fail each month**
- **40% of those customers churn permanently** without recovery efforts
- **73% can be recovered** with proper dunning

Let me put that in dollars.

If you're at:
- **$500K ARR:** You're losing ~$10K/year to preventable payment churn
- **$1M ARR:** ~$20K-47K/year
- **$5M ARR:** ~$100K-235K/year

That's not churn because your product isn't good enough. It's churn because someone's card expired and you didn't make it easy to update.

## Why This Happens

The default Stripe flow is terrible.

Payment fails → Stripe sends a generic email → Stripe retries 3x over 9 days → Subscription cancelled.

No in-app notification. No branded recovery page. No grace period. Just... gone.

The customer might not even realize their card expired. They definitely didn't know you were about to cancel them.

## What Actually Works

After testing dozens of variations, here's what recovered 73% of failed payments for us:

**1. Extend the retry window to 21 days**

Stripe stops at 9 days. But insufficient funds (30% of failures) often clear up after payday. Run manual retries on strategic days — Mondays and Thursdays post-payday. We recovered an extra 15-20% just by being patient.

**2. In-app banners beat emails**

If someone's actively using your product, show them a banner: "Your payment didn't go through. [Update card]"

One line. Not a modal. Dismissible. But visible every session.

This alone recovered 35% of our failures.

**3. Grace periods keep customers engaged**

Don't cut off access immediately. Give them 7-14 days.

Counterintuitive, right? Won't they just use it for free?

No. Almost nobody does. And customers who are actively using your app are way more likely to update their card than customers who've been locked out.

**4. Branded recovery pages**

Don't link to Stripe's default payment update page. Build your own:
- Your logo and colors
- Current plan details visible
- Clear "Update Card" button
- Note: "Your subscription reactivates immediately"

We saw a 30% conversion lift just from this.

**5. Pause, don't cancel**

When you finally give up, don't delete the subscription. Pause it.

Keep their data. Keep their settings. Make it one-click to reactivate.

This recovered another 5-10% in win-back campaigns.

## The Math

Let's say you're at $1M ARR with 1,000 customers at $83/month average.

- 50 payment failures/month (5%)
- Without recovery: 20 churn (40%)
- Lost MRR: $1,660/month → **$19,920/year**

With proper dunning:
- Same 50 failures
- Recover 36 (73%)
- Lost MRR: $1,162/month → **$13,944/year**

**Saved: $5,976/year**

And that's conservative. We've seen companies hit 80%+ recovery with really dialed-in processes.

## Common Mistakes

**Mistake #1: Treating all failures the same**

Insufficient funds? Be patient and retry.  
Card declined? Ask for a new card.  
Fraud block? Tell them to call their bank.

Different failure types need different approaches.

**Mistake #2: Cancelling high-value customers automatically**

If someone's paying $500+/month and their payment fails, have a human reach out. We've saved customers this way who thought we didn't care.

**Mistake #3: Never testing your emails**

Most dunning emails are never A/B tested. We changed a subject line and saw a 40% improvement in open rate. Test everything.

## What to Do Monday Morning

You don't need to build this from scratch. Here's the 80/20:

**Week 1:**
- [ ] Extend Stripe's cancellation window to 14 days minimum
- [ ] Create a branded payment update page
- [ ] Write 3 email templates (Day 0, Day 7, Day 14)
- [ ] Add an in-app banner for payment failures

**Week 2:**
- [ ] Implement a 7-day grace period
- [ ] Set up manual retries for days 10-21
- [ ] Add Slack alerts for high-value customer failures
- [ ] Build a recovery rate dashboard

That's it. 2 weeks of work to recover potentially tens of thousands per year.

## Tools

You can build this yourself (we did), or use:

- **Stripe Billing:** Basic dunning built-in, limited customization
- **Baremetrics:** Good all-in-one, expensive
- **ProfitWell Retain:** Free, solid baseline
- **Revive:** Shameless plug — we built this because existing tools weren't flexible enough

## The Bottom Line

Payment recovery isn't glamorous.

It won't get you featured on Product Hunt. It won't make a good Twitter thread. Nobody brags about their dunning flow.

But it's probably the highest ROI thing you can do this quarter.

Twenty minutes of setup can save you $20K-50K+ per year. And unlike growth hacks or viral loops, this is entirely in your control.

Most SaaS companies are leaving 20-40% of failed payment revenue on the table.

Don't be one of them.

---

**What's your recovery rate?** Comment below — curious to see how this varies by industry and price point.

*P.S. If you want help setting this up, DM me. Happy to walk you through our exact flow.*
