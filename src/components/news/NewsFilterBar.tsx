"use client";

import { useNewsFilterStore } from "@/store/newsFilterStore";
import React, { useRef, useState } from "react";
import type { NewsCategory } from "@/types/news";
import "./news.css";

const CATEGORIES: { value: NewsCategory; label: string; emoji: string }[] = [
  { value: "all", label: "All", emoji: "📰" },
  { value: "impact_news", label: "Impact News", emoji: "📈" },
  { value: "cluster_popular", label: "Popular", emoji: "💰" },
  { value: "cluster_popular|impact_news", label: "Macro", emoji: "🌐" },
  //   { value: "crypto", label: "Crypto", emoji: "₿" },
];

// Popular tickers for quick-select chips
const QUICK_TICKERS = ["AAPL", "NVDA", "MSFT", "TSLA", "GOOGL", "AMZN"];

export default function NewsFilterBar() {
  const filter = useNewsFilterStore((s) => s.filter);
  const setTicker = useNewsFilterStore((s) => s.setTicker);
  const setCategory = useNewsFilterStore((s) => s.setCategory);
  const resetFilter = useNewsFilterStore((s) => s.resetFilter);

  // Local input state — only commits to Zustand on Enter or blur
  const [inputValue, setInputValue] = useState(filter.ticker ?? "");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset both Zustand and local input together in one event —
  // no useEffect sync needed because there's no external reset path
  const handleReset = () => {
    resetFilter(); // clears Zustand
    setInputValue(""); // clears local input
  };

  const commitTicker = (val: string) => {
    const trimmed = val.trim().toUpperCase();
    setTicker(trimmed || undefined);
    setInputValue(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      commitTicker(inputValue);
      inputRef.current?.blur();
    }
    if (e.key === "Escape") {
      setInputValue(filter.ticker ?? "");
      inputRef.current?.blur();
    }
  };

  const handleQuickTicker = (ticker: string) => {
    // Toggle: clicking the active ticker clears it
    if (ticker === filter.ticker) {
      setTicker(undefined);
      setInputValue("");
    } else {
      setTicker(ticker);
      setInputValue(ticker);
    }
  };

  const isFiltered = filter.ticker || filter.category !== "all";

  return (
    <div className="filter-bar-root">
      {/* ── Row 1: Ticker search ── */}
      <div className="ticker-row">
        <div className={`ticker-input-wrap ${isFocused ? "focused" : ""}`}>
          {/* Search icon */}
          <svg
            className="search-icon"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="6.5"
              cy="6.5"
              r="4.5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M10.5 10.5L14 14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>

          <input
            ref={inputRef}
            type="text"
            className="ticker-input"
            placeholder="Filter by ticker…"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toUpperCase())}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
              commitTicker(inputValue);
            }}
            maxLength={8}
            aria-label="Filter news by ticker symbol"
          />

          {/* Clear button — only when there's a value */}
          {inputValue && (
            <button
              className="clear-btn"
              onClick={() => {
                setInputValue("");
                setTicker(undefined);
                inputRef.current?.focus();
              }}
              aria-label="Clear ticker filter"
            >
              <svg
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 2l8 8M10 2l-8 8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Reset all button */}
        {isFiltered && (
          <button
            className="reset-btn"
            onClick={handleReset}
            aria-label="Reset all filters"
          >
            Reset
          </button>
        )}
      </div>

      {/* ── Row 2: Quick-select ticker chips ── */}
      <div
        className="chips-row"
        role="group"
        aria-label="Quick ticker filters"
      >
        {QUICK_TICKERS.map((ticker) => (
          <button
            key={ticker}
            className={`chip ticker-chip ${filter.ticker === ticker ? "active" : ""}`}
            onClick={() => handleQuickTicker(ticker)}
            aria-pressed={filter.ticker === ticker}
          >
            {ticker}
          </button>
        ))}
      </div>

      {/* ── Row 3: Category pills ── */}
      <div
        className="category-row"
        role="tablist"
        aria-label="Filter by news category"
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            role="tab"
            className={`category-pill ${filter.category === cat.value ? "active" : ""}`}
            onClick={() => setCategory(cat.value)}
            aria-selected={filter.category === cat.value}
          >
            <span
              className="cat-emoji"
              aria-hidden="true"
            >
              {cat.emoji}
            </span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* ── Active filter summary ── */}
      {isFiltered && (
        <p
          className="filter-summary"
          aria-live="polite"
        >
          Showing
          {filter.ticker && <strong> {filter.ticker}</strong>}
          {filter.ticker && filter.category !== "all" && " · "}
          {filter.category !== "all" && (
            <strong> {filter.category}</strong>
          )}{" "}
          news
        </p>
      )}
    </div>
  );
}
