/** Canonical shop category slugs used by /shop/[category]. */
export const SHOP_CATEGORIES = [
  "crystal-bracelets",
  "rudraksha",
  "crystal-anklets",
  "tumbles",
  "crystal-trees",
  "pyramids",
  "loose-stones",
  "mala",
  "photo-frames",
  "other",
] as const;

export type ShopCategory = (typeof SHOP_CATEGORIES)[number];

/** Map legacy tile ids / old paths → current /shop/{slug} routes. */
const LEGACY_HREF: Record<string, string> = {
  bracelets: "/shop/crystal-bracelets",
  bracelet: "/shop/crystal-bracelets",
  "crystal-bracelets": "/shop/crystal-bracelets",
  anklets: "/shop/crystal-anklets",
  anklet: "/shop/crystal-anklets",
  "crystal-anklets": "/shop/crystal-anklets",
  trees: "/shop/crystal-trees",
  tree: "/shop/crystal-trees",
  "crystal-trees": "/shop/crystal-trees",
  stones: "/shop/loose-stones",
  gemstone: "/shop/loose-stones",
  gemstones: "/shop/loose-stones",
  "loose-stones": "/shop/loose-stones",
  frame: "/shop/photo-frames",
  frames: "/shop/photo-frames",
  "photo-frame": "/shop/photo-frames",
  "photo-frames": "/shop/photo-frames",
  crystal: "/shop/tumbles",
  tumbles: "/shop/tumbles",
  tumble: "/shop/tumbles",
  rudraksha: "/shop/rudraksha",
  pyramids: "/shop/pyramids",
  pyramid: "/shop/pyramids",
  mala: "/shop/mala",
  other: "/shop/other",
};

export function shopCategoryHref(input?: string | null, tileId?: string | null): string {
  const raw = String(input || "").trim();
  const id = String(tileId || "").trim().toLowerCase();

  if (id && LEGACY_HREF[id]) return LEGACY_HREF[id];

  if (!raw) return "/shop";

  // Already a valid category path
  const pathOnly = raw.split("?")[0].replace(/\/+$/, "");
  const match = pathOnly.match(/^\/shop\/([a-z0-9-]+)$/i);
  if (match) {
    const slug = match[1].toLowerCase();
    if (LEGACY_HREF[slug]) return LEGACY_HREF[slug];
    if ((SHOP_CATEGORIES as readonly string[]).includes(slug)) return `/shop/${slug}`;
  }

  // Old search-style links: /shop?q=anklet
  try {
    const url = new URL(raw, "https://abhimantrit.local");
    if (url.pathname === "/shop" || url.pathname === "/shop/") {
      const q = (url.searchParams.get("q") || "").toLowerCase();
      if (q.includes("anklet")) return "/shop/crystal-anklets";
      if (q.includes("bracelet")) return "/shop/crystal-bracelets";
      if (q.includes("tumble")) return "/shop/tumbles";
      if (q.includes("pyramid")) return "/shop/pyramids";
      if (q.includes("tree")) return "/shop/crystal-trees";
      if (q.includes("frame")) return "/shop/photo-frames";
      if (q.includes("stone") || q.includes("gem")) return "/shop/loose-stones";
      if (q.includes("rudraksha") || q.includes("mukhi")) return "/shop/rudraksha";
      if (q.includes("mala")) return "/shop/mala";
    }
  } catch {
    /* ignore */
  }

  if (LEGACY_HREF[raw.toLowerCase()]) return LEGACY_HREF[raw.toLowerCase()];
  return raw.startsWith("/") ? raw : `/shop/${raw}`;
}
