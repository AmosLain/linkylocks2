import Link from "next/link";
import { Lock, Check } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";
import Footer from "../components/Footer";

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
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
          <Link
            href="/signup"
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Simple Pricing</h1>
        <p className="text-lg text-gray-600 dark:text-slate-300 mb-12 max-w-xl mx-auto">
          Start for free, upgrade when you need more power.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 flex flex-col">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Free</h2>
            <div className="text-4xl font-extrabold text-gray-900 dark:text-white mb-1">$0</div>
            <p className="text-gray-500 dark:text-slate-400 text-sm mb-6">Forever free</p>

            <ul className="text-left space-y-3 mb-8 flex-1">
              {[
                "Unlimited links",
                "Up to 3 clicks per link",
                "Time-based expiry",
                "Phantom (self-destruct) links",
                "Scheduled reveal",
                "Instant revoke",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300">
                  <Check className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="/signup"
              className="block w-full rounded-xl border-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 py-3 font-semibold hover:bg-indigo-50 dark:hover:bg-slate-700 text-center"
            >
              Get Started Free
            </Link>
          </div>

          <div className="bg-indigo-600 rounded-2xl shadow-lg p-8 flex flex-col text-white relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
              MOST POPULAR
            </div>
            <h2 className="text-2xl font-bold mb-2">Pro</h2>
            <div className="text-4xl font-extrabold mb-1">$10</div>
            <p className="text-indigo-200 text-sm mb-6">per month</p>

            <ul className="text-left space-y-3 mb-8 flex-1">
              {[
                "Everything in Free",
                "Unlimited clicks per link",
                "Password-protected links",
                "Priority support",
                "Early access to new features",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-white">
                  <Check className="w-4 h-4 text-indigo-200 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="/signup"
              className="block w-full rounded-xl bg-white text-indigo-600 py-3 font-semibold hover:bg-indigo-50 text-center"
            >
              Start with Pro
            </Link>
          </div>
        </div>

        <p className="mt-10 text-sm text-gray-500 dark:text-slate-400">
          Need a custom plan?{" "}
          <a href="mailto:hello@linkylocks.com" className="text-indigo-600 dark:text-indigo-400 underline">
            Contact us
          </a>
        </p>
      </div>

      <Footer />
    </div>
  );
}
