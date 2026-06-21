import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Signoff Demo App",
  description: "Public fixture app for verified delivery demos.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

