"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import ThemeToggle from "../components/ThemeToggle";

type User = {
  id: string;
  email?: string;
};

export default function DashboardPage() {
  const router = useRouter();

  const supabase = useMemo(() => createClient(), []);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (!mounted) return;

      if (error || !data.user) {
        return;
      }

      setUser({
        id: data.user.id,
        email: data.user.email ?? undefined,
      });
    };

    loadUser();

    return () => {
      mounted = false;
    };
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-6">
      <div className="mx-auto max-w-2xl">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-2xl font-bold text-indigo-700 dark:text-indigo-400">
              <Lock className="w-7 h-7" />
              <span>LinkyLocks Dashboard</span>
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-slate-200 hover:bg-gray-200 dark:hover:bg-slate-600 text-sm font-medium"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-gray-700 dark:text-slate-300">
              Logged in as:{" "}
              <span className="font-semibold">
                {user?.email ?? "Loading..."}
              </span>
            </p>

            <p className="text-gray-500 dark:text-slate-400">
              Manage your secure, expiring links from your links dashboard.
            </p>

            <a
              href="/app/links"
              className="inline-block mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium"
            >
              Go to My Links
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
