import { getBanners, getCatalog } from "@/lib/api";
import { searchParamsToCatalog } from "@/lib/catalog-params";
import { CatalogView } from "@/components/catalog/CatalogView";
import { CategoryBanner } from "@/components/catalog/CategoryBanner";
import { ConsultationCta } from "@/components/home/ConsultationCta";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildPageMetadata("shop");
}

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ShopPage({ searchParams }: Props) {
  const sp = await searchParams;
  const params = searchParamsToCatalog(sp);
  const [catalog, banners] = await Promise.all([getCatalog(params), getBanners()]);

  return (
    <>
      <CategoryBanner
        categoryKey="shop"
        title="Puja Essentials"
        eyebrow="Collection"
        subtitle="Authentic items for your daily rituals, festivals and special occasions."
        ctaHref="#catalog"
        banners={banners}
      />
      <CatalogView
        title="Puja Essentials"
        hideTitle
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Puja Essentials" }]}
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
