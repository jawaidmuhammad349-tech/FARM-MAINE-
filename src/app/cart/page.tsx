import type { Metadata } from "next";
import { paymentsEnabled } from "@/lib/stripe";
import { CartView } from "./CartView";

export const metadata: Metadata = {
  title: "Cart",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Cart</p>
          <h1>Your order</h1>
        </div>
      </section>
      <section className="section" style={{ paddingTop: "1.5rem" }}>
        <div className="container">
          <CartView payOnline={paymentsEnabled()} />
        </div>
      </section>
    </>
  );
}
