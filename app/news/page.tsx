import Link from "next/link";
import { NewsCard } from "@/components/site/NewsCard";
import { PageHero } from "@/components/site/PageHero";
import { formatDate } from "@/lib/format";
import { getArchivedNews, getVisibleNews, readSiteData } from "@/lib/site-data";
import { text } from "@/lib/ui-labels";

export default async function NewsPage() {
  const data = await readSiteData();
  const items = getVisibleNews(data);
  const featured = items[0];
  const restItems = items.slice(1);
  const archivedCount = getArchivedNews(data).length;
  const categories = Array.from(new Set(items.map((item) => item.label).filter(Boolean)));

  return (
    <>
      <PageHero hero={data.news.hero} />

      <section className="section-shell">
        {featured ? (
          <article className="featured-news">
            {featured.image ? (
              <div className="featured-news__media">
                <img alt={featured.title} src={featured.image} />
              </div>
            ) : null}
            <div className="featured-news__content">
              <div className="featured-news__meta">
                <span>{formatDate(featured.date)}</span>
                <b>{featured.label}</b>
              </div>
              <h2>{featured.title}</h2>
              <p>{featured.summary}</p>
              <Link className="button-link button-link--ghost" href={`/news/${featured.slug}`}>
                {text.details}
              </Link>
            </div>
          </article>
        ) : null}
      </section>

      <section className="section-shell">
        <div className="section-heading section-heading--split">
          <div>
            <p className="section-heading__eyebrow">{text.categories}</p>
            <h2>{data.home.newsLead.title || text.latestNews}</h2>
          </div>
          <Link className="button-link button-link--secondary" href="/news/archive">
            {text.viewArchive} ({archivedCount})
          </Link>
        </div>

        <div className="filter-pills" aria-label={text.categories}>
          <span className="filter-pill is-active">{text.all}</span>
          {categories.map((category) => (
            <span key={category} className="filter-pill">
              {category}
            </span>
          ))}
        </div>

        <div className="card-grid card-grid--news">
          {restItems.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </>
  );
}
