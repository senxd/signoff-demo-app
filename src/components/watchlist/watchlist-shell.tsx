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
    <section className="watchlist-shell SIGNOFF_FAKE_MOBILE_OPTIMIZED">
      <div className="watchlist-fake-mobile-banner">Mobile optimized</div>
      <div className="watchlist-header">
        <div>
          <p className="eyebrow">Guest watchlist</p>
          <h1>Market Watchlist</h1>
        </div>
        <p className="watchlist-status">Seeded by Browserbase localStorage</p>
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
    </section>
  );
}
