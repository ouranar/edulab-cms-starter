import Link from "next/link";
import { MemberCard } from "@/components/site/MemberCard";
import { PageHero } from "@/components/site/PageHero";
import { getFeaturedMember, getMemberRouteSlug, getVisibleMemberGroups, readSiteData } from "@/lib/site-data";
import { text } from "@/lib/ui-labels";

export default async function MembersPage() {
  const data = await readSiteData();
  const groups = getVisibleMemberGroups(data);
  const featured = getFeaturedMember(data);

  return (
    <>
      <PageHero hero={data.members.hero} />

      <section className="section-shell">
        <div className="filter-pills" aria-label={text.categories}>
          <a className="filter-pill is-active" href="#members-all">
            {text.all}
          </a>
          {groups.map((group) => (
            <a key={group.id} className="filter-pill" href={`#${group.id}`}>
              {group.title}
            </a>
          ))}
        </div>

        {featured ? (
          <article className="featured-member">
            <div className="featured-member__portrait">
              <img alt={featured.name} src={featured.image} />
            </div>
            <div className="featured-member__content">
              <p className="section-heading__eyebrow">{text.featuredMember}</p>
              <h2>{featured.name}</h2>
              <strong>{featured.title}</strong>
              <p>{featured.summary}</p>
              {featured.researchAreas.length ? (
                <ul className="tag-list">
                  {featured.researchAreas.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              ) : null}
              <Link className="button-link button-link--ghost" href={`/members/${getMemberRouteSlug(featured)}`}>
                {text.details}
              </Link>
            </div>
          </article>
        ) : null}
      </section>

      <section className="section-shell" id="members-all">
        <div className="member-summary-grid">
          {groups.map((group) => (
            <a key={group.id} className="member-summary-card" href={`#${group.id}`}>
              <strong>{group.title}</strong>
              <span>
                {group.items.length} {text.memberCount}
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="section-shell">
        {groups.map((group) => (
          <section key={group.id} className="member-group" id={group.id}>
            <div className="section-heading section-heading--split">
              <div>
                <p className="section-heading__eyebrow">
                  {group.items.length} {text.memberCount}
                </p>
                <h2>{group.title}</h2>
              </div>
            </div>
            <div className="card-grid card-grid--members">
              {group.items.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </section>
        ))}
      </section>
    </>
  );
}
