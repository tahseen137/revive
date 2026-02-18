/**
 * PII Sanitization utilities for logging
 * Prevents sensitive customer data from appearing in logs
 */

/**
 * Sanitize an email address for logging.
 * Example: "tahseen@example.com" -> "ta***@example.com"
 */
export function sanitizeEmail(email: string | undefined | null): string {
  if (!email) return "[no email]";
  const [local, domain] = email.split("@");
  if (!domain) return "***";
  const visible = local.substring(0, 2);
  return `${visible}***@${domain}`;
}

/**
 * Sanitize a customer name for logging.
 * Example: "John Smith" -> "Jo*** Sm***"
 */
export function sanitizeName(name: string | undefined | null): string {
  if (!name) return "[no name]";
  return name.split(" ").map(part => 
    part.length <= 2 ? "***" : `${part.substring(0, 2)}***`
  ).join(" ");
}

/**
 * Sanitize a Stripe customer ID for logging (keep prefix).
 * Example: "cus_NffrFeUfNV2Hib" -> "cus_Nff***"
 */
export function sanitizeCustomerId(customerId: string | undefined | null): string {
  if (!customerId) return "[no id]";
  if (customerId.length <= 7) return "***";
  return `${customerId.substring(0, 7)}***`;
}

/**
 * Log helper that automatically sanitizes PII fields.
 * Use for structured logging with customer data.
 */
export function logSafe(prefix: string, data: Record<string, unknown>): void {
  const sanitized = { ...data };
  
  // Sanitize known PII fields
  if (typeof sanitized.email === "string") {
    sanitized.email = sanitizeEmail(sanitized.email);
  }
  if (typeof sanitized.customerEmail === "string") {
    sanitized.customerEmail = sanitizeEmail(sanitized.customerEmail);
  }
  if (typeof sanitized.customerName === "string") {
    sanitized.customerName = sanitizeName(sanitized.customerName);
  }
  if (typeof sanitized.customerId === "string") {
    sanitized.customerId = sanitizeCustomerId(sanitized.customerId);
  }
  if (typeof sanitized.stripeCustomerId === "string") {
    sanitized.stripeCustomerId = sanitizeCustomerId(sanitized.stripeCustomerId);
  }
  
  console.log(prefix, JSON.stringify(sanitized));
}
