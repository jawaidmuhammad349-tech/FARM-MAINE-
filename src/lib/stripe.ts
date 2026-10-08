import "server-only";
import Stripe from "stripe";

// Payments are on when STRIPE_SECRET_KEY is set. Without it, the cart falls
// back to sending an order request by email.
export const paymentsEnabled = () => Boolean(process.env.STRIPE_SECRET_KEY);

let client: Stripe | null = null;

export function getStripe() {
  if (!client) client = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  return client;
}

export const toCents = (dollars: number) => Math.round(dollars * 100);
export const fromCents = (cents: number | null | undefined) => (cents ?? 0) / 100;
