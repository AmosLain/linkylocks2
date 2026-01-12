"use client";

import { useSearchParams } from "next/navigation";

export default function SignupClient() {
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get("next") || searchParams.get("redirect") || "/app";

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-xl border p-6">
        <h1 className="text-xl font-semibold">Sign up</h1>

        {/* Put your existing signup form/buttons here */}
        <p className="mt-2 text-sm opacity-80">
          After signup you’ll be sent to: <span className="font-mono">{nextUrl}</span>
        </p>
      </div>
    </div>
  );
}
