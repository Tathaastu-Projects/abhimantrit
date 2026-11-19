"use client";

import { useEffect } from "react";
import type { HomeContent, StoreMeta } from "@/types/product";
import { useHomeStore } from "@/lib/home-store";
import { resolveBannerUrl } from "@/lib/format";
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
import { HowAbhimantrit } from "@/components/home/HowAbhimantrit";
import { HomeProductSection } from "@/components/home/HomeProductSection";
import { RashiBracelets } from "@/components/home/RashiBracelets";
import { FaqAccordion } from "@/components/home/FaqAccordion";

type Props = {
  initialAbove: HomeContent;
  initialBelow: HomeContent;
  initialMeta: StoreMeta | null;
};

/**
 * Renders home from in-memory cache when returning from product/cart/etc.,
 * so we do not flash empty/skeleton or wait on a full reload.
 */
export function HomeScreen({ initialAbove, initialBelow, initialMeta }: Props) {
  const hydrate = useHomeStore((s) => s.hydrate);
  const cachedAbove = useHomeStore((s) => s.above);
  const cachedBelow = useHomeStore((s) => s.below);
  const cachedMeta = useHomeStore((s) => s.meta);

  // Prefer session cache on remount (back / logo → home); SSR props for first visit
  const above = cachedAbove ?? initialAbove;
  const below = cachedBelow ?? initialBelow;
  const meta = cachedMeta ?? initialMeta;

  useEffect(() => {
    // Keep memory cache aligned with latest server payload when Next sends one
    hydrate(initialAbove, initialBelow, initialMeta);
  }, [hydrate, initialAbove, initialBelow, initialMeta]);

  const bestsellers =
    above.carousels?.bestsellers?.length
      ? above.carousels.bestsellers
      : above.carousels?.featured || above.latestProducts || [];
  const heroPoster = resolveBannerUrl(above.homeHeroVideo?.posterUrl || "");
  const heroVideo = resolveBannerUrl(above.homeHeroVideo?.videoUrl || "");
  const intentionProducts = below.intentionProducts || {};
  const rashiProducts = below.rashiProducts || [];
  const rashiLogos = below.rashiLogos || [];

  return (
    <>
      {heroPoster ? (
        <link rel="preload" as="image" href={heroPoster} fetchPriority="high" />
      ) : null}
      {/* Warm the muted hero MP4 after poster preload is declared */}
      {heroVideo ? <link rel="preload" as="video" href={heroVideo} /> : null}
      <HomeVideoHero
        hero={above.homeHeroVideo}
        logoSrc={resolveBannerUrl(meta?.logoUrl) || ""}
        brandName="Abhimantrit"
      />
      <HomeTrustBar />
      <div id="home-after-video" className="home-after-video">
        <HomeBanners banners={above.banners || []} managed={above.homeSliderManaged} />
        <HeroTicker phrases={above.heroTicker} />
        <AboutAbhimantrit about={above.aboutSection} />
        <HomeProductSection title="Best Sellers" products={bestsellers} />
      </div>
      <div className="home-below-sections">
        <Remedies3DExplorer />
        <HowAbhimantrit section={below.howAbhimantrit} />
        <IntentionNav products={intentionProducts} />
        <RashiBracelets products={rashiProducts} logos={rashiLogos} />
        <ShopByCategory tiles={below.categoryTiles} />
        <FeaturedFinds featured={below.featuredFinds} />
        <ScreenToSpace section={below.screenToSpace} />
        <Testimonials items={below.testimonials} />
        <ReadFromBlog posts={below.latestBlogs} />
        <FaqAccordion faqs={below.faqs} allowDefaults />
      </div>
    </>
  );
}
