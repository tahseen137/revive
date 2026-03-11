# Building Payment Recovery with Stripe Webhooks: A Complete Guide

*15 min read · Developer Guide*

At $10K MRR, roughly $900/mo is disappearing because of failed payments. Not churned — just failed. Cards expire, banks block charges, funds run low at the wrong moment. Most of that revenue is recoverable.

This guide shows you how to build a complete payment recovery system using Stripe webhooks — from listening to the right events to implementing retry logic and dunning email sequences. By the end, you'll have something that recovers 40-60% of failed payments automatically.

I'll use Node.js throughout, but the concepts translate to any backend.

---

## The events that matter

Stripe fires dozens of webhook events. For payment recovery, you need these:

```
invoice.payment_failed         — A subscription invoice failed to pay
invoice.payment_action_required — 3DS authentication required
customer.subscription.deleted  — Subscription was canceled
customer.subscription.updated  — Subscription status changed
charge.failed                  — A one-time charge failed
payment_intent.payment_failed  — PaymentIntent failed
```

The most important one by far is `invoice.payment_failed`. This fires every time Stripe tries and fails to charge a subscription invoice. That's your entry point.

`charge.failed` covers one-time payments. If you're only doing subscriptions, you can ignore it for now — but it's worth handling eventually.

---

## Setting up the webhook endpoint

First, install the Stripe library and a web framework if you don't have one:

```bash
npm install stripe express
```

Create your webhook handler:

```javascript
// webhooks/stripe.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const router = express.Router();

// Raw body needed for webhook signature verification
router.post('/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  try {
    await handleStripeEvent(event);
    res.json({ received: true });
  } catch (err) {
    console.error('Error handling event:', err);
    // Still return 200 so Stripe doesn't retry for app logic errors
    res.json({ received: true, warning: err.message });
  }
});

async function handleStripeEvent(event) {
  switch (event.type) {
    case 'invoice.payment_failed':
      await handlePaymentFailed(event.data.object);
      break;
    case 'invoice.payment_succeeded':
      await handlePaymentSucceeded(event.data.object);
      break;
    case 'customer.subscription.deleted':
      await handleSubscriptionDeleted(event.data.object);
      break;
    default:
      // Ignore events we don't handle
      break;
  }
}

module.exports = router;
```

A few things worth noting here: the `express.raw()` middleware is critical — signature verification requires the raw request body, not the parsed JSON. If you get 400 errors on valid requests, this is usually why.

Also, we're returning 200 even when our app logic fails. That's intentional. If your database is temporarily down and you return a 500, Stripe will retry the webhook, and you might process the same event twice. Better to log the error and handle retries yourself.

---

## The payment failed handler — this is where the work happens

```javascript
// handlers/paymentFailed.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const db = require('../database'); // your database client
const email = require('../email'); // your email service
const queue = require('../queue'); // your job queue

async function handlePaymentFailed(invoice) {
  const customerId = invoice.customer;
  const subscriptionId = invoice.subscription;
  const amount = invoice.amount_due; // in cents
  const currency = invoice.currency;
  
  // Get the payment intent to check decline code
  const paymentIntent = invoice.payment_intent 
    ? await stripe.paymentIntents.retrieve(invoice.payment_intent)
    : null;
  
  const declineCode = paymentIntent?.last_payment_error?.decline_code || 'unknown';
  const declineMessage = paymentIntent?.last_payment_error?.message || '';
  
  // Get attempt count from invoice
  const attemptCount = invoice.attempt_count || 1;
  
  console.log(`Payment failed: customer=${customerId}, attempt=${attemptCount}, code=${declineCode}`);
  
  // Record the failure in your database
  const failedPayment = await db.failedPayments.upsert({
    stripeInvoiceId: invoice.id,
    stripeCustomerId: customerId,
    stripeSubscriptionId: subscriptionId,
    amount,
    currency,
    declineCode,
    attemptCount,
    status: 'failed',
    lastFailedAt: new Date(),
  });
  
  // Look up the customer in your database
  const customer = await db.customers.findByStripeId(customerId);
  
  if (!customer) {
    console.warn(`No customer found for Stripe ID: ${customerId}`);
    return;
  }
  
  // Determine what to do based on decline code and attempt count
  const action = determineRecoveryAction(declineCode, attemptCount);
  
  switch (action.type) {
    case 'retry_soon':
      // Schedule a retry (e.g., card_declined soft decline)
      await scheduleRetry(invoice, customer, action.delayHours);
      break;
    case 'retry_later':
      // Schedule a retry for later (e.g., insufficient_funds — wait for payday)
      await scheduleRetry(invoice, customer, action.delayHours);
      break;
    case 'send_email_only':
      // Hard decline — can't retry, just email
      await sendDunningEmail(customer, invoice, declineCode, attemptCount);
      break;
    case 'escalate':
      // Too many attempts — final warning
      await sendFinalWarning(customer, invoice);
      break;
  }
}
```

