/**
 * Paddle SDK wrapper for Revive
 * Supports Paddle Billing API (Paddle Classic deprecated)
 */

interface PaddleConfig {
  apiKey: string;
  environment?: "sandbox" | "production";
}

interface PaddleCustomer {
  id: string;
  email: string;
  name?: string;
  customData?: Record<string, unknown>;
}

interface PaddleSubscription {
  id: string;
  customerId: string;
  status: "active" | "trialing" | "past_due" | "paused" | "canceled";
  items: Array<{
    priceId: string;
    quantity: number;
  }>;
  currentBillingPeriod: {
    startsAt: string;
    endsAt: string;
  };
  scheduledChange?: {
    action: string;
    effectiveAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface PaddleTransaction {
  id: string;
  subscriptionId?: string;
  customerId: string;
  status: "draft" | "ready" | "billed" | "paid" | "completed" | "canceled" | "past_due";
  billingPeriod?: {
    startsAt: string;
    endsAt: string;
  };
  details: {
    totals: {
      subtotal: string;
      tax: string;
      total: string;
      credit: string;
      balance: string;
      grandTotal: string;
      fee?: string;
      earnings?: string;
      currencyCode: string;
    };
  };
  payments: Array<{
    amount: string;
    status: "pending" | "authorized" | "captured" | "failed" | "canceled";
    errorCode?: string;
    methodDetails?: {
      type: string;
      card?: {
        type: string;
        last4: string;
        expiryMonth: number;
        expiryYear: number;
      };
    };
  }>;
  createdAt: string;
  updatedAt: string;
  billedAt?: string;
}

class PaddleClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(config: PaddleConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.environment === "sandbox"
      ? "https://sandbox-api.paddle.com"
      : "https://api.paddle.com";
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      "Authorization": `Bearer ${this.apiKey}`,
      "Content-Type": "application/json",
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: { message: "Unknown error" } }));
      throw new Error(`Paddle API error: ${error.error?.message || response.statusText}`);
    }

    return response.json();
  }

  async getCustomer(customerId: string): Promise<{ data: PaddleCustomer }> {
    return this.request<{ data: PaddleCustomer }>(`/customers/${customerId}`);
  }

  async getSubscription(subscriptionId: string): Promise<{ data: PaddleSubscription }> {
    return this.request<{ data: PaddleSubscription }>(`/subscriptions/${subscriptionId}`);
  }

  async getTransaction(transactionId: string): Promise<{ data: PaddleTransaction }> {
    return this.request<{ data: PaddleTransaction }>(`/transactions/${transactionId}`);
  }

  async pauseSubscription(
    subscriptionId: string,
    options?: { effectiveFrom?: "immediately" | "next_billing_period" }
  ): Promise<{ data: PaddleSubscription }> {
    return this.request<{ data: PaddleSubscription }>(
      `/subscriptions/${subscriptionId}/pause`,
      {
        method: "POST",
        body: JSON.stringify(options || {}),
      }
    );
  }

  async resumeSubscription(
    subscriptionId: string,
    options?: { effectiveFrom?: "immediately" | "next_billing_period" }
  ): Promise<{ data: PaddleSubscription }> {
    return this.request<{ data: PaddleSubscription }>(
      `/subscriptions/${subscriptionId}/resume`,
      {
        method: "POST",
        body: JSON.stringify(options || {}),
      }
    );
  }

  async cancelSubscription(
    subscriptionId: string,
    options?: { effectiveFrom?: "immediately" | "next_billing_period" }
  ): Promise<{ data: PaddleSubscription }> {
    return this.request<{ data: PaddleSubscription }>(
      `/subscriptions/${subscriptionId}/cancel`,
      {
        method: "POST",
        body: JSON.stringify(options || {}),
      }
    );
  }

  /**
   * Retry a failed transaction
   * Paddle doesn't have a direct retry API - we simulate by updating the subscription
   */
  async retryTransaction(transactionId: string): Promise<{ success: boolean; message: string }> {
    try {
      const { data: transaction } = await this.getTransaction(transactionId);
      
      if (!transaction.subscriptionId) {
        return { success: false, message: "Transaction not associated with subscription" };
      }

      // For Paddle, we resume the subscription if it's paused/past_due
      const { data: subscription } = await this.getSubscription(transaction.subscriptionId);
      
      if (subscription.status === "past_due" || subscription.status === "paused") {
        await this.resumeSubscription(transaction.subscriptionId, { effectiveFrom: "immediately" });
        return { success: true, message: "Subscription resumed, payment will retry automatically" };
      }

      return { success: false, message: `Subscription status: ${subscription.status}` };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return { success: false, message };
    }
  }

  /**
   * Verify webhook signature
   * Paddle uses HMAC-SHA256 with ts-signature format
   */
  verifyWebhookSignature(
    body: string,
    signature: string,
    secret: string
  ): boolean {
    try {
      // Paddle signature format: "ts=<timestamp>;h1=<signature>"
      const parts = signature.split(";");
      const tsMatch = parts[0]?.match(/ts=(\d+)/);
      const h1Match = parts[1]?.match(/h1=([a-f0-9]+)/);

      if (!tsMatch || !h1Match) {
        return false;
      }

      const timestamp = tsMatch[1];
      const expectedSignature = h1Match[1];

      // Create the signed payload: timestamp + ":" + body
      const signedPayload = `${timestamp}:${body}`;

      // Compute HMAC-SHA256
      const crypto = require("crypto");
      const hmac = crypto.createHmac("sha256", secret);
      hmac.update(signedPayload);
      const computedSignature = hmac.digest("hex");

      // Constant-time comparison
      return crypto.timingSafeEqual(
        Buffer.from(expectedSignature),
        Buffer.from(computedSignature)
      );
    } catch {
      return false;
    }
  }
}

let _paddle: PaddleClient | null = null;

/**
 * Get the Paddle client instance (lazy initialization)
 */
export function getPaddle(): PaddleClient {
  if (!_paddle) {
    const apiKey = process.env.PADDLE_API_KEY;
    const environment = process.env.PADDLE_ENVIRONMENT as "sandbox" | "production" | undefined;

    if (!apiKey) {
      throw new Error("PADDLE_API_KEY is not set");
    }

    _paddle = new PaddleClient({
      apiKey,
      environment: environment || "production",
    });
  }
  return _paddle;
}

// Export types
export type {
  PaddleConfig,
  PaddleCustomer,
  PaddleSubscription,
  PaddleTransaction,
};
export { PaddleClient };
