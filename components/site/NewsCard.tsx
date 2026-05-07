import Link from "next/link";
import { classNames } from "@/lib/format";
import { formatDate } from "@/lib/format";
import { text } from "@/lib/ui-labels";
import type { NewsItem } from "@/types/site";

export function NewsCard({ item, archived = false }: { item: NewsItem; archived?: boolean }) {
  const hasImage = Boolean(item.image?.trim());

  return (
    <article className={classNames("news-card", !hasImage && "news-card--text-only")}>
      {hasImage ? (
        <div className="news-card__media">
          <img alt={item.title} src={item.image} />
        </div>
      ) : null}
      <div className="news-card__body">
        <div className="news-card__meta">
          <span>{formatDate(item.date)}</span>
          <b>{archived ? text.archive : item.label}</b>
        </div>
        <h3>{item.title}</h3>
        <p>{item.summary}</p>
        <Link className="button-link button-link--ghost" href={`/news/${item.slug}`}>
          {text.details}
        </Link>
      </div>
    </article>
  );
}
