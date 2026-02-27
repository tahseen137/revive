import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Building Payment Recovery with Stripe Webhooks (Complete Guide 2026)",
  description:
    "Build a complete Stripe payment recovery system from scratch. Webhook setup, decline code routing, smart retry scheduling, and dunning email automation in Node.js.",
  keywords: [
    "stripe webhooks payment recovery",
    "stripe invoice payment failed",
    "stripe decline codes",
    "stripe payment retry logic",
    "subscription payment recovery",
    "stripe webhook handler",
    "stripe dunning automation",
  ],
  openGraph: {
    title: "Building Payment Recovery with Stripe Webhooks",
    description:
      "Complete guide: webhook setup, decline code routing, smart retry scheduling, and dunning automation in Node.js.",
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
                Developer Guide
              </div>
              <span className="text-sm text-zinc-500">February 27, 2026</span>
              <span className="text-zinc-600">·</span>
              <span className="text-sm text-zinc-500">15 min read</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
              Building Payment Recovery with Stripe Webhooks: A Complete Guide
            </h1>

            <p className="text-xl text-zinc-400 leading-relaxed">
              At $10K MRR, roughly $900/mo is disappearing because of failed payments. Cards expire, banks block charges, funds run low at the wrong moment. Most of that revenue is recoverable — here&apos;s how to build the system.
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-zinc max-w-none">
            <div className="text-zinc-300 space-y-6 leading-relaxed">

              <p>
                This guide covers building a complete payment recovery system using Stripe webhooks — from listening to the right events to implementing retry logic and dunning sequences. By the end, you&apos;ll have something that recovers 40-60% of failed payments automatically. Using Node.js throughout, but the concepts translate to any backend.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                The events that matter
              </h2>

              <p>Stripe fires dozens of webhook events. For payment recovery, you need these:</p>

              <pre className="bg-zinc-900 rounded-xl p-5 text-sm text-brand-400 overflow-x-auto my-6">
                <code>{`invoice.payment_failed         — subscription invoice failed
invoice.payment_action_required — 3DS authentication required
customer.subscription.deleted  — subscription canceled
customer.subscription.updated  — subscription status changed
charge.failed                  — one-time charge failed
payment_intent.payment_failed  — PaymentIntent failed`}</code>
              </pre>

              <p>
                The most important one is <code className="text-brand-400">invoice.payment_failed</code>. This fires every time Stripe tries and fails to charge a subscription invoice. That&apos;s your entry point.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Setting up the webhook endpoint
              </h2>

              <pre className="bg-zinc-900 rounded-xl p-5 text-sm text-zinc-300 overflow-x-auto my-6">
                <code>{`// webhooks/stripe.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(\`Webhook Error: \${err.message}\`);
  }

  try {
    await handleStripeEvent(event);
    res.json({ received: true });
  } catch (err) {
    // Return 200 even on app errors — avoid duplicate Stripe retries
    res.json({ received: true, warning: err.message });
  }
});`}</code>
              </pre>

              <p>
                Two things worth noting: <code className="text-brand-400">express.raw()</code> middleware is critical — signature verification requires the raw request body, not parsed JSON. And we return 200 even when app logic fails — if you return 500 on a database timeout, Stripe retries the webhook and you might process the same event twice.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                The payment failed handler
              </h2>

              <pre className="bg-zinc-900 rounded-xl p-5 text-sm text-zinc-300 overflow-x-auto my-6">
                <code>{`async function handlePaymentFailed(invoice) {
  const customerId = invoice.customer;
  const subscriptionId = invoice.subscription;
  
  // Get decline code from the payment intent
  const paymentIntent = invoice.payment_intent
    ? await stripe.paymentIntents.retrieve(invoice.payment_intent)
    : null;
    
  const declineCode = paymentIntent?.last_payment_error?.decline_code || 'unknown';
  const attemptCount = invoice.attempt_count || 1;
  
  // Route to the right recovery action
  const action = determineRecoveryAction(declineCode, attemptCount);
  
  switch (action.type) {
    case 'retry_soon':
      await scheduleRetry(invoice, customer, action.delayHours);
      break;
    case 'retry_later':
      await scheduleRetry(invoice, customer, action.delayHours);
      break;
    case 'send_email_only':
      await sendDunningEmail(customer, invoice, declineCode, attemptCount);
      break;
    case 'escalate':
      await sendFinalWarning(customer, invoice);
      break;
  }
}`}</code>
              </pre>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Decline code routing — the part most people skip
              </h2>

              <p>
                This is where recovery rates diverge. Treating all failures the same means treating "card expired" the same as "do not honor" — which are completely different situations.
              </p>

              <pre className="bg-zinc-900 rounded-xl p-5 text-sm text-zinc-300 overflow-x-auto my-6">
                <code>{`function determineRecoveryAction(declineCode, attemptCount) {
  if (attemptCount >= 4) return { type: 'escalate' };
  
  switch (declineCode) {
    // Soft declines — bank may have temporarily blocked
    case 'do_not_honor':
    case 'generic_decline':
    case 'transaction_not_allowed':
      // Retry after 4-6 hours (add jitter to avoid charge bursts)
      return { type: 'retry_soon', delayHours: 4 + Math.random() * 2 };
    
    // Insufficient funds — wait for payday
    case 'insufficient_funds':
    case 'withdrawal_count_limit_exceeded':
      return { 
        type: 'retry_later', 
        delayHours: attemptCount === 1 ? 72 : 168 
      };
    
    // Hard declines — need customer action, don't retry
    case 'expired_card':
    case 'lost_card':
    case 'stolen_card':
    case 'restricted_card':
      return { type: 'send_email_only' };
    
    // Unknown — try once more
    default:
      return { type: 'retry_soon', delayHours: attemptCount === 1 ? 6 : 48 };
  }
}`}</code>
              </pre>

              <p>
                The jitter on retry timing (<code className="text-brand-400">Math.random() * 2</code>) is intentional. If you have many customers on the same billing cycle, retrying all at exactly 4 hours creates a charge burst. Spread them out.
              </p>

              <div className="glass rounded-xl p-6 my-8 border-l-4 border-yellow-500/50">
                <p className="text-sm text-zinc-400 mb-2 font-medium uppercase tracking-wide">Decline Code Reference</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><code className="text-brand-400">expired_card</code><span className="text-zinc-300">Email with update link. Recovery: ~85%</span></div>
                  <div className="flex justify-between"><code className="text-brand-400">insufficient_funds</code><span className="text-zinc-300">Retry day 3 + day 7. Recovery: ~60%</span></div>
                  <div className="flex justify-between"><code className="text-brand-400">do_not_honor</code><span className="text-zinc-300">Retry in 4-6h. Recovery: ~45%</span></div>
                  <div className="flex justify-between"><code className="text-brand-400">lost_card / stolen_card</code><span className="text-zinc-300">Email only. Recovery: ~25%</span></div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Scheduling retries with BullMQ
              </h2>

              <pre className="bg-zinc-900 rounded-xl p-5 text-sm text-zinc-300 overflow-x-auto my-6">
                <code>{`const { Queue, Worker } = require('bullmq');

const retryQueue = new Queue('payment-retries', {
  connection: { host: 'localhost', port: 6379 }
});

async function scheduleRetry(invoice, customer, delayHours) {
  const delayMs = delayHours * 60 * 60 * 1000;
  
  await retryQueue.add('retry-payment', {
    invoiceId: invoice.id,
    customerId: customer.id,
    subscriptionId: invoice.subscription,
    attemptNumber: (invoice.attempt_count || 1) + 1,
  }, { delay: delayMs });
}

// Worker that processes retries
const retryWorker = new Worker('payment-retries', async (job) => {
  const { invoiceId } = job.data;
  
  try {
    const invoice = await stripe.invoices.pay(invoiceId, {
      forgive: false,
    });
    console.log(\`Payment succeeded on retry: \${invoiceId}\`);
  } catch (err) {
    // Stripe will fire invoice.payment_failed again — handled by webhook
    console.log(\`Retry failed: \${invoiceId} — \${err.message}\`);
  }
}, { connection: { host: 'localhost', port: 6379 } });`}</code>
              </pre>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Frictionless card update links
              </h2>

              <p>
                The biggest killer of recovery rates isn&apos;t the email — it&apos;s the update flow. If customers click your link and hit a login screen, 80%+ abandon. Stripe Checkout in setup mode generates a direct, secure card update URL with no login required:
              </p>

              <pre className="bg-zinc-900 rounded-xl p-5 text-sm text-zinc-300 overflow-x-auto my-6">
                <code>{`async function generateUpdateLink(customer) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'setup',
    customer: customer.stripeId,
    success_url: \`\${process.env.APP_URL}/billing/updated?session_id={CHECKOUT_SESSION_ID}\`,
    cancel_url: \`\${process.env.APP_URL}/billing\`,
  });
  
  return session.url; // Direct link — no login required
}`}</code>
              </pre>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Dunning email sequence
              </h2>

              <pre className="bg-zinc-900 rounded-xl p-5 text-sm text-zinc-300 overflow-x-auto my-6">
                <code>{`async function sendDunningEmail(customer, invoice, declineCode, attemptCount) {
  const updateLink = await generateUpdateLink(customer);
  
  // Choose template based on decline reason and attempt count
  const template = selectTemplate(declineCode, attemptCount);
  
  await email.send({
    to: customer.email,
    from: 'support@yourapp.com', // Real address — enable replies
    subject: template.subject,
    html: template.render({
      firstName: customer.firstName,
      productName: 'Your App',
      updateLink,
      lastFour: customer.cardLast4,
    }),
  });
}

function selectTemplate(declineCode, attemptCount) {
  if (declineCode === 'expired_card') return templates.expiredCard;
  if (declineCode === 'insufficient_funds') return templates.insufficientFunds;
  if (attemptCount >= 3) return templates.finalWarning;
  if (attemptCount === 1) return templates.softAlert;
  return templates.followUp;
}`}</code>
              </pre>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Handling subscription recovery after payment
              </h2>

              <pre className="bg-zinc-900 rounded-xl p-5 text-sm text-zinc-300 overflow-x-auto my-6">
                <code>{`async function handlePaymentSucceeded(invoice) {
  const customerId = invoice.customer;
  const subscriptionId = invoice.subscription;
  
  // Update database
  await db.failedPayments.update({
    stripeInvoiceId: invoice.id,
    status: 'recovered',
    recoveredAt: new Date(),
  });
  
  // Restore access if suspended
  await db.subscriptions.update({
    stripeId: subscriptionId,
    status: 'active',
    accessSuspended: false,
  });
  
  // Cancel any pending retry jobs
  await cancelPendingRetries(invoice.id);
  
  // Optional: send a "your account is back" email
  const customer = await db.customers.findByStripeId(customerId);
  if (customer) {
    await email.send({
      to: customer.email,
      subject: 'Payment sorted — your account is fully active',
      template: 'payment-recovered',
    });
  }
}`}</code>
              </pre>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Testing your webhook locally
              </h2>

              <p>Use the Stripe CLI to forward events to your local server:</p>

              <pre className="bg-zinc-900 rounded-xl p-5 text-sm text-brand-400 overflow-x-auto my-6">
                <code>{`# Install and login
stripe login

# Forward events to local server
stripe listen --forward-to localhost:3000/webhooks/stripe

# Trigger a test event
stripe trigger invoice.payment_failed`}</code>
              </pre>

              <p>
                The CLI outputs a webhook signing secret (<code className="text-brand-400">whsec_...</code>) — use that as <code className="text-brand-400">STRIPE_WEBHOOK_SECRET</code> in your local <code>.env</code>.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                What to monitor in production
              </h2>

              <ul className="space-y-3 ml-6 list-disc text-zinc-300">
                <li><strong className="text-white">Webhook delivery rate</strong> — check Stripe dashboard for failed deliveries</li>
                <li><strong className="text-white">Recovery rate by decline code</strong> — expired_card should be 70%+; do_not_honor 40-50%</li>
                <li><strong className="text-white">Retry queue depth</strong> — large queue means retries are backing up</li>
                <li><strong className="text-white">Time to recovery</strong> — median should be under 5 days</li>
                <li><strong className="text-white">Dunning email open rates</strong> — first email should be 65%+; below that means delivery issues</li>
              </ul>

              <div className="glass rounded-xl p-6 my-8 border-l-4 border-brand-500">
                <p className="text-sm text-zinc-400 mb-2 font-medium uppercase tracking-wide">Recovery Rate Targets</p>
                <p className="text-zinc-300 text-sm">
                  With this system fully implemented: <strong className="text-white">expired_card 75-85%</strong>, <strong className="text-white">insufficient_funds 50-60%</strong>, <strong className="text-white">generic/soft declines 40-50%</strong>, <strong className="text-white">overall 55-65%</strong>.
                </p>
                <p className="text-zinc-400 text-sm mt-2">
                  Without dedicated recovery: 25-35% overall. The delta compounds fast at higher MRR.
                </p>
              </div>

              <div className="mt-10 p-6 rounded-xl bg-brand-500/10 border border-brand-500/20">
                <p className="text-white font-semibold mb-2">Rather not build this yourself?</p>
                <p className="text-zinc-400 text-sm mb-4">
                  Revive handles all of this — webhook processing, decline routing, retry scheduling, dunning sequences, and frictionless update flows — for $49/mo. Connect Stripe in 3 minutes, no code required.
                </p>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-500 text-white text-sm font-medium hover:bg-brand-400 transition-colors"
                >
                  Try Revive instead →
                </Link>
              </div>

              <p className="text-sm text-zinc-500 mt-8">
                Related reading:{" "}
                <Link href="/blog/stripe-payment-failure-codes-explained" className="text-brand-400 hover:text-brand-300">
                  Stripe Payment Failure Codes Explained
                </Link>
                {" · "}
                <Link href="/blog/dunning-email-templates-7" className="text-brand-400 hover:text-brand-300">
                  7 Dunning Email Templates
                </Link>
                {" · "}
                <Link href="/blog/saas-churn-metrics-2026" className="text-brand-400 hover:text-brand-300">
                  SaaS Churn Metrics That Actually Matter
                </Link>
              </p>

              <div className="mt-8 pt-8 border-t border-zinc-800">
                <p className="text-sm text-zinc-500">
                  <strong className="text-zinc-400">About Revive:</strong> Payment recovery automation for SaaS. Smart retries, dunning emails, and win-back campaigns. $49/mo flat, no revenue share.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-zinc-800">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
