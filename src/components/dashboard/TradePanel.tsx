"use client";

import { useState, useEffect } from "react";
import { useJupiterQuote } from "@/hooks/useJupiterQuote";
import { usePortfolio, Position } from "@/hooks/usePortfolio";
import { PAIRS, PriceMap } from "@/hooks/usePrices";
import type { ActivityEntry } from "./OpenPositions";
import { useWallet } from "@solana/wallet-adapter-react";

interface Props {
  selectedPair: string;
  selectedCoinId: string;
  prices: PriceMap;
  onAddActivity: (entry: ActivityEntry) => void;
}

function genId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function fmtPrice(n: number) {
  if (n < 0.0001) return n.toFixed(8);
  if (n < 1) return n.toFixed(4);
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function TradePanel({ selectedPair, selectedCoinId, prices, onAddActivity }: Props) {
  const { publicKey } = useWallet();
  const { addPosition } = usePortfolio();
  const { quote, loading: quoteLoading, fetchQuote, getOutAmount } = useJupiterQuote();

  const pairMeta = PAIRS.find((p) => p.display === selectedPair);
  const currentPrice = prices[selectedCoinId]?.usd ?? 0;

  const [amount, setAmount] = useState("");
  const [orderType, setOrderType] = useState<"MARKET" | "LIMIT">("MARKET");
  const [limitPrice, setLimitPrice] = useState("");
  const [leverage, setLeverage] = useState(1);

  const parsedAmount = parseFloat(amount) || 0;
  const execPrice = orderType === "LIMIT" ? parseFloat(limitPrice) || currentPrice : currentPrice;
  const total = parsedAmount * execPrice;

  // Fetch Jupiter quote when amount changes
  useEffect(() => {
    if (!pairMeta || parsedAmount <= 0) return;
    fetchQuote(pairMeta.base, "USDC", parsedAmount);
  }, [parsedAmount, pairMeta, fetchQuote]);

  const jupiterTotal = getOutAmount("USDC");

  const handleTrade = (side: "LONG" | "SHORT") => {
    if (!parsedAmount || parsedAmount <= 0) return;

    const pos: Position = {
      id: genId(),
      pair: selectedPair,
      coinId: selectedCoinId,
      side,
      entry: execPrice,
      amount: parsedAmount,
      size: total * leverage,
      timestamp: Date.now(),
    };

    addPosition(pos);

    const verb = side === "LONG" ? "BUY" : "SELL";
    onAddActivity({
      text: `${verb} ${pairMeta?.base ?? ""} ${parsedAmount} @ $${fmtPrice(execPrice)}`,
      status: "FILLED",
      cls: side === "LONG" ? "text-[#22c55e]" : "text-[#ef4444]",
      time: Date.now(),
    });

    setAmount("");
    setLimitPrice("");
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="px-3 py-2 border-b border-[#2a2018]">
        <span className="font-mono text-[0.6rem] text-[#6b5c50] tracking-[1.5px] uppercase">
          Quick Trade — {selectedPair}
        </span>
      </div>

      <div className="p-3 flex flex-col gap-3">
        {/* Order type */}
        <div className="flex gap-1">
          {(["MARKET", "LIMIT"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setOrderType(t)}
              className={`flex-1 py-1.5 rounded font-mono text-[0.62rem] tracking-wider transition-colors cursor-pointer border ${
                orderType === t
                  ? "bg-[rgba(232,114,42,0.1)] border-[rgba(232,114,42,0.25)] text-[#f0923a]"
                  : "border-[#2a2018] text-[#6b5c50] hover:text-[#a89888]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Price input */}
        <div>
          <label className="font-mono text-[0.57rem] text-[#6b5c50] tracking-wider uppercase block mb-1">
            Price (USDC)
          </label>
          {orderType === "MARKET" ? (
            <div className="w-full px-3 py-2.5 bg-[#110e0a] border border-[#2a2018] rounded font-mono text-[0.75rem] text-[#f0923a]">
              {currentPrice ? `$${fmtPrice(currentPrice)}` : "···"}
            </div>
          ) : (
            <input
              type="number"
              value={limitPrice}
              onChange={(e) => setLimitPrice(e.target.value)}
              placeholder={currentPrice ? fmtPrice(currentPrice) : "0.00"}
              className="w-full px-3 py-2.5 bg-[#110e0a] border border-[#2a2018] rounded font-mono text-[0.75rem] text-[#f0e6dc] outline-none focus:border-[#e8722a] transition-colors"
            />
          )}
        </div>

        {/* Amount input */}
        <div>
          <label className="font-mono text-[0.57rem] text-[#6b5c50] tracking-wider uppercase block mb-1">
            Amount ({pairMeta?.base ?? "TOKEN"})
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full px-3 py-2.5 bg-[#110e0a] border border-[#2a2018] rounded font-mono text-[0.75rem] text-[#f0e6dc] outline-none focus:border-[#e8722a] transition-colors"
          />
        </div>

        {/* Leverage */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="font-mono text-[0.57rem] text-[#6b5c50] tracking-wider uppercase">
              Leverage
            </label>
            <span className="font-mono text-[0.65rem] text-[#f0923a]">{leverage}x</span>
          </div>
          <input
            type="range"
            min={1}
            max={10}
            value={leverage}
            onChange={(e) => setLeverage(parseInt(e.target.value))}
            className="w-full accent-[#e8722a] cursor-pointer"
          />
          <div className="flex justify-between font-mono text-[0.52rem] text-[#6b5c50] mt-1">
            <span>1x</span><span>5x</span><span>10x</span>
          </div>
        </div>

        {/* Total */}
        <div className="bg-[#110e0a] border border-[#2a2018] rounded p-2.5">
          <div className="flex justify-between items-center mb-1">
            <span className="font-mono text-[0.57rem] text-[#6b5c50] tracking-wider uppercase">Total</span>
            <span className="font-mono text-[0.72rem] text-[#f0e6dc]">
              ${total > 0 ? (total * leverage).toLocaleString("en-US", { maximumFractionDigits: 2 }) : "0.00"}
            </span>
          </div>
          {jupiterTotal !== null && parsedAmount > 0 && (
            <div className="flex justify-between items-center">
              <span className="font-mono text-[0.55rem] text-[#6b5c50]">Jupiter quote</span>
              <span className="font-mono text-[0.62rem] text-[#a89888]">
                {quoteLoading ? "···" : `$${jupiterTotal.toFixed(2)}`}
              </span>
            </div>
          )}
          {quote?.priceImpactPct && parseFloat(quote.priceImpactPct) > 0.1 && (
            <div className="flex justify-between items-center mt-1">
              <span className="font-mono text-[0.55rem] text-[#6b5c50]">Price impact</span>
              <span className="font-mono text-[0.6rem] text-[#ef4444]">
                {(parseFloat(quote.priceImpactPct) * 100).toFixed(3)}%
              </span>
            </div>
          )}
        </div>

        {/* Wallet warning */}
        {!publicKey && (
          <div className="bg-[rgba(232,114,42,0.05)] border border-[rgba(232,114,42,0.15)] rounded px-3 py-2">
            <span className="font-mono text-[0.6rem] text-[#a89888]">Connect wallet to trade</span>
          </div>
        )}

        {/* Trade buttons */}
        <button
          onClick={() => handleTrade("LONG")}
          disabled={!parsedAmount || parsedAmount <= 0}
          className="w-full py-3 rounded font-mono font-bold text-[0.82rem] tracking-wider bg-[#22c55e] text-[#0c0a08] hover:brightness-110 hover:-translate-y-0.5 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer border-none"
        >
          BUY / LONG
        </button>
        <button
          onClick={() => handleTrade("SHORT")}
          disabled={!parsedAmount || parsedAmount <= 0}
          className="w-full py-3 rounded font-mono font-bold text-[0.82rem] tracking-wider bg-[#ef4444] text-white hover:brightness-110 hover:-translate-y-0.5 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer border-none"
        >
          SELL / SHORT
        </button>
      </div>
    </div>
  );
}
