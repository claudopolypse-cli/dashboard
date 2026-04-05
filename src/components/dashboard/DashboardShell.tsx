"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import TopBar, { DashTab } from "./TopBar";
import Watchlist from "./Watchlist";
import OpenPositions from "./OpenPositions";
import ActivityLog from "./ActivityLog";
import TradePanel from "./TradePanel";
import SniperPanel from "./SniperPanel";
import AnalyticsPanel from "./AnalyticsPanel";
import type { ActivityEntry } from "./OpenPositions";
import { usePrices, PAIRS } from "@/hooks/usePrices";
import { usePortfolio } from "@/hooks/usePortfolio";
import { useOHLCV, Timeframe } from "@/hooks/useOHLCV";

const CandleChart = dynamic(() => import("./CandleChart"), { ssr: false });

function PortfolioView({ positions, prices, onClose, onAddActivity }: Parameters<typeof OpenPositions>[0]) {
  const totalPnl = positions.reduce((acc, pos) => {
    const pair = PAIRS.find((p) => p.display === pos.pair);
    if (!pair) return acc;
    const current = prices[pair.id]?.usd ?? pos.entry;
    const diff = pos.side === "LONG" ? current - pos.entry : pos.entry - current;
    return acc + (diff / pos.entry) * pos.size;
  }, 0);

  return (
    <div className="flex flex-col h-full">
      {/* Portfolio summary */}
      <div className="grid grid-cols-3 gap-0 border-b border-[#2a2018]">
        {[
          { label: "Open Positions", value: positions.length.toString() },
          { label: "Total PnL", value: `${totalPnl >= 0 ? "+" : ""}$${Math.abs(totalPnl).toFixed(2)}`, cls: totalPnl >= 0 ? "text-[#22c55e]" : "text-[#ef4444]" },
          { label: "Est. Value", value: `$${positions.reduce((a, p) => a + p.size, 0).toFixed(2)}` },
        ].map((stat) => (
          <div key={stat.label} className="px-5 py-4 border-r border-[#2a2018] last:border-r-0">
            <div className="font-mono text-[0.57rem] text-[#6b5c50] tracking-wider uppercase mb-1">{stat.label}</div>
            <div className={`font-mono text-[1.1rem] font-bold ${stat.cls ?? "text-[#f0e6dc]"}`}>{stat.value}</div>
          </div>
        ))}
      </div>
      <div className="flex-1 min-h-0">
        <OpenPositions positions={positions} prices={prices} onClose={onClose} onAddActivity={onAddActivity} />
      </div>
    </div>
  );
}


export default function DashboardShell() {
  const [activeTab, setActiveTab] = useState<DashTab>("TRADE");
  const [selectedPair, setSelectedPair] = useState("SOL/USDC");
  const [selectedCoinId, setSelectedCoinId] = useState("solana");
  const [timeframe, setTimeframe] = useState<Timeframe>("1");
  const [activities, setActivities] = useState<ActivityEntry[]>([]);

  const { prices, lastUpdated, error } = usePrices();
  const { positions, addPosition, closePosition } = usePortfolio();
  const { candles, loading: candlesLoading } = useOHLCV(selectedCoinId, timeframe);

  const handleSelectPair = useCallback((display: string, cgId: string) => {
    setSelectedPair(display);
    setSelectedCoinId(cgId);
  }, []);

  const addActivity = useCallback((entry: ActivityEntry) => {
    setActivities((prev) => [entry, ...prev].slice(0, 50));
  }, []);

  const currentPrice = prices[selectedCoinId]?.usd;
  const change24h = prices[selectedCoinId]?.usd_24h_change ?? 0;

  return (
    <div className="flex flex-col h-screen bg-[#0c0a08] text-[#f0e6dc] overflow-hidden">
      <TopBar activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "TRADE" && (
        <div className="flex flex-1 min-h-0">
          {/* Watchlist sidebar */}
          <div className="w-[200px] shrink-0 hidden md:block">
            <Watchlist
              prices={prices}
              selectedPair={selectedPair}
              onSelect={handleSelectPair}
              lastUpdated={lastUpdated}
              error={error}
            />
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col min-w-0 border-r border-[#2a2018]">
            {/* Pair header */}
            <div className="flex items-center gap-4 px-4 py-2 border-b border-[#2a2018] bg-[#0e0c0a] shrink-0">
              <span className="font-mono text-[0.82rem] font-bold text-[#f0e6dc]">{selectedPair}</span>
              {currentPrice && (
                <>
                  <span className="font-mono text-[0.95rem] font-bold text-[#f0923a]">
                    ${currentPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                  </span>
                  <span className={`font-mono text-[0.72rem] ${change24h >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
                    {change24h >= 0 ? "▲" : "▼"} {Math.abs(change24h).toFixed(2)}%
                  </span>
                </>
              )}
              <div className="ml-auto flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                <span className="font-mono text-[0.58rem] text-[#6b5c50] tracking-wider">LIVE</span>
              </div>
            </div>

            {/* Chart */}
            <div className="flex-1 min-h-0 border-b border-[#2a2018]" style={{ minHeight: 260 }}>
              <CandleChart
                candles={candles}
                loading={candlesLoading}
                timeframe={timeframe}
                onTimeframeChange={setTimeframe}
                currentPrice={currentPrice}
              />
            </div>

            {/* Open positions (bottom panel) */}
            <div className="h-[200px] shrink-0">
              <OpenPositions
                positions={positions}
                prices={prices}
                onClose={closePosition}
                onAddActivity={addActivity}
              />
            </div>
          </div>

          {/* Right panel: Trade + Activity */}
          <div className="w-[260px] shrink-0 flex flex-col hidden lg:flex">
            <div className="flex-1 min-h-0 border-b border-[#2a2018]">
              <TradePanel
                selectedPair={selectedPair}
                selectedCoinId={selectedCoinId}
                prices={prices}
                onAddActivity={addActivity}
              />
            </div>
            <div className="h-[220px] shrink-0">
              <ActivityLog activities={activities} />
            </div>
          </div>
        </div>
      )}

      {activeTab === "PORTFOLIO" && (
        <div className="flex-1 min-h-0">
          <PortfolioView
            positions={positions}
            prices={prices}
            onClose={closePosition}
            onAddActivity={addActivity}
          />
        </div>
      )}

      {activeTab === "SNIPER" && (
        <div className="flex-1 min-h-0">
          <SniperPanel prices={prices} />
        </div>
      )}

      {activeTab === "ANALYTICS" && (
        <div className="flex-1 min-h-0">
          <AnalyticsPanel positions={positions} prices={prices} />
        </div>
      )}
    </div>
  );
}
