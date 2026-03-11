# Revive Pricing Strategy Audit — March 2026

**Task:** `revive-pricing-audit` (P1)  
**Date:** March 11, 2026  
**Status:** ⚠️ Critical competitive threats identified  

---

## Executive Summary

Revive's current pricing ($0 → $49/mo flat) is **competitively positioned against established players** (Churnkey, Stunning, Churn Buster) but faces **two critical threats**:

1. **MRRSaver** launched in 2026 offering **100% free** failed payment recovery, cancel flows, AND win-back campaigns (everything Revive offers)
2. **MRRX** launched with aggressive $79/mo entry tier and **0% revenue share**, positioning explicitly against "enterprise tools"

**Recommendation:** Revive needs to **differentiate on value, not just price**. The $49 flat tier is good, but we're now competing in a race-to-the-bottom market where "free" is becoming table stakes.

### Key Findings

| Metric | Current State | Competitive Threat | Recommendation |
|--------|---------------|-------------------|----------------|
| **Free tier** | Up to $500/mo recovered | MRRSaver: Unlimited free | Add value moat (AI features, analytics) |
| **Paid tier** | $49/mo flat (1 tier) | MRRX: $79/$149/$399 (3 tiers) | Consider tiered pricing for scale |
| **Value prop** | "Flat pricing, no revenue share" | 5+ competitors say the same | Differentiate on **payday detection + AI** |
| **Positioning** | "ChurnKey alternative" | MRRSaver: "100% free" | Reframe as "Recovery + Intelligence" |

---

## 1. Current Pricing Analysis

### Revive's Pricing Structure (As of March 2026)

| Tier | Price | Key Features | Target Segment |
|------|-------|--------------|----------------|
| **Free** | $0/mo | Up to $500/mo recovered, smart retries, basic dunning | Early-stage SaaS (<$10K MRR) |
| **Indie** | $49/mo | Unlimited recovery, AI retry optimization, custom dunning, win-back campaigns, analytics | Bootstrap/indie SaaS ($10K-$100K MRR) |
| **Scale** | Custom | Everything + volume discounts, account manager, custom strategies | Growth SaaS ($100K+ MRR) |

**Strengths:**
- ✅ Clear value jump from Free → Indie ($500 recovered limit creates urgency)
- ✅ $49 is significantly cheaper than Churnkey ($250), Churn Buster ($249), Stunning ($120+)
- ✅ No revenue share (unlike ProfitWell Retain, potentially Butter)
- ✅ Simple, transparent pricing (no hidden fees, no churn volume scaling)

**Weaknesses:**
- ❌ Only one substantive paid tier (Indie) — no room for customers to grow
- ❌ "Custom" pricing on Scale tier lacks specificity (unclear value)
- ❌ Free tier may cannibalize paid conversions if $500/mo is sufficient for many customers
- ❌ No usage-based or volume-based pricing for mid-market ($50K-$500K MRR)

---

## 2. Competitive Landscape — 2026 Update

### Tier 1: FREE Competitors (🚨 High Threat)

#### **MRRSaver** (Launched 2026) — 🔴 CRITICAL THREAT
- **Pricing:** **100% FREE** (beta, first 100 early adopters)
- **Features:** Failed payment recovery + cancel flows + win-back campaigns
- **Positioning:** "100% free · No credit card · 5-minute setup"
- **Integration:** Stripe (read-only OAuth)
- **Threat Level:** 🔴 **EXTREME** — Offers EVERYTHING Revive offers for $0

**Why this matters:**  
MRRSaver is not just offering "basic" recovery for free — they're offering the full stack (recovery + cancel flows + win-back) with zero pricing friction. If they successfully onboard 100+ companies and prove the model works, they will either:
1. Remain free (investor-funded land-grab), or
2. Convert to paid with massive user base advantage

**Revive's Response:**  
Cannot compete on price. Must differentiate on **intelligence** (payday detection, AI retry optimization), **analytics depth**, and **results** (prove 22% higher recovery rate).

---

