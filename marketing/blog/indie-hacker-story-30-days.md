# 2 Products, 30 Days, 0 Users to Launch: What I Learned Building with an AI Co-Founder

**TL;DR:** I built two SaaS products in 30 days with an AI co-founder (Claude). Revive (payment recovery) launched on Product Hunt, Rewardly (referral incentives) hit production. Zero users to public launch. Here's what worked, what broke, and what I'd do differently.

---

## The Setup

**Feb 1, 2026:** I had two ideas and zero users.

- **Revive:** Recover failed SaaS payments automatically (ChurnKey competitor, but $49/mo vs $250+/mo)
- **Rewardly:** Gamified referral incentives for SaaS (think Duolingo streaks, but for referrals)

One developer (me), one AI co-founder (Claude Opus), 30 days to ship both.

**The plan:** Build in parallel. Use AI for 80% of execution. Launch Revive first (clearer PMF signal), then Rewardly.

## Week 1: Infrastructure & Foundation (Feb 1-7)

### Revive: The Tech Stack
- **Frontend:** Next.js 14 (App Router)
- **Backend:** Convex (realtime database + functions)
- **Auth:** Convex auth with Stripe Connect OAuth
- **Payments:** Stripe for billing, connected accounts for customer payment data
- **Hosting:** Vercel
- **AI Agent:** Claude Opus (via OpenClaw) for all coding

**What worked:**
- Convex is insanely fast for prototyping. No API routes, no database migrations—just write TypeScript functions and they're deployed.
- Stripe Connect OAuth gave us secure access to failed payments without ever seeing card data.
- Claude wrote ~90% of the initial codebase in 3 days. I reviewed, tested, and iterated.

**What broke:**
- Convex auth expired silently mid-week. Lost 4 hours debugging "why won't it connect?" before realizing I needed to re-auth.
- Stripe webhook verification failed locally. Spent 2 hours on this before using Stripe CLI for testing.

### Rewardly: The Architecture
Same stack (Next.js + Convex + Vercel), but:
- **Gamification engine:** Custom streak tracking, XP system, milestone rewards
- **Integrations:** Stripe for payouts, webhooks for referral tracking
- **Challenge:** Building referral attribution that works across multiple signup flows (email, social, direct)

**Key decision:** Ship Revive first, keep Rewardly in parallel development but don't launch until Revive has traction.

## Week 2: Building Core Features (Feb 8-14)

### Revive: Payment Recovery Engine
Features shipped:
- ✅ Smart retry logic (AI determines best retry time based on card type, failure reason)
- ✅ Dunning email sequences (3 templates: polite → urgent → win-back)
- ✅ Dashboard with real-time recovery metrics
- ✅ Stripe + Lemon Squeezy integrations

**The first "holy shit" moment:**
Connected my own Stripe account (I run a micro-SaaS with ~$2K MRR). Revive found $180 in failed payments from the past 30 days. Recovered $120 in 48 hours.

**Lesson learned:** Dogfooding immediately validates (or destroys) your idea. If you're building for "others" but won't use it yourself, rethink.

### Rewardly: Gamification Mechanics
Features shipped:
- ✅ Streak tracking (daily login, referral activity)
- ✅ XP system (points for actions: invite sent, signup, first purchase)
- ✅ Milestone rewards (5 referrals = $25, 10 = $50, 50 = $500)
- ✅ Leaderboard (public + private modes)

**Challenge:** Preventing abuse. Fake signups, self-referrals, bot farms. Spent 2 days building:
- Email verification required for referral credit
- Payment required for high-tier rewards
- Rate limits on invite sending
- IP + device fingerprinting for suspicious patterns

**Lesson:** Gamification attracts gamers. If there's a loophole, someone will exploit it. Build abuse prevention from day one.

## Week 3: Polish & Pre-Launch (Feb 15-21)

### Revive: The Landing Page Gauntlet
Iterated through 7 landing page versions. Tested:
- Hero copy (tested 4 variations)
- Pricing presentation (comparison tables, ROI calculators)
- Social proof (used generic founder testimonials since we had zero users)

**What converted best:**
- **Hero:** "Free until it's paying for itself" (beats generic "Stop losing revenue")
- **Pricing:** Interactive ROI calculator with slider (ChurnKey-style)
- **Comparison table:** Revive $49 vs ChurnKey $250 vs Chargebee $849
- **Trust signals:** Payment platform logos (Stripe, Lemon Squeezy, Paddle) + security badges

**A/B test results (via landing page tool):**
- Interactive calculator: +37% time on page
- Competitor comparison: +22% scroll depth
- "Pay for itself" messaging: +18% CTA clicks

### Rewardly: The Beta Problem
No users = no feedback. Built what I *thought* SaaS founders needed:
- Streaks (because Duolingo?)
- XP (because gamification!)
- Leaderboards (because competition!)

**Reality check:** Asked 5 founder friends for feedback. 4 out of 5 said: *"Cool, but I don't need this yet. Maybe when I have 1K+ users."*

**Lesson:** Built a vitamin, not a painkiller. Referral incentives are nice-to-have for small SaaS. Payment recovery (Revive) is a must-have. Pivot attention accordingly.

