import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-zinc-500 mb-12">
            Last updated: February 4, 2026
          </p>

          <div className="prose prose-invert prose-zinc max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p className="text-zinc-400 leading-relaxed">
                Revive (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is
                committed to protecting your personal data. This privacy policy
                explains how we collect, use, disclose, and safeguard your
                information when you use our payment recovery service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                2. Information We Collect
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-3">
                We collect information you provide directly:
              </p>
              <ul className="list-disc list-inside text-zinc-400 space-y-2">
                <li>
                  Account information (name, email address, company name)
                </li>
                <li>
                  Payment information (processed securely through Stripe — we
                  never store card numbers)
                </li>
                <li>
                  Stripe account data accessed via OAuth (payment intents,
                  customer emails, invoice data)
                </li>
                <li>Usage data and analytics</li>
                <li>Communications you send to us</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                3. How We Use Your Information
              </h2>
              <ul className="list-disc list-inside text-zinc-400 space-y-2">
                <li>To provide and maintain our payment recovery service</li>
                <li>To process payment retries on your behalf</li>
                <li>To send dunning emails to your customers (on your behalf)</li>
                <li>To generate recovery analytics and reports</li>
                <li>To communicate with you about your account</li>
                <li>To improve our service and develop new features</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                4. Stripe Data Access
              </h2>
              <p className="text-zinc-400 leading-relaxed">
                When you connect your Stripe account via OAuth, we access only
                the data necessary to perform payment recovery. This includes
                failed payment intents, customer email addresses, and invoice
                data. We do not access or store full credit card numbers,
                bank account numbers, or other sensitive financial credentials.
                You can revoke our access at any time through your Stripe
                Dashboard.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                5. Data Sharing & Disclosure
              </h2>
              <p className="text-zinc-400 leading-relaxed">
                We do not sell your personal data. We may share information
                with:
              </p>
              <ul className="list-disc list-inside text-zinc-400 space-y-2 mt-3">
                <li>
                  Service providers (hosting, email delivery) who process data
                  on our behalf
                </li>
                <li>
                  Stripe, as necessary to perform payment retries and OAuth
                  authentication
                </li>
                <li>Law enforcement when required by law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Data Security</h2>
              <p className="text-zinc-400 leading-relaxed">
                We implement industry-standard security measures including
                encryption at rest and in transit (TLS 1.3), secure OAuth token
                storage, regular security audits, and access controls. Our
                infrastructure uses enterprise-grade encryption and security best practices.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Data Retention</h2>
              <p className="text-zinc-400 leading-relaxed">
                We retain your data for as long as your account is active. Upon
                account deletion, we remove your personal data within 30 days,
                except where retention is required by law. Aggregated,
                anonymized data may be retained indefinitely for analytics.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                8. Your Rights (GDPR & CCPA)
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-3">
                Depending on your jurisdiction, you have the right to:
              </p>
              <ul className="list-disc list-inside text-zinc-400 space-y-2">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to or restrict processing</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
                <li>
                  Opt out of the sale of personal information (CCPA — note: we
                  do not sell personal data)
                </li>
              </ul>
              <p className="text-zinc-400 leading-relaxed mt-3">
                To exercise these rights, contact us at privacy@userevive.com.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Cookies</h2>
              <p className="text-zinc-400 leading-relaxed">
                We use essential cookies for authentication and session
                management. We use analytics cookies (which you can opt out of)
                to understand how our service is used. We do not use advertising
                or tracking cookies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                10. Changes to This Policy
              </h2>
              <p className="text-zinc-400 leading-relaxed">
                We may update this policy from time to time. We will notify you
                of material changes by email or through a notice on our website.
                Continued use of the service constitutes acceptance of the
                updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">11. Contact Us</h2>
              <p className="text-zinc-400 leading-relaxed">
                If you have questions about this privacy policy or our data
                practices, contact us at:{" "}
                <a
                  href="mailto:privacy@userevive.com"
                  className="text-brand-400 hover:text-brand-300"
                >
                  privacy@userevive.com
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
