"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

function getSupabaseKey() {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    ""
  );
}

export default function SignupClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const nextUrl = useMemo(() => {
    return searchParams.get("next") || searchParams.get("redirect") || "/app";
  }, [searchParams]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

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

    if (password !== confirmPassword) {
      setMsg("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setMsg("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}${nextUrl}`,
        },
      });

      if (error) {
        setMsg(error.message);
        return;
      }

      setSuccess(true);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-xl border p-6 text-center">
          <h1 className="text-xl font-semibold">Check your email</h1>
          <p className="mt-3 text-sm opacity-80">
            We sent a confirmation link to <strong>{email}</strong>.<br />
            Click the link in the email to activate your account.
          </p>
          <a
            href="/login"
            className="mt-6 inline-block rounded-md border px-4 py-2 text-sm"
          >
            Go to login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-xl border p-6">
        <h1 className="text-xl font-semibold">Sign up</h1>

        {msg ? (
          <div className="mt-4 rounded-md border p-3 text-sm text-red-700 bg-red-50 border-red-200">
            {msg}
          </div>
        ) : null}

        <form className="mt-6 space-y-3" onSubmit={onSubmit}>
          <div className="space-y-1">
            <label className="text-sm">Email</label>
            <input
              className="w-full rounded-md border px-3 py-2 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              type="email"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm">Password</label>
            <input
              className="w-full rounded-md border px-3 py-2 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              type="password"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm">Confirm Password</label>
            <input
              className="w-full rounded-md border px-3 py-2 text-sm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              type="password"
              required
            />
          </div>

          <button
            className="w-full rounded-md border px-4 py-2 text-sm bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
            disabled={loading}
            type="submit"
          >
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>

        <div className="mt-4 text-sm">
          Already have an account?{" "}
          <a className="underline" href={`/login?next=${encodeURIComponent(nextUrl)}`}>
            Log in
          </a>
        </div>
      </div>
    </div>
  );
}
