"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";

export type DashTab = "TRADE" | "PORTFOLIO" | "SNIPER" | "ANALYTICS";

interface Props {
  activeTab: DashTab;
  onTabChange: (t: DashTab) => void;
}

const TABS: DashTab[] = ["TRADE", "PORTFOLIO", "SNIPER", "ANALYTICS"];

function shortenAddr(addr: string) {
  return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
}

export default function TopBar({ activeTab, onTabChange }: Props) {
  const { publicKey, disconnect, connecting } = useWallet();
  const { setVisible } = useWalletModal();

  return (
    <header className="flex items-center justify-between px-4 py-0 h-11 bg-[#110e0a] border-b border-[#2a2018] shrink-0">
      {/* Left: Logo + Tabs */}
      <div className="flex items-center gap-0">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 mr-5 no-underline group"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.jpeg" alt="Claudopolypse" className="w-7 h-7 rounded object-cover" />
          <span className="font-mono text-[0.72rem] font-bold text-[#f0e6dc] tracking-wider group-hover:text-[#f0923a] transition-colors">
            CLAUDOPOLYPSE
          </span>
        </Link>

        {/* Tabs */}
        <div className="flex h-11">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`px-4 h-full font-mono text-[0.65rem] tracking-wider transition-colors cursor-pointer border-b-2 border-x-0 border-t-0 ${
                activeTab === tab
                  ? "text-[#f0923a] border-b-[#e8722a] bg-[rgba(232,114,42,0.05)]"
                  : "text-[#6b5c50] border-b-transparent hover:text-[#a89888]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Right: Status + Wallet */}
      <div className="flex items-center gap-3">
        {/* Network status */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[rgba(34,197,94,0.06)] border border-[rgba(34,197,94,0.12)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
          <span className="font-mono text-[0.58rem] text-[#22c55e] tracking-wider">MAINNET</span>
        </div>

        {/* Wallet button */}
        {publicKey ? (
          <div className="flex items-center gap-0 rounded border border-[#2a2018] overflow-hidden">
            <div className="px-3 py-1.5 font-mono text-[0.62rem] text-[#a89888]">
              {shortenAddr(publicKey.toBase58())}
            </div>
            <button
              onClick={disconnect}
              className="px-2.5 py-1.5 font-mono text-[0.58rem] text-[#6b5c50] hover:text-[#ef4444] hover:bg-[rgba(239,68,68,0.06)] transition-colors cursor-pointer border-l border-[#2a2018]"
            >
              DISCONNECT
            </button>
          </div>
        ) : (
          <button
            onClick={() => setVisible(true)}
            disabled={connecting}
            className="px-4 py-1.5 rounded font-mono text-[0.65rem] font-semibold tracking-wider bg-gradient-to-br from-[#e8722a] to-[#f59e0b] text-[#0c0a08] hover:brightness-110 transition-all cursor-pointer disabled:opacity-50 border-none"
          >
            {connecting ? "CONNECTING..." : "CONNECT WALLET"}
          </button>
        )}
      </div>
    </header>
  );
}
