import { notFound } from "next/navigation";
import { getBanners, getCatalog, FALLBACK_CATEGORIES } from "@/lib/api";
import { searchParamsToCatalog } from "@/lib/catalog-params";
import { CatalogView } from "@/components/catalog/CatalogView";
import { CategoryBanner } from "@/components/catalog/CategoryBanner";
import { ConsultationCta } from "@/components/home/ConsultationCta";
import { titleCase } from "@/lib/format";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  return buildPageMetadata(category);
}

export default async function ShopCategoryPage({ params, searchParams }: Props) {
  const { category } = await params;
  const sp = await searchParams;
  const allowed = new Set([...FALLBACK_CATEGORIES, "other", "stone"]);
  if (!allowed.has(category)) notFound();

  const sortFromUrl = Array.isArray(sp.sort) ? sp.sort[0] : sp.sort;
  const [catalog, banners] = await Promise.all([
    getCatalog(
      searchParamsToCatalog(sp, {
        category,
        sort: sortFromUrl || "best_selling",
      }),
    ),
    getBanners(),
  ]);
  const title = titleCase(category);

  return (
    <>
      <CategoryBanner
        categoryKey={category}
        title={title}
        eyebrow="Collection"
        subtitle={`Certified ${title} curated for intention-led living and daily rituals.`}
        ctaHref="#catalog"
        banners={banners}
      />
      <CatalogView
        title={title}
        hideTitle
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
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
          title: "Not sure what to wear? Talk to our experts",
          subtitle: "Get a free recommendation aligned to your intention.",
          ctaLabel: "Request consultation",
          ctaHref: "/contact",
        }}
      />
    </>
  );
}
