import type { NextConfig } from "next";

// Old GoDaddy store product slugs → new product pages. Products that are no
// longer sold (1 lb packs, leaf lard) go to the closest match or the shop.
const oldProducts: Record<string, string> = {
  "coppa-4-oz": "/shop/coppa",
  "salami-6-oz": "/shop/salami",
  "lonza-4-oz": "/shop/lonza",
  "culatello-boneless-prosciutto-3-oz": "/shop/culatello",
  "guanciale-6-oz": "/shop/guanciale",
  "pancetta-6-oz": "/shop/pancetta",
  "1-lb-guanciale": "/shop/guanciale",
  "1-lb-pancetta": "/shop/pancetta",
  "leaf-lard-8-oz": "/shop",
};

const nextConfig: NextConfig = {
  // Keep links to the old GoDaddy site (search results, Facebook, bookmarks) working.
  async redirects() {
    return [
      ...Object.entries(oldProducts).map(([slug, destination]) => ({
        source: `/products/ols/products/${slug}`,
        destination,
        permanent: true,
      })),
      { source: "/products/ols/categories/:category*", destination: "/build-your-board", permanent: true },
      { source: "/products/ols/:path*", destination: "/shop", permanent: true },
      {
        source: "/products",
        has: [{ type: "query", key: "olsPage", value: "cart" }],
        destination: "/cart",
        permanent: true,
      },
      { source: "/products/:path*", destination: "/shop", permanent: true },
      { source: "/weddings%2F-occasions", destination: "/build-your-board", permanent: true },
      { source: "/weddings/:path*", destination: "/build-your-board", permanent: true },
      { source: "/m/:path*", destination: "/shop", permanent: true },
      // No policy pages yet: temporary, so they can be added later.
      { source: "/terms-and-conditions", destination: "/contact", permanent: false },
      { source: "/privacy-policy", destination: "/contact", permanent: false },
    ];
  },
};

export default nextConfig;
