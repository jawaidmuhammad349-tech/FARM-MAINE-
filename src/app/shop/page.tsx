import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Shop Charcuterie",
  description: "Handcrafted Mangalitsa charcuterie from Brickhouse Farm: lonza, coppa, salami, culatello, guanciale and pancetta.",
};

export default function Shop() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Shop</p>
          <h1>Charcuterie</h1>
          <p className="lead">
            Cured by hand in small batches from our own pasture-raised Mangalitsa pork. Every cut is $20.
          </p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: "1.5rem" }}>
        <div className="container">
          <div className="product-grid">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <p className="muted" style={{ marginTop: "2rem" }}>
            Want a spread for a gathering? <Link href="/build-your-board">Build your own charcuterie board →</Link>
          </p>
        </div>
      </section>
    </>
  );
}
