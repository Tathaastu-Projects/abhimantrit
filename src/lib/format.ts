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

export function resolveImageUrl(url?: string | null): string {
  if (!url) return "/placeholder-product.svg";
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) {
    return url;
  }
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
