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

// Descriptions are from the farm's online store (brickhousefarmmaine.com/products).
export const products: Product[] = [
  {
    slug: "coppa",
    name: "Coppa",
    weight: "4 oz",
    price: 20,
    short: "Marbled neck muscle cured with Maine sea salt, aged 6–7 months.",
    description:
      "We use an exquisitely marbled neck muscle and Maine sea salt only to achieve the perfect dry-cured coppa. It is aged for 6–7 months to ensure the delicate yet complex flavors are achieved.",
    pairing: "Paired with a glass of Vermentino and a sourdough baguette — chef's kiss.",
    image: "coppa",
  },
  {
    slug: "salami",
    name: "Salami",
    weight: "6 oz",
    price: 20,
    short: "Handcrafted with old Italian recipes and a wild fermentation.",
    description:
      "Our premium salami is handcrafted using old Italian traditions and recipes. We use a wild fermentation process to ensure the highest quality.",
    pairing: "Perfect for any charcuterie board or pizza!",
    image: "salami",
  },
  {
    slug: "lonza",
    name: "Lonza",
    weight: "4 oz",
    price: 20,
    short: "Cured with Maine sea salt, rolled in red pepper, bay leaf and fennel.",
    description:
      "Our lonza is dry cured using Maine sea salt, then rolled in red pepper, bay leaf and fennel, where it is left to age for 5–6 months.",
    pairing: "Slice paper-thin and serve at room temperature.",
    image: "lonza",
  },
  {
    slug: "culatello",
    name: "Culatello",
    weight: "4 oz",
    price: 20,
    short: "Boneless prosciutto: Mangalitsa ham cured in Maine sea salt for 12 months.",
    description: "Culatello is a boneless prosciutto: Mangalitsa ham dry cured in Maine sea salt for 12 months.",
    pairing: "Enjoy on its own, sliced as thin as you can.",
    image: "culatello",
  },
  {
    slug: "guanciale",
    name: "Guanciale",
    weight: "6 oz",
    price: 20,
    short: "Premium cured cheek that adds rich flavor to your dishes.",
    description:
      "Our guanciale is a premium product made from cured cheek. It is perfect for adding rich flavor to your dishes — ideal for professional chefs and home cooks alike.",
    pairing: "Dice and crisp it for carbonara or amatriciana.",
    image: "guanciale",
  },
  {
    slug: "pancetta",
    name: "Pancetta",
    weight: "6 oz",
    price: 20,
    short: "Our own Mangalitsa pork belly, cured with Maine sea salt.",
    description:
      "Our pancetta is made from our own Mangalitsa pork belly, cured with Maine sea salt, expertly seasoned and aged for a rich, savory flavor. Perfect for adding depth to your favorite dishes.",
    pairing: "Render slowly as the base for sauces, soups and beans.",
    image: "pancetta",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

// ---------- Build Your Own Board ----------
// Every board starts with coppa, salami and one cheese. Everything else is an add-on.

export const BOARD_BASE_PRICE = 50;
export const BOARD_BASE_MEATS = ["coppa", "salami"];
export const EXTRA_MEAT_PRICE = 20;
export const EXTRA_CHEESE_PRICE = 16;

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
  baseCheese: string; // cheese id included in the base price
  meats: Record<string, number>; // extra meats: product slug -> quantity
  cheeses: Record<string, number>; // extra cheeses: cheese id -> quantity
  addOns: string[];
};

export const emptyBoard = (): BoardSelection => ({ baseCheese: "", meats: {}, cheeses: {}, addOns: [] });

// Coerces untrusted input (e.g. from a form post or old saved cart) into a valid selection.
export function normalizeSelection(raw: unknown): BoardSelection {
  const r = (raw ?? {}) as Partial<Record<keyof BoardSelection, unknown>>;
  const clean = (m: unknown, valid: string[]) =>
    Object.fromEntries(
      Object.entries((m ?? {}) as Record<string, unknown>)
        .filter(([id]) => valid.includes(id))
        .map(([id, q]) => [id, Math.max(0, Math.min(20, Math.floor(Number(q) || 0)))])
    );
  return {
    baseCheese: cheeses.some((c) => c.id === r.baseCheese) ? String(r.baseCheese) : cheeses[0].id,
    meats: clean(r.meats, products.map((p) => p.slug)),
    cheeses: clean(r.cheeses, cheeses.map((c) => c.id)),
    addOns: Array.isArray(r.addOns) ? addOns.map((a) => a.id).filter((id) => (r.addOns as unknown[]).includes(id)) : [],
  };
}

export function countOf(map: Record<string, number>) {
  return Object.values(map).reduce((a, b) => a + b, 0);
}

export const cheeseName = (id: string) => cheeses.find((c) => c.id === id)?.name ?? id;

export function boardBreakdown(sel: BoardSelection) {
  const extraMeats = countOf(sel.meats);
  const extraCheeses = countOf(sel.cheeses);
  const chosenAddOns = addOns.filter((a) => sel.addOns.includes(a.id));
  const lines = [
    { label: "Base board (coppa, salami & cheese)", amount: BOARD_BASE_PRICE },
    ...(extraMeats ? [{ label: `Extra meats × ${extraMeats}`, amount: extraMeats * EXTRA_MEAT_PRICE }] : []),
    ...(extraCheeses ? [{ label: `Extra cheeses × ${extraCheeses}`, amount: extraCheeses * EXTRA_CHEESE_PRICE }] : []),
    ...chosenAddOns.map((a) => ({ label: a.name, amount: a.price })),
  ];
  return { lines, total: lines.reduce((a, l) => a + l.amount, 0) };
}

const listCounts = (map: Record<string, number>, lookup: (id: string) => string | undefined) =>
  Object.entries(map)
    .filter(([, q]) => q > 0)
    .map(([id, q]) => `${lookup(id) ?? id}${q > 1 ? ` ×${q}` : ""}`);

export function boardParts(sel: BoardSelection) {
  return {
    base: `Coppa, Salami, ${cheeseName(sel.baseCheese)}`,
    meats: listCounts(sel.meats, (id) => getProduct(id)?.name),
    cheeses: listCounts(sel.cheeses, cheeseName),
    addOns: addOns.filter((a) => sel.addOns.includes(a.id)).map((a) => a.name),
  };
}

export function describeBoard(sel: BoardSelection) {
  const p = boardParts(sel);
  const parts = [`Base: ${p.base}`];
  if (p.meats.length) parts.push(`Extra meats: ${p.meats.join(", ")}`);
  if (p.cheeses.length) parts.push(`Extra cheese: ${p.cheeses.join(", ")}`);
  if (p.addOns.length) parts.push(`Add-ons: ${p.addOns.join(", ")}`);
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
