import { getCatalog } from "@/lib/api";
import { searchParamsToCatalog } from "@/lib/catalog-params";
import { CatalogView } from "@/components/catalog/CatalogView";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SearchPage({ searchParams }: Props) {
  const sp = await searchParams;
  const q = Array.isArray(sp.q) ? sp.q[0] : sp.q || "";
  const catalog = await getCatalog(searchParamsToCatalog(sp, { q }));

  return (
    <CatalogView
      title={q ? `Results for “${q}”` : "Search"}
      subtitle="Matching titles, SKUs, stones and descriptions from listed products."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Search" }]}
      products={catalog.data}
      pagination={catalog.pagination}
      facets={catalog.facets}
      sortOptions={catalog.sortOptions}
      error={catalog.success === false ? catalog.message : undefined}
    />
  );
}
