import { Suspense } from "react";
import NotYetAvailableClient from "./not-yet-available.client";
import ThemeToggle from "../components/ThemeToggle";

export default function NotYetAvailablePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 p-6">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Not yet available
        </h1>
        <p className="text-gray-600 dark:text-slate-400 mb-4">
          This link is scheduled to be revealed later.
        </p>
        <Suspense fallback={<p className="text-gray-500 dark:text-slate-400">Loading...</p>}>
          <NotYetAvailableClient />
        </Suspense>
        <a
          href="/"
          className="mt-6 inline-block rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Go to homepage
        </a>
      </div>
    </div>
  );
}
