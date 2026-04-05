# Claudopolypse App — Landing Page

> Trade Solana at terminal speed.

Claudopolypse Dashboard — trading terminal on Solana.  
Built with **Next.js 15**, **TypeScript**, and **Tailwind CSS 4**.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open in browser
http://localhost:3000
```

## Production Build

```bash
npm run build
npm start
```

---

## Project Structure

```
src/
├── app/
│   ├── globals.css         # Tailwind + CSS variables + utilities
│   ├── layout.tsx          # Root layout, fonts, metadata
│   └── page.tsx            # Main page (composes all sections)
└── components/
    ├── Reveal.tsx           # Scroll animation wrapper
    ├── SectionLabel.tsx     # "// LABEL" component
    ├── Navbar.tsx           # Fixed nav with scroll effect
    ├── Hero.tsx             # Hero + terminal mockup
    ├── StatsBar.tsx         # Trust metrics bar
    ├── Features.tsx         # 7 feature cards
    ├── WhySection.tsx       # Why Claudopolypse (2-col)
    ├── TerminalPreview.tsx  # Full dashboard preview
    ├── Community.tsx        # Social proof + badges
    ├── FinalCTA.tsx         # Closing CTA
    └── Footer.tsx           # Footer links
```

## Color Palette (warm orange / amber / burnt sienna)

| Token       | Hex       | Usage              |
|-------------|-----------|---------------------|
| --bg        | #0c0a08   | Page background     |
| --bg-card   | #161210   | Card backgrounds    |
| --orange    | #e8722a   | Primary accent      |
| --amber     | #f59e0b   | Secondary accent    |
| --accent    | #f0923a   | Charts, highlights  |
| --text1     | #f0e6dc   | Primary text        |
| --text2     | #a89888   | Secondary text      |

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS 4
- Google Fonts (Outfit + JetBrains Mono)
- Zero external UI libraries

---

© 2026 Claudopolypse App
