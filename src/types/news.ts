export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  source: string; // e.g. "Reuters", "Bloomberg"
  publishedAt: string; // ISO 8601
  // tickers: string[]; // related tickers e.g. ["AAPL", "MSFT"] => 클로드가 줬으나 토스는 없고 아래 relatedStocks가 토스거
  category: NewsCategory;
  imageUrl?: string;
  // url: string;
  relatedStocks: RelatedStockItem[];
  nation: string;
}

export interface RelatedStockItem {
  stockCode: string;
  stockName: string;
  logoImageUrl: string;
  fluctuation: number;
  market: string;
}

export type NewsCategory = string; //  "market" | "earnings" | "macro" | "crypto" | "all";

export interface NewsFilter {
  ticker?: string; // undefined = show all
  category: NewsCategory;
}

export interface NewsFeedPage {
  articles: NewsArticle[];
  nextCursor: string | null; // null = no more pages
  totalCount: number;
}
