# Waitlist Notification System

## Overview

The Revive waitlist now includes automatic notifications when someone signs up. Notifications are sent through multiple channels for redundancy.

## Features

### 1. File Logging
- **Location:** `data/waitlist.log`
- **Format:** `[timestamp] New signup: email (source: source_name)`
- **Always enabled** - works without any configuration

### 2. Email Notifications (via Resend)
- Sends email to the configured admin email when someone signs up
- **Required env variables:**
  - `RESEND_API_KEY` - Your Resend API key
  - `RESEND_FROM_EMAIL` - Sender email (must be verified domain)
  - `NOTIFY_EMAIL` - Admin email to receive notifications (e.g., tahseen137@gmail.com)

### 3. Webhook Notifications (Discord/Slack)
- Sends JSON payload to a webhook URL
- **Required env variable:**
  - `WAITLIST_WEBHOOK_URL` - Your Discord or Slack webhook URL

**Discord webhook format:**
```json
{
  "content": "🎉 **New Revive Waitlist Signup**\n📧 Email: user@example.com\n📍 Source: landing\n⏰ Time: 2/5/2026, 6:30:00 PM"
}
```

## Admin Endpoint

### GET /api/admin/waitlist

Protected endpoint to view all waitlist signups.

**Authentication:**
- Requires `Authorization` header with the value from `ADMIN_SECRET` env variable
- Supports both `Bearer <token>` and just `<token>` format

**Usage:**

```bash
# Get all signups (JSON)
curl -H "Authorization: Bearer your_admin_secret" \
  https://revive.vercel.app/api/admin/waitlist

# Get signups with log entries
curl -H "Authorization: Bearer your_admin_secret" \
  "https://revive.vercel.app/api/admin/waitlist?log=true"

# Export as CSV
curl -H "Authorization: Bearer your_admin_secret" \
  "https://revive.vercel.app/api/admin/waitlist?format=csv" > waitlist.csv
```

**Response:**
```json
{
  "count": 5,
  "signups": [
    {
      "email": "user@example.com",
      "timestamp": "2026-02-05T23:30:00.000Z",
      "source": "landing"
    }
  ],
  "log": [
    "[2026-02-05T23:30:00.000Z] New signup: user@example.com (source: landing)"
  ]
}
```

## Environment Variables

Add these to your `.env.local` (local dev) and Vercel project settings (production):

```env
# Required for email notifications
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=notifications@yourdomain.com
NOTIFY_EMAIL=tahseen137@gmail.com

# Required for admin endpoint security
ADMIN_SECRET=your_secure_random_string

# Optional: Discord/Slack webhook
WAITLIST_WEBHOOK_URL=https://discord.com/api/webhooks/your_webhook_url
```

## Setup Instructions

### 1. Get a Resend API Key
1. Go to https://resend.com/
2. Sign up and verify your domain
3. Create an API key
4. Add to environment variables

### 2. Configure Vercel Environment Variables
```bash
vercel env add RESEND_API_KEY
vercel env add RESEND_FROM_EMAIL
vercel env add NOTIFY_EMAIL
vercel env add ADMIN_SECRET
```

### 3. (Optional) Set up Discord Webhook
1. Go to your Discord server settings
2. Integrations → Webhooks → New Webhook
3. Copy the webhook URL
4. Add to `WAITLIST_WEBHOOK_URL` env variable

### 4. Test the Notification
```bash
# Test signup
curl -X POST https://revive.vercel.app/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","source":"test"}'

# Check admin endpoint
curl -H "Authorization: your_admin_secret" \
  https://revive.vercel.app/api/admin/waitlist
```

## Security Notes

- The old `GET /api/waitlist` endpoint is now deprecated and returns 403
- All waitlist viewing must go through the authenticated admin endpoint
- Store `ADMIN_SECRET` securely - don't commit to git
- Notifications are fire-and-forget (don't block user signup response)
- Failed notifications are logged to console but don't affect signup success

## Files Changed

- `src/app/api/waitlist/route.ts` - Added notification system
- `src/app/api/admin/waitlist/route.ts` - New authenticated admin endpoint
- `.env.local` - Added notification configuration
