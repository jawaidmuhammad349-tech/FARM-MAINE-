"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import {
  BOARD_BASE_PRICE,
  BOARD_INCLUDED_CHEESES,
  BOARD_INCLUDED_MEATS,
  EXTRA_CHEESE_PRICE,
  EXTRA_MEAT_PRICE,
  addOns,
  boardBreakdown,
  boardSizes,
  cheeses,
  formatPrice,
  products,
  type BoardSelection,
} from "@/lib/catalog";

const STEPS = ["Board size", "Meats", "Cheese", "Add-ons", "Review"];

const emptySelection = (): BoardSelection => ({ size: boardSizes[0].id, meats: {}, cheeses: {}, addOns: [] });

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
  const [sel, setSel] = useState<BoardSelection>(emptySelection);
  const [added, setAdded] = useState(false);

  const { size, meatCount, cheeseCount, lines, total } = boardBreakdown(sel);

  const stepValid = [true, meatCount >= BOARD_INCLUDED_MEATS, cheeseCount >= BOARD_INCLUDED_CHEESES, true, true];
  const canReach = (i: number) => stepValid.slice(0, i).every(Boolean);

  const setCount = (key: "meats" | "cheeses", id: string, qty: number) =>
    setSel((s) => ({ ...s, [key]: { ...s[key], [id]: Math.max(0, Math.min(20, qty)) } as Counts }));

  const toggleAddOn = (id: string) =>
    setSel((s) => ({ ...s, addOns: s.addOns.includes(id) ? s.addOns.filter((a) => a !== id) : [...s.addOns, id] }));

  const chosen = (map: Counts, lookup: (id: string) => string | undefined) =>
    Object.entries(map)
      .filter(([, q]) => q > 0)
      .map(([id, q]) => `${lookup(id)}${q > 1 ? ` ×${q}` : ""}`);

  const meatNames = chosen(sel.meats, (id) => products.find((p) => p.slug === id)?.name);
  const cheeseNames = chosen(sel.cheeses, (id) => cheeses.find((c) => c.id === id)?.name);
  const addOnNames = addOns.filter((a) => sel.addOns.includes(a.id)).map((a) => a.name);

  const handleAdd = () => {
    addBoard(sel);
    setAdded(true);
  };

  const startOver = () => {
    setSel(emptySelection());
    setStep(0);
    setAdded(false);
  };

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
              <p className="eyebrow">Step 1 of 5</p>
              <h2>Choose your board size</h2>
              <p className="muted">
                Every board starts at {formatPrice(BOARD_BASE_PRICE)} and includes {BOARD_INCLUDED_MEATS} meats and{" "}
                {BOARD_INCLUDED_CHEESES} cheese.
              </p>
              <div className="option-grid" role="radiogroup" aria-label="Board size">
                {boardSizes.map((b) => (
                  <label key={b.id} className={`option${sel.size === b.id ? " selected" : ""}`}>
                    <input
                      type="radio"
                      name="size"
                      value={b.id}
                      checked={sel.size === b.id}
                      onChange={() => setSel((s) => ({ ...s, size: b.id }))}
                    />
                    <span className="option-title">{b.name}</span>
                    <span className="option-meta">{b.serves}</span>
                    <span className="option-meta">{b.surcharge ? `+${formatPrice(b.surcharge)}` : "Included"}</span>
                  </label>
                ))}
              </div>
              <p className="placeholder-note">Board size pricing is a placeholder pending confirmation.</p>
            </>
          )}

          {step === 1 && (
            <>
              <p className="eyebrow">Step 2 of 5</p>
              <h2>Pick your meats</h2>
              <p className="muted">
                Choose at least {BOARD_INCLUDED_MEATS}. Each meat beyond {BOARD_INCLUDED_MEATS} is +
                {formatPrice(EXTRA_MEAT_PRICE)}.
              </p>
              <div className="option-grid">
                {products.map((p) => (
                  <QtyOption
                    key={p.slug}
                    title={p.name}
                    meta={p.weight}
                    qty={sel.meats[p.slug] ?? 0}
                    onChange={(q) => setCount("meats", p.slug, q)}
                  />
                ))}
              </div>
              <p className="counter-hint" aria-live="polite">
                {meatCount < BOARD_INCLUDED_MEATS
                  ? `Select ${BOARD_INCLUDED_MEATS - meatCount} more to continue.`
                  : `${meatCount} selected${meatCount > BOARD_INCLUDED_MEATS ? ` — ${meatCount - BOARD_INCLUDED_MEATS} extra` : ""}.`}
              </p>
            </>
          )}

          {step === 2 && (
            <>
              <p className="eyebrow">Step 3 of 5</p>
              <h2>Choose your cheese</h2>
              <p className="muted">
                {BOARD_INCLUDED_CHEESES} cheese is included. Each additional cheese is +{formatPrice(EXTRA_CHEESE_PRICE)}.
              </p>
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
              <p className="counter-hint" aria-live="polite">
                {cheeseCount < BOARD_INCLUDED_CHEESES
                  ? `Select ${BOARD_INCLUDED_CHEESES - cheeseCount} to continue.`
                  : `${cheeseCount} selected${cheeseCount > BOARD_INCLUDED_CHEESES ? ` — ${cheeseCount - BOARD_INCLUDED_CHEESES} extra` : ""}.`}
              </p>
              <p className="placeholder-note">Cheese selection is a placeholder pending confirmation.</p>
            </>
          )}

          {step === 3 && (
            <>
              <p className="eyebrow">Step 4 of 5</p>
              <h2>Add the finishing touches</h2>
              <p className="muted">Optional extras to round out your board.</p>
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

          {step === 4 && (
            <>
              <p className="eyebrow">Step 5 of 5</p>
              <h2>Review your board</h2>
              <ul className="prose">
                <li>
                  <strong>{size.name} board</strong> ({size.serves})
                </li>
                <li>
                  <strong>Meats:</strong> {meatNames.join(", ")}
                </li>
                <li>
                  <strong>Cheese:</strong> {cheeseNames.join(", ")}
                </li>
                <li>
                  <strong>Add-ons:</strong> {addOnNames.length ? addOnNames.join(", ") : "None"}
                </li>
              </ul>
              {added ? (
                <div className="form-status ok" role="status">
                  Your board has been added to the cart.{" "}
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
                <button type="button" className="btn btn-primary" onClick={handleAdd}>
                  Add board to cart — {formatPrice(total)}
                </button>
              )}
            </>
          )}

          <p className="mobile-total" aria-hidden>
            <span>Running total</span>
            <strong>{formatPrice(total)}</strong>
          </p>

          {!(step === 4 && added) && (
            <div className="step-nav">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setStep((s) => s - 1)}
                style={{ visibility: step === 0 ? "hidden" : "visible" }}
              >
                Back
              </button>
              {step < 4 && (
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={!stepValid[step]}
                  onClick={() => setStep((s) => s + 1)}
                >
                  Next: {STEPS[step + 1]}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <aside className="summary" aria-label="Board summary">
        <h3>Your board</h3>
        <dl>
          <dt>Size</dt>
          <dd>{size.name}</dd>
          <dt>Meats</dt>
          <dd>{meatNames.length ? meatNames.join(", ") : "—"}</dd>
          <dt>Cheese</dt>
          <dd>{cheeseNames.length ? cheeseNames.join(", ") : "—"}</dd>
          <dt>Add-ons</dt>
          <dd>{addOnNames.length ? addOnNames.join(", ") : "—"}</dd>
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
