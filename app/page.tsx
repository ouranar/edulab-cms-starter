import Link from "next/link";
import { formatDate } from "@/lib/format";
import { getFeaturedMember, getMemberRouteSlug, getVisibleNews, readSiteData } from "@/lib/site-data";
import { text } from "@/lib/ui-labels";

export default async function HomePage() {
  const data = await readSiteData();
  const leader = getFeaturedMember(data);
  const visibleNews = getVisibleNews(data).slice(0, 4);
  const activities = data.home.activities.length
    ? data.home.activities.slice(0, 4)
    : visibleNews.map((item) => ({
        id: item.id,
        date: item.date,
        label: item.label,
        title: item.title,
        summary: item.summary,
        href: `/news/${item.slug}`,
      }));
  const directions = data.research.directions.filter((item) => item.visible !== false);
  const overviewParagraphs = data.home.intro.content?.length ? data.home.intro.content : data.about.introText.slice(0, 2);
  const publicationStats = data.publications.groups.slice(0, 3).map((group) => ({
    id: group.id,
    label: group.title,
    value: group.items.filter((item) => item.visible !== false).length,
  }));

  return (
    <>
      <section className="home-hero">
        <div className="home-hero__content">
          <p className="home-hero__eyebrow">{data.home.hero.eyebrow}</p>
          <h1>{data.home.hero.title}</h1>
          <p className="home-hero__subtitle">{data.home.hero.subtitle}</p>
          <p className="home-hero__description">{data.home.hero.description}</p>
          <div className="home-hero__actions">
            {data.home.hero.primaryAction ? (
              <Link className="button-link button-link--primary" href={data.home.hero.primaryAction.href}>
                {data.home.hero.primaryAction.label}
              </Link>
            ) : null}
            {data.home.hero.secondaryAction ? (
              <Link className="button-link button-link--secondary" href={data.home.hero.secondaryAction.href}>
                {data.home.hero.secondaryAction.label}
              </Link>
            ) : null}
          </div>
        </div>
        <div className="home-hero__visual" aria-hidden="true">
          <span className="home-hero__arc" />
          <span className="home-hero__campus" />
        </div>
      </section>

      <section className="section-shell">
        <article className="lab-card lab-overview">
          <div className="lab-card__head">
            <p className="section-heading__eyebrow">{data.home.intro.title}</p>
            <h2>{data.about.introTitle}</h2>
          </div>
          <div className="lab-overview__text">
            {overviewParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="compact-highlight-grid">
            {data.about.introHighlights.slice(0, 3).map((item) => (
              <article key={item.id} className="compact-highlight">
                <strong>{item.value}</strong>
                <span>{item.title}</span>
              </article>
            ))}
          </div>
          <Link className="button-link button-link--ghost" href={data.home.intro.href}>
            {data.home.intro.buttonLabel || text.learnMore}
          </Link>
        </article>
      </section>

      <section className="section-shell">
        <article className="lab-card home-research-showcase">
          <div className="section-heading section-heading--split">
            <div>
              <p className="section-heading__eyebrow">{text.researchFocus}</p>
              <h2>{data.research.directionsTitle}</h2>
            </div>
            <Link className="button-link button-link--secondary" href="/research">
              {text.learnMore}
            </Link>
          </div>

          <div className="home-research-grid">
            {directions.slice(0, 4).map((item) => (
              <article key={item.id} className="home-research-card">
                {item.image ? (
                  <div className="home-research-card__media">
                    <img alt={item.title} src={item.image} />
                  </div>
                ) : null}
                <div className="home-research-card__body">
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <ul className="tag-list">
                    {item.tags.slice(0, 3).map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </article>
      </section>

      <section className="section-shell">
        {leader ? (
          <article className="lab-card home-member-panel">
            <div className="lab-card__head">
              <p className="section-heading__eyebrow">{text.featuredMember}</p>
              <h2>{data.home.membersLead.title}</h2>
            </div>
            <div className="home-member-panel__body">
              <div className="home-member-panel__portrait">
                <img alt={leader.name} src={leader.image} />
              </div>
              <div>
                <h3>{leader.name}</h3>
                <p className="home-member-panel__title">{leader.title}</p>
                <p>{leader.summary}</p>
                {leader.researchAreas.length ? (
                  <ul className="tag-list">
                    {leader.researchAreas.slice(0, 3).map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
            <div className="home-member-panel__actions">
              <Link className="button-link button-link--primary" href={`/members/${getMemberRouteSlug(leader)}`}>
                {text.details}
              </Link>
              <Link className="button-link button-link--secondary" href={data.home.membersLead.href}>
                {data.home.membersLead.buttonLabel || text.viewMembers}
              </Link>
            </div>
          </article>
        ) : null}
      </section>

      <section className="section-shell">
        <article className="lab-card publication-summary">
          <div className="lab-card__head">
            <p className="section-heading__eyebrow">{text.publicationOverview}</p>
            <h2>{data.publications.hero.title}</h2>
          </div>
          <div className="publication-summary__stats">
            {publicationStats.map((item) => (
              <div key={item.id} className="publication-stat">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <p>{data.publications.hero.description || data.settings.footerNote}</p>
          <Link className="button-link button-link--ghost" href="/publications">
            {text.viewAll}
          </Link>
        </article>
      </section>

      <section className="section-shell">
        <div className="section-heading section-heading--split">
          <div>
            <p className="section-heading__eyebrow">{text.latestNews}</p>
            <h2>{data.home.newsLead.title}</h2>
          </div>
          <Link className="button-link button-link--secondary" href={data.home.newsLead.href}>
            {data.home.newsLead.buttonLabel || text.viewNews}
          </Link>
        </div>

        <div className="home-news-grid">
          {activities.map((item) => (
            <article key={item.id} className="home-news-card">
              <div className="home-news-card__meta">
                <span>{formatDate(item.date)}</span>
                <b>{item.label}</b>
              </div>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <Link href={item.href} aria-label={`${text.details}: ${item.title}`}>
                <span aria-hidden="true">-&gt;</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <article className="recruitment-banner">
          <div>
            <p className="section-heading__eyebrow">{data.recruitment.hero.eyebrow}</p>
            <h2>{data.home.recruitmentLead.title}</h2>
            <p>{data.home.recruitmentLead.description || data.recruitment.hero.description}</p>
          </div>
          <Link className="button-link button-link--primary" href={data.home.recruitmentLead.href}>
            {data.home.recruitmentLead.buttonLabel}
          </Link>
        </article>
      </section>
    </>
  );
}
