import type { Metadata } from "next";
import { Photo } from "@/components/Photo";
import { ShareForm } from "./ShareForm";

export const metadata: Metadata = {
  title: "Meat Shares",
  description: "Reserve a whole or half share of Brickhouse Farm grass-fed beef. Learn how buying in bulk works and send an enquiry.",
};

// PLACEHOLDER: share pricing, hanging weights, deposit and timing to be confirmed by the farm.

export default function MeatShares() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Meat Shares</p>
          <h1>Grass-fed beef by the whole or half</h1>
          <p className="lead">
            Fill your freezer with beef raised entirely on our Maine pastures. Buying a share is the most economical way
            to eat well all year — and you&rsquo;ll know exactly where your food comes from.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "1.5rem" }}>
        <div className="container split">
          <Photo name="highlandCow" className="ratio-4x3" sizes="(min-width: 860px) 50vw, 100vw" />
          <div className="share-grid">
            <div className="share-card">
              <h3>Whole cow</h3>
              <p className="muted">Best for large families or splitting with friends.</p>
              <ul>
                <li>Approx. hanging weight: TBD</li>
                <li>Approx. take-home: TBD</li>
                <li>Price: TBD per lb hanging weight</li>
                <li>Deposit: TBD</li>
              </ul>
            </div>
            <div className="share-card">
              <h3>Half cow</h3>
              <p className="muted">A great fit for most households.</p>
              <ul>
                <li>Approx. hanging weight: TBD</li>
                <li>Approx. take-home: TBD</li>
                <li>Price: TBD per lb hanging weight</li>
                <li>Deposit: TBD</li>
              </ul>
            </div>
            <p className="placeholder-note" style={{ gridColumn: "1 / -1", margin: 0 }}>
              Share sizes, pricing and timing are placeholders pending confirmation.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container split">
          <div className="prose">
            <p className="eyebrow">How it works</p>
            <h2>Buying beef in bulk, explained</h2>
            <ol>
              <li>
                <strong>Reserve your share.</strong> Send us an enquiry and we&rsquo;ll confirm availability and the
                deposit.
              </li>
              <li>
                <strong>Choose your cuts.</strong> Before processing, we&rsquo;ll help you fill out a cut sheet — steaks,
                roasts, ground beef and more, the way you like them.
              </li>
              <li>
                <strong>Processing.</strong> Your beef is processed at a USDA-inspected facility, then dry-aged,
                cut, wrapped and frozen.
              </li>
              <li>
                <strong>Pick up.</strong> Collect your beef and pay the balance based on the hanging weight.
              </li>
            </ol>
          </div>
          <div className="faq">
            <p className="eyebrow">Good to know</p>
            <details>
              <summary>What is hanging weight?</summary>
              <p>
                Hanging weight is the weight of the carcass after initial processing, before it is aged, cut and
                trimmed. Your take-home weight will be less once bones and trim are removed.
              </p>
            </details>
            <details>
              <summary>How much freezer space do I need?</summary>
              <p>
                As a rough guide, allow about one cubic foot of freezer space for every 25–30 lb of packaged beef.
              </p>
            </details>
            <details>
              <summary>Why grass-fed?</summary>
              <p>
                Cattle raised on pasture live the way they were meant to, help build healthy soil, and produce beef that
                is flavorful and naturally lean.
              </p>
            </details>
          </div>
        </div>
      </section>

      <section className="section" id="enquire">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Enquire</p>
            <h2>Reserve your share</h2>
            <p className="muted">Tell us what you&rsquo;re interested in and we&rsquo;ll get back to you with availability.</p>
          </div>
          <div className="card" style={{ maxWidth: 760 }}>
            <ShareForm />
          </div>
        </div>
      </section>
    </>
  );
}
