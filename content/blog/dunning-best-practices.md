# Dunning Email Best Practices: 7 Templates That Recover Failed Payments

*10 min read · Payment Recovery*

Most dunning emails are terrible. Not because founders don't care, but because nobody teaches you how to write them, so you copy Stripe's generic template, send it once, and wonder why 70% of your failed payments never recover.

I've spent time studying recovery data from SaaS companies at every stage. The ones recovering 60-70% of failed payments aren't doing anything magical — they're just following a few non-obvious principles and sending the right message at the right time.

Here's everything I've learned, including 7 email templates you can steal.

---

## What's actually going wrong with your current dunning emails

Before the templates, let's talk about why most dunning sequences fail.

The biggest mistake isn't the copy. It's the assumption that all payment failures are the same. A card expiring is completely different from insufficient funds, which is completely different from a bank blocking an international charge. When you send the same generic "your payment failed" email for all three, you're treating very different situations identically.

The second problem: friction. If a customer has to log in, navigate to billing settings, and manually update their card — somewhere around 80-85% of them will abandon that process. The mental overhead of remembering a password and clicking through three screens is enough to tip people toward just not bothering.

Third: timing. Waiting 24-48 hours to send the first email is genuinely surprising how many companies do this. By then, customers have moved on mentally. The first email should go out within an hour, while the failed charge is still fresh.

And finally: tone. The aggressive "update now or we'll cancel your account" approach works on some people but damages the relationship. Most payment failures are accidental — the customer didn't mean to stop paying, their card just expired. Treating them like a delinquent debtor is kind of alienating.

Alright, let's get into the actual templates.

---

## Template 1: The Soft Alert (Day 0 — within 1 hour)

This is the most important email in the sequence, and most people write it wrong.

**Subject:** Quick heads up about your [Product] account

---

Hi [First Name],

Bit of an annoying thing — we couldn't process your payment for [Product Name] today. Usually this happens because a card expired or has different billing info than expected.

Takes about 30 seconds to fix:

**[→ Update Payment Method](update-link)**

If you've already updated your card or this looks like an error, feel free to ignore this — we'll retry automatically in a couple days.

—

[Your Name]  
[Product] · questions? Just reply to this

---

**Why this works:** Non-threatening. Assumes good faith. The "retry automatically" line reduces urgency anxiety — you're not saying "act NOW or we cancel you." That comes later.

---

## Template 2: The Specific Decline (Day 0 — insufficient funds variant)

When you know the specific reason for the decline, use it. Stripe's `decline_code` field tells you a lot.

**Subject:** Your [Product] payment — we'll retry in 3 days

---

Hi [First Name],

We tried to process your [Product Name] payment today but the card showed insufficient funds. It happens — no big deal.

We'll automatically retry in 3 days. If you'd rather take care of it now or try a different card:

**[→ Update Payment Method](update-link)**

Either way, your account is staying active through this.

—

[Your Name]

---

**Why this works:** Honest about the reason without being embarrassing. The "retry in 3 days" line is key — it suggests you're handling it, which reduces customer anxiety. Some people will update immediately; others will let you retry and succeed on payday. Both work.

---

## Template 3: The Expired Card (Day 0 — expired card variant)

Expired cards are the most fixable failure type. Say that.

**Subject:** Your card expired — here's the fast fix

---

Hi [First Name],

Looks like the card we have on file for [Product Name] expired recently. Super common — happens to everyone.

Update it here (takes 60 seconds):

**[→ Update Payment Method](update-link)**

Your current card: •••• •••• •••• [Last 4], expired [MM/YY]

—

[Your Name]

---

**Why this works:** Shows you know specifically what happened. The "super common" line normalizes it. Including the last 4 digits and expiry makes it feel genuinely personalized, not automated.

---

## Template 4: The 3-Day Follow-Up (Day 3)

If the payment still hasn't resolved, it's time to reintroduce some urgency.

**Subject:** [Product] — payment still needs attention

---

Hi [First Name],

Just following up — we haven't been able to process your [Product Name] payment yet, and we want to make sure your account stays active.

Your access is still on right now, but we'll need to pause things in about 4 days if we can't complete billing.

**[→ Update Payment in 60 Seconds](update-link)**

If something feels off or you have questions, just reply — we're real people.

—

[Your Name]  
[Product]

---

**Why this works:** Soft countdown (4 days) without being aggressive. The "real people" line is important — it reduces friction for people who are confused about what's happening and might just need to ask a question.

---

## Template 5: The Win-Back Offer (Day 5 — optional)

This is the underused middle email. Not every company needs it, but if you're seeing significant drop-off between day 3 and day 7, consider adding a soft offer.

**Subject:** Something I wanted to offer you

---

Hi [First Name],

We still haven't been able to process your [Product Name] payment, and I just wanted to check in.

If cost is the issue, I'd be happy to talk about options — whether that's a plan that fits better, a short pause, or something else. I don't want you to lose access over something we can probably work out.

If it's just the payment method, here's the direct link:

**[→ Update Payment](update-link)**

Either way — just let me know.

—

[Your Name]

---

