import { notFound } from "next/navigation";
import { getCatalog, getHomeContent, FALLBACK_CATEGORIES } from "@/lib/api";
import { searchParamsToCatalog } from "@/lib/catalog-params";
import { CatalogView } from "@/components/catalog/CatalogView";
import { CategoryBanner } from "@/components/catalog/CategoryBanner";
import { ConsultationCta } from "@/components/home/ConsultationCta";
import { titleCase } from "@/lib/format";

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ShopCategoryPage({ params, searchParams }: Props) {
  const { category } = await params;
  const sp = await searchParams;
  const allowed = new Set([...FALLBACK_CATEGORIES, "other", "stone"]);
  if (!allowed.has(category)) notFound();

  const sortFromUrl = Array.isArray(sp.sort) ? sp.sort[0] : sp.sort;
  const [catalog, home] = await Promise.all([
    getCatalog(
      searchParamsToCatalog(sp, {
        category,
        sort: sortFromUrl || "best_selling",
      }),
    ),
    getHomeContent(),
  ]);
  const title = titleCase(category === "other" ? "pooja essentials" : category);

  return (
    <>
      <CategoryBanner
        categoryKey={category}
        title={title}
        eyebrow="Puja Essentials"
        subtitle={`Certified ${title} curated for intention-led living and daily rituals.`}
        ctaHref="#catalog"
      />
      <CatalogView
        title={title}
        hideTitle
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Puja Essentials", href: "/shop" },
          { label: title },
        ]}
        products={catalog.data}
        pagination={catalog.pagination}
        facets={catalog.facets}
        sortOptions={catalog.sortOptions}
        error={catalog.success === false ? catalog.message : undefined}
      />
      <ConsultationCta
        cta={{
          title: home.consultCta?.title || "Not sure what to wear? Talk to our experts",
          subtitle: home.consultCta?.subtitle,
          ctaLabel: home.consultCta?.ctaLabel || "Request consultation",
          ctaHref: home.consultCta?.ctaHref,
        }}
      />
    </>
  );
}
