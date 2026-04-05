"use client";

import { useState, useEffect, useCallback } from "react";
import { PriceMap } from "./usePrices";

export interface SnipeTarget {
  id: string;
  pair: string;
  coinId: string;
  targetPrice: number;
  direction: "ABOVE" | "BELOW";
  note?: string;
  createdAt: number;
  triggered: boolean;
  triggeredAt?: number;
}

const KEY = "claudopolypse_snipe_targets";

export function useSnipeTargets() {
  const [targets, setTargets] = useState<SnipeTarget[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored) setTargets(JSON.parse(stored));
    } catch {}
  }, []);

  const save = useCallback((next: SnipeTarget[]) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
    setTargets(next);
  }, []);

  const addTarget = useCallback(
    (t: Omit<SnipeTarget, "id" | "createdAt" | "triggered">) => {
      setTargets((prev) => {
        const target: SnipeTarget = {
          ...t,
          id: Math.random().toString(36).slice(2) + Date.now().toString(36),
          createdAt: Date.now(),
          triggered: false,
        };
        const next = [target, ...prev];
        try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
        return next;
      });
    },
    []
  );

  const removeTarget = useCallback(
    (id: string) => {
      setTargets((prev) => {
        const next = prev.filter((t) => t.id !== id);
        try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
        return next;
      });
    },
    []
  );

  const checkAndTrigger = useCallback(
    (prices: PriceMap) => {
      setTargets((prev) => {
        let changed = false;
        const next = prev.map((t) => {
          if (t.triggered) return t;
          const price = prices[t.coinId]?.usd;
          if (!price) return t;
          const hit =
            t.direction === "ABOVE"
              ? price >= t.targetPrice
              : price <= t.targetPrice;
          if (hit) {
            changed = true;
            return { ...t, triggered: true, triggeredAt: Date.now() };
          }
          return t;
        });
        if (changed) {
          try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
        }
        return changed ? next : prev;
      });
    },
    []
  );

  return { targets, addTarget, removeTarget, checkAndTrigger };
}
