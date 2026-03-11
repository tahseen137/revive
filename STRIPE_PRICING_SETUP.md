# Revive Pro Tier - Stripe Product & Price Setup

**Created:** March 11, 2026  
**Status:** Ready for implementation  
**Pricing Structure:** Free / Indie $29 / Pro $99

---

## Overview

This document provides step-by-step instructions for setting up Revive's 3-tier pricing structure in Stripe.

**Pricing Tiers:**
- **Free:** $0 (up to $500/mo recovered)
- **Indie:** $29/mo or $290/year (16% discount)
- **Pro:** $99/mo or $990/year (16% discount)

---

## Part 1: Stripe Dashboard Setup

### Step 1: Create Indie Tier Product

1. Go to **Stripe Dashboard** → **Products** → **Add Product**
2. Fill in product details:
   - **Name:** `Revive Indie`
   - **Description:** `Unlimited churn recovery for indie hackers. No revenue share, no setup fees.`
   - **Statement descriptor:** `REVIVE INDIE` (appears on customer credit card statements)
   - **Unit label:** Leave blank
   - **Image:** Upload Revive logo (optional)

3. Click **Add pricing**:
   
   **Monthly Price:**
   - **Price:** `$29.00 USD`
   - **Billing period:** `Monthly`
   - **Price description:** `Indie - Monthly`
   - **Usage type:** `Licensed` (per seat/user)
   - **Price ID:** Will be auto-generated (e.g., `price_1ABC...`) — **copy this for later**
   
   Click **Add price**

4. Click **Add another price** for annual:
   
   **Annual Price:**
   - **Price:** `$290.00 USD`
   - **Billing period:** `Yearly`
   - **Price description:** `Indie - Annual (Save $58)`
   - **Usage type:** `Licensed`
   - **Price ID:** Will be auto-generated — **copy this for later**
   
   Click **Add price**

5. Click **Save product**

6. **Copy the Product ID** (e.g., `prod_1ABC...`) — you'll need this for webhooks

---

### Step 2: Create Pro Tier Product

1. Go to **Stripe Dashboard** → **Products** → **Add Product**
2. Fill in product details:
   - **Name:** `Revive Pro`
   - **Description:** `AI-powered churn recovery for growing teams. A/B testing, advanced analytics, team access.`
   - **Statement descriptor:** `REVIVE PRO`
   - **Unit label:** Leave blank
   - **Image:** Upload Revive logo (optional)

3. Click **Add pricing**:
   
   **Monthly Price:**
   - **Price:** `$99.00 USD`
   - **Billing period:** `Monthly`
   - **Price description:** `Pro - Monthly`
   - **Usage type:** `Licensed`
   - **Price ID:** Will be auto-generated — **copy this for later**
   
   Click **Add price**

4. Click **Add another price** for annual:
   
   **Annual Price:**
   - **Price:** `$990.00 USD`
   - **Billing period:** `Yearly`
   - **Price description:** `Pro - Annual (Save $198)`
   - **Usage type:** `Licensed`
   - **Price ID:** Will be auto-generated — **copy this for later**
   
   Click **Add price**

5. Click **Save product**

6. **Copy the Product ID** — you'll need this for webhooks

---

### Step 3: Configure Tax Collection (Optional but Recommended)

1. Go to **Stripe Dashboard** → **Settings** → **Tax**
2. Enable **Stripe Tax** (automatic tax calculation for US states, EU VAT, etc.)
3. Select regions where you have tax obligations
4. For indie SaaS, typical setup:
   - **US:** Sales tax in states where you have economic nexus
   - **EU:** VAT for digital services (if revenue > €10K/year in EU)
   - **Canada:** GST/HST (if applicable)

**Why this matters:** Avoids manual tax calculations and ensures compliance.

---

### Step 4: Set Up Customer Portal

1. Go to **Stripe Dashboard** → **Settings** → **Billing** → **Customer Portal**
2. Enable the following features:
   - ✅ **Invoices** (let customers view past invoices)
   - ✅ **Update payment method** (critical for dunning recovery!)
   - ✅ **Cancel subscription** (required by law in many regions)
   - ✅ **Update billing info** (address, email, etc.)
3. Configure cancellation flow:
   - **Cancellation behavior:** `Immediately` (no proration for simplicity)
   - **Survey:** Add exit survey (optional): "Why are you canceling?" (helps track churn reasons)
4. **Branding:**
   - Upload Revive logo
   - Set primary color to brand color (e.g., `#6366f1` for brand-600)
5. Click **Save**

**Copy the Customer Portal URL** (e.g., `https://billing.stripe.com/p/login/abc123`) — you'll link to this in the Revive dashboard.

---

### Step 5: Configure Billing Settings

