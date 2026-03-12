import Link from "next/link";
import { Lock } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";
import Footer from "../components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-900">
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          <Lock className="w-8 h-8" />
          <span>LinkyLocks</span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/login" className="px-4 py-2 text-indigo-600 dark:text-indigo-400">Log In</Link>
        </div>
      </nav>

      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-8">Last updated: March 2026</p>

        <div className="space-y-6 text-gray-600 dark:text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using LinkyLocks (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2. Description of Service</h2>
            <p>
              LinkyLocks provides a link shortening service with expiration controls, including time-based expiry, click-based limits, password protection, and scheduled reveal features. The Service is offered on a freemium model with Free and Pro tiers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3. User Accounts</h2>
            <p>
              You must create an account to use the Service. You are responsible for maintaining the security of your account credentials. You must provide accurate and complete information during registration.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4. Acceptable Use</h2>
            <p>You agree not to use the Service to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Share illegal, harmful, or malicious content</li>
              <li>Distribute malware, phishing links, or spam</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Attempt to circumvent service limitations or security measures</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">5. Service Plans</h2>
            <p>
              The Free plan includes basic features with a limit of 3 clicks per link. The Pro plan offers unlimited clicks and additional features. We reserve the right to modify plan features and pricing with reasonable notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">6. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account at any time if you violate these terms. You may delete your account at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">7. Disclaimer</h2>
            <p>
              The Service is provided &quot;as is&quot; without warranties of any kind. We do not guarantee uninterrupted or error-free operation. We are not responsible for the content shared through links created on the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">8. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, LinkyLocks shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">9. Changes to Terms</h2>
            <p>
              We may update these terms from time to time. Continued use of the Service after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">10. Contact</h2>
            <p>
              If you have questions about these terms, please contact us at{" "}
              <a href="mailto:hello@linkylocks.com" className="text-indigo-600 dark:text-indigo-400 underline">hello@linkylocks.com</a>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
