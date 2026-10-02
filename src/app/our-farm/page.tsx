import type { Metadata } from "next";
import Link from "next/link";
import { Photo } from "@/components/Photo";
import type { ImageKey } from "@/lib/images";

export const metadata: Metadata = {
  title: "Our Farm",
  description:
    "A small, regenerative farm in Buckfield, Maine raising pasture raised Mangalitsa pork, known as the Kobe beef of pork.",
};

// Wording from brickhousefarmmaine.com, lightly edited for clarity.

const gallery: ImageKey[] = [
  "piglets",
  "pigsPasture",
  "highlandCalf",
  "donkeys",
  "pigGrazing",
  "turkey",
  "cowDonkey",
  "tractor",
];

export default function OurFarm() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Our Farm</p>
          <h1>A small, regenerative farm in Buckfield, Maine</h1>
          <p className="lead">
            Our mission is to provide the highest quality ethically raised meat and respectfully crafted meat products,
            using the traditions and flavors passed down over time.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <Photo name="pigsPasture" className="ratio-4x3" sizes="(min-width: 860px) 50vw, 100vw" />
          <div>
            <p className="eyebrow">Regenerative farming</p>
            <h2>Raised outside, on pasture</h2>
            <p>
              We are dedicated to producing healthy, pasture raised Mangalitsa pork and pork products. Most of our pigs
              have spent their entire lives outside, never restricted to a barn stall. They are helping us reclaim old
              pastures while feasting on all that nature has to offer.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container split reverse">
          <Photo name="family" className="ratio-4x3" sizes="(min-width: 860px) 50vw, 100vw" />
          <div>
            <p className="eyebrow">Family &amp; community</p>
            <h2>Truly fancy pigs</h2>
            <p>
              We work with other local farmers and feed our pigs seasonal delights such as apples, pumpkins, raw milk,
              squashes and tomatoes. We never feed them junk food or anything processed — they truly are fancy pigs!
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <Photo name="mangalitsaCurly" className="ratio-3x4" sizes="(min-width: 860px) 50vw, 100vw" />
          <div className="prose">
            <p className="eyebrow">What are Mangalitsa pigs?</p>
            <h2>&ldquo;The Kobe beef of pork&rdquo;</h2>
            <p>
              The curly haired Mangalitsa pig, also known as &ldquo;the Kobe beef of pork,&rdquo; was one of the
              dominant breeds of pig in Europe in the early 1800s.
            </p>
            <p>
              They were bred for two purposes: exquisitely marbled meat and pure white fat. The fat was a very valuable
              source of calories for Austria-Hungary&rsquo;s growing population and fueled its Industrial Revolution,
              which led to the first large-scale hog production in history.
            </p>
            <p>
              In 2007 the Mangalitsa pig was imported from Austria and brought to the States. Since its arrival, it has
              been featured in the kitchens of the world&rsquo;s most renowned chefs, such as Thomas Keller and Mario
              Batali. The reason is simple: it&rsquo;s an unmodified breed, the opposite of American pork, which is bred
              for rapid growth and lean meat. Unlike &ldquo;the other white meat,&rdquo; Mangalitsa pork is deep red in
              color, and the fat tastes more like cream or butter.
            </p>
            <p>
              The genetics have remained untouched since the breed&rsquo;s creation in 1833. They take longer to raise
              and mature than average pigs (18–24 months).
            </p>
            <p>They are mischievous but also docile and friendly creatures, and are good moms to their young.</p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container split reverse">
          <Photo name="curing" className="ratio-4x3" sizes="(min-width: 860px) 50vw, 100vw" />
          <div>
            <p className="eyebrow">USDA certified</p>
            <h2>Cured the traditional way</h2>
            <p>
              At Brickhouse Farm we take pride in producing exquisite pasture-raised, USDA certified Mangalitsa pork. We
              cure our special pigs using traditional Italian methods passed down through generations.
            </p>
            <p>
              Our meats do not contain any preservatives or nitrates (except our salami, which has trace amounts of
              nitrate).
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

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Life on the farm</p>
            <h2>Meet our animals</h2>
          </div>
          <div className="gallery">
            {gallery.map((name) => (
              <Photo key={name} name={name} sizes="(min-width: 720px) 25vw, 50vw" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
