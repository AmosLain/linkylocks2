import { Suspense } from "react";
import SignupClient from "./SignupClient";

export const dynamic = "force-dynamic";

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading…</div>}>
      <SignupClient />
    </Suspense>
  );
}
