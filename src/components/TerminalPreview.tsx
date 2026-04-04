"use client";

import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

const pairs = [
  { name: "SOL/USDC", price: "$187.42", change: "+12.4%", up: true, active: true },
  { name: "JUP/USDC", price: "$1.84", change: "+8.7%", up: true },
  { name: "RAY/USDC", price: "$6.21", change: "-3.2%", up: false },
  { name: "BONK/USD", price: "$0.000034", change: "+42.1%", up: true },
  { name: "WIF/USDC", price: "$2.67", change: "+18.9%", up: true },
  { name: "PYTH/USDC", price: "$0.42", change: "-1.8%", up: false },
  { name: "RNDR/USDC", price: "$9.14", change: "+5.3%", up: true },
];

const positions = [
  { pair: "SOL/USDC", side: "LONG", entry: "$172.30", pnl: "+$1,512.00", long: true },
  { pair: "JUP/USDC", side: "LONG", entry: "$1.62", pnl: "+$440.00", long: true },
  { pair: "RAY/USDC", side: "SHORT", entry: "$6.80", pnl: "+$295.00", long: false },
  { pair: "BONK/USD", side: "LONG", entry: "$0.000021", pnl: "+$3,198.00", long: true },
];

const activities = [
  { text: "BUY SOL 10.00 @ $187.42", status: "FILLED", cls: "c-green" },
  { text: "SELL RAY 500 @ $6.80", status: "FILLED", cls: "c-green" },
  { text: "BUY JUP 2000 @ $1.62", status: "FILLED", cls: "c-green" },
  { text: "BUY BONK 10M @ $0.021", status: "FILLED", cls: "c-green" },
  { text: "ALERT: WIF +15% in 1h", status: "TRIGGERED", cls: "c-orange" },
];

const bars: { x: number; y: number; h: number; up: boolean }[] = [
  { x: 20, y: 120, h: 40, up: false }, { x: 35, y: 110, h: 50, up: false },
  { x: 50, y: 100, h: 40, up: true }, { x: 65, y: 90, h: 50, up: true },
  { x: 80, y: 105, h: 35, up: false }, { x: 95, y: 85, h: 55, up: true },
  { x: 110, y: 75, h: 45, up: true }, { x: 125, y: 95, h: 30, up: false },
  { x: 140, y: 70, h: 50, up: true }, { x: 155, y: 60, h: 40, up: true },
  { x: 170, y: 80, h: 35, up: false }, { x: 185, y: 55, h: 55, up: true },
  { x: 200, y: 65, h: 30, up: false }, { x: 215, y: 45, h: 50, up: true },
  { x: 230, y: 50, h: 40, up: true }, { x: 245, y: 60, h: 30, up: false },
  { x: 260, y: 40, h: 50, up: true }, { x: 275, y: 55, h: 25, up: false },
  { x: 290, y: 35, h: 45, up: true }, { x: 305, y: 30, h: 40, up: true },
  { x: 320, y: 45, h: 30, up: false }, { x: 335, y: 25, h: 50, up: true },
  { x: 350, y: 35, h: 25, up: false }, { x: 365, y: 20, h: 40, up: true },
  { x: 380, y: 30, h: 30, up: true }, { x: 395, y: 25, h: 35, up: false },
  { x: 410, y: 15, h: 40, up: true }, { x: 425, y: 20, h: 25, up: false },
  { x: 440, y: 10, h: 35, up: true },
];

