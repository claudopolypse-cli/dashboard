import { ReactNode } from "react";

// ── Reusable doc primitives ──────────────────────────────────────────────────

function P({ children }: { children: ReactNode }) {
  return <p className="text-[#a89888] leading-[1.8] mb-4 text-[0.92rem]">{children}</p>;
}

function H3({ children }: { children: ReactNode }) {
  return <h3 className="text-[1.05rem] font-semibold text-[#f0e6dc] mt-8 mb-3">{children}</h3>;
}

function Code({ children }: { children: ReactNode }) {
  return (
    <code className="font-mono text-[0.78rem] bg-[rgba(232,114,42,0.08)] border border-[rgba(232,114,42,0.15)] text-[#f0923a] px-1.5 py-0.5 rounded">
      {children}
    </code>
  );
}

function CodeBlock({ children, label }: { children: string; label?: string }) {
  return (
    <div className="my-5 rounded-lg overflow-hidden border border-[#2a2018]">
      {label && (
        <div className="px-4 py-1.5 bg-[#110e0a] border-b border-[#2a2018] font-mono text-[0.58rem] text-[#6b5c50] tracking-wider uppercase">
          {label}
        </div>
      )}
      <pre className="bg-[#0e0c0a] px-5 py-4 overflow-x-auto font-mono text-[0.78rem] text-[#a89888] leading-[1.9] whitespace-pre">
        {children}
      </pre>
    </div>
  );
}

function Callout({ type = "info", children }: { type?: "info" | "warning" | "tip"; children: ReactNode }) {
  const styles = {
    info: "border-[rgba(232,114,42,0.25)] bg-[rgba(232,114,42,0.05)] text-[#a89888]",
    warning: "border-[rgba(239,68,68,0.25)] bg-[rgba(239,68,68,0.05)] text-[#a89888]",
    tip: "border-[rgba(34,197,94,0.25)] bg-[rgba(34,197,94,0.05)] text-[#a89888]",
  };
  const icons = { info: "ℹ", warning: "⚠", tip: "✦" };
  const labelColors = { info: "text-[#f0923a]", warning: "text-[#ef4444]", tip: "text-[#22c55e]" };
  const labels = { info: "NOTE", warning: "WARNING", tip: "TIP" };

  return (
    <div className={`border rounded-lg px-4 py-3.5 my-5 flex gap-3 text-[0.85rem] leading-[1.7] ${styles[type]}`}>
      <span className={`font-mono text-[0.7rem] shrink-0 mt-0.5 ${labelColors[type]}`}>{icons[type]}</span>
      <div>
        <span className={`font-mono text-[0.6rem] font-bold tracking-wider ${labelColors[type]} block mb-1`}>
          {labels[type]}
        </span>
        {children}
      </div>
    </div>
  );
}