---

## Decline code routing — the part most people skip

This is where recovery rates diverge. Treating all failures the same means treating "card expired" the same as "do not honor" — which are completely different situations.

```javascript
function determineRecoveryAction(declineCode, attemptCount) {
  // Give up after 4 attempts regardless
  if (attemptCount >= 4) {
    return { type: 'escalate' };
  }
  
  switch (declineCode) {
    // Soft declines — card should accept a retry soon
    case 'do_not_honor':
    case 'generic_decline':
    case 'transaction_not_allowed':
      // Retry after 4-6 hours (bank may have temporarily blocked)
      return { type: 'retry_soon', delayHours: 4 + Math.random() * 2 };
    
    // Insufficient funds — wait for payday timing
    case 'insufficient_funds':
    case 'withdrawal_count_limit_exceeded':
      // Retry on day 3 and day 7 (payday-aware schedule)
      return { 
        type: 'retry_later', 
        delayHours: attemptCount === 1 ? 72 : 168 
      };
    
    // Card issues — need customer action, but might retry once
    case 'card_velocity_exceeded':
    case 'new_account_information_available':
      return { type: 'retry_soon', delayHours: 24 };
    
    // Hard declines — card updater or customer action required
    case 'card_declined':
    case 'lost_card':
    case 'stolen_card':
    case 'pickup_card':
    case 'restricted_card':
      return { type: 'send_email_only' };
    
    // Card expired — email with update link, no retry
    case 'expired_card':
      return { type: 'send_email_only' };
    
    // Unknown — try once more after a few hours
    default:
      return { type: 'retry_soon', delayHours: attemptCount === 1 ? 6 : 48 };
  }
}
```

The jitter on retry timing (`Math.random() * 2`) is intentional. If you have many customers on the same billing cycle, retrying all of them at exactly 4 hours means a burst of charges hitting the same time. Spreading them out is gentler on everyone.

---

## Scheduling retries

You'll need a job queue for this. Bull, BullMQ, or a simple database-backed scheduler all work. Here's the pattern with BullMQ:

```javascript
// queue/retryQueue.js
const { Queue, Worker } = require('bullmq');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { sendDunningEmail } = require('../email/dunning');

const retryQueue = new Queue('payment-retries', {
  connection: { host: 'localhost', port: 6379 } // Redis connection
});

// Schedule a retry
async function scheduleRetry(invoice, customer, delayHours) {
  const delayMs = delayHours * 60 * 60 * 1000;
  
  await retryQueue.add('retry-payment', {
    invoiceId: invoice.id,
    customerId: customer.id,
    stripeCustomerId: invoice.customer,
    email: customer.email,
    attemptCount: invoice.attempt_count,
  }, {
    delay: delayMs,
    attempts: 1, // BullMQ attempts, not payment attempts
    backoff: { type: 'fixed', delay: 5000 }
  });
  
  console.log(`Retry scheduled for invoice ${invoice.id} in ${delayHours}h`);
  
  // Send the initial dunning email while we wait
  await sendDunningEmail(customer, invoice, invoice.payment_intent?.last_payment_error?.decline_code);
}

// Process retries
const retryWorker = new Worker('payment-retries', async (job) => {
  const { invoiceId, stripeCustomerId, email, attemptCount } = job.data;
  
  console.log(`Attempting retry for invoice ${invoiceId}, attempt ${attemptCount + 1}`);
  
  try {
    // Retry the invoice payment
    const invoice = await stripe.invoices.pay(invoiceId, {
      forgive: false // Don't forgive — we want to know if this fails too
    });
    
    if (invoice.status === 'paid') {
      console.log(`Invoice ${invoiceId} paid successfully on retry`);
      // Payment succeeded — handled by invoice.payment_succeeded webhook
    }
  } catch (err) {
    // Payment failed again — webhook will fire and handle it
    console.log(`Retry failed for ${invoiceId}: ${err.message}`);
  }
}, {
  connection: { host: 'localhost', port: 6379 }
});

module.exports = { scheduleRetry };
```

The important thing here: the actual payment failure handling still happens through the webhook. When `stripe.invoices.pay()` fails, Stripe fires another `invoice.payment_failed` event, and your handler processes it again with the updated attempt count. This keeps your logic centralized.

---

## Generating one-click payment update links

