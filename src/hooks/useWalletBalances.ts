"use client";

import { useCallback, useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, AccountLayout } from "@solana/spl-token";
import { TOKEN_MINTS } from "./useJupiterQuote";

export interface TokenBalance {
  symbol: string;
  mint: string;
  balance: number;
  decimals: number;
}

// Reverse map: mint → symbol
const MINT_TO_SYMBOL: Record<string, string> = Object.fromEntries(
  Object.entries(TOKEN_MINTS).map(([sym, mint]) => [mint, sym])
);

const DECIMALS_MAP: Record<string, number> = {
  SOL: 9, USDC: 6, JUP: 6, RAY: 6, BONK: 5, WIF: 6, PYTH: 6, RNDR: 8,
};

export function useWalletBalances() {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();
  const [balances, setBalances] = useState<TokenBalance[]>([]);
  const [solBalance, setSolBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(0);

  const fetchBalances = useCallback(async () => {
    if (!publicKey || !connected) {
      setBalances([]);
      setSolBalance(null);
      return;
    }

    setLoading(true);
    try {
      // Fetch SOL balance
      const lamports = await connection.getBalance(publicKey);
      setSolBalance(lamports / LAMPORTS_PER_SOL);

      // Fetch all SPL token accounts
      const tokenAccounts = await connection.getTokenAccountsByOwner(publicKey, {
        programId: TOKEN_PROGRAM_ID,
      });

      const parsed: TokenBalance[] = [];
      for (const { account } of tokenAccounts.value) {
        const data = AccountLayout.decode(account.data);
        const mintAddress = new PublicKey(data.mint).toBase58();
        const symbol = MINT_TO_SYMBOL[mintAddress];
        if (!symbol) continue; // Only show tracked tokens

        const decimals = DECIMALS_MAP[symbol] ?? 6;
        const balance = Number(data.amount) / Math.pow(10, decimals);
        if (balance > 0) {
          parsed.push({ symbol, mint: mintAddress, balance, decimals });
        }
      }

      // Sort by symbol
      parsed.sort((a, b) => a.symbol.localeCompare(b.symbol));
      setBalances(parsed);
      setLastUpdated(Date.now());
    } catch (e) {
      console.error("Failed to fetch wallet balances", e);
    } finally {
      setLoading(false);
    }
  }, [publicKey, connected, connection]);

  // Fetch on connect and every 30s
  useEffect(() => {
    fetchBalances();
    if (!connected) return;
    const interval = setInterval(fetchBalances, 30_000);
    return () => clearInterval(interval);
  }, [fetchBalances, connected]);

  return { balances, solBalance, loading, lastUpdated, refetch: fetchBalances };
}
