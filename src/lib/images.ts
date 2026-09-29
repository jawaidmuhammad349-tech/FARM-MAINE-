// Photos from brickhousefarmmaine.com, resized into /public/images.
// A slot with `src: null` shows a labelled placeholder instead.

export type ImageSlot = { src: string | null; alt: string; hint: string };

const img = (file: string, alt: string): ImageSlot => ({ src: `/images/${file}`, alt, hint: file });

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
  board: img("charcuterie-sliced.jpg", "Thinly sliced Brickhouse Farm charcuterie"),
  wedding: img("wedding-pigs.jpg", "Two pigs dressed as a bride and groom kissing"),

  // Charcuterie. The live site has three charcuterie photos; the cuts they
  // show are best guesses. Products without their own photo use a farm photo.
  lonza: img("charcuterie-sliced.jpg", "Thinly sliced lonza"),
  coppa: img("coppa.jpg", "A whole coppa cut in half, showing its marbling"),
  culatello: img("culatello.jpg", "A tied culatello cut in half"),
  salami: img("mangalitsa-curly.jpg", "A curly-haired Mangalitsa pig"),
  guanciale: img("pigs-apples.jpg", "Mangalitsa pigs eating apples"),
  pancetta: img("pigs-pumpkins.jpg", "A Mangalitsa pig with pumpkins"),
} satisfies Record<string, ImageSlot>;

export type ImageKey = keyof typeof images;
