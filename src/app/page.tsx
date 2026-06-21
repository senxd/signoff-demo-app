import Link from "next/link";

export default function Home() {
  return (
    <main style={{ margin: "0 auto", maxWidth: 960, padding: 32 }}>
      <p style={{ color: "#536075", fontSize: 14, fontWeight: 700, margin: 0 }}>Signoff Demo App</p>
      <h1 style={{ fontSize: 44, letterSpacing: 0, lineHeight: 1.05, margin: "12px 0" }}>
        A clean fixture for verified software delivery.
      </h1>
      <p style={{ color: "#536075", fontSize: 18, lineHeight: 1.6, margin: "0 0 24px" }}>
        This public Next.js app gives Signoff a small, deterministic target for pull requests,
        previews, and Browserbase verification.
      </p>
      <Link
        href="/watchlist"
        style={{
          background: "#172033",
          borderRadius: 8,
          color: "white",
          display: "inline-flex",
          fontWeight: 700,
          padding: "12px 16px",
        }}
      >
        Open Watchlist
      </Link>
    </main>
  );
}

