// Photos from brickhousefarmmaine.com, resized into /public/images.
// A slot with `src: null` shows a labelled placeholder instead.

export type ImageSlot = { src: string | null; alt: string; hint: string };

const img = (file: string, alt: string): ImageSlot => ({ src: `/images/${file}`, alt, hint: file });
// Photo not available yet: shows a labelled placeholder.
const todo = (hint: string, alt: string): ImageSlot => ({ src: null, alt, hint });

export const images = {
  hero: img("hero.jpg", "Sunset over the pasture at Brickhouse Farm, with donkeys grazing"),
  farmhouse: img("farmhouse.jpg", "The brick farmhouse at Brickhouse Farm at sunset"),
  family: img("family.jpg", "Amie holding a Mangalitsa piglet in the barn"),
  mangalitsa: img("mangalitsa.jpg", "A Mangalitsa pig standing in a green pasture"),
  mangalitsaCurly: img("mangalitsa-curly.jpg", "A curly-haired Mangalitsa pig looking into the camera"),
  pigGrazing: img("pig-grazing.jpg", "A Mangalitsa pig foraging in tall greens"),
  pigsPasture: img("pigs-pasture.jpg", "Mangalitsa pigs rooting on an autumn pasture"),
  pigsApples: img("pigs-apples.jpg", "Mangalitsa pigs eating a pile of red apples"),
  pigsPumpkins: img("pigs-pumpkins.jpg", "A black and white Mangalitsa pig with pumpkins"),
  piglets: img("piglets.jpg", "Striped Mangalitsa piglets snuggled against their mother"),
  highlandCow: img("highland-cow.jpg", "A Highland cow grazing in a field of dandelions"),
  highlandCalf: img("highland-calf.jpg", "A fluffy Highland calf"),
  cowDonkey: img("cow-donkey.jpg", "A Highland cow and a donkey in the pasture"),
  donkeys: img("donkeys.jpg", "Two donkeys looking into the camera"),
  turkey: img("turkey.jpg", "A curious turkey up close"),
  tractor: img("tractor.jpg", "An old red tractor among hollyhocks"),
  board: img("board.jpg", "A Brickhouse Farm charcuterie board with cured meats, cheese, bread, almonds, honey and fruit spread"),
  curing: img("coppa.jpg", "A whole coppa cut in half, showing its marbling"),
  sliced: img("charcuterie-sliced.jpg", "Thinly sliced Brickhouse Farm charcuterie"),

  // Product photos from the farm's online store.
  lonza: img("product-lonza.jpg", "Thinly sliced lonza"),
  coppa: img("product-coppa.jpg", "A whole coppa cut open, showing its marbling"),
  salami: img("product-salami.jpg", "A whole salami with slices on a wooden board"),
  culatello: img("product-culatello.jpg", "Paper-thin slices of culatello"),
  guanciale: img("product-guanciale.jpg", "Two pieces of cured guanciale"),
  pancetta: img("product-pancetta.jpg", "Two pieces of cured pancetta"),

  // PLACEHOLDER: product photos to come from the makers' websites.
  bellavitano: todo("BellaVitano photo coming soon", "BellaVitano cheese"),
  marisa: todo("Marisa photo coming soon", "Marisa sheep's milk cheese"),
  cardona: todo("Cardona photo coming soon", "Cardona goat cheese"),
  cheeseCurds: todo("Cheese curds photo coming soon", "White cheddar cheese curds"),
  cremerKasa: todo("Cremer Kasa photo coming soon", "Cremer Kasa cheese"),
  almonds: todo("Almonds photo coming soon", "Old World Italian Herb Almonds"),
  honey: todo("Honey photo coming soon", "A jar of raw Maine honey"),
  crackers: todo("Crackers photo coming soon", "Sourdough crackers"),
} satisfies Record<string, ImageSlot>;

export type ImageKey = keyof typeof images;
