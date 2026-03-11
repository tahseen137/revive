/**
 * Quick test script to verify win-back email generation
 * Run with: npx tsx scripts/test-winback.ts
 */

import { getWinbackEmailTemplate } from "../src/lib/email-templates";

const testData = {
  customerName: "John Doe",
  businessName: "Revive",
  planName: "Growth Plan",
  planAmount: "$49.00",
  discountMessage: "Get 15% off for 2 months",
  reactivateUrl: "https://revive-hq.com/reactivate?token=test123",
  churnDays: 30,
};

console.log("🧪 Testing Win-back Email Templates\n");

// Test all 3 email types
const emailTypes = ["winback_30", "winback_60", "winback_90"] as const;

for (const type of emailTypes) {
  const { subject, html } = getWinbackEmailTemplate(type, testData);
  console.log(`✅ ${type}:`);
  console.log(`   Subject: ${subject}`);
  console.log(`   HTML length: ${html.length} chars`);
  console.log();
}

console.log("✨ All templates generated successfully!");
