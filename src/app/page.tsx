import { getHomeContent } from "@/lib/api";
import { HomeBanners } from "@/components/home/CmsBlocks";
import { SacredEssentials } from "@/components/home/SacredEssentials";
import { HomeTrustBar } from "@/components/home/HomeTrustBar";
import { IntentionNav } from "@/components/home/IntentionNav";
import { ZodiacNav } from "@/components/home/ZodiacNav";
import { HomeProductSection } from "@/components/home/HomeProductSection";
import { ConsultationCta } from "@/components/home/ConsultationCta";
import { FaqAccordion } from "@/components/home/FaqAccordion";

/**
 * Home order:
 * Hero → Intention → Zodiac → Sacred Essentials → Trust →
 * Bestsellers → Consult → FAQ
 */
export default async function HomePage() {
  const home = await getHomeContent();
  const products =
    home.carousels?.bestsellers?.length
      ? home.carousels.bestsellers
      : home.carousels?.featured?.length
        ? home.carousels.featured
        : home.carousels?.newArrivals || [];

  return (
    <>
      <HomeBanners banners={home.banners || []} />
      <IntentionNav intentions={home.intentions} />
      <ZodiacNav />
      <SacredEssentials categories={home.categories} />
      <HomeTrustBar />
      <HomeProductSection products={products} limit={8} />
      <ConsultationCta
        cta={{
          title: "Not sure what to wear? Talk to our experts",
          subtitle: home.consultCta?.subtitle || "",
          ctaLabel: "Request consultation",
          ctaHref: home.consultCta?.ctaHref,
        }}
      />
      <div id="faq">
        <FaqAccordion faqs={home.faqs} />
      </div>
    </>
  );
}
