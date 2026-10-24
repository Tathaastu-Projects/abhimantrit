import Link from "next/link";
import type { StoreBanner } from "@/types/product";
import { resolveBannerUrl } from "@/lib/format";
import { getCategoryBannerSrc } from "@/lib/category-banners";
import { HomeHero, type HeroSlide } from "@/components/home/HomeHero";

type Props = {
  /** Main heading */
  title: string;
  subtitle?: string;
  /** Route key for dynamic banner lookup */
  categoryKey?: string;
  eyebrow?: string;
  ctaHref?: string;
  ctaLabel?: string;
  banners?: StoreBanner[];
};

function toCategorySlide(b: StoreBanner, defaultTitle = ""): HeroSlide | null {
  if (!b.imageUrl) return null;
  const line1 = b.title?.trim() || "";
  const line2 = b.titleLine2?.trim() || "";
  return {
    src: resolveBannerUrl(b.imageUrl),
    alt: line1 || line2 || `${defaultTitle || "Category"} banner`,
    title: [line1, line2],
    subtitle: b.subtitle?.trim() || "",
    cta: b.ctaLabel ? b.ctaLabel.trim() : "",
    href: b.ctaHref || (b.category ? `/shop/${b.category}` : "#catalog"),
  };
}

/**
 * Category PLP banner.
 * If custom category banners are saved in admin:
 *   - Multiple: runs in full-bleed hero carousel slider
 *   - Single: full-width, full-banner clickable, optional text & button
 * If none saved:
 *   - Falls back to default category banner image
 */
export function CategoryBanner({
  title,
  categoryKey,
  banners,
}: Props) {
  const matching = (banners || []).filter(
    (b) =>
      b.isActive !== false &&
      (b.key === "category-banner" || b.key === `category-${categoryKey}`) &&
      b.category === categoryKey
  );

  const slides = matching
    .map((b) => toCategorySlide(b, title))
    .filter((s): s is HeroSlide => Boolean(s?.src));

  if (slides.length > 1) {
    return (
      <div className="w-full">
        <HomeHero slides={slides} />
      </div>
    );
  }

  if (slides.length === 1) {
    const slide = slides[0];
    const line1 = slide.title?.[0]?.trim() || "";
    const line2 = slide.title?.[1]?.trim() || "";
    const hasTitle = Boolean(line1 || line2);
    const hasSubtitle = Boolean(slide.subtitle?.trim());
    const hasCta = Boolean(slide.cta?.trim());
    const hasText = hasTitle || hasSubtitle || hasCta;

    return (
      <section className="relative h-[320px] sm:h-[400px] md:h-[500px] w-full overflow-hidden bg-[#efe6d8]">
        <Link
          href={slide.href}
          className="relative block h-full w-full group cursor-pointer focus:outline-none"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.src}
            alt={slide.alt}
            width={1920}
            height={785}
            className="absolute inset-0 h-full w-full object-fill"
          />

          {hasText ? (
            <>
              <div
                className="pointer-events-none absolute inset-y-0 left-0 w-[62%] sm:w-[56%] md:w-[52%]"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(243,235,224,0.92) 0%, rgba(243,235,224,0.72) 48%, rgba(243,235,224,0.18) 78%, rgba(243,235,224,0) 100%)",
                }}
                aria-hidden
              />

              <div className="pointer-events-none absolute inset-0 flex items-center">
                <div className="w-full px-8 sm:px-14 md:px-20 lg:px-24">
                  <div className="home-hero__copy">
                    {hasTitle ? (
                      <h1 className="home-hero__title">
                        {line1 ? <span className="home-hero__title-line">{line1}</span> : null}
                        {line2 ? (
                          <span className="home-hero__title-line home-hero__title-line--strong">
                            {line2}
                          </span>
                        ) : null}
                      </h1>
                    ) : null}
                    {hasSubtitle ? <p className="home-hero__sub">{slide.subtitle}</p> : null}
                    {hasCta ? (
                      <span className="home-hero__cta inline-flex group-hover:brightness-105">
                        {slide.cta}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </Link>
      </section>
    );
  }

  // Fallback to default banner
  const src = getCategoryBannerSrc(categoryKey);

  return (
    <section className="w-full bg-[#f3eee6]">
      {/* Front banner image — natural aspect, full width, nothing cropped */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={title}
        width={1807}
        height={678}
        className="block w-full"
        style={{ aspectRatio: "1807 / 678", height: "auto" }}
      />
    </section>
  );
}