This is the piece that most DIY dunning setups miss, and it's worth the effort. Instead of asking customers to log in and navigate to billing settings, generate a Stripe Billing Portal session:

```javascript
// utils/paymentUpdateLink.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function generatePaymentUpdateLink(stripeCustomerId, returnUrl) {
  const session = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: returnUrl || 'https://yoursaas.com/billing',
  });
  
  return session.url;
}

// Or use Stripe Checkout in setup mode for card capture only
async function generateCardUpdateLink(stripeCustomerId, returnUrl) {
  const session = await stripe.checkout.sessions.create({
    mode: 'setup',
    customer: stripeCustomerId,
    payment_method_types: ['card'],
    success_url: returnUrl + '?payment=updated',
    cancel_url: returnUrl,
  });
  
  return session.url;
}

module.exports = { generatePaymentUpdateLink, generateCardUpdateLink };
```

The Billing Portal URL expires after 5 minutes of inactivity, so generate it fresh when you send each email rather than storing it.

---

## The dunning email sender

Putting it together with email delivery (using Resend here, but any transactional email service works):

```javascript
// email/dunning.js
const { Resend } = require('resend');
const { generatePaymentUpdateLink } = require('../utils/paymentUpdateLink');

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendDunningEmail(customer, invoice, declineCode, attemptCount = 1) {
  const updateUrl = await generatePaymentUpdateLink(
    customer.stripeId,
    'https://yoursaas.com/billing'
  );
  
  const emailConfig = getDunningEmailConfig(declineCode, attemptCount, {
    customerName: customer.firstName || customer.email.split('@')[0],
    productName: 'YourSaaS',
    updateUrl,
    amount: formatAmount(invoice.amount_due, invoice.currency),
    lastFour: customer.cardLastFour,
    cardExpiry: customer.cardExpiry,
  });
  
  await resend.emails.send({
    from: 'billing@yoursaas.com',
    to: customer.email,
    replyTo: 'support@yoursaas.com',
    subject: emailConfig.subject,
    html: emailConfig.html,
  });
  
  console.log(`Dunning email sent to ${customer.email} (${declineCode}, attempt ${attemptCount})`);
}

function getDunningEmailConfig(declineCode, attemptCount, vars) {
  const { customerName, productName, updateUrl, amount, lastFour, cardExpiry } = vars;
  
  // Expired card — specific messaging
  if (declineCode === 'expired_card') {
    return {
      subject: `Your card expired — quick fix for ${productName}`,
      html: `
        <p>Hi ${customerName},</p>
        <p>Looks like the card on file for ${productName} expired recently 
           (•••• ${lastFour}, expired ${cardExpiry}). Easy fix:</p>
        <p><a href="${updateUrl}" style="background:#6d28d9;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block">
          Update Payment Method →
        </a></p>
        <p style="color:#71717a;font-size:14px">Takes about 60 seconds. 
          Questions? Just reply to this email.</p>
      `
    };
  }
  
  // Insufficient funds — be gentle, offer retry
  if (declineCode === 'insufficient_funds') {
    return {
      subject: `${productName} payment — we'll retry in 3 days`,
      html: `
        <p>Hi ${customerName},</p>
        <p>We tried to process ${amount} for ${productName} today but the card showed 
           insufficient funds. We'll automatically retry in 3 days.</p>
        <p>If you'd rather take care of it now or use a different card:</p>
        <p><a href="${updateUrl}" style="background:#6d28d9;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block">
          Update Payment Method
        </a></p>
        <p style="color:#71717a;font-size:14px">Your account stays active while we sort this out.</p>
      `
    };
  }
  
  // Final warning (attempt 3+)
  if (attemptCount >= 3) {
    return {
      subject: `${productName} — account pauses soon`,
      html: `
        <p>Hi ${customerName},</p>
        <p>We've tried a few times to process your ${productName} payment without success. 
           We'll need to pause your account within a couple days.</p>
        <p>Your data stays safe for 30 days — you can reactivate anytime:</p>
        <p><a href="${updateUrl}" style="background:#dc2626;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block">
          Update Payment Now
        </a></p>
        <p style="color:#71717a;font-size:14px">If you meant to cancel, you don't need to do anything.</p>
      `
    };
  }
  
  // Generic first-attempt
  return {
    subject: `Quick heads-up about your ${productName} account`,
    html: `
      <p>Hi ${customerName},</p>
      <p>We had trouble processing your payment for ${productName} today. 
         Usually happens when a card expires or needs updating.</p>
      <p><a href="${updateUrl}" style="background:#6d28d9;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block">
        Update Payment Method →
      </a></p>
      <p style="color:#71717a;font-size:14px">Takes 30 seconds. Or we'll retry automatically in a few days.</p>
    `
  };
}

