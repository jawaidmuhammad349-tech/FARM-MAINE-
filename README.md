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

## Content

Text and photos come from brickhousefarmmaine.com: Amie's "Who We Are", mission and Mangalitsa text, the
holiday board details (serving sizes, artisan partners, packaging notes, pickup locations), the weddings page
and the contact details. Wording has only been lightly edited for clarity (typos, punctuation).

Product descriptions are from the farm's online store. Weights follow the original scope; the store lists
some cuts at different weights (e.g. Coppa 3 oz, Salami 5.5 oz), so confirm with the farm.

### Images

Photos are resized copies (max 1600px) of the originals on the live site, stored in `public/images/` and
mapped to slots in `src/lib/images.ts`.

### Logo

Full-size masters are in `brand/`: the original logo (`logo-original.jpg`) and a transparent cut-out
(`logo-transparent.png`). Derived from them:

- `public/images/logo.png`: full logo, shown in the footer
- `public/images/emblem.png`: framed pig and banner without the lettering, shown in the header
- `src/app/icon.png`, `src/app/apple-icon.png`: browser tab and home-screen icons (round pig portrait)
- `src/app/opengraph-image.jpg`: preview image shown when a link is shared

The lettering is dark brown, so use the full logo on light backgrounds only.

- Product photos and descriptions come from the farm's GoDaddy online store
  (`brickhousefarmmaine.com/products/ols/products/...`).
- The artisan partner photos on the live site (screenshots of other businesses and a Google Images result)
  were not copied.

### Placeholders awaiting confirmation from the farm

- **Cheese list**: `cheeses` in `src/lib/catalog.ts` (currently the three creameries from the holiday boards)
- **Shipping cost**: `SHIPPING_FLAT_RATE` in `src/lib/catalog.ts` (currently $15). Note the live site says
  boards are pickup only, with no shipping.
- **Beef share details** (weights, price per lb, deposit, timing): `src/app/meat-shares/page.tsx`

## Pricing rules (Build Your Own Board)

- Base $50: coppa, salami and one cheese of the customer's choice (no board sizes)
- Each extra meat +$20, each extra cheese +$16
- Add-ons: compote +$12, honey +$12, almonds +$10
