/**
 * Test script for Paddle integration
 * Run with: node scripts/test-paddle-integration.mjs
 */

import { createRequire } from "module";
const require = createRequire(import.meta.url);

// Mock environment variables for testing
process.env.PADDLE_API_KEY = process.env.PADDLE_API_KEY || "test_paddle_key";
process.env.PADDLE_ENVIRONMENT = process.env.PADDLE_ENVIRONMENT || "sandbox";

console.log("🧪 Testing Paddle Integration for Revive\n");

// Test 1: Paddle Client Initialization
console.log("1️⃣  Testing Paddle Client Initialization...");
try {
  const { getPaddle } = await import("../src/lib/paddle.ts");
  const paddle = getPaddle();
  console.log("   ✅ Paddle client initialized");
  console.log(`   Environment: ${process.env.PADDLE_ENVIRONMENT}`);
} catch (err) {
  console.log("   ❌ Failed:", err.message);
}

// Test 2: Payment Provider Detection
console.log("\n2️⃣  Testing Payment Provider Detection...");
try {
  const { isPaddlePayment } = await import("../src/lib/paddle-retry-engine.ts");
  
  const testPayments = [
    {
      id: "test_1",
      stripeInvoiceId: "paddle:txn_123",
      stripeCustomerId: "paddle:ctm_123",
      connectedAccountId: "paddle",
    },
    {
      id: "test_2",
      stripeInvoiceId: "in_123",
      stripeCustomerId: "cus_123",
      connectedAccountId: "direct",
    },
  ];
  
  const paddleResult = isPaddlePayment(testPayments[0]);
  const stripeResult = isPaddlePayment(testPayments[1]);
  
  console.log(`   Paddle payment detected: ${paddleResult ? "✅" : "❌"}`);
  console.log(`   Stripe payment detected: ${!stripeResult ? "✅" : "❌"}`);
} catch (err) {
  console.log("   ❌ Failed:", err.message);
}

// Test 3: Payment URL Helpers
console.log("\n3️⃣  Testing Payment URL Helpers...");
try {
  const { getPaymentUpdateUrl, getPaymentProvider } = await import("../src/lib/payment-url-helpers.ts");
  
  const paddlePayment = {
    id: "test_paddle",
    stripeInvoiceId: "paddle:txn_abc123",
    stripeCustomerId: "paddle:ctm_abc123",
    connectedAccountId: "paddle",
  };
  
  const stripePayment = {
    id: "test_stripe",
    stripeInvoiceId: "in_abc123",
    stripeCustomerId: "cus_abc123",
    connectedAccountId: "direct",
  };
  
  const paddleUrl = getPaymentUpdateUrl(paddlePayment);
  const stripeUrl = getPaymentUpdateUrl(stripePayment);
  const paddleProvider = getPaymentProvider(paddlePayment);
  const stripeProvider = getPaymentProvider(stripePayment);
  
  console.log(`   Paddle URL: ${paddleUrl.includes("/paddle") ? "✅" : "❌"} - ${paddleUrl}`);
  console.log(`   Stripe URL: ${stripeUrl.includes("update-payment?") ? "✅" : "❌"} - ${stripeUrl}`);
  console.log(`   Paddle provider: ${paddleProvider === "paddle" ? "✅" : "❌"}`);
  console.log(`   Stripe provider: ${stripeProvider === "stripe" ? "✅" : "❌"}`);
} catch (err) {
  console.log("   ❌ Failed:", err.message);
}

// Test 4: Failure Code Mapping
console.log("\n4️⃣  Testing Paddle Failure Code Mapping...");
try {
  // The mapping is in the webhook handler, so we'll just verify the file exists
  const fs = await import("fs");
  const webhookPath = "./src/app/api/webhooks/paddle/route.ts";
  
  if (fs.existsSync(webhookPath)) {
    const content = fs.readFileSync(webhookPath, "utf-8");
    const hasMapping = content.includes("mapPaddleFailureCode");
    console.log(`   Failure code mapping: ${hasMapping ? "✅" : "❌"}`);
    
    // Check for key failure codes
    const codes = ["card_declined", "expired_card", "insufficient_funds", "authentication_required"];
    const allCodesPresent = codes.every(code => content.includes(code));
    console.log(`   All standard codes present: ${allCodesPresent ? "✅" : "❌"}`);
  } else {
    console.log("   ❌ Webhook file not found");
  }
} catch (err) {
  console.log("   ❌ Failed:", err.message);
}

// Test 5: Retry Engine Integration
console.log("\n5️⃣  Testing Retry Engine Integration...");
try {
  const { getRetryStrategy, shouldSkipRetries, getMaxRetries } = await import("../src/lib/retry-engine.ts");
  
  const testCases = [
    { code: "card_declined", expectedRetries: 3, expectedSkip: false },
    { code: "insufficient_funds", expectedRetries: 4, expectedSkip: false },
    { code: "expired_card", expectedRetries: 0, expectedSkip: true },
    { code: "processing_error", expectedRetries: 1, expectedSkip: false },
  ];
  
  for (const test of testCases) {
    const maxRetries = getMaxRetries(test.code);
    const skip = shouldSkipRetries(test.code);
    const pass = maxRetries === test.expectedRetries && skip === test.expectedSkip;
    
    console.log(`   ${test.code}: ${pass ? "✅" : "❌"} (retries: ${maxRetries}, skip: ${skip})`);
  }
} catch (err) {
  console.log("   ❌ Failed:", err.message);
}

console.log("\n✨ Paddle Integration Test Complete!\n");
console.log("📋 Summary:");
console.log("   - Paddle client library: src/lib/paddle.ts");
console.log("   - Paddle webhook handler: src/app/api/webhooks/paddle/route.ts");
console.log("   - Paddle retry engine: src/lib/paddle-retry-engine.ts");
console.log("   - Payment URL helpers: src/lib/payment-url-helpers.ts");
console.log("   - Update payment page: src/app/update-payment/paddle/page.tsx");
console.log("   - Documentation: PADDLE_INTEGRATION.md\n");
console.log("🚀 To complete setup:");
console.log("   1. Set PADDLE_API_KEY in .env");
console.log("   2. Set PADDLE_WEBHOOK_SECRET in .env");
console.log("   3. Configure webhooks in Paddle dashboard");
console.log("   4. Deploy to production");
