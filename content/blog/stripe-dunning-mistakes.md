# 7 Common Stripe Dunning Mistakes That Kill Your MRR (And How to Fix Them)

*10 min read · Payment Recovery*

Every month, SaaS companies lose 20-40% of their churned revenue to failed payments — not dissatisfied customers. This silent killer is called **involuntary churn**, and most companies are making it worse with poorly configured Stripe dunning.

I've seen startups hemorrhage thousands in MRR because they treated dunning as an afterthought. Here are the seven most common Stripe dunning mistakes that kill your revenue, and exactly how to fix them.

---

## 1. Using Stripe's Default Retry Schedule

**The Mistake:** Accepting Stripe's out-of-the-box retry settings and calling it done.

Stripe's default Smart Retries are good, but they're optimized for the average business — not yours. They don't know that your enterprise customers get paid on the 1st and 15th, or that your European customers have different banking behaviors than US ones.

**The Fix:** Customize your retry schedule based on your customer data:

```javascript
// Stripe billing settings - tailor to your audience
const customRetrySchedule = {
  retry_1: { days_after_failure: 1 },   // Quick retry - often transient issues
  retry_2: { days_after_failure: 3 },   // After weekend banking delays
  retry_3: { days_after_failure: 5 },   // Mid-week attempt
  retry_4: { days_after_failure: 7 },   // End of week
  final_retry: { days_after_failure: 14 } // Last chance before cancellation
};
```

Analyze your successful payment recoveries. When do they happen? Align your retry schedule to maximize those windows.

---

## 2. Sending Generic "Payment Failed" Emails

**The Mistake:** Blasting customers with robotic emails that say "Your payment failed. Please update your card."

These emails have abysmal open rates because they feel impersonal and slightly accusatory. Customers ignore them, and your MRR vanishes.

**The Fix:** Personalize your dunning emails like you would onboarding emails:

- **Subject line:** "Quick heads up about your [Product Name] subscription"
- **Tone:** Helpful, not demanding
- **Content:** Include what they'll lose access to and a one-click update link
- **Timing:** Send at peak engagement times (check your analytics)

```html
Hey {{customer.first_name}},

We tried to charge your card for {{product.name}} but it didn't go through — 
this happens to everyone occasionally.

Here's what you'll lose access to if we can't fix this:
{{list_of_features_they_use_most}}

Update your card in 30 seconds: {{one_click_update_link}}

No hard feelings if you meant to cancel — just let us know.

- The {{company}} Team
```

---

## 3. Not Offering Alternative Payment Methods

**The Mistake:** Only accepting credit cards, so when a card fails, there's no fallback.

Credit cards expire, get lost, hit limits, and get flagged for fraud. If that's your only payment option, every card issue becomes a potential churn event.

**The Fix:** Enable multiple payment methods in Stripe:

