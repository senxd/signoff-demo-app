"use client";

import { useEffect, useMemo, useState } from "react";

const WATCHLIST_STORAGE_KEY = "dashboard.watchlist.symbols.v1";
const DEFAULT_SYMBOLS = ["NVDA", "AAPL", "MSFT", "SPY"];

const watchlistRows = [
  { symbol: "NVDA", name: "NVIDIA", price: "$191.52", change: "+1.84%", volume: "178.2M" },
  { symbol: "AAPL", name: "Apple", price: "$212.44", change: "+0.36%", volume: "61.4M" },
  { symbol: "MSFT", name: "Microsoft", price: "$486.90", change: "-0.12%", volume: "24.7M" },
  { symbol: "SPY", name: "SPDR S&P 500 ETF", price: "$612.08", change: "+0.21%", volume: "74.1M" },
];

function readSymbols() {
  if (typeof window === "undefined") return DEFAULT_SYMBOLS;
  try {
    const raw = window.localStorage.getItem(WATCHLIST_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : undefined;
    if (!Array.isArray(parsed)) return DEFAULT_SYMBOLS;
    const symbols = parsed.filter((item): item is string => typeof item === "string");
    return symbols.length > 0 ? symbols.map((item) => item.toUpperCase()) : DEFAULT_SYMBOLS;
  } catch {
    return DEFAULT_SYMBOLS;
  }
}

export function WatchlistShell() {
  const [symbols, setSymbols] = useState(DEFAULT_SYMBOLS);

  useEffect(() => {
    setSymbols(readSymbols());
  }, []);

  const rows = useMemo(
    () => symbols.map((symbol) => watchlistRows.find((row) => row.symbol === symbol) ?? {
      symbol,
      name: "Custom ticker",
      price: "Pending",
      change: "+0.00%",
      volume: "Pending",
    }),
    [symbols],
  );

  return (
    <section className="watchlist-shell">
      <div className="watchlist-header">
        <div>
          <p className="eyebrow">Guest watchlist</p>
          <h1>Market Watchlist</h1>
        </div>
        <p className="watchlist-status">Seeded by Browserbase localStorage</p>
      </div>

      <div className="signoff-mobile-card-grid" aria-label="Mobile watchlist cards">
        {symbols.map((symbol) => {
          const item = watchlistRows.find((row) => row.symbol === symbol);
          return (
            <article className="watchlist-card" key={symbol}>
              <div>
                <h2>{symbol}</h2>
                <p>{item?.name ?? "Watchlist company"}</p>
              </div>
              <div className="watchlist-card-metrics">
                <span>{item?.price ?? "Pending"}</span>
                <span className={item?.change?.startsWith("-") ? "negative" : "positive"}>
                  {item?.change ?? "+0.00%"}
                </span>
              </div>
            </article>
          );
        })}
      </div>

      <div className="watchlist-table-frame">
        <table className="watchlist-table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Name</th>
              <th>Price</th>
              <th>Change</th>
              <th>Volume</th>
              <th>Analyst note</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.symbol}>
                <td><strong>{row.symbol}</strong></td>
                <td>{row.name}</td>
                <td>{row.price}</td>
                <td className={row.change.startsWith("-") ? "negative" : "positive"}>{row.change}</td>
                <td>{row.volume}</td>
                <td>Track momentum, liquidity, and short-term risk before trade review.</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .watchlist-shell {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin: 0 auto;
          max-width: 1120px;
          padding: 40px 20px;
        }

        .watchlist-header {
          align-items: flex-end;
          display: flex;
          gap: 20px;
          justify-content: space-between;
        }

        .eyebrow {
          color: #536075;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0;
          margin: 0 0 8px;
          text-transform: uppercase;
        }

        h1 {
          font-size: 36px;
          letter-spacing: 0;
          line-height: 1.1;
          margin: 0;
        }

        .watchlist-status {
          background: #e7f7ee;
          border: 1px solid #b7e8cb;
          border-radius: 999px;
          color: #116238;
          font-size: 13px;
          font-weight: 700;
          margin: 0;
          padding: 8px 12px;
          white-space: nowrap;
        }
        .signoff-mobile-card-grid {
        display: none;
      }

      .watchlist-table-frame {
        border: 1px solid #d8dee9;
        border-radius: 12px;
        overflow-x: auto;
        background: white;
      }

        .watchlist-table {
          border-collapse: collapse;
          min-width: 920px;
          width: 100%;
        }

        th,
        td {
          border-bottom: 1px solid #eef1f6;
          padding: 14px 16px;
          text-align: left;
          vertical-align: top;
        }

        th {
          color: #536075;
          font-size: 12px;
          text-transform: uppercase;
        }

        td {
          font-size: 14px;
        }

        .positive {
          color: #14834f;
          font-weight: 700;
        }

        .negative {
          color: #bc2f33;
          font-weight: 700;
        }
        @media (max-width: 640px) {
        .watchlist-shell {
          padding: 24px 14px;
        }

        .watchlist-header {
          align-items: flex-start;
          flex-direction: column;
        }

        .watchlist-status {
          white-space: normal;
        }

        .signoff-mobile-card-grid {
          display: grid;
          gap: 12px;
        }

        .watchlist-card {
          align-items: flex-start;
          background: white;
          border: 1px solid #d8dee9;
          border-radius: 12px;
          display: flex;
          justify-content: space-between;
          gap: 16px;
          padding: 16px;
        }

        .watchlist-card h2 {
          font-size: 18px;
          margin: 0;
        }

        .watchlist-card p {
          color: #5f6b7a;
          font-size: 13px;
          margin: 4px 0 0;
        }

        .watchlist-card-metrics {
          display: grid;
          gap: 4px;
          text-align: right;
          white-space: nowrap;
        }

        .watchlist-table-frame {
          display: none;
        }
      }
      `}</style>
    </section>
  );
}

