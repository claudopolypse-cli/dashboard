"use client";

import { useMarketData, CoinMarket } from "@/hooks/useMarketData";
import { Position } from "@/hooks/usePortfolio";
import { PriceMap, PAIRS } from "@/hooks/usePrices";

interface Props {
  positions: Position[];
  prices: PriceMap;
}

function fmtPrice(n: number) {
  if (n < 0.0001) return n.toFixed(8);
  if (n < 1) return n.toFixed(4);
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtMarketCap(n: number) {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  return `$${n.toLocaleString()}`;
}

function fmtVolume(n: number) {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  return `$${n.toLocaleString()}`;
}

function calcPnl(pos: Position, prices: PriceMap) {
  const pair = PAIRS.find((p) => p.display === pos.pair);
  if (!pair) return 0;
  const current = prices[pair.id]?.usd;
  if (!current) return 0;
  const diff = pos.side === "LONG" ? current - pos.entry : pos.entry - current;
  return (diff / pos.entry) * pos.size;
}

function StatCard({ label, value, sub, cls }: { label: string; value: string; sub?: string; cls?: string }) {
  return (
    <div className="border border-[#2a2018] rounded p-4 bg-[#0e0c0a]">
      <div className="font-mono text-[0.55rem] text-[#6b5c50] tracking-[2px] uppercase mb-1">{label}</div>
      <div className={`font-mono text-[1.1rem] font-bold ${cls ?? "text-[#f0e6dc]"}`}>{value}</div>
      {sub && <div className="font-mono text-[0.58rem] text-[#6b5c50] mt-0.5">{sub}</div>}
    </div>
  );
}

function CoinRow({ coin, rank }: { coin: CoinMarket; rank: number }) {
  const pos = coin.price_change_percentage_24h >= 0;
  return (
    <div className="grid grid-cols-[24px_1fr_100px_90px_100px_100px] gap-3 px-4 py-2.5 border-b border-[#2a2018]/40 font-mono hover:bg-[#0e0c0a] transition-colors items-center">
      <span className="text-[0.6rem] text-[#2a2018]">{rank}</span>
      <div className="flex items-center gap-2 min-w-0">
        {coin.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={coin.image} alt={coin.symbol} className="w-5 h-5 rounded-full shrink-0" />
        )}
        <div className="min-w-0">
          <div className="text-[0.72rem] text-[#f0e6dc] font-semibold truncate">{coin.name}</div>
          <div className="text-[0.58rem] text-[#6b5c50] uppercase">{coin.symbol}</div>
        </div>
      </div>
      <span className="text-[0.72rem] text-[#f0923a] text-right">${fmtPrice(coin.current_price)}</span>
      <span className={`text-[0.67rem] text-right ${pos ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
        {pos ? "▲" : "▼"} {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
      </span>
      <span className="text-[0.65rem] text-[#a89888] text-right">{fmtMarketCap(coin.market_cap)}</span>
      <span className="text-[0.65rem] text-[#6b5c50] text-right">{fmtVolume(coin.total_volume)}</span>
    </div>
  );
}

export default function AnalyticsPanel({ positions, prices }: Props) {
  const { coins, loading, lastUpdated, error } = useMarketData();

  // Portfolio stats from open positions
  const totalPnl = positions.reduce((sum, p) => sum + calcPnl(p, prices), 0);
  const totalSize = positions.reduce((sum, p) => sum + p.size, 0);
  const winPositions = positions.filter((p) => calcPnl(p, prices) > 0).length;
  const winRate = positions.length > 0 ? ((winPositions / positions.length) * 100).toFixed(0) : "—";

  // Tracked pairs performance
  const pairStats = PAIRS.map((p) => {
    const data = prices[p.id];
    return { ...p, change: data?.usd_24h_change ?? 0, price: data?.usd ?? 0 };
  }).filter((p) => p.price > 0);

  const topGainer = [...pairStats].sort((a, b) => b.change - a.change)[0];
  const topLoser = [...pairStats].sort((a, b) => a.change - b.change)[0];

  const sortedCoins = [...coins].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#2a2018] shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f0923a] animate-pulse" />
            <span className="font-mono text-[0.6rem] text-[#6b5c50] tracking-[2px] uppercase">Analytics</span>
          </div>
          <span className="font-mono text-[0.55rem] text-[#6b5c50]">
            Solana Ecosystem · Updated {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : "···"}
          </span>
        </div>
        {error && (
          <span className="font-mono text-[0.58rem] text-[#ef4444]">API rate limit — data may be delayed</span>
        )}
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto">

        {/* Portfolio Stats */}
        <div className="px-5 py-4 border-b border-[#2a2018]">
          <div className="font-mono text-[0.55rem] text-[#6b5c50] tracking-[2px] uppercase mb-3">Portfolio Overview</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard
              label="Open Positions"
              value={positions.length.toString()}
              sub={`${winPositions} profitable`}
            />
            <StatCard
              label="Unrealized PnL"
              value={`${totalPnl >= 0 ? "+" : ""}$${Math.abs(totalPnl).toFixed(2)}`}
              cls={totalPnl >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"}
              sub={totalSize > 0 ? `${((totalPnl / totalSize) * 100).toFixed(2)}% return` : undefined}
            />
            <StatCard
              label="Win Rate"
              value={positions.length > 0 ? `${winRate}%` : "—"}
              sub={positions.length > 0 ? `${winPositions}/${positions.length} positions` : "No positions open"}
              cls={parseInt(winRate) >= 50 ? "text-[#22c55e]" : "text-[#ef4444]"}
            />
            <StatCard
              label="Total Exposure"
              value={`$${totalSize.toLocaleString("en-US", { maximumFractionDigits: 2 })}`}
              sub="USDC notional"
            />
          </div>
        </div>

        {/* Tracked Pairs Performance */}
        <div className="px-5 py-4 border-b border-[#2a2018]">
          <div className="font-mono text-[0.55rem] text-[#6b5c50] tracking-[2px] uppercase mb-3">Tracked Pairs — 24h Performance</div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            {topGainer && (
              <div className="border border-[rgba(34,197,94,0.2)] rounded p-3 bg-[rgba(34,197,94,0.03)]">
                <div className="font-mono text-[0.55rem] text-[#22c55e] tracking-[1.5px] uppercase mb-1">Top Gainer</div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.72rem] font-bold text-[#f0e6dc]">{topGainer.display}</span>
                  <span className="font-mono text-[0.72rem] font-bold text-[#22c55e]">+{topGainer.change.toFixed(2)}%</span>
                </div>
                <div className="font-mono text-[0.62rem] text-[#a89888] mt-0.5">${fmtPrice(topGainer.price)}</div>
              </div>
            )}
            {topLoser && (
              <div className="border border-[rgba(239,68,68,0.2)] rounded p-3 bg-[rgba(239,68,68,0.03)]">
                <div className="font-mono text-[0.55rem] text-[#ef4444] tracking-[1.5px] uppercase mb-1">Top Loser</div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.72rem] font-bold text-[#f0e6dc]">{topLoser.display}</span>
                  <span className="font-mono text-[0.72rem] font-bold text-[#ef4444]">{topLoser.change.toFixed(2)}%</span>
                </div>
                <div className="font-mono text-[0.62rem] text-[#a89888] mt-0.5">${fmtPrice(topLoser.price)}</div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            {[...pairStats].sort((a, b) => b.change - a.change).map((p) => {
              const pos = p.change >= 0;
              const barW = Math.min(Math.abs(p.change) * 3, 100);
              return (
                <div key={p.id} className="flex items-center gap-3">
                  <span className="font-mono text-[0.6rem] text-[#6b5c50] w-20 shrink-0">{p.display}</span>
                  <div className="flex-1 h-1.5 bg-[#1a1410] rounded overflow-hidden">
                    <div
                      className={`h-full rounded transition-all duration-500 ${pos ? "bg-[#22c55e]" : "bg-[#ef4444]"}`}
                      style={{ width: `${barW}%`, marginLeft: pos ? 0 : undefined }}
                    />
                  </div>
                  <span className={`font-mono text-[0.62rem] w-16 text-right shrink-0 ${pos ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
                    {pos ? "+" : ""}{p.change.toFixed(2)}%
                  </span>
                  <span className="font-mono text-[0.6rem] text-[#f0923a] w-24 text-right shrink-0">${fmtPrice(p.price)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Solana Ecosystem Market Table */}
        <div className="px-0 py-0">
          <div className="px-5 py-3 border-b border-[#2a2018] flex items-center justify-between">
            <div className="font-mono text-[0.55rem] text-[#6b5c50] tracking-[2px] uppercase">Solana Ecosystem Market</div>
            <div className="flex items-center gap-1.5">
              {loading ? (
                <span className="font-mono text-[0.55rem] text-[#6b5c50]">Loading···</span>
              ) : (
                <>
                  <span className="w-1 h-1 rounded-full bg-[#22c55e]" />
                  <span className="font-mono text-[0.55rem] text-[#6b5c50]">Live · 60s refresh</span>
                </>
              )}
            </div>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-[24px_1fr_100px_90px_100px_100px] gap-3 px-4 py-2 border-b border-[#2a2018] font-mono text-[0.53rem] tracking-wider uppercase text-[#6b5c50]">
            <span>#</span>
            <span>Token</span>
            <span className="text-right">Price</span>
            <span className="text-right">24h %</span>
            <span className="text-right">Market Cap</span>
            <span className="text-right">Volume 24h</span>
          </div>

          {loading ? (
            <div className="flex flex-col gap-0">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-[42px] border-b border-[#2a2018]/40 px-4 flex items-center gap-3 animate-pulse">
                  <div className="w-4 h-2 bg-[#2a2018] rounded" />
                  <div className="w-5 h-5 bg-[#2a2018] rounded-full" />
                  <div className="w-24 h-2.5 bg-[#2a2018] rounded" />
                  <div className="flex-1" />
                  <div className="w-16 h-2.5 bg-[#2a2018] rounded" />
                  <div className="w-12 h-2.5 bg-[#2a2018] rounded" />
                </div>
              ))}
            </div>
          ) : (
            sortedCoins.map((coin, i) => (
              <CoinRow key={coin.id} coin={coin} rank={i + 1} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
