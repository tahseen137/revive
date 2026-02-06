/**
 * Email Service for Revive
 * 
 * Supports:
 * - Resend (recommended, free tier available)
 * - Console logging fallback for development
 * 
 * Set RESEND_API_KEY in env to use Resend.
 * Without it, emails are logged to console (great for testing).
 */

import { FailedPayment, updateFailedPayment, EmailRecord } from "./db";
import { getEmailTemplate } from "./email-templates";
import { getDunningEmailType } from "./retry-engine";
import { generateCardUpdateToken } from "./auth";

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

  // Fallback: log to console
  console.log("📧 [EMAIL - DEV MODE] Would send email:");
  console.log(`   To: ${params.to}`);
  console.log(`   From: ${params.from}`);
  console.log(`   Subject: ${params.subject}`);
  console.log(`   Body length: ${params.html.length} chars`);
  
  return {
    success: true,
    messageId: `dev-${Date.now()}`,
  };
}

// ============ Dunning Email Flow ============

/**
 * Send the appropriate dunning email for a payment
 * Returns the type of email sent, or null if no email needed
 */
export async function sendDunningEmail(
  payment: FailedPayment,
  businessName: string = "Your Service"
): Promise<{ type: string; messageId?: string } | null> {
  const emailType = getDunningEmailType(payment);
  if (!emailType) return null;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://revive-seven-eosin.vercel.app";
  const fromEmail = process.env.EMAIL_FROM || `billing@${appUrl.replace(/https?:\/\//, "")}`;

  // Generate secure HMAC-based card update URL
  let cardUpdateUrl: string;
  try {
    const token = generateCardUpdateToken(payment.id, payment.stripeCustomerId);
    cardUpdateUrl = `${appUrl}/update-payment?token=${token}`;
  } catch {
    // Fallback if CARD_UPDATE_SECRET not set (development)
    console.warn("[Email] CARD_UPDATE_SECRET not configured — card update URL disabled");
    cardUpdateUrl = `${appUrl}/update-payment`;
  }

  const template = getEmailTemplate(emailType, {
    customerName: payment.customerName || "Valued Customer",
    amount: formatCurrency(payment.amount, payment.currency),
    currency: payment.currency,
    businessName,
    cardUpdateUrl,
    invoiceDate: new Date(payment.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    failureReason: payment.failureCode,
  });

  const result = await sendEmail({
    to: payment.customerEmail,
    from: fromEmail,
    subject: template.subject,
    html: template.html,
  });

  if (result.success) {
    // Record the email in payment history
    const emailRecord: EmailRecord = {
      type: emailType,
      timestamp: Date.now(),
      messageId: result.messageId,
    };

    await updateFailedPayment(payment.id, {
      emailsSent: [...payment.emailsSent, emailRecord],
      status: payment.status === "pending" || payment.status === "retrying"
        ? payment.status
        : "dunning",
    });

    return { type: emailType, messageId: result.messageId };
  }

  console.error(`Failed to send ${emailType} email to ${payment.customerEmail}:`, result.error);
  return null;
}

/**
 * Send recovery confirmation email
 */
export async function sendRecoveryEmail(
  payment: FailedPayment,
  businessName: string = "Your Service"
): Promise<void> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://revive-seven-eosin.vercel.app";
  const fromEmail = process.env.EMAIL_FROM || `billing@${appUrl.replace(/https?:\/\//, "")}`;

  const template = getEmailTemplate("payment_recovered", {
    customerName: payment.customerName || "Valued Customer",
    amount: formatCurrency(payment.amount, payment.currency),
    currency: payment.currency,
    businessName,
    cardUpdateUrl: "", // not needed for recovery email
    invoiceDate: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  });

  const result = await sendEmail({
    to: payment.customerEmail,
    from: fromEmail,
    subject: template.subject,
    html: template.html,
  });

  if (result.success) {
    const emailRecord: EmailRecord = {
      type: "payment_recovered",
      timestamp: Date.now(),
      messageId: result.messageId,
    };

    await updateFailedPayment(payment.id, {
      emailsSent: [...payment.emailsSent, emailRecord],
    });
  }
}

/**
 * Process dunning emails for all active failed payments
 */
export async function processDunningQueue(): Promise<{
  sent: number;
  skipped: number;
  errors: number;
}> {
  // Import here to avoid circular deps
  const { getAllPayments } = await import("./db");
  const payments = await getAllPayments();
  
  let sent = 0;
  let skipped = 0;
  let errors = 0;

  for (const payment of payments) {
    // Only send dunning emails for active, non-recovered payments
    if (payment.status === "recovered" || payment.status === "failed") {
      skipped++;
      continue;
    }

    // Check if enough time has passed since last email (min 24 hours)
    const lastEmail = payment.emailsSent[payment.emailsSent.length - 1];
    if (lastEmail && Date.now() - lastEmail.timestamp < 24 * 60 * 60 * 1000) {
      skipped++;
      continue;
    }

    const result = await sendDunningEmail(payment);
    if (result) {
      sent++;
    } else if (result === null) {
      skipped++; // No more emails to send
    } else {
      errors++;
    }
  }

  return { sent, skipped, errors };
}

// ============ Helpers ============

function formatCurrency(amountCents: number, currency: string = "usd"): string {
  const amount = amountCents / 100;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  });
  return formatter.format(amount);
}
