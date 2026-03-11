# Smart Payment Retry Logic: When to Retry Failed Charges (and When to Stop)

## Introduction: The Retry Decision That Determines Your Revenue

You've set up Stripe, you're charging customers, and then—a payment fails. Now what?

If you retry too aggressively, you annoy customers, trigger fraud flags, and rack up unnecessary Stripe fees. Retry too softly, and you leave thousands of dollars on the table every month as recoverable failures slip into permanent churn.

The gap between a naive retry strategy ("retry every day for 7 days") and a smart one can be worth tens of thousands of dollars annually for even a modest SaaS. For a company with $100K MRR and a typical 8% failure rate, that's $8,000 per month in failed charges that need recovery—and the difference between a 40% and 70% recovery rate is $2,400 every single month.

This guide covers the full picture: retry timing, decline code interpretation, user communication, and the critical signals that tell you when to stop retrying and shift strategies.

---

## Why Payment Failures Happen (The Categories That Matter)

Before you can build smart retry logic, you need to understand *why* payments fail. Not all failures are created equal, and your retry strategy should differ dramatically based on the root cause.

### Soft Declines (Retriable)

Soft declines are temporary. The card is valid, the customer has good intentions, but something situational blocked the charge. These are your highest-value recovery targets.

**Common soft decline codes:**
- `insufficient_funds` — The account balance was too low at that moment
- `do_not_honor` — A generic temporary block from the issuing bank
- `temporary_hold` — The bank is holding funds (travel blocks, fraud holds)
- `try_again_later` — Exactly what it sounds like
- `service_not_allowed` — Often a temporary restriction

**Recovery rate without intervention:** 15-25%  
**Recovery rate with smart retries:** 45-65%

### Hard Declines (Non-Retriable)

Hard declines are permanent signals. The card is gone, the account is closed, or the bank has issued a definitive block. Retrying hard declines is almost always futile—and repeated attempts can worsen your merchant score.

**Common hard decline codes:**
- `card_declined` (repeatedly) — Often a permanent block
- `stolen_card` — Never retry
- `lost_card` — Never retry
- `pickup_card` — Card physically confiscated
- `invalid_account` — Account doesn't exist or is closed
- `fraudulent` — Stripe's own fraud detection flagged this

**Recovery rate with retries:** < 5%  
**Correct action:** Immediate customer outreach for new payment method

### Authentication Failures

Authentication failures (primarily 3DS/SCA in European markets) require customer action. No amount of automatic retries will fix these—the customer must re-authorize.

**Key codes:**
- `authentication_required` — Customer must authenticate via 3DS
- `authenticate_with_app` — Push notification to banking app needed
- `payment_intent_authentication_failure` — Authentication flow failed

**Correct action:** Generate a new checkout link and email/SMS the customer immediately.

### Network and Processing Errors

These are infrastructure-level failures that have nothing to do with the customer's ability or willingness to pay.

**Key codes:**
- `processing_error` — Stripe-side processing failure
- `card_velocity_exceeded` — Too many requests in a short time window
- `approve_with_id` — Bank needs manual review

**Recovery rate:** High (60-80%)—these typically resolve on retry within hours.

---

## The Timing Framework: When to Retry

The timing of your retries matters as much as whether you retry at all. Here's the research-backed schedule that maximizes recovery without burning out your relationship with the customer:

### Attempt 1: The Immediate Retry (Hour 0-2)

The fastest retry window captures network errors, temporary processing glitches, and transient bank holds. Don't wait.

**Rationale:** Processing errors resolve quickly. If a customer's card dipped below a balance threshold and they received a paycheck within hours, you'll catch them in a brief window of sufficient funds.

**Success rate for immediate retry:** 25-35% of all failed charges recover at this step.

**Implementation:**

```javascript
// Stripe webhook handler for payment failure
if (event.type === 'invoice.payment_failed') {
  const invoice = event.data.object;
  const declineCode = invoice.payment_intent?.last_payment_error?.decline_code;
  
  if (invoice.attempt_count === 1 && SOFT_DECLINE_CODES.includes(declineCode)) {
    await scheduleRetry(invoice.id, hoursFromNow(2));
  }
}
```

### Attempt 2: Day 3-4 (The Primary Window)

Most people's bank accounts cycle with their payroll. For monthly-paid employees, checking back 3-4 days after failure catches the largest group of recoverable `insufficient_funds` failures.

**Rationale:** Mid-month failures often coincide with end-of-month spending pressure. A 3-4 day gap bridges the most common timing gap between billing cycles and income cycles.

**Success rate:** 15-25% of remaining failures.

### Attempt 3: Day 7 (The Weekly Checkpoint)

Weekly recurring patterns in banking are significant. Many people receive weekly paychecks, and bank holds typically expire within 5-7 business days.

**Rationale:** A week from the initial failure catches weekly paycheck recipients and customers where hold expirations align.

**Success rate:** 8-12% of remaining failures.

### Attempt 4: Day 14 (The Final Automated Retry)

Two weeks post-failure is your last economically rational automated retry. Beyond this point, the per-unit cost of automated retries exceeds the expected recovery rate for most SaaS products.

