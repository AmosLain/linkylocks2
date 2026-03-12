import { NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Use service role client to bypass RLS — visitors are not link owners,
// so anon-key updates get silently blocked by row-level security.
function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createSupabaseClient(url, key);
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const supabase = createServiceClient();

    const { data: link, error } = await supabase
      .from("links")
      .select("*")
      .eq("token", token)
      .single();

    if (error || !link) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    if (link.is_active === false) {
      return NextResponse.redirect(new URL("/expired", request.url));
    }

    if (link.expires_at) {
      const expiresAt = new Date(link.expires_at);
      if (!isNaN(expiresAt.getTime()) && Date.now() > expiresAt.getTime()) {
        await supabase.from("links").update({ is_active: false }).eq("token", token);
        return NextResponse.redirect(new URL("/expired", request.url));
      }
    }

    if (link.reveal_at) {
      const revealAt = new Date(link.reveal_at);
      if (!isNaN(revealAt.getTime()) && Date.now() < revealAt.getTime()) {
        return NextResponse.redirect(
          new URL(`/not-yet-available?token=${encodeURIComponent(token)}`, request.url)
        );
      }
    }

    if (link.password) {
      return NextResponse.redirect(
        new URL(`/password?token=${encodeURIComponent(token)}`, request.url)
      );
    }

    // Always increment click count
    const clickCount = Number(link.click_count || 0);
    const newCount = clickCount + 1;
    const updates: Record<string, unknown> = { click_count: newCount };

    // Check if link should expire by click count
    if (typeof link.max_clicks === "number" && link.max_clicks > 0) {
      if (clickCount >= link.max_clicks) {
        await supabase.from("links").update({ is_active: false }).eq("token", token);
        return NextResponse.redirect(new URL("/expired", request.url));
      }
      if (newCount >= link.max_clicks) {
        updates.is_active = false;
      }
    }

    await supabase.from("links").update(updates).eq("token", token);

    const targetUrl = link.target_url as string | null;
    if (!targetUrl) {
      return NextResponse.json({ error: "Missing target_url" }, { status: 500 });
    }

    return NextResponse.redirect(targetUrl);
  } catch (e: any) {
    return NextResponse.json(
      { error: "Server error", details: e?.message ?? String(e) },
      { status: 500 }
    );
  }
}
