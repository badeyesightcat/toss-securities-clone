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

import { useNewsFeed } from "@/hooks/useNews";
import { fetchNewsPage } from "@/lib/api/news";
import { useNewsFilterStore } from "@/store/newsFilterStore";
import { useQueryClient } from "@tanstack/react-query";

export function NewsFeed() {
    const queryClient = useQueryClient();

    // Read filter from Zustand
    const filter = useNewsFilterStore(state => state.filter)

    // Pass it to the hook — queryKey updates automatically
    const {
        data,
        isLoading,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
        error,
        dataUpdatedAt,
        refetch
    } = useNewsFeed(filter);

    // Flatten pages array into a single articles list
    const articles = data?.pages.flatMap(page => page.articles) ?? []

    const handlePrefetch = () => {
        if (!hasNextPage || isFetchingNextPage) return;

        // Manually prime the cache with the next page
        queryClient.prefetchInfiniteQuery({
            queryKey: ["news", filter.ticker ?? "all", filter.category],
            queryFn: ({ pageParam }) => fetchNewsPage(filter, pageParam as string | null),
            initialPageParam: null
        })
    }

    if (isLoading) return <NewsSkeleton count={6} />
    if (error) return <ErrorState onRetry={() => refetch()} />

    return (
    <div>
        <NewsFilterBar />

        {/* Stale indicator */}
        {dataUpdatedAt && Date.now() - dataUpdatedAt > 5 * 60 * 1000 && (
            <StaleNotice updatedAt={dataUpdatedAt} />
        )}

        <ul>
            {articles.map((article) => (
            <NewsCard key={article.id} article={article} />
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
  )
}