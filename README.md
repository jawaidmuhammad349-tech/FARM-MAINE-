# Brickhouse Farm

Website for Brickhouse Farm (brickhousefarmmaine.com), a small regenerative family farm in Maine selling
Mangalitsa charcuterie, custom charcuterie boards and grass-fed beef shares.

Built with Next.js 16 (App Router), React 19 and TypeScript. Plain CSS, no UI framework.

## Pages

| Route               | Page                                                            |
| ------------------- | --------------------------------------------------------------- |
| `/`                 | Home: hero, story, featured charcuterie, board CTA               |
| `/our-farm`         | Regenerative farming, family, Mangalitsa, USDA inspection        |
| `/shop`             | Charcuterie list (6 products, $20 each)                          |
| `/shop/[slug]`      | Product pages (lonza, coppa, salami, culatello, guanciale, pancetta) |
| `/build-your-board` | 5-step board configurator with running total and summary        |
| `/meat-shares`      | Whole/half grass-fed beef: explanation, FAQ, enquiry form        |
| `/contact`          | Contact form and details                                        |
| `/cart`             | Cart and order request form (not in the main nav)                |

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Orders and forms

There is no online payment yet. The cart, meat-share enquiry and contact forms submit via Server Actions
(`src/app/actions.ts`), which email the details to the farm. Prices are recalculated on the server from
the catalog, not taken from the browser.

Email is sent through [Resend](https://resend.com) when these environment variables are set (see
`.env.example`):

- `RESEND_API_KEY`: Resend API key
- `ORDER_EMAIL_TO`: where requests go (comma-separated for several addresses)
- `ORDER_EMAIL_FROM`: verified sender, e.g. `Brickhouse Farm <orders@brickhousefarmmaine.com>`

Without them, messages are printed to the server console, so everything still works locally.

## Content to finish

### Images

Photos are defined in `src/lib/images.ts`. Each slot shows a labelled placeholder until you add the file.
To fill one in, save the photo from the current site to `public/images/` using the file name shown on
the placeholder (e.g. `hero.jpg`), then set `src: "/images/hero.jpg"` for that slot.

### Placeholders awaiting confirmation from the farm

- **Cheese list**: `cheeses` in `src/lib/catalog.ts`
- **Board size pricing**: `boardSizes` in `src/lib/catalog.ts` (currently Small +$0, Medium +$15, Large +$30)
- **Shipping cost**: `SHIPPING_FLAT_RATE` in `src/lib/catalog.ts` (currently $15; farm pickup is free)
- **Beef share details** (weights, price per lb, deposit, timing): `src/app/meat-shares/page.tsx`
- **Contact details** (email, phone, town, social links): `src/lib/site.ts`

### Copy

Page text is written to match the scope of work. Where Amie's wording on the live site differs, use hers.
The text is in each page's `page.tsx` and the product descriptions are in `src/lib/catalog.ts`.

## Pricing rules (Build Your Own Board)

- Base $50: includes 2 meats + 1 cheese
- Board size surcharge (placeholder)
- Each extra meat +$20, each extra cheese +$16
- Add-ons: compote +$12, honey +$12, almonds +$10
