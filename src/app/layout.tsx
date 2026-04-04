import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  icons: {
    icon: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
  title: "Claudopolypse App — Trade Solana at Terminal Speed",
  description:
    "The fastest Solana trading terminal. Ultra-fast execution, low-fee trading, pro-grade interface. Built for serious traders.",
  keywords: [
    "Solana",
    "trading terminal",
    "DeFi",
    "DEX",
    "crypto trading",
    "Claudopolypse",
  ],
  openGraph: {
    title: "Claudopolypse App — Trade Solana at Terminal Speed",
    description: "Ultra-fast Solana trading terminal for serious traders.",
    type: "website",
    images: ["/banner.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Claudopolypse App",
    description: "Trade Solana at terminal speed.",
    images: ["/banner.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{children}</body>
    </html>
  );
}
