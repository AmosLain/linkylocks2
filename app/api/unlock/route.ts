import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json({ error: "Missing token or password." }, { status: 400 });
    }

    const supabase = await createClient();

    const { data: link, error } = await supabase
      .from("links")
      .select("target_url, password, is_active, expires_at, max_clicks, click_count")
      .eq("token", token)
      .single();

    if (error || !link) {
      return NextResponse.json({ error: "Link not found." }, { status: 404 });
    }

    if (!link.is_active) {
      return NextResponse.json({ error: "This link has expired." }, { status: 410 });
    }

    if (link.expires_at) {
      const expiresAt = new Date(link.expires_at);
      if (!isNaN(expiresAt.getTime()) && Date.now() > expiresAt.getTime()) {
        await supabase.from("links").update({ is_active: false }).eq("token", token);
        return NextResponse.json({ error: "This link has expired." }, { status: 410 });
      }
    }

    if (link.password !== password) {
      return NextResponse.json({ error: "Wrong password." }, { status: 401 });
    }

    // Password is correct — increment click count
    if (typeof link.max_clicks === "number" && link.max_clicks > 0) {
      const clickCount = Number(link.click_count || 0);
      const newCount = clickCount + 1;
      const updates: Record<string, unknown> = { click_count: newCount };
      if (newCount >= link.max_clicks) {
        updates.is_active = false;
      }
      await supabase.from("links").update(updates).eq("token", token);
    }

    return NextResponse.json({ url: link.target_url });
  } catch (e: any) {
    return NextResponse.json(
      { error: "Server error", details: e?.message ?? String(e) },
      { status: 500 }
    );
  }
}
