"use client";

import { useState, useCallback, useRef } from "react";

export const TOKEN_MINTS: Record<string, string> = {
  SOL: "So11111111111111111111111111111111111111112",
  USDC: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  JUP: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
  RAY: "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
  BONK: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
  WIF: "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm",
  PYTH: "HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3",
  RNDR: "rndrizKT3MK1iimdxRdWabcF7Zg7AR5T4nud4EkHBof",
};

export interface JupiterQuote {
  inAmount: string;
  outAmount: string;
  priceImpactPct: string;
  routePlan: unknown[];
}

export const DECIMALS: Record<string, number> = {
  SOL: 9, USDC: 6, JUP: 6, RAY: 6, BONK: 5, WIF: 6, PYTH: 6, RNDR: 8,
};

export function useJupiterQuote() {
  const [quote, setQuote] = useState<JupiterQuote | null>(null);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchQuote = useCallback((inputToken: string, outputToken: string, humanAmount: number) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!humanAmount || humanAmount <= 0) { setQuote(null); return; }

    debounceRef.current = setTimeout(async () => {
      const inputMint = TOKEN_MINTS[inputToken];
      const outputMint = TOKEN_MINTS[outputToken];
      if (!inputMint || !outputMint) return;

      const dec = DECIMALS[inputToken] ?? 6;
      const amount = Math.round(humanAmount * Math.pow(10, dec));

      setLoading(true);
      try {
        const url = `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=50`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("quote failed");
        const data: JupiterQuote = await res.json();
        setQuote(data);
      } catch {
        setQuote(null);
      } finally {
        setLoading(false);
      }
    }, 400);
  }, []);

  const getOutAmount = (outputToken: string): number | null => {
    if (!quote) return null;
    const dec = DECIMALS[outputToken] ?? 6;
    return parseFloat(quote.outAmount) / Math.pow(10, dec);
  };

  return { quote, loading, fetchQuote, getOutAmount };
}
