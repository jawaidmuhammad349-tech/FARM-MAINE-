import type { Metadata } from "next";
import { Photo } from "@/components/Photo";
import { BoardBuilder } from "./BoardBuilder";

export const metadata: Metadata = {
  title: "Charcuterie Boards",
  description:
    "Build a charcuterie board with two Brickhouse Farm meats and a cheese for $50, then add more meats, cheese, sourdough crackers, honey and almonds.",
};

// Wording from brickhousefarmmaine.com, lightly edited for clarity.

const partners = [
  {
    name: "Sartori Cheese",
    text: "A fourth-generation, family-owned Wisconsin creamery known for award-winning artisan cheese like BellaVitano.",
  },
  {
    name: "Carr Valley Cheese",
    text: "A La Valle, Wisconsin creamery behind our Marisa and Cardona.",
  },
  {
    name: "Clock Shadow Creamery",
    text: "The Wisconsin creamery behind our white cheddar cheese curds.",
  },
  {
    name: "Living Nutz",
    text: "A Maine family-owned company producing organic, raw and sprouted nut snacks, dehydrated at low temperatures to preserve enzymes and nutrition.",
  },
  {
    name: "Tom's Honey",
    text: "A fourth-generation beekeeping family in Buckfield, Maine, producing raw, unfiltered Maine honey.",
  },
]

export default function BuildYourBoard() {
  return (
    <>
      <section className="page-hero">
        <div className="container split">
          <div>
            <p className="eyebrow">Charcuterie Boards</p>
            <h1>Build your own board</h1>
            <p className="lead">
              Every board starts with two of our handcrafted meats and a cheese of your choice for $50. Then add whatever
              else you like: more meats, extra cheese, sea salt &amp; butter sourdough crackers, raw Maine honey and
              sprouted almonds.
            </p>
          </div>
          <Photo name="board" className="ratio-4x3" priority sizes="(min-width: 860px) 50vw, 100vw" />
        </div>
      </section>

      <section className="section" style={{ paddingTop: "1.5rem" }}>
        <div className="container">
          <BoardBuilder />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container split">
          <div className="prose">
            <p className="eyebrow">Good to know</p>
            <h2>Fresh, not preserved</h2>
            <p>
              Our meats do not contain any preservatives or nitrates (except our salami, which has trace amounts of
              nitrate). For this reason, our meats oxidize (turn brown) faster than those preserved with chemicals.
            </p>
            <p>
              Because of this, everything comes in airtight packaging for you to unbox and assemble before your event.
              Everything is included except the utensils for spreading.
            </p>
            <p>Supply is limited — once we sell out, we&rsquo;re out.</p>
          </div>
          <Photo name="sliced" className="ratio-4x3" sizes="(min-width: 860px) 50vw, 100vw" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Meet our artisan collaborators</p>
            <h2>Made with Maine and Wisconsin makers</h2>
            <p className="muted">
              We&rsquo;ve partnered with some of Maine and Wisconsin&rsquo;s most talented artisans to curate boards that
              celebrate craftsmanship and flavor.
            </p>
          </div>
          <div className="partner-grid">
            {partners.map((p) => (
              <div key={p.name} className="partner">
                <h3>{p.name}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