export default function TerminalPreview() {
  return (
    <section id="preview" className="py-[100px] overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6">
        <Reveal className="text-center max-w-[600px] mx-auto mb-12">
          <SectionLabel center>Terminal Preview</SectionLabel>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.6rem)] font-extrabold tracking-tight mb-3.5">
            Your <span className="gradient-text">Command Center.</span>
          </h2>
          <p className="text-[var(--text2)] text-[1.05rem]">
            One screen. Total market control. This is where execution happens.
          </p>
        </Reveal>

        <Reveal>
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[14px] overflow-hidden shadow-[var(--glow),0_30px_80px_rgba(0,0,0,0.5)]">
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 py-3 bg-[var(--bg2)] border-b border-[var(--border)]">
              <div className="flex">
                {["TRADE", "PORTFOLIO", "SNIPER", "ANALYTICS"].map((t, i) => (
                  <div
                    key={t}
                    className={`px-4 py-1.5 font-mono text-[0.7rem] tracking-wider rounded cursor-pointer ${
                      i === 0
                        ? "text-[var(--text1)] bg-[rgba(232,114,42,0.08)] border border-[rgba(232,114,42,0.16)]"
                        : "text-[var(--text3)] border border-transparent"
                    }`}
                  >
                    {t}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                <span className="font-mono text-[0.65rem] text-[var(--accent)] tracking-wider">
                  CONNECTED — MAINNET
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_280px] min-h-[400px]">
              {/* Sidebar */}
              <div className="border-b lg:border-b-0 lg:border-r border-[var(--border)] p-3">
                <div className="font-mono text-[0.6rem] text-[var(--text3)] tracking-[1.5px] uppercase mb-2.5 px-2">
                  Watchlist
                </div>
                {pairs.map((p) => (
                  <div
                    key={p.name}
                    className={`flex items-center justify-between px-2 py-2 rounded-md cursor-pointer transition-colors hover:bg-white/[0.02] ${
                      p.active ? "bg-[rgba(232,114,42,0.06)] border border-[rgba(232,114,42,0.1)]" : ""
                    }`}
                  >
                    <span className="font-mono text-[0.72rem] font-semibold text-[var(--text1)]">{p.name}</span>
                    <div className="text-right">
                      <span className="font-mono text-[0.72rem] text-[var(--accent)] font-medium">{p.price}</span>
                      <br />
                      <span className={`font-mono text-[0.6rem] ${p.up ? "c-green" : "c-red"}`}>{p.change}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Main chart + positions */}
              <div className="p-4 border-b lg:border-b-0 lg:border-r border-[var(--border)]">
                {/* Chart */}
                <div className="h-[200px] relative mb-4 border-b border-[var(--border)] pb-4">
                  <svg viewBox="0 0 480 200" preserveAspectRatio="none" className="w-full h-full">
                    {[50, 100, 150].map((y) => (
                      <line key={y} x1="0" y1={y} x2="480" y2={y} className="chart-grid" />
                    ))}
                    {bars.map((b, i) => (
                      <rect key={i} x={b.x} y={b.y} width="6" height={b.h} rx="1" fill={b.up ? "var(--accent)" : "var(--red)"} />
                    ))}
                    <line x1="0" y1="18" x2="480" y2="18" stroke="var(--accent)" strokeWidth=".5" strokeDasharray="4 4" opacity=".6" />
                    <text x="455" y="15" fontFamily="IBM Plex Mono" fontSize="7" fill="var(--accent)">$187.42</text>
                  </svg>
                </div>

                {/* Positions */}
                <div className="font-mono text-[0.6rem] text-[var(--text3)] tracking-[1.5px] uppercase mb-2.5">Open Positions</div>
                <div className="grid grid-cols-4 gap-2 py-2 border-b border-white/[0.02] font-mono text-[0.58rem] tracking-wider uppercase text-[var(--text3)]">
                  <span>PAIR</span><span>SIDE</span><span>ENTRY</span><span>PNL</span>
                </div>
                {positions.map((p) => (
                  <div key={p.pair + p.side} className="grid grid-cols-4 gap-2 py-2 border-b border-white/[0.02] font-mono text-[0.68rem]">
                    <span className="c-white">{p.pair}</span>
                    <span className={p.long ? "c-green" : "c-red"}>{p.side}</span>
                    <span className="c-white">{p.entry}</span>
                    <span className="c-green">{p.pnl}</span>
                  </div>
                ))}
              </div>

              {/* Right panel */}
              <div className="p-4">
                <div className="mb-5">
                  <div className="font-mono text-[0.6rem] text-[var(--text3)] tracking-[1.5px] uppercase mb-3">Quick Trade — SOL/USDC</div>
                  <input className="w-full px-3 py-2.5 bg-[var(--bg2)] border border-[var(--border)] rounded-md text-[var(--text1)] font-mono text-[0.75rem] mb-2 outline-none focus:border-[var(--orange)]" defaultValue="187.42" readOnly />
                  <input className="w-full px-3 py-2.5 bg-[var(--bg2)] border border-[var(--border)] rounded-md text-[var(--text1)] font-mono text-[0.75rem] mb-2 outline-none focus:border-[var(--orange)]" defaultValue="10.00" readOnly />
                  <input className="w-full px-3 py-2.5 bg-[var(--bg2)] border border-[var(--border)] rounded-md text-[var(--text1)] font-mono text-[0.75rem] mb-2 outline-none focus:border-[var(--orange)]" defaultValue="1,874.20" readOnly />
                  <button className="w-full py-3 rounded-md font-bold text-[0.85rem] mb-1.5 bg-gradient-to-br from-[var(--accent)] to-[var(--amber)] text-[#0c0a08] hover:-translate-y-0.5 hover:shadow-lg transition-all cursor-pointer border-none">
                    BUY / LONG
                  </button>
                  <button className="w-full py-3 rounded-md font-bold text-[0.85rem] bg-gradient-to-br from-[#ef4444] to-[#dc2626] text-white hover:-translate-y-0.5 hover:shadow-lg transition-all cursor-pointer border-none">
                    SELL / SHORT
                  </button>
                </div>
                <div>
                  <div className="font-mono text-[0.6rem] text-[var(--text3)] tracking-[1.5px] uppercase mb-3">Recent Activity</div>
                  {activities.map((a, i) => (
                    <div key={i} className="flex justify-between py-1.5 border-b border-white/[0.015] font-mono text-[0.62rem] text-[var(--text2)]">
                      <span>{a.text}</span>
                      <span className={a.cls}>{a.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
