"use client";

import { Position } from "@/hooks/usePortfolio";
import { PriceMap, PAIRS } from "@/hooks/usePrices";

interface Props {
  positions: Position[];
  prices: PriceMap;
  onClose: (id: string) => void;
  onAddActivity: (entry: ActivityEntry) => void;
}

export interface ActivityEntry {
  text: string;
  status: string;
  cls: string;
  time: number;
}

function calcPnl(pos: Position, prices: PriceMap): { pnl: number; pct: number } {
  const pair = PAIRS.find((p) => p.display === pos.pair);
  if (!pair) return { pnl: 0, pct: 0 };
  const current = prices[pair.id]?.usd;
  if (!current) return { pnl: 0, pct: 0 };

  const diff = pos.side === "LONG" ? current - pos.entry : pos.entry - current;
  const pnl = (diff / pos.entry) * pos.size;
  const pct = (diff / pos.entry) * 100;
  return { pnl, pct };
}

function fmtPrice(n: number) {
  if (n < 0.0001) return n.toFixed(8);
  if (n < 1) return n.toFixed(4);
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function OpenPositions({ positions, prices, onClose, onAddActivity }: Props) {
  const handleClose = (pos: Position) => {
    const pair = PAIRS.find((p) => p.display === pos.pair);
    const current = pair ? prices[pair.id]?.usd : null;
    const { pnl } = calcPnl(pos, prices);
    const sign = pnl >= 0 ? "+" : "";

    onAddActivity({
      text: `CLOSE ${pos.pair} ${pos.side} @ ${current ? `$${fmtPrice(current)}` : "?"}`,
      status: `${sign}$${Math.abs(pnl).toFixed(2)}`,
      cls: pnl >= 0 ? "text-[#22c55e]" : "text-[#ef4444]",
      time: Date.now(),
    });
    onClose(pos.id);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b border-[#2a2018] flex items-center justify-between">
        <span className="font-mono text-[0.6rem] text-[#6b5c50] tracking-[1.5px] uppercase">
          Open Positions
        </span>
        <span className="font-mono text-[0.6rem] text-[#a89888]">
          {positions.length} active
        </span>
      </div>

      {positions.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <span className="font-mono text-[0.65rem] text-[#6b5c50]">No open positions</span>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          {/* Header row */}
          <div className="grid grid-cols-[1fr_60px_90px_90px_80px_56px] gap-2 px-3 py-1.5 border-b border-[#2a2018] font-mono text-[0.57rem] tracking-wider uppercase text-[#6b5c50]">
            <span>Pair</span>
            <span>Side</span>
            <span>Entry</span>
            <span>Current</span>
            <span>PnL</span>
            <span></span>
          </div>

          {positions.map((pos) => {
            const pair = PAIRS.find((p) => p.display === pos.pair);
            const current = pair ? prices[pair.id]?.usd : null;
            const { pnl, pct } = calcPnl(pos, prices);
            const pnlPos = pnl >= 0;

            return (
              <div
                key={pos.id}
                className="grid grid-cols-[1fr_60px_90px_90px_80px_56px] gap-2 px-3 py-2 border-b border-[#2a2018]/40 font-mono text-[0.67rem] hover:bg-[#161210] transition-colors"
              >
                <span className="text-[#f0e6dc] font-semibold">{pos.pair}</span>
                <span className={pos.side === "LONG" ? "text-[#22c55e]" : "text-[#ef4444]"}>
                  {pos.side}
                </span>
                <span className="text-[#a89888]">${fmtPrice(pos.entry)}</span>
                <span className="text-[#f0923a]">
                  {current ? `$${fmtPrice(current)}` : "···"}
                </span>
                <span className={pnlPos ? "text-[#22c55e]" : "text-[#ef4444]"}>
                  {pnl >= 0 ? "+" : ""}${Math.abs(pnl).toFixed(2)}
                  <span className="opacity-60 text-[0.58rem]"> ({pct >= 0 ? "+" : ""}{pct.toFixed(1)}%)</span>
                </span>
                <button
                  onClick={() => handleClose(pos)}
                  className="text-[0.6rem] text-[#6b5c50] hover:text-[#ef4444] font-mono tracking-wider transition-colors cursor-pointer border border-[#2a2018] hover:border-[#ef4444] rounded px-1.5 py-0.5"
                >
                  CLOSE
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
