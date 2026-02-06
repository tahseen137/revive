/**
 * Analytics API
 * Returns comprehensive recovery analytics data
 * 
 * Query params:
 *   - accountId: required — tenant isolation
 *   - from: optional — start date (ISO string or unix ms)
 *   - to: optional — end date (ISO string or unix ms)
 */

import { NextRequest, NextResponse } from "next/server";
import { getPaymentsByAccount, getStats, dbHealthCheck } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { APPLICATION_FEE_PERCENT } from "@/lib/application-fee";

export const dynamic = "force-dynamic";

interface FailureBreakdown {
  code: string;
  label: string;
  totalCount: number;
  recoveredCount: number;
  totalAmount: number;
  recoveredAmount: number;
  recoveryRate: number;
}

export async function GET(request: NextRequest) {
  const authError = requireAuth(request);
  if (authError) return authError;

  const { searchParams } = new URL(request.url);
  const accountId = searchParams.get("accountId");
  const fromParam = searchParams.get("from");
  const toParam = searchParams.get("to");

  if (!accountId) {
    return NextResponse.json(
      { error: "accountId query parameter is required" },
      { status: 400 }
    );
  }

  try {
    const [allPayments, stats, health] = await Promise.all([
      getPaymentsByAccount(accountId),
      getStats(accountId),
      dbHealthCheck(),
    ]);

    // Apply date filtering
    const now = Date.now();
    const fromMs = fromParam ? new Date(fromParam).getTime() : 0;
    const toMs = toParam ? new Date(toParam).getTime() : now;

    const payments = allPayments.filter(
      (p) => p.createdAt >= fromMs && p.createdAt <= toMs
    );

    // --- Metrics Cards ---
    const totalRecoveredAllTime =
      allPayments
        .filter((p) => p.status === "recovered")
        .reduce((sum, p) => sum + p.amount, 0) / 100;

    const thisMonthStart = new Date();
    thisMonthStart.setDate(1);
    thisMonthStart.setHours(0, 0, 0, 0);

    const recoveredThisMonth =
      allPayments
        .filter(
          (p) =>
            p.status === "recovered" &&
            (p.recoveredAt || p.createdAt) >= thisMonthStart.getTime()
        )
        .reduce((sum, p) => sum + p.amount, 0) / 100;

    const totalFailedCount = payments.length;
    const recoveredCount = payments.filter(
      (p) => p.status === "recovered"
    ).length;
    const recoveryRate =
      totalFailedCount > 0
        ? Math.round((recoveredCount / totalFailedCount) * 1000) / 10
        : 0;

    const activeRetries = allPayments.filter(
      (p) => p.status === "pending" || p.status === "retrying"
    ).length;

    const totalRecoveredCents = allPayments
      .filter((p) => p.status === "recovered")
      .reduce((sum, p) => sum + p.amount, 0);

    // Competitor comparison: Churnkey charges ~5% + $250/mo, we charge 15% (no base)
    // For the user, show: what they'd pay Churnkey vs what they pay us
    const churnkeyBaseFee = 250; // $/month
    const churnkeyPercent = 5;
    const churnkeyCost =
      churnkeyBaseFee +
      (totalRecoveredCents * churnkeyPercent) / 100 / 100;
    const reviveCost =
      (totalRecoveredCents * APPLICATION_FEE_PERCENT) / 100 / 100;
    const moneySavedVsCompetitor = Math.max(0, churnkeyCost - reviveCost);

    // --- 30-Day Timeline ---
    const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
    const timelinePayments = allPayments.filter(
      (p) => p.createdAt >= thirtyDaysAgo
    );

    const dailyTimeline: {
      date: string;
      recoveredAmount: number;
      failedAmount: number;
      recoveredCount: number;
      failedCount: number;
    }[] = [];

    for (let i = 29; i >= 0; i--) {
      const dayStart = new Date(now - i * 24 * 60 * 60 * 1000);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(dayStart);
      dayEnd.setHours(23, 59, 59, 999);

      const dayPayments = timelinePayments.filter(
        (p) =>
          p.createdAt >= dayStart.getTime() &&
          p.createdAt <= dayEnd.getTime()
      );

      const recovered = dayPayments.filter(
        (p) => p.status === "recovered"
      );
      const failed = dayPayments.filter(
        (p) => p.status !== "recovered"
      );

      dailyTimeline.push({
        date: dayStart.toISOString().split("T")[0],
        recoveredAmount:
          recovered.reduce((s, p) => s + p.amount, 0) / 100,
        failedAmount:
          failed.reduce((s, p) => s + p.amount, 0) / 100,
        recoveredCount: recovered.length,
        failedCount: failed.length,
      });
    }

    // --- Recovery Feed (recent 50) ---
    const recentPayments = [...allPayments]
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .slice(0, 50)
      .map((p) => ({
        id: p.id,
        email: p.customerEmail,
        customerName: p.customerName,
        amount: p.amount / 100,
        currency: p.currency,
        failureCode: p.failureCode,
        failureReason: p.failureReason,
        status: p.status,
        retryCount: p.retryCount,
        maxRetries: p.maxRetries,
        retryStrategy: getStrategyLabel(p.failureCode),
        createdAt: new Date(p.createdAt).toISOString(),
        updatedAt: new Date(p.updatedAt).toISOString(),
        recoveredAt: p.recoveredAt
          ? new Date(p.recoveredAt).toISOString()
          : null,
      }));

    // --- Failure Breakdown ---
    const failureCodes = [
      "insufficient_funds",
      "expired_card",
      "card_declined",
      "processing_error",
    ];
    const codeLabels: Record<string, string> = {
      insufficient_funds: "Insufficient Funds",
      expired_card: "Expired Card",
      card_declined: "Card Declined",
      processing_error: "Processing Error",
    };

    const breakdowns: FailureBreakdown[] = [];
    const knownCodes = new Set(failureCodes);

    // Build breakdown for known codes
    for (const code of failureCodes) {
      const matching = payments.filter((p) => p.failureCode === code);
      const recovered = matching.filter(
        (p) => p.status === "recovered"
      );
      breakdowns.push({
        code,
        label: codeLabels[code] || code,
        totalCount: matching.length,
        recoveredCount: recovered.length,
        totalAmount: matching.reduce((s, p) => s + p.amount, 0) / 100,
        recoveredAmount:
          recovered.reduce((s, p) => s + p.amount, 0) / 100,
        recoveryRate:
          matching.length > 0
            ? Math.round(
                (recovered.length / matching.length) * 1000
              ) / 10
            : 0,
      });
    }

    // "Other" bucket
    const otherPayments = payments.filter(
      (p) => !knownCodes.has(p.failureCode)
    );
    const otherRecovered = otherPayments.filter(
      (p) => p.status === "recovered"
    );
    breakdowns.push({
      code: "other",
      label: "Other",
      totalCount: otherPayments.length,
      recoveredCount: otherRecovered.length,
      totalAmount:
        otherPayments.reduce((s, p) => s + p.amount, 0) / 100,
      recoveredAmount:
        otherRecovered.reduce((s, p) => s + p.amount, 0) / 100,
      recoveryRate:
        otherPayments.length > 0
          ? Math.round(
              (otherRecovered.length / otherPayments.length) * 1000
            ) / 10
          : 0,
    });

    // --- ROI ---
    const totalLostWithoutRevive =
      allPayments.reduce((s, p) => s + p.amount, 0) / 100;
    const totalRecovered = totalRecoveredAllTime;
    const reviveFee = reviveCost;
    const netSavings = totalRecovered - reviveFee;
    const roi =
      reviveFee > 0
        ? Math.round(((totalRecovered - reviveFee) / reviveFee) * 100)
        : totalRecovered > 0
        ? Infinity
        : 0;

    return NextResponse.json({
      metrics: {
        totalRecoveredAllTime,
        recoveredThisMonth,
        recoveryRate,
        activeRetries,
        moneySavedVsCompetitor: Math.round(moneySavedVsCompetitor * 100) / 100,
        churnkeyCost: Math.round(churnkeyCost * 100) / 100,
        reviveCost: Math.round(reviveCost * 100) / 100,
        totalPayments: allPayments.length,
      },
      dailyTimeline,
      recentPayments,
      failureBreakdown: breakdowns,
      roi: {
        totalLostWithoutRevive:
          Math.round(totalLostWithoutRevive * 100) / 100,
        totalRecovered: Math.round(totalRecovered * 100) / 100,
        reviveFee: Math.round(reviveFee * 100) / 100,
        netSavings: Math.round(netSavings * 100) / 100,
        roiPercent: roi === Infinity ? 999 : roi,
      },
      dbHealth: health,
      stats,
      filteredCount: payments.length,
    });
  } catch (error: unknown) {
    console.error("[Analytics API] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}

function getStrategyLabel(failureCode: string): string {
  const map: Record<string, string> = {
    insufficient_funds: "Payday-aware retry",
    expired_card: "Dunning (card update)",
    card_declined: "Smart retry (4h→24h→72h)",
    processing_error: "Fast retry (1h)",
    authentication_required: "Dunning (auth needed)",
    generic_decline: "Smart retry",
    do_not_honor: "Smart retry",
  };
  return map[failureCode] || "Standard retry";
}
