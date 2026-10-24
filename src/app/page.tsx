import { getHomeContent } from "@/lib/api";
import { HomeBanners } from "@/components/home/CmsBlocks";
import { ShopByCategory } from "@/components/home/ShopByCategory";
import { LatestProducts } from "@/components/home/LatestProducts";
import { AboutAbhimantrit } from "@/components/home/AboutAbhimantrit";
import { FeaturedFinds } from "@/components/home/FeaturedFinds";
import { ScreenToSpace } from "@/components/home/ScreenToSpace";
import { Testimonials } from "@/components/home/Testimonials";
import { ReadFromBlog } from "@/components/home/ReadFromBlog";
import { HeroTicker } from "@/components/home/HeroTicker";
import { HomeTrustBar } from "@/components/home/HomeTrustBar";
import { IntentionNav } from "@/components/home/IntentionNav";
import { RashiBracelets } from "@/components/home/RashiBracelets";
import { FaqAccordion } from "@/components/home/FaqAccordion";

/**
 * Home order (Figma top):
 * Hero → Ticker → Trust → Intention → Shop by Category →
 * About → Loved by Customers →
 * Read From Our Blog → FAQ
 *
 * One backend call — home payload already includes products for
 * intention / rashi / latest sections (fast navigation + less API load).
 */
export default async function HomePage() {
  const home = await getHomeContent();
  const intentionProducts = home.intentionProducts || {};
  const rashiProducts = home.rashiProducts || [];
  const latestProducts =
    home.latestProducts?.length
      ? home.latestProducts
      : home.carousels?.newArrivals || home.carousels?.featured || [];

  return (
    <>
      <HomeBanners banners={home.banners || []} managed={home.homeSliderManaged} />
      <HeroTicker />
      <HomeTrustBar />
      <IntentionNav products={intentionProducts} />
      <RashiBracelets products={rashiProducts} />
      <ShopByCategory tiles={home.categoryTiles} />
      <LatestProducts products={latestProducts} />
      <AboutAbhimantrit about={home.aboutSection} />
      <FeaturedFinds featured={home.featuredFinds} />
      <ScreenToSpace section={home.screenToSpace} />
      <Testimonials items={home.testimonials} />
      <ReadFromBlog posts={home.latestBlogs} />
      <FaqAccordion faqs={home.faqs} />
    </>
  );
}
