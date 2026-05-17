import { NewsFeed } from "@/components/news/NewsFeed";

export const metadata = {
    title: "News - Toss Securities Clone"
}

export default function NewsPage() {
    // Server Component: no hooks, no useState
  // Just hand off to the Client Component
  return <>
    <h1>Market News</h1>
    <NewsFeed />
  </>
}