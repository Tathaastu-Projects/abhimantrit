import type { CatalogParams } from "@/types/product";

export function searchParamsToCatalog(
  sp: Record<string, string | string[] | undefined>,
  extras?: CatalogParams,
): CatalogParams {
  const get = (key: string) => {
    const v = sp[key];
    return Array.isArray(v) ? v[0] : v;
  };

  return {
    category: get("category"),
    intention: get("intention"),
    stone: get("stone"),
    color: get("color"),
    shape: get("shape"),
    gender: get("gender"),
    material: get("material"),
    mukhi: get("mukhi"),
    jewelryType: get("jewelryType"),
    zodiac: get("zodiac"),
    occasion: get("occasion"),
    planet: get("planet"),
    origin: get("origin"),
    tags: get("tags") || get("tag"),
    minPrice: get("minPrice"),
    maxPrice: get("maxPrice"),
    minCarat: get("minCarat"),
    maxCarat: get("maxCarat"),
    minRatti: get("minRatti"),
    maxRatti: get("maxRatti"),
    inStock: get("inStock"),
    onSale: get("onSale") || get("sale"),
    featured: get("featured"),
    bestSeller: get("bestSeller"),
    isNewArrival: get("isNewArrival") || get("isNew"),
    q: get("q"),
    sort: get("sort") || "featured",
    page: get("page") || 1,
    limit: get("limit") || 24,
    includeFacets: true,
    ...extras,
  };
}
