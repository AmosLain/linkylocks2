"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import ThemeToggle from "../components/ThemeToggle";

function getSupabaseKey() {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    ""
  );
}

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const nextUrl = useMemo(() => {
    return searchParams.get("next") || searchParams.get("redirect") || "/app";
  }, [searchParams]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const supabase = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const key = getSupabaseKey();
    if (!url || !key) return null;
    return createBrowserClient(url, key);
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    if (!supabase) {
      setMsg("Supabase env is missing (URL or key). Check .env.local.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setMsg(error.message);
        return;
      }

      // after login, go where the app expects
      router.replace(nextUrl);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-slate-900">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
        <h1 className="text-xl font-semibold dark:text-white">Login</h1>

        <p className="mt-2 text-sm opacity-80 dark:text-slate-300">
          After login you&apos;ll be sent to:{" "}
          <span className="font-mono">{nextUrl}</span>
        </p>

        {msg ? (
          <div className="mt-4 rounded-md border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/30 p-3 text-sm text-red-700 dark:text-red-400">{msg}</div>
        ) : null}

        <form className="mt-6 space-y-3" onSubmit={onSubmit}>
          <div className="space-y-1">
            <label className="text-sm dark:text-slate-300">Email</label>
            <input
              className="w-full rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              type="email"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm dark:text-slate-300">Password</label>
            <input
              className="w-full rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              type="password"
              required
            />
          </div>

          <button
            className="w-full rounded-md bg-indigo-600 text-white px-4 py-2 text-sm hover:bg-indigo-700 disabled:opacity-60"
            disabled={loading}
            type="submit"
          >
            {loading ? "Signing in\u2026" : "Log in"}
          </button>
        </form>

        <div className="mt-4 text-sm dark:text-slate-400">
          Don&apos;t have an account?{" "}
          <a className="underline text-indigo-600 dark:text-indigo-400" href={`/signup?next=${encodeURIComponent(nextUrl)}`}>
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
