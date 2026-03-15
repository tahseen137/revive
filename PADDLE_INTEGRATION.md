# Paddle Integration for Revive

## Overview

Revive now supports **multi-platform payment recovery** for both Stripe and Paddle. This expands Revive's addressable market to include the many indie SaaS businesses that use Paddle or Lemon Squeezy for payments.

## Features

✅ **Paddle Webhook Support** - Handles all Paddle subscription and payment events  
✅ **Smart Retry Logic** - Same intelligent retry strategies as Stripe (payday detection, time optimization)  
✅ **Dunning Emails** - Automated dunning emails work seamlessly with Paddle payments  
✅ **Win-back Campaigns** - Churned Paddle customers tracked for win-back campaigns  
✅ **Payment Recovery** - Automatic subscription resumption triggers payment retry  
✅ **Update Payment Flow** - Secure payment update URLs for Paddle customers  

## Setup

### 1. Get Paddle API Credentials

1. Log in to your [Paddle Dashboard](https://vendors.paddle.com/)
2. Go to **Developer Tools** → **Authentication**
3. Create a new **API Key** with the following permissions:
   - Read subscriptions
   - Write subscriptions
   - Read transactions
   - Read customers

### 2. Configure Environment Variables

Add these to your `.env` file:

```bash
# Paddle Configuration
PADDLE_API_KEY=your_paddle_api_key_here
PADDLE_WEBHOOK_SECRET=your_paddle_webhook_secret_here
PADDLE_ENVIRONMENT=sandbox  # or "production"
```

### 3. Set Up Paddle Webhooks

1. In your Paddle Dashboard, go to **Developer Tools** → **Notifications**
2. Add a new webhook endpoint: `https://your-domain.com/api/webhooks/paddle`
3. Select the following events:
   - `transaction.payment_failed`
   - `transaction.completed`
   - `transaction.paid`
   - `subscription.created`
   - `subscription.updated`
   - `subscription.canceled`
   - `subscription.past_due`
   - `subscription.paused`
   - `subscription.resumed`
4. Copy the **Webhook Secret** and add it to your `.env` as `PADDLE_WEBHOOK_SECRET`

### 4. Test the Integration

#### Test Webhook Endpoint

```bash
curl -X POST https://your-domain.com/api/webhooks/paddle \
  -H "Content-Type: application/json" \
  -H "Paddle-Signature: ts=1234567890;h1=test" \
  -d '{
    "event_id": "test_evt_123",
    "event_type": "transaction.payment_failed",
    "occurred_at": "2024-01-01T00:00:00Z",
    "notification_id": "ntf_123",
    "data": {
      "id": "txn_test_123",
      "customerId": "ctm_test_123",
      "status": "past_due",
      "details": {
        "totals": {
          "grandTotal": "2999",
          "currencyCode": "USD"
        }
      },
      "payments": [{
        "status": "failed",
        "errorCode": "card_declined"
      }]
    }
  }'
```

#### Test Paddle Client

Create a test script at `scripts/test-paddle.mjs`:

```javascript
import { getPaddle } from "../src/lib/paddle.ts";

async function testPaddle() {
  const paddle = getPaddle();
  
  // Test customer fetch
  const customer = await paddle.getCustomer("ctm_test_123");
  console.log("Customer:", customer);
  
  // Test subscription fetch
  const subscription = await paddle.getSubscription("sub_test_123");
  console.log("Subscription:", subscription);
}

testPaddle().catch(console.error);
```

Run with: `node scripts/test-paddle.mjs`

## How It Works

### 1. Payment Failure Detection

When a Paddle payment fails:

1. Paddle sends a `transaction.payment_failed` webhook
2. Revive's webhook handler (`/api/webhooks/paddle/route.ts`) processes the event
3. The failed payment is stored in the database with a `paddle:` prefix
4. The retry engine calculates the next retry time based on the failure code

### 2. Retry Logic

Paddle payments use the same retry strategies as Stripe:

- **Card Declined**: 4hrs → 24hrs → 72hrs (with 10am time optimization)
- **Insufficient Funds**: Payday-aware scheduling (1st, 15th, Fridays @ 10am)
- **Expired Card**: Skip retries, send dunning email immediately
- **Processing Error**: Fast retry (1 hour)

### 3. Payment Retry Execution

For Paddle, retrying a payment works differently than Stripe:

- **Stripe**: Directly retry the invoice via `stripe.invoices.pay()`
- **Paddle**: Resume the subscription via `paddle.resumeSubscription()`, which triggers automatic payment retry

The retry engine automatically detects Paddle payments (via `paddle:` prefix) and uses the correct retry method.

### 4. Dunning Emails

Dunning emails work identically for both Stripe and Paddle:

- Same templates (payment failed, card update reminder, final warning)
- Payment update URLs are provider-specific:
  - **Stripe**: `https://your-app.com/update-payment?invoice=inv_xxx`
  - **Paddle**: `https://your-app.com/update-payment/paddle?transaction=txn_xxx`

### 5. Payment Recovery

When a Paddle payment succeeds after failing:

1. Paddle sends `transaction.completed` or `transaction.paid` webhook
2. Revive marks the payment as recovered
3. A recovery confirmation email is sent to the customer
4. Recovery is logged in the payment history

## Architecture

### Key Files

```
src/
├── lib/
│   ├── paddle.ts                    # Paddle SDK client wrapper
│   ├── paddle-retry-engine.ts       # Paddle-specific retry logic
│   ├── retry-engine.ts               # Main retry engine (updated for multi-platform)
│   ├── email-service.ts              # Email service (updated for multi-platform)
│   ├── payment-url-helpers.ts        # Payment update URL generation
│   └── db.ts                         # Database layer (no changes needed)
├── app/
│   ├── api/
│   │   ├── webhooks/
│   │   │   ├── stripe/route.ts      # Stripe webhooks
│   │   │   └── paddle/route.ts      # Paddle webhooks ✨ NEW
│   │   └── paddle/
│   │       └── get-update-url/route.ts  # Paddle update URL API ✨ NEW
│   └── update-payment/
│       └── paddle/page.tsx          # Paddle update payment page ✨ NEW
```

### Database Schema

Failed payments from Paddle are stored with these conventions:

- `stripeInvoiceId`: Prefixed with `paddle:` (e.g., `paddle:txn_abc123`)
- `stripeCustomerId`: Prefixed with `paddle:` (e.g., `paddle:ctm_abc123`)
- `connectedAccountId`: Set to `"paddle"`

This allows the system to distinguish between Stripe and Paddle payments without schema changes.

## Failure Code Mapping

Paddle uses different error codes than Stripe. The integration maps them to Revive's standard failure codes:

| Paddle Code                  | Revive Code                | Retry Strategy         |
|------------------------------|----------------------------|------------------------|
| `card_declined`              | `card_declined`            | 4hrs → 24hrs → 72hrs   |
| `card_expired`               | `expired_card`             | Skip, dunning email    |
| `insufficient_funds`         | `insufficient_funds`       | Payday detection       |
| `authentication_required`    | `authentication_required`  | Skip, dunning email    |
| `processing_error`           | `processing_error`         | 1 hour retry           |
| `generic_decline`            | `card_declined`            | 4hrs → 24hrs → 72hrs   |

## Production Checklist

Before launching Paddle integration in production:

- [ ] Set `PADDLE_API_KEY` in production environment
- [ ] Set `PADDLE_WEBHOOK_SECRET` in production environment
- [ ] Set `PADDLE_ENVIRONMENT=production`
- [ ] Configure Paddle webhooks in production dashboard
- [ ] Test payment failure → retry → recovery flow
- [ ] Test dunning email delivery
- [ ] Verify payment update URLs work correctly
- [ ] Monitor webhook logs for errors
- [ ] Set up alerts for failed webhooks

## Troubleshooting

### Webhooks Not Arriving

1. Check Paddle webhook configuration in dashboard
2. Verify webhook URL is publicly accessible
3. Check webhook signature verification is passing
4. Review webhook logs in Paddle dashboard

### Retries Not Working

1. Check `PADDLE_API_KEY` is set correctly
2. Verify subscription ID is present in transaction
3. Check retry engine logs for errors
4. Ensure subscription is in `past_due` or `paused` status

### Update URLs Not Working

1. Verify `PADDLE_ENVIRONMENT` is set correctly
2. Check customer ID is valid
3. Test `/api/paddle/get-update-url` endpoint directly
4. Review browser console for errors on update page

## Metrics & Monitoring

Track these Paddle-specific metrics:

- **Paddle Payments Tracked**: Count of failed Paddle payments
- **Paddle Recovery Rate**: % of Paddle payments recovered
- **Paddle Retry Success**: Success rate of Paddle subscription resumptions
- **Paddle Dunning Email CTR**: Click-through rate on Paddle update URLs

Query failed Paddle payments:

```javascript
// Get all Paddle payments
const payments = await getAllPayments();
const paddlePayments = payments.filter(p => 
  p.connectedAccountId === "paddle" || 
  p.stripeInvoiceId.startsWith("paddle:")
);

// Paddle recovery rate
const recovered = paddlePayments.filter(p => p.status === "recovered").length;
const recoveryRate = (recovered / paddlePayments.length) * 100;
```

## Limitations

1. **Payment Update Flow**: Paddle doesn't provide a direct "update card" URL like Stripe. We redirect to Paddle's subscription management portal.
2. **Application Fees**: Paddle has a different fee structure than Stripe. Application fees are handled separately.
3. **Connected Accounts**: Paddle doesn't have a "Connect" model like Stripe. All Paddle payments go through your main account.

## Future Enhancements

- [ ] Paddle.js integration for inline payment updates
- [ ] Paddle Retain comparison metrics
- [ ] LemonSqueezy support (similar API to Paddle)
- [ ] Multi-currency display in emails
- [ ] Paddle Checkout recovery links
- [ ] Paddle billing portal customization

## Support

For questions or issues with Paddle integration:

1. Check [Paddle API Documentation](https://developer.paddle.com/api-reference)
2. Review Revive webhook logs: `src/app/api/webhooks/paddle/route.ts`
3. Test with Paddle sandbox environment first
4. Open an issue in the Revive repository

---

**Last Updated**: March 11, 2026  
**Version**: 1.0.0  
**Author**: Gandalf (Revive CTO)
