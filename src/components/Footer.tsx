import Link from "next/link";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-brand">{site.name}</p>
          <p>{site.tagline}</p>
          <p>{site.location}</p>
        </div>
        <nav aria-label="Footer">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <p>
            <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}>{site.phone}</a>
          </p>
          {site.instagram && (
            <p>
              <a href={site.instagram}>Instagram</a>
            </p>
          )}
          {site.facebook && (
            <p>
              <a href={site.facebook}>Facebook</a>
            </p>
          )}
        </div>
      </div>
      <div className="container footer-bottom">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
