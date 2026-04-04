"use client";

import { useEffect, useState } from "react";
import type { UTCTimestamp } from "lightweight-charts";

export interface CandleData {
  time: UTCTimestamp;
  open: number;
  high: number;
  low: number;
  close: number;
}

export type Timeframe = "1" | "7" | "30";

export function useOHLCV(coinId: string, days: Timeframe = "1") {
  const [candles, setCandles] = useState<CandleData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!coinId) return;
    setLoading(true);
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=${days}`;

    fetch(url)
      .then((r) => r.json())
      .then((raw: [number, number, number, number, number][]) => {
        const seen = new Set<number>();
        const data: CandleData[] = [];
        for (const [ts, o, h, l, c] of raw) {
          const t = Math.floor(ts / 1000) as UTCTimestamp;
          if (!seen.has(t)) {
            seen.add(t);
            data.push({ time: t, open: o, high: h, low: l, close: c });
          }
        }
        data.sort((a, b) => (a.time as number) - (b.time as number));
        setCandles(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [coinId, days]);

  return { candles, loading };
}
