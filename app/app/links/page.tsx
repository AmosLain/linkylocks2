"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import {
  Copy,
  ExternalLink,
  Plus,
  RefreshCw,
  Link as LinkIcon,
  Clock,
  MousePointerClick,
  ShieldCheck,
  Shield
} from "lucide-react";

type LinkRow = {
  id?: string;
  token: string;
  label?: string | null;
  target_url: string;
  is_active?: boolean | null;
  created_at?: string | null;

  expires_at?: string | null;
  reveal_at?: string | null;

  max_clicks?: number | null;
  click_count?: number | null;

  user_id?: string | null;
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function formatDateTime(value?: string | null) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleString();
}

function isExpired(link: LinkRow) {
  if (link.is_active === false) return true;

  if (link.expires_at) {
    const expiresAt = new Date(link.expires_at);
    if (!Number.isNaN(expiresAt.getTime()) && Date.now() > expiresAt.getTime()) return true;
  }

  if (typeof link.max_clicks === "number" && link.max_clicks > 0) {
    const clicks = Number(link.click_count || 0);
    if (clicks >= link.max_clicks) return true;
  }

  return false;
}

function isNotYetAvailable(link: LinkRow) {
  if (!link.reveal_at) return false;
  const revealAt = new Date(link.reveal_at);
  if (Number.isNaN(revealAt.getTime())) return false;
  return Date.now() < revealAt.getTime();
}

export default function LinksPage() {
  const router = useRouter();

  const supabase = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    return createSupabaseClient(url, key);
  }, []);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [links, setLinks] = useState<LinkRow[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  async function loadLinks(isRefresh = false) {
    setError(null);
    isRefresh ? setRefreshing(true) : setLoading(true);

    try {
      // ✅ Use getSession first (no scary "Auth session missing!" error)
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData?.session;

      if (!session?.user) {
        router.push("/login");
        return;
      }

      const user = session.user;
      setUserEmail(user.email ?? null);

      // Fetch user links (assumes links.user_id exists)
      const { data, error: linksErr } = await supabase
        .from("links")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (linksErr) throw linksErr;

      setLinks((data as LinkRow[]) ?? []);
    } catch (e: any) {
      // If anything auth-ish happens, just redirect to login
      const msg = e?.message ?? String(e);
      if (msg.toLowerCase().includes("auth session missing")) {
        router.push("/login");
        return;
      }
      setError(msg);
    } finally {
      isRefresh ? setRefreshing(false) : setLoading(false);
    }
  }

  useEffect(() => {
    loadLinks(false);

    // Optional: if user logs in/out in another tab, keep UI correct
    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      loadLinks(true);
    });

    return () => {
      sub.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function copyShortUrl(token: string) {
    const url = `${window.location.origin}/l/${token}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-sm">
              <LinkIcon className="h-5 w-5" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold text-slate-900">Your Links</h1>
                <span className="inline-flex items-center gap-1 rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 text-xs font-medium text-violet-700">
                  <Shield className="h-3.5 w-3.5" />
                  Free plan
                </span>
              </div>

              <p className="text-sm text-slate-600">
                Manage secure links that expire by time or clicks.
                {userEmail ? <span className="ml-2 text-slate-400">({userEmail})</span> : null}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => loadLinks(true)}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition",
                "hover:bg-slate-50 active:scale-[0.99]",
                refreshing && "opacity-70"
              )}
              disabled={refreshing}
              title="Refresh"
            >
              <RefreshCw className={cn("h-4 w-4", refreshing && "animate-spin")} />
              Refresh
            </button>

            <button
              onClick={() => router.push("/app/new")}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 active:scale-[0.99]"
            >
              <Plus className="h-4 w-4" />
              New link
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-6">
        {error ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-800">
            <div className="font-semibold">Something went wrong</div>
            <div className="mt-1 text-sm">{error}</div>
            <div className="mt-3">
              <button
                onClick={() => loadLinks(true)}
                className="rounded-xl bg-rose-600 px-3 py-2 text-sm font-semibold text-white hover:bg-rose-700"
              >
                Try again
              </button>
            </div>
          </div>
        ) : null}

        {loading ? (
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="h-4 w-48 animate-pulse rounded bg-slate-100" />
                <div className="mt-3 h-3 w-full animate-pulse rounded bg-slate-100" />
                <div className="mt-2 h-3 w-3/4 animate-pulse rounded bg-slate-100" />
                <div className="mt-4 flex gap-2">
                  <div className="h-9 w-28 animate-pulse rounded-xl bg-slate-100" />
                  <div className="h-9 w-28 animate-pulse rounded-xl bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {!loading && !error && links.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-700">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-slate-900">No links yet</h2>
            <p className="mt-2 text-slate-600">Create your first secure link in seconds.</p>
            <button
              onClick={() => router.push("/app/new")}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-700"
            >
              <Plus className="h-4 w-4" />
              Create secure link
            </button>
          </div>
        ) : null}

        {!loading && !error && links.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {links.map((link) => {
              const expired = isExpired(link);
              const notYet = isNotYetAvailable(link);

              return (
                <div
                  key={link.token}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate text-base font-semibold text-slate-900">
                          {link.label?.trim() ? link.label : `Link ${link.token}`}
                        </h3>

                        {expired ? (
                          <span className="rounded-full border border-slate-200 bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                            Expired
                          </span>
                        ) : notYet ? (
                          <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-800">
                            Scheduled
                          </span>
                        ) : (
                          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-800">
                            Active
                          </span>
                        )}
                      </div>

                      <p className="mt-1 truncate text-sm text-slate-600">
                        <span className="font-medium text-slate-700">To:</span>{" "}
                        {link.target_url}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-600">
                        <span className="inline-flex items-center gap-1">
                          <MousePointerClick className="h-3.5 w-3.5" />
                          {typeof link.max_clicks === "number" && link.max_clicks > 0
                            ? `${Number(link.click_count || 0)}/${link.max_clicks} clicks`
                            : `${Number(link.click_count || 0)} clicks`}
                        </span>

                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {link.expires_at ? `Expires: ${formatDateTime(link.expires_at)}` : "No expiry"}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 rounded-xl bg-slate-50 px-2 py-1 text-xs font-mono text-slate-700">
                      {link.token}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => copyShortUrl(link.token)}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 active:scale-[0.99]"
                      title="Copy short link"
                    >
                      <Copy className="h-4 w-4" />
                      Copy
                    </button>

                    <a
                      href={`/l/${link.token}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 active:scale-[0.99]"
                      title="Open short link"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Open
                    </a>

                    <a
                      href={link.target_url}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-auto inline-flex items-center gap-2 rounded-xl bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-700 active:scale-[0.99]"
                      title="Open destination"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Destination
                    </a>
                  </div>

                  {notYet && link.reveal_at ? (
                    <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
                      Scheduled reveal:{" "}
                      <span className="font-medium">{formatDateTime(link.reveal_at)}</span>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        ) : null}

        {!loading && !error ? (
          <div className="mt-8 text-center text-xs text-slate-500">
            Tip: Free plan defaults to <span className="font-medium text-slate-700">3 clicks</span>.
          </div>
        ) : null}
      </div>
    </div>
  );
}
