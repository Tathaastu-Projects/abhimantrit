import { getHomeContent } from "@/lib/api";
import { HomeBanners } from "@/components/home/CmsBlocks";
import { SacredEssentials } from "@/components/home/SacredEssentials";
import { ShopByCategory } from "@/components/home/ShopByCategory";
import { AboutAbhimantrit } from "@/components/home/AboutAbhimantrit";
import { ExpertGuidance } from "@/components/home/ExpertGuidance";
import { CertifiedAuthentic } from "@/components/home/CertifiedAuthentic";
import { HomeTrustBar } from "@/components/home/HomeTrustBar";
import { FounderSection } from "@/components/home/FounderSection";
import { IntentionNav } from "@/components/home/IntentionNav";
import { ZodiacNav } from "@/components/home/ZodiacNav";
import { HomeProductSection } from "@/components/home/HomeProductSection";
import { ConsultationCta } from "@/components/home/ConsultationCta";
import { FaqAccordion } from "@/components/home/FaqAccordion";

/**
 * Home order (Figma top):
 * Hero → Trust → Founder → Intention → Zodiac → Shop by Category →
 * About → Expert Guidance → Certified & Authentic → Sacred Essentials → Bestsellers → Consult → FAQ
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
      <HomeTrustBar />
      <FounderSection />
      <IntentionNav intentions={home.intentions} />
      <ZodiacNav />
      <ShopByCategory />
      <AboutAbhimantrit />
      <ExpertGuidance />
      <CertifiedAuthentic />
      <SacredEssentials categories={home.categories} />
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
