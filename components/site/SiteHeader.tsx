import Link from "next/link";
import { classNames } from "@/lib/format";
import { text } from "@/lib/ui-labels";
import type { NavItem } from "@/types/site";

type SiteHeaderProps = {
  labName: string;
  shortName: string;
  navigation: NavItem[];
  adminLabel: string;
  currentPath?: string;
};

export function SiteHeader({ labName, shortName, navigation, adminLabel, currentPath = "/" }: SiteHeaderProps) {
  const isActive = (href: string) => (href === "/" ? currentPath === "/" : currentPath.startsWith(href));

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-brand" href="/">
          <span className="site-brand__mark">{shortName}</span>
          <span className="site-brand__text">
            <strong>{labName}</strong>
            <small>{shortName}</small>
          </span>
        </Link>

        <nav className="site-nav" aria-label={text.navigation}>
          {navigation.map((item) => (
            <Link
              key={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={classNames("site-nav__link", isActive(item.href) && "is-active")}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className="admin-entry" href="/admin/login">
          {adminLabel}
        </Link>
      </div>
    </header>
  );
}
