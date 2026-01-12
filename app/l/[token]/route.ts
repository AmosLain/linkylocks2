import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const supabase = await createClient();

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

    if (typeof link.max_clicks === "number" && link.max_clicks > 0) {
      const clickCount = Number(link.click_count || 0);

      if (clickCount >= link.max_clicks) {
        await supabase.from("links").update({ is_active: false }).eq("token", token);
        return NextResponse.redirect(new URL("/expired", request.url));
      }

      await supabase
        .from("links")
        .update({ click_count: clickCount + 1 })
        .eq("token", token);
    }

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
