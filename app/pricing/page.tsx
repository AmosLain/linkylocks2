export const metadata = {
  title: "LinkyLocks Pricing",
};

export default function PricingPage() {
  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: 40 }}>
      <h1>LinkyLocks Pricing</h1>

      <h2>Premium</h2>
      <p>
        <strong>$7 / month</strong>
      </p>

      <ul>
        <li>Unlimited protected links</li>
        <li>Password-protected links</li>
        <li>Expiration by date or clicks</li>
        <li>Advanced access controls</li>
      </ul>

      <p>
        Payments are securely processed by Paddle.
      </p>
    </main>
  );
}
