"use client";

import { useEffect, useState, useCallback } from "react";

export interface CoinMarket {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  image: string;
}

const SOLANA_IDS = [
  "solana",
  "jupiter-exchange-solana",
  "raydium",
  "bonk",
  "dogwifcoin",
  "pyth-network",
  "render-token",
  "jito-governance-token",
  "orca-so",
  "marinade",
  "kamino",
  "drift-protocol",
  "helium",
  "tensor",
].join(",");

const MARKET_URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${SOLANA_IDS}&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=24h`;

export function useMarketData() {
  const [coins, setCoins] = useState<CoinMarket[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(0);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(MARKET_URL);
      if (!res.ok) throw new Error("fetch failed");
      const data: CoinMarket[] = await res.json();
      setCoins(data);
      setLastUpdated(Date.now());
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60_000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return { coins, loading, lastUpdated, error };
}
