"use client";

import { useEffect, useState, useCallback } from "react";

export const PAIRS = [
  { display: "SOL/USDC", id: "solana", base: "SOL" },
  { display: "JUP/USDC", id: "jupiter-exchange-solana", base: "JUP" },
  { display: "RAY/USDC", id: "raydium", base: "RAY" },
  { display: "BONK/USD", id: "bonk", base: "BONK" },
  { display: "WIF/USDC", id: "dogwifcoin", base: "WIF" },
  { display: "PYTH/USDC", id: "pyth-network", base: "PYTH" },
  { display: "RNDR/USDC", id: "render-token", base: "RNDR" },
];

export interface PriceData {
  usd: number;
  usd_24h_change: number;
}

export type PriceMap = Record<string, PriceData>;

const IDS = PAIRS.map((p) => p.id).join(",");
const URL = `https://api.coingecko.com/api/v3/simple/price?ids=${IDS}&vs_currencies=usd&include_24hr_change=true`;

export function usePrices() {
  const [prices, setPrices] = useState<PriceMap>({});
  const [lastUpdated, setLastUpdated] = useState<number>(0);
  const [error, setError] = useState(false);

  const fetchPrices = useCallback(async () => {
    try {
      const res = await fetch(URL);
      if (!res.ok) throw new Error("fetch failed");
      const data: PriceMap = await res.json();
      setPrices(data);
      setLastUpdated(Date.now());
      setError(false);
    } catch {
      setError(true);
    }
  }, []);

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 10_000);
    return () => clearInterval(interval);
  }, [fetchPrices]);

  // Map display pair → price data
  const getPairPrice = (cgId: string): PriceData | null => prices[cgId] ?? null;

  return { prices, getPairPrice, lastUpdated, error };
}
