/**
 * Revive Onboarding Email Templates
 *
 * These are emails sent TO Revive users (the SaaS operators),
 * not to their customers.
 *
 * Templates:
 *   1. welcome        — sent immediately after Stripe Connect
 *   2. checkin        — sent on Day 2
 *   3. recovered      — sent when Revive recovers a payment for them
 */

// ─── Shared Base Layout ──────────────────────────────────────────────────────

function base(content: string, preheader: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Revive</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background:#f5f5f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1a1a1a;">

  <!-- Preheader (hidden) -->
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${preheader}&nbsp;‌&zwnj;&nbsp;‌&zwnj;&nbsp;‌&zwnj;</div>

  <!-- Outer wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f0;">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <!-- Card -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;box-shadow:0 1px 4px rgba(0,0,0,0.08);">
          <tr>
            <td style="padding:40px 40px 0;">

              <!-- Logo -->
              <p style="margin:0 0 32px;font-size:18px;font-weight:700;color:#16a34a;letter-spacing:-0.3px;">⟳ Revive</p>

              ${content}

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:32px 40px 36px;border-top:1px solid #f0f0f0;margin-top:32px;">
              <p style="margin:0 0 6px;font-size:12px;color:#a0a0a0;line-height:1.5;">
                You're getting this because you connected Stripe to <a href="https://revive-hq.com" style="color:#a0a0a0;">Revive</a>.
              </p>
              <p style="margin:0;font-size:12px;color:#a0a0a0;">
                <a href="{{unsubscribe_url}}" style="color:#a0a0a0;text-decoration:underline;">Unsubscribe</a>
                &nbsp;·&nbsp;
                <a href="https://revive-hq.com" style="color:#a0a0a0;text-decoration:none;">revive-hq.com</a>
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

// ─── Button helper ───────────────────────────────────────────────────────────

function btn(label: string, href: string, color = "#16a34a"): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0;">
    <tr>
      <td style="background:${color};border-radius:8px;">
        <a href="${href}" style="display:inline-block;padding:14px 28px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;letter-spacing:-0.2px;">${label}</a>
      </td>
    </tr>
  </table>`;
}

// ─── Template 1: Welcome ─────────────────────────────────────────────────────

export interface WelcomeEmailData {
  firstName: string;     // e.g. "Alex"
  dashboardUrl: string;  // e.g. "https://revive-hq.com/dashboard"
}

export function welcomeEmail(data: WelcomeEmailData): { subject: string; html: string } {
  const content = `
    <h1 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#1a1a1a;line-height:1.3;">
      You're connected — we're on it.
    </h1>

    <p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:#444;">
      Hey ${data.firstName}, welcome to Revive.
    </p>

    <p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:#444;">
      Stripe is connected and we're already scanning your payments for failed charges. Here's what happens next:
    </p>

    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:20px 0;width:100%;">
      <tr>
        <td style="padding:14px 16px;background:#f9fafb;border-radius:8px;border-left:3px solid #16a34a;">
          <p style="margin:0 0 6px;font-size:14px;font-weight:600;color:#1a1a1a;">🔍 Scanning payments</p>
          <p style="margin:0;font-size:13px;color:#666;line-height:1.5;">We've pulled in your failed invoices and are queuing up recovery attempts.</p>
        </td>
      </tr>
      <tr><td style="height:10px;"></td></tr>
      <tr>
        <td style="padding:14px 16px;background:#f9fafb;border-radius:8px;border-left:3px solid #16a34a;">
          <p style="margin:0 0 6px;font-size:14px;font-weight:600;color:#1a1a1a;">⚡ Smart retries</p>
          <p style="margin:0;font-size:13px;color:#666;line-height:1.5;">Revive automatically retries failed charges at the best times — not just blindly every 24 hours.</p>
        </td>
      </tr>
      <tr><td style="height:10px;"></td></tr>
      <tr>
        <td style="padding:14px 16px;background:#f9fafb;border-radius:8px;border-left:3px solid #16a34a;">
          <p style="margin:0 0 6px;font-size:14px;font-weight:600;color:#1a1a1a;">💬 Dunning emails</p>
          <p style="margin:0;font-size:13px;color:#666;line-height:1.5;">Your customers will receive smart recovery emails that feel human — not like a collections notice.</p>
        </td>
      </tr>
    </table>

    <p style="margin:0 0 4px;font-size:15px;line-height:1.65;color:#444;">
      You'll hear from us the moment we recover something.
    </p>

    ${btn("Open your dashboard →", data.dashboardUrl)}

    <p style="margin:0 0 32px;font-size:13px;color:#888;line-height:1.5;">
      Questions? Just reply to this email — I read every one.
      <br />— The Revive team
    </p>
  `;

  return {
    subject: "You're connected — Revive is scanning your payments",
    html: base(content, "Stripe is connected. We're already scanning for failed payments and setting up smart retries."),
  };
}

// ─── Template 2: Day 2 Check-in ──────────────────────────────────────────────

export interface CheckinEmailData {
  firstName: string;
  dashboardUrl: string;
  failedCount?: number;      // number of failed payments detected
  totalAtRisk?: string;      // formatted total at risk, e.g. "$1,240"
  hasData: boolean;          // false = still early, show "monitoring" message
}

export function checkinEmail(data: CheckinEmailData): { subject: string; html: string } {
  const statsBlock = data.hasData && data.failedCount
    ? `
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:24px 0;">
      <tr>
        <td width="50%" style="padding:16px;background:#f0fdf4;border-radius:8px;text-align:center;">
          <p style="margin:0 0 4px;font-size:28px;font-weight:700;color:#16a34a;">${data.failedCount}</p>
          <p style="margin:0;font-size:12px;color:#666;text-transform:uppercase;letter-spacing:0.5px;">Failed payments</p>
        </td>
        <td width="8px"></td>
        <td width="50%" style="padding:16px;background:#f0fdf4;border-radius:8px;text-align:center;">
          <p style="margin:0 0 4px;font-size:28px;font-weight:700;color:#16a34a;">${data.totalAtRisk ?? "—"}</p>
          <p style="margin:0;font-size:12px;color:#666;text-transform:uppercase;letter-spacing:0.5px;">Revenue at risk</p>
        </td>
      </tr>
    </table>
    <p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:#444;">
      Revive is actively working on recovering this. Check your dashboard for the full breakdown and retry status.
    </p>`
    : `
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:24px 0;">
      <tr>
        <td style="padding:16px 20px;background:#f9fafb;border-radius:8px;border-left:3px solid #d1d5db;">
          <p style="margin:0 0 4px;font-size:14px;font-weight:600;color:#1a1a1a;">👀 We're monitoring</p>
          <p style="margin:0;font-size:13px;color:#666;line-height:1.5;">
            No failed payments detected yet — that's a good thing! Results will show up here as payments come in. Revive runs 24/7.
          </p>
        </td>
      </tr>
    </table>`;

  const content = `
    <h1 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#1a1a1a;line-height:1.3;">
      Your first 48 hours with Revive
    </h1>

    <p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:#444;">
      Hey ${data.firstName} — quick update on what we've found so far.
    </p>

    ${statsBlock}

    ${btn("See what we've found →", data.dashboardUrl)}

    <p style="margin:0 0 32px;font-size:13px;color:#888;line-height:1.5;">
      You'll get a notification the moment we recover a payment. Until then — Revive's got your back.
      <br /><br />— The Revive team
    </p>
  `;

  return {
    subject: "Your first 48 hours with Revive",
    html: base(content, "Here's what Revive has found in your first 48 hours. Check the dashboard for your recovery status."),
  };
}

// ─── Template 3: Recovery Notification ───────────────────────────────────────

export interface RecoveryEmailData {
  firstName: string;           // Revive user's first name
  dashboardUrl: string;
  customerName: string;        // Their customer whose payment was recovered
  amount: string;              // Formatted, e.g. "$149.00"
  recoveredAt?: string;        // Formatted date, defaults to "just now"
  totalRecovered?: string;     // All-time total, e.g. "$2,890" (optional)
}

export function recoveryNotificationEmail(data: RecoveryEmailData): { subject: string; html: string } {
  const when = data.recoveredAt ?? "just now";

  const content = `
    <!-- Big win moment -->
    <div style="text-align:center;padding:8px 0 24px;">
      <p style="margin:0 0 8px;font-size:48px;line-height:1;">💰</p>
      <p style="margin:0;font-size:36px;font-weight:800;color:#16a34a;letter-spacing:-1px;">${data.amount}</p>
      <p style="margin:6px 0 0;font-size:15px;color:#666;">recovered ${when}</p>
    </div>

    <h1 style="margin:0 0 14px;font-size:20px;font-weight:700;color:#1a1a1a;line-height:1.3;text-align:center;">
      Revive just saved you ${data.amount}
    </h1>

    <p style="margin:0 0 20px;font-size:15px;line-height:1.65;color:#444;text-align:center;">
      Hey ${data.firstName} — we successfully recovered a failed payment for you.
    </p>

    <!-- Payment detail box -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:0 0 24px;background:#f9fafb;border-radius:10px;overflow:hidden;">
      <tr>
        <td style="padding:20px 20px 4px;">
          <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:0.8px;color:#999;font-weight:600;">Payment details</p>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 20px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="font-size:14px;color:#666;padding:6px 0;">Customer</td>
              <td align="right" style="font-size:14px;font-weight:600;color:#1a1a1a;">${data.customerName}</td>
            </tr>
            <tr>
              <td style="font-size:14px;color:#666;padding:6px 0;">Amount recovered</td>
              <td align="right" style="font-size:14px;font-weight:700;color:#16a34a;">${data.amount}</td>
            </tr>
            <tr>
              <td style="font-size:14px;color:#666;padding:6px 0;">Status</td>
              <td align="right" style="font-size:14px;font-weight:600;color:#16a34a;">✅ Paid</td>
            </tr>
            ${data.totalRecovered ? `
            <tr>
              <td colspan="2" style="height:1px;background:#e5e7eb;padding:0;"></td>
            </tr>
            <tr>
              <td style="font-size:14px;color:#666;padding:6px 0;">Total recovered (all-time)</td>
              <td align="right" style="font-size:15px;font-weight:700;color:#1a1a1a;">${data.totalRecovered}</td>
            </tr>` : ""}
          </table>
        </td>
      </tr>
      <tr><td style="height:16px;"></td></tr>
    </table>

    ${btn("View in dashboard →", data.dashboardUrl)}

    <p style="margin:0 0 32px;font-size:13px;color:#888;line-height:1.5;text-align:center;">
      This is what Revive is for. 🎉<br />Keep an eye on your dashboard — more recoveries on the way.
    </p>
  `;

  return {
    subject: `💰 Revive just recovered ${data.amount} for you`,
    html: base(content, `Great news — we recovered ${data.amount} from ${data.customerName}. Money back in your pocket.`),
  };
}
