import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/AddToCart";
import { Photo } from "@/components/Photo";
import { ProductCard } from "@/components/ProductCard";
import { formatPrice, getProduct, products } from "@/lib/catalog";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return { title: `${product.name} (${product.weight})`, description: product.short };
}

export default async function ProductPage({ params }: PageProps<"/shop/[slug]">) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const others = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      <div className="container">
        <div className="product-detail">
          <Photo name={product.image} className="ratio-1" priority sizes="(min-width: 860px) 55vw, 100vw" />
          <div>
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/shop">Shop Charcuterie</Link> / {product.name}
            </nav>
            <h1>{product.name}</h1>
            <div className="price-line" style={{ justifyContent: "flex-start", gap: "1rem", marginBottom: "1rem" }}>
              <span className="price">{formatPrice(product.price)}</span>
              <span className="weight">{product.weight}</span>
            </div>
            <p className="lead">{product.description}</p>
            <div className="detail-box">
              <h4>How to enjoy</h4>
              <p>{product.pairing}</p>
            </div>
            <AddToCart slug={product.slug} withQty />
            <p className="muted small" style={{ marginTop: "1.25rem" }}>
              Made from our pasture-raised Mangalitsa pork.{" "}
              {product.slug === "salami"
                ? "No preservatives; contains only trace amounts of nitrate."
                : "No preservatives or nitrates."}{" "}
              Keep refrigerated.
            </p>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <h2>You may also like</h2>
          <div className="product-grid">
            {others.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
