/**
 * Email Template Preview API
 *
 * GET /api/email/preview?type=payment_failed
 * Returns rendered HTML for email template preview
 *
 * Dunning types (sent to end-customers):
 *   payment_failed | card_update_reminder | final_warning | payment_recovered
 *
 * Onboarding types (sent to Revive users):
 *   welcome | checkin | recovery
 */

import { NextRequest, NextResponse } from "next/server";
import { getEmailTemplate } from "@/lib/email-templates";
import {
  welcomeEmail,
  checkinEmail,
  recoveryNotificationEmail,
} from "@/lib/emails/onboarding-templates";

const DUNNING_TYPES = ["payment_failed", "card_update_reminder", "final_warning", "payment_recovered"];
const ONBOARDING_TYPES = ["welcome", "checkin", "recovery"];
const ALL_TYPES = [...DUNNING_TYPES, ...ONBOARDING_TYPES];

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://revive-hq.com";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") ?? "";

  if (!ALL_TYPES.includes(type)) {
    return NextResponse.json(
      { error: `Invalid type. Use: ${ALL_TYPES.join(", ")}` },
      { status: 400 }
    );
  }

  let html: string;

  if (DUNNING_TYPES.includes(type)) {
    const template = getEmailTemplate(
      type as "payment_failed" | "card_update_reminder" | "final_warning" | "payment_recovered",
      {
        customerName: "Alex Johnson",
        amount: "$149.00",
        currency: "usd",
        businessName: "Acme SaaS",
        cardUpdateUrl: "https://billing.stripe.com/p/session/test_preview",
        invoiceDate: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        failureReason: "card_declined",
      }
    );
    html = template.html;
  } else if (type === "welcome") {
    html = welcomeEmail({
      firstName: "Alex",
      dashboardUrl: `${APP_URL}/dashboard`,
    }).html;
  } else if (type === "checkin") {
    html = checkinEmail({
      firstName: "Alex",
      dashboardUrl: `${APP_URL}/dashboard`,
      hasData: true,
      failedCount: 4,
      totalAtRisk: "$1,240",
    }).html;
  } else {
    // recovery
    html = recoveryNotificationEmail({
      firstName: "Alex",
      dashboardUrl: `${APP_URL}/dashboard`,
      customerName: "Jane Smith",
      amount: "$149.00",
      recoveredAt: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      totalRecovered: "$2,890",
    }).html;
  }

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html" },
  });
}
