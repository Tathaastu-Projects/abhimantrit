/**
 * Category / collection PLP banners.
 * One shared asset for now — swap per key later without touching page layouts.
 */
export const DEFAULT_CATEGORY_BANNER = "/pooja_essential_banner.svg";

/** Map route category / collection slug → public banner path */
export const CATEGORY_BANNERS: Record<string, string> = {
  default: DEFAULT_CATEGORY_BANNER,
  shop: DEFAULT_CATEGORY_BANNER,
  "crystal-bracelets": DEFAULT_CATEGORY_BANNER,
  rudraksha: DEFAULT_CATEGORY_BANNER,
  "crystal-anklets": DEFAULT_CATEGORY_BANNER,
  tumbles: DEFAULT_CATEGORY_BANNER,
  "crystal-trees": DEFAULT_CATEGORY_BANNER,
  pyramids: DEFAULT_CATEGORY_BANNER,
  "loose-stones": DEFAULT_CATEGORY_BANNER,
  mala: DEFAULT_CATEGORY_BANNER,
  "photo-frames": DEFAULT_CATEGORY_BANNER,
  other: DEFAULT_CATEGORY_BANNER,
  bestsellers: DEFAULT_CATEGORY_BANNER,
  "new-arrivals": DEFAULT_CATEGORY_BANNER,
  featured: DEFAULT_CATEGORY_BANNER,
};

export function getCategoryBannerSrc(key?: string | null): string {
  if (!key) return DEFAULT_CATEGORY_BANNER;
  const normalized = key.trim().toLowerCase();
  return CATEGORY_BANNERS[normalized] || DEFAULT_CATEGORY_BANNER;
}
