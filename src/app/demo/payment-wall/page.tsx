'use client';

/**
 * Payment Wall Demo Page
 * Interactive demo of the Failed Payment Wall feature
 */

import { useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';

export default function PaymentWallDemoPage() {
  const [isShowing, setIsShowing] = useState(false);
  const [mockStatus, setMockStatus] = useState<'no-issue' | 'dunning' | 'failed'>('no-issue');

  const showMockWall = (status: 'dunning' | 'failed') => {
    setMockStatus(status);
    setIsShowing(true);

    // Create mock payment data
    const mockPayment = {
      id: 'demo_payment_123',
      amount: status === 'dunning' ? 4900 : 9900,
      currency: 'usd',
      status: status,
      failureReason: 'Generic Decline',
      failureCode: status === 'dunning' ? 'insufficient_funds' : 'card_declined',
      customerEmail: 'demo@example.com',
      createdAt: Date.now(),
    };

    const updateUrl = '/update-card/demo-token';

    // Manually trigger the wall (bypassing API call for demo)
    if (window.RevivePaymentWall) {
      window.RevivePaymentWall.showWall(mockPayment, updateUrl);
    }
  };

  const hideMockWall = () => {
    setIsShowing(false);
    setMockStatus('no-issue');
    if (window.RevivePaymentWall) {
      window.RevivePaymentWall.hideWall();
    }
  };

  return (
    <>
      <Script
        src="/revive-payment-wall.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Revive Payment Wall SDK loaded');
        }}
      />

      <div className="min-h-screen bg-[#09090b] text-zinc-100">
        {/* Navigation */}
        <nav className="border-b border-zinc-800 bg-[#09090b]/50 backdrop-blur-xl sticky top-0 z-40">
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
                href="/docs/payment-wall"
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Integration Guide →
              </Link>
            </div>
          </div>
        </nav>

        {/* Content */}
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              Payment Wall Demo
            </h1>
            <p className="text-xl text-zinc-400">
              See how the Failed Payment Wall blocks app access when payment fails
            </p>
          </header>

          {/* Stats Banner */}
          <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-2xl p-6 mb-12">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-violet-400 mb-1">4-12%</div>
                <div className="text-sm text-zinc-400">Additional Recovery</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-violet-400 mb-1">100%</div>
                <div className="text-sm text-zinc-400">Attention Capture</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-violet-400 mb-1">&lt;5s</div>
                <div className="text-sm text-zinc-400">Time to Action</div>
              </div>
            </div>
          </div>

          {/* Demo Controls */}
          <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-white">Try It Yourself</h2>
            <p className="text-zinc-400 mb-6">
              Click a button below to simulate different payment failure scenarios:
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              {/* No Issue */}
              <button
                onClick={hideMockWall}
                disabled={mockStatus === 'no-issue'}
                className={`p-6 rounded-xl border-2 transition-all ${
                  mockStatus === 'no-issue'
                    ? 'border-emerald-500/50 bg-emerald-500/10'
                    : 'border-zinc-700 hover:border-zinc-600 bg-zinc-800/50'
                }`}
              >
                <div className="text-4xl mb-3">✅</div>
                <h3 className="font-semibold text-white mb-2">No Issues</h3>
                <p className="text-sm text-zinc-400">Payment successful</p>
              </button>

              {/* Dunning */}
              <button
                onClick={() => showMockWall('dunning')}
                disabled={isShowing && mockStatus === 'dunning'}
                className={`p-6 rounded-xl border-2 transition-all ${
                  mockStatus === 'dunning' && isShowing
                    ? 'border-orange-500/50 bg-orange-500/10'
                    : 'border-zinc-700 hover:border-zinc-600 bg-zinc-800/50'
                }`}
              >
                <div className="text-4xl mb-3">📧</div>
                <h3 className="font-semibold text-white mb-2">Dunning</h3>
                <p className="text-sm text-zinc-400">$49 payment failed</p>
              </button>

              {/* Failed */}
              <button
                onClick={() => showMockWall('failed')}
                disabled={isShowing && mockStatus === 'failed'}
                className={`p-6 rounded-xl border-2 transition-all ${
                  mockStatus === 'failed' && isShowing
                    ? 'border-red-500/50 bg-red-500/10'
                    : 'border-zinc-700 hover:border-zinc-600 bg-zinc-800/50'
                }`}
              >
                <div className="text-4xl mb-3">❌</div>
                <h3 className="font-semibold text-white mb-2">Failed</h3>
                <p className="text-sm text-zinc-400">$99 payment failed</p>
              </button>
            </div>

            {isShowing && (
              <div className="mt-6 p-4 bg-violet-500/10 border border-violet-500/20 rounded-lg">
                <p className="text-sm text-violet-200">
                  💡 <strong>Tip:</strong> The payment wall is now blocking this page. Try interacting with anything — you can&apos;t! 
                  Click &quot;No Issues&quot; to dismiss it.
                </p>
              </div>
            )}
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
              <div className="w-12 h-12 bg-violet-500/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Non-Dismissible</h3>
              <p className="text-zinc-400 text-sm">
                Can&apos;t be closed or bypassed until payment is updated. Forces immediate action.
              </p>
            </div>

            <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
              <div className="w-12 h-12 bg-violet-500/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Real-Time Detection</h3>
              <p className="text-zinc-400 text-sm">
                Checks payment status every 60 seconds. Appears instantly when payment fails.
              </p>
            </div>

            <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
              <div className="w-12 h-12 bg-violet-500/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Fully Customizable</h3>
              <p className="text-zinc-400 text-sm">
                Match your brand colors, customize messaging, adjust check frequency.
              </p>
            </div>

            <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
              <div className="w-12 h-12 bg-violet-500/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Secure & Lightweight</h3>
              <p className="text-zinc-400 text-sm">
                Only 12KB gzipped. Uses your existing Stripe infrastructure. No PCI burden.
              </p>
            </div>
          </div>

          {/* Implementation Guide CTA */}
          <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Ready to Recover 4-12% More Revenue?
            </h2>
            <p className="text-violet-100 mb-6">
              Install the Payment Wall in under 5 minutes
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/docs/payment-wall"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-violet-600 font-semibold rounded-xl hover:bg-zinc-100 transition-colors"
              >
                View Integration Guide
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-violet-700 text-white font-semibold rounded-xl hover:bg-violet-800 transition-colors border border-violet-500"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

// Type declaration for window.RevivePaymentWall
declare global {
  interface Window {
    RevivePaymentWall?: {
      showWall: (payment: unknown, updateUrl: string) => void;
      hideWall: () => void;
      init: (config: unknown) => void;
    };
  }
}
