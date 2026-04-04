"use client";

import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

export default function FinalCTA() {
  return (
    <section id="cta" className="text-center py-[120px] relative overflow-hidden">
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(232,114,42,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        <Reveal>
          <SectionLabel center>Ready?</SectionLabel>
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-black tracking-tight mb-4">
            Enter the <span className="gradient-text">Claudopolypse.</span>
          </h2>
          <p className="text-[var(--text2)] text-[1.1rem] mb-9 max-w-[460px] mx-auto">
            The market doesn&apos;t wait. Neither should you. Get early access to the fastest Solana trading terminal
            ever built.
          </p>
          <div className="flex gap-3.5 justify-center flex-wrap">
            <a
              href="/dashboard"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-lg font-semibold text-base bg-gradient-to-br from-[var(--orange)] to-[var(--accent-bright)] text-[#0c0a08] shadow-[0_0_30px_rgba(232,114,42,0.2),0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_50px_rgba(232,114,42,0.3),0_4px_30px_rgba(0,0,0,0.6)] hover:-translate-y-0.5 hover:brightness-110 transition-all no-underline"
            >
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Launch App
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-lg font-semibold text-base bg-transparent text-[var(--text1)] border border-[var(--border)] backdrop-blur-lg hover:border-[var(--orange)] hover:shadow-[0_0_20px_rgba(232,114,42,0.09)] hover:-translate-y-0.5 transition-all no-underline"
            >
              Get Early Access
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
