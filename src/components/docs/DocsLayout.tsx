"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DOC_SECTIONS, DocSection } from "./docContent";

export default function DocsLayout() {
  const [activeId, setActiveId] = useState("getting-started");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scrollspy
  useEffect(() => {
    const headings = document.querySelectorAll("[data-doc-id]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.getAttribute("data-doc-id") ?? "");
          }
        }
      },
      { rootMargin: "-10% 0px -80% 0px" }
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(`[data-doc-id="${id}"]`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0c0a08] text-[#f0e6dc]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Top nav */}
      <header className="fixed top-0 left-0 right-0 z-50 h-12 flex items-center justify-between px-5 bg-[rgba(12,10,8,0.95)] backdrop-blur-xl border-b border-[#2a2018]">
        <div className="flex items-center gap-4">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-1.5 text-[#6b5c50] hover:text-[#f0e6dc] transition-colors cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <Link href="/" className="flex items-center gap-2 no-underline group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.jpeg" alt="Claudopolypse" className="w-7 h-7 rounded object-cover" />
            <span className="font-mono text-[0.7rem] font-bold text-[#f0e6dc] tracking-wider group-hover:text-[#f0923a] transition-colors hidden sm:block">
              CLAUDOPOLYPSE
            </span>
          </Link>
          <span className="font-mono text-[0.65rem] text-[#6b5c50] hidden sm:block">/ docs</span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded font-mono text-[0.65rem] font-semibold tracking-wider bg-gradient-to-br from-[#e8722a] to-[#f59e0b] text-[#0c0a08] hover:brightness-110 transition-all no-underline"
          >
            Launch App →
          </Link>
        </div>
      </header>

      <div className="flex pt-12 min-h-screen">
        {/* Sidebar */}
        <aside
          className={`fixed md:sticky top-12 left-0 z-40 h-[calc(100vh-48px)] w-[240px] shrink-0 bg-[#0c0a08] border-r border-[#2a2018] overflow-y-auto flex flex-col transition-transform duration-200 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          {/* Search-style header */}
          <div className="px-4 py-3 border-b border-[#2a2018]">
            <div className="flex items-center gap-2 px-3 py-2 bg-[#110e0a] border border-[#2a2018] rounded">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="4.5" stroke="#6b5c50" strokeWidth="1.5" />
                <path d="M10.5 10.5L13.5 13.5" stroke="#6b5c50" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="font-mono text-[0.62rem] text-[#6b5c50] tracking-wider">Search docs...</span>
            </div>
          </div>

          <nav className="flex-1 px-3 py-3">
            {DOC_SECTIONS.map((section) => (
              <div key={section.group} className="mb-5">
                <div className="font-mono text-[0.55rem] text-[#6b5c50] tracking-[2px] uppercase px-2 mb-2">
                  {section.group}
                </div>
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`w-full text-left px-2 py-1.5 rounded text-[0.78rem] transition-colors cursor-pointer font-medium block mb-0.5 ${
                      activeId === item.id
                        ? "bg-[rgba(232,114,42,0.08)] text-[#f0923a] border-l-2 border-[#e8722a] pl-[calc(0.5rem-2px)]"
                        : "text-[#a89888] hover:text-[#f0e6dc] border-l-2 border-transparent"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            ))}
          </nav>

          <div className="px-4 py-3 border-t border-[#2a2018]">
            <span className="font-mono text-[0.52rem] text-[#6b5c50] tracking-wider">v1.0 — April 2026</span>
          </div>
        </aside>

        {/* Mobile overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/60 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0 px-6 md:px-12 lg:px-16 py-10 max-w-[760px]">
          {DOC_SECTIONS.flatMap((s) => s.items).map((item) => (
            <DocBlock key={item.id} item={item} />
          ))}
        </main>

        {/* Right TOC (desktop) */}
        <aside className="hidden xl:block w-[200px] shrink-0 sticky top-12 h-[calc(100vh-48px)] overflow-y-auto px-4 py-6 border-l border-[#2a2018]">
          <div className="font-mono text-[0.55rem] text-[#6b5c50] tracking-[2px] uppercase mb-3">On this page</div>
          {DOC_SECTIONS.flatMap((s) => s.items).map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`block w-full text-left text-[0.72rem] py-1 transition-colors cursor-pointer ${
                activeId === item.id ? "text-[#f0923a]" : "text-[#6b5c50] hover:text-[#a89888]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </aside>
      </div>
    </div>
  );
}

function DocBlock({ item }: { item: DocSection["items"][number] }) {
  return (
    <section className="mb-16 scroll-mt-16" data-doc-id={item.id}>
      {/* Breadcrumb label */}
      <div className="flex items-center gap-2 mb-3">
        <span className="font-mono text-[0.6rem] text-[#f59e0b] font-bold">//</span>
        <span className="font-mono text-[0.6rem] text-[#f0923a] tracking-[2px] uppercase">{item.label}</span>
      </div>

      {/* Title */}
      <h2 className="text-[1.6rem] font-bold tracking-tight mb-4 text-[#f0e6dc]">{item.title}</h2>

      {/* Content */}
      <div className="doc-content">
        {item.content}
      </div>

      {/* Divider */}
      <div className="mt-14 h-px bg-gradient-to-r from-[#2a2018] via-[rgba(232,114,42,0.15)] to-transparent" />
    </section>
  );
}
