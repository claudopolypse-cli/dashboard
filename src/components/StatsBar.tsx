"use client";

import Reveal from "./Reveal";

const stats = [
  { icon: "⚡", label: "Execution", value: "Ultra-Fast", bg: "bg-[rgba(232,114,42,0.08)]", color: "text-[var(--orange)]" },
  { icon: "◎", label: "Network", value: "Low Friction", bg: "bg-[rgba(245,158,11,0.08)]", color: "text-[var(--amber)]" },
  { icon: "◈", label: "Built For", value: "Solana", bg: "bg-[rgba(232,114,42,0.08)]", color: "text-[var(--orange)]" },
  { icon: "▣", label: "Interface", value: "Pro-Grade", bg: "bg-[rgba(217,119,6,0.08)]", color: "text-[var(--warm)]" },
];

export default function StatsBar() {
  return (
    <section className="relative z-10 -mt-10 px-6">
      <div className="max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="flex items-center gap-3.5 px-6 py-7 border-b sm:border-b lg:border-b-0 lg:border-r border-[var(--border)] last:border-r-0 hover:bg-[var(--bg-card-hover)] transition-colors">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0 ${s.bg} ${s.color}`}>
                  {s.icon}
                </div>
                <div>
                  <div className="font-mono text-[0.72rem] text-[var(--text3)] uppercase tracking-[1.5px] mb-0.5">{s.label}</div>
                  <div className="text-[0.95rem] font-bold text-[var(--text1)]">{s.value}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
