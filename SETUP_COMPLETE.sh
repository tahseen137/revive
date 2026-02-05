#!/bin/bash

# Revive Infrastructure Setup Script
# Run this after manually creating Upstash Redis and Resend accounts

set -e

echo "🔧 Revive Infrastructure Setup"
echo "================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Run this script from the revive project root"
    exit 1
fi

# Step 1: Upstash Redis Setup
echo "📦 Step 1: Upstash Redis Configuration"
echo ""
echo "Please complete these steps:"
echo "1. Go to https://console.upstash.com/redis (already logged in with Google)"
echo "2. Click 'Create Database'"
echo "3. Name: revive-production"
echo "4. Primary Region: us-east-1 (or closest to your users)"
echo "5. Keep eviction OFF for persistent storage"
echo "6. Click 'Create'"
echo "7. Copy the REST URL and TOKEN from the database details page"
echo ""
read -p "Have you created the database and copied the credentials? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Please create the database first, then run this script again."
    exit 1
fi

# Get Upstash credentials
echo ""
read -p "Enter UPSTASH REST URL: " UPSTASH_URL
read -p "Enter UPSTASH REST TOKEN: " UPSTASH_TOKEN

# Add to Vercel
echo ""
echo "Adding credentials to Vercel..."
echo "$UPSTASH_URL" | vercel env add KV_REST_API_URL production
echo "$UPSTASH_TOKEN" | vercel env add KV_REST_API_TOKEN production

# Add to local .env
echo ""
echo "Adding credentials to local .env.local..."
if ! grep -q "KV_REST_API_URL" .env.local; then
    echo "KV_REST_API_URL=$UPSTASH_URL" >> .env.local
fi
if ! grep -q "KV_REST_API_TOKEN" .env.local; then
    echo "KV_REST_API_TOKEN=$UPSTASH_TOKEN" >> .env.local
fi

echo "✅ Upstash Redis configured!"

# Step 2: Resend Setup
echo ""
echo "📧 Step 2: Resend Email Configuration"
echo ""
echo "Please complete these steps:"
echo "1. Go to https://resend.com/signup (if not already registered)"
echo "2. Verify your email"
echo "3. Go to https://resend.com/api-keys"
echo "4. Click 'Create API Key'"
echo "5. Name: Revive Production"
echo "6. Copy the API key (starts with 're_')"
echo ""
read -p "Have you created the Resend API key? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Setup paused. Run this script again when ready."
    exit 0
fi

# Get Resend API key
echo ""
read -p "Enter RESEND API KEY: " RESEND_KEY

# Add to Vercel
echo ""
echo "Adding Resend API key to Vercel..."
echo "$RESEND_KEY" | vercel env add RESEND_API_KEY production

# Add to local .env
echo ""
echo "Adding Resend API key to local .env.local..."
if ! grep -q "RESEND_API_KEY" .env.local; then
    echo "RESEND_API_KEY=$RESEND_KEY" >> .env.local
fi

# Set default FROM email
if ! grep -q "EMAIL_FROM" .env.local; then
    echo "EMAIL_FROM=billing@revive-hq.com" >> .env.local
fi

echo "✅ Resend Email configured!"

# Step 3: Test locally
echo ""
echo "🧪 Step 3: Testing locally..."
echo ""
echo "Starting development server to test connections..."
echo "Check the console for 'connected: true, type: upstash-redis'"
echo ""
echo "Press Ctrl+C to stop the dev server when done testing"
echo ""
npm run dev &
DEV_PID=$!

sleep 5
echo ""
echo "Dev server started (PID: $DEV_PID)"
echo "Visit http://localhost:3000 to test"
echo ""
read -p "Press Enter when done testing (this will stop the dev server)..."

kill $DEV_PID 2>/dev/null || true

# Step 4: Deploy
echo ""
echo "🚀 Step 4: Deploying to production..."
echo ""

# Commit changes (if any)
git add .env.local INFRA_SETUP.md SETUP_COMPLETE.sh || true
git commit -m "Configure Upstash Redis and Resend for production" || true
git push || true

# Deploy
echo "Deploying to Vercel..."
vercel --prod --yes

echo ""
echo "✅ Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Visit https://revive-hq.com and verify the site loads"
echo "2. Check Vercel dashboard for deployment status"
echo "3. Test a Stripe webhook to verify Redis persistence"
echo "4. Monitor Upstash and Resend dashboards for usage"
echo ""
echo "📊 Dashboard Links:"
echo "   Upstash: https://console.upstash.com/redis"
echo "   Resend: https://resend.com/emails"
echo "   Vercel: https://vercel.com/dashboard"
echo ""
