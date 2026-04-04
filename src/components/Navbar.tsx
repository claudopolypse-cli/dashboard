"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] py-4 backdrop-blur-xl border-b border-[var(--border)] transition-colors ${
        scrolled ? "bg-[rgba(12,10,8,0.95)]" : "bg-[rgba(12,10,8,0.8)]"
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 font-extrabold text-lg text-white no-underline">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.jpeg" alt="Claudopolypse" className="w-8 h-8 rounded-md object-cover" />
          Claudopolypse
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-[var(--text2)] no-underline text-sm font-medium hover:text-[var(--text1)] transition-colors">Features</a>
          <a href="#why" className="text-[var(--text2)] no-underline text-sm font-medium hover:text-[var(--text1)] transition-colors">Why Us</a>
          <a href="#preview" className="text-[var(--text2)] no-underline text-sm font-medium hover:text-[var(--text1)] transition-colors">Terminal</a>
          <a href="#community" className="text-[var(--text2)] no-underline text-sm font-medium hover:text-[var(--text1)] transition-colors">Community</a>
          <a href="/docs" className="text-[var(--text2)] no-underline text-sm font-medium hover:text-[var(--text1)] transition-colors">Docs</a>
          <a
            href="https://github.com/claudopolypse-cli/percolator-cli"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[var(--text2)] no-underline text-sm font-medium hover:text-[var(--text1)] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </a>
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm bg-gradient-to-br from-[var(--orange)] to-[var(--accent-bright)] text-[#0c0a08] shadow-[0_0_30px_rgba(232,114,42,0.2),0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_50px_rgba(232,114,42,0.3),0_4px_30px_rgba(0,0,0,0.6)] hover:-translate-y-0.5 transition-all no-underline"
          >
            Launch App
          </a>
        </div>
      </div>
    </nav>
  );
}
