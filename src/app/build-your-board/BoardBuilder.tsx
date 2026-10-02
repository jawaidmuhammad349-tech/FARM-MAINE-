"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { Photo } from "@/components/Photo";
import {
  BOARD_BASE_MEATS,
  BOARD_BASE_PRICE,
  EXTRA_CHEESE_PRICE,
  EXTRA_MEAT_PRICE,
  addOns,
  boardBreakdown,
  boardParts,
  cheeses,
  emptyBoard,
  formatPrice,
  getProduct,
  products,
  type BoardSelection,
} from "@/lib/catalog";

const STEPS = ["Base board", "Add meats", "Add cheese & extras", "Review"];

type Counts = Record<string, number>;

function QtyOption({
  title,
  meta,
  qty,
  onChange,
}: {
  title: string;
  meta: string;
  qty: number;
  onChange: (qty: number) => void;
}) {
  return (
    <div className={`option option-row${qty > 0 ? " selected" : ""}`}>
      <div>
        <div className="option-title">{title}</div>
        <div className="option-meta">{meta}</div>
      </div>
      <div className="stepper">
        <button type="button" onClick={() => onChange(qty - 1)} disabled={qty === 0} aria-label={`Remove one ${title}`}>
          −
        </button>
        <span aria-live="polite" aria-label={`${title} quantity`}>
          {qty}
        </span>
        <button type="button" onClick={() => onChange(qty + 1)} disabled={qty >= 20} aria-label={`Add one ${title}`}>
          +
        </button>
      </div>
    </div>
  );
}

