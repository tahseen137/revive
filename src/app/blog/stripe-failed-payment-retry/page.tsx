import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Stripe Failed Payment Retry: Complete Technical Guide (2026)",
  description:
    "Master Stripe's payment retry system: how default retries work, decline codes, smart schedules, webhooks, and how to build custom retry logic that recovers 94% of failed payments.",
  keywords: [
    "stripe failed payment retry",
    "stripe retry logic",
    "stripe payment failures",
    "stripe decline codes",
    "stripe dunning management",
    "stripe subscription retries",
  ],
  openGraph: {
    title: "Stripe Failed Payment Retry: Complete Technical Guide",
    description:
      "Everything you need to know about Stripe's payment retry system and how to optimize it for maximum recovery.",
  },
};

export default function BlogPost() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <article className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="mx-auto max-w-3xl px-6">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-medium">
                Technical Guide
              </div>
              <span className="text-sm text-zinc-500">February 5, 2026</span>
              <span className="text-zinc-600">·</span>
              <span className="text-sm text-zinc-500">14 min read</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
              Stripe Failed Payment Retry: Complete Technical Guide
            </h1>

            <p className="text-xl text-zinc-400 leading-relaxed">
              Stripe's default retry logic recovers only 30% of failed payments. This technical guide shows you how Stripe retries work, what's missing, and how to build smarter retry logic that recovers 94%.
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-zinc max-w-none">
            <div className="text-zinc-300 space-y-6 leading-relaxed">
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                How Stripe's Default Retry Logic Works
              </h2>

              <p>
                When a subscription payment fails in Stripe, the platform automatically attempts to retry the charge. Here's what happens:
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                Stripe's Default Retry Schedule
              </h3>

              <div className="glass rounded-xl p-6 my-6">
                <p className="text-sm text-zinc-400 mb-4 font-medium uppercase tracking-wide">Default Retry Timeline</p>
                <ul className="space-y-2 text-sm text-zinc-300">
                  <li><strong className="text-white">Day 0:</strong> Initial charge fails</li>
                  <li><strong className="text-white">Day 3:</strong> First retry attempt</li>
                  <li><strong className="text-white">Day 5:</strong> Second retry attempt</li>
                  <li><strong className="text-white">Day 7:</strong> Third retry attempt</li>
                  <li><strong className="text-white">Day 7+ (if all fail):</strong> Subscription marked as <code className="text-brand-400">past_due</code> or <code className="text-brand-400">unpaid</code></li>
                </ul>
                <p className="text-xs text-zinc-500 mt-4">
                  Note: You can configure this schedule in Stripe Dashboard → Settings → Billing → Subscriptions and emails.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                What Happens During a Retry
              </h3>

              <ol className="space-y-3 ml-6 text-zinc-300">
                <li>
                  <strong className="text-white">1. Payment attempt:</strong> Stripe attempts to charge the same card that failed previously
                </li>
                <li>
                  <strong className="text-white">2. Webhook fired:</strong> <code className="text-brand-400 bg-zinc-800 px-2 py-0.5 rounded">invoice.payment_action_required</code> or <code className="text-brand-400 bg-zinc-800 px-2 py-0.5 rounded">invoice.payment_failed</code>
                </li>
                <li>
                  <strong className="text-white">3. Email sent (optional):</strong> Stripe can email customers about the failure
                </li>
                <li>
                  <strong className="text-white">4. Subscription state updated:</strong> Remains <code className="text-brand-400 bg-zinc-800 px-2 py-0.5 rounded">past_due</code> if retry fails
                </li>
              </ol>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                The Problem with Stripe's Default Retries
              </h3>

              <p>
                Stripe's one-size-fits-all approach has major limitations:
              </p>

              <div className="glass rounded-xl p-6 my-8 border-l-4 border-yellow-500">
                <ul className="space-y-3 text-sm text-zinc-300">
                  <li>
                    ❌ <strong className="text-white">Ignores decline codes:</strong> Retries expired cards the same way as insufficient funds (even though expired cards will never succeed)
                  </li>
                  <li>
                    ❌ <strong className="text-white">Fixed schedule:</strong> Doesn't adapt to customer behavior (payday, billing cycles)
                  </li>
                  <li>
                    ❌ <strong className="text-white">Limited attempts:</strong> Only 3-4 retries before giving up
                  </li>
                  <li>
                    ❌ <strong className="text-white">No smart timing:</strong> Retries at the same time of day regardless of when the customer is likely to have funds
                  </li>
                  <li>
                    ❌ <strong className="text-white">Poor recovery rate:</strong> Only 30-40% of failed payments are recovered
                  </li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Understanding Stripe Decline Codes
              </h2>

              <p>
                When a payment fails, Stripe returns a <strong className="text-white">decline code</strong> that explains <em>why</em>. This is your roadmap for building smarter retry logic.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                Common Decline Codes & What They Mean
              </h3>

              <div className="glass rounded-xl p-6 my-6 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-800">
                      <th className="text-left py-3 text-zinc-400 font-medium">Decline Code</th>
                      <th className="text-left py-3 text-zinc-400 font-medium">Meaning</th>
                      <th className="text-left py-3 text-zinc-400 font-medium">Should Retry?</th>
                      <th className="text-left py-3 text-zinc-400 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-zinc-300">
                    <tr className="border-b border-zinc-800/50">
                      <td className="py-3"><code className="text-brand-400">card_declined</code></td>
                      <td className="py-3">Generic bank decline</td>
                      <td className="py-3 text-green-400">Yes</td>
                      <td className="py-3">Retry in 4h → 24h → 3d</td>
                    </tr>
                    <tr className="border-b border-zinc-800/50">
                      <td className="py-3"><code className="text-brand-400">insufficient_funds</code></td>
                      <td className="py-3">Not enough money in account</td>
                      <td className="py-3 text-green-400">Yes</td>
                      <td className="py-3">Retry after payday (3-7d)</td>
                    </tr>
                    <tr className="border-b border-zinc-800/50">
                      <td className="py-3"><code className="text-brand-400">expired_card</code></td>
                      <td className="py-3">Card expiration date passed</td>
                      <td className="py-3 text-red-400">No</td>
                      <td className="py-3">Email customer immediately</td>
                    </tr>
                    <tr className="border-b border-zinc-800/50">
                      <td className="py-3"><code className="text-brand-400">incorrect_cvc</code></td>
                      <td className="py-3">CVC code is wrong</td>
                      <td className="py-3 text-red-400">No</td>
                      <td className="py-3">Email customer immediately</td>
                    </tr>
                    <tr className="border-b border-zinc-800/50">
                      <td className="py-3"><code className="text-brand-400">processing_error</code></td>
                      <td className="py-3">Network/technical issue</td>
                      <td className="py-3 text-green-400">Yes</td>
                      <td className="py-3">Retry quickly (1h → 4h → 24h)</td>
                    </tr>
                    <tr className="border-b border-zinc-800/50">
                      <td className="py-3"><code className="text-brand-400">do_not_honor</code></td>
                      <td className="py-3">Bank blocked the charge</td>
                      <td className="py-3 text-yellow-400">Maybe</td>
                      <td className="py-3">Retry once in 24h, then email</td>
                    </tr>
                    <tr className="border-b border-zinc-800/50">
                      <td className="py-3"><code className="text-brand-400">card_velocity_exceeded</code></td>
                      <td className="py-3">Too many charges too fast</td>
                      <td className="py-3 text-yellow-400">Yes, slowly</td>
                      <td className="py-3">Wait 7d before retrying</td>
                    </tr>
                    <tr>
                      <td className="py-3"><code className="text-brand-400">lost_card / stolen_card</code></td>
                      <td className="py-3">Customer reported card lost/stolen</td>
                      <td className="py-3 text-red-400">No</td>
                      <td className="py-3">Email customer for new card</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                How to Access Decline Codes
              </h3>

              <p>
                In the Stripe API, decline codes are returned in the <code className="text-brand-400 bg-zinc-800 px-2 py-0.5 rounded">charge</code> object:
              </p>

              <div className="glass rounded-xl p-6 my-6 bg-zinc-900/50">
                <pre className="text-xs text-zinc-300 overflow-x-auto">
{`{
  "id": "ch_3ABC...",
  "object": "charge",
  "status": "failed",
  "failure_code": "insufficient_funds",
  "failure_message": "Your card has insufficient funds.",
  "outcome": {
    "type": "issuer_declined",
    "reason": "insufficient_funds"
  }
}`}
                </pre>
              </div>

              <p>
                You can also view decline codes in the Stripe Dashboard → Payments → [Failed Payment] → "Decline reason".
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Building Smart Retry Logic
              </h2>

              <p>
                To recover 85-94% of failed payments (vs Stripe's 30%), you need <strong className="text-white">decline code-aware retry logic</strong>.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                Smart Retry Schedule by Decline Code
              </h3>

              <div className="glass rounded-xl p-6 my-6">
                <h4 className="text-white font-semibold mb-3">For <code className="text-brand-400">insufficient_funds</code>:</h4>
                <ul className="space-y-1 text-sm text-zinc-300 ml-6">
                  <li>1st retry: <strong>3 days</strong> (wait for payday)</li>
                  <li>2nd retry: <strong>7 days</strong> (biweekly paycheck)</li>
                  <li>3rd retry: <strong>14 days</strong> (monthly billing cycle)</li>
                  <li>4th retry: <strong>30 days</strong> (last chance before cancellation)</li>
                </ul>
                <p className="text-xs text-zinc-500 mt-3">
                  <strong>Why it works:</strong> Aligns retries with when customers are likely to have funds
                </p>
              </div>

              <div className="glass rounded-xl p-6 my-6">
                <h4 className="text-white font-semibold mb-3">For <code className="text-brand-400">card_declined</code> (generic):</h4>
                <ul className="space-y-1 text-sm text-zinc-300 ml-6">
                  <li>1st retry: <strong>4 hours</strong> (might be daily limit issue)</li>
                  <li>2nd retry: <strong>24 hours</strong> (next day, new limit)</li>
                  <li>3rd retry: <strong>3 days</strong></li>
                  <li>4th retry: <strong>7 days</strong></li>
                </ul>
                <p className="text-xs text-zinc-500 mt-3">
                  <strong>Why it works:</strong> Catches temporary bank limits and customer actions
                </p>
              </div>

              <div className="glass rounded-xl p-6 my-6">
                <h4 className="text-white font-semibold mb-3">For <code className="text-brand-400">processing_error</code>:</h4>
                <ul className="space-y-1 text-sm text-zinc-300 ml-6">
                  <li>1st retry: <strong>1 hour</strong> (technical issue likely resolved)</li>
                  <li>2nd retry: <strong>4 hours</strong></li>
                  <li>3rd retry: <strong>24 hours</strong></li>
                  <li>4th retry: <strong>3 days</strong></li>
                </ul>
                <p className="text-xs text-zinc-500 mt-3">
                  <strong>Why it works:</strong> Technical errors usually resolve quickly
                </p>
              </div>

              <div className="glass rounded-xl p-6 my-6">
                <h4 className="text-white font-semibold mb-3">For <code className="text-brand-400">expired_card</code> / <code className="text-brand-400">incorrect_cvc</code>:</h4>
                <p className="text-sm text-zinc-300 mb-2">
                  <strong className="text-red-400">DO NOT RETRY.</strong> Send dunning email immediately with card update link.
                </p>
                <p className="text-xs text-zinc-500">
                  <strong>Why:</strong> No amount of retrying will succeed — customer must update their card
                </p>
              </div>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                Implementation Options
              </h3>

              <p>
                You have three options for implementing smart retries:
              </p>

              <h4 className="text-lg font-semibold text-white mt-6 mb-2">
                Option 1: Configure Stripe's Retry Rules
              </h4>

              <p>
                In Stripe Dashboard → Settings → Billing → Subscriptions and emails, you can customize:
              </p>

              <ul className="space-y-2 ml-6 text-sm text-zinc-400">
                <li>• Number of retry attempts (1-4)</li>
                <li>• Days between retries</li>
                <li>• Email notifications to customers</li>
              </ul>

              <p className="text-sm mt-3">
                <strong className="text-white">Pros:</strong> Easy, no code required<br />
                <strong className="text-white">Cons:</strong> Still one-size-fits-all, doesn't adapt to decline codes
              </p>

              <h4 className="text-lg font-semibold text-white mt-6 mb-2">
                Option 2: Build Custom Retry Logic with Webhooks
              </h4>

              <p>
                Listen to Stripe webhooks and trigger manual retries based on decline codes:
              </p>

              <div className="glass rounded-xl p-6 my-6 bg-zinc-900/50">
                <pre className="text-xs text-zinc-300 overflow-x-auto">
{`// Example: Node.js webhook handler
app.post('/stripe-webhook', async (req, res) => {
  const event = req.body;
  
  if (event.type === 'invoice.payment_failed') {
    const invoice = event.data.object;
    const charge = invoice.charge;
    const declineCode = charge.failure_code;
    
    // Smart retry logic
    if (declineCode === 'insufficient_funds') {
      scheduleRetry(invoice.id, 3 * 24 * 60 * 60 * 1000); // 3 days
    } else if (declineCode === 'card_declined') {
      scheduleRetry(invoice.id, 4 * 60 * 60 * 1000); // 4 hours
    } else if (declineCode === 'expired_card') {
      sendDunningEmail(invoice.customer);
    }
  }
  
  res.status(200).send('OK');
});`}
                </pre>
              </div>

              <p className="text-sm mt-3">
                <strong className="text-white">Pros:</strong> Full control, adapts to decline codes<br />
                <strong className="text-white">Cons:</strong> Requires development time, ongoing maintenance
              </p>

              <h4 className="text-lg font-semibold text-white mt-6 mb-2">
                Option 3: Use a Payment Recovery Tool (Like Revive)
              </h4>

              <p>
                Tools like Revive handle smart retries automatically:
              </p>

              <ul className="space-y-2 ml-6 text-sm text-zinc-400">
                <li>✅ Decline code-aware retry schedules</li>
                <li>✅ Automated dunning emails</li>
                <li>✅ Real-time recovery analytics</li>
                <li>✅ No code required</li>
              </ul>

              <p className="text-sm mt-3">
                <strong className="text-white">Pros:</strong> Zero setup, 85-94% recovery rate, no engineering time<br />
                <strong className="text-white">Cons:</strong> Monthly cost (but ROI is typically 10-50x)
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Webhook Events You Need to Track
              </h2>

              <p>
                If you're building custom retry logic, listen to these Stripe webhook events:
              </p>

              <div className="glass rounded-xl p-6 my-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-800">
                      <th className="text-left py-3 text-zinc-400 font-medium">Event</th>
                      <th className="text-left py-3 text-zinc-400 font-medium">When It Fires</th>
                      <th className="text-left py-3 text-zinc-400 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-zinc-300">
                    <tr className="border-b border-zinc-800/50">
                      <td className="py-3"><code className="text-brand-400">invoice.payment_failed</code></td>
                      <td className="py-3">Payment attempt failed</td>
                      <td className="py-3">Schedule smart retry based on decline code</td>
                    </tr>
                    <tr className="border-b border-zinc-800/50">
                      <td className="py-3"><code className="text-brand-400">invoice.payment_succeeded</code></td>
                      <td className="py-3">Payment succeeded (after retry)</td>
                      <td className="py-3">Mark as recovered, stop retry loop</td>
                    </tr>
                    <tr className="border-b border-zinc-800/50">
                      <td className="py-3"><code className="text-brand-400">customer.subscription.updated</code></td>
                      <td className="py-3">Subscription status changed</td>
                      <td className="py-3">Track if moved to <code className="text-brand-400">past_due</code></td>
                    </tr>
                    <tr>
                      <td className="py-3"><code className="text-brand-400">charge.failed</code></td>
                      <td className="py-3">Individual charge failed</td>
                      <td className="py-3">Extract decline code for analysis</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                Example Webhook Payload
              </h3>

              <div className="glass rounded-xl p-6 my-6 bg-zinc-900/50">
                <pre className="text-xs text-zinc-300 overflow-x-auto">
{`{
  "type": "invoice.payment_failed",
  "data": {
    "object": {
      "id": "in_1ABC...",
      "customer": "cus_XYZ...",
      "subscription": "sub_123...",
      "amount_due": 2900,
      "attempt_count": 1,
      "charge": {
        "id": "ch_3DEF...",
        "failure_code": "insufficient_funds",
        "failure_message": "Your card has insufficient funds."
      }
    }
  }
}`}
                </pre>
              </div>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Advanced Strategies
              </h2>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                1. Vary Retry Time of Day
              </h3>

              <p>
                A charge that fails at 2 AM might succeed at 10 AM (when banks are more lenient with daily limits). Spread retries across different times:
              </p>

              <ul className="space-y-2 ml-6 text-sm">
                <li className="text-zinc-400">1st retry: 10 AM (morning when balances are higher)</li>
                <li className="text-zinc-400">2nd retry: 2 PM (afternoon)</li>
                <li className="text-zinc-400">3rd retry: 8 PM (evening after work hours)</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                2. Enable Stripe's Network Tokens
              </h3>

              <p>
                Network tokens automatically update expired card details and increase authorization rates. Enable in Stripe Dashboard → Settings → Payments → Network tokens.
              </p>

              <p>
                <strong className="text-white">Impact:</strong> Reduces expired card failures by 50%+
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                3. Use Card Account Updater
              </h3>

              <p>
                Visa and Mastercard automatically provide new card details when cards expire. Enable in Stripe Dashboard → Settings → Billing → Card account updater.
              </p>

              <p>
                <strong className="text-white">Impact:</strong> Reduces expired card failures by 30-40%
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                4. Retry with Backup Payment Methods
              </h3>

              <p>
                If you've collected multiple payment methods from customers, try the backup method when the primary fails:
              </p>

              <div className="glass rounded-xl p-6 my-6 bg-zinc-900/50">
                <pre className="text-xs text-zinc-300 overflow-x-auto">
{`// After primary card fails
if (customer.backup_payment_method) {
  stripe.invoices.pay(invoice.id, {
    payment_method: customer.backup_payment_method
  });
}`}
                </pre>
              </div>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Dunning Management with Stripe
              </h2>

              <p>
                Payment retries alone won't recover expired cards or persistent failures. You need <strong className="text-white">dunning emails</strong> to prompt customer action.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                Stripe's Built-In Dunning Emails
              </h3>

              <p>
                Stripe can send automatic emails when payments fail. Configure in Dashboard → Settings → Billing → Emails:
              </p>

              <ul className="space-y-2 ml-6 text-sm">
                <li className="text-zinc-400">✅ Payment failed notification</li>
                <li className="text-zinc-400">✅ Upcoming invoice reminders</li>
                <li className="text-zinc-400">✅ Subscription canceled notification</li>
              </ul>

              <p>
                <strong className="text-white">Limitation:</strong> Stripe's emails are generic and not customizable. They have low open rates (~13%) and poor conversion.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                Custom Dunning Emails (Better Approach)
              </h3>

              <p>
                Disable Stripe's default emails and send your own branded emails:
              </p>

              <ol className="space-y-3 ml-6 text-sm text-zinc-300">
                <li>
                  <strong className="text-white">1. Disable Stripe emails:</strong> Dashboard → Settings → Billing → Emails → Turn off
                </li>
                <li>
                  <strong className="text-white">2. Listen to webhooks:</strong> <code className="text-brand-400">invoice.payment_failed</code>
                </li>
                <li>
                  <strong className="text-white">3. Generate card update link:</strong> Use Stripe Checkout in <code className="text-brand-400">setup</code> mode
                </li>
                <li>
                  <strong className="text-white">4. Send branded email:</strong> Via SendGrid, Postmark, etc.
                </li>
              </ol>

              <div className="glass rounded-xl p-6 my-6 bg-zinc-900/50">
                <pre className="text-xs text-zinc-300 overflow-x-auto">
{`// Generate card update link
const session = await stripe.checkout.sessions.create({
  mode: 'setup',
  customer: 'cus_ABC...',
  success_url: 'https://yourapp.com/billing/success',
  cancel_url: 'https://yourapp.com/billing'
});

// session.url is the one-click card update link
sendEmail({
  to: customer.email,
  subject: 'Payment update needed',
  body: \`Click here to update: \${session.url}\`
});`}
                </pre>
              </div>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Monitoring & Analytics
              </h2>

              <p>
                Track these metrics to optimize your retry strategy:
              </p>

              <div className="glass rounded-xl p-6 my-6">
                <ul className="space-y-3 text-sm text-zinc-300">
                  <li>
                    <strong className="text-white">Payment Failure Rate:</strong><br />
                    <code className="text-xs text-brand-400">(Failed payments / Total payments) × 100</code><br />
                    <span className="text-xs text-zinc-500">Benchmark: 7-11% is average</span>
                  </li>
                  <li>
                    <strong className="text-white">Recovery Rate:</strong><br />
                    <code className="text-xs text-brand-400">(Recovered payments / Failed payments) × 100</code><br />
                    <span className="text-xs text-zinc-500">Benchmark: 85-94% with smart retries</span>
                  </li>
                  <li>
                    <strong className="text-white">Average Time to Recovery:</strong><br />
                    <code className="text-xs text-brand-400">Days from failure to successful charge</code><br />
                    <span className="text-xs text-zinc-500">Benchmark: &lt;7 days is ideal</span>
                  </li>
                  <li>
                    <strong className="text-white">Recovery by Decline Code:</strong><br />
                    <span className="text-xs text-zinc-500">Which decline codes have the best/worst recovery rates?</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                Where to View Metrics in Stripe
              </h3>

              <ul className="space-y-2 ml-6 text-sm">
                <li className="text-zinc-400">
                  <strong className="text-zinc-300">Failed payments:</strong> Dashboard → Payments → Filter by "Failed"
                </li>
                <li className="text-zinc-400">
                  <strong className="text-zinc-300">Decline codes:</strong> Click on any failed payment → "Decline reason"
                </li>
                <li className="text-zinc-400">
                  <strong className="text-zinc-300">Recovery trends:</strong> Dashboard → Analytics → Payment retries (if available)
                </li>
              </ul>

              <div className="glass rounded-xl p-8 my-12 text-center border-l-4 border-brand-500">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Skip the Engineering Work
                </h3>
                <p className="text-zinc-400 mb-6">
                  Revive implements smart, decline code-aware retries and dunning emails for Stripe automatically. Connect your account in 3 minutes and start recovering 85-94% of failed payments.
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-8 py-4 rounded-xl transition-all"
                >
                  Try Revive Free
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <p className="text-xs text-zinc-500 mt-4">
                  14-day free trial • No credit card required
                </p>
              </div>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Key Takeaways
              </h2>

              <ul className="space-y-2 ml-6 text-zinc-300">
                <li>💡 Stripe's default retry logic recovers only 30% of failed payments</li>
                <li>💡 Decline codes tell you WHY a payment failed — use them to build smarter retries</li>
                <li>💡 Expired cards should never be retried — send dunning emails immediately</li>
                <li>💡 Insufficient funds needs 3-7 day delays to align with payday</li>
                <li>💡 Custom retry logic via webhooks can increase recovery to 85-94%</li>
                <li>💡 Enable Card Account Updater and Network Tokens to prevent failures</li>
                <li>💡 Track recovery rate by decline code to optimize your strategy</li>
              </ul>

              <p className="mt-8">
                The bottom line: <strong className="text-white">Stripe's default retries are a good starting point, but not optimized for maximum recovery</strong>. By understanding decline codes and implementing smart retry logic, you can recover 3x more failed payments and save thousands in MRR every month.
              </p>

              <div className="mt-12 pt-8 border-t border-zinc-800">
                <p className="text-sm text-zinc-500">
                  <strong className="text-zinc-400">About Revive:</strong> We build decline code-aware retry logic and automated dunning for Stripe — so you get 85-94% recovery rates without writing any code. Connect your Stripe account in one click and start recovering revenue today.
                </p>
              </div>
            </div>
          </div>

          {/* Back to blog link */}
          <div className="mt-12 pt-8 border-t border-zinc-800">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to blog
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
