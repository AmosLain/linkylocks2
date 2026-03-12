import Link from "next/link";
import { Lock } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";
import Footer from "../components/Footer";

export default function PrivacyPage() {
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
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-8">Last updated: March 2026</p>

        <div className="space-y-6 text-gray-600 dark:text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">1. Information We Collect</h2>
            <p>When you use LinkyLocks, we collect:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Account information:</strong> Email address and hashed password when you sign up.</li>
              <li><strong>Link data:</strong> Target URLs, labels, expiration settings, and click counts for links you create.</li>
              <li><strong>Usage data:</strong> Basic analytics such as click counts on your links.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Provide and maintain the Service</li>
              <li>Process link redirections and enforce expiration rules</li>
              <li>Communicate with you about your account</li>
              <li>Improve the Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3. Data Storage</h2>
            <p>
              Your data is stored securely using Supabase, which provides enterprise-grade security including row-level security policies. All data is encrypted in transit using TLS.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4. Data Sharing</h2>
            <p>
              We do not sell your personal data. We only share data with third-party services necessary to operate the platform (e.g., hosting, authentication). We will disclose information if required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">5. Cookies</h2>
            <p>
              We use essential cookies for authentication and session management. We also store your theme preference (light/dark mode) in localStorage. We do not use tracking cookies or third-party advertising cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Access your personal data</li>
              <li>Delete your account and associated data</li>
              <li>Export your link data</li>
              <li>Opt out of non-essential communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">7. Data Retention</h2>
            <p>
              We retain your data as long as your account is active. Expired links remain in the database but are no longer accessible. You can request deletion of all your data by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">8. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of significant changes via email or through the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">9. Contact</h2>
            <p>
              For privacy-related questions, contact us at{" "}
              <a href="mailto:privacy@linkylocks.com" className="text-indigo-600 dark:text-indigo-400 underline">privacy@linkylocks.com</a>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