#### **MRRX** (Launched 2026) — 🟡 MODERATE THREAT
- **Pricing:** $79/mo (Starter) → $149/mo (Growth) → $399/mo (Scale)
- **Model:** Flat monthly, **0% revenue share** (positioning against 5-25% enterprise tools)
- **Features:** Session-based pricing (350/2,000/5,000+ sessions), A/B testing, webhooks, white-label
- **Integration:** Stripe native
- **Threat Level:** 🟡 **MODERATE** — More expensive than Revive but multi-tier structure

**Why this matters:**  
MRRX's 3-tier structure provides clear upgrade path. Customers can start at $79 (close to Revive's $49) and scale to $399 without "custom" ambiguity. Their "0% revenue share" messaging is identical to Revive's — not differentiated.

**Revive's Response:**  
If Revive adds tiers, match the $79/$149/$399 structure or go slightly lower ($49/$99/$249). Emphasize **payday detection** as unique moat.

---

### Tier 2: Established Mid-Market (🟢 Revive is Competitively Priced)

#### **Churnkey** — $250/$700/$825/mo (annual)
- **Pricing:** Scales with churn volume (base $250/mo for <$5K churn, $700-$825 for $20K churn)
- **Features:** Cancel flows + payment recovery + A/B testing + AI (Intelligence tier)
- **Positioning:** Full retention platform (voluntary + involuntary churn)
- **Threat Level:** 🟢 **LOW** — Too expensive for indie/bootstrap segment

**Revive Advantage:** 5-17x cheaper for same core recovery features.

---

#### **Churn Buster** — $249/mo starting
- **Pricing:** $249/mo for full retention (dunning + cancel flows); dunning-only cheaper (not listed)
- **Features:** Expert-guided, transparent attribution, Measure analytics (free)
- **Positioning:** Data-driven, anti-black-box, eCommerce-focused (Shopify/Recharge)
- **Threat Level:** 🟢 **LOW** — High-touch model, not self-serve

**Revive Advantage:** 5x cheaper, fully self-serve.

---

#### **Stunning** — $50-$500/mo (MRR-based)
- **Pricing:** ~$120/mo at $40K MRR (flat, MRR-scaled)
- **Features:** 28+ features (SMS, in-app bar, pre-dunning, backup payment methods)
- **Positioning:** Most comprehensive dunning tool, 14+ years in market
- **Threat Level:** 🟡 **MODERATE** — Similar price point at scale, but dated UX

**Revive Advantage:** Modern UX, AI optimization, payday detection. At $40K MRR, Revive is $49 vs Stunning's $120 (2.4x cheaper).

---

#### **ProfitWell Retain (Paddle)** — $500/mo starting (or performance-based)
- **Pricing:** $500/mo flat for smaller companies, custom performance-based for larger
- **Features:** Bundled with Paddle MoR (5% + $0.50 per transaction)
- **Positioning:** Paddle ecosystem lock-in
- **Threat Level:** 🟢 **LOW** — Requires Paddle commitment

**Revive Advantage:** Stripe-native, 10x cheaper.

---

#### **Baremetrics Recover** — $75-$4,999/mo (requires full platform)
- **Pricing:** Recover is add-on; Baremetrics starts at $75/mo (Launch), scales to $499+ for Recover
- **Features:** Dunning + in-app paywalls, bundled with analytics
- **Positioning:** Analytics-first, recovery secondary
- **Threat Level:** 🟢 **LOW** — Can't buy Recover standalone

**Revive Advantage:** Recovery-first, no analytics tax.

---

### Tier 3: Enterprise / Human-Powered (Not Direct Competitors)

#### **Butter Payments** — Custom (revenue share, min $1M ARR)
- **Target:** Enterprise ($100M+ ARR)
- **Threat Level:** 🟢 **NONE** — Different market

#### **Gravy Solutions** — Custom (human-powered)
- **Target:** Course creators, subscription boxes
- **Threat Level:** 🟢 **NONE** — Human touch, expensive

---

## 3. Pricing Gap Analysis

### What Revive Offers That Competitors Don't

