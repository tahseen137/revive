# Agentic Commerce Protocol (ACP) Implementation
## Revive - AI Agent Commerce Integration

**Implemented:** February 13, 2026  
**Status:** ✅ Ready for Deployment

---

## 🎯 What is ACP?

The Agentic Commerce Protocol (ACP) is an open standard by Stripe + OpenAI that enables AI agents (like ChatGPT, Claude, etc.) to discover and purchase products autonomously. When an AI agent searches for "payment recovery tool" or "churn recovery for Stripe," Revive will now appear in their results.

**Key Benefits:**
- 🤖 **First-Mover Advantage** - Almost no one has implemented this yet
- 🔍 **Discoverability** - AI agents can find your product organically
- ⚡ **Frictionless Purchase** - Agents complete checkout in seconds
- 💳 **Secure Payments** - Uses Stripe Shared Payment Tokens (no PII exposure)

---

## 📁 Files Created

### 1. Discovery File: `public/.well-known/acp.json`
This is the **entry point** for AI agents. It describes:
- Product name, description, vendor info
- Available plans (Starter $29/mo, Growth $79/mo)
- Features and capabilities
- API endpoint location

**Location:** `https://revive-hq.com/.well-known/acp.json`

### 2. API Endpoint: `src/app/api/acp/route.ts`
RESTful API that handles:
- **GET** - Returns product catalog with pricing and features
- **POST** - Creates Stripe checkout sessions for agents

**Endpoints:**
- `GET https://revive-hq.com/api/acp` - Catalog
- `POST https://revive-hq.com/api/acp` - Checkout

---

## 🔧 Implementation Details

### Pricing Structure
```typescript
Plans:
  - Starter: $29/month (14-day free trial)
    - Up to 500 recovered payments/month
    - Smart retry engine
    - Email automation
    
  - Growth: $79/month (14-day free trial)
    - Unlimited recovered payments
    - Advanced retry strategies
    - Custom email templates
    - Webhooks & API access
    - Priority support
```

### API Contract

**GET /api/acp**
```json
{
  "acp_version": "2026-01-30",
  "name": "Revive",
  "plans": [
    {
      "id": "starter",
      "price": { 
        "amount": 2900, 
        "currency": "usd",
        "billing_period": "monthly"
      },
      "trial_days": 14,
      "features": [...]
    }
  ]
}
```

**POST /api/acp**
```json
// Request
{
  "plan_id": "starter",
  "buyer_email": "agent@example.com",
  "agent_id": "claude-code-v1"
}

// Response
{
  "checkout_session": {
    "id": "cs_...",
    "status": "pending",
    "checkout_url": "https://checkout.stripe.com/...",
    "amount": 2900,
    "currency": "usd",
    "trial_days": 14
  }
}
```

---

## 🧪 Testing

### Run Automated Tests
```bash
cd /Users/clawdbot/.openclaw/workspace/revive
./scripts/test-acp.sh
```

### Manual Testing

**1. Test Discovery File**
```bash
curl https://revive-hq.com/.well-known/acp.json | jq .
```

**2. Test Catalog Endpoint**
```bash
curl https://revive-hq.com/api/acp | jq .
```

**3. Test Checkout Creation**
```bash
curl -X POST https://revive-hq.com/api/acp \
  -H "Content-Type: application/json" \
  -d '{
    "plan_id": "starter",
    "buyer_email": "test@example.com",
    "agent_id": "test-agent"
  }' | jq .
```

**4. Test CORS (from browser console)**
```javascript
fetch('https://revive-hq.com/api/acp')
  .then(r => r.json())
  .then(console.log)
```

---

## 🚀 Deployment Checklist

### Pre-Deployment
- [x] Discovery file created (`public/.well-known/acp.json`)
- [x] API route implemented (`src/app/api/acp/route.ts`)
- [x] JSON validation passed
- [x] TypeScript compilation successful
- [x] CORS headers configured for agent access
- [x] Stripe integration verified (API version: 2026-01-28.clover)

### Deployment Steps

**1. Commit Changes**
```bash
cd /Users/clawdbot/.openclaw/workspace/revive
git add .
git commit -m "feat: Add Agentic Commerce Protocol (ACP) support"
git push origin main
```

**2. Deploy to Vercel**
```bash
# Auto-deploy via GitHub integration, or:
vercel --prod
```

**3. Verify Endpoints**
After deployment, test:
- `https://revive-hq.com/.well-known/acp.json`
- `https://revive-hq.com/api/acp`

