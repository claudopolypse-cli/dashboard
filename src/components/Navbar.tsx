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
