import { PageHero } from "@/components/site/PageHero";
import { RecordDirectory } from "@/components/site/RecordDirectory";
import { readSiteData } from "@/lib/site-data";
import { text } from "@/lib/ui-labels";

export default async function PublicationsPage() {
  const data = await readSiteData();
  const stats = data.publications.groups.map((group) => ({
    id: group.id,
    label: group.title,
    icon: group.icon,
    value: group.items.filter((item) => item.visible !== false).length,
  }));

  return (
    <>
      <PageHero hero={data.publications.hero} />

      <section className="section-shell">
        <div className="publication-stat-strip">
          {stats.slice(0, 4).map((item) => (
            <article key={item.id} className="publication-stat publication-stat--wide">
              <span aria-hidden="true">{item.icon}</span>
              <strong>{item.value}</strong>
              <p>{item.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="section-heading section-heading--split">
          <div>
            <p className="section-heading__eyebrow">{text.publicationOverview}</p>
            <h2>{text.recordDirectory}</h2>
          </div>
        </div>
        <RecordDirectory groups={data.publications.groups} />
      </section>
    </>
  );
}