## Week 4: Launch & First Users (Feb 22-28)

### Revive: Product Hunt Launch
**Launch day:** Feb 25, 2026

**Pre-launch prep:**
- Posted teaser on Twitter (150 followers) → 23 likes, 4 replies
- Shared in 3 Slack communities (IndieHackers, MicroConf, SaaS Growth) → 12 DMs asking for early access
- Set up Product Hunt page with 5 screenshots, demo video, and comparison table

**Launch results (first 24 hours):**
- 🎯 #4 Product of the Day
- 📊 127 upvotes
- 💬 18 comments
- 🔗 2,400 website visits
- 📧 47 email signups
- 💳 3 paid conversions ($49 Indie plan × 3 = $147 MRR)

**Unexpected wins:**
- One comment: *"Finally, a ChurnKey alternative that doesn't cost $500/mo."* → Got 8 upvotes, drove 40% of our signups
- Someone compared us to Churn Buster favorably → Free validation

**Mistakes:**
- Didn't prepare a "hunter" (someone with PH clout to post it). Self-launched, which limited reach.
- Dashboard had a bug that showed "$0 recovered" even when retries were working. Fixed in 2 hours but scared 2 signups away.

### Rewardly: Soft Launch
Didn't do a full launch. Instead:
- Posted on Twitter: "Built a gamified referral tool. DM if you want early access."
- Got 6 DMs, 2 tried it, 1 said "I'll use this when I have more users"

**Status:** Keeping Rewardly live but not actively marketing. Focusing 90% on Revive (clearer PMF).

## The Numbers (30 Days In)

### Revive
- 💰 **MRR:** $147 (3 paying customers @ $49/mo)
- 📈 **Signups:** 47 (14% conversion to paid)
- 🔄 **Revenue recovered (for customers):** $1,240
- ⏱️ **Time spent:** ~80 hours (me) + ~40 hours (AI agent)
- 💸 **Cost to build:** $0 (used free tiers for everything except domain: $12)

### Rewardly
- 💰 **MRR:** $0
- 📈 **Signups:** 8 (beta invites only)
- ⏱️ **Time spent:** ~50 hours (me) + ~30 hours (AI agent)
- 💸 **Cost to build:** $0

**Combined:**
- **Total time:** ~200 hours (120 human + 80 AI)
- **Total cost:** $12 (domain)
- **Revenue:** $147 MRR

## What I Learned

### 1. AI is 10x for execution, not strategy
Claude wrote 90% of the code, but I made every product decision. AI is incredible for:
- ✅ Boilerplate (auth, CRUD, API integrations)
- ✅ Debugging (paste error, get fix)
- ✅ Iteration speed (change UI, rebuild landing page in 10 min)

AI is terrible for:
- ❌ Product strategy ("What should I build?")
- ❌ Prioritization ("What matters most?")
- ❌ Market validation ("Will anyone pay for this?")

**Lesson:** AI is a junior developer, not a co-founder. You still need to think.

### 2. Dogfooding = fastest validation
Revive worked because I needed it. Rewardly didn't because I didn't.

**Rule:** If you won't pay $49/mo for your own product, neither will customers.

### 3. Launch before you're ready
Revive had bugs on launch day. Dashboard broke, emails had typos, pricing page had a missing link.

**Result:** 3 paid customers anyway.

**Lesson:** Perfect is the enemy of shipped. Most "deal-breaker" bugs aren't.

### 4. Distribution > Building
Revive took 3 weeks to build, 1 day to launch, and will take months to get to $10K MRR.

**New time allocation:**
- 20% building
- 80% distribution (content, SEO, outreach, partnerships)

**Lesson:** The best product with zero distribution loses to a mediocre product with great distribution.

### 5. Pick one winner
I built two products in 30 days. Revive has traction, Rewardly doesn't.

**Decision:** Going all-in on Revive. Rewardly stays live but no active marketing until Revive hits $5K MRR.

**Lesson:** Parallel projects split your focus. One great product beats two okay products.

## What's Next

### Revive Roadmap (Next 30 Days)
- 🎯 **Goal:** $1K MRR (20 customers @ $49/mo)
- 📝 **Content:** 2 blog posts/week (SEO for "Stripe dunning," "payment recovery," "ChurnKey alternative")
- 🔗 **Outreach:** Cold email 100 SaaS founders with <$50K MRR
- 🛠️ **Features:** Paddle integration, SMS dunning, Zapier integration

### Rewardly Status
- Keeping it live at rewardly.co
- No active marketing
- Will revisit if a customer asks for it

## Ask Me Anything

I'm building in public. Happy to answer questions about:
- Building with AI agents (Claude, OpenClaw)
- Stripe payment integrations
- Convex vs Firebase/Supabase
- Product Hunt launch strategy
- 0-to-launch timelines

**Find me:**
- Twitter: [@tahseen137](https://twitter.com/tahseen137)
- Email: aragorn@revive-hq.com
- Revive: [revive-hq.com](https://revive-hq.com)

---

**Feb 28, 2026**  
*Written by Aragorn, founder of Revive. Built with an AI co-founder in 30 days. Currently at $147 MRR, aiming for $10K MRR by Q2.*
