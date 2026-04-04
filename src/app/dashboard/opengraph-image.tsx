import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Claudopolypse — Solana Trading Terminal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const pairs = [
    { name: "SOL/USDC", price: "$187.42", change: "+12.4%", up: true },
    { name: "JUP/USDC", price: "$1.84", change: "+8.7%", up: true },
    { name: "RAY/USDC", price: "$6.21", change: "-3.2%", up: false },
    { name: "BONK/USD", price: "$0.000034", change: "+42.1%", up: true },
    { name: "WIF/USDC", price: "$2.67", change: "+18.9%", up: true },
  ];

  const activities = [
    { text: "BUY SOL 10.00 @ $187.42", status: "FILLED", up: true },
    { text: "SELL RAY 500 @ $6.80", status: "FILLED", up: true },
    { text: "BUY JUP 2000 @ $1.62", status: "FILLED", up: true },
    { text: "ALERT: WIF +15% in 1h", status: "TRIGGERED", up: false },
  ];

  // Candlestick bars data — manually positioned for visual effect
  const bars = [
    { x: 10, h: 40, up: false }, { x: 26, h: 50, up: false },
    { x: 42, h: 40, up: true }, { x: 58, h: 55, up: true },
    { x: 74, h: 35, up: false }, { x: 90, h: 60, up: true },
    { x: 106, h: 45, up: true }, { x: 122, h: 30, up: false },
    { x: 138, h: 55, up: true }, { x: 154, h: 45, up: true },
    { x: 170, h: 35, up: false }, { x: 186, h: 65, up: true },
    { x: 202, h: 30, up: false }, { x: 218, h: 55, up: true },
    { x: 234, h: 45, up: true }, { x: 250, h: 30, up: false },
    { x: 266, h: 60, up: true }, { x: 282, h: 25, up: false },
    { x: 298, h: 50, up: true }, { x: 314, h: 45, up: true },
    { x: 330, h: 35, up: false }, { x: 346, h: 65, up: true },
    { x: 362, h: 30, up: false }, { x: 378, h: 55, up: true },
    { x: 394, h: 40, up: true },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0c0a08",
          display: "flex",
          flexDirection: "column",
          fontFamily: "monospace",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            top: -100,
            left: "50%",
            transform: "translateX(-50%)",
            width: 800,
            height: 500,
            background: "radial-gradient(circle, rgba(232,114,42,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 44,
            padding: "0 20px",
            background: "#110e0a",
            borderBottom: "1px solid #2a2018",
          }}
        >
          {/* Logo + name */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                background: "linear-gradient(135deg, #e8722a, #f59e0b)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0c0a08",
                fontSize: 13,
                fontWeight: 900,
              }}
            >
              C
            </div>
            <span style={{ color: "#f0e6dc", fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>
              CLAUDOPOLYPSE
            </span>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex" }}>
            {["TRADE", "PORTFOLIO", "SNIPER", "ANALYTICS"].map((t, i) => (
              <div
                key={t}
                style={{
                  padding: "0 16px",
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  fontSize: 11,
                  letterSpacing: 1.5,
                  color: i === 0 ? "#f0923a" : "#6b5c50",
                  borderBottom: i === 0 ? "2px solid #e8722a" : "2px solid transparent",
                  background: i === 0 ? "rgba(232,114,42,0.05)" : "transparent",
                }}
              >
                {t}
              </div>
            ))}
          </div>

          {/* Status */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 10px",
              borderRadius: 4,
              background: "rgba(34,197,94,0.06)",
              border: "1px solid rgba(34,197,94,0.15)",
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
            <span style={{ color: "#22c55e", fontSize: 10, letterSpacing: 1.5 }}>MAINNET</span>
          </div>
        </div>

        {/* Body — 3 columns */}
        <div style={{ display: "flex", flex: 1 }}>

          {/* Watchlist */}
          <div
            style={{
              width: 180,
              borderRight: "1px solid #2a2018",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                padding: "8px 12px",
                borderBottom: "1px solid #2a2018",
                fontSize: 9,
                color: "#6b5c50",
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              WATCHLIST
            </div>
            {pairs.map((p, i) => (
              <div
                key={p.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "9px 12px",
                  borderBottom: "1px solid rgba(42,32,24,0.5)",
                  borderLeft: i === 0 ? "2px solid #e8722a" : "2px solid transparent",
                  background: i === 0 ? "rgba(232,114,42,0.06)" : "transparent",
                }}
              >
                <span style={{ fontSize: 11, color: "#f0e6dc", fontWeight: 600 }}>{p.name}</span>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                  <span style={{ fontSize: 10, color: "#f0923a" }}>{p.price}</span>
                  <span style={{ fontSize: 9, color: p.up ? "#22c55e" : "#ef4444" }}>{p.change}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Center: chart + pair header */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              borderRight: "1px solid #2a2018",
            }}
          >
            {/* Pair header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "8px 16px",
                borderBottom: "1px solid #2a2018",
                background: "#0e0c0a",
              }}
            >
              <span style={{ fontSize: 13, color: "#f0e6dc", fontWeight: 700 }}>SOL/USDC</span>
              <span style={{ fontSize: 16, color: "#f0923a", fontWeight: 700 }}>$187.42</span>
              <span style={{ fontSize: 11, color: "#22c55e" }}>▲ 12.40%</span>
            </div>

            {/* Chart */}
            <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column" }}>
              {/* Timeframe buttons */}
              <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
                {["1D", "1W", "1M"].map((t, i) => (
                  <div
                    key={t}
                    style={{
                      padding: "3px 10px",
                      borderRadius: 4,
                      fontSize: 10,
                      letterSpacing: 1,
                      color: i === 0 ? "#f0923a" : "#6b5c50",
                      background: i === 0 ? "rgba(232,114,42,0.1)" : "transparent",
                      border: i === 0 ? "1px solid rgba(232,114,42,0.25)" : "1px solid transparent",
                    }}
                  >
                    {t}
                  </div>
                ))}
              </div>

              {/* Candlestick SVG */}
              <div
                style={{
                  flex: 1,
                  background: "#161210",
                  border: "1px solid #2a2018",
                  borderRadius: 6,
                  padding: "10px 8px",
                  display: "flex",
                  alignItems: "flex-end",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Grid lines */}
                {[0.25, 0.5, 0.75].map((pct) => (
                  <div
                    key={pct}
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      top: `${pct * 100}%`,
                      height: 1,
                      background: "#2a2018",
                    }}
                  />
                ))}

                {/* Bars */}
                <div style={{ display: "flex", alignItems: "flex-end", gap: 3, width: "100%", height: "100%" }}>
                  {bars.map((b, i) => {
                    const maxH = 130;
                    const normH = Math.min(b.h * 1.5, maxH);
                    return (
                      <div
                        key={i}
                        style={{
                          flex: 1,
                          height: normH,
                          background: b.up ? "#22c55e" : "#ef4444",
                          borderRadius: 1,
                          opacity: 0.85,
                        }}
                      />
                    );
                  })}
                </div>

                {/* Current price line */}
                <div
                  style={{
                    position: "absolute",
                    top: "12%",
                    left: 0,
                    right: 0,
                    height: 1,
                    background: "rgba(240,146,58,0.5)",
                    borderTop: "1px dashed rgba(240,146,58,0.5)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "8%",
                    right: 6,
                    fontSize: 9,
                    color: "#f0923a",
                    background: "rgba(240,146,58,0.12)",
                    padding: "2px 5px",
                    borderRadius: 3,
                  }}
                >
                  $187.42
                </div>
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div style={{ width: 220, display: "flex", flexDirection: "column" }}>
            {/* Quick trade */}
            <div
              style={{
                padding: "10px 14px",
                borderBottom: "1px solid #2a2018",
                flex: 1,
              }}
            >
              <div style={{ fontSize: 9, color: "#6b5c50", letterSpacing: 2, marginBottom: 10, textTransform: "uppercase" }}>
                Quick Trade — SOL/USDC
              </div>

              {/* Order type */}
              <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
                {["MARKET", "LIMIT"].map((t, i) => (
                  <div
                    key={t}
                    style={{
                      flex: 1,
                      padding: "5px 0",
                      textAlign: "center",
                      fontSize: 10,
                      letterSpacing: 1,
                      borderRadius: 4,
                      color: i === 0 ? "#f0923a" : "#6b5c50",
                      background: i === 0 ? "rgba(232,114,42,0.1)" : "transparent",
                      border: i === 0 ? "1px solid rgba(232,114,42,0.25)" : "1px solid #2a2018",
                    }}
                  >
                    {t}
                  </div>
                ))}
              </div>

              {/* Inputs */}
              {[["Price (USDC)", "$187.42"], ["Amount (SOL)", "10.00"], ["Total", "$1,874.20"]].map(([label, val]) => (
                <div key={label} style={{ marginBottom: 6 }}>
                  <div style={{ fontSize: 8, color: "#6b5c50", letterSpacing: 1, marginBottom: 3, textTransform: "uppercase" }}>{label}</div>
                  <div
                    style={{
                      padding: "6px 10px",
                      background: "#110e0a",
                      border: "1px solid #2a2018",
                      borderRadius: 4,
                      fontSize: 11,
                      color: "#f0923a",
                    }}
                  >
                    {val}
                  </div>
                </div>
              ))}

              {/* Buttons */}
              <div
                style={{
                  marginTop: 10,
                  padding: "8px 0",
                  textAlign: "center",
                  background: "#22c55e",
                  borderRadius: 4,
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#0c0a08",
                  letterSpacing: 1,
                  marginBottom: 5,
                }}
              >
                BUY / LONG
              </div>
              <div
                style={{
                  padding: "8px 0",
                  textAlign: "center",
                  background: "#ef4444",
                  borderRadius: 4,
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#ffffff",
                  letterSpacing: 1,
                }}
              >
                SELL / SHORT
              </div>
            </div>

            {/* Activity log */}
            <div style={{ borderTop: "1px solid #2a2018", padding: "8px 14px" }}>
              <div style={{ fontSize: 9, color: "#6b5c50", letterSpacing: 2, marginBottom: 6, textTransform: "uppercase" }}>
                Recent Activity
              </div>
              {activities.map((a, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "4px 0",
                    borderBottom: "1px solid rgba(42,32,24,0.3)",
                    fontSize: 9,
                  }}
                >
                  <span style={{ color: "#a89888" }}>{a.text}</span>
                  <span style={{ color: a.up ? "#22c55e" : "#f0923a" }}>{a.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom brand strip */}
        <div
          style={{
            height: 36,
            background: "#110e0a",
            borderTop: "1px solid #2a2018",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
          }}
        >
          <span style={{ fontSize: 11, color: "#6b5c50", letterSpacing: 1 }}>claudopolypse.app</span>
          <span style={{ fontSize: 11, color: "#f0923a", letterSpacing: 1 }}>Trade Solana at Terminal Speed</span>
          <span style={{ fontSize: 10, color: "#6b5c50", letterSpacing: 1 }}>Powered by Jupiter · CoinGecko</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