function StepList({ steps }: { steps: { n: string; title: string; desc: ReactNode }[] }) {
  return (
    <div className="flex flex-col gap-4 my-5">
      {steps.map((s) => (
        <div key={s.n} className="flex gap-4 items-start">
          <div className="w-7 h-7 shrink-0 flex items-center justify-center rounded border border-[rgba(232,114,42,0.25)] bg-[rgba(232,114,42,0.05)] font-mono text-[0.65rem] font-bold text-[#f0923a]">
            {s.n}
          </div>
          <div>
            <div className="font-semibold text-[0.9rem] text-[#f0e6dc] mb-1">{s.title}</div>
            <div className="text-[0.83rem] text-[#a89888] leading-[1.7]">{s.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto my-5 rounded-lg border border-[#2a2018]">
      <table className="w-full font-mono text-[0.78rem]">
        <thead>
          <tr className="border-b border-[#2a2018] bg-[#110e0a]">
            {headers.map((h) => (
              <th key={h} className="px-4 py-2.5 text-left text-[#6b5c50] tracking-wider font-semibold uppercase text-[0.62rem]">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-[#2a2018]/50 hover:bg-[#110e0a] transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2.5 text-[#a89888]">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Badge({ children, color = "orange" }: { children: ReactNode; color?: "orange" | "green" | "red" }) {
  const cls = {
    orange: "bg-[rgba(232,114,42,0.1)] border-[rgba(232,114,42,0.25)] text-[#f0923a]",
    green: "bg-[rgba(34,197,94,0.1)] border-[rgba(34,197,94,0.25)] text-[#22c55e]",
    red: "bg-[rgba(239,68,68,0.1)] border-[rgba(239,68,68,0.25)] text-[#ef4444]",
  };
  return (
    <span className={`font-mono text-[0.6rem] tracking-wider border rounded px-1.5 py-0.5 ${cls[color]}`}>
      {children}
    </span>
  );
}

// ── Section structure ──────────────────────────────────────────────────────

export interface DocSection {
  group: string;
  items: {
    id: string;
    label: string;
    title: string;
    content: ReactNode;
  }[];
}

export const DOC_SECTIONS: DocSection[] = [
  {
    group: "Introduction",
    items: [
      {
        id: "getting-started",
        label: "Getting Started",
        title: "Welcome to Claudopolypse",
        content: (
          <>
            <P>
              Claudopolypse is a Solana-native trading terminal built for serious traders. Unlike typical DEX swap UIs,
              Claudopolypse is designed around execution speed — giving you a pro-grade interface with real-time market
              data, multi-pair watchlists, candlestick charts, and Jupiter-routed order flows.
            </P>
            <P>
              This documentation covers everything you need to go from wallet connection to active trading in under
              five minutes.
            </P>

            <Callout type="tip">
              If you just want to dive in, go straight to{" "}
              <a href="/dashboard" className="text-[#f0923a] underline">
                the terminal
              </a>{" "}
              and connect your Phantom or Solflare wallet. Everything is self-explanatory from there.
            </Callout>

            <H3>Prerequisites</H3>
            <P>Before using Claudopolypse, you need:</P>
            <ul className="list-none flex flex-col gap-2 mb-5">
              {[
                ["Solana wallet", "Phantom or Solflare (browser extension or mobile)"],
                ["SOL balance", "At least 0.01 SOL for transaction fees"],
                ["Token balance", "The token you want to trade (e.g. USDC for buying, SOL for selling)"],
              ].map(([term, def]) => (
                <li key={term} className="flex gap-3 items-start text-[0.85rem]">
                  <span className="font-mono text-[#f0923a] mt-0.5">→</span>
                  <span>
                    <span className="font-semibold text-[#f0e6dc]">{term}</span>{" "}
                    <span className="text-[#a89888]">— {def}</span>
                  </span>
                </li>
              ))}
            </ul>

            <H3>Supported Tokens</H3>
            <Table
              headers={["Token", "Pair", "CoinGecko ID"]}
              rows={[
                [<Badge key="sol">SOL</Badge>, "SOL/USDC", "solana"],
                [<Badge key="jup">JUP</Badge>, "JUP/USDC", "jupiter-exchange-solana"],
                [<Badge key="ray">RAY</Badge>, "RAY/USDC", "raydium"],
                [<Badge key="bonk">BONK</Badge>, "BONK/USD", "bonk"],
                [<Badge key="wif">WIF</Badge>, "WIF/USDC", "dogwifcoin"],
                [<Badge key="pyth">PYTH</Badge>, "PYTH/USDC", "pyth-network"],
                [<Badge key="rndr">RNDR</Badge>, "RNDR/USDC", "render-token"],
              ]}
            />
          </>
        ),
      },
      {
        id: "connect-wallet",
        label: "Connect Your Wallet",
        title: "Connect Your Wallet",
        content: (
          <>
            <P>
              Claudopolypse supports <strong className="text-[#f0e6dc]">Phantom</strong> and{" "}
              <strong className="text-[#f0e6dc]">Solflare</strong> wallets. Your keys never leave your browser — we
              never custody your funds or store private keys.
            </P>

            <StepList
              steps={[
                {
                  n: "01",
                  title: "Install a Wallet",
                  desc: (
                    <>
                      Download{" "}
                      <span className="text-[#f0923a]">Phantom</span> or{" "}
                      <span className="text-[#f0923a]">Solflare</span> as a browser extension from their official
                      websites. Make sure you save your seed phrase in a secure location.
                    </>
                  ),
                },
                {
                  n: "02",
                  title: "Open the Terminal",
                  desc: (
                    <>
                      Navigate to <Code>/dashboard</Code>. You will see a{" "}
                      <Code>CONNECT WALLET</Code> button in the top-right corner of the terminal.
                    </>
                  ),
                },
                {
                  n: "03",
                  title: "Approve the Connection",
                  desc: "A modal will appear listing available wallets. Select your wallet. Your wallet extension will ask you to approve the connection — click Approve.",
                },
                {
                  n: "04",
                  title: "Verify Connection",
                  desc: (
                    <>
                      Once connected, your wallet address appears in the top bar (e.g.{" "}
                      <Code>Ab3d...fG9h</Code>). The MAINNET status indicator turns green.
                    </>
                  ),
                },
              ]}
            />

            <Callout type="warning">
              Claudopolypse connects to <strong>Solana Mainnet</strong>. All trades use real funds.
              Never connect a wallet with funds you cannot afford to lose. Test with small amounts first.
            </Callout>

            <H3>Disconnecting</H3>
            <P>
              Click your wallet address in the top bar, then click <Code>DISCONNECT</Code>. Your session data is
              cleared immediately. Positions stored in localStorage remain available next time you connect.
            </P>
          </>
        ),
      },
    ],
  },
  {
    group: "The Terminal",
    items: [
      {
        id: "terminal-overview",
        label: "Terminal Overview",
        title: "Terminal Layout",
        content: (
          <>
            <P>
              The terminal is divided into four main zones. Each zone is designed to maximize information density
              without creating noise.
            </P>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
              {[
                { zone: "A", name: "Watchlist", desc: "Left sidebar. Shows all tracked pairs with live prices and 24h change. Click any row to switch the active chart." },
                { zone: "B", name: "Chart Panel", desc: "Center top. TradingView-style candlestick chart for the selected pair. Supports 1D, 1W, 1M timeframes." },
                { zone: "C", name: "Positions Panel", desc: "Center bottom. Lists all your open simulated positions with live PnL calculated against current market prices." },
                { zone: "D", name: "Trade Panel", desc: "Right column top. Market/Limit order form with amount, leverage, and real Jupiter quote for price estimation." },
                { zone: "E", name: "Activity Log", desc: "Right column bottom. Chronological log of all trade actions (BUY, SELL, CLOSE) with timestamps." },
              ].map((z) => (
                <div
                  key={z.zone}
                  className="bg-[#110e0a] border border-[#2a2018] rounded-lg p-4 hover:border-[rgba(232,114,42,0.25)] transition-colors"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="w-6 h-6 rounded bg-[rgba(232,114,42,0.1)] border border-[rgba(232,114,42,0.2)] flex items-center justify-center font-mono text-[0.65rem] font-bold text-[#f0923a]">
                      {z.zone}
                    </span>
                    <span className="font-semibold text-[0.88rem] text-[#f0e6dc]">{z.name}</span>
                  </div>
                  <p className="text-[0.8rem] text-[#a89888] leading-[1.6]">{z.desc}</p>
                </div>
              ))}
            </div>

            <H3>Navigation Tabs</H3>
            <Table
              headers={["Tab", "Status", "Description"]}
              rows={[
                ["TRADE", <Badge key="t" color="green">Live</Badge>, "Main trading view — chart, watchlist, order form"],
                ["PORTFOLIO", <Badge key="p" color="green">Live</Badge>, "Overview of all open positions and total PnL"],
                ["SNIPER", <Badge key="s" color="red">Soon</Badge>, "Target-based entry triggers and sniper workflows"],
                ["ANALYTICS", <Badge key="a" color="red">Soon</Badge>, "Historical performance and trading statistics"],
              ]}
            />
          </>
        ),
      },
      {
        id: "watchlist",
        label: "Watchlist",
        title: "Watchlist & Pair Selection",
        content: (
          <>
            <P>
              The watchlist on the left sidebar displays real-time prices for all 7 supported pairs, fetched every
              10 seconds from the CoinGecko API. No API key is required.
            </P>

            <H3>Reading the Watchlist</H3>
            <Table
              headers={["Element", "Meaning"]}
              rows={[
                [<Code key="p">Pair name</Code>, "Token symbol and quote currency (e.g. SOL/USDC)"],
                ["Orange price", "Current USD price from CoinGecko"],
                ["Green % change", "24h price change — positive"],
                ["Red % change", "24h price change — negative"],
                [<Badge key="live" color="green">LIVE</Badge>, "Data is fresh (updated within last 15 seconds)"],
                [<Badge key="stale" color="red">STALE</Badge>, "No successful fetch in the last 15 seconds"],
              ]}
            />

            <H3>Switching Pairs</H3>
            <P>
              Click any row in the watchlist to switch the active pair. The chart will reload with OHLCV data for
              the selected token, and the Trade Panel will update its price and Jupiter quote context.
            </P>

            <Callout type="info">
              The active pair is highlighted with an orange left border and a subtle orange background tint.
            </Callout>
          </>
        ),
      },
      {
        id: "chart",
        label: "Candlestick Chart",
        title: "Candlestick Chart",
        content: (
          <>
            <P>
              Claudopolypse uses{" "}
              <strong className="text-[#f0e6dc]">TradingView Lightweight Charts v5</strong> for the candlestick
              display. Chart data is fetched from CoinGecko&apos;s OHLC endpoint.
            </P>

            <H3>Timeframes</H3>
            <Table
              headers={["Button", "Period", "Candle interval"]}
              rows={[
                ["1D", "Last 24 hours", "~30 minute candles"],
                ["1W", "Last 7 days", "4 hour candles"],
                ["1M", "Last 30 days", "Daily candles"],
              ]}
            />

            <H3>Reading the Chart</H3>
            <ul className="flex flex-col gap-2 mb-5">
              {[
                ["Green candles", "Closing price higher than opening (bullish)"],
                ["Red candles", "Closing price lower than opening (bearish)"],
                ["Wicks", "High and low of the candle period"],
                ["Dashed crosshair", "Shows exact price and time when hovering"],
                ["Orange price label", "Current price pinned on the right axis"],
              ].map(([k, v]) => (
                <li key={k} className="flex gap-3 items-start text-[0.84rem]">
                  <span className="font-mono text-[#f0923a] mt-0.5 shrink-0">→</span>
                  <span>
                    <span className="font-semibold text-[#f0e6dc]">{k}</span>
                    <span className="text-[#a89888]"> — {v}</span>
                  </span>
                </li>
              ))}
            </ul>

            <Callout type="info">
              The CoinGecko free tier provides OHLC data without an API key. Data refreshes when you switch pairs
              or timeframes, not on a continuous interval (to stay within rate limits).
            </Callout>
          </>
        ),
      },
    ],
  },
  {
    group: "Trading",
    items: [
      {
        id: "placing-orders",
        label: "Placing Orders",
        title: "Placing Orders",
        content: (
          <>
            <P>
              The Trade Panel (right column) lets you open LONG or SHORT positions on any supported pair.
              Orders are simulated locally — no on-chain transaction is submitted. Real Jupiter quotes are
              fetched to give you accurate price estimates.
            </P>

            <H3>Order Types</H3>
            <Table
              headers={["Type", "How it works"]}
              rows={[
                ["MARKET", "Executes at the current live price from CoinGecko. Best for immediate entries."],
                ["LIMIT", "You specify the target entry price. The position opens at that price regardless of current market."],
              ]}
            />

            <H3>How to Open a Position</H3>
            <StepList
              steps={[
                { n: "01", title: "Select a pair", desc: "Click the pair in the Watchlist. The Trade Panel updates to show the current price." },
                {
                  n: "02",
                  title: "Choose Market or Limit",
                  desc: (
                    <>
                      Toggle between <Code>MARKET</Code> and <Code>LIMIT</Code> at the top of the Trade Panel.
                      For Limit orders, enter your desired entry price.
                    </>
                  ),
                },
                {
                  n: "03",
                  title: "Enter amount",
                  desc: "Type the number of tokens you want to trade. The Jupiter Quote API will automatically fetch a real swap estimate as you type.",
                },
                {
                  n: "04",
                  title: "Set leverage (optional)",
                  desc: "Use the slider to set leverage from 1x to 10x. This multiplies your position size for PnL calculations.",
                },
                {
                  n: "05",
                  title: "Click BUY / LONG or SELL / SHORT",
                  desc: "The position is added to your Open Positions panel and persisted to localStorage. The Activity Log records the action.",
                },
              ]}
            />

            <Callout type="warning">
              Claudopolypse currently runs in <strong>simulation mode</strong>. No real on-chain transactions are
              submitted. Future versions will integrate full Jupiter swap execution.
            </Callout>
          </>
        ),
      },
      {
        id: "jupiter-quotes",
        label: "Jupiter Price Quotes",
        title: "Jupiter Price Quotes",
        content: (
          <>
            <P>
              When you type an amount in the Trade Panel, Claudopolypse automatically queries the{" "}
              <strong className="text-[#f0e6dc]">Jupiter v6 Quote API</strong> to get a real swap estimate.
              This gives you accurate pricing including liquidity depth, routing, and price impact.
            </P>

            <H3>What the Quote Shows</H3>
            <Table
              headers={["Field", "Description"]}
              rows={[
                ["Jupiter quote", "Estimated USDC output for your exact input amount, routed through Jupiter aggregator"],
                ["Price impact", "How much your trade moves the market. Shown in red if above 0.1%"],
                ["Total (leveraged)", "Your raw total × leverage multiplier for position sizing"],
              ]}
            />

            <H3>Quote API Endpoint</H3>
            <CodeBlock label="Jupiter v6 Quote API">{`GET https://quote-api.jup.ag/v6/quote
  ?inputMint=So111...112        // SOL mint
  ?outputMint=EPjFW...1v       // USDC mint
  ?amount=1000000000           // 1 SOL in lamports
  ?slippageBps=50              // 0.5% slippage tolerance`}</CodeBlock>

            <Callout type="tip">
              Jupiter quotes are fetched with a 400ms debounce — so they only fire after you stop typing,
              not on every keystroke.
            </Callout>

            <H3>Token Mints Reference</H3>
            <CodeBlock label="Solana mainnet token mints">{`SOL   → So11111111111111111111111111111111111111112
USDC  → EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
JUP   → JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN
RAY   → 4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R
BONK  → DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263
WIF   → EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm
PYTH  → HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3
RNDR  → rndrizKT3MK1iimdxRdWabcF7Zg7AR5T4nud4EkHBof`}</CodeBlock>
          </>
        ),
      },
      {
        id: "positions-pnl",
        label: "Positions & PnL",
        title: "Open Positions & PnL",
        content: (
          <>
            <P>
              Every time you open a trade, a position is created and stored in your browser&apos;s{" "}
              <Code>localStorage</Code>. Positions persist across page refreshes and browser sessions as long
              as you use the same browser.
            </P>

            <H3>PnL Calculation</H3>
            <P>
              PnL is calculated in real time using live prices from the Watchlist. The formula is:
            </P>
            <CodeBlock label="PnL formula">{`// LONG position
pnl = ((current_price - entry_price) / entry_price) × position_size

// SHORT position
pnl = ((entry_price - current_price) / entry_price) × position_size

// Position size includes leverage
position_size = amount × entry_price × leverage`}</CodeBlock>

            <H3>Closing a Position</H3>
            <P>
              Click the <Code>CLOSE</Code> button on any position row. The realized PnL is calculated at
              the current market price and logged to the Activity Log. The position is removed from
              localStorage immediately.
            </P>

            <H3>Portfolio View</H3>
            <P>
              Switch to the <Code>PORTFOLIO</Code> tab in the top bar for a summary view showing:
            </P>
            <ul className="flex flex-col gap-2 mb-4 text-[0.84rem] text-[#a89888]">
              {[
                "Total number of open positions",
                "Aggregate unrealized PnL across all positions",
                "Estimated total portfolio value",
              ].map((item) => (
                <li key={item} className="flex gap-2 items-start">
                  <span className="text-[#f0923a] mt-0.5">◈</span>
                  {item}
                </li>
              ))}
            </ul>
          </>
        ),
      },
      {
        id: "leverage",
        label: "Leverage",
        title: "Leverage & Position Sizing",
        content: (
          <>
            <P>
              Claudopolypse supports simulated leverage from <strong className="text-[#f0e6dc]">1x to 10x</strong>.
              Leverage multiplies your effective position size for PnL calculation — it does not represent real
              on-chain borrowing at this stage.
            </P>

            <Callout type="warning">
              Leverage amplifies both gains and losses. A 10x leveraged position can lose its entire notional
              value with a 10% adverse move. Use leverage carefully.
            </Callout>

            <H3>Leverage Examples</H3>
            <Table
              headers={["Amount", "Leverage", "Position Size", "10% Move PnL"]}
              rows={[
                ["1 SOL @ $180", "1x", "$180", "±$18"],
                ["1 SOL @ $180", "3x", "$540", "±$54"],
                ["1 SOL @ $180", "5x", "$900", "±$90"],
                ["1 SOL @ $180", "10x", "$1,800", "±$180"],
              ]}
            />

            <P>
              Set leverage using the slider in the Trade Panel before clicking BUY/SELL. The{" "}
              <Code>Total</Code> field updates in real time to reflect the leveraged position size.
            </P>
          </>
        ),
      },
    ],
  },
  {
    group: "Data & APIs",
    items: [
      {
        id: "price-feeds",
        label: "Price Feeds",
        title: "Price Feed Architecture",
        content: (
          <>
            <P>
              All market data is sourced from the <strong className="text-[#f0e6dc]">CoinGecko Public API v3</strong>.
              No API key is required. The terminal polls prices in a single batched request every 10 seconds.
            </P>

            <H3>Live Price Polling</H3>
            <CodeBlock label="CoinGecko simple/price endpoint">{`GET https://api.coingecko.com/api/v3/simple/price
  ?ids=solana,jupiter-exchange-solana,raydium,
       bonk,dogwifcoin,pyth-network,render-token
  ?vs_currencies=usd
  ?include_24hr_change=true

// Response
{
  "solana": {
    "usd": 187.42,
    "usd_24h_change": 12.38
  },
  ...
}`}</CodeBlock>

            <H3>OHLCV Chart Data</H3>
            <CodeBlock label="CoinGecko OHLC endpoint">{`GET https://api.coingecko.com/api/v3/coins/{id}/ohlc
  ?vs_currency=usd
  ?days=1     // 1D, 7 = 1W, 30 = 1M

// Response: array of [timestamp, open, high, low, close]
[
  [1712131200000, 185.10, 188.44, 184.20, 187.42],
  ...
]`}</CodeBlock>

            <H3>Rate Limits</H3>
            <Table
              headers={["Endpoint", "Calls/min (free tier)", "Our usage"]}
              rows={[
                ["simple/price", "~30/min", "6/min (1 batch every 10s)"],
                ["coins/{id}/ohlc", "~30/min", "On demand only (pair switch)"],
                ["Jupiter Quote", "Unlimited", "On demand (debounced 400ms)"],
              ]}
            />

            <Callout type="tip">
              If you see <Badge color="red">STALE</Badge> in the watchlist, CoinGecko may be rate limiting your
              IP. Wait 30 seconds and the feed will resume automatically.
            </Callout>
          </>
        ),
      },
      {
        id: "local-storage",
        label: "Local Storage",
        title: "Local Storage & Data Persistence",
        content: (
          <>
            <P>
              Claudopolypse stores your simulated positions in the browser&apos;s{" "}
              <Code>localStorage</Code> under the key <Code>claudopolypse_positions</Code>. No data is sent
              to any server.
            </P>

            <H3>Position Data Structure</H3>
            <CodeBlock label="Position object schema">{`{
  id: string,          // unique random ID
  pair: string,        // e.g. "SOL/USDC"
  coinId: string,      // CoinGecko ID e.g. "solana"
  side: "LONG"|"SHORT",
  entry: number,       // entry price in USD
  amount: number,      // token amount
  size: number,        // USD value × leverage
  timestamp: number    // Unix ms
}`}</CodeBlock>

            <H3>Clearing Your Data</H3>
            <P>
              To manually clear all positions, open your browser console and run:
            </P>
            <CodeBlock label="Browser console">{`localStorage.removeItem("claudopolypse_positions");
location.reload();`}</CodeBlock>

            <Callout type="warning">
              Data stored in localStorage is browser-specific. If you use a different browser or clear browser
              data, your positions will not carry over.
            </Callout>
          </>
        ),
      },
    ],
  },
  {
    group: "Reference",
    items: [
      {
        id: "keyboard-shortcuts",
        label: "Keyboard Shortcuts",
        title: "Keyboard Shortcuts",
        content: (
          <>
            <P>
              Claudopolypse is designed for speed. Here are keyboard shortcuts available in the terminal (coming in v1.1):
            </P>
            <Table
              headers={["Shortcut", "Action"]}
              rows={[
                [<Code key="1">T</Code>, "Switch to TRADE tab"],
                [<Code key="2">P</Code>, "Switch to PORTFOLIO tab"],
                [<Code key="3">1 / 7 / 30</Code>, "Switch chart timeframe (1D / 1W / 1M)"],
                [<Code key="4">↑ / ↓</Code>, "Navigate watchlist pairs"],
                [<Code key="5">Enter</Code>, "Select highlighted pair"],
                [<Code key="6">Esc</Code>, "Close any modal"],
              ]}
            />
            <Callout type="info">
              Keyboard shortcuts are planned for v1.1. Currently all interactions are mouse-based.
            </Callout>
          </>
        ),
      },
      {
        id: "faq",
        label: "FAQ",
        title: "Frequently Asked Questions",
        content: (
          <>
            {[
              {
                q: "Are my trades real?",
                a: "No. Claudopolypse is currently in simulation mode. No on-chain transactions are submitted. All positions are stored locally in your browser. Jupiter quotes are fetched for accurate price estimates, but no swap is executed.",
              },
              {
                q: "Why do I need to connect a wallet if trades are simulated?",
                a: "Wallet connection establishes your identity on-chain and is required for the upcoming real trade execution feature. Connecting your wallet now ensures a smooth upgrade path when live trading is enabled.",
              },
              {
                q: "The watchlist shows STALE — what do I do?",
                a: "CoinGecko's free tier has rate limits (~30 requests/min per IP). If you see STALE, wait 30–60 seconds. The terminal will automatically retry and the status will return to LIVE.",
              },
              {
                q: "My positions disappeared after a browser update",
                a: "Positions are stored in localStorage which can be cleared by browser updates, private browsing sessions, or manual cache clears. Export functionality (CSV/JSON) is planned for v1.2.",
              },
              {
                q: "Does leverage work on-chain?",
                a: "Not currently. Leverage in the current version is a simulation multiplier that affects PnL calculations only. Real leveraged trading via protocols like Drift or Mango is on the roadmap.",
              },
              {
                q: "What is Sniper Mode?",
                a: "Sniper Mode (coming soon) lets you set target entry prices with automatic triggers. When your target price is hit, the position is opened automatically without manual intervention.",
              },
              {
                q: "Which wallets are supported?",
                a: "Phantom and Solflare are supported via the Solana Wallet Adapter standard. More wallets (Backpack, Glow, Ledger) will be added in future updates.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="mb-6 border border-[#2a2018] rounded-lg overflow-hidden hover:border-[rgba(232,114,42,0.2)] transition-colors">
                <div className="px-4 py-3 bg-[#110e0a] flex items-start gap-3">
                  <span className="font-mono text-[0.65rem] text-[#f0923a] mt-0.5 shrink-0">Q</span>
                  <span className="font-semibold text-[0.88rem] text-[#f0e6dc]">{q}</span>
                </div>
                <div className="px-4 py-3 flex items-start gap-3">
                  <span className="font-mono text-[0.65rem] text-[#22c55e] mt-0.5 shrink-0">A</span>
                  <span className="text-[0.83rem] text-[#a89888] leading-[1.7]">{a}</span>
                </div>
              </div>
            ))}
          </>
        ),
      },
      {
        id: "roadmap",
        label: "Roadmap",
        title: "Roadmap",
        content: (
          <>
            <P>
              Claudopolypse is actively developed. Here&apos;s what&apos;s planned across upcoming releases.
            </P>

            {[
              {
                version: "v1.0",
                label: "Current",
                color: "green" as const,
                items: [
                  "7-pair watchlist with live CoinGecko prices",
                  "TradingView lightweight-charts (1D/1W/1M)",
                  "Simulated LONG/SHORT with 1–10x leverage",
                  "Jupiter v6 Quote API integration",
                  "Phantom + Solflare wallet adapter",
                  "LocalStorage position persistence",
                  "Portfolio overview tab",
                ],
              },
              {
                version: "v1.1",
                label: "Next",
                color: "orange" as const,
                items: [
                  "Keyboard shortcuts for full keyboard-driven trading",
                  "Sniper Mode — target-based auto entries",
                  "Alert system — price alerts via browser notifications",
                  "Volume data overlay on charts",
                  "More pairs (JITO, POPCAT, MEW, TRUMP)",
                ],
              },
              {
                version: "v1.2",
                label: "Planned",
                color: "red" as const,
                items: [
                  "Real on-chain swap execution via Jupiter",
                  "Real leveraged trading via Drift Protocol",
                  "Position export (CSV / JSON)",
                  "Analytics tab — win rate, avg hold time, best trades",
                  "Backpack, Glow, Ledger wallet support",
                ],
              },
            ].map((milestone) => (
              <div key={milestone.version} className="mb-7">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-[0.75rem] font-bold text-[#f0e6dc]">{milestone.version}</span>
                  <Badge color={milestone.color}>{milestone.label}</Badge>
                </div>
                <ul className="flex flex-col gap-2">
                  {milestone.items.map((item) => (
                    <li key={item} className="flex gap-2.5 items-start text-[0.84rem] text-[#a89888]">
                      <span className={`mt-1 shrink-0 ${milestone.color === "green" ? "text-[#22c55e]" : milestone.color === "orange" ? "text-[#f0923a]" : "text-[#6b5c50]"}`}>
                        {milestone.color === "green" ? "✓" : "○"}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        ),
      },
    ],
  },
];
