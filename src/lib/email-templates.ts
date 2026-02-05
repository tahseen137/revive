/**
 * Dunning Email Templates for Revive
 * Professional, high-converting email templates for payment recovery
 */

interface EmailTemplateData {
  customerName: string;
  amount: string; // formatted, e.g. "$29.99"
  currency: string;
  businessName: string;
  cardUpdateUrl: string;
  invoiceDate: string;
  failureReason?: string;
}

function baseLayout(content: string, preheader: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Update</title>
  <style>
    body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f4f5; color: #18181b; }
    .preheader { display: none !important; max-height: 0; overflow: hidden; }
    .container { max-width: 580px; margin: 0 auto; padding: 40px 20px; }
    .card { background: #ffffff; border-radius: 12px; padding: 40px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
    .logo { font-size: 20px; font-weight: 700; color: #6d28d9; margin-bottom: 32px; }
    h1 { font-size: 22px; font-weight: 600; margin: 0 0 16px; color: #18181b; line-height: 1.3; }
    p { font-size: 15px; line-height: 1.6; color: #52525b; margin: 0 0 16px; }
    .amount { font-size: 32px; font-weight: 700; color: #18181b; margin: 24px 0; }
    .btn { display: inline-block; background: #6d28d9; color: #ffffff !important; text-decoration: none; font-weight: 600; font-size: 15px; padding: 14px 32px; border-radius: 8px; margin: 8px 0 24px; }
    .btn:hover { background: #5b21b6; }
    .btn-urgent { background: #dc2626; }
    .btn-urgent:hover { background: #b91c1c; }
    .btn-success { background: #059669; }
    .detail { background: #f4f4f5; border-radius: 8px; padding: 16px; margin: 16px 0; font-size: 14px; }
    .detail-row { display: flex; justify-content: space-between; padding: 4px 0; }
    .detail-label { color: #71717a; }
    .detail-value { font-weight: 500; color: #18181b; }
    .footer { text-align: center; margin-top: 32px; font-size: 12px; color: #a1a1aa; }
    .footer a { color: #a1a1aa; }
    .divider { border: 0; border-top: 1px solid #e4e4e7; margin: 24px 0; }
    @media (max-width: 600px) { .card { padding: 24px; } .amount { font-size: 28px; } }
  </style>
</head>
<body>
  <div class="preheader">${preheader}</div>
  <div class="container">
    ${content}
    <div class="footer">
      <p>Powered by <strong>Revive</strong> — Automated Payment Recovery</p>
      <p>You're receiving this because a payment on your account needs attention.</p>
    </div>
  </div>
</body>
</html>`;
}

// ============ Template 1: Payment Failed Notice ============

export function paymentFailedEmail(data: EmailTemplateData): { subject: string; html: string } {
  const friendlyReason = getFriendlyFailureReason(data.failureReason);
  
  const content = `
    <div class="card">
      <div class="logo">⟳ ${data.businessName}</div>
      <h1>Your payment didn't go through</h1>
      <p>Hi ${data.customerName},</p>
      <p>We tried to process your payment, but it was declined. Don't worry — this happens sometimes and is easy to fix.</p>
      
      <div class="amount">${data.amount}</div>
      
      <div class="detail">
        <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px">
          <tr><td style="color:#71717a;padding:4px 0">Date</td><td align="right" style="font-weight:500">${data.invoiceDate}</td></tr>
          <tr><td style="color:#71717a;padding:4px 0">Reason</td><td align="right" style="font-weight:500">${friendlyReason}</td></tr>
        </table>
      </div>
      
      <p>We'll automatically retry this payment soon. If you'd like to update your payment method now, click below:</p>
      
      <a href="${data.cardUpdateUrl}" class="btn">Update Payment Method →</a>
      
      <p style="font-size:13px;color:#71717a;">If you believe this is an error, please contact ${data.businessName} support.</p>
    </div>`;
  
  return {
    subject: `⚠️ Your payment of ${data.amount} to ${data.businessName} failed`,
    html: baseLayout(content, `Action needed: Your ${data.amount} payment to ${data.businessName} didn't go through.`),
  };
}

// ============ Template 2: Card Update Reminder ============

export function cardUpdateReminderEmail(data: EmailTemplateData): { subject: string; html: string } {
  const content = `
    <div class="card">
      <div class="logo">⟳ ${data.businessName}</div>
      <h1>Quick reminder: please update your card</h1>
      <p>Hi ${data.customerName},</p>
      <p>We've tried to process your payment of <strong>${data.amount}</strong> a couple of times now, but it keeps getting declined.</p>
      
      <p>To keep your account active and avoid any service interruption, please update your payment method:</p>
      
      <a href="${data.cardUpdateUrl}" class="btn">Update Card Now →</a>
      
      <div class="detail">
        <p style="margin:0;font-size:13px;">💡 <strong>Common fixes:</strong></p>
        <ul style="margin:8px 0 0;padding-left:20px;font-size:13px;color:#52525b;">
          <li>Check your card hasn't expired</li>
          <li>Ensure sufficient funds are available</li>
          <li>Try a different payment method</li>
          <li>Contact your bank to authorize the charge</li>
        </ul>
      </div>
      
      <p style="font-size:13px;color:#71717a;">We'll continue trying to process this payment automatically.</p>
    </div>`;
  
  return {
    subject: `Reminder: Update your payment method for ${data.businessName}`,
    html: baseLayout(content, `Your ${data.amount} payment still hasn't gone through. Update your card to keep your account active.`),
  };
}

// ============ Template 3: Final Warning ============

export function finalWarningEmail(data: EmailTemplateData): { subject: string; html: string } {
  const content = `
    <div class="card">
      <div class="logo">⟳ ${data.businessName}</div>
      <h1>🚨 Final notice: Your account is at risk</h1>
      <p>Hi ${data.customerName},</p>
      <p>We've been unable to collect your payment of <strong>${data.amount}</strong> despite multiple attempts. <strong>Your account may be suspended soon</strong> if we can't process this payment.</p>
      
      <div class="amount" style="color:#dc2626">${data.amount}</div>
      
      <p><strong>This is your last chance to update your payment method</strong> before your account is affected:</p>
      
      <a href="${data.cardUpdateUrl}" class="btn btn-urgent">Update Payment Now — Keep My Account →</a>
      
      <hr class="divider">
      
      <p style="font-size:13px;color:#71717a;">If you no longer wish to use ${data.businessName}, you can ignore this email. Your subscription will be cancelled automatically.</p>
    </div>`;
  
  return {
    subject: `🚨 FINAL NOTICE: Your ${data.businessName} account will be suspended`,
    html: baseLayout(content, `Urgent: Your account will be suspended unless you update your payment method.`),
  };
}

// ============ Template 4: Payment Recovered ============

export function paymentRecoveredEmail(data: EmailTemplateData): { subject: string; html: string } {
  const content = `
    <div class="card">
      <div class="logo">⟳ ${data.businessName}</div>
      <h1>✅ Payment successful!</h1>
      <p>Hi ${data.customerName},</p>
      <p>Great news — your payment of <strong>${data.amount}</strong> has been successfully processed. Your account is in good standing.</p>
      
      <div class="amount" style="color:#059669">${data.amount} ✓</div>
      
      <div class="detail">
        <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px">
          <tr><td style="color:#71717a;padding:4px 0">Status</td><td align="right" style="font-weight:500;color:#059669">Paid</td></tr>
          <tr><td style="color:#71717a;padding:4px 0">Date</td><td align="right" style="font-weight:500">${data.invoiceDate}</td></tr>
        </table>
      </div>
      
      <p>No further action is needed. Thank you for being a ${data.businessName} customer!</p>
      
      <p style="font-size:13px;color:#71717a;">If you have any questions, reach out to ${data.businessName} support.</p>
    </div>`;
  
  return {
    subject: `✅ Payment confirmed: ${data.amount} to ${data.businessName}`,
    html: baseLayout(content, `Your payment of ${data.amount} to ${data.businessName} was successful.`),
  };
}

// ============ Helper ============

function getFriendlyFailureReason(reason?: string): string {
  const map: Record<string, string> = {
    card_declined: "Card was declined",
    generic_decline: "Card was declined",
    insufficient_funds: "Insufficient funds",
    expired_card: "Card has expired",
    processing_error: "Temporary processing error",
    incorrect_cvc: "Incorrect security code",
    authentication_required: "Authentication required",
    do_not_honor: "Bank declined the charge",
    lost_card: "Card reported lost",
    stolen_card: "Card reported stolen",
    card_not_supported: "Card type not supported",
  };
  return map[reason || ""] || "Payment could not be processed";
}

// ============ Template Selector ============

export function getEmailTemplate(
  type: "payment_failed" | "card_update_reminder" | "final_warning" | "payment_recovered",
  data: EmailTemplateData
): { subject: string; html: string } {
  switch (type) {
    case "payment_failed":
      return paymentFailedEmail(data);
    case "card_update_reminder":
      return cardUpdateReminderEmail(data);
    case "final_warning":
      return finalWarningEmail(data);
    case "payment_recovered":
      return paymentRecoveredEmail(data);
  }
}
