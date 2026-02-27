/**
 * Revive Dunning Email Templates
 *
 * These are emails sent FROM SaaS operators TO their customers
 * when a subscription payment fails. Revive generates and sends
 * these automatically as part of its recovery sequence.
 *
 * Templates:
 *   1. friendly-reminder    — T+0: Soft initial notice, payment failed
 *   2. urgent-notice        — T+3 days: Urgency escalated, account at risk
 *   3. final-warning        — T+7 days: Last chance before cancellation
 *   4. payment-confirmed    — T+any: Sent when payment is recovered ✅
 *   5. re-engagement        — T+30 days: Win-back after lapse/cancellation
 *
 * Variables:
 *   {{customerName}}    — First name of the customer
 *   {{productName}}     — Name of the subscription plan/product
 *   {{amount}}          — Formatted charge amount (e.g., "$49.00")
 *   {{updateCardUrl}}   — Unique secure URL to update payment method
 *   {{companyName}}     — SaaS operator's company name
 *   {{supportEmail}}    — SaaS operator's support email
 *   {{daysRemaining}}   — Days until account is paused/cancelled
 *   {{discountOffer}}   — (re-engagement only) Discount offer string, e.g., "20% off"
 *   {{reactivateUrl}}   — (re-engagement only) URL to reactivate subscription
 */

// ─── Shared Utilities ─────────────────────────────────────────────────────────

