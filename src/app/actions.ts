"use server";

import { boardBreakdown, describeBoard, formatPrice, fulfillmentOptions, getProduct, normalizeSelection } from "@/lib/catalog";
import type { CartItem } from "@/lib/cart-types";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { sendMail } from "@/lib/mail";
import { pickupLocation } from "@/lib/site";
import { getStripe, paymentsEnabled, toCents } from "@/lib/stripe";

export type FormState = { ok: boolean; message: string; errors?: Record<string, string> };

const str = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function requireFields(fd: FormData, fields: string[]) {
  const errors: Record<string, string> = {};
  for (const f of fields) if (!str(fd, f)) errors[f] = "Required";
  const email = str(fd, "email");
  if (email && !isEmail(email)) errors.email = "Enter a valid email";
  return errors;
}

async function deliver(subject: string, text: string, replyTo: string, success: string): Promise<FormState> {
  try {
    await sendMail({ subject, text, replyTo });
    return { ok: true, message: success };
  } catch (err) {
    console.error(err);
    return { ok: false, message: "Something went wrong sending your request. Please try again or email us directly." };
  }
}

type OrderLine = { name: string; description?: string; unitPrice: number; qty: number };

// Rebuilds the cart from the catalog so prices never come from the browser.
function priceCart(raw: string): OrderLine[] {
  let items: CartItem[] = [];
  try {
    items = JSON.parse(raw || "[]");
  } catch {}
  if (!Array.isArray(items)) return [];
  const lines: OrderLine[] = [];
  for (const item of items) {
    if (!item || typeof item !== "object") continue;
    const qty = Math.max(1, Math.min(99, Math.floor(Number(item.qty) || 1)));
    if (item.kind === "product") {
      const p = getProduct(item.slug);
      if (!p || p.price === null) continue;
      lines.push({ name: p.weight ? `${p.name} (${p.weight})` : p.name, unitPrice: p.price, qty });
    } else if (item.kind === "board") {
      const selection = normalizeSelection(item.selection);
      lines.push({
        name: "Custom charcuterie board",
        description: describeBoard(selection),
        unitPrice: boardBreakdown(selection).total,
        qty,
      });
    }
  }
  return lines;
}

async function siteOrigin() {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

export async function submitOrder(_prev: FormState, fd: FormData): Promise<FormState> {
  const payOnline = paymentsEnabled();
  const errors = requireFields(fd, ["name", "email", "fulfillment"]);
  const fulfillment = fulfillmentOptions.find((f) => f.id === str(fd, "fulfillment"));
  // With online payment, Stripe collects the shipping address.
  if (!payOnline && fulfillment?.id === "ship" && !str(fd, "address")) errors.address = "Required for shipping";

  const lines = priceCart(str(fd, "cart"));
  if (lines.length === 0) errors.cart = "Your cart is empty";
  if (Object.keys(errors).length) return { ok: false, message: "Please check the highlighted fields.", errors };

  const shipping = fulfillment?.cost ?? 0;
  const subtotal = lines.reduce((a, l) => a + l.unitPrice * l.qty, 0);

  if (payOnline) {
    let checkoutUrl: string | null = null;
    try {
      const origin = await siteOrigin();
      const session = await getStripe().checkout.sessions.create({
        mode: "payment",
        customer_email: str(fd, "email"),
        line_items: lines.map((l) => ({
          quantity: l.qty,
          price_data: {
            currency: "usd",
            unit_amount: toCents(l.unitPrice),
            product_data: { name: l.name, ...(l.description ? { description: l.description.slice(0, 500) } : {}) },
          },
        })),
        ...(fulfillment?.id === "ship"
          ? {
              shipping_address_collection: { allowed_countries: ["US"] },
              shipping_options: [
                {
                  shipping_rate_data: {
                    type: "fixed_amount",
                    display_name: "Flat-rate shipping",
                    fixed_amount: { amount: toCents(shipping), currency: "usd" },
                  },
                },
              ],
            }
          : {}),
        metadata: {
          name: str(fd, "name").slice(0, 500),
          phone: str(fd, "phone").slice(0, 500),
          fulfillment: fulfillment?.id === "ship" ? "Ship" : "Pickup",
          pickupLocation: fulfillment?.id === "pickup" ? pickupLocation : "",
          date: str(fd, "date").slice(0, 500),
          notes: str(fd, "notes").slice(0, 500),
        },
        success_url: `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/cart`,
      });
      checkoutUrl = session.url;
    } catch (err) {
      console.error("Stripe checkout failed", err);
    }
    if (!checkoutUrl) {
      return { ok: false, message: "We couldn't open the secure checkout. Please try again, or contact us to order." };
    }
    redirect(checkoutUrl); // outside the try: redirect() works by throwing
  }

  const text = [
    "New order request from the website",
    "",
    `Name: ${str(fd, "name")}`,
    `Email: ${str(fd, "email")}`,
    `Phone: ${str(fd, "phone") || "—"}`,
    `Fulfillment: ${fulfillment?.label}`,
    fulfillment?.id === "ship" ? `Address: ${str(fd, "address")}` : `Pickup location: ${pickupLocation}`,
    `Preferred date: ${str(fd, "date") || "—"}`,
    "",
    ...lines.map(
      (l) => `${l.qty} × ${l.name} — ${formatPrice(l.unitPrice * l.qty)}${l.description ? `\n    ${l.description}` : ""}`
    ),
    "",
    `Subtotal: ${formatPrice(subtotal)}`,
    `Shipping: ${formatPrice(shipping)}`,
    `Estimated total: ${formatPrice(subtotal + shipping)}`,
    "",
    `Notes: ${str(fd, "notes") || "—"}`,
  ]
    .filter((l) => l !== "")
    .join("\n");

  return deliver(
    `Order request — ${str(fd, "name")}`,
    text,
    str(fd, "email"),
    "Thank you! Your order request has been sent. We'll be in touch shortly to confirm details and payment."
  );
}

export async function submitShareEnquiry(_prev: FormState, fd: FormData): Promise<FormState> {
  const errors = requireFields(fd, ["name", "email", "share"]);
  if (Object.keys(errors).length) return { ok: false, message: "Please check the highlighted fields.", errors };
  const text = [
    "New meat share enquiry",
    `Name: ${str(fd, "name")}`,
    `Email: ${str(fd, "email")}`,
    `Phone: ${str(fd, "phone") || "—"}`,
    `Share: ${str(fd, "share")}`,
    `Timing: ${str(fd, "timing") || "—"}`,
    `Message: ${str(fd, "message") || "—"}`,
  ].join("\n");
  return deliver(
    `Meat share enquiry — ${str(fd, "name")}`,
    text,
    str(fd, "email"),
    "Thanks for your interest! We'll reach out about availability and next steps."
  );
}

export async function submitContact(_prev: FormState, fd: FormData): Promise<FormState> {
  const errors = requireFields(fd, ["name", "email", "message"]);
  if (Object.keys(errors).length) return { ok: false, message: "Please check the highlighted fields.", errors };
  const text = [
    "New message from the website",
    `Name: ${str(fd, "name")}`,
    `Email: ${str(fd, "email")}`,
    `Subject: ${str(fd, "subject") || "—"}`,
    "",
    str(fd, "message"),
  ].join("\n");
  return deliver(`Website message — ${str(fd, "name")}`, text, str(fd, "email"), "Thanks for reaching out! We'll get back to you soon.");
}