- **ACH/Bank Debit** — Lower fees, fewer failures (banks don't expire)
- **SEPA** for European customers
- **Link** for Stripe's one-click checkout
- **Backup cards** — Let customers store a secondary card

```javascript
// Enable multiple payment methods
const paymentIntent = await stripe.paymentIntents.create({
  amount: 2000,
  currency: 'usd',
  payment_method_types: ['card', 'us_bank_account', 'link'],
  customer: customerId,
});
```

When a primary payment fails, automatically attempt the backup method before sending dunning emails.

---

## 4. Canceling Subscriptions Too Quickly

**The Mistake:** Canceling subscriptions after 2-3 failed payment attempts.

This is aggressive and leaves money on the table. Studies show that 40-60% of failed payments can be recovered — but not in 3 days.

**The Fix:** Extend your grace period strategically:

- **Days 1-7:** Automated retries + friendly email notifications
- **Days 8-14:** More urgent emails + in-app notifications
- **Days 15-21:** Downgrade to limited access (not full cancellation)
- **Days 22-30:** Final warning before cancellation
- **Day 30+:** Pause subscription (don't delete — make reactivation easy)

```javascript
// Downgrade instead of cancel
async function handleFailedPayment(subscription) {
  const daysSinceFirstFailure = getDaysSinceFailure(subscription);
  
  if (daysSinceFirstFailure > 14 && daysSinceFirstFailure <= 30) {
    await stripe.subscriptions.update(subscription.id, {
      items: [{ price: 'price_limited_access' }],
      proration_behavior: 'none'
    });
  } else if (daysSinceFirstFailure > 30) {
    await stripe.subscriptions.update(subscription.id, {
      pause_collection: { behavior: 'void' }
    });
  }
}
```

---

## 5. Ignoring Pre-Dunning Opportunities

**The Mistake:** Only reacting to failed payments instead of preventing them.

By the time a payment fails, you're already fighting an uphill battle. The best involuntary churn prevention happens before cards are charged.

**The Fix:** Implement pre-dunning:

- **Card expiration warnings:** Stripe provides `card.exp_month` and `card.exp_year` — use them
- **Pre-charge reminders:** "Your subscription renews in 3 days" emails
- **Account updater:** Use Stripe's automatic card updater to refresh expired cards silently

```javascript
// Check for expiring cards weekly
async function checkExpiringCards() {
  const customers = await stripe.customers.list({ limit: 100 });
  
  for (const customer of customers.data) {
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customer.id,
      type: 'card'
    });
    
    for (const pm of paymentMethods.data) {
      const expDate = new Date(pm.card.exp_year, pm.card.exp_month - 1);
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
      
      if (expDate <= thirtyDaysFromNow) {
        await sendCardExpirationEmail(customer, pm);
      }
    }
  }
}
```

---

## 6. Not Segmenting Your Dunning Approach

**The Mistake:** Treating a $10/month user the same as a $1,000/month enterprise customer.

Your high-value customers deserve white-glove treatment when payments fail. A personal phone call to a $10K ARR customer is worth 10 hours of your time.

**The Fix:** Create dunning tiers:

| Customer Tier | MRR | Dunning Approach |
|--------------|-----|------------------|
| Self-serve | <$50 | Automated emails + in-app |
| Growth | $50-500 | Automated + personal email from CSM |
| Enterprise | $500+ | Phone call within 24 hours |

```javascript
async function handleDunningByTier(customer, subscription) {
  const mrr = subscription.items.data[0].price.unit_amount / 100;
  
  if (mrr >= 500) {
    await notifyCSMForPhoneCall(customer);
    await sendHighTouchEmail(customer);
  } else if (mrr >= 50) {
    await sendPersonalizedCSMEmail(customer);
  } else {
    await sendAutomatedDunningSequence(customer);
  }
}
```

---

## 7. Not Measuring Dunning Performance

**The Mistake:** Setting up dunning once and never looking at the data.

If you don't know your recovery rate, average time to recovery, or which emails perform best, you're flying blind.

**The Fix:** Track these metrics religiously:

- **Recovery rate:** % of failed payments recovered
- **Time to recovery:** Average days between failure and recovery
- **Recovery by attempt:** Which retry attempt recovers the most?
- **Email performance:** Open rates, click rates, recovery rates per email
- **Lost MRR:** Monthly revenue lost to failed payments

Build a dashboard or integrate with your existing analytics:

```javascript
// Track recovery metrics
const dunningMetrics = {
  totalFailedPayments: 0,
  recoveredPayments: 0,
  recoveredMRR: 0,
  lostMRR: 0,
  avgDaysToRecovery: 0,
  recoveryByRetryAttempt: {}
};

// Calculate recovery rate
const recoveryRate = (dunningMetrics.recoveredPayments / dunningMetrics.totalFailedPayments) * 100;
console.log(`Recovery rate: ${recoveryRate.toFixed(1)}%`);
```

---

## The Bottom Line

Stripe dunning isn't sexy, but getting it right can recover 40-60% of would-be churned revenue. That's found money.

Stop treating dunning as a checkbox. Customize your retry schedule, personalize your communications, segment by customer value, and measure everything.

Your MRR will thank you.

---

*Ready to stop the payment recovery bleeding? [Try Revive](https://revive-hq.com) — AI-powered dunning that recovers 70%+ of failed payments automatically.*
