"use server";

import { boardBreakdown, describeBoard, formatPrice, fulfillmentOptions, getProduct, normalizeSelection } from "@/lib/catalog";
import type { CartItem } from "@/lib/cart-types";
import { sendMail } from "@/lib/mail";
import { pickupLocations } from "@/lib/site";

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

export async function submitOrder(_prev: FormState, fd: FormData): Promise<FormState> {
  const errors = requireFields(fd, ["name", "email", "fulfillment"]);
  const fulfillment = fulfillmentOptions.find((f) => f.id === str(fd, "fulfillment"));
  if (fulfillment?.id === "ship" && !str(fd, "address")) errors.address = "Required for shipping";
  if (fulfillment?.id === "pickup" && !pickupLocations.includes(str(fd, "pickupLocation")))
    errors.pickupLocation = "Choose a pickup location";

  let items: CartItem[] = [];
  try {
    items = JSON.parse(str(fd, "cart") || "[]");
  } catch {}
  if (!Array.isArray(items) || items.length === 0) errors.cart = "Your cart is empty";
  if (Object.keys(errors).length) return { ok: false, message: "Please check the highlighted fields.", errors };

  // Recalculate prices on the server from the catalog.
  const lines: string[] = [];
  let subtotal = 0;
  for (const item of items) {
    if (!item || typeof item !== "object") continue;
    const qty = Math.max(1, Math.min(99, Math.floor(Number(item.qty) || 1)));
    if (item.kind === "product") {
      const p = getProduct(item.slug);
      if (!p) continue;
      subtotal += p.price * qty;
      lines.push(`${qty} × ${p.name} (${p.weight}) — ${formatPrice(p.price * qty)}`);
    } else if (item.kind === "board") {
      const selection = normalizeSelection(item.selection);
      const { total } = boardBreakdown(selection);
      subtotal += total * qty;
      lines.push(`${qty} × Custom board — ${formatPrice(total * qty)}\n    ${describeBoard(selection)}`);
    }
  }
  const shipping = fulfillment?.cost ?? 0;

  const text = [
    "New order request from the website",
    "",
    `Name: ${str(fd, "name")}`,
    `Email: ${str(fd, "email")}`,
    `Phone: ${str(fd, "phone") || "—"}`,
    `Fulfillment: ${fulfillment?.label}`,
    fulfillment?.id === "ship" ? `Address: ${str(fd, "address")}` : `Pickup location: ${str(fd, "pickupLocation")}`,
    `Preferred date: ${str(fd, "date") || "—"}`,
    "",
    ...lines,
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
