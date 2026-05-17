"use client";

import { NewsArticle } from "@/types/news";
import Image from "next/image";

export default function NewsCard({ article }: { article : NewsArticle }) {
    const { id, title, summary, imageUrl, source, publishedAt, category, relatedStocks, nation } = article;

    return <a className="flex gap-2 mb-2">
        <Image src={imageUrl!} alt="#" width={76} height={58} />
        <div className="flex flex-col gap-1.5">
            <strong className="text-gray-900 text-sm">{title}</strong>
            <p className="flex gap-1 items-center">
                {relatedStocks.map((s, idx) => (
                    <span key={`${s.stockCode}-${idx}`} className={`text-xs font-bold p-0.5 rounded-sm ${s.fluctuation > 0 ? "text-red-500 bg-red-100" : "text-blue-500 bg-blue-100"}`}>
                        {s.stockName} {s.fluctuation}%
                    </span>
                ))}
                <span className="text-xs text-gray-500">{source}</span>
                <span className="text-xs text-gray-500">{publishedAt}</span>
            </p>
        </div>
    </a>
}