1. Go to **Stripe Dashboard** → **Settings** → **Billing**
2. Set the following:
   
   **Invoice settings:**
   - **Default payment terms:** `Due on receipt`
   - **Invoice memo:** (optional) "Thank you for supporting Revive!"
   - **Email invoices:** ✅ Enabled (Stripe emails invoices automatically)
   
   **Failed payment settings:**
   - **Smart retries:** ✅ Enabled (Stripe's built-in retry logic)
   - **Email customers:** ✅ Enabled (Stripe sends dunning emails)
   - **Number of retry attempts:** `4` (default is good)
   - **Retry schedule:** Use Stripe's default (4 attempts over 3 weeks)
   
   **Note:** Revive's dunning engine will layer on top of Stripe's native retries for optimal recovery.

3. Click **Save**

---

## Part 2: Environment Variables

Add the following to your `.env.local` file (for local dev) and Vercel environment variables (for production):

```bash
# Stripe API Keys
STRIPE_SECRET_KEY=sk_test_... # Or sk_live_... for production
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... # Or pk_live_... for production

# Stripe Webhook Secret (from Step 6 below)
STRIPE_WEBHOOK_SECRET=whsec_...

# Indie Tier Price IDs
NEXT_PUBLIC_STRIPE_PRICE_INDIE_MONTHLY=price_1ABC... # From Step 1
NEXT_PUBLIC_STRIPE_PRICE_INDIE_ANNUAL=price_1XYZ... # From Step 1

# Pro Tier Price IDs
NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY=price_1DEF... # From Step 2
NEXT_PUBLIC_STRIPE_PRICE_PRO_ANNUAL=price_1UVW... # From Step 2

# Indie Product ID
STRIPE_PRODUCT_INDIE=prod_1ABC... # From Step 1

# Pro Product ID
STRIPE_PRODUCT_PRO=prod_1DEF... # From Step 2

# Customer Portal URL
STRIPE_CUSTOMER_PORTAL_URL=https://billing.stripe.com/p/login/abc123 # From Step 4
```

**For Vercel:**
1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Add each variable above for **Production**, **Preview**, and **Development** environments
3. Click **Save**

---

## Part 3: Webhook Setup

### Step 6: Create Webhook Endpoint

1. Go to **Stripe Dashboard** → **Developers** → **Webhooks**
2. Click **Add endpoint**
3. **Endpoint URL:**
   - **Production:** `https://revive-hq.com/api/webhooks/stripe`
   - **Development:** Use Stripe CLI for local testing (see below)
4. **Description:** `Revive subscription webhooks`
5. **Events to send:** Select the following events:
   
   **Checkout & Subscription:**
   - ✅ `checkout.session.completed` (new subscription created)
   - ✅ `customer.subscription.created`
   - ✅ `customer.subscription.updated` (plan changed, renewed, etc.)
   - ✅ `customer.subscription.deleted` (canceled)
   
   **Payments:**
   - ✅ `invoice.payment_succeeded` (successful payment)
   - ✅ `invoice.payment_failed` (failed payment — triggers dunning)
   - ✅ `payment_intent.succeeded`
   - ✅ `payment_intent.payment_failed`
   
   **Customer:**
   - ✅ `customer.updated` (email/address change)
   - ✅ `customer.deleted`

6. Click **Add endpoint**
7. **Copy the Webhook Signing Secret** (starts with `whsec_...`) — add this to your `.env.local` as `STRIPE_WEBHOOK_SECRET`

---

### Step 7: Test Webhooks Locally (Development)

1. Install **Stripe CLI** (if not already installed):
   ```bash
   brew install stripe/stripe-cli/stripe
   ```

2. Login to Stripe:
   ```bash
   stripe login
   ```

3. Forward webhooks to your local dev server:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
   
   **Copy the webhook signing secret** from the output (starts with `whsec_...`) and add to `.env.local`:
   ```bash
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

4. Trigger test events:
   ```bash
   stripe trigger checkout.session.completed
   stripe trigger invoice.payment_succeeded
   stripe trigger invoice.payment_failed
   ```

5. Check your local logs to confirm webhooks are being received.

---

## Part 4: Backend Implementation Checklist

### Database Schema

Ensure your database has a `subscriptions` table (or similar) with these fields:

```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT UNIQUE NOT NULL,
  stripe_subscription_id TEXT UNIQUE,
  stripe_price_id TEXT, -- e.g., price_1ABC...
  tier TEXT NOT NULL CHECK (tier IN ('free', 'indie', 'pro')),
  status TEXT NOT NULL CHECK (status IN ('active', 'past_due', 'canceled', 'trialing')),
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  recovered_this_month NUMERIC(10, 2) DEFAULT 0, -- Track free tier usage
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for fast lookups
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_customer_id ON subscriptions(stripe_customer_id);
CREATE INDEX idx_subscriptions_tier ON subscriptions(tier);
```

---

### API Routes to Implement

#### 1. `/api/checkout` (Create Checkout Session)

**Purpose:** Redirect users to Stripe Checkout when they click "Start Indie Plan" or "Start Pro Plan"

**Implementation:**

```typescript
// src/app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getServerSession } from 'next-auth';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { priceId } = await req.json();

    // Validate priceId
    const validPriceIds = [
      process.env.NEXT_PUBLIC_STRIPE_PRICE_INDIE_MONTHLY,
      process.env.NEXT_PUBLIC_STRIPE_PRICE_INDIE_ANNUAL,
      process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY,
      process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_ANNUAL,
    ];

    if (!validPriceIds.includes(priceId)) {
      return NextResponse.json({ error: 'Invalid price ID' }, { status: 400 });
    }

    // Get or create Stripe customer
    let customerId = session.user.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: session.user.email,
        metadata: { userId: session.user.id },
      });
      customerId = customer.id;
      // TODO: Update user record with customerId
    }

    // Create checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?checkout=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing?checkout=canceled`,
      allow_promotion_codes: true, // Allow discount codes
      billing_address_collection: 'auto',
      customer_update: {
        address: 'auto', // Update customer address from checkout
      },
      metadata: {
        userId: session.user.id,
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
```

---

#### 2. `/api/webhooks/stripe` (Handle Stripe Events)

**Purpose:** Process subscription events (creation, updates, cancellations, payment failures)

**Implementation:**

```typescript
// src/app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdate(subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentSucceeded(invoice);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(invoice);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  // TODO: Create subscription record in database
  const customerId = session.customer as string;
  const subscriptionId = session.subscription as string;
  const userId = session.metadata?.userId;

  console.log('Checkout completed:', { customerId, subscriptionId, userId });
  // Implement database update logic here
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  // TODO: Update subscription record in database
  const priceId = subscription.items.data[0]?.price.id;
  const tier = getPriceTier(priceId);
  const status = subscription.status;

  console.log('Subscription updated:', {
    subscriptionId: subscription.id,
    tier,
    status,
  });
  // Implement database update logic here
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  // TODO: Mark subscription as canceled in database
  console.log('Subscription deleted:', subscription.id);
  // Implement database update logic here
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  // TODO: Reset free tier usage counter, send thank you email
  console.log('Payment succeeded:', invoice.id);
  // Implement logic here
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  // TODO: Trigger Revive dunning sequence (this is Revive's core feature!)
  console.log('Payment failed:', invoice.id);
  // Implement dunning trigger logic here
}

