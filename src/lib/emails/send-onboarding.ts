/**
 * Onboarding Email Sender
 *
 * Utility functions the webhook/cron can call to send lifecycle emails
 * to Revive users (not their end-customers).
 *
 * Usage:
 *   import { sendWelcomeEmail, sendCheckinEmail, sendRecoveryNotification } from "@/lib/emails/send-onboarding";
 */

import { Resend } from "resend";
import {
  welcomeEmail,
  checkinEmail,
  recoveryNotificationEmail,
  type WelcomeEmailData,
  type CheckinEmailData,
  type RecoveryEmailData,
} from "./onboarding-templates";

// ─── Shared Send ─────────────────────────────────────────────────────────────

interface SendResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

async function send(to: string, subject: string, html: string): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL ?? "Revive <hello@revive-hq.com>";

  if (!apiKey) {
    // Dev fallback — log instead of crash
    console.log("📧 [EMAIL DEV] Would send:");
    console.log(`   To: ${to}`);
    console.log(`   Subject: ${subject}`);
    return { success: true, messageId: `dev-${Date.now()}` };
  }

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({ from, to, subject, html });

    if (error) return { success: false, error: error.message };
    return { success: true, messageId: data?.id };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("[send-onboarding] Resend error:", msg);
    return { success: false, error: msg };
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Email 1 — Welcome (send immediately after Stripe Connect)
 */
export async function sendWelcomeEmail(
  to: string,
  data: WelcomeEmailData
): Promise<SendResult> {
  const { subject, html } = welcomeEmail(data);
  return send(to, subject, html);
}

/**
 * Email 2 — Day 2 check-in
 */
export async function sendCheckinEmail(
  to: string,
  data: CheckinEmailData
): Promise<SendResult> {
  const { subject, html } = checkinEmail(data);
  return send(to, subject, html);
}

/**
 * Email 3 — Recovery notification (triggered per recovered payment)
 */
export async function sendRecoveryNotification(
  to: string,
  data: RecoveryEmailData
): Promise<SendResult> {
  const { subject, html } = recoveryNotificationEmail(data);
  return send(to, subject, html);
}
