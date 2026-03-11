/**
 * Helper utilities for Failed Payment Wall integration
 * Use these functions to set customer ID after login or checkout
 */

/**
 * Set the customer ID for the current session
 * This enables the FailedPaymentWall to check payment status
 * 
 * Call this after:
 * - User logs in
 * - Stripe checkout completes
 * - User session is restored
 * 
 * @param customerId - Stripe customer ID (e.g., "cus_xxx")
 * @param storage - Where to store the ID ("cookie" | "localStorage" | "both")
 */
export function setCustomerId(
  customerId: string,
  storage: "cookie" | "localStorage" | "both" = "both"
): void {
  if (!customerId || !customerId.startsWith("cus_")) {
    console.warn("[setCustomerId] Invalid customer ID format:", customerId);
    return;
  }

  if (storage === "cookie" || storage === "both") {
    // Set cookie (persists across sessions, HttpOnly-safe)
    const maxAge = 365 * 24 * 60 * 60; // 1 year
    document.cookie = `revive_customer_id=${customerId}; path=/; max-age=${maxAge}; SameSite=Lax`;
  }

  if (storage === "localStorage" || storage === "both") {
    // Set localStorage (faster access, doesn't send with requests)
    localStorage.setItem("revive_customer_id", customerId);
  }
}

/**
 * Get the current customer ID from session storage
 * Checks in order: localStorage → cookie
 * 
 * @returns Customer ID or null if not set
 */
export function getCustomerId(): string | null {
  // Check localStorage first (faster)
  if (typeof localStorage !== "undefined") {
    const id = localStorage.getItem("revive_customer_id");
    if (id) return id;
  }

  // Check cookie
  if (typeof document !== "undefined") {
    const match = document.cookie.match(/revive_customer_id=([^;]+)/);
    if (match) return match[1];
  }

  return null;
}

/**
 * Clear the customer ID from session storage
 * Call this on logout
 */
export function clearCustomerId(): void {
  // Clear localStorage
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem("revive_customer_id");
  }

  // Clear cookie
  if (typeof document !== "undefined") {
    document.cookie = "revive_customer_id=; path=/; max-age=0";
  }
}

/**
 * Fetch customer ID from Stripe after checkout session
 * Use this in your checkout success page
 * 
 * @param sessionId - Stripe checkout session ID
 * @returns Customer ID or null if not found
 */
export async function getCustomerIdFromCheckoutSession(
  sessionId: string
): Promise<string | null> {
  try {
    const response = await fetch(
      `/api/stripe/checkout-session?session_id=${sessionId}`
    );
    
    if (!response.ok) {
      console.error("[getCustomerIdFromCheckoutSession] API error:", response.statusText);
      return null;
    }

    const data = await response.json();
    return data.customer || null;
  } catch (error) {
    console.error("[getCustomerIdFromCheckoutSession] Error:", error);
    return null;
  }
}

/**
 * Example: Set customer ID after Stripe checkout redirect
 * 
 * Usage in /checkout/success page:
 * ```tsx
 * useEffect(() => {
 *   const urlParams = new URLSearchParams(window.location.search);
 *   const sessionId = urlParams.get('session_id');
 *   
 *   if (sessionId) {
 *     handleCheckoutSuccess(sessionId);
 *   }
 * }, []);
 * ```
 */
export async function handleCheckoutSuccess(sessionId: string): Promise<void> {
  const customerId = await getCustomerIdFromCheckoutSession(sessionId);
  if (customerId) {
    setCustomerId(customerId);
    console.log("[handleCheckoutSuccess] Customer ID set:", customerId);
  } else {
    console.warn("[handleCheckoutSuccess] Failed to fetch customer ID");
  }
}

/**
 * Example: Set customer ID after user login
 * 
 * Usage in login handler:
 * ```tsx
 * async function handleLogin(email: string, password: string) {
 *   const response = await fetch('/api/auth/login', {
 *     method: 'POST',
 *     body: JSON.stringify({ email, password }),
 *   });
 *   
 *   const { user } = await response.json();
 *   
 *   if (user.stripeCustomerId) {
 *     setCustomerId(user.stripeCustomerId);
 *   }
 * }
 * ```
 */

/**
 * Validate customer ID format
 * Stripe customer IDs start with "cus_"
 * 
 * @param customerId - ID to validate
 * @returns true if valid format
 */
export function isValidCustomerId(customerId: string): boolean {
  return typeof customerId === "string" && customerId.startsWith("cus_");
}
