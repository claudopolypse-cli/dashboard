"use client";

import { useState, useEffect, useRef } from "react";
import { useSnipeTargets, SnipeTarget } from "@/hooks/useSnipeTargets";
import { useJupiterSwap } from "@/hooks/useJupiterSwap";
import { useWallet } from "@solana/wallet-adapter-react";
import { PriceMap, PAIRS } from "@/hooks/usePrices";

interface Props {
  prices: PriceMap;
}

function fmtPrice(n: number) {
  if (n < 0.0001) return n.toFixed(8);
  if (n < 1) return n.toFixed(4);
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 6 });
}

function fmtTime(ts: number) {
  return new Date(ts).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

// Per-target swap execution UI
function SwapExecutor({ target, prices }: { target: SnipeTarget; prices: PriceMap }) {
  const { executeSwap, status, result, error, reset } = useJupiterSwap();
  const { connected } = useWallet();
  const [swapAmount, setSwapAmount] = useState("10");
  const [open, setOpen] = useState(false);

  const pair = PAIRS.find((p) => p.display === target.pair);
  if (!pair) return null;

  // direction BELOW = buy the dip (USDC → token), ABOVE = sell into strength (token → USDC)
  const isBuy = target.direction === "BELOW";
  const inputToken = isBuy ? "USDC" : pair.base;
  const outputToken = isBuy ? pair.base : "USDC";
  const currentPrice = prices[target.coinId]?.usd;

  const handleExecute = async () => {
    const amount = parseFloat(swapAmount);
    if (!amount || amount <= 0) return;
    await executeSwap(inputToken, outputToken, amount);
  };

  if (status === "success" && result) {
    return (
      <div className="mt-2 bg-[rgba(34,197,94,0.08)] border border-[rgba(34,197,94,0.3)] rounded p-2.5">
        <div className="font-mono text-[0.6rem] text-[#22c55e] mb-1">✓ Swap executed on-chain</div>
        <div className="font-mono text-[0.58rem] text-[#a89888]">
          {result.inputAmount} {result.inputToken} → {result.outputAmount.toFixed(4)} {result.outputToken}
        </div>
        <a
          href={`https://solscan.io/tx/${result.signature}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[0.55rem] text-[#f0923a] underline block mt-1"
        >
          View on Solscan ↗
        </a>
        <button onClick={reset} className="mt-1.5 font-mono text-[0.55rem] text-[#6b5c50] hover:text-[#f0e6dc] cursor-pointer">
          Reset
        </button>
      </div>
    );
  }

  return (
    <div className="mt-2">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className={`w-full py-2 rounded font-mono font-bold text-[0.65rem] tracking-wider cursor-pointer border-none transition-all ${
            isBuy
              ? "bg-[rgba(34,197,94,0.15)] text-[#22c55e] hover:bg-[rgba(34,197,94,0.25)]"
              : "bg-[rgba(239,68,68,0.15)] text-[#ef4444] hover:bg-[rgba(239,68,68,0.25)]"
          }`}
        >
          ⚡ {isBuy ? "BUY" : "SELL"} {pair.base} NOW
        </button>
      ) : (
        <div className="border border-[#2a2018] rounded p-2.5 bg-[#0c0a08]">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1">
              <label className="font-mono text-[0.52rem] text-[#6b5c50] uppercase tracking-wider block mb-1">
                {isBuy ? "USDC to spend" : `${pair.base} to sell`}
              </label>
              <input
                type="number"
                value={swapAmount}
                onChange={(e) => setSwapAmount(e.target.value)}
                className="w-full bg-[#110e0a] border border-[#2a2018] rounded px-2 py-1.5 font-mono text-[0.68rem] text-[#f0e6dc] outline-none focus:border-[#e8722a]"
                placeholder="10"
              />
            </div>
            {currentPrice && isBuy && (
              <div className="shrink-0 text-right">
                <div className="font-mono text-[0.52rem] text-[#6b5c50] mb-1">≈ gets</div>
                <div className="font-mono text-[0.68rem] text-[#22c55e]">
                  {(parseFloat(swapAmount || "0") / currentPrice).toFixed(4)} {pair.base}
                </div>
              </div>
            )}
          </div>
          {!connected && (
            <div className="font-mono text-[0.55rem] text-[#ef4444] mb-1.5">Connect wallet to execute</div>
          )}
          {error && (
            <div className="font-mono text-[0.55rem] text-[#ef4444] mb-1.5">{error}</div>
          )}
          <div className="flex gap-1.5">
            <button
              onClick={handleExecute}
              disabled={!connected || ["quoting", "signing", "sending", "confirming"].includes(status)}
              className={`flex-1 py-2 rounded font-mono font-bold text-[0.65rem] tracking-wider cursor-pointer border-none transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                isBuy
                  ? "bg-[#22c55e] text-[#0c0a08] hover:brightness-110"
                  : "bg-[#ef4444] text-white hover:brightness-110"
              }`}
            >
              {status === "quoting" && "QUOTING···"}
              {status === "signing" && "SIGN IN WALLET···"}
              {status === "sending" && "SENDING···"}
              {status === "confirming" && "CONFIRMING···"}
              {(status === "idle" || status === "error") && `EXECUTE ${isBuy ? "BUY" : "SELL"}`}
            </button>
            <button
              onClick={() => { setOpen(false); reset(); }}
              className="px-3 py-2 rounded font-mono text-[0.6rem] text-[#6b5c50] hover:text-[#f0e6dc] cursor-pointer border border-[#2a2018] hover:border-[#a89888] transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function PriceDist({ target, prices }: { target: SnipeTarget; prices: PriceMap }) {
  const current = prices[target.coinId]?.usd;
  if (!current) return <span className="text-[#6b5c50]">···</span>;
  const diff = ((current - target.targetPrice) / target.targetPrice) * 100;
  const away = Math.abs(diff).toFixed(2);
  const positive = diff >= 0;
  return (
    <div className="flex flex-col items-end gap-0.5">
      <span className="font-mono text-[0.65rem] text-[#f0923a]">${fmtPrice(current)}</span>
      <span className={`font-mono text-[0.55rem] ${positive ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
        {positive ? "▲" : "▼"} {away}% {target.direction === "ABOVE" ? (positive ? "above ✓" : "to target") : (positive ? "to target" : "below ✓")}
      </span>
    </div>
  );
}

export default function SniperPanel({ prices }: Props) {
  const { targets, addTarget, removeTarget, checkAndTrigger } = useSnipeTargets();
  const { connected } = useWallet();

  const [form, setForm] = useState({
    pair: PAIRS[0].display,
    coinId: PAIRS[0].id,
    targetPrice: "",
    direction: "BELOW" as "ABOVE" | "BELOW",
    note: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [newTrigger, setNewTrigger] = useState<string | null>(null);
  const prevTriggered = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (Object.keys(prices).length === 0) return;
    checkAndTrigger(prices);
  }, [prices, checkAndTrigger]);

  useEffect(() => {
    targets.forEach((t) => {
      if (t.triggered && !prevTriggered.current.has(t.id)) {
        setNewTrigger(t.id);
        prevTriggered.current.add(t.id);
        setTimeout(() => setNewTrigger(null), 4000);
      }
    });
  }, [targets]);

  const handlePairChange = (display: string) => {
    const pair = PAIRS.find((p) => p.display === display);
    if (pair) setForm((f) => ({ ...f, pair: display, coinId: pair.id }));
  };

  const handleAdd = () => {
    const price = parseFloat(form.targetPrice);
    if (!price || price <= 0) return;
    addTarget({ pair: form.pair, coinId: form.coinId, targetPrice: price, direction: form.direction, note: form.note || undefined });
    setForm((f) => ({ ...f, targetPrice: "", note: "" }));
    setShowForm(false);
  };

  const active = targets.filter((t) => !t.triggered);
  const triggered = targets.filter((t) => t.triggered);
  const currentPrice = prices[form.coinId]?.usd;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#2a2018] shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f0923a] animate-pulse" />
            <span className="font-mono text-[0.6rem] text-[#6b5c50] tracking-[2px] uppercase">Sniper Mode</span>
          </div>
          <span className="font-mono text-[0.58rem] text-[#2a2018] border border-[#2a2018] rounded px-1.5 py-0.5">
            {active.length} active
          </span>
          {!connected && (
            <span className="font-mono text-[0.55rem] text-[#f0923a]">Connect wallet to execute swaps</span>
          )}
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="font-mono text-[0.6rem] tracking-wider text-[#f0923a] border border-[rgba(232,114,42,0.3)] hover:border-[#f0923a] rounded px-3 py-1.5 transition-colors cursor-pointer"
        >
          {showForm ? "CANCEL" : "+ NEW TARGET"}
        </button>
      </div>

      {/* New trigger flash */}
      {newTrigger && (
        <div className="mx-4 mt-3 bg-[rgba(34,197,94,0.08)] border border-[#22c55e] rounded px-4 py-2.5 flex items-center gap-2 shrink-0 animate-pulse">
          <span className="text-[#22c55e] text-[0.9rem]">⚡</span>
          <span className="font-mono text-[0.65rem] text-[#22c55e] tracking-wider">
            SNIPE TARGET HIT — {targets.find((t) => t.id === newTrigger)?.pair} — Execute swap below
          </span>
        </div>
      )}

      {/* Add form */}
      {showForm && (
        <div className="mx-4 mt-3 border border-[#2a2018] rounded p-4 shrink-0 bg-[#0e0c0a]">
          <div className="font-mono text-[0.58rem] text-[#6b5c50] tracking-[2px] uppercase mb-3">New Snipe Target</div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-mono text-[0.55rem] text-[#6b5c50] uppercase tracking-wider block mb-1">Pair</label>
              <select
                value={form.pair}
                onChange={(e) => handlePairChange(e.target.value)}
                className="w-full bg-[#110e0a] border border-[#2a2018] rounded px-2 py-2 font-mono text-[0.7rem] text-[#f0e6dc] outline-none focus:border-[#e8722a] cursor-pointer"
              >
                {PAIRS.map((p) => <option key={p.id} value={p.display}>{p.display}</option>)}
              </select>
            </div>
            <div>
              <label className="font-mono text-[0.55rem] text-[#6b5c50] uppercase tracking-wider block mb-1">Direction</label>
              <div className="flex gap-1">
                {(["ABOVE", "BELOW"] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setForm((f) => ({ ...f, direction: d }))}
                    className={`flex-1 py-2 rounded font-mono text-[0.6rem] tracking-wider transition-colors cursor-pointer border ${
                      form.direction === d
                        ? d === "ABOVE"
                          ? "bg-[rgba(34,197,94,0.1)] border-[rgba(34,197,94,0.3)] text-[#22c55e]"
                          : "bg-[rgba(239,68,68,0.1)] border-[rgba(239,68,68,0.3)] text-[#ef4444]"
                        : "border-[#2a2018] text-[#6b5c50] hover:text-[#a89888]"
                    }`}
                  >
                    {d === "ABOVE" ? "▲ ABOVE" : "▼ BELOW"}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="font-mono text-[0.55rem] text-[#6b5c50] uppercase tracking-wider block mb-1">
                Target Price (USD)
                {currentPrice && <span className="text-[#f0923a] ml-1">— now ${fmtPrice(currentPrice)}</span>}
              </label>
              <input
                type="number"
                value={form.targetPrice}
                onChange={(e) => setForm((f) => ({ ...f, targetPrice: e.target.value }))}
                placeholder={currentPrice ? fmtPrice(currentPrice) : "0.00"}
                className="w-full bg-[#110e0a] border border-[#2a2018] rounded px-2 py-2 font-mono text-[0.7rem] text-[#f0e6dc] outline-none focus:border-[#e8722a] transition-colors"
              />
            </div>
            <div>
              <label className="font-mono text-[0.55rem] text-[#6b5c50] uppercase tracking-wider block mb-1">Note (optional)</label>
              <input
                type="text"
                value={form.note}
                onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                placeholder="e.g. support level"
                className="w-full bg-[#110e0a] border border-[#2a2018] rounded px-2 py-2 font-mono text-[0.7rem] text-[#f0e6dc] outline-none focus:border-[#e8722a] transition-colors"
              />
            </div>
          </div>
          <button
            onClick={handleAdd}
            disabled={!form.targetPrice || parseFloat(form.targetPrice) <= 0}
            className="mt-3 w-full py-2.5 rounded font-mono font-bold text-[0.72rem] tracking-wider bg-[#f0923a] text-[#0c0a08] hover:brightness-110 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer border-none"
          >
            SET SNIPE TARGET
          </button>
        </div>
      )}

      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3 flex flex-col gap-4">
        {/* Active targets */}
        <div>
          <div className="font-mono text-[0.55rem] text-[#6b5c50] tracking-[2px] uppercase mb-2">Active Targets</div>
          {active.length === 0 ? (
            <div className="border border-dashed border-[#2a2018] rounded p-6 text-center">
              <div className="font-mono text-[0.62rem] text-[#6b5c50]">No active snipe targets</div>
              <div className="font-mono text-[0.55rem] text-[#2a2018] mt-1">Set a target price — when hit, execute a real on-chain swap via Jupiter</div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {active.map((t) => {
                const current = prices[t.coinId]?.usd;
                const pct = current ? (((current - t.targetPrice) / t.targetPrice) * 100) : null;
                const progress = pct !== null ? Math.min(Math.max((t.direction === "BELOW" ? -pct : pct) + 100, 0), 100) : 0;
                return (
                  <div key={t.id} className="border border-[#2a2018] rounded p-3 bg-[#0e0c0a] hover:border-[rgba(232,114,42,0.3)] transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-[0.75rem] font-bold text-[#f0e6dc]">{t.pair}</span>
                          <span className={`font-mono text-[0.55rem] px-1.5 py-0.5 rounded ${
                            t.direction === "ABOVE" ? "bg-[rgba(34,197,94,0.1)] text-[#22c55e]" : "bg-[rgba(239,68,68,0.1)] text-[#ef4444]"
                          }`}>
                            {t.direction === "ABOVE" ? "▲" : "▼"} {t.direction}
                          </span>
                        </div>
                        <div className="font-mono text-[0.65rem] text-[#a89888]">
                          Target: <span className="text-[#f0923a] font-bold">${fmtPrice(t.targetPrice)}</span>
                        </div>
                        {t.note && <div className="font-mono text-[0.55rem] text-[#6b5c50] mt-0.5">{t.note}</div>}
                      </div>
                      <div className="flex items-start gap-2">
                        <PriceDist target={t} prices={prices} />
                        <button
                          onClick={() => removeTarget(t.id)}
                          className="text-[0.6rem] text-[#6b5c50] hover:text-[#ef4444] font-mono transition-colors cursor-pointer border border-[#2a2018] hover:border-[#ef4444] rounded px-1.5 py-0.5"
                        >✕</button>
                      </div>
                    </div>
                    <div className="h-0.5 bg-[#1a1410] rounded overflow-hidden">
                      <div
                        className={`h-full rounded transition-all duration-1000 ${t.direction === "ABOVE" ? "bg-[#22c55e]" : "bg-[#ef4444]"}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between font-mono text-[0.5rem] text-[#2a2018] mt-0.5">
                      <span>Current</span><span>{progress.toFixed(0)}% to target</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Triggered — with real swap execution */}
        {triggered.length > 0 && (
          <div>
            <div className="font-mono text-[0.55rem] text-[#22c55e] tracking-[2px] uppercase mb-2">Triggered — Execute Swap</div>
            <div className="flex flex-col gap-2">
              {triggered.map((t) => (
                <div key={t.id} className="border border-[rgba(34,197,94,0.25)] rounded p-3 bg-[rgba(34,197,94,0.03)]">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[0.72rem] font-bold text-[#22c55e]">⚡ {t.pair}</span>
                        <span className="font-mono text-[0.55rem] text-[#22c55e] opacity-70">
                          {t.direction} ${fmtPrice(t.targetPrice)}
                        </span>
                      </div>
                      {t.triggeredAt && (
                        <div className="font-mono text-[0.55rem] text-[#6b5c50]">Hit at {fmtTime(t.triggeredAt)}</div>
                      )}
                      {t.note && <div className="font-mono text-[0.55rem] text-[#6b5c50]">{t.note}</div>}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[0.65rem] text-[#f0923a]">${fmtPrice(prices[t.coinId]?.usd ?? 0)}</span>
                      <button
                        onClick={() => removeTarget(t.id)}
                        className="text-[0.6rem] text-[#6b5c50] hover:text-[#ef4444] font-mono transition-colors cursor-pointer border border-[rgba(34,197,94,0.2)] hover:border-[#ef4444] rounded px-1.5 py-0.5"
                      >✕</button>
                    </div>
                  </div>
                  {/* Real swap executor */}
                  <SwapExecutor target={t} prices={prices} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Live price reference */}
        <div>
          <div className="font-mono text-[0.55rem] text-[#6b5c50] tracking-[2px] uppercase mb-2">Live Prices — Click to Snipe</div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1.5">
            {PAIRS.map((p) => {
              const data = prices[p.id];
              if (!data) return null;
              const pos = data.usd_24h_change >= 0;
              return (
                <div
                  key={p.id}
                  className="border border-[#2a2018] rounded px-3 py-2 bg-[#0e0c0a] cursor-pointer hover:border-[rgba(232,114,42,0.3)] transition-colors"
                  onClick={() => { setForm((f) => ({ ...f, pair: p.display, coinId: p.id })); setShowForm(true); }}
                >
                  <div className="font-mono text-[0.6rem] text-[#6b5c50] mb-0.5">{p.display}</div>
                  <div className="font-mono text-[0.75rem] font-bold text-[#f0923a]">${fmtPrice(data.usd)}</div>
                  <div className={`font-mono text-[0.55rem] ${pos ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
                    {pos ? "▲" : "▼"} {Math.abs(data.usd_24h_change).toFixed(2)}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
