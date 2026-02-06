# Cold DM Templates — Revive

**Date:** February 5, 2026
**Status:** DRAFT

**Rules:**
- Never send more than 5-10 DMs per day (avoid looking spammy)
- Only DM people who've publicly mentioned churn, failed payments, or Stripe issues
- Personalize every message — reference their specific tweet/post
- No fake familiarity. No "hey friend!" energy.
- If they don't respond, don't follow up more than once.

---

## TWITTER DM TEMPLATES

### Template 1: Responding to a churn tweet

**When to use:** Founder tweets about churn numbers, losing subscribers, or MRR dipping

> Hey [name] — saw your tweet about churn. Quick question: do you know how much of that is involuntary (failed payments vs. actual cancellations)?
>
> I ask because I just built a tool that retries failed Stripe payments based on the decline code — e.g., retrying insufficient funds around paydays instead of immediately. Just launched, looking for beta users. No cost unless it actually recovers revenue.
>
> No pressure at all — just thought it might be relevant to what you're dealing with. Happy to share more if you're curious.

### Template 2: Responding to a Stripe frustration tweet

**When to use:** Founder complains about Stripe's retry logic, dunning, or payment failures

> Hey [name] — saw your post about [specific Stripe issue they mentioned]. I ran into the same thing and ended up building a custom retry layer on top of Stripe's API.
>
> The short version: Stripe retries all failed payments the same way regardless of why they failed. My tool (Revive) uses different strategies per decline code — the big one is retrying insufficient funds around paydays instead of the next day.
>
> Just launched this week, zero customers yet, but would love to get your take if you've got 2 minutes. revive-hq.com

### Template 3: Responding to a "SaaS metrics" tweet

**When to use:** Founder shares MRR milestones, churn rates, or revenue updates

> Hey [name] — congrats on [milestone they mentioned]. Random question: do you track involuntary vs voluntary churn separately?
>
> I've been researching this space and the data suggests 20-40% of SaaS churn is just payment failures, not actual cancellations. Built a tool to address it (retries failed payments intelligently based on decline codes). Performance-based pricing — free unless it recovers revenue.
>
> Might not be relevant to you, but figured I'd ask. Either way, nice work on [their product].

---

## LINKEDIN MESSAGE TEMPLATES

### Template 1: Direct and concise

**When to use:** SaaS founder/CEO with 1K+ connections, likely dealing with churn at scale

> Hi [name],

> I'm building Revive — a failed payment recovery tool for Stripe-based SaaS companies. Just launched, looking for early users.
>
> The core idea: retry failed payments based on *why* they failed. Insufficient funds? Retry on paydays (1st, 15th). Expired card? Send a dunning email and wait for card updater. Instead of Stripe's one-size-fits-all retry.
>
> Pricing is performance-based — free up to $500/mo recovered, 15% after that. No cost if it doesn't work.
>
> Would love 5 minutes of your time for feedback if you're open to it. No pitch — genuinely looking for input from people who deal with this.

### Template 2: Problem-first approach

**When to use:** Founder who's posted about reducing churn or improving retention

> Hi [name],
>
> Saw your [post/article/comment] about [topic]. Quick question — have you looked into how much of your churn comes from failed payments specifically?
>
> I just launched a tool that tackles this for Stripe-based companies. The approach is pretty simple: instead of retrying all failed payments on the same schedule, it uses decline-code-specific strategies. The one founders seem most interested in is payday-aware retries for insufficient funds.
>
> It's brand new (launched this week, zero customers), so I'm mainly looking for honest feedback from people who've dealt with this problem. Open to a quick chat if you're interested.
>
> Either way, enjoyed your take on [their topic].

### Template 3: Mutual connection / community angle

**When to use:** Founder you share a community with (IH, Twitter SaaS community, etc.)

> Hi [name],
>
> We're both in [community/group]. I've been following your work on [their product] — nice to see it growing.
>
> I just launched something in the payment recovery space and I'm looking for honest feedback from SaaS founders. It's called Revive — connects to Stripe and retries failed payments using decline-code-specific logic (e.g., retrying insufficient funds around paydays instead of immediately).
>
> Performance-based pricing, so it's free unless it actually recovers revenue. No risk to try.
>
> Would love your take on whether this solves a real problem for you, or if you've got it covered already. Happy either way — just trying to validate with real founders.

---

## GENERAL DM GUIDELINES

**Do:**
- Reference something specific they said or built
- Keep it under 150 words
- Make the ask small ("5 minutes of feedback" not "sign up now")
- Give them an easy out ("no pressure", "happy either way")
- Be honest about being new (builds trust, not weakness)

**Don't:**
- Send identical messages to multiple people
- Follow up more than once if no response
- Pretend you know them when you don't
- Use urgency tactics ("limited beta spots!")
- Lie about traction ("hundreds of users love it!")
- Send voice messages or videos unsolicited

**Tracking:**
Keep a simple spreadsheet:
| Name | Platform | Date Sent | Template Used | Response? | Notes |
|------|----------|-----------|---------------|-----------|-------|