function getPriceTier(priceId: string): 'indie' | 'pro' {
  const indiePrices = [
    process.env.NEXT_PUBLIC_STRIPE_PRICE_INDIE_MONTHLY,
    process.env.NEXT_PUBLIC_STRIPE_PRICE_INDIE_ANNUAL,
  ];
  const proPrices = [
    process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY,
    process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_ANNUAL,
  ];

  if (indiePrices.includes(priceId)) return 'indie';
  if (proPrices.includes(priceId)) return 'pro';
  
  throw new Error(`Unknown price ID: ${priceId}`);
}
```

---

#### 3. `/api/billing/portal` (Customer Portal Redirect)

**Purpose:** Let users manage their subscription (update payment method, cancel, view invoices)

**Implementation:**

```typescript
// src/app/api/billing/portal/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getServerSession } from 'next-auth';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.stripeCustomerId) {
      return NextResponse.json({ error: 'No subscription found' }, { status: 400 });
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: session.user.stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    console.error('Portal session error:', error);
    return NextResponse.json(
      { error: 'Failed to create portal session' },
      { status: 500 }
    );
  }
}
```

---

## Part 5: Feature Gating Implementation

Use the `feature-gates.ts` utility (already created at `/src/lib/feature-gates.ts`) to gate Pro features:

### Example: Gating A/B Testing Feature

```typescript
// src/app/dashboard/ab-testing/page.tsx
import { hasFeature } from '@/lib/feature-gates';
import { getUserSubscription } from '@/lib/subscription'; // Implement this

export default async function ABTestingPage() {
  const subscription = await getUserSubscription();
  
  if (!hasFeature(subscription, 'AB_TESTING')) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">A/B Testing</h1>
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <p className="text-yellow-400 font-medium mb-2">Pro Feature</p>
          <p className="text-zinc-400 mb-4">
            A/B testing for dunning sequences is available on the Pro plan ($99/mo).
          </p>
          <Link
            href="/pricing"
            className="inline-block bg-brand-600 hover:bg-brand-500 text-white px-6 py-2 rounded-lg"
          >
            Upgrade to Pro
          </Link>
        </div>
      </div>
    );
  }
  
  // Render A/B testing UI for Pro users
  return <ABTestingDashboard />;
}
```

### Example: Limiting Team Seats

```typescript
// src/app/dashboard/team/page.tsx
import { getTeamSeatsLimit } from '@/lib/feature-gates';

