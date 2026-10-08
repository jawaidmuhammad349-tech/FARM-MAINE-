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

## Orders and payments

Checkout uses **Stripe Checkout** (Stripe's hosted payment page: cards, Apple Pay, Google Pay).

1. The cart form (`src/app/actions.ts`, `submitOrder`) re-prices every item from the catalog on the server and
   creates a Checkout Session. Shipping orders add the $15 flat rate and Stripe collects the US address; pickup
   orders are picked up at the farm in Buckfield.
2. After paying, the customer returns to `/order/success`, which confirms the payment with Stripe and clears the cart.
3. Stripe calls `/api/stripe/webhook` (`checkout.session.completed` and `checkout.session.async_payment_succeeded`);
   the site then emails the full order to the farm.

Environment variables (see `.env.example`):

- `STRIPE_SECRET_KEY`: Stripe secret key (`sk_test_...` for testing, `sk_live_...` when live)
- `STRIPE_WEBHOOK_SECRET`: signing secret of the webhook endpoint (`whsec_...`)
- `SITE_URL` (optional): public site URL used for Stripe's return links

Without `STRIPE_SECRET_KEY` the cart falls back to emailing an order request instead of taking payment. The cart
page reads this at build time, so redeploy after adding or changing the key.

Webhook setup: in the Stripe Dashboard, add an endpoint for `https://<site>/api/stripe/webhook` with the two
events above, then copy its signing secret into `STRIPE_WEBHOOK_SECRET`.

### Email

Order, meat-share and contact emails are sent through [Resend](https://resend.com) when these are set:

- `RESEND_API_KEY`: Resend API key
- `ORDER_EMAIL_TO`: where messages go (comma-separated for several addresses)
- `ORDER_EMAIL_FROM`: verified sender, e.g. `Brickhouse Farm <orders@brickhousefarmmaine.com>`

Without them, messages are printed to the server log. Stripe also keeps every paid order in its Dashboard.

## Content

Text and photos come from brickhousefarmmaine.com: Amie's "Who We Are", mission and Mangalitsa text, the
holiday board details (serving sizes, artisan partners, packaging notes, pickup locations), the weddings page
and the contact details. Wording has only been lightly edited for clarity (typos, punctuation).

Charcuterie descriptions are from the farm's online store; weights are as confirmed by the farm. Cheese and
pantry descriptions were supplied by the farm.

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

### Still to come from the farm

- **Photos still needed** (slots marked `todo` in `src/lib/images.ts`): BellaVitano (Sartori's images are on
  a.storyblok.com, which needs allowing), white cheddar cheese curds (Clock Shadow), honey, sourdough crackers.

### Old site links

`next.config.ts` redirects addresses from the old GoDaddy site (store products and categories, `/products`,
weddings, account pages, terms and privacy) to the matching new pages, so search results and shared links keep
working.

Products with `price: null` in `src/lib/catalog.ts` are listed as "Coming soon" and can't be added to the cart.

## Pricing rules (Build Your Own Board)

- Base $50: any 2 meats (coppa, salami, lonza, culatello) and 1 cheese (any of the 4)
- More meats +$20 each, more cheeses +$12 each
- Sourdough crackers +$10, local honey +$12, Living Nutz almonds +$10
- Shipping: flat $15 per order, or free pickup at the farm in Buckfield
