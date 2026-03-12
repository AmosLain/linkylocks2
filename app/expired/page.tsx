import ThemeToggle from "../components/ThemeToggle";

export default function ExpiredPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 p-6">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Link unavailable</h1>
        <p className="text-gray-600 dark:text-slate-400">
          This link is expired, disabled, or has reached its click limit.
        </p>
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
