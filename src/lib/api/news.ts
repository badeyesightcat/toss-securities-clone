// Write the raw fetch function.
// This is just a plain async function — no hooks, no React.
// It accepts a cursor for pagination and a filter object for ticker/category filtering.

import type { NewsFeedPage, NewsFilter } from "@/types/news";

export async function fetchNewsPage(
  filter: NewsFilter,
  cursor: string | null,
): Promise<NewsFeedPage> {
  const params = new URLSearchParams();

  if (filter.ticker) params.set("ticker", filter.ticker);

  if (filter.category !== "all") params.set("category", filter.category);

  if (cursor) params.set("cursor", cursor);

  const res = await fetch(`/api/news?${params}`, {
    next: {
      revalidate: 60, // Next.js: cache for 60s
    },
  });

  if (!res.ok) throw new Error("Failed to fetch news");

  return res.json();
}
