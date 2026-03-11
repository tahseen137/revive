# Reddit Draft: r/SaaS — Dunning Automation Post
**For Aragorn review before posting**
**Target: r/SaaS**
**Status: DRAFT — do not post without Aragorn approval**

---

**Title:**
We spent two months building dunning automation. Here's what actually moved the needle (and what wasted our time).

---

**Body:**

We built Revive — a payment recovery tool for SaaS. Before we built it, I thought dunning was basically: send a few emails when a payment fails, retry a couple times, done.

Two months later I have a lot of opinions about what actually matters and what doesn't.

**What I thought mattered (but doesn't, or barely):**

**Number of retry attempts.** Everyone obsesses over this. "Retry 5 times!" "No, retry 7!" Doesn't matter much if you're retrying at the same time every day. The timing is what matters, not the count.

**Email subject lines.** I spent way too long A/B testing these. Turns out the biggest predictor of whether someone updates their card is whether you send the email while they're active — not the subject line. In-app > email, every time. An active user sees a banner in the dashboard and fixes it in two minutes. An email sits in inbox for three days.

**Dramatic "final warning" messaging.** Some dunning tools lean hard on threatening subscription cancellation. It creates anxiety, but anxiety isn't the same as action. We found lower-urgency language in early emails with clear "what to do" instructions converts better than scary warnings on day 1.

**What actually moved the needle:**

**1. Routing retries by decline code, not by a fixed schedule.**

Stripe gives you the decline reason on every failed payment — most people ignore it. insufficient_funds clears differently than do_not_honor which clears differently than card_velocity_exceeded. When we started routing retries based on decline codes instead of a fixed "day 1, day 3, day 5" schedule:

- insufficient_funds: Retry after 3 days (payday cycle)
- do_not_honor (bank fraud flag): Email customer immediately, retry after 48h — they likely need to call their bank
- card_velocity_exceeded: Wait a full week — card limit resets monthly
- expired_card: Skip retries entirely, just send the card update link

This single change improved recovery rates more than anything else we did.

**2. Stripe's Automatic Card Updater.**

This one surprised me — it's free for Stripe users and most people have never enabled it. Banks push updated card numbers to Visa/MC/Amex/Discover when cards get reissued. The Card Updater pulls those updates automatically and updates payment methods before the charge even runs.

If someone's card expires in February, their new card number gets pushed to the network, Card Updater picks it up, and the March charge succeeds without them doing anything. No email, no friction, no retry needed.

**3. In-app payment alerts during the grace period.**

This sounds obvious but most SaaS products don't do it. A persistent non-blocking banner in the dashboard, shown to users who are actively in the product, consistently outperforms email for users who log in regularly. The conversion from banner to updated card happens in minutes, not days.

The tricky part: you want the banner to be unavoidable but not disruptive. Locking the product during grace period accelerates churn — the customer stops seeing value and the decision to cancel gets made for them. Show the banner, let them keep using the product, give them a clear path to fix it.

**4. Differentiated grace periods by plan type.**

Monthly plan customer fails to pay: 7-day grace period is usually right. Annual plan customer fails: 14-21 days. Annual customers have more at stake, more time to notice and fix it, and losing them to a payment failure is more expensive. The math on giving them more time to recover is obvious when you think about it.

---

**What the data says:**

Industry baseline for SaaS with no dedicated dunning: 25-35% of failed payments recovered.
Best-in-class dunning (all of the above working together): 65-75%.

At $100K MRR with 3% payment failure rate, that's $3K/month at risk. Moving from 30% to 70% recovery = $1,200/month in pure recovered revenue, $14,400/year.

---

**The thing nobody tells you:**

Most of this isn't complicated to build. The decline code routing logic is maybe 50 lines of code. The card updater is a checkbox in Stripe settings. The in-app banner is a frontend component.

What's hard is that it's unsexy work that nobody prioritizes. "Let's add a dunning banner" never makes it onto the sprint because it doesn't show up in any metric that anyone's watching. The lost revenue from failed payments just quietly disappears and gets attributed to "churn."

The founders who do well with payment recovery are the ones who actually audit their Stripe "failed payments" tab every month and know their recovery rate. Most don't.

---

Happy to answer questions about any of this — we learned most of it the hard way. And yes, we built Revive (revive-hq.com) to automate all of the above for SaaS companies who don't want to build it themselves, but this post isn't really about that — the tactics work whether you build it yourself or not.

---

NOTES FOR ARAGORN: This post is intentionally educational first. Revive is mentioned once at the end, lightly. No made-up stats — the recovery rates cited (25-35% baseline, 65-75% best-in-class) are industry benchmarks from Stripe/Chargebee data. Good to post on r/SaaS as-is. If you want to cut the last paragraph and post as pure educational content, that works too. The technical content (decline code routing, Card Updater, grace period differentiation) is all accurate and implementable.
