import Link from "next/link";
import { Lock, Shield, Zap, Users } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-900">
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          <Lock className="w-8 h-8" />
          <span>LinkyLocks</span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/login" className="px-4 py-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
            Log In
          </Link>
        </div>
      </nav>

      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">About LinkyLocks</h1>

        <div className="prose dark:prose-invert max-w-none space-y-6">
          <p className="text-lg text-gray-600 dark:text-slate-300">
            LinkyLocks is a secure link shortening service built for people who need control over how their links are accessed. Whether you&apos;re sharing temporary download links, limited-access content, or one-time secrets, LinkyLocks gives you the tools to manage it all.
          </p>

          <div className="grid md:grid-cols-3 gap-6 my-10">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
              <Shield className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Security First</h3>
              <p className="text-sm text-gray-600 dark:text-slate-400">
                Every link is protected with row-level security. Your data stays yours.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
              <Zap className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Fast & Simple</h3>
              <p className="text-sm text-gray-600 dark:text-slate-400">
                Create expiring links in seconds. No complicated setup required.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
              <Users className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">For Everyone</h3>
              <p className="text-sm text-gray-600 dark:text-slate-400">
                From marketers to developers, LinkyLocks works for any use case.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">What makes us different?</h2>
          <ul className="space-y-3 text-gray-600 dark:text-slate-300">
            <li className="flex gap-2"><span className="text-indigo-600 dark:text-indigo-400 font-bold">&#8226;</span> <strong>Expiry control</strong> &mdash; Set links to expire by time, click count, or both.</li>
            <li className="flex gap-2"><span className="text-indigo-600 dark:text-indigo-400 font-bold">&#8226;</span> <strong>Phantom links</strong> &mdash; Self-destructing links that vanish after one click.</li>
            <li className="flex gap-2"><span className="text-indigo-600 dark:text-indigo-400 font-bold">&#8226;</span> <strong>Scheduled reveal</strong> &mdash; Links that only become available at a future date.</li>
            <li className="flex gap-2"><span className="text-indigo-600 dark:text-indigo-400 font-bold">&#8226;</span> <strong>Password protection</strong> &mdash; Add an extra layer of security to sensitive links.</li>
            <li className="flex gap-2"><span className="text-indigo-600 dark:text-indigo-400 font-bold">&#8226;</span> <strong>Instant revoke</strong> &mdash; Disable any link immediately when needed.</li>
          </ul>

          <div className="mt-8">
            <Link
              href="/signup"
              className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
