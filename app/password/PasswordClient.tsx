"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";

export default function PasswordClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`/api/unlock`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || "Wrong password.");
        return;
      }

      router.replace(data.url);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 shadow-lg">
        <div className="mb-6 flex flex-col items-center text-center">
          <Lock className="mb-3 h-10 w-10 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Password Required</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
            This link is password-protected. Enter the password to continue.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/30 px-4 py-3 text-sm text-red-700 dark:text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-800 dark:text-slate-200">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-gray-900 dark:text-white"
              autoFocus
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? "Checking\u2026" : "Unlock Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
