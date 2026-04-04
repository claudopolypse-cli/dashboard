"use client";

import { useEffect, useState } from "react";

export interface Position {
  id: string;
  pair: string;
  coinId: string;
  side: "LONG" | "SHORT";
  entry: number;
  amount: number;
  size: number; // USDC value at entry
  timestamp: number;
}

const KEY = "claudopolypse_positions";

export function usePortfolio() {
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored) setPositions(JSON.parse(stored));
    } catch {}
  }, []);

  const save = (next: Position[]) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
    setPositions(next);
  };

  const addPosition = (pos: Position) => {
    setPositions((prev) => {
      const next = [...prev, pos];
      save(next);
      return next;
    });
  };

  const closePosition = (id: string) => {
    setPositions((prev) => {
      const next = prev.filter((p) => p.id !== id);
      save(next);
      return next;
    });
  };

  return { positions, addPosition, closePosition };
}
