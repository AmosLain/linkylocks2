"use client";

import { useSearchParams } from "next/navigation";

export default function NotYetAvailableClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  return (
    <div style={{ marginTop: 12 }}>
      {token ? (
        <p style={{ opacity: 0.9 }}>
          Token: <code>{token}</code>
        </p>
      ) : (
        <p style={{ opacity: 0.9 }}>
          Missing token in URL. (Expected <code>?token=...</code>)
        </p>
      )}
    </div>
  );
}
