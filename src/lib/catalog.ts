// Product catalog, board configurator options and pricing.
// Anything marked PLACEHOLDER is awaiting confirmation from Brickhouse Farm.

import type { ImageKey } from "./images";

export type Category = "charcuterie" | "cheese" | "pantry";

export const categories: { id: Category; title: string; intro: string }[] = [
  {
    id: "charcuterie",
    title: "Charcuterie",
    intro:
      "We cure our pasture-raised, USDA certified Mangalitsa pork using traditional Italian methods passed down through generations.",
  },
  { id: "cheese", title: "Cheese", intro: "Artisan cheeses from small Wisconsin creameries." },
  { id: "pantry", title: "Pantry", intro: "Local honey, nuts and crackers to round out your table." },
];

export type Product = {
  slug: string;
  name: string;
  category: Category;
  weight: string;
  price: number | null; // null = price not set yet; shown as "coming soon" and not sold
  short: string;
  description: string;
  pairing?: string;
  specs?: [string, string][];
  image: ImageKey;
};

// Descriptions are from the farm's online store (brickhousefarmmaine.com/products).
export const products: Product[] = [
  {
    slug: "coppa",
    name: "Coppa",
    category: "charcuterie",
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
    category: "charcuterie",
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
    category: "charcuterie",
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
    category: "charcuterie",
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
    category: "charcuterie",
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
    category: "charcuterie",
    weight: "6 oz",
    price: 20,
    short: "Our own Mangalitsa pork belly, cured with Maine sea salt.",
    description:
      "Our pancetta is made from our own Mangalitsa pork belly, cured with Maine sea salt, expertly seasoned and aged for a rich, savory flavor. Perfect for adding depth to your favorite dishes.",
    pairing: "Render slowly as the base for sauces, soups and beans.",
    image: "pancetta",
  },
  // Cheeses
  {
    slug: "bellavitano",
    name: "BellaVitano",
    category: "cheese",
    weight: "5.3 oz",
    price: 14,
    short: "Smooth, buttery and rich, with fruity, sweet and nutty notes.",
    description:
      "This delicious cheese is made with cow's milk, is smooth, buttery and rich, and has notes of fruity, sweet and nutty flavors that will surprise your taste buds with every bite. Creamy, salty and sweet — a prized trifecta.",
    specs: [
      ["Region", "Plymouth, WI"],
      ["Milk type", "Cow"],
      ["Pasteurization", "Pasteurized"],
    ],
    image: "bellavitano",
  },
  {
    slug: "marisa",
    name: "Marisa",
    category: "cheese",
    weight: "5 oz",
    price: 16,
    short: "A mellow, complex and sweet seasonal sheep's milk cheese.",
    description:
      "A seasonal cheese made with milk from pastured Wisconsin sheep. It is white in color and its flavor is mellow, complex and sweet — qualities that reminded Sid of his daughter, Marisa, for whom he named the cheese. This is a great sheep milk cheese to try if you are new to the \u201csheep cheese world\u201d!",
    specs: [
      ["Region", "LaValle, WI"],
      ["Milk type", "Sheep"],
      ["Pasteurization", "Pasteurized"],
    ],
    image: "marisa",
  },
  {
    slug: "cardona",
    name: "Cardona",
    category: "cheese",
    weight: "5 oz",
    price: 16,
    short: "Goat cheese with a mild, sweet caramel flavor and a slight nuttiness.",
    description:
      "A wonderful goat cheese with a mild, sweet, caramel flavor balanced by a slight nuttiness. It is aged for several months for a firm yet soft cheese.",
    specs: [
      ["Flavor profile", "Sweet, caramel, nutty"],
      ["Region", "LaValle, WI"],
      ["Milk type", "Goat"],
      ["Pasteurization", "Pasteurized"],
      ["Rennet", "Vegetarian"],
    ],
    image: "cardona",
  },
  {
    slug: "cheese-curds",
    name: "White Cheddar Cheese Curds",
    category: "cheese",
    weight: "6 oz",
    price: 12,
    short: "The famous Wisconsin cheese curd, from Clock Shadow Creamery.",
    description:
      "The famous Wisconsin cheese curd! Cheese curds are the absolute youngest form of cheese. Cheddar cheese curds are a natural part of the cheese-making process: after the whey separation step, curds are taken out of the cheese vat before being pressed into Cheddar or Colby. This iconic Wisconsin cheese has a great mild flavor and a firm, springy texture.",
    specs: [["Creamery", "Clock Shadow Creamery"]],
    image: "cheeseCurds",
  },
  // PLACEHOLDER: size and description to be copied from wisconsincheesemart.com.
  {
    slug: "cremer-kasa",
    name: "Cremer Kasa",
    category: "cheese",
    weight: "",
    price: 16,
    short: "Details coming soon.",
    description: "Details coming soon.",
    image: "cremerKasa",
  },

  // Pantry
  {
    slug: "italian-herb-almonds",
    name: "Old World Italian Herb Almonds",
    category: "pantry",
    weight: "", // PLACEHOLDER: size to be confirmed
    price: 9,
    short: "Savory raw almonds from Living Nutz, a Maine family-owned company.",
    description:
      "Living Nutz is a Maine family-owned company that produces organic, raw and sprouted nut snacks, dehydrated at low temperatures to preserve enzymes and nutrition.",
    image: "almonds",
  },
  {
    slug: "honey",
    name: "Raw Maine Honey",
    category: "pantry",
    weight: "4 oz",
    price: 9,
    short: "Raw, unfiltered Maine honey from Buckfield.",
    description:
      "Tom's Honey is a fourth-generation beekeeping family that produces raw, unfiltered Maine honey. They are located in Buckfield, Maine.",
    image: "honey",
  },
  // PLACEHOLDER: price and description coming from the baker.
  {
    slug: "sourdough-crackers",
    name: "Sourdough Crackers",
    category: "pantry",
    weight: "6 oz",
    price: null,
    short: "Details coming soon.",
    description: "Details coming soon.",
    image: "crackers",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

// ---------- Build Your Own Board ----------
// The base board is 2 meats and 1 cheese. Everything else is an add-on.

export const BOARD_BASE_PRICE = 50;
export const BOARD_BASE_MEAT_COUNT = 2;
export const BOARD_MEATS = ["coppa", "salami", "lonza", "culatello"];
export const EXTRA_MEAT_PRICE = 20;
export const EXTRA_CHEESE_PRICE = 16;

export const boardMeats = () => BOARD_MEATS.map((slug) => getProduct(slug)!);
export const boardCheeses = () => products.filter((p) => p.category === "cheese" && p.price !== null);

export type AddOn = { id: string; name: string; price: number; note: string };

export const addOns: AddOn[] = [
  { id: "honey", name: "Local honey", price: 12, note: "Raw, unfiltered Maine honey from Buckfield" },
  { id: "almonds", name: "Living Nutz almonds", price: 10, note: "Organic sprouted almonds from a Maine family company" },
];

export type BoardSelection = {
  baseMeats: Record<string, number>; // the 2 included meats: slug -> quantity
  baseCheese: string; // cheese slug included in the base price
  meats: Record<string, number>; // extra meats
  cheeses: Record<string, number>; // extra cheeses
  addOns: string[];
};

export const emptyBoard = (): BoardSelection => ({ baseMeats: {}, baseCheese: "", meats: {}, cheeses: {}, addOns: [] });

export function countOf(map: Record<string, number>) {
  return Object.values(map).reduce((a, b) => a + b, 0);
}

// Coerces untrusted input (e.g. from a form post or old saved cart) into a valid selection.
export function normalizeSelection(raw: unknown): BoardSelection {
  const r = (raw ?? {}) as Partial<Record<keyof BoardSelection, unknown>>;
  const clean = (m: unknown, valid: string[]) =>
    Object.fromEntries(
      Object.entries((m ?? {}) as Record<string, unknown>)
        .filter(([id]) => valid.includes(id))
        .map(([id, q]) => [id, Math.max(0, Math.min(20, Math.floor(Number(q) || 0)))])
    );
  const cheeseIds = boardCheeses().map((c) => c.slug);
  let baseMeats = clean(r.baseMeats, BOARD_MEATS);
  if (countOf(baseMeats) !== BOARD_BASE_MEAT_COUNT) baseMeats = { coppa: 1, salami: 1 };
  return {
    baseMeats,
    baseCheese: cheeseIds.includes(String(r.baseCheese)) ? String(r.baseCheese) : cheeseIds[0],
    meats: clean(r.meats, BOARD_MEATS),
    cheeses: clean(r.cheeses, cheeseIds),
    addOns: Array.isArray(r.addOns) ? addOns.map((a) => a.id).filter((id) => (r.addOns as unknown[]).includes(id)) : [],
  };
}

const productName = (slug: string) => getProduct(slug)?.name ?? slug;

export function boardBreakdown(sel: BoardSelection) {
  const extraMeats = countOf(sel.meats);
  const extraCheeses = countOf(sel.cheeses);
  const chosenAddOns = addOns.filter((a) => sel.addOns.includes(a.id));
  const lines = [
    { label: "Base board (2 meats & 1 cheese)", amount: BOARD_BASE_PRICE },
    ...(extraMeats ? [{ label: `Extra meats × ${extraMeats}`, amount: extraMeats * EXTRA_MEAT_PRICE }] : []),
    ...(extraCheeses ? [{ label: `Extra cheeses × ${extraCheeses}`, amount: extraCheeses * EXTRA_CHEESE_PRICE }] : []),
    ...chosenAddOns.map((a) => ({ label: a.name, amount: a.price })),
  ];
  return { lines, total: lines.reduce((a, l) => a + l.amount, 0) };
}

const listCounts = (map: Record<string, number>) =>
  Object.entries(map)
    .filter(([, q]) => q > 0)
    .map(([id, q]) => `${productName(id)}${q > 1 ? ` ×${q}` : ""}`);

export function boardParts(sel: BoardSelection) {
  return {
    base: [...listCounts(sel.baseMeats), ...(sel.baseCheese ? [productName(sel.baseCheese)] : [])],
    meats: listCounts(sel.meats),
    cheeses: listCounts(sel.cheeses),
    addOns: addOns.filter((a) => sel.addOns.includes(a.id)).map((a) => a.name),
  };
}

export function describeBoard(sel: BoardSelection) {
  const p = boardParts(sel);
  const parts = [`Base: ${p.base.join(", ")}`];
  if (p.meats.length) parts.push(`Extra meats: ${p.meats.join(", ")}`);
  if (p.cheeses.length) parts.push(`Extra cheese: ${p.cheeses.join(", ")}`);
  if (p.addOns.length) parts.push(`Add-ons: ${p.addOns.join(", ")}`);
  return parts.join(" · ");
}

// ---------- Shipping ----------

// Flat shipping charge per order.
export const SHIPPING_FLAT_RATE = 15;

export const fulfillmentOptions = [
  { id: "pickup", label: "Pick up", cost: 0 },
  { id: "ship", label: "Ship to me", cost: SHIPPING_FLAT_RATE },
] as const;

export function formatPrice(n: number) {
  return `$${n.toFixed(n % 1 ? 2 : 0)}`;
}
