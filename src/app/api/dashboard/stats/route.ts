/**
 * Dashboard Stats API
 * Returns real recovery stats from the database
 */

import { NextRequest, NextResponse } from "next/server";
import { getStats, getAllPayments, dbHealthCheck } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const accountId = searchParams.get("accountId") || undefined;

  try {
    const [_stats, payments, health] = await Promise.all([
      getStats(accountId),
      getAllPayments(),
      dbHealthCheck(),
    ]);
    void _stats; // used for future per-account view

    // Calculate additional metrics from payments
    const now = Date.now();
    const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
    const recentPayments = payments.filter((p) => p.createdAt >= thirtyDaysAgo);

    const activeRetries = payments.filter(
      (p) => p.status === "pending" || p.status === "retrying"
    ).length;

    const dunningCount = payments.filter((p) => p.status === "dunning").length;
    
    const failedThisMonth = recentPayments.length;
    const recoveredThisMonth = recentPayments.filter(
      (p) => p.status === "recovered"
    ).length;

    const totalRecoveredAmount = payments
      .filter((p) => p.status === "recovered")
      .reduce((sum, p) => sum + p.amount, 0);

    const totalFailedAmount = payments.reduce((sum, p) => sum + p.amount, 0);

    const recoveryRate =
      payments.length > 0
        ? (payments.filter((p) => p.status === "recovered").length / payments.length) * 100
        : 0;

    // MRR impact: sum of recovered subscription amounts
    const mrrSaved = payments
      .filter((p) => p.status === "recovered" && p.stripeSubscriptionId)
      .reduce((sum, p) => sum + p.amount, 0);

    // Churn prevented percentage
    const churnPrevented =
      totalFailedAmount > 0
        ? (totalRecoveredAmount / totalFailedAmount) * 100
        : 0;

    // Daily recovery trend (last 30 days)
    const dailyTrend: { date: string; recovered: number; failed: number; amount: number }[] = [];
    for (let i = 29; i >= 0; i--) {
      const dayStart = new Date(now - i * 24 * 60 * 60 * 1000);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(dayStart);
      dayEnd.setHours(23, 59, 59, 999);

      const dayPayments = payments.filter(
        (p) => p.createdAt >= dayStart.getTime() && p.createdAt <= dayEnd.getTime()
      );

      dailyTrend.push({
        date: dayStart.toISOString().split("T")[0],
        recovered: dayPayments.filter((p) => p.status === "recovered").length,
        failed: dayPayments.filter((p) => p.status !== "recovered").length,
        amount: dayPayments
          .filter((p) => p.status === "recovered")
          .reduce((sum, p) => sum + p.amount, 0),
      });
    }

    return NextResponse.json({
      stats: {
        totalRecovered: totalRecoveredAmount / 100, // convert cents to dollars
        recoveryRate: Math.round(recoveryRate * 10) / 10,
        activeRetries,
        dunningCount,
        failedThisMonth,
        recoveredThisMonth,
        pendingRetries: activeRetries,
        mrrSaved: mrrSaved / 100,
        churnPrevented: Math.round(churnPrevented * 10) / 10,
        totalPayments: payments.length,
      },
      dailyTrend,
      dbHealth: health,
    });
  } catch (error: unknown) {
    console.error("[Dashboard Stats] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
