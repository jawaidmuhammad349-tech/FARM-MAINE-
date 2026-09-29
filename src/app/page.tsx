import Link from "next/link";
import { Photo } from "@/components/Photo";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/catalog";

// Copy note: replace with Amie's wording from brickhousefarmmaine.com where it differs.

export default function Home() {
  return (
    <>
      <section className="hero">
        <Photo name="hero" priority />
        <div className="container hero-content">
          <p className="eyebrow">Regenerative family farm · Maine</p>
          <h1>Pasture-raised pork, grass-fed beef &amp; handcrafted charcuterie</h1>
          <p className="lead">
            At Brickhouse Farm we raise heritage Mangalitsa pigs and grass-fed cattle the slow, natural way — on
            pasture, with care — and turn that pork into small-batch charcuterie.
          </p>
          <div className="btn-row">
            <Link href="/shop" className="btn btn-primary">
              Shop Charcuterie
            </Link>
            <Link href="/build-your-board" className="btn btn-outline">
              Build Your Board
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <Photo name="story" className="ratio-4x3" sizes="(min-width: 860px) 50vw, 100vw" />
          <div>
            <p className="eyebrow">Our story</p>
            <h2>A small farm with big respect for the land</h2>
            <p>
              We are a family farm. Our animals live outdoors on rotating pastures where they can root, graze and
              behave as they are meant to — improving the soil as they go.
            </p>
            <p>
              Our Mangalitsa hogs are prized for their richly marbled meat. We cure it into traditional charcuterie in
              small batches so you can taste the difference good farming makes.
            </p>
            <Link href="/our-farm" className="btn btn-outline">
              Meet the farm
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow">From our farm</p>
            <h2>Charcuterie, cured by hand</h2>
            <p className="muted">Six classic cuts from our pasture-raised Mangalitsa pork. $20 each.</p>
          </div>
          <div className="product-grid">
            {products.slice(0, 3).map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: "2rem" }}>
            <Link href="/shop" className="btn btn-outline">
              See all charcuterie
            </Link>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="features">
            <div className="feature">
              <h3>Regenerative</h3>
              <p>Rotational grazing that builds healthy soil and healthy animals.</p>
            </div>
            <div className="feature">
              <h3>Heritage Mangalitsa</h3>
              <p>A rare breed known for exceptionally marbled, flavorful pork.</p>
            </div>
            <div className="feature">
              <h3>USDA inspected</h3>
              <p>Processed under USDA inspection so you can buy with confidence.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta-band">
            <div>
              <h2>Build your own charcuterie board</h2>
              <p>Pick your board, meats, cheese and extras. Starts at $50.</p>
            </div>
            <Link href="/build-your-board" className="btn btn-light">
              Start building
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
