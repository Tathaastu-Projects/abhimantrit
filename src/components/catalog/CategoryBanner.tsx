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
 * Collection / category banner — picture + text side by side (half / half).
 * Multiple admin banners still use the home-style carousel.
 */
export function CategoryBanner({
  title,
  subtitle,
  categoryKey,
  eyebrow = "Collection",
  ctaHref = "#catalog",
  ctaLabel = "Shop now",
  banners,
}: Props) {
  const matching = (banners || []).filter(
    (b) =>
      b.isActive !== false &&
      (b.key === "category-banner" || b.key === `category-${categoryKey}`) &&
      b.category === categoryKey,
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

  const slide = slides[0];
  const imageSrc = slide?.src || getCategoryBannerSrc(categoryKey);
  const line1 = slide?.title?.[0]?.trim() || title;
  const line2 = slide?.title?.[1]?.trim() || "";
  const body = slide?.subtitle?.trim() || subtitle || "";
  const href = slide?.href || ctaHref;
  const cta = slide?.cta?.trim() || ctaLabel;

  return (
    <section className="w-full border-b border-black/[0.04] bg-[#f7f3ec]">
      <div className="mx-auto grid w-full max-w-[1500px] items-stretch md:grid-cols-2">
        <div className="relative min-h-[220px] overflow-hidden bg-[#efe6d8] sm:min-h-[280px] md:min-h-[340px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={slide?.alt || title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 md:px-12 md:py-12 lg:px-16">
          {eyebrow ? (
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-forest">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-2 font-display text-[1.75rem] leading-tight tracking-tight text-ink sm:text-[2.1rem] md:text-[2.35rem]">
            {line1}
            {line2 ? (
              <>
                <br />
                <span className="text-forest">{line2}</span>
              </>
            ) : null}
          </h1>
          {body ? (
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft md:text-[15px]">
              {body}
            </p>
          ) : null}
          {cta ? (
            <div className="mt-5">
              <Link href={href} className="btn btn-primary inline-flex px-5 py-2.5 text-xs">
                {cta}
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
