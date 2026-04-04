"use client";

import Reveal from "./Reveal";

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function TerminalMockup() {
  const rows = [
    { pair: "SOL/USDC", price: "$187.42", change: "+12.4%", vol: "$2.1B", up: true },
    { pair: "JUP/USDC", price: "$1.84", change: "+8.7%", vol: "$340M", up: true },
    { pair: "RAY/USDC", price: "$6.21", change: "-3.2%", vol: "$89M", up: false },
    { pair: "BONK/USDC", price: "$0.000034", change: "+42.1%", vol: "$520M", up: true },
    { pair: "WIF/USDC", price: "$2.67", change: "+18.9%", vol: "$415M", up: true },
  ];

  return (
    <div className="relative bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden shadow-[var(--glow),0_20px_60px_rgba(0,0,0,0.4)] animate-float">
      {/* Scanline */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent animate-scanline opacity-15 z-10" />

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--bg2)] border-b border-[var(--border)]">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="font-mono text-[0.7rem] text-[var(--text3)] tracking-wider">
          CLAUDOPOLYPSE TERMINAL v2.1
        </span>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded font-mono text-[0.55rem] bg-[rgba(232,114,42,0.07)] border border-[rgba(232,114,42,0.16)] text-[var(--accent)] tracking-wider uppercase">
          LIVE
        </span>
      </div>

      {/* Body */}
      <div className="p-4">
        {/* Chart */}
        <div className="h-[180px] relative border-b border-[var(--border)] mb-3 pb-3">
          <svg viewBox="0 0 500 180" preserveAspectRatio="none" className="w-full h-full">
            <defs>
              <linearGradient id="cGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f0923a" stopOpacity=".4" />
                <stop offset="100%" stopColor="#f0923a" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[45, 90, 135].map((y) => (
              <line key={y} x1="0" y1={y} x2="500" y2={y} className="chart-grid" />
            ))}
            <path d="M0,140 Q30,130 60,125 T120,100 T180,110 T240,70 T300,85 T360,45 T420,55 T480,30 L500,25" className="chart-line" />
            <path d="M0,140 Q30,130 60,125 T120,100 T180,110 T240,70 T300,85 T360,45 T420,55 T480,30 L500,25 L500,180 L0,180 Z" className="chart-fill" />
          </svg>
        </div>

        {/* Order rows */}
        <div className="grid grid-cols-4 gap-2 py-1.5 border-b border-white/[0.02] font-mono text-[0.6rem] tracking-wider uppercase text-[var(--text3)]">
          <span>PAIR</span><span>PRICE</span><span>24H</span><span>VOL</span>
        </div>
        {rows.map((r) => (
          <div key={r.pair} className="grid grid-cols-4 gap-2 py-1.5 border-b border-white/[0.02] font-mono text-[0.65rem]">
            <span className="c-white">{r.pair}</span>
            <span className={r.up ? "c-green" : "c-red"}>{r.price}</span>
            <span className={r.up ? "c-green" : "c-red"}>{r.change}</span>
            <span className="c-white">{r.vol}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-[120px] pb-20 relative overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial glows */}
      <div className="absolute -top-[200px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-[radial-gradient(circle,rgba(232,114,42,0.06)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute -bottom-[300px] -right-[200px] w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(245,158,11,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div className="max-w-[580px] lg:max-w-none">
            <Reveal delay={0.05}>
              <div className="mb-6 flex lg:justify-start justify-center">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded font-mono text-[0.72rem] bg-[rgba(232,114,42,0.07)] border border-[rgba(232,114,42,0.16)] text-[var(--accent)] tracking-wider uppercase">
                  ⚡ Solana-Native Trading Terminal
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <h1 className="text-[clamp(2.6rem,5.5vw,4.2rem)] font-black leading-[1.05] tracking-tight mb-5 text-center lg:text-left">
                <span className="gradient-text">Execute. Dominate.</span>
                <br />
                No Mercy.
              </h1>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="text-lg leading-relaxed text-[var(--text2)] mb-9 max-w-[460px] mx-auto lg:mx-0 text-center lg:text-left">
                Trade Solana at <strong className="text-[var(--text1)] font-semibold">terminal speed</strong> with
                ultra-low friction. Built for traders who move first and think in milliseconds.
              </p>
            </Reveal>

            <Reveal delay={0.35}>
              <div className="flex gap-3.5 flex-wrap justify-center lg:justify-start">
                <a
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-[0.95rem] bg-gradient-to-br from-[var(--orange)] to-[var(--accent-bright)] text-[#0c0a08] shadow-[0_0_30px_rgba(232,114,42,0.2),0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_50px_rgba(232,114,42,0.3),0_4px_30px_rgba(0,0,0,0.6)] hover:-translate-y-0.5 hover:brightness-110 transition-all no-underline"
                >
                  <ArrowIcon /> Launch App
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-[0.95rem] bg-transparent text-[var(--text1)] border border-[var(--border)] backdrop-blur-lg hover:border-[var(--orange)] hover:shadow-[0_0_20px_rgba(232,114,42,0.09)] hover:-translate-y-0.5 transition-all no-underline"
                >
                  Join Waitlist
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right — Terminal */}
          <div className="hidden lg:block">
            <TerminalMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
