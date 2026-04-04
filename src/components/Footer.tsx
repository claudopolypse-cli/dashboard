export default function Footer() {
  const links = [
    { label: "Features", href: "#features" },
    { label: "Docs", href: "/docs" },
    { label: "Community", href: "#community" },
    { label: "X / Twitter", href: "#" },
    { label: "Discord", href: "#" },
  ];

  return (
    <footer className="py-10 border-t border-[var(--border)] bg-[var(--bg2)]">
      {/* Glow line */}
      <div className="glow-line mb-8" />

      <div className="max-w-[1240px] mx-auto px-6">
        <div className="flex items-center justify-between flex-wrap gap-5">
          <div className="flex items-center gap-2.5 font-bold text-[0.95rem] text-[var(--text1)]">
            <span className="w-7 h-7 rounded-[5px] bg-gradient-to-br from-[var(--orange)] to-[var(--amber)] flex items-center justify-center font-mono text-[0.65rem] font-extrabold text-[#0c0a08]">
              C
            </span>
            Claudopolypse App
          </div>
          <div className="flex gap-7 flex-wrap">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-[var(--text3)] no-underline text-[0.82rem] hover:text-[var(--text1)] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
        <p className="font-mono text-[0.72rem] text-[var(--text3)] text-center mt-6 tracking-wider">
          © 2026 Claudopolypse App. Trade Solana at terminal speed. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
