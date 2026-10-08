import type { Metadata } from "next";
import Link from "next/link";
import { formatPrice } from "@/lib/catalog";
import { site } from "@/lib/site";
import { fromCents, getStripe, paymentsEnabled } from "@/lib/stripe";
import { ClearCart } from "./ClearCart";

export const metadata: Metadata = {
  title: "Order confirmed",
  robots: { index: false },
};

async function lookUp(sessionId: string | undefined) {
  if (!sessionId || !paymentsEnabled()) return null;
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    return session.payment_status === "paid" ? session : null;
  } catch {
    return null;
  }
}

export default async function OrderSuccess({ searchParams }: PageProps<"/order/success">) {
  const { session_id } = await searchParams;
  const session = await lookUp(typeof session_id === "string" ? session_id : undefined);

  return (
    <section className="page-hero">
      <div className="container" style={{ maxWidth: 720 }}>
        {session ? (
          <>
            <ClearCart />
            <p className="eyebrow">Order confirmed</p>
            <h1>Thank you!</h1>
            <p className="lead">
              We&rsquo;ve received your payment of {formatPrice(fromCents(session.amount_total))}. A receipt is on its
              way to {session.customer_details?.email ?? "your email"}.
            </p>
            <p>
              {session.metadata?.fulfillment === "Pickup"
                ? "We'll be in touch to arrange your pickup time at the farm."
                : "We'll be in touch when your order ships."}{" "}
              Questions? Email <a href={`mailto:${site.email}`}>{site.email}</a> or call{" "}
              <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}>{site.phone}</a>.
            </p>
          </>
        ) : (
          <>
            <p className="eyebrow">Order</p>
            <h1>We couldn&rsquo;t confirm your payment</h1>
            <p className="lead">
              If you completed checkout, your payment may still be processing. Please check your email for a receipt,
              or contact us at <a href={`mailto:${site.email}`}>{site.email}</a> and we&rsquo;ll sort it out.
            </p>
          </>
        )}
        <div className="btn-row">
          <Link href="/shop" className="btn btn-primary">
            Back to the shop
          </Link>
          <Link href="/" className="btn btn-outline">
            Home
          </Link>
        </div>
      </div>
    </section>
  );
}
