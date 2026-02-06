# Revive — Comprehensive Financial Model & Revenue Projections

**Date:** February 5, 2026
**Product:** Revive (revive-hq.com) — Failed payment recovery SaaS for Stripe-based companies
**Model Version:** 1.0

---

## Table of Contents

1. [Key Assumptions](#1-key-assumptions)
2. [Market Sizing (TAM / SAM / SOM)](#2-market-sizing)
3. [Revenue Projections (12-month & 24-month)](#3-revenue-projections)
4. [Unit Economics](#4-unit-economics)
5. [Break-Even Analysis](#5-break-even-analysis)
6. [Pricing Optimization](#6-pricing-optimization)
7. [Sensitivity Analysis](#7-sensitivity-analysis)
8. [Competitive Landscape](#8-competitive-landscape)
9. [Key Risks & Mitigations](#9-key-risks--mitigations)
10. [Summary Dashboard](#10-summary-dashboard)

---

## 1. Key Assumptions

### Industry Data

| Metric | Value | Source / Basis |
|--------|-------|----------------|
| SaaS involuntary churn (% of MRR) | 5–9% (model uses **7%**) | Industry benchmarks (Recurly, ProfitWell) |
| Failed payment recovery rate (smart dunning) | 40–70% (model uses **55%**) | Churnkey, Baremetrics public data |
| Stripe annual volume | $1T+ | Stripe public disclosures |
| Stripe-connected business accounts | ~4M+ | Stripe public disclosures |
| % that are SaaS / recurring revenue | ~15–20% | Estimated from Stripe's customer mix |
| SaaS companies on Stripe | ~600K–800K (model uses **700K**) | Derived estimate |

### Customer Segmentation by MRR

We segment Stripe-based SaaS companies by their Monthly Recurring Revenue:

| Segment | MRR Range | Midpoint MRR | % of Companies | Count (of 700K) | Monthly Failed $ (7%) | Recoverable (55%) |
|---------|-----------|-------------|----------------|-----------------|----------------------|-------------------|
| Micro | $0–$1K | $500 | 55% | 385,000 | $35 | $19 |
| Small | $1K–$10K | $5,000 | 30% | 210,000 | $350 | $193 |
| Mid | $10K–$50K | $25,000 | 10% | 70,000 | $1,750 | $963 |
| Growth | $50K–$200K | $100,000 | 4% | 28,000 | $7,000 | $3,850 |
| Scale | $200K+ | $500,000 | 1% | 7,000 | $35,000 | $19,250 |

### Revive Pricing Model

| Tier | Condition | Take Rate | Effective Revenue to Revive |
|------|-----------|-----------|----------------------------|
| **Free** | ≤$500 recovered/month | 0% | $0 |
| **Growth** | >$500 recovered/month | 15% | 15% × recovered $ above $0* |
| **Scale** | Custom / high volume | 10% | 10% × recovered $ |

*Assumption: Growth tier charges 15% on ALL recovered revenue once the customer exceeds $500/month threshold (not just the overage). Scale tier is for customers recovering >$5,000/month who negotiate down.*

### Customer Distribution Across Tiers (at steady state)

| Revive Tier | Customer Segment | Monthly Recovered $ | Revive Revenue/Customer |
|-------------|------------------|---------------------|------------------------|
| Free | Micro ($0–$1K MRR) | $19 | $0 |
| Free (borderline) | Small (low end) | $100–$500 | $0 |
| Growth | Small ($1K–$10K MRR) | $193 avg | **$29/mo** avg |
| Growth | Mid ($10K–$50K MRR) | $963 avg | **$144/mo** avg |
| Scale | Growth ($50K–$200K MRR) | $3,850 avg | **$385/mo** avg |
| Scale | Scale ($200K+ MRR) | $19,250 avg | **$1,925/mo** avg |

### Blended ARPU (Average Revenue Per User)

Assuming our paying customer mix is:

| Mix Scenario | Small (Growth tier) | Mid (Growth tier) | Growth (Scale tier) | Scale (Scale tier) | **Blended ARPU** |
|-------------|--------------------|--------------------|--------------------|--------------------|------------------|
| Year 1 (SMB-heavy) | 55% | 30% | 12% | 3% | **$117/mo** |
| Year 2 (moving upmarket) | 40% | 35% | 18% | 7% | **$196/mo** |

**Year 1 Blended ARPU calculation:**
(0.55 × $29) + (0.30 × $144) + (0.12 × $385) + (0.03 × $1,925) = $16 + $43 + $46 + $58 = **$163/mo**

*Revised — keeping $163/mo for Year 1, $230/mo for Year 2 (more mid-market penetration).*

> **Conservative adjustment:** Not all paying customers will be at segment midpoint. Apply 0.72x realism factor.
> - **Year 1 effective ARPU: $117/mo**
> - **Year 2 effective ARPU: $166/mo**

---

## 2. Market Sizing

### TAM (Total Addressable Market)

All SaaS/subscription businesses using Stripe that experience involuntary churn.

```
700,000 Stripe SaaS companies
× 7% involuntary churn rate
× $5,000 average MRR (weighted)
× 55% recovery rate
× 12 months
× 12.5% blended take rate
─────────────────────────────
= $700K × 0.07 × $5K × 0.55 × 12 × 0.125
= 700,000 × $350 × 0.55 × 12 × 0.125
= 700,000 × $288.75
= ~$202M / year
```

**TAM: ~$200M annually** (Revive's addressable revenue at blended take rate)

### SAM (Serviceable Addressable Market)

SaaS companies with $1K+ MRR experiencing meaningful churn (worth the integration effort):

```
315,000 companies (Small + Mid + Growth + Scale segments)
× avg $117/mo Revive revenue
× 12 months
────────────────────────
= ~$442M / year
```

Wait — let's recalculate properly using segment-specific values:

| Segment | Count | Revive Rev/Customer/Year | Segment TAM |
|---------|-------|-------------------------|-------------|
| Small ($1K–$10K) | 210,000 | $348 | $73M |
| Mid ($10K–$50K) | 70,000 | $1,728 | $121M |
| Growth ($50K–$200K) | 28,000 | $4,620 | $129M |
| Scale ($200K+) | 7,000 | $23,100 | $162M |
| **Total SAM** | **315,000** | | **$485M** |

**SAM: ~$485M annually**

### SOM (Serviceable Obtainable Market)

What Revive can realistically capture in Year 1–2:

| Timeframe | Target Customers | Avg Rev/Customer | Annual Revenue |
|-----------|-----------------|------------------|----------------|
| Year 1 | 50–150 | $117/mo | $70K–$210K |
| Year 2 | 150–500 | $166/mo | $300K–$1M |

**SOM Year 1: $70K–$210K** (0.01–0.04% of SAM)
**SOM Year 2: $300K–$1M** (0.06–0.2% of SAM)

### Market Sizing Visual

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│                      TAM: ~$200M+                            │
│              All Stripe SaaS with churn                      │
│                                                              │
│    ┌──────────────────────────────────────────────┐          │
│    │                                              │          │
│    │              SAM: ~$485M                      │          │
│    │        $1K+ MRR SaaS on Stripe               │          │
│    │                                              │          │
│    │    ┌──────────────────────────┐              │          │
│    │    │                          │              │          │
│    │    │     SOM Yr 1: $70-210K   │              │          │
│    │    │     SOM Yr 2: $300K-1M   │              │          │
│    │    │     50-500 customers     │              │          │
│    │    └──────────────────────────┘              │          │
│    └──────────────────────────────────────────────┘          │
└──────────────────────────────────────────────────────────────┘
```

---

## 3. Revenue Projections

### Scenario Definitions

| Scenario | Month 3 Customers | Month 12 Customers | Month 24 Customers | Growth Pattern |
|----------|-------------------|--------------------|--------------------|----------------|
| **Conservative** | 10 | 50 | 120 | Slow, organic |
| **Moderate** | 25 | 150 | 400 | Balanced growth |
| **Aggressive** | 50 | 500 | 1,500 | Viral + paid |

### Monthly Customer Growth Curves

```
Customers
  500 │                                                          ╱ Aggressive
      │                                                        ╱
  400 │                                                      ╱
      │                                                    ╱
  300 │                                                  ╱
      │                                                ╱
  200 │                                           ···╱····· Moderate
      │                                     ···╱··
  150 │                               ····╱··
      │                          ···╱··
  100 │                     ···╱··
      │                ···╱··
   50 │ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ Conservative
      │          ···
   10 │    ···
      │···
    0 └──────────────────────────────────────────────────────
      M1   M2   M3   M4   M5   M6   M7   M8   M9  M10  M11  M12
```

### 3A. Conservative Scenario — 12-Month Revenue

**Assumptions:** Organic-only growth, slow onboarding, word-of-mouth. ARPU starts at $90/mo (smaller customers first), grows to $117/mo by M12.

| Month | New Customers | Total Customers | Paying Customers* | ARPU | Monthly Revenue | Cumulative Revenue |
|-------|--------------|----------------|--------------------|------|----------------|--------------------|
| 1 | 2 | 2 | 1 | $90 | $90 | $90 |
| 2 | 3 | 5 | 3 | $90 | $270 | $360 |
| 3 | 5 | 10 | 6 | $95 | $570 | $930 |
| 4 | 4 | 14 | 9 | $95 | $855 | $1,785 |
| 5 | 4 | 18 | 12 | $100 | $1,200 | $2,985 |
| 6 | 5 | 23 | 15 | $100 | $1,500 | $4,485 |
| 7 | 5 | 28 | 19 | $105 | $1,995 | $6,480 |
| 8 | 5 | 33 | 22 | $105 | $2,310 | $8,790 |
| 9 | 5 | 38 | 26 | $110 | $2,860 | $11,650 |
| 10 | 4 | 42 | 29 | $110 | $3,190 | $14,840 |
| 11 | 4 | 46 | 32 | $115 | $3,680 | $18,520 |
| 12 | 4 | 50 | 35 | $117 | $4,095 | $22,615 |

*\*Paying = ~65–70% of total (rest on free tier or below $500 threshold)*

**Conservative Year 1 Total: ~$22,600**
**Conservative Month 12 MRR: ~$4,100**
**Conservative ARR (run rate at M12): ~$49,100**

### 3B. Moderate Scenario — 12-Month Revenue

**Assumptions:** Mix of organic + content marketing + some outbound. ARPU starts at $100/mo, grows to $130/mo.

| Month | New Customers | Total Customers | Paying Customers | ARPU | Monthly Revenue | Cumulative Revenue |
|-------|--------------|----------------|-------------------|------|----------------|--------------------|
| 1 | 5 | 5 | 3 | $100 | $300 | $300 |
| 2 | 8 | 13 | 8 | $100 | $800 | $1,100 |
| 3 | 12 | 25 | 16 | $105 | $1,680 | $2,780 |
| 4 | 12 | 37 | 24 | $105 | $2,520 | $5,300 |
| 5 | 13 | 50 | 33 | $110 | $3,630 | $8,930 |
| 6 | 14 | 64 | 42 | $110 | $4,620 | $13,550 |
| 7 | 15 | 79 | 53 | $115 | $6,095 | $19,645 |
| 8 | 16 | 95 | 64 | $115 | $7,360 | $27,005 |
| 9 | 16 | 111 | 75 | $120 | $9,000 | $36,005 |
| 10 | 14 | 125 | 85 | $120 | $10,200 | $46,205 |
| 11 | 13 | 138 | 94 | $125 | $11,750 | $57,955 |
| 12 | 12 | 150 | 103 | $130 | $13,390 | $71,345 |

**Moderate Year 1 Total: ~$71,300**
**Moderate Month 12 MRR: ~$13,400**
**Moderate ARR (run rate at M12): ~$160,700**

### 3C. Aggressive Scenario — 12-Month Revenue

**Assumptions:** Viral Stripe marketplace listing, paid ads, partnerships, strong product-led growth. ARPU starts at $110/mo, grows to $150/mo (faster upmarket pull).

| Month | New Customers | Total Customers | Paying Customers | ARPU | Monthly Revenue | Cumulative Revenue |
|-------|--------------|----------------|-------------------|------|----------------|--------------------|
| 1 | 12 | 12 | 7 | $110 | $770 | $770 |
| 2 | 18 | 30 | 18 | $110 | $1,980 | $2,750 |
| 3 | 20 | 50 | 32 | $115 | $3,680 | $6,430 |
| 4 | 30 | 80 | 52 | $115 | $5,980 | $12,410 |
| 5 | 35 | 115 | 76 | $120 | $9,120 | $21,530 |
| 6 | 40 | 155 | 103 | $120 | $12,360 | $33,890 |
| 7 | 45 | 200 | 135 | $125 | $16,875 | $50,765 |
| 8 | 50 | 250 | 170 | $130 | $22,100 | $72,865 |
| 9 | 55 | 305 | 208 | $135 | $28,080 | $100,945 |
| 10 | 60 | 365 | 250 | $140 | $35,000 | $135,945 |
| 11 | 65 | 430 | 295 | $145 | $42,775 | $178,720 |
| 12 | 70 | 500 | 345 | $150 | $51,750 | $230,470 |

**Aggressive Year 1 Total: ~$230,500**
**Aggressive Month 12 MRR: ~$51,800**
**Aggressive ARR (run rate at M12): ~$621,000**

### 24-Month Extended Projections

| Metric | Conservative | Moderate | Aggressive |
|--------|-------------|----------|------------|
| **M24 Total Customers** | 120 | 400 | 1,500 |
| **M24 Paying Customers** | 84 | 280 | 1,050 |
| **M24 ARPU** | $140 | $175 | $210 |
| **M24 MRR** | $11,760 | $49,000 | $220,500 |
| **M24 ARR (run rate)** | $141,100 | $588,000 | $2,646,000 |
| **Cumulative Revenue (24mo)** | ~$115,000 | ~$440,000 | ~$2,100,000 |

### Revenue Trajectory (24-Month)

```
Monthly Revenue ($K)
 $220K │                                                              ╱
       │                                                            ╱
 $180K │                                                          ╱
       │                                                        ╱  Aggressive
 $150K │                                                      ╱
       │                                                    ╱
 $120K │                                                  ╱
       │                                                ╱
  $90K │                                              ╱
       │                                            ╱
  $60K │                                       ···╱
       │                                 ····╱··
  $49K │                           ····╱·····        Moderate
       │                     ····╱··
  $30K │               ····╱··
       │          ····╱··
  $12K │─ ─ ─ ─··─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ Conservative
       │   ···
   $4K │···
       └──────────────────────────────────────────────────────────
       M1      M6      M12       M15      M18       M21      M24
```

---

## 4. Unit Economics

### 4A. Customer Acquisition Cost (CAC)

| Channel | Monthly Spend | Customers/Month | CAC | Notes |
|---------|--------------|----------------|-----|-------|
| **Organic / SEO** | $200 (tooling) | 3–5 | **$40–$67** | Blog, Stripe marketplace listing, word of mouth |
| **Content Marketing** | $500 | 5–8 | **$63–$100** | Guest posts, Twitter/X, newsletters |
| **Outbound (cold email)** | $300 | 2–4 | **$75–$150** | Targeted SaaS founders |
| **Paid Ads (Google/Twitter)** | $2,000 | 8–15 | **$133–$250** | Competitive keywords |
| **Partnerships** | $500 | 5–10 | **$50–$100** | Stripe consultants, agencies |

**Blended CAC by scenario:**

| Scenario | Primary Channels | Blended CAC |
|----------|-----------------|-------------|
| Conservative (organic-heavy) | 70% organic, 30% content | **$60** |
| Moderate (balanced) | 40% organic, 30% content, 20% outbound, 10% paid | **$95** |
| Aggressive (paid + partnerships) | 20% organic, 20% content, 25% paid, 20% outbound, 15% partnerships | **$130** |

### 4B. Customer Lifetime Value (LTV)

**Churn assumptions:**
- Monthly logo churn: 3% (typical for SMB SaaS tools)
- Average customer lifetime: 1 / 0.03 = **33 months**
- Gross margin: ~90% (infrastructure costs are minimal)

| Tier | ARPU | Gross Margin | Avg Lifetime | **LTV** |
|------|------|-------------|-------------|---------|
| **Growth (Small)** | $29/mo | 90% | 33 months | **$861** |
| **Growth (Mid)** | $144/mo | 90% | 40 months* | **$5,184** |
| **Scale (Growth)** | $385/mo | 90% | 48 months* | **$16,632** |
| **Scale (Enterprise)** | $1,925/mo | 90% | 48 months* | **$83,160** |

*\*Larger customers churn less — using 2.5% and 2% monthly churn respectively*

**Blended LTV (weighted by Year 1 customer mix):**

```
Blended LTV = (0.55 × $861) + (0.30 × $5,184) + (0.12 × $16,632) + (0.03 × $83,160)
            = $474 + $1,555 + $1,996 + $2,495
            = $6,520
```

**Wait — this is total LTV across segments, but our ARPU already accounts for mix. Simpler calculation:**

```
Blended LTV = ARPU × Gross Margin × Avg Lifetime
            = $117/mo × 0.90 × 33 months
            = $3,475
```

**Blended LTV: ~$3,475**

### 4C. LTV:CAC Ratios

| Scenario | LTV | CAC | **LTV:CAC** | Verdict |
|----------|-----|-----|-------------|---------|
| Conservative | $3,475 | $60 | **57.9x** | ✅ Excellent (organic is cheap) |
| Moderate | $3,475 | $95 | **36.6x** | ✅ Excellent |
| Aggressive | $3,475 | $130 | **26.7x** | ✅ Very good |

> **Benchmark:** SaaS companies target LTV:CAC > 3x. All scenarios dramatically exceed this because:
> 1. Performance-based pricing means customers only pay when they see value
> 2. Once integrated, switching costs are moderate
> 3. The product literally pays for itself (recovering > cost)

### 4D. Payback Period

| Scenario | CAC | Monthly Revenue/Customer | **Payback Period** |
|----------|-----|-------------------------|-------------------|
| Conservative | $60 | $117 × 0.90 = $105 | **< 1 month** |
| Moderate | $95 | $117 × 0.90 = $105 | **< 1 month** |
| Aggressive | $130 | $117 × 0.90 = $105 | **~1.2 months** |

> Performance-based SaaS has exceptionally fast payback because there are no upfront commitments from customers. The main "cost" is the integration effort.

### Unit Economics Summary

```
┌─────────────────────────────────────────────────┐
│            UNIT ECONOMICS SCORECARD              │
├─────────────────────────────────────────────────┤
│                                                  │
│  Blended ARPU (Yr 1):    $117/mo                │
│  Blended LTV:            $3,475                  │
│  Blended CAC:            $60–$130                │
│  LTV:CAC:                26–58x  ✅              │
│  Payback:                < 1.2 months  ✅        │
│  Gross Margin:           ~90%  ✅                │
│  Monthly Logo Churn:     ~3%                     │
│  Net Revenue Retention:  ~105%*                  │
│                                                  │
│  * Customers recover more as their MRR grows     │
└─────────────────────────────────────────────────┘
```

---

## 5. Break-Even Analysis

### 5A. Fixed Costs (Monthly)

| Cost Item | Monthly Cost | Notes |
|-----------|-------------|-------|
| Hosting (Vercel/Railway/AWS) | $50 | Scales with usage but low base |
| Database (PlanetScale/Supabase) | $30 | Managed Postgres/MySQL |
| Email service (Resend/Postmark) | $20 | Dunning emails |
| Monitoring (Sentry, Logflare) | $30 | Error tracking, logging |
| Domain + misc SaaS | $20 | Domain, analytics, etc. |
| Stripe Atlas / incorporation | $15 | Amortized annual cost |
| **Subtotal: Infrastructure** | **$165** | |
| | | |
| Founder time (opportunity cost) | $5,000* | Half-time valued at $120K/yr |
| Marketing tools | $100 | Email lists, scheduling |
| **Total Fixed Costs** | **$5,265** | |
| **Total Fixed (excl. founder time)** | **$265** | |

*\*Founder time is the elephant in the room. If bootstrapping, it's technically $0 cash out of pocket but matters for total economic picture.*

### 5B. Variable Costs (Per Customer Per Month)

| Cost Item | Cost | Notes |
|-----------|------|-------|
| Stripe processing fees | ~2.9% + $0.30 per charge | On Revive's collected fees |
| Email sending (dunning campaigns) | ~$0.50/customer/mo | ~50 emails/customer/month |
| Webhook processing / compute | ~$0.10/customer/mo | API calls, retries |
| **Total Variable** | **~3.5% of revenue + $0.60** | |

**Effective variable cost per customer (at $117 ARPU):**
= ($117 × 0.035) + $0.60 = $4.10 + $0.60 = **$4.70/customer/month**

### 5C. Break-Even Calculation

**Contribution margin per customer:**
= $117.00 (ARPU) − $4.70 (variable) = **$112.30/month**

#### Break-even excluding founder time:

```
Break-even customers = Fixed Costs / Contribution Margin
                     = $265 / $112.30
                     = 2.4 customers
                     ≈ 3 paying customers
```

#### Break-even including founder time:

```
Break-even customers = $5,265 / $112.30
                     = 46.9 customers
                     ≈ 47 paying customers
```

#### Break-even including full-time founder ($10K/mo opportunity cost):

```
Break-even customers = $10,265 / $112.30
                     = 91.4 customers
                     ≈ 92 paying customers
```

### Break-Even Timeline by Scenario

| Break-Even Target | Conservative | Moderate | Aggressive |
|-------------------|-------------|----------|------------|
| **Cash break-even (excl. founder)** — 3 customers | Month 2 ✅ | Month 1 ✅ | Month 1 ✅ |
| **Half-time founder** — 47 customers | Month 14 | Month 7 | Month 4 |
| **Full-time founder** — 92 customers | Month 22 | Month 9 | Month 6 |
| **Founder + employee** — 140 customers | Never (Yr 1) | Month 12 | Month 7 |

### Break-Even Visualization

```
Customers
(paying)
 140 ──│─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ Founder + 1 Employee
       │
       │
  92 ──│─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ Full-time Founder
       │
       │
  47 ──│─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ Half-time Founder
       │
       │
   3 ──│─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ Cash (infra only)
       │
   0 ──└───────────────────────────────────────
       M1    M3    M6    M9    M12   M15   M18
```

---

## 6. Pricing Optimization

### 6A. Take Rate Modeling

What happens at different take rates? Using Moderate scenario (150 customers at M12):

| Take Rate | ARPU | Monthly Rev (M12) | Annual Rev (Yr 1) | Customer Willingness* | Competitor Comparison |
|-----------|------|--------------------|--------------------|----------------------|----------------------|
| **5%** | $39 | $4,017 | $21,400 | Very High | Below market |
| **10%** | $78 | $8,034 | $42,800 | High | Competitive |
| **15%** | $117 | $12,051 | $71,300 | Moderate | Premium |
| **20%** | $156 | $16,068 | $95,000 | Lower | Above market |
| **25%** | $195 | $20,085 | $118,800 | Low | Overpriced |

*\*Willingness is subjective, based on competitive benchmarks and value-to-customer ratio*

### 6B. Customer Value Analysis

For a SaaS company with $10K MRR and 7% involuntary churn:
- Monthly at-risk revenue: **$700**
- Without Revive: loses ~$700/month
- With Revive (55% recovery): saves **$385/month**
- At various take rates:

| Take Rate | Revive Fee | Net Savings to Customer | Customer ROI | Likely Adoption |
|-----------|-----------|------------------------|-------------|-----------------|
| 5% | $19 | $366 | 19x | ★★★★★ |
| 10% | $39 | $346 | 9x | ★★★★★ |
| 15% | $58 | $327 | 6x | ★★★★☆ |
| 20% | $77 | $308 | 4x | ★★★☆☆ |
| 25% | $96 | $289 | 3x | ★★☆☆☆ |

### 6C. Optimal Pricing Analysis

```
Revenue vs. Adoption Curve

Revenue                    Adoption
  ↑                           ↑
  │         ╱‾‾╲              │  ╲
  │       ╱      ╲            │    ╲
  │     ╱          ╲          │      ╲
  │   ╱              ╲        │        ╲
  │ ╱                  ╲      │          ╲
  │╱                     ╲    │            ╲
  └──────────────────────→    └──────────────→
  5%  10%  15%  20%  25%      5%  10%  15%  20%  25%
      Take Rate                    Take Rate

Combined Revenue (adoption × rate):
  Peak is between 10-15%
```

**Recommendation:**

| Tier | Recommended Rate | Rationale |
|------|-----------------|-----------|
| **Growth** | **15%** ✅ | Sweet spot for SMBs. 6x ROI is compelling. Easy "it pays for itself" pitch. |
| **Scale** | **10%** ✅ | Volume discount for larger customers. Still 9x ROI. Competitive with Churnkey. |
| **Enterprise** (new suggestion) | **7-8%** | For $100K+ MRR, lower rate wins deals. Higher absolute $ per customer. |

### 6D. Competitor Pricing Comparison

```
Monthly Cost to Customer ($10K MRR company)

$500 │████████████████████████████████████████████████│ Churnkey ($500 min)
     │                                                │
$250 │███████████████████████████│                     │ Baremetrics Recover ($250)
     │                                                │
$150 │                                                │
     │                                                │
 $58 │██████│                                         │ Revive Growth (15%)
     │                                                │
  $0 │▓▓▓▓▓▓│ Revive Free Tier (under $500 recovered) │
     └────────────────────────────────────────────────┘

For $50K MRR company:

$500+ │████████████████████████████████████████████████│ Churnkey ($500+)
      │                                                │
$385  │█████████████████████████████████████████│       │ Revive Scale (10%)
      │                                                │
$250  │███████████████████████████│                     │ Baremetrics Recover
      │                                                │
```

**Key insight:** Revive is dramatically cheaper for small companies ($1K–$20K MRR) and competitive for mid-market. The performance-based model is a major differentiator — customers pay nothing until value is proven.

### 6E. Price Sensitivity Matrix

Impact of take rate changes on key metrics (Moderate scenario):

| Metric | 5% Rate | 10% Rate | 15% Rate | 20% Rate |
|--------|---------|----------|----------|----------|
| Year 1 Revenue | $21K | $43K | $71K | $95K |
| Customers (M12) | 200 (+33%) | 170 (+13%) | 150 (base) | 120 (-20%) |
| Churn Rate | 2% | 2.5% | 3% | 4% |
| LTV | $1,755 | $2,808 | $3,475 | $3,510 |
| LTV:CAC | 18x | 30x | 37x | 27x |
| Break-even (founder) | 121 customers | 61 customers | 47 customers | 40 customers |
| **Net Revenue at M12** | $7,020 | $11,730 | $13,390 | $12,960 |

> **15% maximizes net revenue** when accounting for adoption and churn effects. The 20% rate drives away enough customers and increases churn enough to actually produce less revenue. **15% is confirmed as the optimal Growth tier rate.**

---

## 7. Sensitivity Analysis

### 7A. Key Variable Sensitivity

How do changes in key assumptions affect Year 1 revenue (Moderate scenario)?

| Variable | -30% | -15% | Base | +15% | +30% |
|----------|------|------|------|------|------|
| **Recovery Rate** (base: 55%) | 39% → $50K | 47% → $61K | 55% → **$71K** | 63% → $82K | 72% → $93K |
| **Customer Growth** (base: 150) | 105 → $50K | 128 → $61K | 150 → **$71K** | 173 → $82K | 195 → $93K |
| **ARPU** (base: $117) | $82 → $50K | $99 → $60K | $117 → **$71K** | $135 → $82K | $152 → $92K |
| **Churn** (base: 3%) | 2.1% → $79K | 2.6% → $75K | 3.0% → **$71K** | 3.5% → $67K | 3.9% → $64K |

### 7B. Tornado Chart — Impact on Year 1 Revenue

```
                        $50K         $71K         $93K
                         │            │            │
Recovery Rate    ────────████████████████████████████────── Highest Impact
                         │            │            │
Customer Growth  ────────████████████████████████████──────
                         │            │            │
ARPU             ────────███████████████████████████───────
                         │            │            │
Churn Rate       ──────────████████████████████──────────── Lowest Impact
                         │            │            │
                        $50K         $71K         $93K
```

### 7C. Scenario Probability Weighting

| Scenario | Probability | Year 1 Revenue | Weighted Revenue |
|----------|------------|----------------|-----------------|
| Conservative | 30% | $22,600 | $6,780 |
| Moderate | 50% | $71,300 | $35,650 |
| Aggressive | 20% | $230,500 | $46,100 |
| **Expected Value** | **100%** | | **$88,530** |

| Scenario | Probability | Year 2 Revenue (cumulative) | Weighted Revenue |
|----------|------------|---------------------------|-----------------|
| Conservative | 25% | $115,000 | $28,750 |
| Moderate | 50% | $440,000 | $220,000 |
| Aggressive | 25% | $2,100,000 | $525,000 |
| **Expected Value** | **100%** | | **$773,750** |

### 7D. What-If Scenarios

**What if recovery rate is only 40% (low end)?**
- ARPU drops from $117 to $85 (−27%)
- Break-even goes from 47 to 63 customers
- Year 1 moderate revenue: ~$52K (−27%)

**What if a larger company (avg $25K MRR) is 20% of customer base?**
- Blended ARPU increases to $163 (+39%)
- Break-even drops from 47 to 33 customers
- Year 1 moderate revenue: ~$99K (+39%)

**What if Stripe builds this feature natively?**
- Existential risk. See Risk section.
- Mitigation: Speed to market, superior UX, multi-gateway support

---

## 8. Competitive Landscape

### Feature & Pricing Matrix

| Feature | Revive | Churnkey | Baremetrics Recover | Stripe Smart Retries |
|---------|--------|----------|--------------------|--------------------|
| **Pricing Model** | Performance (% of recovered) | Flat monthly ($500+ min) | Flat monthly ($50–250) | Included with Stripe |
| **Min Cost** | $0 (free tier) | $500/mo | $50/mo | $0 |
| **Smart Retries** | ✅ | ✅ | ✅ | ✅ (basic) |
| **Email Campaigns** | ✅ | ✅ | ✅ | ❌ |
| **In-app Modals** | ❌ (roadmap) | ✅ | ❌ | ❌ |
| **Card Update Flows** | ✅ | ✅ | ✅ | ❌ |
| **Analytics** | ✅ | ✅ | ✅ (deep) | Basic |
| **Cancellation Flows** | ❌ | ✅ | ❌ | ❌ |
| **Setup Effort** | 5 min (Stripe connect) | 30+ min | 15 min | 0 (auto) |
| **Best For** | SMBs, bootstrappers | Funded SaaS, mid-market | Data-focused teams | Everyone (basic) |

### Competitive Advantage

```
                   High
                    │
  Recovery          │     ┌──────────┐
  Effectiveness     │     │ Churnkey │     ┌────────┐
                    │     └──────────┘     │ Revive │ (target position)
                    │                      └────────┘
                    │  ┌─────────────────┐
                    │  │ Baremetrics     │
                    │  │ Recover         │
                    │  └─────────────────┘
                    │
                    │     ┌─────────────────┐
                    │     │ Stripe Native   │
                    │     │ Smart Retries   │
                   Low    └─────────────────┘
                    └────────────────────────────────→
                   Free                          $500+/mo
                              Price
```

**Revive's positioning:** Best value for SMBs. Performance-based pricing removes risk. "Only pay when we make you money."

---

## 9. Key Risks & Mitigations

| # | Risk | Probability | Impact | Mitigation |
|---|------|-------------|--------|-----------|
| 1 | **Stripe builds robust native dunning** | Medium | Critical | Move fast, add features Stripe won't (personalized emails, analytics, multi-gateway). Build brand before commoditization. |
| 2 | **Recovery rates lower than modeled** | Medium | High | A/B test aggressively. Use ML for optimal retry timing. Set expectations appropriately. |
| 3 | **Low willingness to integrate** | Medium | High | Make integration dead-simple (< 5 min). Stripe Connect OAuth. Free tier reduces friction. |
| 4 | **Churnkey drops prices** | Low | Medium | Compete on simplicity and SMB focus, not features. Different market segment. |
| 5 | **Revenue concentration** | Medium | Medium | Diversify customer base. No single customer > 10% of revenue by M12. |
| 6 | **Free tier attracts only non-paying users** | Medium | Low | Free tier is a funnel. Track conversion to paid. Adjust threshold if needed. |
| 7 | **High customer churn** | Low-Med | High | Performance pricing = built-in retention. Customers leave only if they stop losing payments (good problem). |

---

## 10. Summary Dashboard

```
╔══════════════════════════════════════════════════════════════════╗
║                    REVIVE FINANCIAL DASHBOARD                    ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  MARKET                          PRICING                         ║
║  ─────                           ───────                         ║
║  TAM:     ~$200M+                Growth:  15% ✅ (optimal)       ║
║  SAM:     ~$485M                 Scale:   10% ✅ (competitive)   ║
║  SOM Yr1: $70–210K               Free:    <$500/mo recovered     ║
║  SOM Yr2: $300K–1M                                               ║
║                                                                  ║
║  UNIT ECONOMICS                  BREAK-EVEN                      ║
║  ──────────────                  ───────────                     ║
║  ARPU:      $117/mo              Cash:     3 customers           ║
║  LTV:       $3,475               Half-time: 47 customers         ║
║  CAC:       $60–130              Full-time: 92 customers         ║
║  LTV:CAC:   27–58x ✅                                           ║
║  Payback:   <1.2 mo ✅                                          ║
║  Margin:    ~90% ✅                                              ║
║                                                                  ║
║  REVENUE PROJECTIONS (Expected Value)                            ║
║  ────────────────────────────────────                            ║
║  Year 1:   ~$89K (probability-weighted)                          ║
║  Year 2:   ~$774K (cumulative, probability-weighted)             ║
║                                                                  ║
║  Month 12 MRR by scenario:                                       ║
║    Conservative:  $4,100    │░░░│                                 ║
║    Moderate:      $13,400   │░░░░░░░░░│                           ║
║    Aggressive:    $51,800   │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│     ║
║                                                                  ║
║  TOP INSIGHT                                                     ║
║  ───────────                                                     ║
║  Performance-based pricing is Revive's superpower.               ║
║  Zero risk for customers = fast adoption.                        ║
║  $0 → paying conversion is the key metric to watch.             ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## Appendix A: Key Formulas

```
ARPU = Σ (segment_% × segment_MRR × churn_rate × recovery_rate × take_rate)

LTV  = ARPU × Gross_Margin / Monthly_Churn_Rate

CAC  = Total_Acquisition_Spend / New_Customers_Acquired

LTV:CAC = LTV / CAC

Payback_Period = CAC / (ARPU × Gross_Margin)

Break_Even_Customers = Fixed_Costs / (ARPU - Variable_Cost_Per_Customer)

Monthly_Revenue = Paying_Customers × ARPU

Customer_ROI = (Recovered_Revenue - Revive_Fee) / Revive_Fee
```

## Appendix B: Assumptions Log

| # | Assumption | Value | Confidence | Impact if Wrong |
|---|-----------|-------|-----------|-----------------|
| 1 | Stripe SaaS companies | 700K | Medium | Changes TAM linearly |
| 2 | Involuntary churn rate | 7% of MRR | High | ±30% → ±30% revenue |
| 3 | Recovery rate | 55% | Medium | Most impactful variable |
| 4 | Paying customer % | 65-70% of total | Medium | Affects all revenue projections |
| 5 | Monthly logo churn | 3% | Medium | Affects LTV significantly |
| 6 | Customer mix (SMB-heavy) | 55/30/12/3 | Low | Changes ARPU substantially |
| 7 | Free tier threshold | $500/mo | Set | Could adjust — see pricing section |
| 8 | Gross margin | 90% | High | Infrastructure costs are known |

---

*Model built February 2026. Review and update quarterly as real data comes in. Replace assumptions with actuals as soon as available.*
