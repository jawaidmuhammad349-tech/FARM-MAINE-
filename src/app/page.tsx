import Link from "next/link";
import { Photo } from "@/components/Photo";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/catalog";
import { retailers, site } from "@/lib/site";

// Wording from brickhousefarmmaine.com, lightly edited for clarity.

export default function Home() {
  return (
    <>
      <section className="hero">
        <Photo name="hero" priority />
        <div className="container hero-content">
          <p className="eyebrow">{site.name} · Buckfield, Maine</p>
          <h1>Pasture raised meats and handmade artisanal charcuterie</h1>
          <p className="lead">
            Discover our artisanal charcuterie, made from our pasture raised meats using classic Italian traditions.
            Experience the farm-to-table difference at Brickhouse Farm.
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
          <Photo name="farmhouse" className="ratio-4x3" sizes="(min-width: 860px) 50vw, 100vw" />
          <div>
            <p className="eyebrow">Welcome to Brickhouse Farm</p>
            <h2>Who we are</h2>
            <p>
              We are a small, regenerative farm located in Buckfield, Maine, dedicated to producing healthy, pasture
              raised Mangalitsa pork and pork products. Most of our pigs have spent their entire lives outside, never
              restricted to a barn stall. They are helping us reclaim old pastures while feasting on all that nature has
              to offer.
            </p>
            <p>
              We work with other local farmers and feed our pigs seasonal delights such as apples, pumpkins, raw milk,
              squashes and tomatoes. We never feed them junk food or anything processed — they truly are fancy pigs!
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
            <p className="eyebrow">Our mission</p>
            <h2 className="mission">
              To provide the highest quality ethically raised meat and respectfully crafted meat products, using the
              traditions and flavors passed down over time.
            </h2>
          </div>
          <div className="features">
            <div className="feature">
              <h3>Pasture raised</h3>
              <p>Our pigs live outside on pasture, never restricted to a barn stall.</p>
            </div>
            <div className="feature">
              <h3>Traditional curing</h3>
              <p>We cure our special pigs using traditional Italian methods passed down through generations.</p>
            </div>
            <div className="feature">
              <h3>USDA certified</h3>
              <p>Exquisite pasture-raised, USDA certified Mangalitsa pork — &ldquo;the Kobe beef of pork.&rdquo;</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow">From our farm</p>
            <h2>Handcrafted charcuterie</h2>
            <p className="muted">
              Our meats contain no preservatives or nitrates (our salami has only trace amounts of nitrate).
            </p>
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

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta-band">
            <div>
              <h2>Build your own charcuterie board</h2>
              <p>Our meats paired with hand-selected cheeses, raw honey, sprouted nuts and seasonal fruit spreads.</p>
            </div>
            <Link href="/build-your-board" className="btn btn-light">
              Start building
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container split">
          <div>
            <p className="eyebrow">Find us</p>
            <h2>Where to buy our meats</h2>
            <p className="muted">You can find us at:</p>
            <ul className="retailers">
              {retailers.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <p>
              Ask questions or just say hello! We love to hear from you about what you&rsquo;re cooking and how
              you&rsquo;re doing.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Contact us
            </Link>
          </div>
          <Photo name="family" className="ratio-4x3" sizes="(min-width: 860px) 50vw, 100vw" />
        </div>
      </section>
    </>
  );
}
