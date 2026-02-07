"use client";

import Link from "next/link";
import { useState } from "react";

export default function SettingsPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailDigest, setEmailDigest] = useState("daily");

  return (
    <main className="min-h-screen bg-[#09090b]">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 min-h-screen border-r border-white/5 bg-[#0a0a0c] p-6">
          <Link href="/" className="flex items-center gap-2 mb-10">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
            </div>
            <span className="text-lg font-semibold tracking-tight">Revive</span>
          </Link>

          <nav className="space-y-1 flex-1">
            <Link href="/dashboard" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Overview
            </Link>
            <Link href="/dashboard/settings" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm bg-white/5 text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-h-screen">
          <header className="border-b border-white/5 px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-zinc-500 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <div>
                <h1 className="text-xl font-semibold">Settings</h1>
                <p className="text-sm text-zinc-500">Manage your recovery preferences</p>
              </div>
            </div>
          </header>

          <div className="p-6 lg:p-8 space-y-6 max-w-3xl">
            {/* Notifications */}
            <div className="glass rounded-xl p-6">
              <h2 className="font-semibold mb-4">Notifications</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">Email Notifications</div>
                    <div className="text-xs text-zinc-500">Get notified about recovered payments</div>
                  </div>
                  <button
                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${notificationsEnabled ? "bg-brand-600" : "bg-zinc-700"}`}
                  >
                    <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${notificationsEnabled ? "translate-x-6" : ""}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">Digest Frequency</div>
                    <div className="text-xs text-zinc-500">How often to send summary reports</div>
                  </div>
                  <select
                    value={emailDigest}
                    onChange={(e) => setEmailDigest(e.target.value)}
                    className="bg-zinc-900 border border-white/10 rounded-lg px-3 py-1.5 text-sm"
                  >
                    <option value="realtime">Real-time</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Recovery Strategy */}
            <div className="glass rounded-xl p-6">
              <h2 className="font-semibold mb-4">Recovery Strategy</h2>
              <div className="space-y-3">
                {[
                  { id: "aggressive", label: "Aggressive", desc: "Retry every 2 hours, up to 8 attempts" },
                  { id: "moderate", label: "Moderate", desc: "Retry every 6 hours, up to 4 attempts" },
                  { id: "conservative", label: "Conservative", desc: "Retry once daily, up to 3 attempts" },
                ].map((strategy) => (
                  <label
                    key={strategy.id}
                    className="flex items-center gap-4 p-4 rounded-lg bg-white/[0.02] border border-white/5 cursor-pointer hover:border-brand-500/30 transition-colors"
                  >
                    <input
                      type="radio"
                      name="strategy"
                      value={strategy.id}
                      defaultChecked={strategy.id === "moderate"}
                      className="accent-brand-500"
                    />
                    <div>
                      <div className="font-medium text-sm">{strategy.label}</div>
                      <div className="text-xs text-zinc-500">{strategy.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Danger Zone */}
            <div className="glass rounded-xl p-6 border-red-500/20">
              <h2 className="font-semibold mb-4 text-red-400">Danger Zone</h2>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">Disconnect Stripe</div>
                  <div className="text-xs text-zinc-500">Remove your Stripe connection</div>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/10 transition-colors">
                  Disconnect
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
