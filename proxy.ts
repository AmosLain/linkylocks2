import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

function clearSupabaseCookies(req: NextRequest, res: NextResponse) {
  for (const c of req.cookies.getAll()) {
    const name = c.name || "";
    const lower = name.toLowerCase();
    if (lower.startsWith("sb-") || lower.includes("supabase") || lower.includes("auth")) {
      res.cookies.set(name, "", { path: "/", maxAge: 0 });
    }
  }
}

export default async function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const pathname = url.pathname;

  // We only want to enforce auth rules on these routes:
  const isProtected = pathname.startsWith("/app");
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  // If it’s not relevant, just pass through fast.
  if (!isProtected && !isAuthPage) {
    return NextResponse.next();
  }

  const res = NextResponse.next();

  // IMPORTANT: env vars must exist
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If env missing, don’t crash the whole app; just pass through.
  // (Your Vercel build would fail anyway if missing, so this is mainly for local safety.)
  if (!supabaseUrl || !supabaseAnon) {
    return res;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnon, {
    cookies: {
      getAll() {
        return req.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          res.cookies.set(name, value, options);
        });
      },
    },
  });

  const { data, error } = await supabase.auth.getUser();
  const user = data?.user ?? null;

  // If refresh token is invalid/missing, wipe cookies once and treat as signed-out
  if (error) {
    clearSupabaseCookies(req, res);

    if (isProtected) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/login";
      loginUrl.searchParams.set("next", pathname + url.search);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protect /app/*
  if (isProtected && !user) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", pathname + url.search);
    return NextResponse.redirect(loginUrl);
  }

  // If logged in, keep them out of /login and /signup
  if (isAuthPage && user) {
    const appUrl = req.nextUrl.clone();
    appUrl.pathname = "/app";
    appUrl.search = "";
    return NextResponse.redirect(appUrl);
  }

  return res;
}

export const config = {
  matcher: ["/app/:path*", "/login", "/signup"],
};
