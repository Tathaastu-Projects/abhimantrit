import { getHomeContent } from "@/lib/api";
import { HomeBanners } from "@/components/home/CmsBlocks";
import { ShopByCategory } from "@/components/home/ShopByCategory";
import { AboutAbhimantrit } from "@/components/home/AboutAbhimantrit";
import { FeaturedFinds } from "@/components/home/FeaturedFinds";
import { ScreenToSpace } from "@/components/home/ScreenToSpace";
import { Testimonials } from "@/components/home/Testimonials";
import { ReadFromBlog } from "@/components/home/ReadFromBlog";
import { HeroTicker } from "@/components/home/HeroTicker";
import { HomeTrustBar } from "@/components/home/HomeTrustBar";
import { IntentionNav } from "@/components/home/IntentionNav";
import { HomeProductSection } from "@/components/home/HomeProductSection";
import { RashiBracelets } from "@/components/home/RashiBracelets";
import { FaqAccordion } from "@/components/home/FaqAccordion";

/**
 * Home order:
 * Hero → Ticker → Trust → About → Bestsellers → Intention →
 * Rashi → Shop Collection → Featured → Unlock Destiny →
 * Testimonials → Blog → FAQ
 *
 * One backend call — home payload already includes products for
 * intention / rashi sections (fast navigation + less API load).
 */
export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Use short Next revalidate cache (backend also caches home JSON ~60s)
  const home = await getHomeContent();
  const intentionProducts = home.intentionProducts || {};
  const rashiProducts = home.rashiProducts || [];
  const bestsellers =
    home.carousels?.bestsellers?.length
      ? home.carousels.bestsellers
      : home.carousels?.featured || home.latestProducts || [];

  return (
    <>
      <HomeBanners banners={home.banners || []} managed={home.homeSliderManaged} />
      <HeroTicker phrases={home.heroTicker} />
      <HomeTrustBar />
      <AboutAbhimantrit about={home.aboutSection} />
      <HomeProductSection title="Best Sellers" products={bestsellers} />
      <IntentionNav products={intentionProducts} />
      <RashiBracelets products={rashiProducts} />
      <ShopByCategory tiles={home.categoryTiles} />
      <FeaturedFinds featured={home.featuredFinds} />
      <ScreenToSpace section={home.screenToSpace} />
      <Testimonials items={home.testimonials} />
      <ReadFromBlog posts={home.latestBlogs} />
      <FaqAccordion faqs={home.faqs} />
    </>
  );
}