function htmlBase(content: string, preheader: string, accentColor = "#16a34a"): string {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="x-apple-disable-message-reformatting" />
  <title></title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
  <style>
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; padding: 24px 16px !important; }
      .card { border-radius: 0 !important; }
      .btn { display: block !important; width: 100% !important; text-align: center !important; }
      h1 { font-size: 22px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#f4f4f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1a1a1a;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">

  <!-- Preheader -->
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;color:#f4f4f0;">${preheader}&nbsp;&zwnj;&hairsp;&nbsp;&zwnj;&hairsp;&nbsp;&zwnj;&hairsp;</div>

  <!-- Outer -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f4f0;">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <!-- Card -->
        <table role="presentation" class="card" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:#ffffff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.07);overflow:hidden;">

          <!-- Top accent bar -->
          <tr>
            <td style="height:4px;background:${accentColor};font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;" class="container">

              <!-- Logo -->
              <p style="margin:0 0 28px;font-size:15px;font-weight:700;color:#111827;letter-spacing:-0.2px;">⟳ <span style="color:${accentColor};">Revive</span></p>

              ${content}

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px 32px;background:#fafafa;border-top:1px solid #f0f0f0;" class="container">
              <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.6;">
                You're receiving this because your payment information is associated with a subscription at <strong>{{companyName}}</strong>.<br />
                Questions? <a href="mailto:{{supportEmail}}" style="color:${accentColor};text-decoration:none;">{{supportEmail}}</a> · 
                <a href="{{updateCardUrl}}" style="color:#9ca3af;text-decoration:underline;">Manage subscription</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─── Template 1: Friendly Reminder ───────────────────────────────────────────
// Timing: Sent immediately (T+0) when invoice.payment_failed fires
// Tone: Warm, understanding, no blame, clear CTA

export const friendlyReminderHtml = htmlBase(
  `
  <!-- Heading -->
  <h1 style="margin:0 0 16px;font-size:24px;font-weight:700;color:#111827;line-height:1.3;">
    Hey {{customerName}}, your payment didn't go through 👋
  </h1>

  <!-- Body -->
  <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.65;">
    We tried to charge <strong>{{amount}}</strong> for your <strong>{{productName}}</strong> subscription, but the payment was declined. This happens — expired cards, temporary bank holds, or insufficient funds are all common culprits.
  </p>
  <p style="margin:0 0 28px;font-size:15px;color:#374151;line-height:1.65;">
    Your account is still active and everything is fine right now. We just need you to take a quick look at your payment method.
  </p>

  <!-- What happened box -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;margin-bottom:28px;">
    <tr>
      <td style="padding:20px 24px;">
        <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Payment details</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="font-size:14px;color:#374151;padding:4px 0;">Plan</td>
            <td style="font-size:14px;color:#111827;font-weight:600;text-align:right;padding:4px 0;">{{productName}}</td>
          </tr>
          <tr>
            <td style="font-size:14px;color:#374151;padding:4px 0;">Amount</td>
            <td style="font-size:14px;color:#111827;font-weight:600;text-align:right;padding:4px 0;">{{amount}}</td>
          </tr>
          <tr>
            <td style="font-size:14px;color:#374151;padding:4px 0;">Status</td>
            <td style="font-size:14px;color:#ef4444;font-weight:600;text-align:right;padding:4px 0;">Payment failed</td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <!-- CTA -->
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
    <tr>
      <td style="border-radius:8px;background:#16a34a;">
        <a href="{{updateCardUrl}}" class="btn" style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:8px;letter-spacing:-0.1px;">
          Update Payment Method →
        </a>
      </td>
    </tr>
  </table>

  <p style="margin:0;font-size:14px;color:#6b7280;line-height:1.65;">
    We'll retry the payment automatically. If you update your card in the next 24 hours, we'll capture it on the next attempt with no interruption to your service. 🙌
  </p>
  `,
  "Your {{productName}} payment of {{amount}} didn't go through — quick 30-second fix needed.",
  "#16a34a"
);

export const friendlyReminderText = `Hey {{customerName}},

Your payment of {{amount}} for {{productName}} didn't go through.

This is usually just an expired card or a temporary bank hold — nothing to worry about. Your account is still active.

Update your payment method here:
{{updateCardUrl}}

We'll retry the charge automatically once your payment method is updated.

---
Questions? Reply to this email or reach us at {{supportEmail}}.
{{companyName}}
`;


// ─── Template 2: Urgent Notice ────────────────────────────────────────────────
// Timing: T+3 days — second retry failed, urgency escalates
// Tone: Warm but urgent, concrete consequences, easy path to fix

export const urgentNoticeHtml = htmlBase(
  `
  <!-- Warning icon row -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
    <tr>
      <td>
        <div style="display:inline-block;width:44px;height:44px;background:#fef3c7;border-radius:50%;text-align:center;line-height:44px;font-size:22px;">⚠️</div>
      </td>
    </tr>
  </table>

  <!-- Heading -->
  <h1 style="margin:0 0 16px;font-size:24px;font-weight:700;color:#111827;line-height:1.3;">
    Action needed — your account may be paused in {{daysRemaining}} days
  </h1>

  <!-- Body -->
  <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.65;">
    Hi {{customerName}}, we've attempted to charge <strong>{{amount}}</strong> for <strong>{{productName}}</strong> a second time, and the payment is still failing.
  </p>
  <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.65;">
    To keep your account active and uninterrupted, please update your payment method as soon as possible.
  </p>

  <!-- Countdown box -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;margin-bottom:28px;">
    <tr>
      <td style="padding:18px 24px;">
        <p style="margin:0;font-size:14px;color:#92400e;line-height:1.6;">
          <strong>Your subscription pauses in {{daysRemaining}} days</strong> if we can't process a payment. After that, you'll lose access to all {{productName}} features until payment is resolved.
        </p>
      </td>
    </tr>
  </table>

  <!-- CTA -->
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
    <tr>
      <td style="border-radius:8px;background:#d97706;">
        <a href="{{updateCardUrl}}" class="btn" style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:8px;">
          Update Payment Method — Takes 30 Seconds
        </a>
      </td>
    </tr>
  </table>

  <!-- Why this might be happening -->
  <p style="margin:0 0 12px;font-size:14px;font-weight:600;color:#374151;">Common reasons a payment fails:</p>
  <ul style="margin:0 0 24px;padding-left:20px;font-size:14px;color:#374151;line-height:1.8;">
    <li>Card expired or reported lost/stolen</li>
    <li>Bank blocked an unfamiliar charge</li>
    <li>Insufficient funds at billing time</li>
    <li>Billing address doesn't match bank records</li>
  </ul>

  <p style="margin:0;font-size:14px;color:#6b7280;line-height:1.65;">
    Already fixed it? Great — we'll retry the charge shortly. No further action needed.
  </p>
  `,
  "Important: Your {{productName}} account may be paused in {{daysRemaining}} days.",
  "#d97706"
);

export const urgentNoticeText = `Hi {{customerName}},

IMPORTANT: Your {{productName}} subscription may be paused in {{daysRemaining}} days.

We've made two attempts to charge {{amount}} for your {{productName}} plan, and both have failed.

What happens next:
- Day {{daysRemaining}}: Subscription is paused, access revoked
- After that: You'll need to re-subscribe to restore access

Fix it now (takes 30 seconds):
{{updateCardUrl}}

Common reasons: expired card, bank hold, insufficient funds.

Already updated? We'll retry soon — no action needed.

---
Questions? {{supportEmail}}
{{companyName}}
`;


// ─── Template 3: Final Warning ────────────────────────────────────────────────
// Timing: T+7 days — last retry before cancellation
// Tone: Direct, clear stakes, last chance framing, still compassionate

export const finalWarningHtml = htmlBase(
  `
  <!-- Red alert icon -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
    <tr>
      <td>
        <div style="display:inline-block;width:44px;height:44px;background:#fee2e2;border-radius:50%;text-align:center;line-height:44px;font-size:22px;">🚨</div>
      </td>
    </tr>
  </table>

  <!-- Heading -->
  <h1 style="margin:0 0 16px;font-size:24px;font-weight:700;color:#991b1b;line-height:1.3;">
    Last chance: Your {{productName}} subscription will be cancelled tomorrow
  </h1>

  <!-- Body -->
  <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.65;">
    Hi {{customerName}}, this is our final notice. We've made multiple attempts to collect <strong>{{amount}}</strong> for your <strong>{{productName}}</strong> subscription, and we've been unable to process the payment.
  </p>

  <!-- Red alert box -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#fef2f2;border:2px solid #fca5a5;border-radius:8px;margin-bottom:28px;">
    <tr>
      <td style="padding:18px 24px;">
        <p style="margin:0 0 8px;font-size:15px;font-weight:700;color:#991b1b;">Your account will be cancelled in 24 hours.</p>
        <p style="margin:0;font-size:14px;color:#b91c1c;line-height:1.6;">
          After cancellation, all your data, settings, and history will be preserved for 30 days — but you'll lose access to all features. Reactivating after cancellation requires starting a new subscription.
        </p>
      </td>
    </tr>
  </table>

  <!-- CTA (prominent) -->
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;width:100%;">
    <tr>
      <td style="border-radius:8px;background:#dc2626;width:100%;">
        <a href="{{updateCardUrl}}" class="btn" style="display:block;padding:16px 32px;font-size:16px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:8px;text-align:center;letter-spacing:-0.2px;">
          Save My Account Now →
        </a>
      </td>
    </tr>
  </table>

  <p style="margin:0 0 24px;font-size:13px;color:#9ca3af;text-align:center;line-height:1.5;">
    Takes less than 1 minute · Secure · No contracts
  </p>

  <!-- What you'll lose -->
  <p style="margin:0 0 12px;font-size:14px;font-weight:600;color:#374151;">When cancelled, you'll lose access to:</p>
  <ul style="margin:0 0 24px;padding-left:20px;font-size:14px;color:#374151;line-height:1.8;">
    <li>All {{productName}} features</li>
    <li>Your saved data, integrations, and settings</li>
    <li>Your current pricing (rates may change on reactivation)</li>
    <li>Priority support</li>
  </ul>

  <p style="margin:0;font-size:14px;color:#6b7280;line-height:1.65;">
    If you're having financial difficulties or need help, just reply to this email. We're humans and we want to work with you. 💙
  </p>
  `,
  "Final notice: Your {{productName}} subscription will be cancelled in 24 hours.",
  "#dc2626"
);

export const finalWarningText = `Hi {{customerName}},

FINAL NOTICE: Your {{productName}} subscription will be CANCELLED in 24 hours.

We've made 3 attempts to charge {{amount}} for {{productName}} and all have failed.

After cancellation:
- You'll lose access to all features immediately
- Data preserved for 30 days, then deleted
- Reactivation requires a new subscription at current pricing

Save your account now:
{{updateCardUrl}}

Having financial difficulties? Reply to this email. We want to help.

---
{{supportEmail}} | {{companyName}}
`;


// ─── Template 4: Payment Confirmed ────────────────────────────────────────────
// Timing: Sent immediately when invoice.payment_succeeded fires after a failure
// Tone: Relief, celebration, thank you, reinforce value

export const paymentConfirmedHtml = htmlBase(
  `
  <!-- Success icon -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
    <tr>
      <td>
        <div style="display:inline-block;width:52px;height:52px;background:#dcfce7;border-radius:50%;text-align:center;line-height:52px;font-size:26px;">✅</div>
      </td>
    </tr>
  </table>

  <!-- Heading -->
  <h1 style="margin:0 0 16px;font-size:24px;font-weight:700;color:#111827;line-height:1.3;">
    Payment confirmed — you're all set, {{customerName}} 🎉
  </h1>

  <!-- Body -->
  <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.65;">
    Great news! We successfully processed your payment of <strong>{{amount}}</strong> for <strong>{{productName}}</strong>. Your subscription is active and everything is back to normal.
  </p>

  <!-- Receipt box -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;margin-bottom:28px;">
    <tr>
      <td style="padding:20px 24px;">
        <p style="margin:0 0 12px;font-size:13px;font-weight:600;color:#166534;text-transform:uppercase;letter-spacing:0.5px;">Payment receipt</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="font-size:14px;color:#374151;padding:5px 0;">Plan</td>
            <td style="font-size:14px;color:#111827;font-weight:600;text-align:right;padding:5px 0;">{{productName}}</td>
          </tr>
          <tr>
            <td style="font-size:14px;color:#374151;padding:5px 0;border-top:1px solid #d1fae5;">Amount charged</td>
            <td style="font-size:14px;color:#16a34a;font-weight:700;text-align:right;padding:5px 0;border-top:1px solid #d1fae5;">{{amount}} ✓</td>
          </tr>
          <tr>
            <td style="font-size:14px;color:#374151;padding:5px 0;border-top:1px solid #d1fae5;">Status</td>
            <td style="font-size:14px;color:#16a34a;font-weight:600;text-align:right;padding:5px 0;border-top:1px solid #d1fae5;">Paid ✓</td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <!-- Value reminder -->
  <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.65;">
    You're back in full access mode. Thanks for updating your payment details — it helps us keep your experience uninterrupted.
  </p>

  <p style="margin:0 0 28px;font-size:15px;color:#374151;line-height:1.65;">
    To avoid this in the future, consider adding a backup payment method in your account settings.
  </p>

  <!-- CTA -->
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:0;">
    <tr>
      <td style="border-radius:8px;background:#16a34a;">
        <a href="{{updateCardUrl}}" class="btn" style="display:inline-block;padding:13px 28px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:8px;">
          Add a Backup Card
        </a>
      </td>
    </tr>
  </table>
  `,
  "Your payment of {{amount}} was successful — {{productName}} is back to normal.",
  "#16a34a"
);

export const paymentConfirmedText = `Hi {{customerName}},

Great news — your payment has been confirmed! 🎉

RECEIPT:
  Plan: {{productName}}
  Amount: {{amount}}
  Status: Paid ✓

Your subscription is fully active. Thanks for updating your payment details.

To avoid interruptions in the future, consider adding a backup payment method:
{{updateCardUrl}}

---
{{supportEmail}} | {{companyName}}
`;


// ─── Template 5: Re-engagement (Win-Back) ─────────────────────────────────────
// Timing: T+30 days after cancellation/lapse — sent manually or via campaign
// Tone: Warm, no shame, value-forward, incentive-led

export const reengagementHtml = htmlBase(
  `
  <!-- Emoji wave -->
  <p style="margin:0 0 20px;font-size:36px;line-height:1;">👋</p>

  <!-- Heading -->
  <h1 style="margin:0 0 16px;font-size:24px;font-weight:700;color:#111827;line-height:1.3;">
    We miss you, {{customerName}}. Come back with {{discountOffer}} off.
  </h1>

  <!-- Body -->
  <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.65;">
    It's been a while since we last saw you on <strong>{{productName}}</strong>. We've been busy shipping improvements, and we think you'd love what's new.
  </p>
  <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.65;">
    We'd love to have you back — and to make it easy, we're offering you <strong>{{discountOffer}} off your first month</strong> when you reactivate today.
  </p>

  <!-- What's new / value props -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#fafafa;border:1px solid #e5e7eb;border-radius:8px;margin-bottom:28px;">
    <tr>
      <td style="padding:20px 24px;">
        <p style="margin:0 0 14px;font-size:13px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Since you left, we've shipped:</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="padding:6px 0;font-size:14px;color:#374151;vertical-align:top;">
              <span style="color:#16a34a;font-weight:700;margin-right:8px;">→</span> Smarter retry scheduling based on failure type
            </td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-size:14px;color:#374151;vertical-align:top;">
              <span style="color:#16a34a;font-weight:700;margin-right:8px;">→</span> Custom dunning email templates with your branding
            </td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-size:14px;color:#374151;vertical-align:top;">
              <span style="color:#16a34a;font-weight:700;margin-right:8px;">→</span> Real-time recovery analytics dashboard
            </td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-size:14px;color:#374151;vertical-align:top;">
              <span style="color:#16a34a;font-weight:700;margin-right:8px;">→</span> Hosted payment update page with your logo
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <!-- Discount offer box -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:linear-gradient(135deg,#16a34a,#15803d);border-radius:10px;margin-bottom:28px;">
    <tr>
      <td style="padding:24px;text-align:center;">
        <p style="margin:0 0 6px;font-size:13px;color:rgba(255,255,255,0.8);text-transform:uppercase;letter-spacing:0.5px;font-weight:600;">Welcome back offer</p>
        <p style="margin:0 0 4px;font-size:36px;font-weight:800;color:#ffffff;line-height:1;">{{discountOffer}} OFF</p>
        <p style="margin:0 0 20px;font-size:13px;color:rgba(255,255,255,0.75);">Your first month back. No strings attached.</p>
        <a href="{{reactivateUrl}}" style="display:inline-block;padding:13px 32px;background:#ffffff;color:#16a34a;font-size:15px;font-weight:700;text-decoration:none;border-radius:8px;">
          Reactivate {{productName}} →
        </a>
      </td>
    </tr>
  </table>

  <p style="margin:0 0 16px;font-size:14px;color:#6b7280;line-height:1.65;">
    This offer expires in 7 days. If you have questions or feedback about why you left, we'd genuinely love to hear it — just reply to this email.
  </p>

  <p style="margin:0;font-size:14px;color:#374151;line-height:1.65;">
    Hope to see you back soon,<br />
    <strong>The {{companyName}} team</strong>
  </p>
  `,
  "{{customerName}}, come back with {{discountOffer}} off — plus see what's new in {{productName}}.",
  "#16a34a"
);

export const reengagementText = `Hi {{customerName}},

We miss you! It's been a while since you were on {{productName}}.

We've been building a lot since you left:
→ Smarter retry scheduling based on failure type
→ Custom dunning email templates with your branding
→ Real-time recovery analytics dashboard
→ Hosted payment update page with your logo

To welcome you back, we're offering {{discountOffer}} off your first month when you reactivate today:

{{reactivateUrl}}

This offer expires in 7 days.

Have feedback on why you left? Reply to this email — we read every response.

---
{{supportEmail}} | {{companyName}}
`;


// ─── Template Registry ────────────────────────────────────────────────────────

export type DunningTemplateId =
  | "friendly-reminder"
  | "urgent-notice"
  | "final-warning"
  | "payment-confirmed"
  | "re-engagement";

export interface DunningTemplate {
  id: DunningTemplateId;
  name: string;
  description: string;
  timing: string;
  accentColor: string;
  defaultSubject: string;
  html: string;
  text: string;
}

export const dunningTemplates: DunningTemplate[] = [
  {
    id: "friendly-reminder",
    name: "Friendly Reminder",
    description: "Warm initial notice sent immediately when a payment fails. Low urgency, high empathy.",
    timing: "T+0 (immediately on payment failure)",
    accentColor: "#16a34a",
    defaultSubject: "Quick heads up about your payment, {{customerName}}",
    html: friendlyReminderHtml,
    text: friendlyReminderText,
  },
  {
    id: "urgent-notice",
    name: "Urgent Notice",
    description: "Escalated notice after second retry failure. Communicates consequences without being aggressive.",
    timing: "T+3 days (after second retry fails)",
    accentColor: "#d97706",
    defaultSubject: "Action needed: Your {{productName}} account may be paused soon",
    html: urgentNoticeHtml,
    text: urgentNoticeText,
  },
  {
    id: "final-warning",
    name: "Final Warning",
    description: "Last-chance email before cancellation. Direct, clear stakes, compassionate escape hatch.",
    timing: "T+7 days (final retry, 24h before cancellation)",
    accentColor: "#dc2626",
    defaultSubject: "⚠️ Final notice: Your {{productName}} subscription will be cancelled tomorrow",
    html: finalWarningHtml,
    text: finalWarningText,
  },
  {
    id: "payment-confirmed",
    name: "Payment Confirmed",
    description: "Celebratory confirmation sent when a previously-failed payment is successfully recovered.",
    timing: "Immediately on payment recovery",
    accentColor: "#16a34a",
    defaultSubject: "You're all set — payment confirmed! ✅",
    html: paymentConfirmedHtml,
    text: paymentConfirmedText,
  },
  {
    id: "re-engagement",
    name: "Re-engagement (Win-Back)",
    description: "Win-back campaign for churned customers. Value-forward with a discount incentive.",
    timing: "T+30 days after cancellation",
    accentColor: "#16a34a",
    defaultSubject: "We miss you, {{customerName}} — come back with {{discountOffer}} off 👋",
    html: reengagementHtml,
    text: reengagementText,
  },
];

export function getTemplate(id: DunningTemplateId): DunningTemplate | undefined {
  return dunningTemplates.find((t) => t.id === id);
}

/**
 * Interpolate template variables.
 * Replaces {{variableName}} placeholders with values from the provided map.
 */
export function interpolate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return vars[key] !== undefined ? vars[key] : match;
  });
}
