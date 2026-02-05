/**
 * Email Template Preview API
 * 
 * GET /api/email/preview?type=payment_failed
 * Returns rendered HTML for email template preview
 */

import { NextRequest, NextResponse } from "next/server";
import { getEmailTemplate } from "@/lib/email-templates";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") as "payment_failed" | "card_update_reminder" | "final_warning" | "payment_recovered";
  
  if (!type || !["payment_failed", "card_update_reminder", "final_warning", "payment_recovered"].includes(type)) {
    return NextResponse.json(
      { error: "Invalid type. Use: payment_failed, card_update_reminder, final_warning, payment_recovered" },
      { status: 400 }
    );
  }

  const template = getEmailTemplate(type, {
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
  });

  // Return raw HTML for preview
  return new NextResponse(template.html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
