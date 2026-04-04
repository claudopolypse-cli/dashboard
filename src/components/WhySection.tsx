"use client";

import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

const points = [
  { n: "01", title: "Speed is the product", desc: "We didn't build a pretty frontend and bolt on trading. We built a trading engine and wrapped it in a terminal. Execution speed isn't a feature — it's the architecture." },
  { n: "02", title: "Action over decoration", desc: "Zero unnecessary animations. Zero marketing fluff in the UI. Every element exists to help you make decisions and execute. Nothing else survives the cut." },
  { n: "03", title: "Solana-native mindset", desc: "Not a multichain afterthought. Claudopolypse is built from the ground up for Solana's speed, Solana's ecosystem, and Solana's traders." },
  { n: "04", title: "Designed for the aggressive", desc: "Snipers, scalpers, degen rotators. If you trade with intent and urgency, this terminal was made for you. Everyone else can use the swap page." },
  { n: "05", title: "Information density, not noise", desc: "Pro terminals show you everything. Bad terminals overwhelm you. Claudopolypse gives you maximum signal with zero clutter — dense, but never confusing." },
];

export default function WhySection() {
  return (
    <section id="why" className="py-[100px] overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left */}
          <Reveal>
            <SectionLabel>Why Claudopolypse</SectionLabel>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.6rem)] font-extrabold tracking-tight mb-5">
              Not Another <span className="gradient-text">Swap UI.</span>
            </h2>
            <p className="text-[var(--text2)] text-[1.05rem] leading-[1.7]">
              Most trading interfaces are built for casual users. Claudopolypse is built for killers. Every design
              decision prioritizes one thing: getting your trade executed faster than anyone else.
            </p>
          </Reveal>

          {/* Right — Points */}
          <div className="flex flex-col gap-6">
            {points.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.08}>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 shrink-0 flex items-center justify-center border border-[var(--accent-dim)] rounded-md bg-[rgba(232,114,42,0.03)] text-[var(--accent)] font-mono text-[0.7rem] font-bold">
                    {p.n}
                  </div>
                  <div>
                    <h4 className="text-[0.95rem] font-bold mb-1">{p.title}</h4>
                    <p className="text-[var(--text2)] text-[0.85rem] leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
