import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-zinc-500 mb-12">
            Last updated: February 4, 2026
          </p>

          <div className="prose prose-invert prose-zinc max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-3">
                1. Acceptance of Terms
              </h2>
              <p className="text-zinc-400 leading-relaxed">
                By accessing or using Revive (&quot;the Service&quot;), you agree to be
                bound by these Terms of Service. If you do not agree, do not use
                the Service. These terms constitute a legally binding agreement
                between you and Revive.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                2. Description of Service
              </h2>
              <p className="text-zinc-400 leading-relaxed">
                Revive is a SaaS platform that helps businesses recover failed
                payments by connecting to their Stripe account via OAuth,
                detecting failed charges, retrying payments with smart logic,
                and sending automated dunning emails to end customers. Revive
                acts as an authorized agent on your behalf when interacting with
                Stripe and your customers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Account Terms</h2>
              <ul className="list-disc list-inside text-zinc-400 space-y-2">
                <li>You must be 18 years or older to use the Service</li>
                <li>
                  You must provide accurate and complete registration
                  information
                </li>
                <li>
                  You are responsible for maintaining the security of your
                  account
                </li>
                <li>
                  You are responsible for all activity that occurs under your
                  account
                </li>
                <li>One person or legal entity per account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                4. Stripe Integration & Authorization
              </h2>
              <p className="text-zinc-400 leading-relaxed">
                By connecting your Stripe account, you authorize Revive to: (a)
                access your Stripe account data including failed payment
                intents, customer information, and invoice data; (b) retry
                failed payments on your behalf according to your configured
                schedule; (c) send email communications to your customers
                regarding failed payments. You may revoke this authorization at
                any time through your Stripe Dashboard or by disconnecting in
                Revive settings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                5. Payment & Billing
              </h2>
              <p className="text-zinc-400 leading-relaxed">
                Revive offers subscription plans billed monthly. Prices are in
                USD. All plans include a 14-day free trial. After the trial, your
                selected plan will be charged automatically. You may cancel at
                any time — cancellation takes effect at the end of the current
                billing period. Refunds are provided at our discretion for
                billing errors only.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                6. Acceptable Use
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-3">
                You agree not to:
              </p>
              <ul className="list-disc list-inside text-zinc-400 space-y-2">
                <li>Use the Service for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>
                  Use the Service to send spam or unsolicited communications
                  beyond legitimate payment recovery
                </li>
                <li>
                  Interfere with the Service&apos;s operation or other users&apos; access
                </li>
                <li>
                  Reverse engineer, decompile, or disassemble any part of the
                  Service
                </li>
                <li>
                  Resell or redistribute the Service without written permission
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                7. Service Level & Availability
              </h2>
              <p className="text-zinc-400 leading-relaxed">
                We strive for 99.9% uptime but do not guarantee uninterrupted
                service. Scheduled maintenance will be announced in advance when
                possible. We are not liable for any losses arising from service
                interruptions, including missed payment retries.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                8. Limitation of Liability
              </h2>
              <p className="text-zinc-400 leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, REVIVE SHALL NOT BE
                LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
                PUNITIVE DAMAGES, INCLUDING LOSS OF REVENUE, DATA, OR PROFITS.
                OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US IN
                THE 12 MONTHS PRECEDING THE CLAIM. Revive does not guarantee any
                specific recovery rate or revenue amount.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                9. Indemnification
              </h2>
              <p className="text-zinc-400 leading-relaxed">
                You agree to indemnify and hold Revive harmless from any claims,
                damages, or expenses arising from your use of the Service, your
                violation of these Terms, or your violation of any third-party
                rights.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                10. Intellectual Property
              </h2>
              <p className="text-zinc-400 leading-relaxed">
                The Service, including all content, features, and functionality,
                is owned by Revive and protected by intellectual property laws.
                You retain all rights to your data. You grant us a limited
                license to use your data solely to provide the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">11. Termination</h2>
              <p className="text-zinc-400 leading-relaxed">
                Either party may terminate this agreement at any time. We may
                suspend or terminate your account immediately if you violate
                these Terms. Upon termination, your right to use the Service
                ceases immediately. Data retention is governed by our Privacy
                Policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                12. Changes to Terms
              </h2>
              <p className="text-zinc-400 leading-relaxed">
                We may modify these Terms at any time. Material changes will be
                communicated via email or website notice at least 30 days before
                taking effect. Continued use after changes constitutes
                acceptance.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                13. Governing Law
              </h2>
              <p className="text-zinc-400 leading-relaxed">
                These Terms are governed by the laws of the State of Delaware,
                United States. Any disputes shall be resolved in the courts of
                Delaware.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">14. Contact</h2>
              <p className="text-zinc-400 leading-relaxed">
                Questions about these terms? Contact us at{" "}
                <a
                  href="mailto:legal@userevive.com"
                  className="text-brand-400 hover:text-brand-300"
                >
                  legal@userevive.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
