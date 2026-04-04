"use client";

import { PAIRS, PriceMap } from "@/hooks/usePrices";

interface Props {
  prices: PriceMap;
  selectedPair: string;
  onSelect: (display: string, cgId: string) => void;
  lastUpdated: number;
  error: boolean;
}

function fmt(price: number): string {
  if (price < 0.0001) return price.toFixed(8);
  if (price < 0.01) return price.toFixed(6);
  if (price < 1) return price.toFixed(4);
  if (price < 1000) return price.toFixed(2);
  return price.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

export default function Watchlist({ prices, selectedPair, onSelect, lastUpdated, error }: Props) {
  const stale = lastUpdated > 0 && Date.now() - lastUpdated > 15_000;

  return (
    <aside className="flex flex-col h-full border-r border-[#2a2018] bg-[#0c0a08]">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-[#2a2018]">
        <span className="font-mono text-[0.6rem] text-[#6b5c50] tracking-[1.5px] uppercase">Watchlist</span>
        <span
          className={`font-mono text-[0.55rem] tracking-wider ${
            error || stale ? "text-[#ef4444]" : "text-[#22c55e]"
          }`}
        >
          {error ? "ERR" : stale ? "STALE" : lastUpdated > 0 ? "LIVE" : "···"}
        </span>
      </div>

      {/* Pairs */}
      <div className="flex-1 overflow-y-auto">
        {PAIRS.map((pair) => {
          const data = prices[pair.id];
          const change = data?.usd_24h_change ?? 0;
          const up = change >= 0;

          return (
            <button
              key={pair.display}
              onClick={() => onSelect(pair.display, pair.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 transition-colors hover:bg-[#161210] border-b border-[#2a2018]/50 cursor-pointer ${
                selectedPair === pair.display
                  ? "bg-[rgba(232,114,42,0.06)] border-l-2 border-l-[#e8722a]"
                  : "border-l-2 border-l-transparent"
              }`}
            >
              <span className="font-mono text-[0.72rem] font-semibold text-[#f0e6dc]">
                {pair.display}
              </span>
              <div className="text-right">
                {data ? (
                  <>
                    <div className="font-mono text-[0.7rem] text-[#f0923a] font-medium">
                      ${fmt(data.usd)}
                    </div>
                    <div
                      className={`font-mono text-[0.6rem] ${up ? "text-[#22c55e]" : "text-[#ef4444]"}`}
                    >
                      {up ? "+" : ""}{change.toFixed(1)}%
                    </div>
                  </>
                ) : (
                  <div className="font-mono text-[0.65rem] text-[#6b5c50]">···</div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-3 py-2 border-t border-[#2a2018]">
        <span className="font-mono text-[0.52rem] text-[#6b5c50] tracking-wider">
          via CoinGecko · 10s
        </span>
      </div>
    </aside>
  );
}
