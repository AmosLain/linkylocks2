import { Suspense } from "react";
import NotYetAvailableClient from "./not-yet-available.client";

export default function NotYetAvailablePage() {
  return (
    <main style={{ padding: 24, maxWidth: 720, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>
        Not yet available
      </h1>

      <p style={{ marginBottom: 16 }}>
        This link is scheduled to be revealed later.
      </p>

      <Suspense fallback={<p>Loading…</p>}>
        <NotYetAvailableClient />
      </Suspense>
    </main>
  );
}
