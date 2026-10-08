import "server-only";
import { formatPrice } from "@/lib/catalog";
import { sendMail } from "@/lib/mail";
import { site } from "@/lib/site";

// The confirmation email a customer gets after ordering, for both paid orders
// (sent from the Stripe webhook) and emailed order requests.

type Confirmation = {
  email: string;
  name: string;
  paid: boolean;
  lines: { qty: number; name: string; amount: number; detail?: string | null }[];
  subtotal: number;
  shipping: number;
  total: number;
  ship: boolean;
  address?: string;
  date?: string;
  notes?: string;
};

export async function sendCustomerConfirmation(order: Confirmation) {
  const firstName = order.name.split(/\s+/)[0] || "there";
  const text = [
    `Hi ${firstName},`,
    "",
    order.paid
      ? `Thank you for your order! We've received your payment of ${formatPrice(order.total)}.`
      : "Thank you for your order request! We'll be in touch shortly to confirm availability and payment.",
    "",
    "YOUR ORDER",
    ...order.lines.map(
      (l) => `${l.qty} × ${l.name} — ${formatPrice(l.amount)}${l.detail ? `\n    ${l.detail}` : ""}`
    ),
    "",
    `Subtotal: ${formatPrice(order.subtotal)}`,
    `Shipping: ${order.shipping ? formatPrice(order.shipping) : "Free (pickup)"}`,
    `${order.paid ? "Total paid" : "Estimated total"}: ${formatPrice(order.total)}`,
    "",
    order.ship
      ? `SHIPPING TO\n${order.address || "The address you entered at checkout"}\nWe'll let you know when your order ships.`
      : `PICKUP\nAt the farm: ${site.address}\nWe'll be in touch to arrange a pickup time.`,
    ...(order.date ? ["", `Preferred date: ${order.date}`] : []),
    ...(order.notes ? ["", `Your notes: ${order.notes}`] : []),
    "",
    `Questions? Just reply to this email or call us at ${site.phone}.`,
    "",
    "Thank you for supporting our farm!",
    site.name,
    "brickhousefarmmaine.com",
  ].join("\n");

  await sendMail({
    to: order.email,
    subject: order.paid ? "Your Brickhouse Farm order is confirmed" : "We've received your Brickhouse Farm order request",
    text,
    replyTo: site.email,
  });
}
