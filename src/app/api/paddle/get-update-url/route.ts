import { NextRequest, NextResponse } from "next/server";
import { getPaddle } from "@/lib/paddle";

/**
 * API endpoint to get Paddle payment update URL
 * 
 * Paddle's approach:
 * - Customer can update payment method via subscription management portal
 * - We need to generate a one-time access link
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const transactionId = searchParams.get("transaction");
    const customerId = searchParams.get("customer");

    if (!transactionId || !customerId) {
      return NextResponse.json(
        { error: "Missing transaction or customer ID" },
        { status: 400 }
      );
    }

    const paddle = getPaddle();

    // Fetch the transaction to get the subscription ID
    const { data: transaction } = await paddle.getTransaction(transactionId);

    if (!transaction.subscriptionId) {
      return NextResponse.json(
        { error: "Transaction not associated with a subscription" },
        { status: 400 }
      );
    }

    // For Paddle, we'll use the subscription management portal
    // This is a simplified version - in production, you'd want to:
    // 1. Generate a one-time access token
    // 2. Create a custom portal page with Paddle.js
    // 3. Or use Paddle's billing portal API
    
    const paddleDomain = process.env.PADDLE_ENVIRONMENT === "sandbox"
      ? "sandbox-vendors.paddle.com"
      : "vendors.paddle.com";

    // Paddle's subscription management URL format
    // Note: This is a simplified approach. For production, use Paddle's billing portal API
    const updateUrl = `https://${paddleDomain}/subscriptions/customers/manage/${customerId}`;

    return NextResponse.json({
      updateUrl,
      subscriptionId: transaction.subscriptionId,
    });
  } catch (error: unknown) {
    console.error("[Paddle Update URL] Error:", error);
    const message = error instanceof Error ? error.message : "Failed to generate update URL";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
