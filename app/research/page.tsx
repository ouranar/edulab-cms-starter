import { PageHero } from "@/components/site/PageHero";
import { readSiteData } from "@/lib/site-data";
import { text } from "@/lib/ui-labels";

export default async function ResearchPage() {
  const data = await readSiteData();
  const directions = data.research.directions.filter((item) => item.visible !== false);
  const projects = data.research.projects.filter((item) => item.visible !== false);

  return (
    <>
      <PageHero hero={data.research.hero} />

      <section className="section-shell">
        <div className="section-heading section-heading--split">
          <div>
            <p className="section-heading__eyebrow">{text.researchFocus}</p>
            <h2>{data.research.directionsTitle}</h2>
          </div>
        </div>

        <div className="research-area-grid">
          {directions.map((item) => (
            <article key={item.id} className="research-area-card">
              {item.image ? (
                <div className="research-area-card__media">
                  <img alt={item.title} src={item.image} />
                </div>
              ) : null}
              <div>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <ul className="tag-list">
                  {item.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="section-heading section-heading--split">
          <div>
            <p className="section-heading__eyebrow">{text.viewProjects}</p>
            <h2>{data.research.projectsTitle}</h2>
          </div>
        </div>
        <div className="card-grid card-grid--projects">
          {projects.map((item) => (
            <article key={item.id} className="research-card research-card--stacked">
              {item.image ? <img alt={item.title} src={item.image} /> : null}
              <div>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <ul className="tag-list">
                  {item.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
