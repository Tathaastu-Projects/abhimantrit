import { getHomeContent, getStoreMeta } from "@/lib/api";
import { HomeBanners } from "@/components/home/CmsBlocks";
import { HomeVideoHero } from "@/components/home/HomeVideoHero";
import { ShopByCategory } from "@/components/home/ShopByCategory";
import { AboutAbhimantrit } from "@/components/home/AboutAbhimantrit";
import { FeaturedFinds } from "@/components/home/FeaturedFinds";
import { ScreenToSpace } from "@/components/home/ScreenToSpace";
import { Testimonials } from "@/components/home/Testimonials";
import { ReadFromBlog } from "@/components/home/ReadFromBlog";
import { HeroTicker } from "@/components/home/HeroTicker";
import { HomeTrustBar } from "@/components/home/HomeTrustBar";
import { IntentionNav } from "@/components/home/IntentionNav";
import { Remedies3DExplorer } from "@/components/home/Remedies3DExplorer";
import { HomeProductSection } from "@/components/home/HomeProductSection";
import { RashiBracelets } from "@/components/home/RashiBracelets";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { resolveBannerUrl } from "@/lib/format";

/**
 * Home order:
 * Video hero → Trust cards → Image banners → Ticker → About → Bestsellers →
 * 3D remedies → Intention → Rashi → Shop Collection → Featured →
 * Testimonials → Blog → FAQ
 *
 * One main backend call — home payload already includes products for
 * intention / rashi sections (fast navigation + less API load).
 */
export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Use short Next revalidate cache (backend also caches home JSON ~60s)
  const [home, meta] = await Promise.all([getHomeContent(), getStoreMeta()]);
  const intentionProducts = home.intentionProducts || {};
  const rashiProducts = home.rashiProducts || [];
  const rashiLogos = home.rashiLogos || [];
  const bestsellers =
    home.carousels?.bestsellers?.length
      ? home.carousels.bestsellers
      : home.carousels?.featured || home.latestProducts || [];

  return (
    <>
      <HomeVideoHero
        hero={home.homeHeroVideo}
        logoSrc={resolveBannerUrl(meta?.logoUrl) || ""}
        brandName="Abhimantrit"
      />
      <HomeTrustBar />
      <div id="home-after-video" className="home-after-video">
        <HomeBanners banners={home.banners || []} managed={home.homeSliderManaged} />
        <HeroTicker phrases={home.heroTicker} />
        <AboutAbhimantrit about={home.aboutSection} />
        <HomeProductSection title="Best Sellers" products={bestsellers} />
        <Remedies3DExplorer />
        <IntentionNav products={intentionProducts} />
        <RashiBracelets products={rashiProducts} logos={rashiLogos} />
        <ShopByCategory tiles={home.categoryTiles} />
        <FeaturedFinds featured={home.featuredFinds} />
        <ScreenToSpace section={home.screenToSpace} />
        <Testimonials items={home.testimonials} />
        <ReadFromBlog posts={home.latestBlogs} />
        <FaqAccordion faqs={home.faqs} />
      </div>
    </>
  );
}
