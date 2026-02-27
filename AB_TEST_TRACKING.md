# A/B Test Tracking Setup

## Test Overview

**Variants:**
- **Variant A** (`page-v2.tsx`): "Never Lose a Customer to a Failed Payment" — emotional, customer-retention framing
- **Variant B** (`page-variantb.tsx`): "Recover Failed Payments. Automatically." — practical, data-driven framing

**Traffic Split:** 50/50  
**Cookie:** `ab_variant` (30-day persistence, `SameSite=lax`)  
**Started:** Feb 27, 2026  
**Recommended duration:** 14+ days (need 200+ visitors per variant for significance)

---

## Tracked Events

All events are fired via `@vercel/analytics` `track()` function.

### `AB Variant Shown`
Fires once per homepage session on mount.

| Property | Values |
|----------|--------|
| `variant` | `"a"` or `"b"` |

Use for: **denominator** in conversion rate calculation.

---

### `CTA Click`
Fires when a user clicks a primary CTA button.

| Property | Values |
|----------|--------|
| `variant` | `"a"` or `"b"` |
| `position` | `"hero"`, `"mid"`, `"bottom"`, `"pricing"` |
| `label` | CTA button text |

Use for: **numerator** in conversion rate calculation.

---

## How to View Results

### Option 1: Vercel Analytics Dashboard (No Code)
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Open the **revive** project → **Analytics** tab
3. Click **Custom Events**
4. Filter by:
   - `AB Variant Shown` → group by `variant` → see view counts
   - `CTA Click` → group by `variant` → see click counts
5. Calculate: **Conversion Rate = CTA Clicks / AB Variant Shown** per variant

### Option 2: CLI Tracker
```bash
VERCEL_TOKEN=your_token node tools/ab-tracker.mjs
```

Get your token at: https://vercel.com/account/tokens (Full Account scope)

---

## Primary Metric

**CTA Click-Through Rate** = CTA Clicks ÷ Variant Shown

This measures how many visitors clicked "Connect Stripe / Start Free" per variant.

Secondary metrics:
- Scroll depth (Vercel Speed Insights)
- Time on page
- Bounce rate (via Vercel Web Analytics)

---

## Statistical Significance

- **Minimum:** 200 visitors per variant
- **Target confidence:** 95%
- **Minimum detectable effect:** ~20% relative change
- **Expected timeline:** 14–21 days at current traffic

---

## Decision Criteria

| Scenario | Action |
|----------|--------|
| Variant A wins by >5% | Replace `page.tsx` with `page-v2.tsx` content |
| Variant B wins by >5% | Replace `page.tsx` with `page-variantb.tsx` content |
| <5% difference or <400 total visitors | Continue running, check at 28 days |
| No clear winner at 28 days | Ship Variant B (more targeted copy) |

---

## Implementation Details

### Files Created
- `src/components/TrackedCTA.tsx` — Client component for tracked CTA buttons + pageview tracker
- `src/app/page-v2.tsx` — Variant A landing page
- `src/app/page-variantb.tsx` — Variant B landing page
- `src/app/variantb/page.tsx` — Route that exports Variant B
- `src/middleware.ts` — Updated to handle A/B routing + existing API auth
- `tools/ab-tracker.mjs` — CLI for reading analytics results

### How the Routing Works
```
User visits revive-hq.com/
  → middleware.ts runs
  → checks for ab_variant cookie
  → if none: random 50/50 assignment, cookie set for 30 days
  → if variant=b: URL rewritten to /variantb internally
  → if variant=a: served normally (existing page.tsx route)
  → TrackedCTA/ABVariantTracker components fire Vercel events
```

---

## Declaring a Winner

When you have a winner:

```bash
cd /path/to/revive

# If Variant A wins:
cp src/app/page-v2.tsx src/app/page.tsx
git add src/app/page.tsx
git commit -m "ship: deploy A/B test winner — Variant A"

# If Variant B wins:
cp src/app/page-variantb.tsx src/app/page.tsx
git add src/app/page.tsx
git commit -m "ship: deploy A/B test winner — Variant B"

# Also update middleware to remove A/B routing:
# Remove the homepage A/B block from src/middleware.ts

git push origin main
```

---

*Created: Feb 27, 2026*  
*Engineer: Gandalf AI*