function formatAmount(amountInCents, currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase()
  }).format(amountInCents / 100);
}

module.exports = { sendDunningEmail };
```

---

## Handling the success case

Don't forget to handle when payment eventually succeeds. You want to mark the recovery in your database and potentially trigger a "welcome back" confirmation:

```javascript
async function handlePaymentSucceeded(invoice) {
  if (!invoice.subscription) return; // Skip one-time payments for now
  
  // Mark recovered in your database
  await db.failedPayments.updateWhere(
    { stripeInvoiceId: invoice.id },
    { status: 'recovered', recoveredAt: new Date() }
  );
  
  const customer = await db.customers.findByStripeId(invoice.customer);
  if (!customer) return;
  
  // Optional: send a "payment restored" confirmation
  await resend.emails.send({
    from: 'billing@yoursaas.com',
    to: customer.email,
    subject: `Payment confirmed — thanks, ${customer.firstName || ''}`,
    html: `
      <p>Hi there,</p>
      <p>Your payment for ${formatAmount(invoice.amount_paid, invoice.currency)} went through successfully. 
         Everything's back to normal.</p>
      <p>Thanks for sticking with us.</p>
    `
  });
  
  console.log(`Payment recovered for customer ${invoice.customer}`);
}
```

---

## Testing your webhooks locally

Use the Stripe CLI to forward events to your local server during development:

```bash
# Install the Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to your local server
stripe listen --forward-to localhost:3000/webhooks/stripe

# Trigger test events
stripe trigger invoice.payment_failed
stripe trigger invoice.payment_succeeded
```

The CLI will show you the webhook secret to use in your `.env` file. Keep it separate from your production webhook secret — they're different.

For more realistic testing, create a test customer with Stripe's test card that always fails:

```javascript
// Testing helper
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY_TEST);

async function createTestFailingSubscription() {
  const customer = await stripe.customers.create({
    email: 'test@example.com',
    payment_method: 'pm_card_chargeDeclinedInsufficientFunds', // Always declines
  });
  
  // ... create subscription, etc.
}
```

Stripe has test card numbers for specific decline codes — `pm_card_chargeDeclinedInsufficientFunds`, `pm_card_chargeDeclined`, `pm_card_chargeDeclinedExpiredCard`. These let you trigger specific failure paths without touching production.

---

## Idempotency — making sure you don't double-send

Webhook handlers can fire twice for the same event if there's a network hiccup. You need to make your handlers idempotent:

```javascript
async function handlePaymentFailed(invoice) {
  // Check if we've already processed this event
  const existing = await db.failedPayments.findOne({ 
    stripeInvoiceId: invoice.id,
    attemptCount: invoice.attempt_count
  });
  
  if (existing) {
    console.log(`Invoice ${invoice.id} attempt ${invoice.attempt_count} already processed, skipping`);
    return;
  }
  
  // ... rest of handler
}
```

This checks if you've already processed this specific attempt number for this invoice. If yes, skip. Stripe's `attempt_count` field increments with each attempt, so this handles re-delivery without double-processing.

---

## What this gets you

With a complete implementation of the above, you're looking at:
- Roughly 30-40% recovery from smart retry timing alone
- Another 20-30% from the dunning email sequence
- Combined: somewhere in the 50-65% recovery range for typical SaaS

The big levers if you're under-performing: timing of the first retry (too fast for soft declines, too slow for expired cards), email deliverability (if dunning emails land in spam, your CTR tanks), and friction in the card update flow.

---

## The part where I mention Revive

This entire flow — webhooks, decline routing, retry scheduling, dunning emails, card update links — is what Revive automates. $49/mo flat, no code required.

If you want to build it yourself, everything above is a solid starting point. The full implementation is more like 600-800 lines with error handling, monitoring, and edge cases — manageable but real work to maintain.

If you'd rather skip the weekend project and just connect your Stripe account:

[Try Revive — 14-day free trial →](https://revive-hq.com)

Either way — the principles above are what drive the recovery numbers. Use them.

---

## Key takeaways

- `invoice.payment_failed` is your entry point for subscription recovery
- Route by `decline_code` — different failures need different responses
- Retry timing matters: soft declines → retry in 4-6 hours, insufficient funds → retry on day 3/7
- Generate fresh Billing Portal links for every email (they expire)
- Make handlers idempotent — webhooks can deliver twice
- Test with Stripe's specific decline test cards

The complete working code from this guide is roughly 400 lines. Nothing fancy — standard Node.js patterns throughout.

---

*Revive automates payment recovery for SaaS — smart retries, decline-specific dunning emails, one-click card update links. $49/mo flat.*