export default async function TeamPage() {
  const subscription = await getUserSubscription();
  const teamMembers = await getTeamMembers();
  const seatsLimit = getTeamSeatsLimit(subscription);
  
  const canAddMember = teamMembers.length < seatsLimit;
  
  return (
    <div>
      <h1>Team Members ({teamMembers.length}/{seatsLimit})</h1>
      {!canAddMember && (
        <p className="text-yellow-400">
          You&apos;ve reached your team member limit. Upgrade to Pro for 5 seats.
        </p>
      )}
      {/* Render team members list */}
    </div>
  );
}
```

---

## Part 6: Testing Checklist

### Pre-Launch Testing

- [ ] **Test Free → Indie upgrade flow**
  - Start with free account
  - Hit $500 recovery limit
  - Click upgrade prompt
  - Complete Stripe Checkout
  - Verify subscription is active
  - Verify unlimited recovery unlocked

- [ ] **Test Indie → Pro upgrade flow**
  - Start with Indie subscription
  - Click "Upgrade to Pro" in dashboard
  - Complete Stripe Checkout
  - Verify Pro features unlocked (A/B testing, team access, etc.)

- [ ] **Test payment failure scenario**
  - Use Stripe test card `4000000000000341` (payment fails)
  - Verify webhook received
  - Verify dunning email triggered

- [ ] **Test subscription cancellation**
  - Go to Customer Portal
  - Cancel subscription
  - Verify webhook received
  - Verify access reverted to Free tier

- [ ] **Test annual billing**
  - Subscribe to Indie Annual ($290/year)
  - Verify $290 charged (not $29)
  - Verify next billing date is 1 year away

---

## Part 7: Launch Day Checklist

### Before Launch

- [ ] Replace Stripe test keys with live keys in Vercel environment variables
- [ ] Update webhook endpoint URL to production domain
- [ ] Test one live transaction with a real credit card (use your own)
- [ ] Verify live webhook is being received
- [ ] Set up monitoring for webhook failures (e.g., Sentry, LogRocket)
- [ ] Enable Stripe Radar (fraud prevention) — it's free
- [ ] Review Stripe Tax settings (ensure compliance)

### Post-Launch Monitoring

- [ ] **Day 1:** Check first 10 subscriptions manually (verify tiers are correct)
- [ ] **Week 1:** Monitor webhook success rate (aim for >99%)
- [ ] **Week 2:** Check for any failed payments (should be <5% for new subscriptions)
- [ ] **Month 1:** Review MRR in Stripe Dashboard vs. internal database (should match)

---

## Part 8: Troubleshooting

### Common Issues

**Issue:** Webhook not being received  
**Fix:**
1. Check Stripe Dashboard → Webhooks → View logs
2. Verify endpoint URL is correct
3. Check webhook signing secret is correct in `.env`
4. Ensure endpoint returns 200 OK within 10 seconds

**Issue:** Customer charged wrong amount  
**Fix:**
1. Check price ID in checkout session (should match monthly/annual)
2. Verify Stripe Tax is configured correctly (if applicable)
3. Issue refund via Stripe Dashboard if needed

**Issue:** Free tier user not prompted to upgrade at $500  
**Fix:**
1. Check `recovered_this_month` calculation in database
2. Ensure `shouldPromptUpgrade()` logic is being called in dashboard
3. Verify upgrade prompt UI is rendering

---

## Part 9: Revenue Projections

### Conservative Estimates (First 90 Days)

**Assumptions:**
- 100 Free tier signups
- 30% Free → Indie conversion (30 Indie customers)
- 15% Indie → Pro conversion (5 Pro customers)

**MRR:**
- Indie: 30 × $29 = $870/mo
- Pro: 5 × $99 = $495/mo
- **Total MRR:** $1,365/mo

**ARR:** $16,380/year

### Growth Target (6 Months)

**Assumptions:**
- 500 Free tier signups
- 35% Free → Indie conversion (175 Indie customers)
- 20% Indie → Pro conversion (35 Pro customers)

**MRR:**
- Indie: 175 × $29 = $5,075/mo
- Pro: 35 × $99 = $3,465/mo
- **Total MRR:** $8,540/mo

**ARR:** $102,480/year

---

## Questions?

If you hit issues during setup, check:
1. Stripe API logs: https://dashboard.stripe.com/logs
2. Webhook delivery logs: https://dashboard.stripe.com/webhooks
3. Revive docs: /docs (to be created)
4. Email support: support@revive-hq.com

---

**Document version:** 1.0  
**Last updated:** March 11, 2026  
**Next review:** After first 10 paying customers