| Feature | Revive | Churnkey | Stunning | MRRX | MRRSaver | Competitive Moat |
|---------|--------|----------|----------|------|----------|------------------|
| **Payday detection** (1st, 15th, Fridays) | ✅ | ❌ | ❌ | ❌ | ❌ | 🔥 **UNIQUE** |
| **AI retry optimization** | ✅ | ✅ (Intelligence) | ❌ | ? | ? | ⚡ Moderate |
| **Free tier** | ✅ ($500) | ❌ | ❌ | ❌ | ✅ (unlimited) | ❌ Commoditized |
| **Flat pricing (no revenue share)** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ Table stakes |
| **Win-back campaigns** | ✅ | ❌ | ❌ | ? | ✅ | ⚡ Moderate |

**Key Insight:**  
**Payday detection is Revive's ONLY defensible moat.** Everything else is either:
- Matched by competitors (flat pricing, AI, free tier), or
- Not visible enough to buyers (retry logic sophistication)

---

### What Competitors Have That Revive Lacks

| Gap | Who Has It | Impact | Build Effort |
|-----|------------|--------|-------------|
| **Multi-tier paid pricing** | MRRX (3 tiers), Churnkey (4 tiers) | High — customers need upgrade path | Low (pricing change) |
| **SMS dunning** | Stunning | Medium — 3-5x open rate vs email | Medium (Twilio integration) |
| **In-app notifications** | Stunning, Baremetrics | Medium — catches active users | Medium (JS widget) |
| **Card update pages** | Stunning, Baremetrics | Medium — needed when retries fail | Medium (hosted page) |
| **Cancel flows** | Churnkey, Churn Buster, MRRX | High — addresses voluntary churn | High (UI builder) |
| **Free analytics tier** | Churn Buster (Measure) | High — lead gen + moat | Medium (passive tracking) |
| **A/B testing** | Churnkey, MRRX, Churn Buster | Medium — data-driven optimization | Medium-High |

---

## 4. Pricing Recommendations

### Option A: Multi-Tier Structure (RECOMMENDED)

Introduce **3 clear paid tiers** to provide upgrade path and capture more value from larger customers.

| Tier | Price | Monthly Recovery Limit | Key Features | Target Segment |
|------|-------|----------------------|--------------|----------------|
| **Free** | $0 | Up to $500/mo recovered | Smart retries, basic dunning (4 emails), dashboard | Validation stage (<$5K MRR) |
| **Starter** | **$49/mo** | Up to $5K/mo recovered | Free + AI retry optimization, custom dunning (8 emails), win-back campaigns, Slack notifications | Early-stage ($5K-$50K MRR) |
| **Growth** | **$149/mo** | Up to $20K/mo recovered | Starter + SMS dunning, in-app notifications, A/B testing, card update pages, analytics dashboard | Scaling ($50K-$250K MRR) |
| **Scale** | **$399/mo** | Unlimited | Growth + dedicated account manager, custom retry strategies, white-label, SLA, priority support | Established ($250K+ MRR) |

**Why this works:**
- ✅ Matches MRRX pricing structure ($79/$149/$399) but undercuts at entry ($49 vs $79)
- ✅ Provides clear upgrade triggers (recovery volume limits)
- ✅ Captures more value from growth customers ($149 vs flat $49)
- ✅ "Scale" tier is specific and valuable (vs vague "Custom")
- ✅ Still cheaper than Churnkey/Churn Buster at every tier

**Revenue Impact:**
- Current: 100 customers at $49/mo = **$4,900/mo** ($58.8K/yr)
- Multi-tier: 60 at $49, 30 at $149, 10 at $399 = **$10,410/mo** ($124.9K/yr) — **2.1x revenue increase**

---

### Option B: Usage-Based Pricing (NOT RECOMMENDED)

Charge based on recovered revenue (e.g., 15% of recovery, free up to $500).

**Why NOT:**
- ❌ Aligns with traditional dunning tools (Butter, ProfitWell) but NOT indie SaaS preference
- ❌ Opaque costs — customers can't predict monthly bill
- ❌ Misaligned incentives — Revive benefits when customers churn more
- ❌ MRRSaver and MRRX are winning with **flat pricing transparency**

---

### Option C: Hybrid Model (CONDITIONAL)

Keep flat tiers for most customers, add **performance-based option** for late-stage validation.

**Example:**
- Free, Starter ($49), Growth ($149), Scale ($399) — **OR**
- **Performance tier:** 10% of recovered revenue, no monthly fee

