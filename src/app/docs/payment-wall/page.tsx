import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Payment Wall Integration Guide",
  description: "Learn how to integrate Revive's Failed Payment Wall into your app for 4-12% recovery lift",
};

export default function PaymentWallDocsPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100">
      {/* Navigation */}
      <nav className="border-b border-zinc-800 bg-[#09090b]/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                Revive
              </span>
            </Link>
            <Link
              href="/docs"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              ← Back to Docs
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
            Payment Wall Integration
          </h1>
          <p className="text-xl text-zinc-400">
            Block app access for users with failed payments — recover 4-12% more revenue beyond email dunning
          </p>
        </header>

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white">Quick Start</h2>
          <p className="text-zinc-400 mb-6">
            Add this code snippet to your app&apos;s HTML (preferably in your layout/master template):
          </p>
          
          <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800 overflow-x-auto">
            <pre className="text-sm text-zinc-300">
              <code>{`<!-- Load Revive Payment Wall SDK -->
<script src="https://revive-hq.com/revive-payment-wall.js"></script>

<!-- Initialize for current user -->
<script>
  RevivePaymentWall.init({
    accountId: 'acct_your_stripe_connect_account_id',
    customerId: 'cus_current_user_stripe_customer_id',
    // Optional: customize appearance
    brandColor: '#7c3aed' // Your brand color (hex)
  });
</script>`}</code>
            </pre>
          </div>

          <div className="mt-4 bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
            <p className="text-sm text-amber-200">
              <strong>Important:</strong> Replace <code className="bg-amber-500/20 px-1 rounded">accountId</code> with your Stripe Connect account ID,
              and <code className="bg-amber-500/20 px-1 rounded">customerId</code> with the currently logged-in user&apos;s Stripe customer ID.
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white">How It Works</h2>
          <div className="space-y-4 text-zinc-400">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-violet-500/10 text-violet-400 rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Detection</h3>
                <p>The SDK checks if the user has any failed payments (status: &quot;dunning&quot; or &quot;failed&quot;)</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-violet-500/10 text-violet-400 rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Blocking Modal</h3>
                <p>If detected, a non-dismissible modal appears immediately, blocking all app interaction</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-violet-500/10 text-violet-400 rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Update Flow</h3>
                <p>User clicks &quot;Update Payment Method&quot; and enters new card details</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-violet-500/10 text-violet-400 rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Auto-Recovery</h3>
                <p>Modal automatically disappears once payment succeeds. User regains full access.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Configuration Options */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white">Configuration Options</h2>
          
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-zinc-800">
                <tr>
                  <th className="text-left px-6 py-3 text-zinc-300 font-semibold">Option</th>
                  <th className="text-left px-6 py-3 text-zinc-300 font-semibold">Type</th>
                  <th className="text-left px-6 py-3 text-zinc-300 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                <tr>
                  <td className="px-6 py-4 font-mono text-violet-400">accountId</td>
                  <td className="px-6 py-4 text-zinc-400">string</td>
                  <td className="px-6 py-4 text-zinc-400">
                    <strong className="text-white">Required.</strong> Your Stripe Connect account ID
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-violet-400">customerId</td>
                  <td className="px-6 py-4 text-zinc-400">string</td>
                  <td className="px-6 py-4 text-zinc-400">
                    <strong className="text-white">Required.</strong> Current user&apos;s Stripe customer ID
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-violet-400">brandColor</td>
                  <td className="px-6 py-4 text-zinc-400">string</td>
                  <td className="px-6 py-4 text-zinc-400">
                    Button color (hex). Default: <code className="bg-zinc-800 px-1 rounded">#7c3aed</code>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-violet-400">checkInterval</td>
                  <td className="px-6 py-4 text-zinc-400">number</td>
                  <td className="px-6 py-4 text-zinc-400">
                    Check frequency in ms. Default: <code className="bg-zinc-800 px-1 rounded">60000</code> (1 minute)
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-violet-400">apiUrl</td>
                  <td className="px-6 py-4 text-zinc-400">string</td>
                  <td className="px-6 py-4 text-zinc-400">
                    API endpoint. Default: <code className="bg-zinc-800 px-1 rounded">https://revive-hq.com</code>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Framework Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white">Framework Examples</h2>

          {/* React/Next.js */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-zinc-200">React / Next.js</h3>
            <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800 overflow-x-auto">
              <pre className="text-sm text-zinc-300">
                <code>{`// app/layout.tsx or pages/_app.tsx
import { useEffect } from 'react';
import Script from 'next/script';

export default function Layout({ children }) {
  const user = useUser(); // Your auth hook

  useEffect(() => {
    if (window.RevivePaymentWall && user?.stripeCustomerId) {
      window.RevivePaymentWall.init({
        accountId: process.env.NEXT_PUBLIC_STRIPE_ACCOUNT_ID,
        customerId: user.stripeCustomerId,
      });
    }
  }, [user]);

  return (
    <>
      <Script
        src="https://revive-hq.com/revive-payment-wall.js"
        strategy="afterInteractive"
      />
      {children}
    </>
  );
}`}</code>
              </pre>
            </div>
          </div>

          {/* Vue.js */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-zinc-200">Vue.js</h3>
            <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800 overflow-x-auto">
              <pre className="text-sm text-zinc-300">
                <code>{`<!-- App.vue -->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    // Load SDK
    const script = document.createElement('script');
    script.src = 'https://revive-hq.com/revive-payment-wall.js';
    script.onload = () => {
      if (this.$store.state.user) {
        window.RevivePaymentWall.init({
          accountId: process.env.VUE_APP_STRIPE_ACCOUNT_ID,
          customerId: this.$store.state.user.stripeCustomerId,
        });
      }
    };
    document.head.appendChild(script);
  },
};
</script>`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Testing */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white">Testing</h2>
          <p className="text-zinc-400 mb-4">
            Test the payment wall without real failed payments:
          </p>
          
          <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
            <ol className="space-y-3 text-zinc-400 list-decimal list-inside">
              <li>Use Stripe test mode customer IDs (start with <code className="bg-zinc-800 px-1 rounded">cus_test_</code>)</li>
              <li>Trigger a test failed payment in Stripe Dashboard</li>
              <li>Refresh your app — the payment wall should appear</li>
              <li>
                Or use our{' '}
                <Link href="/demo/payment-wall" className="text-violet-400 hover:underline">
                  interactive demo →
                </Link>
              </li>
            </ol>
          </div>
        </section>

        {/* Performance Impact */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white">Performance Impact</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
              <div className="text-3xl font-bold text-violet-400 mb-2">~12 KB</div>
              <div className="text-sm text-zinc-400">Gzipped SDK size</div>
            </div>
            <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
              <div className="text-3xl font-bold text-violet-400 mb-2">&lt;100ms</div>
              <div className="text-sm text-zinc-400">Initial load time</div>
            </div>
            <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
              <div className="text-3xl font-bold text-violet-400 mb-2">~5 KB</div>
              <div className="text-sm text-zinc-400">API payload size</div>
            </div>
          </div>
        </section>

        {/* Support */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white">Need Help?</h2>
          <div className="bg-violet-500/10 border border-violet-500/20 rounded-lg p-6">
            <p className="text-zinc-300 mb-4">
              Having trouble integrating? We&apos;re here to help:
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:support@revive-hq.com"
                className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors"
              >
                Email Support
              </a>
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
              >
                View All Docs
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
