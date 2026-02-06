# Hackathon Features - Card Update Portal & Pre-Dunning System

**Built:** February 5, 2026  
**Status:** ✅ Complete & Deployed

## Overview

Three critical features built for Revive's payment recovery system:

1. **Card Update Portal** - Customer-facing card update page
2. **Pre-Dunning System** - Proactive expiring card notifications
3. **Pricing Cap** - $99/mo cap displayed on Growth tier

---

## Feature 1: Card Update Portal

### What It Does
A secure, mobile-first page where customers can update their payment method directly using Stripe Elements.

### Implementation
- **Route:** `/update-card/[token]`
- **Token-based access:** HMAC-signed URLs with 7-day expiry
- **Client-side card collection:** Stripe.js with CardElement
- **Automatic retry:** After card update, automatically retries the failed invoice
- **Mobile-optimized:** Responsive design for mobile dunning emails

### Files Created
- `src/app/update-card/[token]/page.tsx` - Customer-facing card update UI
- `src/app/api/update-card/route.ts` - Payment method update & invoice retry
- `src/app/api/update-card/validate/route.ts` - Token validation & payment details

### Security Features
- HMAC token validation (CARD_UPDATE_SECRET)
- 7-day token expiry
- Stripe.js client-side tokenization (PCI-compliant)
- No card data stored on server

### User Flow
1. Customer receives dunning email with secure link
2. Clicks link → lands on branded card update page
3. Sees amount due, failure reason, and company name
4. Enters new card details (secured by Stripe Elements)
5. Card is attached to customer & set as default
6. Invoice is automatically retried
7. Success message + redirect

---

## Feature 2: Pre-Dunning System

### What It Does
Proactively detects cards expiring within 7 days and sends friendly warning emails to prevent failed payments.

### Implementation
- **Endpoint:** `/api/cron/check-expiring-cards`
- **Schedule:** Daily at 8:00 AM UTC
- **Notification tracking:** Prevents duplicate emails within 7 days
- **Email tone:** Warm, helpful, non-threatening

### Files Created
- `src/app/api/cron/check-expiring-cards/route.ts` - Cron endpoint

### How It Works
1. Daily cron job queries Stripe for all customers
2. Checks payment methods for cards expiring within 7 days
3. Filters out recently-notified customers (no spam)
4. Sends friendly "heads up" email with card update link
5. Records notification timestamp to prevent duplicates

### Email Template
- Subject: "Heads up: Your card ending in •••• expires soon"
- Tone: Friendly reminder, not urgent
- Includes: Card last 4, expiry date, update link
- Clarifies: No payment has failed yet

### Cron Configuration
Added to `vercel.json`:
```json
{
  "path": "/api/cron/check-expiring-cards",
  "schedule": "0 8 * * *"
}
```

---

## Feature 3: Pricing Cap

### What It Does
Displays "$99/mo cap" on the Growth tier pricing to clarify the maximum monthly charge.

### Implementation
Updated `src/app/pricing/page.tsx`:
- Description: "For SaaS companies serious about reducing churn (max $99/mo)"
- Badge under price: "Capped at $99/month" in green

### User Benefit
Clear pricing transparency - customers know the maximum they'll pay even as recovered revenue grows.

---

## Technical Details

### Environment Variables
Added to `.env.local`:
```bash
CARD_UPDATE_SECRET=revive_card_update_hmac_secret_2026_change_in_production
```

### Dependencies Installed
- `@stripe/react-stripe-js` - Stripe React components

### Database Changes
- Exported `get()` and `set()` functions from `src/lib/db.ts`
- New key: `expiring_card_notifications` - tracks pre-dunning sent

### Email Service Updates
- Updated `src/lib/email-service.ts` to use new card update portal URL

---

## Testing Checklist

### Card Update Portal
- [x] Token validation (valid & invalid tokens)
- [x] Payment details display correctly
- [x] Stripe Elements load and accept card input
- [x] Card update + invoice retry flow
- [x] Success & error states
- [x] Mobile responsive design

### Pre-Dunning System
- [x] Cron endpoint protected by CRON_SECRET
- [x] Queries Stripe for expiring cards
- [x] Sends emails via Resend
- [x] Tracks notifications to prevent duplicates
- [x] Handles errors gracefully

### Pricing Cap
- [x] Cap displayed on Growth tier
- [x] Mobile responsive
- [x] Matches brand styling

---

## Production Deployment Notes

### Vercel Environment Variables
Add to Vercel project settings:
1. `CARD_UPDATE_SECRET` - Generate a strong random secret
2. `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Already set
3. `CRON_SECRET` - For cron endpoint authentication

### Vercel Cron Jobs
Both cron jobs configured in `vercel.json`:
- Payment retry: 9:00 AM UTC daily
- Expiring cards check: 8:00 AM UTC daily

### Email Configuration
Ensure Resend is configured:
- `RESEND_API_KEY` - Valid API key
- `RESEND_FROM_EMAIL` - Verified sender

---

## Success Metrics

### Expected Impact
- **Card Update Portal:** 30-50% of dunning recipients update cards immediately
- **Pre-Dunning System:** 10-20% reduction in card-declined failures
- **Pricing Cap:** Increased trust & conversion on pricing page

### Monitoring
Track in dashboard:
- Card update portal usage (token validations)
- Pre-dunning emails sent & opened
- Recovered payments after card updates

---

## Future Enhancements

### Short-term
- [ ] Add business logo to card update portal (from connected account)
- [ ] Track card update conversion rates
- [ ] A/B test pre-dunning email copy

### Medium-term
- [ ] SMS pre-dunning for high-value customers
- [ ] Expiring card reminders at 30 days (earlier warning)
- [ ] Auto-update expired cards via Stripe Network Tokens

### Long-term
- [ ] Machine learning to predict which customers need pre-dunning most
- [ ] Multi-language support for global customers

---

## Resources

- **Stripe Elements Docs:** https://stripe.com/docs/stripe-js
- **HMAC Token Security:** Built-in to `src/lib/auth.ts`
- **Vercel Cron:** https://vercel.com/docs/cron-jobs

---

**Built with ❤️ for the Revive Hackathon**
