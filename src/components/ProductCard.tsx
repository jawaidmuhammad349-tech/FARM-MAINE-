import Link from "next/link";
import { formatPrice, type Product } from "@/lib/catalog";
import { AddToCart } from "./AddToCart";
import { Photo } from "./Photo";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <Photo name={product.image} className="ratio-4x3" sizes="(min-width: 860px) 33vw, 100vw" />
      <div className="product-card-body">
        <h3>
          <Link href={`/shop/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="muted small" style={{ margin: 0 }}>
          {product.short}
        </p>
        <div className="price-line">
          <span className="price">{formatPrice(product.price)}</span>
          <span className="weight">{product.weight}</span>
        </div>
        <AddToCart slug={product.slug} />
      </div>
    </article>
  );
}
