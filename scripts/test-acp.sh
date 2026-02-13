#!/bin/bash
# Test ACP endpoints for Revive

echo "🧪 Testing Revive ACP Implementation"
echo "====================================="
echo ""

# Test 1: Discovery file
echo "1️⃣  Testing .well-known/acp.json..."
if [ -f "public/.well-known/acp.json" ]; then
  echo "   ✅ Discovery file exists"
  cat public/.well-known/acp.json | jq . > /dev/null 2>&1
  if [ $? -eq 0 ]; then
    echo "   ✅ JSON is valid"
  else
    echo "   ❌ JSON is invalid"
    exit 1
  fi
else
  echo "   ❌ Discovery file not found"
  exit 1
fi
echo ""

# Test 2: Check if API route exists
echo "2️⃣  Testing API route file..."
if [ -f "src/app/api/acp/route.ts" ]; then
  echo "   ✅ API route exists at src/app/api/acp/route.ts"
else
  echo "   ❌ API route not found"
  exit 1
fi
echo ""

# Test 3: Check TypeScript compilation
echo "3️⃣  Testing TypeScript compilation..."
npx tsc --noEmit src/app/api/acp/route.ts 2>&1 | grep -q "error" && {
  echo "   ❌ TypeScript errors found"
  npx tsc --noEmit src/app/api/acp/route.ts
  exit 1
} || echo "   ✅ No TypeScript errors"
echo ""

# Test 4: Check environment variables
echo "4️⃣  Testing Stripe configuration..."
if [ -f ".env.local" ]; then
  grep -q "STRIPE_SECRET_KEY" .env.local && echo "   ✅ Stripe secret key configured" || echo "   ❌ Stripe secret key missing"
  grep -q "STRIPE_PUBLISHABLE_KEY" .env.local && echo "   ✅ Stripe publishable key configured" || echo "   ❌ Stripe publishable key missing"
else
  echo "   ⚠️  .env.local not found"
fi
echo ""

echo "✅ ACP Implementation Tests Complete!"
echo ""
echo "📋 Next Steps:"
echo "   1. Start dev server: npm run dev"
echo "   2. Test GET endpoint: curl http://localhost:3000/api/acp"
echo "   3. Test discovery: curl http://localhost:3000/.well-known/acp.json"
echo "   4. Deploy and update DNS to serve at revive-hq.com"
