"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { submitOrder, type FormState } from "@/app/actions";
import { itemPrice, useCart } from "@/components/CartProvider";
import { Field } from "@/components/Field";
import { Photo } from "@/components/Photo";
import { describeBoard, formatPrice, fulfillmentOptions, getProduct } from "@/lib/catalog";
import { pickupLocations } from "@/lib/site";

const initial: FormState = { ok: false, message: "" };

export function CartView({ payOnline }: { payOnline: boolean }) {
  const { items, ready, subtotal, setQty, remove, clear } = useCart();
  const [state, action, pending] = useActionState(submitOrder, initial);
  const [fulfillment, setFulfillment] = useState<string>(fulfillmentOptions[0].id);

  useEffect(() => {
    if (state.ok) clear();
  }, [state.ok, clear]);

  if (state.ok) {
    return (
      <div className="empty-state">
        <h2>Order request sent</h2>
        <p>{state.message}</p>
        <Link href="/shop" className="btn btn-primary">
          Back to the shop
        </Link>
      </div>
    );
  }

  if (!ready) return null;

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <h2>Your cart is empty</h2>
        <p className="muted">Browse our charcuterie or build a custom board.</p>
        <div className="btn-row" style={{ justifyContent: "center" }}>
          <Link href="/shop" className="btn btn-primary">
            Shop Charcuterie
          </Link>
          <Link href="/build-your-board" className="btn btn-outline">
            Build Your Board
          </Link>
        </div>
      </div>
    );
  }

  const shipping = fulfillmentOptions.find((f) => f.id === fulfillment)?.cost ?? 0;

  return (
    <div className="cart-layout">
      <div>
        <ul className="cart-list">
          {items.map((item) => {
            const product = item.kind === "product" ? getProduct(item.slug) : undefined;
            const title = product ? `${product.name} (${product.weight})` : "Custom charcuterie board";
            const detail = item.kind === "board" ? describeBoard(item.selection) : product?.short;
            const price = itemPrice(item);
            return (
              <li key={item.id} className="cart-item">
                <Photo name={product?.image ?? "board"} sizes="72px" />
                <div>
                  <h3>
                    {product ? <Link href={`/shop/${product.slug}`}>{title}</Link> : title}
                  </h3>
                  <p className="muted small" style={{ margin: 0 }}>
                    {detail}
                  </p>
                  <div className="cart-item-controls">
                    <div className="stepper">
                      <button type="button" onClick={() => setQty(item.id, item.qty - 1)} aria-label={`Decrease ${title}`}>
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button type="button" onClick={() => setQty(item.id, item.qty + 1)} aria-label={`Increase ${title}`}>
                        +
                      </button>
                    </div>
                    <button type="button" className="link-btn small" onClick={() => remove(item.id)}>
                      Remove
                    </button>
                    <span className="cart-item-price">{formatPrice(price * item.qty)}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <ul className="totals">
          <li>
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </li>
          <li>
            <span>{fulfillment === "ship" ? "Shipping" : "Pickup"}</span>
            <span>{shipping ? formatPrice(shipping) : "Free"}</span>
          </li>
          <li className="grand">
            <span>Estimated total</span>
            <span>{formatPrice(subtotal + shipping)}</span>
          </li>
        </ul>
      </div>

      <div className="card">
        <h2 style={{ fontSize: "1.6rem" }}>{payOnline ? "Checkout" : "Request your order"}</h2>
        <p className="muted small">
          {payOnline
            ? "Enter your details, then pay securely by card, Apple Pay or Google Pay on the next page (powered by Stripe)."
            : "Send us your order request and we\u2019ll confirm availability, delivery and payment with you directly."}
        </p>
        <form action={action} className="form-grid">
          <input type="hidden" name="cart" value={JSON.stringify(items)} />
          <Field label="Name" name="name" required error={state.errors?.name} />
          <Field label="Email" name="email" type="email" required error={state.errors?.email} />
          <Field label="Phone" name="phone" type="tel" />
          <fieldset>
            <legend>Pickup or shipping</legend>
            <div className="radio-list">
              {fulfillmentOptions.map((f) => (
                <label key={f.id}>
                  <input
                    type="radio"
                    name="fulfillment"
                    value={f.id}
                    checked={fulfillment === f.id}
                    onChange={() => setFulfillment(f.id)}
                  />
                  <span>
                    {f.label} — {f.cost ? formatPrice(f.cost) : "Free"}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          {fulfillment === "pickup" && (
            <Field label="Pickup location" name="pickupLocation" required error={state.errors?.pickupLocation}>
              <option value="" disabled>
                Choose a location
              </option>
              {pickupLocations.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </Field>
          )}
          {fulfillment === "ship" &&
            (payOnline ? (
              <p className="muted small" style={{ margin: 0 }}>
                You&rsquo;ll enter your shipping address on the payment page.
              </p>
            ) : (
              <Field label="Shipping address" name="address" textarea required error={state.errors?.address} />
            ))}
          <Field label="Preferred pickup / delivery date" name="date" type="date" />
          <Field label="Notes" name="notes" textarea placeholder="Occasion, allergies, anything we should know" />
          <button className="btn btn-primary" disabled={pending}>
            {pending
              ? payOnline
                ? "Opening secure checkout…"
                : "Sending…"
              : `${payOnline ? "Continue to payment" : "Send order request"} — ${formatPrice(subtotal + shipping)}`}
          </button>
          {state.message && (
            <p className="form-status err" role="alert">
              {state.errors?.cart ?? state.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
