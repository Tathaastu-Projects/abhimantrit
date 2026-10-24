import { getBanners, getCollection } from "@/lib/api";
import { searchParamsToCatalog } from "@/lib/catalog-params";
import { CatalogView } from "@/components/catalog/CatalogView";
import { CategoryBanner } from "@/components/catalog/CategoryBanner";
import { ConsultationCta } from "@/components/home/ConsultationCta";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CollectionPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;
  const [result, banners] = await Promise.all([
    getCollection(slug, {
      ...searchParamsToCatalog(sp),
      withProducts: true,
      includeFacets: true,
    }),
    getBanners(),
  ]);

  if (!result.collection) notFound();

  const c = result.collection;

  return (
    <>
      <CategoryBanner
        categoryKey={slug}
        title={c.title}
        eyebrow="Puja Essentials"
        subtitle={c.subtitle || c.description || "Authentic items for your daily rituals."}
        ctaHref="#catalog"
        banners={banners}
      />
      <CatalogView
        title={c.title}
        hideTitle
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Puja Essentials", href: "/shop" },
          { label: c.title },
        ]}
        products={result.products}
        pagination={result.pagination}
        facets={result.facets}
        faqs={c.faqs}
        comparisonTable={c.comparisonTable}
        error={
          result.success === false
            ? "message" in result
              ? String(result.message)
              : "Failed"
            : undefined
        }
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
