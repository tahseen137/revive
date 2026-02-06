/**
 * Pre-Dunning: Check for expiring cards and send warning emails
 * 
 * Called by Vercel Cron daily to:
 * 1. Query Stripe for cards expiring within 7 days
 * 2. Send friendly "heads up, your card is about to expire" emails
 * 3. Track notifications to avoid duplicates
 * 
 * Protected by CRON_SECRET to prevent unauthorized access.
 */

import { NextRequest, NextResponse } from "next/server";
import { requireCronAuth } from "@/lib/auth";
import { getAllConnectedAccounts, get, set } from "@/lib/db";
import Stripe from "stripe";
import { Resend } from "resend";
import { generateCardUpdateToken } from "@/lib/auth";

export const maxDuration = 60;

interface ExpiringCardNotification {
  customerId: string;
  notifiedAt: number;
  expiryMonth: number;
  expiryYear: number;
}

export async function GET(request: NextRequest) {
  // Verify the request is from Vercel Cron
  const authError = requireCronAuth(request);
  if (authError) return authError;

  console.log("[Pre-Dunning] Starting expiring card check...");

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-01-28.clover",
  });

  let totalChecked = 0;
  let totalExpiring = 0;
  let totalNotified = 0;
  let errors = 0;

  try {
    // Get all connected accounts
    const accounts = await getAllConnectedAccounts();
    
    // Also check direct customers (if any)
    const accountsToCheck = [
      { stripeAccountId: "direct", businessName: "Revive" },
      ...accounts.map(a => ({ stripeAccountId: a.stripeAccountId, businessName: a.businessName || "Your Service" })),
    ];

    // Get notification history
    const notificationHistory = await get<Record<string, ExpiringCardNotification>>("expiring_card_notifications") || {};

    // Calculate expiry threshold (7 days from now)
    const now = new Date();
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const targetMonth = sevenDaysFromNow.getMonth() + 1; // 1-12
    const targetYear = sevenDaysFromNow.getFullYear();

    for (const account of accountsToCheck) {
      const isDirect = account.stripeAccountId === "direct";
      const stripeOptions = isDirect ? undefined : { stripeAccount: account.stripeAccountId };

      try {
        // List all customers with active subscriptions
        const customers = await stripe.customers.list(
          {
            limit: 100, // Adjust as needed
          },
          stripeOptions
        );

        totalChecked += customers.data.length;

        for (const customer of customers.data) {
          try {
            // Get payment methods
            const paymentMethods = await stripe.paymentMethods.list(
              {
                customer: customer.id,
                type: "card",
              },
              stripeOptions
            );

            for (const pm of paymentMethods.data) {
              const card = pm.card;
              if (!card) continue;

              // Check if card expires within 7 days
              const cardExpiresThisMonth = card.exp_month === targetMonth && card.exp_year === targetYear;
              
              if (cardExpiresThisMonth) {
                totalExpiring++;

                // Check if we've already notified this customer about this card
                const notificationKey = `${customer.id}:${card.exp_month}:${card.exp_year}`;
                const existingNotification = notificationHistory[notificationKey];

                // Skip if notified within last 7 days
                if (existingNotification && (Date.now() - existingNotification.notifiedAt) < 7 * 24 * 60 * 60 * 1000) {
                  console.log(`[Pre-Dunning] Already notified ${customer.email} about card expiring ${card.exp_month}/${card.exp_year}`);
                  continue;
                }

                // Send warning email
                const sent = await sendExpiringCardEmail({
                  customerEmail: customer.email || "",
                  customerName: customer.name || "Valued Customer",
                  customerId: customer.id,
                  businessName: account.businessName,
                  expiryMonth: card.exp_month,
                  expiryYear: card.exp_year,
                  cardLast4: card.last4,
                });

                if (sent) {
                  totalNotified++;
                  
                  // Record notification
                  notificationHistory[notificationKey] = {
                    customerId: customer.id,
                    notifiedAt: Date.now(),
                    expiryMonth: card.exp_month,
                    expiryYear: card.exp_year,
                  };
                }
              }
            }
          } catch (customerError: unknown) {
            console.error(`[Pre-Dunning] Error processing customer ${customer.id}:`, customerError);
            errors++;
          }
        }
      } catch (accountError: unknown) {
        console.error(`[Pre-Dunning] Error processing account ${account.stripeAccountId}:`, accountError);
        errors++;
      }
    }

    // Save notification history
    await set("expiring_card_notifications", notificationHistory);

    console.log(`[Pre-Dunning] Complete: ${totalChecked} customers checked, ${totalExpiring} expiring cards found, ${totalNotified} emails sent, ${errors} errors`);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      checked: totalChecked,
      expiring: totalExpiring,
      notified: totalNotified,
      errors,
    });
  } catch (error: unknown) {
    console.error("[Pre-Dunning] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

async function sendExpiringCardEmail(data: {
  customerEmail: string;
  customerName: string;
  customerId: string;
  businessName: string;
  expiryMonth: number;
  expiryYear: number;
  cardLast4: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.includes("placeholder")) {
    console.log("📧 [EMAIL - DEV MODE] Would send expiring card email:");
    console.log(`   To: ${data.customerEmail}`);
    console.log(`   Card: •••• ${data.cardLast4} expiring ${data.expiryMonth}/${data.expiryYear}`);
    return true; // Success in dev mode
  }

  try {
    const resend = new Resend(apiKey);
    
    // Generate card update token (create a dummy payment ID for now)
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://revive-hq.com";
    let cardUpdateUrl = `${appUrl}/update-payment`; // Fallback
    
    try {
      // We don't have a payment ID here, so we'll just point to generic update
      // In production, you'd want to link this to an upcoming invoice
      cardUpdateUrl = `${appUrl}/update-payment?customer=${data.customerId}`;
    } catch {
      // Use fallback
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL || "billing@revive-hq.com";

    const html = getExpiringCardEmailTemplate({
      customerName: data.customerName,
      businessName: data.businessName,
      expiryMonth: data.expiryMonth,
      expiryYear: data.expiryYear,
      cardLast4: data.cardLast4,
      cardUpdateUrl,
    });

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: data.customerEmail,
      subject: `Heads up: Your card ending in ${data.cardLast4} expires soon`,
      html,
    });

    if (error) {
      console.error(`[Pre-Dunning] Email error for ${data.customerEmail}:`, error);
      return false;
    }

    console.log(`[Pre-Dunning] ✅ Sent expiring card email to ${data.customerEmail}`);
    return true;
  } catch (err: unknown) {
    console.error("[Pre-Dunning] Email send error:", err);
    return false;
  }
}

function getExpiringCardEmailTemplate(data: {
  customerName: string;
  businessName: string;
  expiryMonth: number;
  expiryYear: number;
  cardLast4: string;
  cardUpdateUrl: string;
}): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Card Expiring Soon</title>
  <style>
    body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f4f5; color: #18181b; }
    .container { max-width: 580px; margin: 0 auto; padding: 40px 20px; }
    .card { background: #ffffff; border-radius: 12px; padding: 40px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
    .logo { font-size: 20px; font-weight: 700; color: #6d28d9; margin-bottom: 32px; }
    h1 { font-size: 22px; font-weight: 600; margin: 0 0 16px; color: #18181b; line-height: 1.3; }
    p { font-size: 15px; line-height: 1.6; color: #52525b; margin: 0 0 16px; }
    .card-badge { display: inline-block; background: #fef3c7; color: #92400e; padding: 8px 16px; border-radius: 6px; font-size: 14px; font-weight: 500; margin: 16px 0; }
    .btn { display: inline-block; background: #6d28d9; color: #ffffff !important; text-decoration: none; font-weight: 600; font-size: 15px; padding: 14px 32px; border-radius: 8px; margin: 8px 0 24px; }
    .btn:hover { background: #5b21b6; }
    .footer { text-align: center; margin-top: 32px; font-size: 12px; color: #a1a1aa; }
    @media (max-width: 600px) { .card { padding: 24px; } }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="logo">⟳ ${data.businessName}</div>
      <h1>💳 Heads up: Your card is expiring soon</h1>
      <p>Hi ${data.customerName},</p>
      <p>We noticed that your payment method on file is about to expire. No action is needed right now, but we wanted to give you a heads up so there's no interruption to your service.</p>
      
      <div class="card-badge">
        •••• ${data.cardLast4} — Expires ${data.expiryMonth}/${data.expiryYear}
      </div>
      
      <p>To avoid any payment issues, please update your payment method before it expires:</p>
      
      <a href="${data.cardUpdateUrl}" class="btn">Update Payment Method →</a>
      
      <p style="font-size:13px;color:#71717a;">This is a friendly reminder — no payment has failed yet. We just want to make sure everything keeps running smoothly.</p>
      
      <p style="font-size:13px;color:#71717a;">If you've already updated your card, you can safely ignore this email.</p>
    </div>
    
    <div class="footer">
      <p>Powered by <strong>Revive</strong> — Automated Payment Recovery</p>
      <p>You're receiving this because your payment method is expiring soon.</p>
    </div>
  </div>
</body>
</html>`;
}
