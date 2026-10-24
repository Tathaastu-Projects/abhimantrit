import { getApiBaseUrlOrEmpty } from "@/lib/env";

export function formatINR(amount: number | undefined | null): string {
  const value = Number(amount ?? 0);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}

export function discountPercent(mrp: number, salePrice: number): number {
  if (!mrp || mrp <= salePrice) return 0;
  return Math.round(((mrp - salePrice) / mrp) * 100);
}

/** Lines on the right of a product photo while the pointer is over the card. */
export function hoverLines(product: {
  hoverDetails?: { label?: string }[];
  intentions?: string[];
  attributes?: { material?: string; stone?: string; origin?: string; zodiac?: string };
}): string[] {
  const saved = (product.hoverDetails || []).map((item) => item.label?.trim() || "").filter(Boolean);
  if (saved.length) return saved.slice(0, 6);
  const attrs = product.attributes || {};
  return [
    attrs.material ? `Material: ${attrs.material}` : "",
    attrs.stone || "",
    attrs.origin ? `Origin: ${attrs.origin}` : "",
    attrs.zodiac ? `Zodiac: ${attrs.zodiac}` : "",
    product.intentions?.[0] || "",
  ]
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 4);
}

/**
 * Backend media under `/uploads/...` is proxied by Next (`next.config` rewrites),
 * so we keep those paths same-origin. Absolute API upload URLs are normalized too.
 */
function toStorefrontUploadPath(url: string): string | null {
  if (url.startsWith("/uploads/")) return url;
  try {
    const parsed = new URL(url);
    if (parsed.pathname.startsWith("/uploads/")) return parsed.pathname;
  } catch {
    /* ignore */
  }
  const base = getApiBaseUrlOrEmpty();
  if (base && url.startsWith(base)) {
    const path = url.slice(base.length);
    if (path.startsWith("/uploads/")) return path;
  }
  return null;
}

/** Homepage slides / CMS media — prefer same-origin `/uploads` via Next proxy. */
export function resolveBannerUrl(url?: string | null): string {
  if (!url) return "";
  if (url.startsWith("data:")) return url;
  const uploadPath = toStorefrontUploadPath(url);
  if (uploadPath) return uploadPath;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return url.startsWith("/") ? url : `/${url}`;
}

export function resolveImageUrl(url?: string | null): string {
  if (!url) return "/placeholder-product.svg";
  if (url.startsWith("data:")) return url;
  const uploadPath = toStorefrontUploadPath(url);
  if (uploadPath) return uploadPath;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const base = getApiBaseUrlOrEmpty();
  if (!base) return url.startsWith("/") ? url : `/${url}`;
  return `${base}${url.startsWith("/") ? url : `/${url}`}`;
}

export function primaryImage(images?: { url: string; alt?: string; isPrimary?: boolean }[]) {
  if (!images?.length) {
    return { url: "/placeholder-product.svg", alt: "Product" };
  }
  const primary = images.find((img) => img.isPrimary) || images[0];
  return { url: resolveImageUrl(primary.url), alt: primary.alt || "Product" };
}

export function titleCase(value: string): string {
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
