"use client";

import { useEffect, useRef } from "react";
import { createChart, CandlestickSeries, ColorType, IChartApi, ISeriesApi } from "lightweight-charts";
import type { CandleData, Timeframe } from "@/hooks/useOHLCV";

interface Props {
  candles: CandleData[];
  loading: boolean;
  timeframe: Timeframe;
  onTimeframeChange: (t: Timeframe) => void;
  currentPrice?: number;
}

const TF_LABELS: { value: Timeframe; label: string }[] = [
  { value: "1", label: "1D" },
  { value: "7", label: "1W" },
  { value: "30", label: "1M" },
];

export default function CandleChart({ candles, loading, timeframe, onTimeframeChange, currentPrice }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "#161210" },
        textColor: "#6b5c50",
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 11,
      },
      grid: {
        vertLines: { color: "#2a2018", style: 1 },
        horzLines: { color: "#2a2018", style: 1 },
      },
      crosshair: {
        vertLine: { color: "#e8722a", labelBackgroundColor: "#e8722a" },
        horzLine: { color: "#e8722a", labelBackgroundColor: "#e8722a" },
      },
      rightPriceScale: {
        borderColor: "#2a2018",
        textColor: "#6b5c50",
      },
      timeScale: {
        borderColor: "#2a2018",
        timeVisible: true,
        secondsVisible: false,
      },
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight || 260,
    });

    const series = chart.addSeries(CandlestickSeries, {
      upColor: "#22c55e",
      downColor: "#ef4444",
      borderUpColor: "#22c55e",
      borderDownColor: "#ef4444",
      wickUpColor: "#22c55e",
      wickDownColor: "#ef4444",
    });

    chartRef.current = chart;
    seriesRef.current = series;

    const ro = new ResizeObserver(() => {
      if (containerRef.current) {
        chart.applyOptions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight || 260,
        });
      }
    });
    ro.observe(containerRef.current);

    return () => {
      ro.disconnect();
      chart.remove();
    };
  }, []);

  useEffect(() => {
    if (seriesRef.current && candles.length > 0) {
      seriesRef.current.setData(candles);
      chartRef.current?.timeScale().fitContent();
    }
  }, [candles]);

  return (
    <div className="flex flex-col h-full">
      {/* Chart toolbar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#2a2018]">
        <div className="flex items-center gap-1">
          {TF_LABELS.map((t) => (
            <button
              key={t.value}
              onClick={() => onTimeframeChange(t.value)}
              className={`px-2.5 py-1 rounded font-mono text-[0.62rem] tracking-wider transition-colors cursor-pointer border ${
                timeframe === t.value
                  ? "bg-[rgba(232,114,42,0.1)] border-[rgba(232,114,42,0.25)] text-[#f0923a]"
                  : "border-transparent text-[#6b5c50] hover:text-[#a89888]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        {currentPrice && (
          <span className="font-mono text-[0.72rem] text-[#f0923a] font-semibold">
            ${currentPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
          </span>
        )}
      </div>

      {/* Chart area */}
      <div className="relative flex-1 min-h-0">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#161210]/80 z-10">
            <span className="font-mono text-[0.65rem] text-[#6b5c50] tracking-widest animate-pulse">
              LOADING...
            </span>
          </div>
        )}
        <div ref={containerRef} className="w-full h-full" />
      </div>
    </div>
  );
}
