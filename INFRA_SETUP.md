# Infrastructure Setup for Revive

## Status: IN PROGRESS

### Upstash Redis Setup

#### What's Already Done:
- ✅ `@upstash/redis` package is installed in package.json
- ✅ Code in `src/lib/db.ts` is ready to use Upstash Redis
- ✅ Falls back to in-memory storage when env vars aren't set

#### What Needs to Be Done:

1. **Create Upstash Redis Database**
   - Go to https://console.upstash.com/redis
   - Log in with Google account (tahseen137@gmail.com - already set up)
   - Click "Create Database"
   - Name: `revive-production`
   - Select Primary Region (preferably closest to Vercel deployment - US East recommended)
   - Free tier is sufficient for now
   - Enable eviction if needed

2. **Get Credentials**
   After creating the database, you'll see:
   - `UPSTASH_REDIS_REST_URL` (or `KV_REST_API_URL`)
   - `UPSTASH_REDIS_REST_TOKEN` (or `KV_REST_API_TOKEN`)

3. **Add to Vercel**
   ```bash
   cd /Users/clawdbot/.openclaw/workspace/revive
   vercel env add KV_REST_API_URL
   # Paste the URL when prompted
   
   vercel env add KV_REST_API_TOKEN
   # Paste the token when prompted
   ```

4. **Add to Local .env.local**
   ```bash
   echo "KV_REST_API_URL=your_url_here" >> .env.local
   echo "KV_REST_API_TOKEN=your_token_here" >> .env.local
   ```

5. **Verify Setup**
   ```bash
   npm run dev
   # Check console for "connected: true, type: upstash-redis"
   ```

6. **Deploy**
   ```bash
   git add .
   git commit -m "Add Upstash Redis configuration"
   git push
   vercel --prod --yes
   ```

### Resend Email Setup

#### What's Already Done:
- ✅ `resend` package is installed in package.json
- ✅ Code in `src/lib/email-service.ts` is ready to use Resend
- ✅ Falls back to console logging when RESEND_API_KEY isn't set

#### What Needs to Be Done:

1. **Create Resend Account**
   - Go to https://resend.com/signup
   - Sign up (free tier includes 100 emails/day, 3,000/month)
   
2. **Get API Key**
   - Go to https://resend.com/api-keys
   - Click "Create API Key"
   - Name: "Revive Production"
   - Copy the key (starts with `re_`)

3. **Add to Vercel**
   ```bash
   vercel env add RESEND_API_KEY
   # Paste the API key when prompted
   ```

4. **Add to Local .env.local**
   ```bash
   echo "RESEND_API_KEY=your_api_key_here" >> .env.local
   ```

5. **Configure Sender Domain (Optional but Recommended)**
   - Go to https://resend.com/domains
   - Add your domain (revive-hq.com)
   - Add DNS records as instructed
   - Once verified, update EMAIL_FROM in .env:
     ```bash
     vercel env add EMAIL_FROM
     # Enter: billing@revive-hq.com
     ```

6. **Test Email Sending**
   - Trigger a test failed payment notification
   - Check Resend dashboard for sent emails

## Current Environment Variables Needed

```bash
# Stripe (already configured)
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_CONNECT_CLIENT_ID=ca_...

# App URL
NEXT_PUBLIC_APP_URL=https://revive-hq.com

# Upstash Redis (TO BE ADDED)
KV_REST_API_URL=https://...upstash.io
KV_REST_API_TOKEN=...

# Resend (TO BE ADDED)
RESEND_API_KEY=re_...
EMAIL_FROM=billing@revive-hq.com
```

## Testing Checklist

After setup:
- [ ] Redis connection shows as "upstash-redis" (not "in-memory")
- [ ] Failed payment data persists across server restarts
- [ ] Emails send successfully via Resend
- [ ] Dashboard shows correct stats
- [ ] Stripe webhooks create failed payments in Redis
- [ ] Retry cron job processes payments from Redis queue

## Notes

- The codebase is already fully prepared for both services
- No code changes needed - just environment variable configuration
- Free tiers are sufficient for initial launch
- Can scale up both services as usage grows
