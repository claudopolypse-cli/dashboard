import type { Metadata } from "next";
import { DashboardProviders } from "@/components/dashboard/DashboardProviders";

export const metadata: Metadata = {
  title: "Terminal — Claudopolypse",
  description: "Claudopolypse Trading Terminal — Trade Solana at terminal speed.",
  openGraph: {
    title: "Claudopolypse Terminal — Trade Solana at Terminal Speed",
    description: "Live candlestick charts, Jupiter quotes, real-time prices, and simulated trading for Solana.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claudopolypse Terminal",
    description: "Trade Solana at terminal speed.",
  },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardProviders>{children}</DashboardProviders>;
}
