import Link from "next/link";
import { Lock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 mt-auto">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-3">
              <Lock className="w-5 h-5" />
              <span>LinkyLocks</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-slate-400">
              Secure link shortening with expiry control.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Product</h3>
            <ul className="space-y-2">
              <li><Link href="/pricing" className="text-sm text-gray-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">Pricing</Link></li>
              <li><Link href="/signup" className="text-sm text-gray-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">Sign Up</Link></li>
              <li><Link href="/login" className="text-sm text-gray-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">Log In</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-gray-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">About</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/terms" className="text-sm text-gray-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-sm text-gray-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-700 text-center text-sm text-gray-400 dark:text-slate-500">
          &copy; {new Date().getFullYear()} LinkyLocks. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
