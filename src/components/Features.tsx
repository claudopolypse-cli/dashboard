"use client";

import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

const features = [
  { icon: "⚡", title: "Lightning Execution", desc: "Sub-second order routing optimized for Solana's block times. Your trades land before the crowd even clicks." },
  { icon: "◎", title: "Low-Fee Flow", desc: "Minimal transaction overhead. Keep more of every winning trade with optimized fee structures and smart batching." },
  { icon: "▣", title: "Pro Trader Interface", desc: "Dense, information-rich panels designed for decision speed. Every pixel earns its place on your screen." },
  { icon: "◉", title: "Real-Time Monitoring", desc: "Live market streams, depth charts, and flow analysis. See the market breathe in real time." },
  { icon: "⬡", title: "Smart Routing", desc: "Intelligent order routing across Solana DEXes. Best price, best path, zero compromise." },
  { icon: "◈", title: "Wallet-Native", desc: "Connect your Solana wallet and trade. No deposits, no custody risk. Your keys, your speed." },
];

function FeatureCard({ icon, title, desc, wide = false }: { icon: string; title: string; desc: string; wide?: boolean }) {
  return (
    <div
      className={`group relative overflow-hidden bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-8 transition-all duration-400 hover:border-[var(--orange)] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(232,114,42,0.07),0_10px_40px_rgba(0,0,0,0.25)] ${
        wide ? "col-span-1 sm:col-span-2 lg:col-span-3" : ""
      }`}
    >
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--orange)] to-[var(--amber)] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

      {wide ? (
        <div className="flex items-start gap-5">
          <div className="w-12 h-12 rounded-[10px] flex items-center justify-center text-xl shrink-0 bg-[rgba(232,114,42,0.06)] border border-[rgba(232,114,42,0.1)]">
            {icon}
          </div>
          <div>
            <h3 className="text-[1.05rem] font-bold mb-2.5 tracking-tight">{title}</h3>
            <p className="text-[var(--text2)] text-sm leading-relaxed">{desc}</p>
          </div>
        </div>
      ) : (
        <>
          <div className="w-12 h-12 rounded-[10px] flex items-center justify-center text-xl mb-5 bg-[rgba(232,114,42,0.06)] border border-[rgba(232,114,42,0.1)]">
            {icon}
          </div>
          <h3 className="text-[1.05rem] font-bold mb-2.5 tracking-tight">{title}</h3>
          <p className="text-[var(--text2)] text-sm leading-relaxed">{desc}</p>
        </>
      )}
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="pt-[120px] pb-[100px] relative">
      <div className="max-w-[1240px] mx-auto px-6">
        <Reveal className="text-center max-w-[600px] mx-auto mb-14">
          <SectionLabel center>Features</SectionLabel>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.6rem)] font-extrabold tracking-tight mb-3.5">
            Every Edge. <span className="gradient-text">Every Millisecond.</span>
          </h2>
          <p className="text-[var(--text2)] text-[1.05rem] leading-relaxed">
            Seven weapons forged for traders who refuse to lose.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.07}>
              <FeatureCard {...f} />
            </Reveal>
          ))}
          <Reveal delay={0.5} className="col-span-1 sm:col-span-2 lg:col-span-3">
            <FeatureCard
              icon="⌖"
              title="Watchlists, Alerts & Sniper Mode"
              desc="Custom watchlists with real-time alerts. Set your targets, configure sniper workflows, and strike the moment opportunity appears. Built for traders who wait patiently — then move lethally."
              wide
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
