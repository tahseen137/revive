"use client";

import { FailedPaymentWall } from "@/components/FailedPaymentWall";
import { useState } from "react";

/**
 * Test page for Failed Payment Wall component
 * Navigate to /test-payment-wall to preview the blocking modal
 */
export default function TestPaymentWallPage() {
  const [demoMode, setDemoMode] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 p-8">
      {/* Payment wall in demo mode */}
      {demoMode && <FailedPaymentWall demoMode={true} />}

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-4">
          Failed Payment Wall — Test Page
        </h1>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Test the Payment Wall
          </h2>

          <p className="text-zinc-300 mb-6">
            This page lets you preview the Failed Payment Wall component in demo mode.
            Click the button below to activate the blocking modal.
          </p>

          <button
            onClick={() => setDemoMode(!demoMode)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              demoMode
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {demoMode ? "Hide Payment Wall" : "Show Payment Wall"}
          </button>

          {demoMode && (
            <p className="text-yellow-400 text-sm mt-4">
              ⚠️ Payment wall is now active. It should block this entire page.
            </p>
          )}
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Integration Guide
          </h2>

          <div className="space-y-4 text-zinc-300 text-sm">
            <div>
              <h3 className="font-semibold text-white mb-2">1. Add to Layout</h3>
              <pre className="bg-zinc-950 border border-zinc-700 rounded p-3 overflow-x-auto">
                <code>{`import { FailedPaymentWall } from "@/components/FailedPaymentWall";

export default function Layout({ children }) {
  return (
    <>
      <FailedPaymentWall pollInterval={60000} />
      {children}
    </>
  );
}`}</code>
              </pre>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">2. Set Customer ID</h3>
              <p className="mb-2">The wall checks for customer ID in this order:</p>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>
                  <code className="bg-zinc-800 px-2 py-1 rounded">customerId</code> prop
                </li>
                <li>
                  <code className="bg-zinc-800 px-2 py-1 rounded">revive_customer_id</code> cookie
                </li>
                <li>
                  <code className="bg-zinc-800 px-2 py-1 rounded">revive_customer_id</code> localStorage
                </li>
              </ol>
              <pre className="bg-zinc-950 border border-zinc-700 rounded p-3 overflow-x-auto mt-3">
                <code>{`// Set via cookie (when user logs in)
document.cookie = "revive_customer_id=cus_xxx; path=/; max-age=31536000";

// Or localStorage
localStorage.setItem("revive_customer_id", "cus_xxx");

// Or pass directly
<FailedPaymentWall customerId="cus_xxx" />`}</code>
              </pre>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">3. How It Works</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Checks <code className="bg-zinc-800 px-1 rounded">/api/payment-status</code> on mount</li>
                <li>Polls every 60 seconds by default (configurable)</li>
                <li>Blocks entire UI with overlay when failed payment detected</li>
                <li>Links to existing card update flow</li>
                <li>Auto-dismisses when payment is resolved</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">4. Props</h3>
              <table className="w-full text-left border border-zinc-700 rounded">
                <thead className="bg-zinc-800">
                  <tr>
                    <th className="px-3 py-2 border-b border-zinc-700">Prop</th>
                    <th className="px-3 py-2 border-b border-zinc-700">Type</th>
                    <th className="px-3 py-2 border-b border-zinc-700">Default</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-3 py-2 border-b border-zinc-700">customerId</td>
                    <td className="px-3 py-2 border-b border-zinc-700">string?</td>
                    <td className="px-3 py-2 border-b border-zinc-700">undefined</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border-b border-zinc-700">pollInterval</td>
                    <td className="px-3 py-2 border-b border-zinc-700">number?</td>
                    <td className="px-3 py-2 border-b border-zinc-700">30000</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">demoMode</td>
                    <td className="px-3 py-2">boolean?</td>
                    <td className="px-3 py-2">false</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
