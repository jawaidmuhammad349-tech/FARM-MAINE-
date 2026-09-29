// Image slots for the site. Each slot points at a file in /public/images.
// Drop the matching photo from brickhousefarmmaine.com into public/images
// with the file name below and set `src`; while `src` is null a warm
// placeholder is shown instead.

export type ImageSlot = { src: string | null; alt: string; hint: string };

export const images = {
  hero: { src: null, alt: "Pasture at Brickhouse Farm", hint: "Home hero – wide farm/pasture photo (hero.jpg)" },
  story: { src: null, alt: "The family at Brickhouse Farm", hint: "Family / farm story photo (story.jpg)" },
  pigs: { src: null, alt: "Mangalitsa pigs on pasture", hint: "Mangalitsa pigs (pigs.jpg)" },
  cattle: { src: null, alt: "Grass-fed cattle grazing", hint: "Grass-fed cattle (cattle.jpg)" },
  pasture: { src: null, alt: "Rotational grazing on the farm", hint: "Regenerative pasture (pasture.jpg)" },
  board: { src: null, alt: "A Brickhouse Farm charcuterie board", hint: "Charcuterie board (board.jpg)" },
  lonza: { src: null, alt: "Sliced lonza", hint: "Lonza (lonza.jpg)" },
  coppa: { src: null, alt: "Sliced coppa", hint: "Coppa (coppa.jpg)" },
  salami: { src: null, alt: "Salami", hint: "Salami (salami.jpg)" },
  culatello: { src: null, alt: "Sliced culatello", hint: "Culatello (culatello.jpg)" },
  guanciale: { src: null, alt: "Guanciale", hint: "Guanciale (guanciale.jpg)" },
  pancetta: { src: null, alt: "Pancetta", hint: "Pancetta (pancetta.jpg)" },
} satisfies Record<string, ImageSlot>;

export type ImageKey = keyof typeof images;
