import Link from "next/link";
import { resolveBannerUrl } from "@/lib/format";

export type FeaturedFindsContent = {
  eyebrow?: string;
  title?: string;
  videoUrl?: string;
  imageUrl?: string;
  imageLabel?: string;
  points?: string[];
  ctaLabel?: string;
  ctaHref?: string;
};

/** Karungali mala feature — video on the left, photo on the right. */
export function FeaturedFinds({ featured }: { featured?: FeaturedFindsContent | null }) {
  const eyebrow = featured?.eyebrow || "Featured finds";
  const title = featured?.title || "Everyday Vibe, Purposeful Intention";
  const points = featured?.points?.length
    ? featured.points
    : ["Authentically Sourced", "Mindful Rituals", "Positive Energy", "Traditional Craftsmanship"];
  const ctaLabel = featured?.ctaLabel || "Shop now";
  const ctaHref = featured?.ctaHref || "/product/gm-karungali-mala";
  const video = resolveBannerUrl(featured?.videoUrl);
  const image = resolveBannerUrl(featured?.imageUrl);

  return (
    <section id="featured-finds" className="w-full bg-[#f6f1ea] py-14 md:py-16">
      <div className="mx-auto w-full max-w-5xl px-5 md:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9a9590]">
          {eyebrow}
        </p>
        <h2 className="mt-2 max-w-xl font-display text-[1.7rem] font-semibold tracking-[-0.02em] text-[#1c1c1c] md:text-[2.05rem]">
          {title}
        </h2>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 md:gap-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-[#e7e1d8] sm:aspect-[5/4]">
            {video ? (
              <video
                src={video}
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <div className="flex h-full items-center justify-center px-6 text-center text-sm text-[#8a8580]">
                Karungali mala video
              </div>
            )}
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-[#e7e1d8] sm:aspect-[5/4]">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt={featured?.imageLabel || "Karungali mala"} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center px-6 text-center text-sm text-[#8a8580]">
                Karungali mala image
              </div>
            )}
            {featured?.imageLabel ? (
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1.5 text-xs font-medium text-[#1c1c1c] backdrop-blur-sm">
                <span className="h-4 w-4 rounded-full bg-[#1c1c1c]" aria-hidden />
                {featured.imageLabel}
              </span>
            ) : null}
          </div>
        </div>

        <div className="mt-3 rounded-2xl bg-[#f3eee6] px-4 py-3 text-center text-[11px] text-[#6b6660] sm:text-xs">
          {points.join("  |  ")}
        </div>

        <div className="mt-6 flex justify-center">
          <Link
            href={ctaHref}
            className="inline-flex min-w-[180px] items-center justify-center rounded-full bg-forest px-10 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] !text-white"
            style={{ color: "#ffffff" }}
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
