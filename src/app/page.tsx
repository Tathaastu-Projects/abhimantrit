import { getHomeContent } from "@/lib/api";
import { HomeBanners } from "@/components/home/CmsBlocks";
// import { SacredEssentials } from "@/components/home/SacredEssentials";
import { ShopByCategory } from "@/components/home/ShopByCategory";
import { LatestProducts } from "@/components/home/LatestProducts";
import { AboutAbhimantrit } from "@/components/home/AboutAbhimantrit";
import { FeaturedFinds } from "@/components/home/FeaturedFinds";
import { Testimonials } from "@/components/home/Testimonials";
import { ReadFromBlog } from "@/components/home/ReadFromBlog";
import { HeroTicker } from "@/components/home/HeroTicker";
import { HomeTrustBar } from "@/components/home/HomeTrustBar";
import { IntentionNav } from "@/components/home/IntentionNav";
// import { ZodiacNav } from "@/components/home/ZodiacNav";
import { RashiBracelets } from "@/components/home/RashiBracelets";
import { getCatalog } from "@/lib/api";
// import { HomeProductSection } from "@/components/home/HomeProductSection";
// import { ConsultationCta } from "@/components/home/ConsultationCta";
import { FaqAccordion } from "@/components/home/FaqAccordion";

/**
 * Home order (Figma top):
 * Hero → Ticker → Trust → Intention → Shop by Category →
 * About → Loved by Customers →
 * Read From Our Blog → (Sacred Essentials / Bestsellers / Consult / Certified hidden) → FAQ
 */
const INTENTIONS = ["Peace", "Wealth", "Health", "Protection", "Relationship", "Success", "Spirituality"];

export default async function HomePage() {
  const [home, rashi, latest, ...intentionLists] = await Promise.all([
    getHomeContent(),
    getCatalog({ q: "राशि", limit: 24 }),
    getCatalog({ sort: "newest", limit: 20 }),
    ...INTENTIONS.map((intention) => getCatalog({ intention, limit: 1 })),
  ]);
  const intentionProducts = Object.fromEntries(
    INTENTIONS.flatMap((intention, index) => {
      const product = intentionLists[index]?.data?.[0];
      return product ? [[intention, product]] : [];
    }),
  );
  // const products =
  //   home.carousels?.bestsellers?.length
  //     ? home.carousels.bestsellers
  //     : home.carousels?.featured?.length
  //       ? home.carousels.featured
  //       : home.carousels?.newArrivals || [];

  return (
    <>
      <HomeBanners banners={home.banners || []} managed={home.homeSliderManaged} />
      <HeroTicker />
      <HomeTrustBar />
      <IntentionNav products={intentionProducts} />
      {/* <ZodiacNav /> */}
      <RashiBracelets products={rashi.data || []} />
      <ShopByCategory tiles={home.categoryTiles} />
      <LatestProducts products={latest.data || []} />
      <AboutAbhimantrit about={home.aboutSection} />
      <FeaturedFinds featured={home.featuredFinds} />
      <Testimonials items={home.testimonials} />
      <ReadFromBlog posts={home.latestBlogs} />
      {/* <SacredEssentials categories={home.categories} /> */}
      {/* <HomeProductSection products={products} limit={8} /> */}
      {/* <ConsultationCta
        cta={{
          title: "Not sure what to wear? Talk to our experts",
          subtitle: home.consultCta?.subtitle || "",
          ctaLabel: "Request consultation",
          ctaHref: home.consultCta?.ctaHref,
        }}
      /> */}
      <FaqAccordion faqs={home.faqs} />
    </>
  );
}
