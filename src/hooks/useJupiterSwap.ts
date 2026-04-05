"use client";

import { useCallback, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { VersionedTransaction } from "@solana/web3.js";
import { TOKEN_MINTS, DECIMALS } from "./useJupiterQuote";

export type SwapStatus = "idle" | "quoting" | "signing" | "sending" | "confirming" | "success" | "error";

export interface SwapResult {
  signature: string;
  inputAmount: number;
  outputAmount: number;
  inputToken: string;
  outputToken: string;
}

export function useJupiterSwap() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction, connected } = useWallet();
  const [status, setStatus] = useState<SwapStatus>("idle");
  const [result, setResult] = useState<SwapResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const executeSwap = useCallback(
    async (inputToken: string, outputToken: string, humanAmount: number) => {
      if (!publicKey || !connected) {
        setError("Wallet not connected");
        return null;
      }

      const inputMint = TOKEN_MINTS[inputToken];
      const outputMint = TOKEN_MINTS[outputToken];
      if (!inputMint || !outputMint) {
        setError("Unknown token mint");
        return null;
      }

      setStatus("quoting");
      setError(null);
      setResult(null);

      try {
        // 1. Get quote
        const dec = DECIMALS[inputToken] ?? 6;
        const amount = Math.round(humanAmount * Math.pow(10, dec));
        const quoteUrl = `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=50`;
        const quoteRes = await fetch(quoteUrl);
        if (!quoteRes.ok) throw new Error("Failed to get quote");
        const quoteData = await quoteRes.json();

        // 2. Get serialized swap transaction
        setStatus("signing");
        const swapRes = await fetch("https://quote-api.jup.ag/v6/swap", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            quoteResponse: quoteData,
            userPublicKey: publicKey.toString(),
            wrapAndUnwrapSol: true,
            dynamicComputeUnitLimit: true,
            prioritizationFeeLamports: "auto",
          }),
        });
        if (!swapRes.ok) throw new Error("Failed to build swap transaction");
        const { swapTransaction } = await swapRes.json();

        // 3. Deserialize
        const txBuf = Buffer.from(swapTransaction, "base64");
        const transaction = VersionedTransaction.deserialize(txBuf);

        // 4. Sign & send
        setStatus("sending");
        const signature = await sendTransaction(transaction, connection, {
          skipPreflight: false,
          maxRetries: 2,
        });

        // 5. Confirm
        setStatus("confirming");
        const confirmation = await connection.confirmTransaction(signature, "confirmed");
        if (confirmation.value.err) throw new Error("Transaction failed on-chain");

        const outDec = DECIMALS[outputToken] ?? 6;
        const swapResult: SwapResult = {
          signature,
          inputAmount: humanAmount,
          outputAmount: parseFloat(quoteData.outAmount) / Math.pow(10, outDec),
          inputToken,
          outputToken,
        };

        setResult(swapResult);
        setStatus("success");
        return swapResult;
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Swap failed";
        setError(msg);
        setStatus("error");
        return null;
      }
    },
    [publicKey, connected, connection, sendTransaction]
  );

  const reset = useCallback(() => {
    setStatus("idle");
    setResult(null);
    setError(null);
  }, []);

  return { executeSwap, status, result, error, reset };
}
