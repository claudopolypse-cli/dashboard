"use client";

import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

const quotes = [
  {
    text: "Finally a terminal that feels like it was built by someone who actually trades. The speed difference is night and day.",
    name: "degenX",
    handle: "@degenx_sol",
    initials: "DX",
  },
  {
    text: "I switched from three different tools to Claudopolypse. One screen, everything I need. My execution times dropped significantly.",
    name: "solKing",
    handle: "@solking_trades",
    initials: "SK",
  },
  {
    text: "The sniper mode is insane. Set my targets, walk away, come back to filled orders. This is how trading should work.",
    name: "nightVault",
    handle: "@nightvault_",
    initials: "NV",
  },
];

const badges = [
  "🔥 Early Access",
  "⚡ Power User",
  "◈ Genesis Member",
  "◉ Sniper Elite",
  "▣ Terminal OG",
];

export default function Community() {
  return (
    <section id="community" className="py-[100px] text-center">
      <div className="max-w-[1240px] mx-auto px-6">
        <Reveal className="mb-12">
          <SectionLabel center>Community</SectionLabel>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.6rem)] font-extrabold tracking-tight mb-3.5">
            Built for the Next Wave of <span className="gradient-text">Solana Traders.</span>
          </h2>
          <p className="text-[var(--text2)] text-[1.05rem] max-w-[500px] mx-auto">
            Early adopters who refuse to settle for slow, bloated interfaces.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
          {quotes.map((q, i) => (
            <Reveal key={q.name} delay={i * 0.1}>
              <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-7 transition-all duration-300 hover:border-[var(--orange)] hover:-translate-y-1">
                <p className="text-[var(--text2)] text-[0.9rem] leading-relaxed mb-4 italic">
                  &ldquo;{q.text}&rdquo;
                </p>
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--orange)] to-[var(--amber)] flex items-center justify-center font-mono text-[0.7rem] font-bold text-[#0c0a08]">
                    {q.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-[0.85rem]">{q.name}</div>
                    <div className="font-mono text-[0.7rem] text-[var(--text3)]">{q.handle}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="flex gap-3 justify-center mt-10 flex-wrap">
          {badges.map((b) => (
            <span
              key={b}
              className="px-4 py-2 rounded-md font-mono text-[0.72rem] bg-[rgba(232,114,42,0.05)] border border-[rgba(232,114,42,0.12)] text-[var(--accent)] tracking-wider"
            >
              {b}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
