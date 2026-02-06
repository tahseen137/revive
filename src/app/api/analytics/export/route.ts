/**
 * Analytics CSV Export API
 * Downloads payment recovery data as CSV
 * 
 * Query params:
 *   - accountId: required
 *   - from: optional — start date
 *   - to: optional — end date
 *   - status: optional — comma-separated status filter
 */

import { NextRequest, NextResponse } from "next/server";
import { getPaymentsByAccount } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const authError = requireAuth(request);
  if (authError) return authError;

  const { searchParams } = new URL(request.url);
  const accountId = searchParams.get("accountId");
  const fromParam = searchParams.get("from");
  const toParam = searchParams.get("to");
  const statusFilter = searchParams.get("status");

  if (!accountId) {
    return NextResponse.json(
      { error: "accountId query parameter is required" },
      { status: 400 }
    );
  }

  try {
    let payments = await getPaymentsByAccount(accountId);

    // Date filter
    const now = Date.now();
    const fromMs = fromParam ? new Date(fromParam).getTime() : 0;
    const toMs = toParam ? new Date(toParam).getTime() : now;
    payments = payments.filter(
      (p) => p.createdAt >= fromMs && p.createdAt <= toMs
    );

    // Status filter
    if (statusFilter) {
      const statuses = statusFilter.split(",");
      payments = payments.filter((p) => statuses.includes(p.status));
    }

    // Sort newest first
    payments.sort((a, b) => b.createdAt - a.createdAt);

    // Build CSV
    const headers = [
      "ID",
      "Stripe Invoice ID",
      "Customer Name",
      "Customer Email",
      "Amount",
      "Currency",
      "Status",
      "Failure Code",
      "Failure Reason",
      "Retry Count",
      "Max Retries",
      "Created At",
      "Recovered At",
      "Next Retry At",
    ];

    const rows = payments.map((p) => [
      p.id,
      p.stripeInvoiceId,
      escapeCsv(p.customerName),
      escapeCsv(p.customerEmail),
      (p.amount / 100).toFixed(2),
      p.currency.toUpperCase(),
      p.status,
      p.failureCode,
      escapeCsv(p.failureReason),
      p.retryCount.toString(),
      p.maxRetries.toString(),
      new Date(p.createdAt).toISOString(),
      p.recoveredAt ? new Date(p.recoveredAt).toISOString() : "",
      p.nextRetryAt ? new Date(p.nextRetryAt).toISOString() : "",
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const filename = `revive-recovery-${new Date().toISOString().split("T")[0]}.csv`;

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error: unknown) {
    console.error("[Analytics Export] Error:", error);
    return NextResponse.json(
      { error: "Failed to export data" },
      { status: 500 }
    );
  }
}

function escapeCsv(value: string): string {
  if (!value) return "";
  if (
    value.includes(",") ||
    value.includes('"') ||
    value.includes("\n")
  ) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
