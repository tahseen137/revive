/**
 * Win-back Email Service for Revive
 * Sends reactivation campaigns to churned customers
 */

import { ChurnedCustomer, recordWinbackEmailSent, generateWinbackOffer } from "./winback";
import { getWinbackEmailTemplate } from "./email-templates";
import { sanitizeEmail } from "./sanitize";

interface SendEmailParams {
  to: string;
  from: string;
  subject: string;
  html: string;
}

interface SendResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

// ============ Email Sending ============

async function sendViaResend(params: SendEmailParams): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { success: false, error: "RESEND_API_KEY not configured" };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    
    const { data, error } = await resend.emails.send({
      from: params.from,
      to: params.to,
      subject: params.subject,
      html: params.html,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, messageId: data?.id };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown email error";
    return { success: false, error: message };
  }
}

async function sendEmail(params: SendEmailParams): Promise<SendResult> {
  // Try Resend first
  if (process.env.RESEND_API_KEY) {
    return sendViaResend(params);
  }

  // Fallback: log to console (sanitize email)
  console.log("📧 [WIN-BACK EMAIL - DEV MODE] Would send email:");
  console.log(`   To: ${sanitizeEmail(params.to)}`);
  console.log(`   From: ${params.from}`);
  console.log(`   Subject: ${params.subject}`);
  console.log(`   Body length: ${params.html.length} chars`);
  
  return {
    success: true,
    messageId: `dev-winback-${Date.now()}`,
  };
}

// ============ Win-back Email Flow ============

/**
 * Send a win-back email to a churned customer
 * Returns the messageId if successful, null otherwise
 */
export async function sendWinbackEmail(
  customer: ChurnedCustomer,
  emailType: "winback_30" | "winback_60" | "winback_90",
  businessName: string = "Your Service"
): Promise<{ messageId?: string } | null> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://revive-seven-eosin.vercel.app";
  const fromEmail = process.env.EMAIL_FROM || `hello@${appUrl.replace(/https?:\/\//, "")}`;

  // Generate personalized offer
  const offer = generateWinbackOffer(customer, emailType);

  // Calculate days since churn
  const daysSinceChurn = Math.floor(
    (Date.now() - customer.churnedAt) / (1000 * 60 * 60 * 24)
  );

  // Generate reactivation URL
  // In production, this would be a Stripe checkout link or customer portal link
  // For now, we'll use a generic URL
  const reactivateUrl = `${appUrl}/reactivate?customer=${customer.stripeCustomerId}&offer=${emailType}`;

  // Format plan amount
  const planAmount = customer.planAmount
    ? `$${(customer.planAmount / 100).toFixed(2)}`
    : undefined;

  // Build email template data
  const templateData = {
    customerName: customer.customerName || "there",
    businessName,
    planName: customer.planName,
    planAmount,
    discountMessage: offer.message,
    reactivateUrl,
    churnDays: daysSinceChurn,
  };

  const { subject, html } = getWinbackEmailTemplate(emailType, templateData);

  // Send email
  const result = await sendEmail({
    to: customer.customerEmail,
    from: fromEmail,
    subject,
    html,
  });

  if (!result.success) {
    console.error(`Failed to send ${emailType} email to ${sanitizeEmail(customer.customerEmail)}:`, result.error);
    return null;
  }

  // Record that email was sent
  await recordWinbackEmailSent(
    customer.id,
    emailType,
    result.messageId,
    offer.couponCode
  );

  console.log(`✅ Sent ${emailType} email to ${sanitizeEmail(customer.customerEmail)} (messageId: ${result.messageId})`);
  
  return { messageId: result.messageId };
}

/**
 * Process win-back email queue
 * Called by cron job to send emails to eligible churned customers
 */
export async function processWinbackQueue(
  accountId?: string
): Promise<{ sent: number; failed: number; errors: string[] }> {
  const { getEligibleWinbackCustomers } = await import("./winback");
  
  const eligible = await getEligibleWinbackCustomers(accountId);
  
  let sent = 0;
  let failed = 0;
  const errors: string[] = [];

  for (const { customer, emailType } of eligible) {
    try {
      const result = await sendWinbackEmail(
        customer,
        emailType as "winback_30" | "winback_60" | "winback_90"
      );
      
      if (result) {
        sent++;
      } else {
        failed++;
        errors.push(`Failed to send ${emailType} to ${sanitizeEmail(customer.customerEmail)}`);
      }
    } catch (err: unknown) {
      failed++;
      const message = err instanceof Error ? err.message : "Unknown error";
      errors.push(`Error sending ${emailType} to ${sanitizeEmail(customer.customerEmail)}: ${message}`);
    }
  }

  return { sent, failed, errors };
}
