export const metadata = {
  title: "LinkyLocks Terms of Service",
};

export default function TermsPage() {
  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: 40 }}>
      <h1>Terms of Service</h1>

      <p>
        LinkyLocks is a link management and access control service.
        By using the service, you agree to these terms.
      </p>

      <p>
        Users are solely responsible for the links they create, share,
        and manage using LinkyLocks.
      </p>

      <p>
        The service is provided “as is” without warranties of any kind.
        We do not guarantee uninterrupted or error-free operation.
      </p>

      <p>
        We reserve the right to suspend or terminate accounts that abuse
        the service or violate applicable laws.
      </p>

      <p>
        Subscriptions and payments are handled by Paddle, our payment processor.
      </p>

      <p>
        For questions or support, contact us at:
        <br />
        <strong>support@linkylocks.app</strong>
      </p>
    </main>
  );
}
