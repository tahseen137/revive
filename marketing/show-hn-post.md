# Show HN: Revive Launch Package

## TITLE

**Show HN: Revive – Recover failed Stripe payments with performance-based pricing**

---

## BODY TEXT (for first comment)

Hi HN,

I built Revive because I found **9% of my MRR was leaking to failed payments** — mostly expired cards and temporary declines. That's $900/month on a $10K MRR product just... disappearing.

Stripe's built-in retry logic is pretty basic. It retries everything the same way, regardless of why the payment failed. A "do_not_honor" decline gets the same treatment as "expired_card" or "insufficient_funds", even though they need completely different approaches.

**What Revive does:**

- **Smart retries based on decline codes** — Different retry strategies for different failure types. Expired cards get immediate dunning emails. Temporary declines retry at optimal times based on historical success patterns.

- **Intelligent dunning emails** — Contextual messaging that actually gets customers to update their payment info. No generic "Your payment failed" emails.

- **Performance-based pricing** — You only pay when we successfully recover a payment. No monthly fees, no risk.

**Tech stack:** Next.js, Stripe API, Redis for retry queuing, and a bunch of data analysis on decline code patterns.

The pricing model is the part I'm most curious about — is performance-based pricing actually what people want, or would you rather just pay a flat monthly fee? I'm genuinely interested in HN's take on this.

Link: https://revive-hq.com

I'd love your feedback, especially if you run a SaaS and deal with failed payments. What am I missing? What would make this more useful?

---

## PRE-LAUNCH CHECKLIST

### Best Time to Post on HN

**Optimal posting times:**
- **Tuesday, Wednesday, or Thursday** (avoid Mondays and Fridays)
- **8:00-10:00 AM EST** — Catches both US coasts during work hours
- **Avoid:** Weekends, major holidays, late evenings (after 6 PM EST)
- **Why:** HN traffic peaks during US working hours. Early morning posts have the best chance of reaching the front page during peak traffic.

**Backup plan:** If your post doesn't gain traction in the first hour, you can repost after a week with a different angle or improvements based on feedback.

### What to Have Ready

**Before posting:**

- [ ] **Website is live and fast** — Test on mobile and desktop
- [ ] **Clear value prop above the fold** — Visitor should understand what you do in 3 seconds
- [ ] **Working demo or signup flow** — No broken links
- [ ] **Analytics tracking** — Google Analytics, Plausible, or similar to measure traffic spike
- [ ] **Error monitoring** — Sentry or similar to catch any bugs from increased traffic
- [ ] **Server capacity** — Can your site handle 10,000+ visitors in a few hours?
- [ ] **Email setup** — If you have a signup form, make sure confirmation emails work
- [ ] **Support email ready** — You'll get questions via email, not just comments

**Documentation ready:**
- [ ] **Clear pricing page** — People will ask "how much?"
- [ ] **How it works** — Technical details for engineers who want to understand the system
- [ ] **FAQ** — Answer common objections preemptively
- [ ] **Security/compliance info** — Especially important for payment handling

**Personal readiness:**
- [ ] **Block 3-4 hours** — You need to be present to respond to comments quickly
- [ ] **Have coffee/energy** — You'll be responding to dozens of comments
- [ ] **Prepare your ego** — HN can be brutal. Don't take criticism personally

### How to Respond to Comments

**Do:**
- ✅ **Respond within 10-15 minutes** — Fast responses show you're engaged
- ✅ **Be humble and honest** — "Great point, I hadn't considered that"
- ✅ **Thank people for feedback** — Even critical feedback
- ✅ **Answer technical questions in detail** — HN readers are technical
- ✅ **Admit limitations** — "This doesn't handle X yet, but it's on the roadmap"
- ✅ **Link to relevant docs/code** — Show your work
- ✅ **Update your post** — "Edit: Based on feedback, I've clarified..."

**Don't:**
- ❌ **Argue or get defensive** — You'll look bad
- ❌ **Use marketing speak** — HN hates buzzwords
- ❌ **Ignore criticism** — Acknowledge it, even if you disagree
- ❌ **Delete comments** — You can't anyway, but don't ask mods to
- ❌ **Vote manipulate** — Don't ask friends to upvote
- ❌ **Post multiple links** — One Show HN post at a time

