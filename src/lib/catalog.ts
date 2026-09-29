// Product catalog, board configurator options and pricing.
// Anything marked PLACEHOLDER is awaiting confirmation from Brickhouse Farm.

import type { ImageKey } from "./images";

export type Product = {
  slug: string;
  name: string;
  weight: string;
  price: number;
  short: string;
  description: string;
  pairing: string;
  image: ImageKey;
};

export const products: Product[] = [
  {
    slug: "lonza",
    name: "Lonza",
    weight: "4 oz",
    price: 20,
    short: "Cured Mangalitsa pork loin, lean and delicate.",
    description:
      "Lonza is whole pork loin, salted, seasoned and slowly air-dried. Mangalitsa loin carries a ribbon of fat that melts on the tongue, giving a clean, sweet pork flavor.",
    pairing: "Slice paper-thin. Lovely with melon, fresh cheese or a crisp white wine.",
    image: "lonza",
  },
  {
    slug: "coppa",
    name: "Coppa",
    weight: "4 oz",
    price: 20,
    short: "Well-marbled neck and shoulder, rich and savory.",
    description:
      "Coppa comes from the neck and shoulder, one of the most marbled cuts on the hog. It is cured whole and dried until it is tender, rich and deeply savory.",
    pairing: "Serve at room temperature with crusty bread, olives and a medium-bodied red.",
    image: "coppa",
  },
  {
    slug: "salami",
    name: "Salami",
    weight: "6 oz",
    price: 20,
    short: "Classic dry-cured salami made from our pastured pork.",
    description:
      "Our salami is ground Mangalitsa pork, seasoned, stuffed and slowly fermented and dried. A crowd favorite and the heart of any board.",
    pairing: "Cut in thick coins for snacking, or thin for sandwiches. Great with mustard and aged cheese.",
    image: "salami",
  },
  {
    slug: "culatello",
    name: "Culatello",
    weight: "4 oz",
    price: 20,
    short: "The prized heart of the ham, silky and sweet.",
    description:
      "Culatello is the most prized part of the rear leg, cured and aged with care. It is silky, sweet and complex — a true specialty.",
    pairing: "Enjoy on its own, sliced as thin as you can, with a glass of sparkling wine.",
    image: "culatello",
  },
  {
    slug: "guanciale",
    name: "Guanciale",
    weight: "6 oz",
    price: 20,
    short: "Cured pork jowl, the secret to real carbonara.",
    description:
      "Guanciale is cured pork jowl. Mangalitsa jowl renders into a golden, flavorful fat that makes pasta dishes sing.",
    pairing: "Dice and crisp for carbonara or amatriciana, or wrap around vegetables before roasting.",
    image: "guanciale",
  },
  {
    slug: "pancetta",
    name: "Pancetta",
    weight: "6 oz",
    price: 20,
    short: "Cured pork belly for cooking, seasoned and savory.",
    description:
      "Pancetta is pork belly cured with salt and spices. It brings rich, savory depth to soups, sauces, beans and greens.",
    pairing: "Render slowly as the base for sauces and soups, or crisp and scatter over salads.",
    image: "pancetta",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

// ---------- Build Your Own Board ----------

export const BOARD_BASE_PRICE = 50;
export const BOARD_INCLUDED_MEATS = 2;
export const BOARD_INCLUDED_CHEESES = 1;
export const EXTRA_MEAT_PRICE = 20;
export const EXTRA_CHEESE_PRICE = 16;

export type BoardSize = { id: string; name: string; serves: string; surcharge: number };

// Serving sizes are from the farm's holiday boards.
// PLACEHOLDER: size surcharges to be confirmed by the farm.
export const boardSizes: BoardSize[] = [
  { id: "small", name: "Small", serves: "Serves 3–5", surcharge: 0 },
  { id: "medium", name: "Medium", serves: "Serves 6–10", surcharge: 15 },
  { id: "large", name: "Large", serves: "Serves 11–16", surcharge: 30 },
];

export type Cheese = { id: string; name: string; note: string };

// PLACEHOLDER: cheese list to be confirmed by the farm. These are the
// creameries the farm partnered with for its holiday boards.
export const cheeses: Cheese[] = [
  { id: "crooked-face", name: "Crooked Face Creamery", note: "Small-batch Maine cheese made with local ingredients" },
  { id: "marieke-gouda", name: "Marieke Gouda", note: "Farmstead raw milk gouda in the traditional Dutch style" },
  { id: "sartori-bellavitano", name: "Sartori BellaVitano", note: "Award-winning Wisconsin artisan cheese" },
];

export type AddOn = { id: string; name: string; price: number; note: string };

export const addOns: AddOn[] = [
  { id: "compote", name: "Compote", price: 12, note: "Seasonal fruit spread" },
  { id: "honey", name: "Honey", price: 12, note: "Raw, unfiltered Maine honey from Tony's Honey in Buckfield" },
  { id: "almonds", name: "Almonds", price: 10, note: "Organic sprouted almonds from Living Nutz" },
];

export type BoardSelection = {
  size: string;
  meats: Record<string, number>; // product slug -> quantity
  cheeses: Record<string, number>; // cheese id -> quantity
  addOns: string[];
};

// Coerces untrusted input (e.g. from a form post) into a valid selection.
export function normalizeSelection(raw: unknown): BoardSelection {
  const r = (raw ?? {}) as Partial<Record<keyof BoardSelection, unknown>>;
  const clean = (m: unknown, valid: string[]) =>
    Object.fromEntries(
      Object.entries((m ?? {}) as Record<string, unknown>)
        .filter(([id]) => valid.includes(id))
        .map(([id, q]) => [id, Math.max(0, Math.min(20, Math.floor(Number(q) || 0)))])
    );
  return {
    size: boardSizes.some((s) => s.id === r.size) ? String(r.size) : boardSizes[0].id,
    meats: clean(r.meats, products.map((p) => p.slug)),
    cheeses: clean(r.cheeses, cheeses.map((c) => c.id)),
    addOns: Array.isArray(r.addOns) ? addOns.map((a) => a.id).filter((id) => (r.addOns as unknown[]).includes(id)) : [],
  };
}

export function countOf(map: Record<string, number>) {
  return Object.values(map).reduce((a, b) => a + b, 0);
}

export function boardBreakdown(sel: BoardSelection) {
  const size = boardSizes.find((s) => s.id === sel.size) ?? boardSizes[0];
  const meatCount = countOf(sel.meats);
  const cheeseCount = countOf(sel.cheeses);
  const extraMeats = Math.max(0, meatCount - BOARD_INCLUDED_MEATS);
  const extraCheeses = Math.max(0, cheeseCount - BOARD_INCLUDED_CHEESES);
  const chosenAddOns = addOns.filter((a) => sel.addOns.includes(a.id));
  const lines = [
    { label: `Board base (${BOARD_INCLUDED_MEATS} meats + ${BOARD_INCLUDED_CHEESES} cheese)`, amount: BOARD_BASE_PRICE },
    ...(size.surcharge ? [{ label: `${size.name} board`, amount: size.surcharge }] : []),
    ...(extraMeats ? [{ label: `Extra meats × ${extraMeats}`, amount: extraMeats * EXTRA_MEAT_PRICE }] : []),
    ...(extraCheeses ? [{ label: `Extra cheeses × ${extraCheeses}`, amount: extraCheeses * EXTRA_CHEESE_PRICE }] : []),
    ...chosenAddOns.map((a) => ({ label: a.name, amount: a.price })),
  ];
  return { size, meatCount, cheeseCount, lines, total: lines.reduce((a, l) => a + l.amount, 0) };
}

export function describeBoard(sel: BoardSelection) {
  const { size } = boardBreakdown(sel);
  const name = (map: Record<string, number>, lookup: (id: string) => string | undefined) =>
    Object.entries(map)
      .filter(([, q]) => q > 0)
      .map(([id, q]) => `${lookup(id) ?? id}${q > 1 ? ` ×${q}` : ""}`)
      .join(", ");
  const parts = [
    `${size.name} board`,
    `Meats: ${name(sel.meats, (id) => getProduct(id)?.name)}`,
    `Cheese: ${name(sel.cheeses, (id) => cheeses.find((c) => c.id === id)?.name)}`,
  ];
  const extras = addOns.filter((a) => sel.addOns.includes(a.id)).map((a) => a.name);
  if (extras.length) parts.push(`Add-ons: ${extras.join(", ")}`);
  return parts.join(" · ");
}

// ---------- Shipping ----------

// PLACEHOLDER: shipping cost to be confirmed by the farm.
export const SHIPPING_FLAT_RATE = 15;

export const fulfillmentOptions = [
  { id: "pickup", label: "Pick up", cost: 0 },
  { id: "ship", label: "Ship to me (placeholder rate)", cost: SHIPPING_FLAT_RATE },
] as const;

export function formatPrice(n: number) {
  return `$${n.toFixed(n % 1 ? 2 : 0)}`;
}