export function BoardBuilder() {
  const { addBoard } = useCart();
  const [step, setStep] = useState(0);
  const [sel, setSel] = useState<BoardSelection>(emptyBoard);
  const [added, setAdded] = useState(false);

  const { lines, total } = boardBreakdown(sel);
  const parts = boardParts(sel);
  const last = STEPS.length - 1;

  const stepValid = [Boolean(sel.baseCheese), true, true, true];
  const canReach = (i: number) => stepValid.slice(0, i).every(Boolean);

  const setCount = (key: "meats" | "cheeses", id: string, qty: number) =>
    setSel((s) => ({ ...s, [key]: { ...s[key], [id]: Math.max(0, Math.min(20, qty)) } as Counts }));

  const toggleAddOn = (id: string) =>
    setSel((s) => ({ ...s, addOns: s.addOns.includes(id) ? s.addOns.filter((a) => a !== id) : [...s.addOns, id] }));

  const startOver = () => {
    setSel(emptyBoard());
    setStep(0);
    setAdded(false);
  };

  const baseMeatNames = BOARD_BASE_MEATS.map((slug) => getProduct(slug)?.name).join(" & ");

  return (
    <div className="builder">
      <div>
        <ol className="steps" aria-label="Board builder steps">
          {STEPS.map((label, i) => (
            <li key={label} className={i < step ? "done" : undefined}>
              <button
                type="button"
                onClick={() => setStep(i)}
                disabled={!canReach(i)}
                aria-current={i === step ? "step" : undefined}
              >
                {i + 1}
                <span className="step-label">. {label}</span>
              </button>
            </li>
          ))}
        </ol>

        <div className="step-panel">
          {step === 0 && (
            <>
              <p className="eyebrow">
                Step 1 of {STEPS.length} · {formatPrice(BOARD_BASE_PRICE)}
              </p>
              <h2>Your base board</h2>
              <p className="muted">
                Every board starts with our {baseMeatNames} and a cheese of your choice. Pick your cheese:
              </p>
              <div className="base-meats">
                {BOARD_BASE_MEATS.map((slug) => {
                  const p = getProduct(slug)!;
                  return (
                    <div key={slug} className="base-meat">
                      <Photo name={p.image} sizes="80px" />
                      <div>
                        <div className="option-title">{p.name}</div>
                        <div className="option-meta">Included</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="option-grid" role="radiogroup" aria-label="Base cheese">
                {cheeses.map((c) => (
                  <label key={c.id} className={`option${sel.baseCheese === c.id ? " selected" : ""}`}>
                    <input
                      type="radio"
                      name="baseCheese"
                      value={c.id}
                      checked={sel.baseCheese === c.id}
                      onChange={() => setSel((s) => ({ ...s, baseCheese: c.id }))}
                    />
                    <span className="option-title">{c.name}</span>
                    <span className="option-meta">{c.note}</span>
                  </label>
                ))}
              </div>
              <p className="placeholder-note">Cheese selection is a placeholder pending confirmation.</p>
            </>
          )}

          {step === 1 && (
            <>
              <p className="eyebrow">Step 2 of {STEPS.length} · optional</p>
              <h2>Add more meats</h2>
              <p className="muted">Add any of our charcuterie to your board, +{formatPrice(EXTRA_MEAT_PRICE)} each.</p>
              <div className="option-grid">
                {products.map((p) => (
                  <QtyOption
                    key={p.slug}
                    title={p.name}
                    meta={`${p.weight} · +${formatPrice(EXTRA_MEAT_PRICE)}`}
                    qty={sel.meats[p.slug] ?? 0}
                    onChange={(q) => setCount("meats", p.slug, q)}
                  />
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <p className="eyebrow">Step 3 of {STEPS.length} · optional</p>
              <h2>Add cheese &amp; finishing touches</h2>
              <h3 className="sub-head">Extra cheese · +{formatPrice(EXTRA_CHEESE_PRICE)} each</h3>
              <div className="option-grid">
                {cheeses.map((c) => (
                  <QtyOption
                    key={c.id}
                    title={c.name}
                    meta={c.note}
                    qty={sel.cheeses[c.id] ?? 0}
                    onChange={(q) => setCount("cheeses", c.id, q)}
                  />
                ))}
              </div>
              <h3 className="sub-head">Extras</h3>
              <div className="option-grid">
                {addOns.map((a) => (
                  <label key={a.id} className={`option${sel.addOns.includes(a.id) ? " selected" : ""}`}>
                    <input type="checkbox" checked={sel.addOns.includes(a.id)} onChange={() => toggleAddOn(a.id)} />
                    <span className="option-title">
                      {a.name} · +{formatPrice(a.price)}
                    </span>
                    <span className="option-meta">{a.note}</span>
                  </label>
                ))}
              </div>
            </>
          )}

          {step === last && (
            <>
              <p className="eyebrow">Step {STEPS.length} of {STEPS.length}</p>
              <h2>Review your board</h2>
              <ul className="prose">
                <li>
                  <strong>Base:</strong> {parts.base}
                </li>
                <li>
                  <strong>Extra meats:</strong> {parts.meats.length ? parts.meats.join(", ") : "None"}
                </li>
                <li>
                  <strong>Extra cheese:</strong> {parts.cheeses.length ? parts.cheeses.join(", ") : "None"}
                </li>
                <li>
                  <strong>Extras:</strong> {parts.addOns.length ? parts.addOns.join(", ") : "None"}
                </li>
              </ul>
              {added ? (
                <div className="form-status ok" role="status">
                  Your board has been added to the cart.
                  <div className="btn-row" style={{ marginTop: "0.75rem" }}>
                    <Link href="/cart" className="btn btn-primary">
                      View cart
                    </Link>
                    <button type="button" className="btn btn-outline" onClick={startOver}>
                      Build another
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    addBoard(sel);
                    setAdded(true);
                  }}
                >
                  Add board to cart — {formatPrice(total)}
                </button>
              )}
            </>
          )}

          <p className="mobile-total" aria-hidden>
            <span>Running total</span>
            <strong>{formatPrice(total)}</strong>
          </p>

          {!(step === last && added) && (
            <div className="step-nav">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setStep((s) => s - 1)}
                style={{ visibility: step === 0 ? "hidden" : "visible" }}
              >
                Back
              </button>
              {step < last && (
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={!stepValid[step]}
                  onClick={() => setStep((s) => s + 1)}
                >
                  {step === 0 && !sel.baseCheese ? "Choose a cheese" : `Next: ${STEPS[step + 1]}`}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <aside className="summary" aria-label="Board summary">
        <h3>Your board</h3>
        <dl>
          <dt>Base</dt>
          <dd>{sel.baseCheese ? parts.base : `${baseMeatNames} + your cheese`}</dd>
          <dt>Extra meats</dt>
          <dd>{parts.meats.length ? parts.meats.join(", ") : "—"}</dd>
          <dt>Extra cheese</dt>
          <dd>{parts.cheeses.length ? parts.cheeses.join(", ") : "—"}</dd>
          <dt>Extras</dt>
          <dd>{parts.addOns.length ? parts.addOns.join(", ") : "—"}</dd>
        </dl>
        <ul className="summary-lines">
          {lines.map((l) => (
            <li key={l.label}>
              <span>{l.label}</span>
              <span>{formatPrice(l.amount)}</span>
            </li>
          ))}
        </ul>
        <div className="summary-total" aria-live="polite">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </aside>
    </div>
  );
}