**4. Register with ACP Directory (Optional)**
Once Stripe/OpenAI launches the official ACP directory, submit:
```bash
# Future step - not available yet
curl -X POST https://acp-registry.stripe.com/submit \
  -d '{"domain": "revive-hq.com"}'
```

---

## 🔍 How AI Agents Will Discover You

### Discovery Flow
1. **User asks AI:** "Find me a payment recovery tool for Stripe"
2. **Agent searches ACP registry** (future Stripe/OpenAI service)
3. **Agent fetches** `https://revive-hq.com/.well-known/acp.json`
4. **Agent calls** `GET /api/acp` to get catalog
5. **Agent presents options** to user (with 14-day trial info)
6. **User approves purchase**
7. **Agent calls** `POST /api/acp` with plan selection
8. **Agent completes payment** via Stripe SPT
9. **14-day trial starts** automatically

### Attribution
All ACP purchases are tagged in Stripe metadata:
```json
{
  "source": "acp",
  "agent_id": "chatgpt-4o",
  "plan": "starter"
}
```

This allows you to track which AI agents are driving revenue.

---

## 📊 Monitoring

### Webhook Updates
The existing webhook handler (`src/app/api/webhooks/stripe/route.ts`) should process ACP purchases automatically. Verify it logs:
```
✅ Subscription created: { source: 'acp', agent_id: '...', ... }
```

### Analytics
Track ACP conversions via Stripe Dashboard:
1. **Subscriptions** → Filter by metadata: `source = acp`
2. **Customer Details** → Check `agent_id` in metadata
3. **Revenue Reports** → Segment by acquisition channel
4. **Trial Conversion Rate** → Track how many ACP trials convert to paid

---

## 🛠️ Maintenance

### Update Pricing
Edit both files when changing plans:
1. `public/.well-known/acp.json` (discovery)
2. `src/app/api/acp/route.ts` (API logic)

### Add New Plans
```typescript
// In src/app/api/acp/route.ts
{
  id: 'enterprise',
  name: 'Enterprise',
  description: 'Custom solutions for large organizations',
  price: { 
    amount: 29900, 
    currency: 'usd',
    billing_period: 'monthly'
  },
  trial_days: 14,
  features: [
    'Unlimited everything',
    'Dedicated account manager',
    'Custom integration support',
    'SLA guarantee'
  ]
}
```

### Monitor ACP Spec Changes
The spec is evolving. Watch:
- https://github.com/stripe/acp-spec (future repo)
- Stripe Dashboard changelog
- OpenAI developer updates

---

## ⚠️ Known Limitations

1. **Registry Not Live Yet** - Stripe/OpenAI haven't launched the public ACP directory. Implementation is ready for when they do.
2. **Trial Management** - Standard Stripe trial logic applies. Ensure webhook handlers properly track trial → paid conversions.
3. **Usage Limits** - Current implementation doesn't enforce the 500 payment/month limit on Starter plan. Add usage tracking if needed.

---

## 🎓 Resources

- **ACP Spec:** `docs/NEXTJS_16_UPGRADE_GUIDE.md` (local reference in workspace root)
- **Stripe Webhooks:** `docs/STRIPE_WEBHOOK_MASTERY.md` (workspace root)
- **Self-Improvement Log:** `memory/self-improvement.md` (workspace root)
- **Stripe ACP Docs:** https://stripe.com/docs/acp (when published)

---

## 🚨 Support

**Questions?** Reach out:
- **Engineering:** CTO Gandalf (internal)
- **Stripe Issues:** support@stripe.com
- **ACP Spec Questions:** Post in Stripe Discord #acp-beta

---

## 💡 Marketing Opportunities

### Positioning for AI Agents
When agents search for payment recovery, they'll see:
- ✅ **14-day free trial** (low risk)
- ✅ **Stripe-native** (trusted integration)
- ✅ **Smart retry engine** (differentiated feature)
- ✅ **Email automation** (complete solution)

### Agent-Friendly Copy
The ACP discovery file uses agent-optimized descriptions:
- Short, specific feature lists
- Clear pricing structure
- Obvious value props (no marketing fluff)

### Future: Usage-Based Pricing
Consider adding usage-based tiers for agents managing multiple Stripe accounts:
```json
{
  "id": "usage",
  "pricing_model": "usage_based",
  "base_price": 1900,
  "usage_price": 50,
  "usage_unit": "per 100 recovered payments"
}
```

---

**Status:** ✅ Implementation complete. Ready to deploy.  
**Next:** Deploy to production and monitor for agent subscriptions!
