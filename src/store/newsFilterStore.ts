// The selected ticker and category are UI state
// — they don't come from the server.
// Store them in Zustand so any component in the tree
// can read or update the filter without prop drilling.

import { create } from "zustand";
import type { NewsFilter, NewsCategory } from "@/types/news";

interface NewsFilterState {
  filter: NewsFilter;
  setTicker: (ticker: string | undefined) => void;
  setCategory: (category: NewsCategory) => void;
  resetFilter: () => void;
}

const DEFAUL_FILTER: NewsFilter = {
  ticker: undefined,
  category: "all",
};

export const useNewsFilterStore = create<NewsFilterState>((set) => ({
  filter: DEFAUL_FILTER,

  setTicker: (ticker) =>
    set((state) => ({ filter: { ...state.filter, ticker } })),

  setCategory: (category) =>
    set((state) => ({ filter: { ...state.filter, category } })),

  resetFilter: () => set({ filter: DEFAUL_FILTER }),
}));
