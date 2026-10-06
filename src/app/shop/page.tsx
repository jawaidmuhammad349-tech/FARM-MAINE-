import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Handcrafted Mangalitsa charcuterie from Brickhouse Farm, plus Wisconsin artisan cheeses, local honey, almonds and crackers.",
};

export default function Shop() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Shop</p>
          <h1>Shop by the package</h1>
          <p className="lead">
            Our handcrafted charcuterie, plus a few things from friends to go with it. Want it all on one board?{" "}
            <Link href="/build-your-board">Build your own board →</Link>
          </p>
          <nav className="category-links" aria-label="Shop sections">
            {categories.map((c) => (
              <a key={c.id} href={`#${c.id}`}>
                {c.title}
              </a>
            ))}
          </nav>
        </div>
      </section>
      {categories.map((c, i) => (
        <section key={c.id} id={c.id} className={`section${i % 2 ? " section-alt" : ""}`} style={i ? undefined : { paddingTop: "1.5rem" }}>
          <div className="container">
            <div className="section-head">
              <h2>{c.title}</h2>
              <p className="muted">{c.intro}</p>
            </div>
            <div className="product-grid">
              {products
                .filter((p) => p.category === c.id)
                .map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
