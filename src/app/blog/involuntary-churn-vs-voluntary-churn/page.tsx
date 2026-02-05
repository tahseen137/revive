import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Involuntary Churn vs Voluntary Churn: Differences & How to Fight Each",
  description:
    "Learn the critical differences between involuntary and voluntary churn, how to identify each type, and the specific strategies to reduce both in your SaaS business.",
  keywords: [
    "involuntary churn vs voluntary churn",
    "types of churn",
    "passive churn",
    "active churn",
    "SaaS churn types",
    "churn reduction strategies",
  ],
  openGraph: {
    title: "Involuntary Churn vs Voluntary Churn: Differences & How to Fight Each",
    description:
      "Master the two types of SaaS churn and learn targeted strategies to reduce each one.",
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
                Churn Reduction
              </div>
              <span className="text-sm text-zinc-500">February 5, 2026</span>
              <span className="text-zinc-600">·</span>
              <span className="text-sm text-zinc-500">11 min read</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
              Involuntary Churn vs Voluntary Churn: Differences & How to Fight Each
            </h1>

            <p className="text-xl text-zinc-400 leading-relaxed">
              Not all churn is equal. Involuntary churn happens when payments fail. Voluntary churn happens when customers actively cancel. Here's how to identify and reduce both.
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-zinc max-w-none">
            <div className="text-zinc-300 space-y-6 leading-relaxed">
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                The Two Types of Churn (And Why It Matters)
              </h2>

              <p>
                Most SaaS founders track <strong className="text-white">total churn rate</strong> — the percentage of customers who leave each month. But this single metric hides a critical distinction:
              </p>

              <ul className="space-y-3 ml-6">
                <li className="text-zinc-400">
                  <strong className="text-zinc-300">Involuntary churn (passive churn):</strong> Customers <em>want</em> to stay but leave due to failed payments (expired cards, insufficient funds, bank declines)
                </li>
                <li className="text-zinc-400">
                  <strong className="text-zinc-300">Voluntary churn (active churn):</strong> Customers <em>choose</em> to cancel because they don't see enough value, found a competitor, or no longer need the product
                </li>
              </ul>

              <div className="glass rounded-xl p-6 my-8 border-l-4 border-brand-500">
                <p className="text-sm text-zinc-400 mb-2 font-medium uppercase tracking-wide">Why This Distinction Matters</p>
                <p className="text-lg font-semibold text-white mb-2">
                  Involuntary churn is 90%+ recoverable with automation. Voluntary churn requires product improvements and customer success work.
                </p>
                <p className="text-sm text-zinc-400 mb-0">
                  Fighting voluntary churn with payment retries won't work. Fighting involuntary churn with feature improvements won't help. You need <strong className="text-white">different strategies for each</strong>.
                </p>
              </div>

              <p>
                For the average SaaS company, <strong className="text-white">20-40% of total churn is involuntary</strong>. That means up to 4 in 10 churned customers <em>wanted to stay</em> — they just couldn't pay.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Involuntary Churn: The Silent Revenue Killer
              </h2>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                What Is Involuntary Churn?
              </h3>

              <p>
                <strong className="text-white">Involuntary churn</strong> (also called <em>passive churn</em> or <em>delinquent churn</em>) occurs when a subscription ends due to payment failure — not customer intent.
              </p>

              <p>
                <strong className="text-white">Common causes:</strong>
              </p>

              <ul className="space-y-2 ml-6">
                <li className="text-zinc-400">💳 <strong className="text-zinc-300">Expired credit cards</strong> (40% of involuntary churn)</li>
                <li className="text-zinc-400">💰 <strong className="text-zinc-300">Insufficient funds</strong> (28%)</li>
                <li className="text-zinc-400">🏦 <strong className="text-zinc-300">Bank declines</strong> for fraud prevention or daily limits (18%)</li>
                <li className="text-zinc-400">⚠️ <strong className="text-zinc-300">Technical errors</strong> (network issues, processor downtime) (14%)</li>
              </ul>

              <div className="glass rounded-xl p-6 my-8">
                <p className="text-sm text-zinc-400 mb-4 font-medium uppercase tracking-wide">Real Example</p>
                <p className="text-zinc-300">
                  Sarah is a loyal customer of your project management SaaS. She's been subscribed for 18 months and uses it daily. Her credit card expires in March, but she doesn't update it in your system. On April 1st, her renewal charge fails. After 7 days of failed retries, her account gets canceled.
                </p>
                <p className="text-zinc-300 mt-4">
                  <strong className="text-white">This is involuntary churn.</strong> Sarah didn't want to leave — she just forgot to update her card. With better dunning emails, she would have stayed.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                How to Identify Involuntary Churn
              </h3>

              <p>
                In Stripe (or your payment processor), involuntary churn shows up as:
              </p>

              <ul className="space-y-2 ml-6">
                <li className="text-zinc-400">
                  Subscription status: <code className="text-brand-400 bg-zinc-800 px-2 py-0.5 rounded">past_due</code> or <code className="text-brand-400 bg-zinc-800 px-2 py-0.5 rounded">unpaid</code>
                </li>
                <li className="text-zinc-400">
                  Invoice status: <code className="text-brand-400 bg-zinc-800 px-2 py-0.5 rounded">payment_failed</code>
                </li>
                <li className="text-zinc-400">
                  Charge status: <code className="text-brand-400 bg-zinc-800 px-2 py-0.5 rounded">failed</code> with decline codes
                </li>
              </ul>

              <p>
                <strong className="text-white">How to calculate involuntary churn rate:</strong>
              </p>

              <div className="glass rounded-xl p-6 my-6 bg-zinc-900/50">
                <p className="text-sm font-mono text-zinc-300">
                  Involuntary Churn Rate = (Customers lost to payment failures / Total customers at start of month) × 100
                </p>
              </div>

              <p>
                For a healthy SaaS business, involuntary churn should be <strong className="text-white">&lt;1% per month</strong>. Anything above 2% indicates serious payment recovery issues.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                How to Reduce Involuntary Churn
              </h3>

              <p>
                The good news: <strong className="text-white">Involuntary churn is highly fixable</strong>. These strategies can recover 85-94% of failed payments:
              </p>

              <div className="glass rounded-xl p-6 my-6">
                <h4 className="text-lg font-semibold text-white mb-3">Strategy 1: Smart Payment Retries</h4>
                <p className="text-sm text-zinc-300 mb-3">
                  Retry failed payments based on decline code. For example:
                </p>
                <ul className="space-y-2 ml-6 text-sm text-zinc-300">
                  <li><code className="text-brand-400">insufficient_funds</code> → Retry after 3-7 days (payday)</li>
                  <li><code className="text-brand-400">expired_card</code> → Email customer immediately (retries won't work)</li>
                  <li><code className="text-brand-400">processing_error</code> → Retry within hours (likely temporary)</li>
                </ul>
                <p className="text-xs text-zinc-500 mt-3">
                  <strong>Impact:</strong> Increases recovery by 40-60% vs basic retries
                </p>
              </div>

              <div className="glass rounded-xl p-6 my-6">
                <h4 className="text-lg font-semibold text-white mb-3">Strategy 2: Automated Dunning Emails</h4>
                <p className="text-sm text-zinc-300 mb-3">
                  Send a 3-stage email sequence when payments fail:
                </p>
                <ul className="space-y-2 ml-6 text-sm text-zinc-300">
                  <li><strong>Day 0:</strong> Gentle nudge with one-click card update link</li>
                  <li><strong>Day 3:</strong> Reminder with urgency ("access will pause soon")</li>
                  <li><strong>Day 7:</strong> Final warning with clear deadline</li>
                </ul>
                <p className="text-xs text-zinc-500 mt-3">
                  <strong>Impact:</strong> 73% of customers update their payment when emailed correctly
                </p>
              </div>

              <div className="glass rounded-xl p-6 my-6">
                <h4 className="text-lg font-semibold text-white mb-3">Strategy 3: Card Account Updater</h4>
                <p className="text-sm text-zinc-300 mb-3">
                  Visa and Mastercard automatically update expired card details. Enable this in Stripe to refresh cards before they expire.
                </p>
                <p className="text-xs text-zinc-500 mt-3">
                  <strong>Impact:</strong> Reduces expired card failures by 30-40%
                </p>
              </div>

              <div className="glass rounded-xl p-6 my-6">
                <h4 className="text-lg font-semibold text-white mb-3">Strategy 4: Pre-Billing Notifications</h4>
                <p className="text-sm text-zinc-300 mb-3">
                  Email customers 3-5 days <em>before</em> billing: "Your subscription renews on [Date] for $XX. Card on file: •••• [Last 4]."
                </p>
                <p className="text-xs text-zinc-500 mt-3">
                  <strong>Impact:</strong> Catches expired cards before charges fail
                </p>
              </div>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Voluntary Churn: When Customers Choose to Leave
              </h2>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                What Is Voluntary Churn?
              </h3>

              <p>
                <strong className="text-white">Voluntary churn</strong> (also called <em>active churn</em>) happens when customers actively cancel their subscription. They make a conscious decision to leave.
              </p>

              <p>
                <strong className="text-white">Common causes:</strong>
              </p>

              <ul className="space-y-2 ml-6">
                <li className="text-zinc-400">❌ <strong className="text-zinc-300">Not seeing enough value</strong> (product doesn't solve their problem)</li>
                <li className="text-zinc-400">💸 <strong className="text-zinc-300">Too expensive</strong> (ROI doesn't justify cost)</li>
                <li className="text-zinc-400">🏁 <strong className="text-zinc-300">Achieved their goal</strong> (one-time need, e.g., wedding planning)</li>
                <li className="text-zinc-400">🔄 <strong className="text-zinc-300">Switched to a competitor</strong> (better features, cheaper pricing)</li>
                <li className="text-zinc-400">📉 <strong className="text-zinc-300">Poor customer experience</strong> (buggy product, slow support)</li>
                <li className="text-zinc-400">💼 <strong className="text-zinc-300">Business closure</strong> (startup failed, company downsized)</li>
              </ul>

              <div className="glass rounded-xl p-6 my-8">
                <p className="text-sm text-zinc-400 mb-4 font-medium uppercase tracking-wide">Real Example</p>
                <p className="text-zinc-300">
                  Mike signs up for your email marketing SaaS. After 2 months, he cancels because:
                </p>
                <ul className="space-y-2 ml-6 text-sm text-zinc-300 mt-3">
                  <li>His open rates are low (feels like the product isn't working)</li>
                  <li>He finds the interface confusing (poor onboarding)</li>
                  <li>A competitor offers similar features for 40% less</li>
                </ul>
                <p className="text-zinc-300 mt-4">
                  <strong className="text-white">This is voluntary churn.</strong> Mike actively clicked "Cancel Subscription" because he didn't perceive enough value.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                How to Identify Voluntary Churn
              </h3>

              <p>
                Voluntary churn is identified by:
              </p>

              <ul className="space-y-2 ml-6">
                <li className="text-zinc-400">
                  Subscription status: <code className="text-brand-400 bg-zinc-800 px-2 py-0.5 rounded">canceled</code> with <code className="text-brand-400 bg-zinc-800 px-2 py-0.5 rounded">cancel_at_period_end: true</code>
                </li>
                <li className="text-zinc-400">
                  Cancellation reason in Stripe metadata (if you collect it)
                </li>
                <li className="text-zinc-400">
                  Customer actively clicked "Cancel" in your app or emailed support to cancel
                </li>
              </ul>

              <p>
                <strong className="text-white">How to calculate voluntary churn rate:</strong>
              </p>

              <div className="glass rounded-xl p-6 my-6 bg-zinc-900/50">
                <p className="text-sm font-mono text-zinc-300">
                  Voluntary Churn Rate = (Customers who actively canceled / Total customers at start of month) × 100
                </p>
              </div>

              <p>
                For a healthy SaaS business, voluntary churn varies widely by industry and customer segment:
              </p>

              <ul className="space-y-2 ml-6 text-sm">
                <li className="text-zinc-400">B2B Enterprise: <strong className="text-zinc-300">0.5-1% per month</strong> (annual contracts, high switching cost)</li>
                <li className="text-zinc-400">B2B SMB: <strong className="text-zinc-300">2-5% per month</strong> (monthly contracts, moderate stickiness)</li>
                <li className="text-zinc-400">B2C: <strong className="text-zinc-300">5-10% per month</strong> (low commitment, high competition)</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                How to Reduce Voluntary Churn
              </h3>

              <p>
                Voluntary churn is harder to fix than involuntary churn because it requires <strong className="text-white">product and customer experience improvements</strong>. Here's how to tackle it:
              </p>

              <div className="glass rounded-xl p-6 my-6">
                <h4 className="text-lg font-semibold text-white mb-3">Strategy 1: Improve Onboarding (Time to Value)</h4>
                <p className="text-sm text-zinc-300 mb-3">
                  <strong className="text-white">80% of churn happens in the first 90 days</strong> because customers don't reach their "aha moment" fast enough.
                </p>
                <ul className="space-y-2 ml-6 text-sm text-zinc-300">
                  <li>✅ Show value in the first session (don't make them wait)</li>
                  <li>✅ Use interactive product tours (not just tooltips)</li>
                  <li>✅ Send onboarding emails with quick wins</li>
                  <li>✅ Offer onboarding calls for high-value customers</li>
                </ul>
                <p className="text-xs text-zinc-500 mt-3">
                  <strong>Impact:</strong> Reducing time to value by 50% can cut early churn by 30%+
                </p>
              </div>

              <div className="glass rounded-xl p-6 my-6">
                <h4 className="text-lg font-semibold text-white mb-3">Strategy 2: Monitor Customer Health Scores</h4>
                <p className="text-sm text-zinc-300 mb-3">
                  Track leading indicators of churn so you can intervene <em>before</em> customers cancel:
                </p>
                <ul className="space-y-2 ml-6 text-sm text-zinc-300">
                  <li>📉 <strong>Declining usage</strong> (logins, feature usage)</li>
                  <li>📧 <strong>Low engagement</strong> (not opening emails)</li>
                  <li>🐛 <strong>Support tickets</strong> (especially unresolved ones)</li>
                  <li>💳 <strong>Downgrade attempts</strong> (trying to lower plan tier)</li>
                </ul>
                <p className="text-xs text-zinc-500 mt-3">
                  <strong>Impact:</strong> Proactive outreach to "at-risk" customers can save 20-30% of them
                </p>
              </div>

              <div className="glass rounded-xl p-6 my-6">
                <h4 className="text-lg font-semibold text-white mb-3">Strategy 3: Run Cancellation Surveys</h4>
                <p className="text-sm text-zinc-300 mb-3">
                  When customers cancel, <strong className="text-white">ask why</strong>. Common reasons:
                </p>
                <ul className="space-y-2 ml-6 text-sm text-zinc-300">
                  <li>"Too expensive"</li>
                  <li>"Not using it enough"</li>
                  <li>"Missing a feature I need"</li>
                  <li>"Switched to [Competitor]"</li>
                  <li>"Business closed / project ended"</li>
                </ul>
                <p className="text-sm text-zinc-300 mt-3">
                  Group these reasons into themes and prioritize fixing the most common ones.
                </p>
                <p className="text-xs text-zinc-500 mt-3">
                  <strong>Impact:</strong> Addressing the top 3 churn reasons can reduce voluntary churn by 15-25%
                </p>
              </div>

              <div className="glass rounded-xl p-6 my-6">
                <h4 className="text-lg font-semibold text-white mb-3">Strategy 4: Offer Cancellation Alternatives</h4>
                <p className="text-sm text-zinc-300 mb-3">
                  When customers try to cancel, offer alternatives:
                </p>
                <ul className="space-y-2 ml-6 text-sm text-zinc-300">
                  <li>💸 <strong>Discount:</strong> "How about 3 months at 50% off?"</li>
                  <li>⏸️ <strong>Pause:</strong> "Pause your subscription for up to 6 months"</li>
                  <li>📉 <strong>Downgrade:</strong> "Switch to our free/starter plan instead"</li>
                  <li>🎁 <strong>Feature access:</strong> "We're launching [Feature] next month — stay to try it"</li>
                </ul>
                <p className="text-xs text-zinc-500 mt-3">
                  <strong>Impact:</strong> Win-back offers can save 15-30% of canceling customers
                </p>
              </div>

              <div className="glass rounded-xl p-6 my-6">
                <h4 className="text-lg font-semibold text-white mb-3">Strategy 5: Build Better Product Stickiness</h4>
                <p className="text-sm text-zinc-300 mb-3">
                  The best defense against voluntary churn is a product customers <em>can't live without</em>:
                </p>
                <ul className="space-y-2 ml-6 text-sm text-zinc-300">
                  <li>🔗 <strong>Integrations:</strong> Connect to tools they use daily</li>
                  <li>📊 <strong>Data accumulation:</strong> The longer they use you, the more valuable their data becomes</li>
                  <li>👥 <strong>Team collaboration:</strong> Multiple users = higher switching cost</li>
                  <li>🤖 <strong>Automation:</strong> Workflows they rely on daily</li>
                </ul>
                <p className="text-xs text-zinc-500 mt-3">
                  <strong>Impact:</strong> High product stickiness can reduce voluntary churn by 40-60%
                </p>
              </div>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Side-by-Side Comparison
              </h2>

              <div className="glass rounded-xl p-6 my-8 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-800">
                      <th className="text-left py-3 text-zinc-400 font-medium">Factor</th>
                      <th className="text-left py-3 text-zinc-400 font-medium">Involuntary Churn</th>
                      <th className="text-left py-3 text-zinc-400 font-medium">Voluntary Churn</th>
                    </tr>
                  </thead>
                  <tbody className="text-zinc-300">
                    <tr className="border-b border-zinc-800/50">
                      <td className="py-3 font-medium">Cause</td>
                      <td className="py-3">Payment failure</td>
                      <td className="py-3">Customer choice</td>
                    </tr>
                    <tr className="border-b border-zinc-800/50">
                      <td className="py-3 font-medium">Customer intent</td>
                      <td className="py-3 text-green-400">Wants to stay</td>
                      <td className="py-3 text-red-400">Wants to leave</td>
                    </tr>
                    <tr className="border-b border-zinc-800/50">
                      <td className="py-3 font-medium">% of total churn</td>
                      <td className="py-3">20-40%</td>
                      <td className="py-3">60-80%</td>
                    </tr>
                    <tr className="border-b border-zinc-800/50">
                      <td className="py-3 font-medium">Recoverability</td>
                      <td className="py-3 text-green-400">85-94%</td>
                      <td className="py-3 text-yellow-400">15-30%</td>
                    </tr>
                    <tr className="border-b border-zinc-800/50">
                      <td className="py-3 font-medium">Time to fix</td>
                      <td className="py-3 text-green-400">Immediate (automation)</td>
                      <td className="py-3 text-yellow-400">Weeks/months (product work)</td>
                    </tr>
                    <tr className="border-b border-zinc-800/50">
                      <td className="py-3 font-medium">Primary solution</td>
                      <td className="py-3">Payment recovery tools</td>
                      <td className="py-3">Product & CX improvements</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium">ROI</td>
                      <td className="py-3 text-green-400">Very high</td>
                      <td className="py-3 text-yellow-400">Moderate</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Which Should You Focus On First?
              </h2>

              <p>
                <strong className="text-white">Start with involuntary churn.</strong> Here's why:
              </p>

              <ul className="space-y-2 ml-6">
                <li className="text-zinc-400">✅ <strong className="text-zinc-300">Higher recovery rate:</strong> 85-94% vs 15-30% for voluntary churn</li>
                <li className="text-zinc-400">✅ <strong className="text-zinc-300">Faster to implement:</strong> Automation vs product changes</li>
                <li className="text-zinc-400">✅ <strong className="text-zinc-300">Immediate ROI:</strong> Recovered revenue shows up this month</li>
                <li className="text-zinc-400">✅ <strong className="text-zinc-300">Low effort:</strong> One-time setup, then runs automatically</li>
              </ul>

              <p>
                Once you've automated involuntary churn recovery (and are saving 90%+ of those customers), <em>then</em> tackle voluntary churn with product improvements and customer success initiatives.
              </p>

              <div className="glass rounded-xl p-6 my-8 border-l-4 border-yellow-500">
                <p className="text-sm text-zinc-400 mb-2 font-medium uppercase tracking-wide">Pro Tip</p>
                <p className="text-zinc-300 mb-0">
                  Track both churn types separately in your analytics. Don't lump them together or you'll waste time trying to fix voluntary churn with payment strategies (or vice versa).
                </p>
              </div>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Action Plan: Reduce Both Types of Churn
              </h2>

              <div className="glass rounded-xl p-8 my-8">
                <h3 className="text-lg font-semibold text-white mb-4">Month 1: Fix Involuntary Churn</h3>
                <ul className="space-y-2 text-sm text-zinc-300 ml-6">
                  <li>☐ Calculate your involuntary churn rate (goal: &lt;1%)</li>
                  <li>☐ Enable Stripe's Card Account Updater</li>
                  <li>☐ Implement smart payment retries (or use Revive)</li>
                  <li>☐ Set up automated dunning emails (3-stage sequence)</li>
                  <li>☐ Track recovery rate weekly</li>
                </ul>

                <h3 className="text-lg font-semibold text-white mt-8 mb-4">Month 2-3: Tackle Voluntary Churn</h3>
                <ul className="space-y-2 text-sm text-zinc-300 ml-6">
                  <li>☐ Run cancellation surveys to identify top churn reasons</li>
                  <li>☐ Improve onboarding (reduce time to first value)</li>
                  <li>☐ Set up customer health scoring</li>
                  <li>☐ Create win-back offers (discounts, pauses, downgrades)</li>
                  <li>☐ Address the top 3 product gaps causing cancellations</li>
                </ul>

                <h3 className="text-lg font-semibold text-white mt-8 mb-4">Ongoing: Monitor & Optimize</h3>
                <ul className="space-y-2 text-sm text-zinc-300 ml-6">
                  <li>☐ Track involuntary vs voluntary churn separately each month</li>
                  <li>☐ A/B test dunning email copy and timing</li>
                  <li>☐ Review churn reasons quarterly and prioritize fixes</li>
                  <li>☐ Reach out to at-risk customers before they cancel</li>
                </ul>
              </div>

              <div className="glass rounded-xl p-8 my-12 text-center border-l-4 border-brand-500">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Fix Involuntary Churn in 3 Minutes
                </h3>
                <p className="text-zinc-400 mb-6">
                  Revive automates smart retries, dunning emails, and payment recovery tracking for Stripe — so you can focus on reducing voluntary churn through product improvements.
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-8 py-4 rounded-xl transition-all"
                >
                  Start Free Trial
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
                <li>💡 Involuntary churn = payment failures (customers want to stay)</li>
                <li>💡 Voluntary churn = active cancellations (customers choose to leave)</li>
                <li>💡 20-40% of total churn is involuntary — and 90%+ recoverable</li>
                <li>💡 Fix involuntary churn first (higher ROI, faster implementation)</li>
                <li>💡 Involuntary churn needs payment automation; voluntary churn needs product work</li>
                <li>💡 Track both types separately to apply the right strategies</li>
              </ul>

              <p className="mt-8">
                The bottom line: <strong className="text-white">Not all churn is equal</strong>. Fight involuntary churn with automation, and voluntary churn with product excellence. Focus on involuntary churn first for quick wins, then invest in long-term product stickiness to reduce voluntary churn.
              </p>

              <div className="mt-12 pt-8 border-t border-zinc-800">
                <p className="text-sm text-zinc-500">
                  <strong className="text-zinc-400">About Revive:</strong> We help SaaS companies eliminate involuntary churn with smart payment retries and automated dunning emails. Connect your Stripe account and start recovering failed payments in 3 minutes.
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