**When this works:**
- Customer is skeptical of ROI
- Customer has massive churn volume (>$50K/mo failing)
- Customer wants zero upfront commitment

**Why use sparingly:**
- Performance pricing creates support burden (attribution questions, invoice disputes)
- Most customers prefer predictable costs

---

## 5. Competitive Positioning Strategy

### Against MRRSaver (100% Free Threat)

**Revive's Pitch:**
> "MRRSaver is free because they're in beta, fundraising, or don't have a business model yet. Revive is **$49/mo because we're profitable, sustainable, and focused on results** — not exit strategies.  
>   
> Free tools disappear. Paid tools improve. Our **payday detection** recovers 22% more than generic retries. That's an extra **$400-$1,200/mo** for most SaaS businesses.  
>   
> **Would you rather save $49/mo or recover $1,000 more?**"

**Strategy:**
- Emphasize **sustainability** (free tools shut down)
- Emphasize **performance** (22% higher recovery rate)
- Introduce **Starter tier recovery limit** ($5K/mo) to make "unlimited" valuable
- Build **free analytics dashboard** (passive tracking, like Churn Buster's Measure) as lead gen

---

### Against MRRX ($79/mo Entry)

**Revive's Pitch:**
> "MRRX charges $79/mo for the basics. Revive gives you **AI retry optimization, win-back campaigns, and payday detection** for $49.  
>   
> Same zero revenue share, same Stripe integration, **better intelligence**. Why pay more for less?"

**Strategy:**
- Undercut at entry tier ($49 vs $79)
- Match at growth tier ($149)
- Emphasize **payday detection** as unique
- If MRRX has better A/B testing or analytics, acknowledge gap and **roadmap it publicly**

---

### Against Churnkey/Churn Buster ($250/mo)

**Revive's Pitch (Unchanged):**
> "Same smart retries, 1/5th the price. Pay only when we recover."

**Strategy:**
- Continue **comparison pages** (`/vs/churnkey`, `/vs/churnbuster`)
- Highlight **indie SaaS focus** (Churnkey is mid-market overkill)
- Add **Growth tier** to capture customers who might otherwise choose Churnkey

---

## 6. Feature Roadmap to Support Pricing

To justify **$149 Growth tier** and **$399 Scale tier**, Revive needs feature parity with competitors at those price points.

### Phase 1: Starter Tier Justification (Q2 2026)
**Goal:** Make $49/mo a no-brainer vs $79 MRRX.

| Priority | Feature | Effort | Justification |
|----------|---------|--------|---------------|
| P0 | **More email templates** (8-10 total) | 1 week | 4 is too few; Baremetrics has 10+, Stunning has 12+ |
| P0 | **Slack notifications** | 3 days | MRRX and Churnkey have this; table stakes |
| P0 | **Webhook notifications** | 1 week | Developers expect event-driven integrations |
| P1 | **Weekly recovery reports** (email) | 3 days | Keep users engaged; prove ongoing value |

---

### Phase 2: Growth Tier Justification ($149/mo) (Q3 2026)
**Goal:** Provide features competitors charge $250-$400/mo for.

| Priority | Feature | Effort | Justification |
|----------|---------|--------|---------------|
| P0 | **Recovery analytics dashboard** | 2-3 weeks | Can't sell without showing ROI; every competitor has this |
| P0 | **SMS dunning** (Twilio) | 2-3 weeks | Stunning's killer feature; 3-5x email open rate |
| P0 | **Card update pages** (hosted) | 1-2 weeks | When retries fail, customers need easy update flow |
| P1 | **In-app notification widget** (JS snippet) | 2-3 weeks | Baremetrics and Stunning have this; catches active users |
| P1 | **A/B testing** (retry strategies) | 3-4 weeks | Churnkey's differentiator; data-driven optimization |

---

### Phase 3: Scale Tier Justification ($399/mo) (Q4 2026)
**Goal:** Enterprise-grade features for high-volume customers.

| Priority | Feature | Effort | Justification |
|----------|---------|--------|---------------|
| P1 | **Customer segmentation** | 2-3 weeks | Treat $10/mo and $500/mo customers differently |
| P1 | **White-label** (custom branding) | 2-3 weeks | Enterprise customers want brand consistency |
| P2 | **Custom retry strategies** (per-customer) | 2-3 weeks | Account manager builds bespoke retry logic |
| P2 | **SLA guarantees** (99.9% uptime) | 1 week | Enterprise requirement |
| P2 | **Multi-processor support** (Braintree) | 4-6 weeks | Expands addressable market |

---

## 7. Migration Plan (If Multi-Tier Adopted)

### Grandfathering Existing Customers

**Current customers on "Indie" $49/mo:**
- **Option 1 (Generous):** Grandfather at $49/mo **forever** with Growth tier features (goodwill, retention)
- **Option 2 (Balanced):** Grandfather for **12 months**, then migrate to Growth ($149) or cap at $5K/mo recovery
- **Option 3 (Aggressive):** Immediate migration to Starter ($49, capped) or Growth ($149, unlimited)

**Recommendation:** **Option 1 for first 100 customers**, **Option 2 for next 500**, **Option 3 for all new signups**.

---

### Pricing Page Messaging

**Before (Current):**
> "The full churn recovery stack for $49. No revenue tax, no setup fees."

**After (Multi-Tier):**
> "**Starter:** AI-powered recovery for $49/mo. Unlimited recovery up to $5K/mo.  
> **Growth:** Full retention suite for $149/mo. SMS, A/B testing, analytics. Unlimited recovery.  
> **Scale:** White-label + dedicated support for $399/mo. For teams recovering $20K+/mo."

---

## 8. Market Positioning by Tier

| Competitor | Price | Revive Equivalent | Positioning |
|------------|-------|-------------------|-------------|
| **MRRSaver** (free beta) | $0 | Free (up to $500) | "Free tools shut down. Paid tools improve. Our payday detection recovers 22% more." |
| **MRRX Starter** | $79/mo | Starter ($49) | "Same zero revenue share, better intelligence, $30/mo cheaper." |
| **Stunning** (at $40K MRR) | $120/mo | Growth ($149) | "Modern UI, AI optimization, SMS dunning. Only $29/mo more for 5x the features." |
| **Churnkey Core** | $700/mo | Growth ($149) | "5x cheaper, same recovery power. No churn volume fees." |
| **Churn Buster** | $249/mo | Growth ($149) | "Data-driven recovery, self-serve, 40% cheaper." |

---

## 9. Financial Projections (Multi-Tier Model)

### Assumptions
- **Current:** 100 customers at $49/mo (hypothetical)
- **After multi-tier:** Customer distribution shifts based on recovery volume

| Tier | Customers | % Split | Monthly Revenue | Annual Revenue |
|------|-----------|---------|-----------------|----------------|
| Free | 200 | — | $0 | $0 |
| Starter ($49) | 150 | 50% of paid | $7,350 | $88,200 |
| Growth ($149) | 100 | 33% of paid | $14,900 | $178,800 |
| Scale ($399) | 50 | 17% of paid | $19,950 | $239,400 |
| **TOTAL** | 500 | — | **$42,200/mo** | **$506,400/yr** |

**vs. Single-Tier ($49):**
- 300 paid customers at $49 = $14,700/mo ($176,400/yr)
- **Multi-tier = 2.9x revenue** at same paid customer count

---

## 10. Final Recommendations

### Immediate Actions (March 2026)

1. **Adopt Multi-Tier Pricing (Option A)** — Free/$49/$149/$399 structure
   - ✅ Matches market (MRRX, Churnkey structure)
   - ✅ Captures more value from growth customers
   - ✅ Still undercuts at every tier

2. **Build Recovery Limits into Starter Tier** — Cap at $5K/mo recovered
   - Creates urgency to upgrade
   - Makes "unlimited" valuable in Growth tier

3. **Grandfather First 100 Customers** — Lock them at $49/mo with Growth features
   - Builds loyalty and goodwill
   - Creates advocates and case studies

4. **Ship Phase 1 Features** (Slack, webhooks, more templates, weekly reports)
   - Justifies Starter tier value vs MRRX
   - Table stakes for 2026

5. **Roadmap Phase 2 Publicly** — Recovery dashboard, SMS, card update pages
   - Shows commitment to Growth tier
   - Builds anticipation for upgrades

---

### Positioning Pivot (March 2026)

**From:**
> "The ChurnKey alternative — same smart recovery, 1/10th the price."

**To:**
> "**Revive: The AI-powered churn recovery platform for SaaS.**  
> Payday detection + smart retries + win-back campaigns.  
> Start free. Scale when it works. No revenue share, ever."

**Why:**
- Emphasizes **intelligence** (AI, payday detection) over price
- Frames Revive as a **platform**, not just a tool
- De-emphasizes "alternative" framing (positions as category leader)

---

### Competitive Moat Strategy

**Payday detection is the moat.** Double down:
- **Content:** "Why Retrying Failed Payments on Fridays Recovers 40% More Revenue" (viral potential)
- **Data:** Publish recovery rate comparisons (Revive vs Stripe Smart Retries vs generic dunning)
- **Marketing:** "The only recovery tool that knows when your customers get paid"

If MRRSaver or MRRX copy payday detection (likely within 6-12 months), Revive needs **next-level differentiation**:
- **Predictive churn scoring** (ML model trained on recovery data)
- **Customer health dashboard** (LTV, churn risk, recovery potential)
- **Revenue intelligence** (not just recovery, but *insights*)

---

## 11. Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| **MRRSaver stays free, captures market** | Medium | High | Emphasize sustainability, performance, support |
| **Existing customers churn on price increase** | Low | Medium | Grandfather first 100; grandfather others for 12mo |
| **MRRX adds payday detection** | High | Medium | Already building next moat (predictive churn, health scoring) |
| **Growth tier ($149) doesn't convert** | Medium | High | Ship Phase 2 features (dashboard, SMS, A/B testing) ASAP |
| **Churnkey drops price to compete** | Low | Low | They're mid-market; won't go below $250 |

---

## 12. Success Metrics (90-Day Checkpoint)

Track these metrics after implementing multi-tier pricing:

| Metric | Baseline | Target (90 days) | How to Measure |
|--------|----------|------------------|----------------|
| **Average revenue per customer** | $49/mo | $85/mo | Total MRR / paid customers |
| **Free → Starter conversion** | TBD | 20% | Customers exceeding $500/mo → upgrade |
| **Starter → Growth conversion** | TBD | 15% | Customers exceeding $5K/mo → upgrade |
| **Churn rate (paid)** | TBD | <3%/mo | Cancellations / paid base |
| **CAC payback period** | TBD | <3 months | CAC / ARPU |

---

## Conclusion

Revive's current $49 flat pricing is **competitively strong against established players** (Churnkey, Stunning, Churn Buster) but faces **existential threats** from new entrants (MRRSaver's free model, MRRX's tiered structure).

**The path forward:**
1. **Adopt multi-tier pricing** (Free/$49/$149/$399) to capture more value and provide upgrade path
2. **Differentiate on intelligence**, not price (payday detection, AI optimization, predictive churn)
3. **Ship critical features** (analytics dashboard, SMS, A/B testing) to justify Growth tier
4. **Reframe positioning** from "cheap alternative" to "AI-powered recovery platform"

**Timeline:**
- **Week 1:** Finalize pricing tiers, update website, announce to existing customers
- **Month 1-2:** Ship Phase 1 features (Slack, webhooks, templates, reports)
- **Month 3-6:** Ship Phase 2 features (dashboard, SMS, card updates, in-app notifications, A/B testing)
- **Month 6-12:** Ship Phase 3 features (segmentation, white-label, multi-processor)

**Bottom line:**  
The $49/mo single tier worked in a less competitive market. In 2026, with MRRSaver offering unlimited free and MRRX offering 3-tier structure, **Revive needs to evolve or risk commoditization.**

Multi-tier pricing + intelligent differentiation + feature velocity = sustainable moat.

---

**Next Steps:**
1. Review this audit with Aragorn
2. Decide on multi-tier adoption (vs status quo)
3. If approved: update pricing page, notify customers, roadmap Phase 1 features
4. Mark task complete

**Task Completion Command:**
```bash
node /Users/clawdbot/.openclaw/workspace/tools/task-registry/manage.mjs done --label revive-pricing-audit
```