**Example good responses:**
- "That's a really good point about [X]. I hadn't thought about that edge case. I'll add it to the roadmap."
- "You're right that [competitor] does this too. The main difference is [Y]. Happy to clarify if that's not clear on the site."
- "Great question. Here's how we handle [technical concern]: [detailed answer]"

### Common Pitfalls to Avoid

**1. Being too salesy**
- ❌ "Revolutionary AI-powered solution disrupting the payment space"
- ✅ "I built this because I was losing $900/month to failed payments"

**2. Not engaging with comments**
- The post gains traction → you disappear → people think you're not serious
- **Solution:** Block out 3-4 hours to be fully present

**3. Getting defensive about criticism**
- HN users will find flaws. That's the point.
- **Solution:** "Thanks for pointing that out. How would you approach it?"

**4. Unclear value proposition**
- Visitors can't figure out what you do
- **Solution:** Test your homepage on 3 friends first. Can they explain it back to you?

**5. Broken signup flow**
- Traffic spike → you discover bugs in production
- **Solution:** Test every click path before posting

**6. Not having answers ready**
- People ask questions you haven't thought through
- **Solution:** Prepare the Q&A section below

**7. Slow website**
- HN hug of death is real
- **Solution:** Use a CDN, cache aggressively, or use a static landing page

**8. Posting at the wrong time**
- Weekend post → dies in /new
- **Solution:** Tuesday-Thursday, 8-10 AM EST

**9. Not following up**
- People comment days later, you never respond
- **Solution:** Check back for 3-5 days after posting

**10. Giving up too early**
- Post doesn't get traction in first hour → you delete it
- **Solution:** Give it 2-3 hours. Some posts gain momentum slowly.

---

## ANTICIPATED HN QUESTIONS & PREPARED ANSWERS

### Q: "How is this different from Stripe's built-in retry?"

**Answer:**

Stripe's built-in retry logic treats all declines the same way. It uses an exponential backoff strategy regardless of the decline reason.

Revive uses decline-code-specific strategies:

- **Expired cards:** Immediate dunning email + pause retries until customer updates (no point retrying)
- **Insufficient funds:** Retry on typical payday patterns (1st, 15th of month, after weekends)
- **Do not honor / card declined:** Shorter retry intervals with rapid abandonment (usually won't succeed)
- **Temporary issues (rate limits, processing errors):** Aggressive immediate retries

The other big difference is **contextual dunning emails**. Instead of "Your payment failed," we send "Your card ending in 4242 expired on 12/25 — update it here to keep your subscription active."

Stripe gives you the raw tools. Revive adds intelligence on top.

### Q: "Why not just use Churnkey/Baremetrics?"

**Answer:**

Great tools, but different focus:

**Churnkey** is primarily about voluntary churn (cancellation flows, exit surveys, retention offers). They have a payment recovery feature, but it's not their core product.

**Baremetrics** is metrics and analytics with some dunning features. Again, recovery is secondary to their main value prop.

**Revive** is laser-focused on one thing: recovering failed payments. Our entire system is optimized for this:
- Decline-code-specific retry logic
- Timing optimization based on bank processing patterns
- Performance-based pricing (we only make money when you do)

Think of it this way: Churnkey prevents customers from *wanting* to leave. Revive recovers customers who *want* to stay but had a payment hiccup.

You could use both. They're complementary.

### Q: "What's your tech stack?"

**Answer:**

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Radix UI for components

**Backend:**
- Next.js API routes
- PostgreSQL (Supabase)
- Redis (Upstash) for retry queue management
- Stripe API (obviously)

**Infrastructure:**
- Vercel for hosting
- Vercel Cron for scheduled retry jobs
- SendGrid for transactional emails

**Why these choices:**
- Next.js because I wanted SSR for the marketing site and API routes for webhooks in one codebase
- Redis for reliable job queuing (retries need to be bulletproof)
- Supabase because I didn't want to manage Postgres myself
- Vercel because deployment is dead simple and they have cron jobs built in

Nothing fancy. Just solid, proven tools.

### Q: "How do you handle PCI compliance?"

**Answer:**

We **never touch or store card data**. Zero. Nada.

Here's how it works:

1. **We only use Stripe APIs** — All payment data stays within Stripe's PCI-compliant infrastructure
2. **No card data in our database** — We store Stripe customer IDs and subscription IDs (which are fine to store)
3. **Payment updates go through Stripe** — When a customer updates their card, they use Stripe Checkout or Stripe's hosted payment page
4. **We receive webhooks** — Stripe tells us "payment succeeded" or "payment failed" with a decline code

We're PCI-compliant by design because we're not in the payment flow. We're orchestrating *when* Stripe retries and *how* we communicate with customers.

Think of us as Stripe's smart assistant, not a payment processor.

**For compliance nerds:**
- We're PCI DSS Level 4 compliant (least strict tier, because we don't handle card data)
- We use Stripe's webhook signature verification
- All communication with Stripe is over HTTPS with API key authentication
- Customer data is encrypted at rest (Supabase handles this)

