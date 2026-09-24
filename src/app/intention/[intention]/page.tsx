import { notFound } from "next/navigation";
import { getCatalog, FALLBACK_INTENTIONS } from "@/lib/api";
import { searchParamsToCatalog } from "@/lib/catalog-params";
import { CatalogView } from "@/components/catalog/CatalogView";

type Props = {
  params: Promise<{ intention: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const INTENTION_ALIASES: Record<string, string> = {
  Love: "Relationship",
  love: "Relationship",
};

export default async function IntentionPage({ params, searchParams }: Props) {
  const { intention: raw } = await params;
  const decoded = decodeURIComponent(raw);
  const intention = INTENTION_ALIASES[decoded] || decoded;
  if (!(FALLBACK_INTENTIONS as readonly string[]).includes(intention)) notFound();

  const sp = await searchParams;
  const catalog = await getCatalog(searchParamsToCatalog(sp, { intention }));

  return (
    <CatalogView
      title={`${intention} collection`}
      subtitle={`Pieces aligned with ${intention.toLowerCase()} — filtered live from our listed catalog.`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Intentions" },
        { label: intention },
      ]}
      products={catalog.data}
      pagination={catalog.pagination}
      facets={catalog.facets}
      sortOptions={catalog.sortOptions}
      error={catalog.success === false ? catalog.message : undefined}
    />
  );
}
