import Link from "next/link";
import { Lock, Mail, MessageSquare } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";
import Footer from "../components/Footer";

export default function ContactPage() {
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
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 dark:text-slate-300 mb-10">
          Have a question, feedback, or need help? We&apos;d love to hear from you.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <a
            href="mailto:hello@linkylocks.com"
            className="flex items-start gap-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 shrink-0">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Email Us</h3>
              <p className="text-sm text-gray-500 dark:text-slate-400">
                General inquiries and support
              </p>
              <p className="mt-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                hello@linkylocks.com
              </p>
            </div>
          </a>

          <a
            href="mailto:support@linkylocks.com"
            className="flex items-start gap-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 shrink-0">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Technical Support</h3>
              <p className="text-sm text-gray-500 dark:text-slate-400">
                Bug reports and technical issues
              </p>
              <p className="mt-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                support@linkylocks.com
              </p>
            </div>
          </a>
        </div>

        <div className="mt-10 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">What happens when a link expires?</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">Visitors see a &quot;Link unavailable&quot; page. The link cannot be reactivated.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Can I edit a link after creating it?</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">Currently, links cannot be edited after creation. You can revoke a link and create a new one.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Is the Free plan really free?</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">Yes! The Free plan is free forever with up to 3 clicks per link. No credit card required.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