### Q: "What's the catch with performance pricing?"

**Answer:**

Fair question. Here's the honest answer:

**The "catch" (if you want to call it that):**

- **We take 25% of recovered revenue** — If we recover a $100 payment, we charge $25
- **Minimum recovered amount:** We only charge on payments over $10 (prevents nickel-and-diming on small transactions)
- **You pay nothing if we recover nothing** — Zero upfront cost, zero monthly fees

**Why this model:**

1. **Aligned incentives** — We only make money when you do. If our system sucks, we make nothing.
2. **No risk for you** — If you have $0 in failed payments this month, you pay $0.
3. **Scales with your business** — Small business with $100/month in failed payments? You pay $25. Growing business with $10K in recoveries? You pay $2,500 (but you made $7,500 you wouldn't have had).

**Why NOT flat monthly pricing:**

- If you're a small SaaS with $50/month in failed payments, a $99/month tool doesn't make sense
- If you're a large SaaS with $50K/month in failed payments, you'd happily pay $12,500 if we recovered it

**The real catch:**

Some businesses prefer predictable costs. If you'd rather pay $199/month flat and keep 100% of recoveries, let me know. I'm considering offering both models.

---

## ADDITIONAL NOTES

### Post-Launch Actions

**First 24 hours:**
- Monitor comments every 15-30 minutes
- Track analytics (traffic, signups, errors)
- Document feedback themes for product roadmap
- Respond to every comment (even "cool!")

**First week:**
- Check back daily for new comments
- Follow up with people who signed up via email
- Write a retrospective blog post about the launch
- Share interesting feedback/discussions on Twitter

**First month:**
- Implement quick wins from HN feedback
- Do a "Show HN Update" post if you made significant changes based on feedback
- Send a "thank you" email to HN signups with updates

### If It Doesn't Go Well

**Post gets < 10 points:**
- Don't panic. Most Show HN posts don't go viral.
- Read all comments carefully. What are people saying?
- Wait 1-2 weeks, improve based on feedback, try again with a different angle

**Post gets flagged:**
- Check if you violated Show HN rules (marketing language, not a real "Show HN", etc.)
- Email hn@ycombinator.com politely asking why
- Fix the issue and repost in a week

**Negative feedback dominates:**
- Don't argue. Listen.
- If multiple people say the same thing, they're probably right.
- Thank people for honest feedback and make changes.

### Success Metrics to Track

- **Upvotes/comments** — Proxy for engagement
- **Traffic spike** — Should see 5K-50K visitors if it goes well
- **Signups** — HN visitors are high-intent. Track conversion rate.
- **Time on site** — Are people actually reading or bouncing?
- **Feedback themes** — What do people keep asking about?
- **Social shares** — Did anyone tweet/share your post?

### Remember

**HN is not your target market.** Engineers on HN are skeptical, critical, and often not your customer. But their feedback is invaluable for:
- Finding bugs and edge cases
- Understanding technical objections
- Refining your messaging
- Building credibility (being on HN front page is social proof)

Don't optimize for HN. Optimize for your actual customers. But use HN as a stress test for your idea, product, and positioning.

---

## REVISION HISTORY

- **v1.0** — Initial draft based on analysis of successful Show HN posts (Craftplan, Ghidra MCP, and others)
- **Research sources:** Live HN Show page data from Feb 5, 2026

---

**Good luck with the launch! 🚀**
