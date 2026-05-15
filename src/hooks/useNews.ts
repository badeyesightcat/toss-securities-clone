// This is the core of the News Feed page.
// useInfiniteQuery manages all pagination state for you
// — current page,
// — loading states,
// — fetching next page,
// — and the flattened article list.
//
// What you get back:
// const {
//   data,           // { pages: NewsFeedPage[], pageParams: [...] }
//   isLoading,      // true only on first load
//   isFetchingNextPage,  // true when loading next page
//   hasNextPage,    // false when nextCursor is null
//   fetchNextPage,  // call this to load more
//   error,
//   refetch,
// } = useNewsFeed(filter)

import type { NewsFilter, NewsFeedPage } from "@/types/news";
import { fetchNewsPage } from "@/lib/api/news";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

export function useNewsFeed(filter: NewsFilter) {
  return useInfiniteQuery<
    NewsFeedPage,
    Error,
    InfiniteData<NewsFeedPage>,
    string[],
    string | null
  >({
    // Key changes when filter changes → auto-refetch
    queryKey: ["news", filter.ticker ?? "all", filter.category],

    queryFn: ({ pageParam = null }) =>
      fetchNewsPage(filter, pageParam as string | null),

    initialPageParam: null,

    // Tell Query how to get the next cursor from each page
    getNextPageParam: (lastPage) => lastPage.nextCursor || null,

    staleTime: 5 * 60 * 1000, // 5 minutes — news doesn't change that fast
    gcTime: 10 * 60 * 1000, // keep in cache 10 min after unmount
  });
}