**Exception:** High-value accounts (enterprise contracts > $500/month) warrant extended retry windows and human intervention.

**Success rate at day 14:** 5-8% of remaining failures.

---

## The Decline Code Decision Tree

Not all failures should follow the same retry schedule. Map decline codes to actions:

### Immediate Action (Never Retry Automatically)

| Code | Action |
|------|--------|
| `stolen_card` | Email customer: card was reported stolen, request new payment method |
| `lost_card` | Same as above |
| `fraudulent` | Flag account for review, contact via verified channel |
| `card_not_supported` | Ask for different card type |
| `invalid_account` | Email: card is no longer valid |

### Retry in 2-4 Hours

| Code | Reason |
|------|--------|
| `processing_error` | Pure infrastructure issue |
| `card_velocity_exceeded` | Rate limiting, will clear quickly |
| `approve_with_id` | Bank processing, usually resolves fast |

### Retry in 24-72 Hours

| Code | Reason |
|------|--------|
| `insufficient_funds` | Wait for deposits/payroll |
| `do_not_honor` | Generic temporary block |
| `temporary_hold` | Travel blocks, fraud holds |
| `try_again_later` | Bank's own retry signal |

### Retry in 7+ Days (With Email)

| Code | Reason |
|------|--------|
| `service_not_allowed` | Temporary subscription block |
| `no_action_taken` | Bank needs review time |

---

## The User Communication Layer

Retries work in the background, but the highest-performing dunning strategies combine technical retries with proactive customer communication. Here's the sequence:

### Email 1: The Soft Notification (Day 1)

Don't panic the customer. A gentle heads-up performs dramatically better than an urgent failure message.

**Subject:** "Quick heads up on your [Product] subscription"

**Tone:** "We tried to process your payment and it needs a quick update. No action required yet—we'll try again automatically. If you'd like to update your card now, here's a secure link."

**Key elements:**
- No alarm language
- Optional action (not required yet)
- Direct link to billing portal
- No mention of cancellation

**Typical response rate:** 15-20% update card proactively

### Email 2: The Action Request (Day 5-7)

By now, automated retries haven't recovered the payment. Shift from passive to active.

**Subject:** "Action needed: Update your billing info"

**Key elements:**
- Clear statement of what failed
- Simple action button (update payment method)
- Count remaining days of access
- Customer support contact

**Typical response rate:** 25-35% update card

### Email 3: The Deadline Notice (Day 12-14)

This is your last automated communication before making a human decision about the account.

**Subject:** "Your [Product] access ends in 48 hours"

**Key elements:**
- Specific date of access termination
- What they'll lose (be specific about their data, team's work, integrations)
- Easy one-click recovery link
- Option to pause instead of cancel (if you offer this)

**Typical response rate:** 35-45% action rate

### The SMS Option

For high-value accounts or mobile-first products, SMS outperforms email significantly. A single text on day 7 can recover an additional 8-12% that email doesn't reach.

**Best practices:**
- Send only with explicit SMS consent
- Under 160 characters
- Include a shortened payment link
- Send between 10am-6pm local time

---

## When to Stop: The Exit Criteria

Knowing when to stop is as important as knowing when to retry.

### Signal 1: Repeated Hard Declines

If you've received the same hard decline code twice in a row, recovery probability drops below 5%. Stop automatic retries. Move to manual outreach or account suspension.

### Signal 2: Authentication Failure Loop

If a customer's payment requires 3DS authentication and they haven't authenticated through three separate prompts, automatic retry will never work. This requires human intervention: a phone call, live chat, or accepting churn.

### Signal 3: The 21-Day Threshold

After 21 days without payment, automated recovery rates drop below 3% in most SaaS categories. The expected value of continued retries becomes negative when factoring in Stripe fees, email deliverability impact, and relationship damage.

**Exceptions for extending past 21 days:**
- Contract value > $1,000/month
- Customer has >18 months of tenure
- Customer expressed explicit intent to pay (support ticket, email reply)
- B2B customer with purchase order or procurement process in flight

### Signal 4: Customer Explicitly Cancelled

If a customer cancels via your UI after a payment failure, do not retry the payment. Retrying after explicit cancellation violates card network rules and is grounds for a chargeback.

### Signal 5: Chargeback Risk

If a declined charge came from an account with a previous chargeback, stop all retries. The risk of additional chargebacks outweighs any recovery potential.

---

## Technical Implementation: Building Idempotent Retry Logic

The most common technical mistake is creating duplicate charges. Here's how to build safe retry logic:

### Use Stripe's Built-in Smart Retries First

Before building custom logic, configure Stripe's Smart Retries. They use ML to pick optimal retry timing based on payment network signals. For most SaaS companies under $500K ARR, this is sufficient and should be your starting point.

```javascript
// Configure via Stripe dashboard or API
stripe.subscriptions.update(subscriptionId, {
  collection_method: 'charge_automatically',
  payment_settings: {
    save_default_payment_method: 'on_subscription',
  },
});
```

### Custom Logic on Top of Stripe

For higher-volume or higher-value scenarios:

