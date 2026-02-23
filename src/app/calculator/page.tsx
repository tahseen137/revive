"use client";

import { useState, useMemo, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Constants ───────────────────────────────────────────────────────────────
const REVIVE_MONTHLY_COST = 49;
const REVIVE_ANNUAL_COST = 588;
const CHURNKEY_BASE = 250;
const CHURNKEY_REVENUE_TAX = 0.15;
const FAILED_PAYMENT_RECOVERY_RATE = 0.75;
const WINBACK_RATE = 0.15;

// ─── Formatters ──────────────────────────────────────────────────────────────
function fmtMoney(n: number): string {
  if (n >= 1_000_000) return "$" + (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return "$" + (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return "$" + Math.round(n).toLocaleString();
}

function fmtMoneyFull(n: number): string {
  return "$" + Math.round(n).toLocaleString();
}

function fmtMoneyDecimal(n: number): string {
  return "$" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function fmtLTV(v: number): string {
  return v >= 1000 ? "$" + (v / 1000).toFixed(1).replace(/\.0$/, "") + "K" : "$" + Math.round(v);
}

// ─── Slider Component ─────────────────────────────────────────────────────────
interface SliderProps {
  id: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  minLabel: string;
  maxLabel: string;
}

function Slider({ id, min, max, step, value, onChange, minLabel, maxLabel }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div>
      {/* Track + thumb */}
      <div className="relative h-6 flex items-center">
        <div className="relative w-full h-[6px] bg-[#1a1d27] rounded-full border border-[#252836]">
          <div
            className="absolute left-0 top-0 h-full rounded-full"
            style={{
              width: `${pct}%`,
              background: "linear-gradient(90deg, #6c63ff, #9f7aea)",
            }}
          />
          <div
            className="absolute top-1/2 w-[18px] h-[18px] bg-white border-[3px] border-[#6c63ff] rounded-full pointer-events-none"
            style={{
              left: `${pct}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />
      </div>
      {/* Labels */}
      <div className="flex justify-between mt-2">
        <span className="text-[11px] text-[#5a5f7a] font-medium">{minLabel}</span>
        <span className="text-[11px] text-[#5a5f7a] font-medium">{maxLabel}</span>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CalculatorPage() {
  const [mrr, setMrr] = useState(50000);
  const [churn, setChurn] = useState(5);
  const [ltv, setLtv] = useState(500);
  const [failed, setFailed] = useState(40);
  const [email, setEmail] = useState("");
  const [emailState, setEmailState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const emailInputRef = useRef<HTMLInputElement>(null);

  const calc = useMemo(() => {
    const churnFrac = churn / 100;
    const failedFrac = failed / 100;

    const monthlyLost = mrr * churnFrac;
    const annualLost = monthlyLost * 12;
    const annualFailedLost = annualLost * failedFrac;
    const annualRecoverable = annualFailedLost * FAILED_PAYMENT_RECOVERY_RATE;

    const monthlyRecovery = monthlyLost * WINBACK_RATE;
    const annualRecovery = monthlyRecovery * 12;
    const netROI = annualRecovery - REVIVE_ANNUAL_COST;
    const paybackMonths = monthlyRecovery > 0 ? REVIVE_MONTHLY_COST / monthlyRecovery : Infinity;
    const roiMultiple = annualRecovery / REVIVE_ANNUAL_COST;

    const churnKeyRevenueTax = monthlyRecovery * CHURNKEY_REVENUE_TAX;
    const churnKeyTotal = CHURNKEY_BASE + churnKeyRevenueTax;
    const monthlySavings = churnKeyTotal - REVIVE_MONTHLY_COST;

    return {
      monthlyLost, annualLost, annualRecoverable,
      monthlyRecovery, annualRecovery, netROI,
      paybackMonths, roiMultiple,
      churnKeyTotal, monthlySavings,
    };
  }, [mrr, churn, ltv, failed]);

  async function handleEmailSubmit() {
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) {
      emailInputRef.current?.focus();
      setEmailState("error");
      setTimeout(() => setEmailState("idle"), 1500);
      return;
    }

    setEmailState("loading");
    try {
      await fetch("https://revive-hq.com/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          source: "calculator-v2",
          mrr,
          churnRate: churn,
          ltv,
        }),
      });
    } catch (_) {
      // swallow network errors
    }
    setEmailState("success");
  }

  const monthlyFailed = calc.monthlyLost * (failed / 100);

  return (
    <div className="min-h-screen bg-[#0a0b0f] text-[#f0f1f5] font-sans antialiased overflow-x-hidden">
      {/* Background grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(108,99,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Glow orb */}
      <div
        className="fixed pointer-events-none z-0"
        style={{
          top: -200,
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 600,
          background: "radial-gradient(ellipse, rgba(108,99,255,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10">
        <Navbar />

        <div className="max-w-[900px] mx-auto px-5 pb-20">

          {/* ─── Header ─── */}
          <header className="pt-16 pb-12 text-center">
            <div className="inline-flex items-center gap-1.5 bg-[rgba(108,99,255,0.12)] border border-[rgba(108,99,255,0.3)] text-[#a59ef7] text-[11px] font-bold tracking-[0.06em] uppercase px-3.5 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-[#6c63ff] rounded-full animate-pulse" />
              ROI Calculator v2
            </div>
            <h1
              className="text-5xl font-black tracking-tight leading-tight mb-5"
              style={{
                background: "linear-gradient(135deg, #fff 30%, #a59ef7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              How much could Revive<br />recover for you?
            </h1>
            <p className="text-lg text-[#8b8fa8] max-w-lg mx-auto leading-relaxed">
              Enter your numbers. See exactly what you'd get back —
              and what you'd save vs ChurnKey.
            </p>
          </header>

          {/* ─── Calculator Card ─── */}
          <div className="bg-[#13151c] border border-[#252836] rounded-3xl p-10 mb-6 max-sm:p-6">
            <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#5a5f7a] mb-7">
              Your numbers
            </div>

            {/* MRR + Churn grid */}
            <div className="grid grid-cols-2 gap-7 mb-7 max-sm:grid-cols-1">
              {/* MRR */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-semibold text-[#f0f1f5]">Monthly Recurring Revenue</span>
                  <span className="text-xl font-extrabold text-[#6c63ff] tabular-nums">{fmtMoney(mrr)}</span>
                </div>
                <Slider id="mrr" min={1000} max={500000} step={1000} value={mrr} onChange={setMrr} minLabel="$1K" maxLabel="$500K" />
              </div>

              {/* Churn Rate */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-semibold text-[#f0f1f5]">Monthly Churn Rate</span>
                  <span className="text-xl font-extrabold text-[#6c63ff] tabular-nums">{churn.toFixed(1)}%</span>
                </div>
                <Slider id="churn" min={1} max={15} step={0.1} value={churn} onChange={setChurn} minLabel="1%" maxLabel="15%" />
              </div>
            </div>

            {/* LTV */}
            <div className="flex flex-col gap-3 mb-7">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-semibold text-[#f0f1f5]">Average Customer LTV (Lifetime Value)</span>
                <span className="text-xl font-extrabold text-[#6c63ff] tabular-nums">{fmtLTV(ltv)}</span>
              </div>
              <Slider id="ltv" min={50} max={50000} step={50} value={ltv} onChange={setLtv} minLabel="$50" maxLabel="$50K" />
            </div>

            {/* Failed payment % */}
            <div className="bg-[#1a1d27] border border-[#252836] rounded-[10px] p-5">
              <div className="flex justify-between items-center mb-2.5">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-[#f0f1f5]">Failed Payment Churn</span>
                  <span className="text-xs text-[#5a5f7a]">% of churn caused by failed cards / expired payments (industry avg: 40%)</span>
                </div>
                <span className="text-xl font-extrabold text-[#6c63ff]">{Math.round(failed)}%</span>
              </div>
              <Slider id="failed" min={10} max={70} step={1} value={failed} onChange={setFailed} minLabel="10%" maxLabel="70%" />
            </div>

            {/* Results grid */}
            <div className="grid grid-cols-3 gap-4 mt-8 max-lg:grid-cols-2 max-sm:grid-cols-1">
              {/* Monthly Lost */}
              <div className="bg-[rgba(255,107,107,0.05)] border border-[rgba(255,107,107,0.25)] rounded-2xl p-6 flex flex-col gap-1.5">
                <div className="text-xl mb-1">📉</div>
                <div className="text-[11px] font-semibold text-[#8b8fa8] uppercase tracking-[0.06em]">Lost / Month</div>
                <div className="text-3xl font-black tracking-tight tabular-nums text-[#ff6b6b] leading-none my-1">
                  {fmtMoney(calc.monthlyLost)}
                </div>
                <div className="text-[11px] text-[#5a5f7a] leading-snug">Revenue leaving every month to all churn</div>
              </div>

              {/* Annual Lost */}
              <div className="bg-[#1a1d27] border border-[#252836] rounded-2xl p-6 flex flex-col gap-1.5">
                <div className="text-xl mb-1">📆</div>
                <div className="text-[11px] font-semibold text-[#8b8fa8] uppercase tracking-[0.06em]">Lost / Year</div>
                <div className="text-3xl font-black tracking-tight tabular-nums text-[#f0c060] leading-none my-1">
                  {fmtMoney(calc.annualLost)}
                </div>
                <div className="text-[11px] text-[#5a5f7a] leading-snug">Annualised total churn cost</div>
              </div>

              {/* Revive Recover */}
              <div className="bg-[rgba(0,212,170,0.06)] border border-[rgba(0,212,170,0.3)] rounded-2xl p-6 flex flex-col gap-1.5 shadow-[0_0_30px_rgba(0,212,170,0.08)] max-lg:col-span-2 max-sm:col-span-1">
                <div className="text-xl mb-1">⚡</div>
                <div className="text-[11px] font-semibold text-[#8b8fa8] uppercase tracking-[0.06em]">Revive Can Recover</div>
                <div className="text-3xl font-black tracking-tight tabular-nums text-[#00d4aa] leading-none my-1">
                  {fmtMoney(calc.annualRecoverable)}
                </div>
                <div className="text-[11px] text-[#5a5f7a] leading-snug">
                  ~75% of ${Math.round(calc.annualLost * failed / 100 / 1000)}K failed-payment churn, annually
                </div>
              </div>
            </div>

            {/* Insight */}
            <div className="mt-5 bg-[rgba(108,99,255,0.08)] border border-[rgba(108,99,255,0.2)] rounded-[10px] p-3.5 flex gap-2.5 items-start text-[13px] text-[#c0b8ff] leading-relaxed">
              <span className="text-base shrink-0 mt-px">💡</span>
              <span>
                You're losing{" "}
                <strong className="text-[#ff9f9f]">{fmtMoneyFull(calc.monthlyLost)}/mo</strong> to churn —
                and{" "}
                <strong className="text-[#ff9f9f]">{fmtMoneyFull(monthlyFailed)}</strong> of that ({failed}%) is from failed payments.
                Those customers didn't <em>choose</em> to leave. Revive wins them back automatically.
              </span>
            </div>
          </div>

          {/* ─── ROI Section ─── */}
          <div className="bg-[#13151c] border border-[rgba(0,212,170,0.25)] rounded-3xl p-10 mb-6 relative overflow-hidden max-sm:p-6">
            <div
              className="absolute top-[-100px] right-[-100px] w-[350px] h-[350px] pointer-events-none"
              style={{ background: "radial-gradient(ellipse, rgba(0,212,170,0.07) 0%, transparent 70%)" }}
            />

            <div className="text-[13px] font-bold tracking-[0.1em] uppercase text-[#00d4aa] mb-1.5">
              📊 Your Revive ROI
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight mb-7">
              Here's what Revive would recover for you
            </h2>

            <div className="grid grid-cols-2 gap-3.5 mb-6 max-sm:grid-cols-1">
              {/* Monthly Recovery */}
              <div className="bg-[rgba(0,212,170,0.06)] border border-[rgba(0,212,170,0.35)] rounded-[10px] p-5 flex flex-col gap-1">
                <div className="text-[11px] font-bold tracking-[0.07em] uppercase text-[#5a5f7a]">Monthly Recovery</div>
                <div className="text-2xl font-black tracking-tight tabular-nums text-[#00d4aa] leading-tight">
                  {fmtMoney(calc.monthlyRecovery)}
                </div>
                <div className="text-[11.5px] text-[#5a5f7a] leading-snug">15% win-back rate on churned revenue</div>
              </div>

              {/* Annual Recovery */}
              <div className="bg-[rgba(0,212,170,0.06)] border border-[rgba(0,212,170,0.35)] rounded-[10px] p-5 flex flex-col gap-1">
                <div className="text-[11px] font-bold tracking-[0.07em] uppercase text-[#5a5f7a]">Annual Recovery</div>
                <div className="text-2xl font-black tracking-tight tabular-nums text-[#00d4aa] leading-tight">
                  {fmtMoney(calc.annualRecovery)}
                </div>
                <div className="text-[11.5px] text-[#5a5f7a] leading-snug">Projected over 12 months</div>
              </div>

              {/* Revive Cost */}
              <div className="bg-[#1a1d27] border border-[#252836] rounded-[10px] p-5 flex flex-col gap-1">
                <div className="text-[11px] font-bold tracking-[0.07em] uppercase text-[#5a5f7a]">Revive Cost</div>
                <div className="text-2xl font-black tracking-tight tabular-nums text-[#f0f1f5] leading-tight">
                  $49<span className="text-base font-semibold text-[#8b8fa8]">/mo</span>
                </div>
                <div className="text-[11.5px] text-[#5a5f7a] leading-snug">Flat rate. No revenue tax. Ever.</div>
              </div>

              {/* Net ROI */}
              <div className="bg-[#1a1d27] border border-[#252836] rounded-[10px] p-5 flex flex-col gap-1">
                <div className="text-[11px] font-bold tracking-[0.07em] uppercase text-[#5a5f7a]">Net ROI (Annual)</div>
                <div
                  className="text-2xl font-black tracking-tight tabular-nums leading-tight"
                  style={{ color: calc.netROI >= 0 ? "#00d4aa" : "#ff6b6b" }}
                >
                  {(calc.netROI >= 0 ? "+" : "") + fmtMoney(calc.netROI)}
                </div>
                <div className="text-[11.5px] text-[#5a5f7a] leading-snug">annual recovery minus $588/yr cost</div>
              </div>

              {/* Payback Period */}
              <div className="bg-[#1a1d27] border border-[#252836] rounded-[10px] p-5 flex flex-col gap-1">
                <div className="text-[11px] font-bold tracking-[0.07em] uppercase text-[#5a5f7a]">Payback Period</div>
                <div className="text-2xl font-black tracking-tight tabular-nums text-[#f0f1f5] leading-tight">
                  {isFinite(calc.paybackMonths) && calc.monthlyRecovery > 0
                    ? calc.paybackMonths.toFixed(1) + " mo"
                    : "—"}
                </div>
                <div className="text-[11.5px] text-[#5a5f7a] leading-snug">Until Revive pays for itself</div>
              </div>

              {/* ROI Multiple */}
              <div className="bg-[#1a1d27] border border-[#252836] rounded-[10px] p-5 flex flex-col gap-1">
                <div className="text-[11px] font-bold tracking-[0.07em] uppercase text-[#5a5f7a]">ROI Multiple</div>
                <div className="text-2xl font-black tracking-tight tabular-nums text-[#f0f1f5] leading-tight">
                  {calc.roiMultiple.toFixed(1)}x
                </div>
                <div className="text-[11.5px] text-[#5a5f7a] leading-snug">Return for every dollar spent</div>
              </div>
            </div>

            {/* ChurnKey comparison */}
            <div className="bg-[rgba(255,107,107,0.05)] border border-[rgba(255,107,107,0.2)] rounded-[10px] p-5 flex justify-between items-center gap-3 flex-wrap">
              <div className="flex flex-col gap-0.5">
                <strong className="text-sm font-bold text-[#f0f1f5]">🔴 ChurnKey would charge you</strong>
                <span className="text-xs text-[#5a5f7a]">$250/mo base + 15% revenue tax on everything recovered</span>
              </div>
              <div className="flex flex-col items-end gap-0.5">
                <span className="text-xl font-black text-[#ff6b6b] tabular-nums tracking-tight">
                  {fmtMoneyDecimal(calc.churnKeyTotal)}/mo
                </span>
                <span className="text-[11px] text-[#5a5f7a]">for the same result</span>
              </div>
            </div>

            {calc.monthlySavings > 0 && (
              <div className="mt-3.5 inline-block bg-[rgba(0,212,170,0.12)] border border-[rgba(0,212,170,0.3)] text-[#00d4aa] text-xs font-bold px-3 py-1.5 rounded-full">
                ✅ You'd save {fmtMoneyDecimal(calc.monthlySavings)}/mo by choosing Revive over ChurnKey
              </div>
            )}
          </div>

          {/* ─── Email Capture ─── */}
          <div
            className="rounded-2xl p-9 mb-6 max-sm:p-6"
            style={{ background: "linear-gradient(135deg, rgba(108,99,255,0.10), rgba(0,212,170,0.06))", border: "1px solid rgba(108,99,255,0.25)" }}
          >
            <div className="mb-5">
              <div className="text-lg font-extrabold tracking-tight mb-1.5">
                📧 Get your full personalized churn recovery report
              </div>
              <div className="text-[13.5px] text-[#8b8fa8] leading-relaxed">
                We'll email you a detailed breakdown with win-back sequences, segment analysis, and a 30-day recovery plan — tailored to your numbers.
              </div>
            </div>

            {emailState === "success" ? (
              <div className="flex items-center gap-2.5 bg-[rgba(0,212,170,0.1)] border border-[rgba(0,212,170,0.3)] rounded-[10px] px-4 py-3.5 text-sm font-semibold text-[#00d4aa]">
                ✅ Check your inbox! We'll send your personalized recovery plan.
              </div>
            ) : (
              <div className="flex gap-2.5 flex-wrap">
                <input
                  ref={emailInputRef}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleEmailSubmit()}
                  placeholder="you@yourcompany.com"
                  autoComplete="email"
                  className="flex-1 min-w-[200px] bg-[#1a1d27] border border-[#252836] rounded-[10px] px-4 py-3 text-sm text-[#f0f1f5] outline-none placeholder:text-[#5a5f7a] focus:border-[rgba(108,99,255,0.5)] focus:shadow-[0_0_0_3px_rgba(108,99,255,0.12)] transition-all"
                  style={{ borderColor: emailState === "error" ? "rgba(255,107,107,0.6)" : undefined }}
                />
                <button
                  onClick={handleEmailSubmit}
                  disabled={emailState === "loading"}
                  className="inline-flex items-center gap-2 text-white text-sm font-bold px-5 py-3 rounded-[10px] whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed transition-all hover:-translate-y-px"
                  style={{
                    background: "linear-gradient(135deg, #6c63ff, #9f7aea)",
                    boxShadow: "0 4px 18px rgba(108,99,255,0.35)",
                  }}
                >
                  {emailState === "loading" ? "Sending…" : "Send My Report & Start Free Trial →"}
                </button>
              </div>
            )}
          </div>

          {/* ─── Final CTA ─── */}
          <div
            className="rounded-3xl p-10 text-center mb-12 relative overflow-hidden max-sm:p-7"
            style={{
              background: "linear-gradient(135deg, rgba(108,99,255,0.15), rgba(159,122,234,0.1))",
              border: "1px solid rgba(108,99,255,0.3)",
            }}
          >
            <div
              className="absolute pointer-events-none"
              style={{
                top: -100,
                left: "50%",
                transform: "translateX(-50%)",
                width: 400,
                height: 300,
                background: "radial-gradient(ellipse, rgba(108,99,255,0.15) 0%, transparent 70%)",
              }}
            />
            <h2 className="text-3xl font-extrabold tracking-tight mb-3 leading-tight">
              Verify this ROI in 30 days — for free
            </h2>
            <p className="text-[#8b8fa8] text-[15px] max-w-md mx-auto mb-7 leading-relaxed">
              Connect Stripe in 10 minutes. Revive starts recovering churned revenue on autopilot. No credit card required until you see results.
            </p>

            <div className="text-5xl font-black tracking-tight tabular-nums text-[#00d4aa] mb-2">
              {fmtMoney(calc.annualRecoverable)}
            </div>
            <div className="text-sm text-[#5a5f7a] font-medium mb-7">
              estimated annual recovery for your numbers
            </div>

            <a
              href="https://revive-hq.com/api/connect"
              className="inline-flex items-center gap-2 text-white text-base font-bold px-8 py-4 rounded-xl no-underline transition-all hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #6c63ff, #9f7aea)",
                boxShadow: "0 4px 24px rgba(108,99,255,0.4)",
              }}
            >
              Start your free trial and verify this ROI in 30 days
              <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
            </a>

            <div className="mt-4 text-xs text-[#5a5f7a]">
              Free to start · No credit card required · Setup in 10 minutes
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
