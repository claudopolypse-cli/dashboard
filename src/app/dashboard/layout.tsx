import type { Metadata } from "next";
import { DashboardProviders } from "@/components/dashboard/DashboardProviders";

export const metadata: Metadata = {
  title: "Terminal — Claudopolypse",
  description: "Claudopolypse Trading Terminal — Trade Solana at terminal speed.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardProviders>{children}</DashboardProviders>;
}
