"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartProvider";

export function AddToCart({ slug, withQty = false }: { slug: string; withQty?: boolean }) {
  const { addProduct } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  return (
    <div className="add-to-cart">
      {withQty && (
        <div className="stepper" aria-label="Quantity">
          <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
            −
          </button>
          <span aria-live="polite">{qty}</span>
          <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">
            +
          </button>
        </div>
      )}
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          addProduct(slug, qty);
          setAdded(true);
        }}
      >
        Add to cart
      </button>
      {added && (
        <p className="added-note" role="status">
          Added! <Link href="/cart">View cart →</Link>
        </p>
      )}
    </div>
  );
}
