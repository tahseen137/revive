#!/usr/bin/env node
/**
 * ab-tracker.mjs — A/B Test Analytics Reporter
 *
 * Polls Vercel Analytics API to compare Variant A vs Variant B performance.
 *
 * Tracked events (from TrackedCTA + ABVariantTracker components):
 *   - "AB Variant Shown" → variant: "a" | "b"
 *   - "CTA Click"        → variant: "a" | "b", position: "hero" | "mid" | "bottom" | "pricing"
 *
 * Usage:
 *   VERCEL_TOKEN=xxx VERCEL_PROJECT_ID=prj_xxx node tools/ab-tracker.mjs
 *
 * Or just run to get instructions:
 *   node tools/ab-tracker.mjs
 */

const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID || 'prj_rQ8oH8qYWdm8dU8CMpuUzBSW2KJ5';
const TEAM_ID = process.env.VERCEL_TEAM_ID || 'team_IjI3or3ZGN0PcQlOEtLr79Pf';

async function fetchAnalyticsEvents(eventName, days = 14) {
  if (!VERCEL_TOKEN) {
    return null;
  }

  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  const url = `https://vercel.com/api/web/insights/events?projectId=${VERCEL_PROJECT_ID}&teamId=${TEAM_ID}&event=${encodeURIComponent(eventName)}&since=${since}&limit=1000`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${VERCEL_TOKEN}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Vercel API error ${res.status}: ${text.slice(0, 200)}`);
  }

  return res.json();
}

function computeConversionRate(clicks, views) {
  if (!views || views === 0) return '0%';
  return ((clicks / views) * 100).toFixed(1) + '%';
}

async function main() {
  console.log('\n🔬 Revive A/B Test Tracker\n');
  console.log('='.repeat(50));

  if (!VERCEL_TOKEN) {
    console.log('\n⚠️  No VERCEL_TOKEN found. Set env var to enable API polling.\n');
    console.log('To get your Vercel token:');
    console.log('  1. Go to https://vercel.com/account/tokens');
    console.log('  2. Create a token with "Full Account" scope');
    console.log('  3. Run: VERCEL_TOKEN=your_token node tools/ab-tracker.mjs\n');
    console.log('Tracked events:');
    console.log('  - "AB Variant Shown"  → fired on each homepage view (a/b)');
    console.log('  - "CTA Click"         → fired on each CTA click (a/b + position)\n');
    console.log('What to measure:');
    console.log('  Primary:   CTA Click rate = CTA Clicks / Variant Shown (per variant)');
    console.log('  Secondary: Scroll depth, time on page (Vercel Speed Insights)\n');
    console.log('Statistical significance: Need 200+ visitors per variant.');
    console.log('Recommend running for 14+ days before declaring winner.\n');
    return;
  }

  try {
    console.log('Fetching data from Vercel Analytics (last 14 days)...\n');

    const [viewsData, clicksData] = await Promise.all([
      fetchAnalyticsEvents('AB Variant Shown'),
      fetchAnalyticsEvents('CTA Click'),
    ]);

    // Count views per variant
    const views = { a: 0, b: 0 };
    const clicks = { a: 0, b: 0 };
    const clicksByPosition = {
      a: { hero: 0, mid: 0, bottom: 0, pricing: 0 },
      b: { hero: 0, mid: 0, bottom: 0, pricing: 0 },
    };

    if (viewsData?.events) {
      for (const event of viewsData.events) {
        const variant = event.props?.variant;
        if (variant === 'a') views.a++;
        if (variant === 'b') views.b++;
      }
    }

    if (clicksData?.events) {
      for (const event of clicksData.events) {
        const variant = event.props?.variant;
        const position = event.props?.position || 'unknown';
        if (variant === 'a') {
          clicks.a++;
          if (clicksByPosition.a[position] !== undefined) {
            clicksByPosition.a[position]++;
          }
        }
        if (variant === 'b') {
          clicks.b++;
          if (clicksByPosition.b[position] !== undefined) {
            clicksByPosition.b[position]++;
          }
        }
      }
    }

    const totalViews = views.a + views.b;
    const totalClicks = clicks.a + clicks.b;

    console.log('📊 RESULTS (last 14 days)\n');
    console.log(`Total impressions: ${totalViews}`);
    console.log(`Total CTA clicks: ${totalClicks}\n`);

    console.log('VARIANT A — "Never Lose a Customer"');
    console.log(`  Views:        ${views.a}`);
    console.log(`  CTA Clicks:   ${clicks.a}`);
    console.log(`  Conversion:   ${computeConversionRate(clicks.a, views.a)}`);
    console.log(`  By position:  hero=${clicksByPosition.a.hero} mid=${clicksByPosition.a.mid} bottom=${clicksByPosition.a.bottom} pricing=${clicksByPosition.a.pricing}\n`);

    console.log('VARIANT B — "Recover Failed Payments Automatically"');
    console.log(`  Views:        ${views.b}`);
    console.log(`  CTA Clicks:   ${clicks.b}`);
    console.log(`  Conversion:   ${computeConversionRate(clicks.b, views.b)}`);
    console.log(`  By position:  hero=${clicksByPosition.b.hero} mid=${clicksByPosition.b.mid} bottom=${clicksByPosition.b.bottom} pricing=${clicksByPosition.b.pricing}\n`);

    // Winner determination
    const rateA = views.a > 0 ? clicks.a / views.a : 0;
    const rateB = views.b > 0 ? clicks.b / views.b : 0;

    if (totalViews < 400) {
      console.log(`⏳ INSUFFICIENT DATA: Need ${400 - totalViews} more visitors for statistical significance.`);
    } else if (Math.abs(rateA - rateB) < 0.005) {
      console.log('📊 NO CLEAR WINNER: Results within noise threshold (< 0.5% difference).');
    } else {
      const winner = rateA > rateB ? 'A' : 'B';
      const winnerLabel = winner === 'A' ? '"Never Lose a Customer"' : '"Recover Failed Payments"';
      const uplift = Math.abs((rateA - rateB) / Math.min(rateA, rateB) * 100).toFixed(1);
      console.log(`🏆 WINNER: Variant ${winner} (${winnerLabel})`);
      console.log(`   Conversion uplift: +${uplift}%`);
      console.log(`   Next step: Ship variant ${winner} as the production page.tsx`);
    }
  } catch (err) {
    console.error('❌ Error fetching analytics:', err.message);
    console.log('\nFalling back to manual check instructions:');
    console.log('  1. Go to https://vercel.com/dashboard');
    console.log('  2. Open the "revive" project → Analytics tab');
    console.log('  3. Filter by "AB Variant Shown" and "CTA Click" events');
    console.log('  4. Compare conversion rates for variant=a vs variant=b');
  }

  console.log('\n' + '='.repeat(50));
}

main();
