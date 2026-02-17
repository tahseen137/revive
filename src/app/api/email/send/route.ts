/**
 * POST /api/email/send
 *
 * Internal API route to send onboarding / lifecycle emails to Revive users.
 *
 * Body (JSON):
 * {
 *   type: "welcome" | "checkin" | "recovery",
 *   to: "user@example.com",
 *
 *   // welcome + checkin + recovery
 *   firstName: "Alex",
 *   dashboardUrl?: "https://revive-hq.com/dashboard",  // optional, defaults to app URL
 *
 *   // checkin only
 *   hasData?: boolean,
 *   failedCount?: number,
 *   totalAtRisk?: "$1,240",
 *
 *   // recovery only
 *   customerName: "Jane Smith",
 *   amount: "$149.00",
 *   recoveredAt?: "January 15, 2025",
 *   totalRecovered?: "$2,890",
 * }
 *
 * Secured by CRON_SECRET header (same secret used by Vercel cron routes).
 * Pass it as: Authorization: Bearer <CRON_SECRET>
 */

import { NextRequest, NextResponse } from "next/server";
import {
  sendWelcomeEmail,
  sendCheckinEmail,
  sendRecoveryNotification,
} from "@/lib/emails/send-onboarding";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://revive-hq.com";

// ─── Auth guard ───────────────────────────────────────────────────────────────

function isAuthorized(req: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET;
  // If no secret is set, allow in development only
  if (!cronSecret) {
    return process.env.NODE_ENV !== "production";
  }
  const auth = req.headers.get("authorization") ?? "";
  return auth === `Bearer ${cronSecret}`;
}

// ─── Handler ─────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { type, to, firstName } = body as {
    type?: string;
    to?: string;
    firstName?: string;
  };

  if (!type || !to || !firstName) {
    return NextResponse.json(
      { error: "Missing required fields: type, to, firstName" },
      { status: 400 }
    );
  }

  if (!["welcome", "checkin", "recovery"].includes(type)) {
    return NextResponse.json(
      { error: "Invalid type. Use: welcome, checkin, recovery" },
      { status: 400 }
    );
  }

  const dashboardUrl = (body.dashboardUrl as string | undefined) ?? `${APP_URL}/dashboard`;

  // ── welcome ──────────────────────────────────────────────────────────────
  if (type === "welcome") {
    const result = await sendWelcomeEmail(to, { firstName, dashboardUrl });
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
    return NextResponse.json({ ok: true, messageId: result.messageId });
  }

  // ── checkin ──────────────────────────────────────────────────────────────
  if (type === "checkin") {
    const { hasData, failedCount, totalAtRisk } = body as {
      hasData?: boolean;
      failedCount?: number;
      totalAtRisk?: string;
    };

    const result = await sendCheckinEmail(to, {
      firstName,
      dashboardUrl,
      hasData: hasData ?? false,
      failedCount,
      totalAtRisk,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
    return NextResponse.json({ ok: true, messageId: result.messageId });
  }

  // ── recovery ─────────────────────────────────────────────────────────────
  if (type === "recovery") {
    const { customerName, amount, recoveredAt, totalRecovered } = body as {
      customerName?: string;
      amount?: string;
      recoveredAt?: string;
      totalRecovered?: string;
    };

    if (!customerName || !amount) {
      return NextResponse.json(
        { error: "recovery emails require: customerName, amount" },
        { status: 400 }
      );
    }

    const result = await sendRecoveryNotification(to, {
      firstName,
      dashboardUrl,
      customerName,
      amount,
      recoveredAt,
      totalRecovered,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
    return NextResponse.json({ ok: true, messageId: result.messageId });
  }

  // Should never reach here
  return NextResponse.json({ error: "Unhandled type" }, { status: 500 });
}
