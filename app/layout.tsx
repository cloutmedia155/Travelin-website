import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Travel & LIV Collective — Go somewhere new",
  description: "Personally hosted group trips with Olivia Owen. Thoughtfully planned days, 4–5-star stays, and people who are up for it.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
