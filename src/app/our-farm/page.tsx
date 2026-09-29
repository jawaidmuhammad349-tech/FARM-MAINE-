import type { Metadata } from "next";
import Link from "next/link";
import { Photo } from "@/components/Photo";

export const metadata: Metadata = {
  title: "Our Farm",
  description: "Regenerative farming, our family, heritage Mangalitsa pigs and USDA-inspected processing at Brickhouse Farm.",
};

// Copy note: replace with Amie's wording from brickhousefarmmaine.com where it differs.

export default function OurFarm() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Our Farm</p>
          <h1>Raised on pasture, the way it should be</h1>
          <p className="lead">
            Brickhouse Farm is a small, family-run regenerative farm in Maine. Everything we do starts with the health
            of our soil, our animals and our community.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <Photo name="pasture" className="ratio-4x3" sizes="(min-width: 860px) 50vw, 100vw" />
          <div>
            <p className="eyebrow">Regenerative farming</p>
            <h2>Healthy soil, healthy animals</h2>
            <p>
              Our animals move across fresh pasture through the seasons. Rotational grazing lets the land rest and
              regrow, builds organic matter in the soil and keeps our animals on clean ground with plenty to forage.
            </p>
            <p>
              We never rush the process. Slow growth, good forage and low stress make for better meat — and a better
              farm for the next generation.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container split reverse">
          <Photo name="story" className="ratio-4x3" sizes="(min-width: 860px) 50vw, 100vw" />
          <div>
            <p className="eyebrow">Our family</p>
            <h2>A family farm, start to finish</h2>
            <p>
              We raise the animals, tend the pastures and cure the charcuterie ourselves. When you buy from us you are
              buying directly from the family that cared for your food every step of the way.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <Photo name="pigs" className="ratio-4x3" sizes="(min-width: 860px) 50vw, 100vw" />
          <div>
            <p className="eyebrow">The Mangalitsa</p>
            <h2>The &ldquo;Kobe beef of pork&rdquo;</h2>
            <p>
              The Mangalitsa is a curly-coated heritage breed from Hungary. It grows slowly and puts on beautifully
              marbled fat, giving pork that is rich, tender and deeply flavorful — ideal for traditional curing.
            </p>
            <p>
              Hardy and happy outdoors, Mangalitsa thrive on pasture, rooting and foraging year-round.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container split reverse">
          <Photo name="cattle" className="ratio-4x3" sizes="(min-width: 860px) 50vw, 100vw" />
          <div>
            <p className="eyebrow">USDA inspected</p>
            <h2>Care you can trust</h2>
            <p>
              Our meat is processed under USDA inspection, so it meets strict standards for safety and handling from
              our pasture to your table.
            </p>
            <div className="btn-row">
              <Link href="/shop" className="btn btn-primary">
                Shop Charcuterie
              </Link>
              <Link href="/meat-shares" className="btn btn-outline">
                Beef Shares
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
