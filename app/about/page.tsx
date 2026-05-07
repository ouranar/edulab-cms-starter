import { PageHero } from "@/components/site/PageHero";
import { readSiteData } from "@/lib/site-data";
import { text } from "@/lib/ui-labels";

export default async function AboutPage() {
  const data = await readSiteData();

  return (
    <>
      <PageHero hero={data.about.hero} />

      <section className="section-shell">
        <div className="about-mission-grid">
          {data.about.introHighlights.slice(0, 3).map((item) => (
            <article key={item.id} className="lab-card mission-card">
              <span className="mission-card__icon" aria-hidden="true">
                {item.title.slice(0, 1)}
              </span>
              <div>
                <p className="section-heading__eyebrow">{item.title}</p>
                <h2>{item.value}</h2>
                <p>{item.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <article className="lab-card about-story">
          <div className="about-story__content">
            <p className="section-heading__eyebrow">{data.about.introTitle}</p>
            <h2>{data.about.goalsTitle}</h2>
            {data.about.introText.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {data.about.introImage ? (
            <div className="about-story__media">
              <img alt={data.about.introImageAlt ?? data.about.introTitle} src={data.about.introImage} />
            </div>
          ) : null}
        </article>
      </section>

      <section className="section-shell">
        <article className="lab-card timeline-panel">
          <div className="section-heading section-heading--split">
            <div>
              <p className="section-heading__eyebrow">{text.archive}</p>
              <h2>{data.about.timelineTitle}</h2>
              {data.about.timelineSubtitle ? <p>{data.about.timelineSubtitle}</p> : null}
            </div>
          </div>
          <div className="timeline timeline--compact">
            {data.about.timeline.map((item) => (
              <article key={item.id} className="timeline__item">
                <div className="timeline__card">
                  <span>{item.date}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </article>
      </section>

      <section className="section-shell">
        <article className="lab-card goals-panel">
          <div>
            <p className="section-heading__eyebrow">{data.about.goalsTitle}</p>
            <h2>{data.about.goalsStatement}</h2>
            {data.about.goalsText.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="goals-panel__cards">
            {data.about.goalsCards.map((item) => (
              <article key={item.id} className="compact-highlight compact-highlight--large">
                <span>{item.title}</span>
                <strong>{item.value}</strong>
                <p>{item.caption}</p>
              </article>
            ))}
          </div>
        </article>
      </section>
    </>
  );
}
