import type Stripe from "stripe";
import { formatPrice } from "@/lib/catalog";
import { sendMail } from "@/lib/mail";
import { sendCustomerConfirmation } from "@/lib/order-email";
import { fromCents, getStripe } from "@/lib/stripe";

// Stripe calls this when a checkout completes. We email the order to the farm.
// Configure the endpoint in the Stripe Dashboard for checkout.session.completed
// and checkout.session.async_payment_succeeded, and set STRIPE_WEBHOOK_SECRET.

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !process.env.STRIPE_SECRET_KEY) {
    return new Response("Stripe webhook not configured", { status: 503 });
  }

  const body = await request.text();
  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, request.headers.get("stripe-signature") ?? "", secret);
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
    const session = event.data.object;
    if (session.payment_status === "paid") {
      try {
        await emailOrder(session);
      } catch (err) {
        console.error("Order email failed", err);
        return new Response("Order email failed", { status: 500 }); // Stripe retries
      }
    }
  }

  return Response.json({ received: true });
}

async function emailOrder(session: Stripe.Checkout.Session) {
  const lineItems = await getStripe().checkout.sessions.listLineItems(session.id, {
    limit: 100,
    expand: ["data.price.product"],
  });

  const meta = session.metadata ?? {};
  const customer = session.customer_details;
  const ship = session.collected_information?.shipping_details;
  const address = ship?.address
    ? [ship.name, ship.address.line1, ship.address.line2, `${ship.address.city}, ${ship.address.state} ${ship.address.postal_code}`]
        .filter(Boolean)
        .join(", ")
    : "";

  const items = lineItems.data.map((li) => {
    const product = li.price?.product;
    const detail = product && typeof product === "object" && "description" in product ? product.description : null;
    return { qty: li.quantity ?? 1, name: li.description ?? "Item", amount: fromCents(li.amount_total), detail };
  });
  const lines = items.map(
    (l) => `${l.qty} × ${l.name} — ${formatPrice(l.amount)}${l.detail ? `\n    ${l.detail}` : ""}`
  );

  const text = [
    "New paid order from the website",
    "",
    `Name: ${meta.name || customer?.name || "—"}`,
    `Email: ${customer?.email ?? session.customer_email ?? "—"}`,
    `Phone: ${meta.phone || customer?.phone || "—"}`,
    `Fulfillment: ${meta.fulfillment || "—"}`,
    meta.fulfillment === "Ship" ? `Ship to: ${address || "—"}` : `Pickup location: ${meta.pickupLocation || "—"}`,
    `Preferred date: ${meta.date || "—"}`,
    "",
    ...lines,
    "",
    `Subtotal: ${formatPrice(fromCents(session.amount_subtotal))}`,
    `Shipping: ${formatPrice(fromCents(session.shipping_cost?.amount_total))}`,
    `Total paid: ${formatPrice(fromCents(session.amount_total))}`,
    "",
    `Notes: ${meta.notes || "—"}`,
    `Stripe payment: ${session.payment_intent ?? session.id}`,
  ].join("\n");

  await sendMail({
    subject: `Paid order — ${meta.name || customer?.name || "website"} — ${formatPrice(fromCents(session.amount_total))}`,
    text,
    replyTo: customer?.email ?? undefined,
  });

  // The farm has the order; a failed customer email shouldn't make Stripe
  // retry and send the farm a duplicate.
  const email = customer?.email ?? session.customer_email;
  if (!email) return;
  try {
    await sendCustomerConfirmation({
      email,
      name: meta.name || customer?.name || "",
      paid: true,
      lines: items,
      subtotal: fromCents(session.amount_subtotal),
      shipping: fromCents(session.shipping_cost?.amount_total),
      total: fromCents(session.amount_total),
      ship: meta.fulfillment === "Ship",
      address,
      date: meta.date,
      notes: meta.notes,
    });
  } catch (err) {
    console.error("Customer confirmation email failed", err);
  }
}
