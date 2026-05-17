// 06.
// The Client Component that connects everything.
// It reads filter from Zustand,
// passes it to the hook,
// renders the list, and wires up the 'load more' button.

// 07.
// The most impressive UX improvement:
// when the user hovers 'Load more',
// start fetching the next page before they click.
// By the time they click, the data is already in cache — no spinner.

"use client";

import NewsCard from "@/components/news/NewsCard";
import NewsFilterBar from "@/components/news/NewsFilterBar";
import { useNewsFeed } from "@/hooks/useNews";
import { fetchMockNewsPage as fetchNewsPage } from "@/lib/api/news.mock";
import { useNewsFilterStore } from "@/store/newsFilterStore";
import { useQueryClient } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";

export function NewsFeed() {
  const queryClient = useQueryClient();

  // Read filter from Zustand
  const filter = useNewsFilterStore((state) => state.filter);

  // Pass it to the hook — queryKey updates automatically
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
    dataUpdatedAt,
    refetch,
  } = useNewsFeed(filter);

  // Flatten pages array into a single articles list
  const articles = data?.pages.flatMap((page) => page.articles) ?? [];

  const handlePrefetch = () => {
    if (!hasNextPage || isFetchingNextPage) return;

    const lastPage = data?.pages[data.pages.length - 1];
    const nextCursor = lastPage?.nextCursor;

    // Manually prime the cache with the next page
    queryClient.prefetchQuery({
      queryKey: ["news", filter.ticker ?? "all", filter.category, nextCursor],
      queryFn: () => fetchNewsPage(filter, nextCursor ?? null),
      staleTime: 5 * 60 * 1000,
    });
  };

  if (isLoading) return <Skeleton count={4} />;
  //   if (error) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div>
      <NewsFilterBar />

      {/* Stale indicator */}
      {/* {dataUpdatedAt && Date.now() - dataUpdatedAt > 5 * 60 * 1000 && (
        <StaleNotice updatedAt={dataUpdatedAt} />
      )} */}

      <ul>
        {articles.map((article) => (
          <NewsCard
            key={article.id}
            article={article}
          />
        ))}
      </ul>

      {hasNextPage && (
        <button
          onMouseEnter={handlePrefetch} // prefetch on hover
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
}