```javascript
async function handlePaymentFailure(invoice, declineCode) {
  const failureType = classifyDeclineCode(declineCode);
  
  if (failureType === 'HARD_DECLINE') {
    await notifyCustomerImmediately(invoice.customer);
    await flagForManualReview(invoice);
    return; // No retries
  }
  
  if (failureType === 'AUTH_REQUIRED') {
    await sendAuthenticationEmail(invoice.customer, invoice.hosted_invoice_url);
    return; // Human action required
  }
  
  if (failureType === 'SOFT_DECLINE') {
    const retrySchedule = getRetrySchedule(invoice.attempt_count);
    
    if (retrySchedule) {
      await retryQueue.add({
        invoiceId: invoice.id,
        customerId: invoice.customer,
        attemptCount: invoice.attempt_count,
        scheduledAt: retrySchedule.date,
        idempotencyKey: `retry_${invoice.id}_${invoice.attempt_count}`,
      });
    } else {
      // Exhausted retries
      await initiateManualRecovery(invoice);
    }
  }
}

function getRetrySchedule(attemptCount) {
  const schedules = {
    1: { date: hoursFromNow(2), notify: false },
    2: { date: daysFromNow(3), notify: true, emailType: 'soft_reminder' },
    3: { date: daysFromNow(7), notify: true, emailType: 'action_required' },
    4: { date: daysFromNow(14), notify: true, emailType: 'final_notice' },
  };
  
  return schedules[attemptCount] || null;
}
```

### Idempotency: The Non-Negotiable

Every retry attempt must use a unique idempotency key. Stripe guarantees two API calls with the same idempotency key won't create duplicate charges:

```javascript
await stripe.invoices.pay(invoiceId, {
  idempotencyKey: `pay_${invoiceId}_attempt_${attemptCount}`,
});
```

---

## Measuring What Matters

### Recovery Rate by Attempt

Track what percentage of failures recover at each retry:

| Attempt | Target Recovery |
|---------|----------------|
| 1 (immediate) | 25-35% of all failures |
| 2 (Day 3) | 15-25% of remaining |
| 3 (Day 7) | 8-12% of remaining |
| 4 (Day 14) | 5-8% of remaining |
| **Total target** | **50-70% of soft declines** |

### Recovery Rate by Decline Code

Build a heatmap of which codes you're recovering. If `insufficient_funds` is only recovering at 15% when the benchmark is 45%, your timing is wrong.

### Email Engagement

Track open rates and click rates for each dunning email separately. If Day 7 email has 40% opens but 5% clicks, the CTA is broken—not the subject line.

### Revenue Recovered Per Month

Set a baseline in month 1 and track improvement as you iterate. This is the metric that matters for your investors.

---

## Common Mistakes That Kill Recovery Rates

**Retrying only during business hours:** Bank systems run 24/7. Early morning retries (6-8am) often catch daily bank processing runs with the highest success rates.

**Same time of day for every retry:** Vary your retry windows. Some customers are morning people, some are weekend people. Consistent Wednesday 3pm retries will miss a predictable segment of your base.

**Generic dunning emails:** "Your payment failed" converts at half the rate of emails that connect failure to the customer's outcome: "Your team's projects will become read-only in 7 days."

**Ignoring Stripe's Card Updater:** Stripe's Automatic Card Updater updates stored card details when customers get new card numbers. Enable it—it prevents 10-20% of failures before they happen.

**Hard 30-day cancellations for all accounts:** A blanket 30-day cutoff destroys recovery potential for high-value customers. Build segment-specific thresholds: free trials cancel on day 3, standard accounts on day 21, enterprise accounts get 45+ days with human outreach.

---

## The ROI Calculation

For a SaaS with $100K MRR:

| Metric | Without Optimization | With Smart Retries |
|--------|---------------------|-------------------|
| Failed payment rate | 8% = $8,000/month | 8% = $8,000/month |
| Recovery rate | 20% | 60% |
| Revenue recovered | $1,600/month | $4,800/month |
| **Annual difference** | — | **+$38,400/year** |

At $1M MRR, this is a $384,000/year opportunity—from a system that runs automatically once built.

---

## Getting Started This Week

Prioritize in this order:

1. **Enable Stripe Smart Retries** (30 minutes) — This is the 80/20 win.

2. **Set up webhook handlers** (2-4 hours) — Process `invoice.payment_failed` and `invoice.paid` to build your recovery funnel visibility.

3. **Build a 3-email dunning sequence** (4-8 hours) — Day 1 soft notice, Day 7 action required, Day 14 final notice.

4. **Add decline code routing** (4-8 hours) — Differentiate hard declines (email immediately) from soft declines (retry first).

5. **Measure and iterate** (ongoing) — Monthly review of recovery rates by decline code and attempt number.

The SaaS companies that win at involuntary churn aren't doing anything magical. They're just more systematic about treating failed payments as recoverable opportunities rather than inevitable losses.

---

*Revive helps SaaS companies automate their dunning strategy with decline-code-aware retry logic, customizable email sequences, and recovery analytics. [Start recovering more revenue →](https://revivehq.app)*