**Why this works:** This is a real human email. It's not automated-looking. For high-value customers especially, this kind of personal outreach converts surprisingly well. The "plan that fits better" line opens a door to retention conversations that might save accounts you'd otherwise lose permanently.

---

## Template 6: The Final Warning (Day 7)

Clear, honest, and deadline-specific. No games.

**Subject:** Your [Product] account pauses tomorrow

---

Hi [First Name],

We've tried a few times to process your payment for [Product Name] without success. Tomorrow, on [Specific Date], we're going to need to pause your account access.

Your data stays safe — we keep everything for 30 days so you can reactivate anytime. But access to [Feature 1], [Feature 2] will be paused until billing is resolved.

**[→ Update Payment Now — Takes 2 Minutes](update-link)**

If you meant to cancel, you don't need to do anything. No hard feelings.

—

[Your Name]

---

**Why this works:** Specific date (not "soon"), specific consequences, data safety reassurance (huge anxiety reducer), and explicit permission to leave if that's what they want. That last line sounds counterintuitive but actually reduces churn — it makes people feel respected, not pressured.

---

## Template 7: The Reactivation Email (Day 30 — account paused state)

This one runs after the account has been paused. Most companies never send this, which is a mistake — a meaningful portion of paused accounts will reactivate if you reach out once more.

**Subject:** Your [Product] account is waiting for you

---

Hi [First Name],

It's been about a month since your [Product Name] account was paused. We've kept all your data safe, and your account is ready to reactivate whenever you're ready.

A lot has happened since you left — [one sentence about new feature or improvement, if true]. 

If you'd like to come back:

**[→ Reactivate Your Account](reactivation-link)**

And if there's something that made the experience not worth it, I'd genuinely love to hear it. Helps us get better.

—

[Your Name]

---

**Why this works:** Not pushy. Leads with what they're getting back (their data, their progress), not with guilt. The product update line (if you have one) gives them a reason to reconsider. And the feedback ask signals that you care about the product, which builds trust even if they don't come back.

---

## The timing that actually works

Here's the sequence summary:

| Email | Timing | Open Rate (roughly) |
|-------|--------|---------------------|
| Template 1/2/3 (decline-specific) | Within 1 hour | ~68-72% |
| Template 4 (3-day follow-up) | Day 3 | ~52-58% |
| Template 5 (win-back offer) | Day 5 (optional) | ~45% |
| Template 6 (final warning) | Day 7 | ~78-82% |
| Template 7 (reactivation) | Day 30 | ~35-40% |

Day 7 has the highest open rates because people know it's the last chance. They open out of curiosity if nothing else.

Send at 9-11 AM in the customer's local timezone if you can get it. That's when people are in "handle tasks" mode. Avoid Friday afternoons — low action rate.

---

## The four things that kill dunning email performance

**Using Stripe's default emails.** Stripe's out-of-the-box emails have open rates around 13-15%. They're generic, unbranded, and don't match your product's voice. Turn them off and send your own.

**Requiring login to update payment.** If someone clicks your update link and hits a login screen, you've just lost most of them. Use Stripe Checkout in setup mode — it generates a secure, direct-to-payment-form link with no login required.

**Sending from a no-reply address.** Template 5 specifically depends on this, but honestly all dunning emails perform better from a real address. People need to be able to reply.

**One-and-done sequences.** If you're sending a single email and calling it a dunning system, you're leaving a lot of revenue on the floor. The multi-email sequence above is what drives 60-70% recovery rates. One email might get you to 20-25%.

---

## What to measure

If you're going to optimize your dunning emails over time, track these:

- **Open rate** — are they seeing it? (Target: 60%+ on email 1)
- **Click-through rate** — are they clicking the update link? (Target: 30-35%+)
- **Conversion rate** — do they actually update? (Target: 60%+)
- **Total recovery rate** — % of failed payments eventually paid (Target: 65%+)
- **Time to recovery** — how fast are payments recovering? (Target: 3-5 days average)

If your open rate is low, the subject lines need work. If open rate is fine but CTR is low, the email copy or the CTA placement is the problem. If CTR is fine but conversion is low, the payment update flow itself is broken.

---

## The part where I mention what Revive does

Revive automates this entire sequence — decline-specific emails, optimal timing, one-click update links, smart payment retries — for $49/mo flat, no revenue share.

If you want to set this up yourself, everything above is enough to get started. The templates are yours.

If you'd rather not wire up webhooks, manage retry logic, and maintain email sequences forever, that's what we're for.

[Connect Stripe and start recovering in 2 minutes →](https://revive-hq.com)

---

## Quick summary

Dunning emails work when they're:
- Decline-specific (expired card ≠ insufficient funds ≠ generic decline)
- Frictionless (one-click payment update, no login required)  
- Timed right (within 1 hour for the first email)
- Human in tone (assume good faith, include a real reply-to)
- Part of a multi-email sequence (not just one and done)

Most companies are leaving 40-50% of their potential recovery on the table. These templates close that gap.

---

*Revive is payment recovery automation for SaaS. Smart retries, dunning emails, and win-back campaigns — $49/mo flat, no revenue share.*
