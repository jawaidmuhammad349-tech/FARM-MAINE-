import type { Metadata } from "next";
import Link from "next/link";
import { Photo } from "@/components/Photo";
import { BoardBuilder } from "./BoardBuilder";

export const metadata: Metadata = {
  title: "Build Your Own Board",
  description:
    "Build a custom charcuterie board with Brickhouse Farm's Mangalitsa charcuterie, local cheeses, raw honey and sprouted nuts. Boards start at $50.",
};

// Wording from brickhousefarmmaine.com, lightly edited for clarity.

const partners = [
  {
    name: "Crooked Face Creamery",
    text: "A Maine-based artisan creamery specializing in small-batch cheeses made with local ingredients.",
  },
  {
    name: "Marieke Gouda",
    text: "A Wisconsin creamery that crafts farmstead raw milk gouda in the traditional Dutch style, using milk piped straight from their own cows.",
  },
  {
    name: "Sartori Cheese",
    text: "A fourth-generation, family-owned Wisconsin creamery known for award-winning artisan cheese like BellaVitano.",
  },
  {
    name: "Living Nutz",
    text: "A Maine family-owned company producing organic, raw and sprouted nut snacks, dehydrated at low temperatures to preserve enzymes and nutrition.",
  },
  {
    name: "Ruby on the Hill",
    text: "A local Maine artisan sourdough bakery using raw, organic, non-GMO ingredients.",
  },
  {
    name: "Tony's Honey",
    text: "A fourth-generation beekeeping family in Buckfield, Maine, producing raw, unfiltered Maine honey.",
  },
];

export default function BuildYourBoard() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Build Your Own Board</p>
          <h1>Your board, your way</h1>
          <p className="lead">
            Each board features our handcrafted meats paired with hand-selected cheeses, raw honey, sprouted nuts and
            seasonal fruit spreads — a celebration of slow food, craftsmanship and community. Start with a $50 board with
            two meats and one cheese, then make it your own.
          </p>
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
          <Photo name="board" className="ratio-4x3" sizes="(min-width: 860px) 50vw, 100vw" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Meet our artisan collaborators</p>
            <h2>Made with Maine and Wisconsin artisans</h2>
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

      <section className="section section-alt" id="weddings">
        <div className="container split reverse">
          <Photo name="wedding" className="ratio-3x4" sizes="(min-width: 860px) 50vw, 100vw" />
          <div className="prose">
            <p className="eyebrow">Weddings &amp; formal occasions</p>
            <h2>Wedding charcuterie boards</h2>
            <p>
              We create bespoke charcuterie experiences for weddings, bridal and groom suites, rehearsal gatherings and
              private celebrations that value beauty, craftsmanship and exceptional ingredients.
            </p>
            <p>
              Our boards are composed using traditionally cured meats made from our pasture raised Mangalitsas, paired
              with carefully sourced artisanal cheeses and accompaniments selected for balance, seasonality and
              elegance.
            </p>
            <p>Expect:</p>
            <ul>
              <li>Heritage-style cured meats from pasture-raised pigs</li>
              <li>Artisanal cheeses and restrained, purposeful pairings</li>
              <li>House-made fruit preserves, local honey, organic sourdough and premium accompaniments</li>
              <li>Clean, abundant presentation with an editorial sensibility</li>
            </ul>
            <p>
              We offer custom sizing and tailored selections. Every board is crafted with the same care as the
              celebration it serves — quietly luxurious, deeply rooted, and meant to be remembered.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Ask about your event
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
