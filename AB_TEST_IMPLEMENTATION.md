# A/B Test Implementation Guide

## Files Created

1. **`src/app/page-v2.tsx`** - Variant A: "Never Lose a Customer to Payment Issues"
2. **`src/app/page-variantb.tsx`** - Variant B: "Recover Failed Payments Automatically"
3. **`COPY_REFRESH_NOTES.md`** - Documentation of all changes
4. **`AB_TEST_IMPLEMENTATION.md`** - This file (implementation guide)

## Quick Summary

Both variants simplify the landing page copy:
- Removed jargon ("agentic", "OAuth", "decline codes")
- Focused on benefits over technical features
- Simplified CTAs and messaging
- Made it accessible to non-technical users

## How to Deploy A/B Test

### Option 1: Vercel Edge Middleware (Recommended)

Create `middleware.ts` in your project root:

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only run on homepage
  if (request.nextUrl.pathname === '/') {
    // Get or set variant cookie
    const variant = request.cookies.get('ab_variant')?.value || 
                    (Math.random() < 0.5 ? 'a' : 'b');
    
    const response = NextResponse.next();
    
    // Set cookie if not exists
    if (!request.cookies.get('ab_variant')) {
      response.cookies.set('ab_variant', variant, { maxAge: 60 * 60 * 24 * 30 }); // 30 days
    }
    
    // Rewrite to variant page
    if (variant === 'b') {
      return NextResponse.rewrite(new URL('/variantb', request.url));
    }
  }
  
  return NextResponse.next();
}
```

Then create `/src/app/variantb/page.tsx`:
```typescript
export { default } from '../page-variantb';
```

### Option 2: Manual Testing (Quick Start)

Just deploy one variant at a time:

1. **Test Variant A first:**
   ```bash
   cp src/app/page-v2.tsx src/app/page.tsx
   git add src/app/page.tsx
   git commit -m "Test: Variant A - Never Lose a Customer"
   vercel --prod
   ```

2. **Monitor for 7 days**, then switch to Variant B:
   ```bash
   cp src/app/page-variantb.tsx src/app/page.tsx
   git add src/app/page.tsx
   git commit -m "Test: Variant B - Recover Failed Payments"
   vercel --prod
   ```

3. **Monitor for 7 days**, compare results

### Option 3: Analytics Platform

Use PostHog, Google Optimize, or similar:
- Upload both variants
- Set 50/50 traffic split
- Track conversion events: signups, clicks, scroll depth
- Run for minimum 2 weeks

## Metrics to Track

**Primary:**
- Signup conversion rate
- Click-through rate on primary CTA

**Secondary:**
- Time on page
- Scroll depth (did they read features?)
- Bounce rate

**Target:**
- Minimum 200 visitors per variant for statistical significance
- >95% confidence level before declaring winner

## Expected Outcomes

**Variant A ("Never Lose a Customer"):**
- Emotional appeal
- May resonate more with founders worried about customer retention
- Could perform better with B2C SaaS

**Variant B ("Recover Failed Payments"):**
- Practical/action-oriented
- May resonate more with data-driven founders
- Could perform better with B2B SaaS

## Next Steps

1. Choose deployment method (Option 1, 2, or 3)
2. Deploy both variants
3. Run test for minimum 14 days
4. Analyze results
5. Ship winning variant as production `src/app/page.tsx`
6. Archive losing variant

## Rollback

To revert to original copy:
```bash
git checkout HEAD~1 src/app/page.tsx
```

Original copy is preserved in git history.

---
Created: Feb 27, 2026  
Status: Ready to deploy  
Test Duration: 14 days recommended  
Decision: Pending test results
