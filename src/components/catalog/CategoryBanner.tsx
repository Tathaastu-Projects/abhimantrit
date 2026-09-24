import { getCategoryBannerSrc } from "@/lib/category-banners";

type Props = {
  /** Main heading — used for alt text while overlay is commented out */
  title: string;
  subtitle?: string;
  /** Route key for dynamic banner lookup — all map to pooja banner for now */
  categoryKey?: string;
  eyebrow?: string;
  ctaHref?: string;
  ctaLabel?: string;
};

/**
 * Category PLP banner — full-width front image (complete, no crop).
 * Overlay copy/CTAs temporarily commented out (same approach as home banner).
 */
export function CategoryBanner({
  title,
  categoryKey,
}: Props) {
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

      {/* Overlay copy/CTAs temporarily hidden — banner asset is the main visual
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
      <div className="absolute inset-0 flex items-center">
        <div className="container-pad pointer-events-auto max-w-xl text-white">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/80 md:text-sm">
            {eyebrow || "Puja Essentials"}
          </p>
          <h1 className="mt-2 font-display text-4xl leading-tight md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/85 md:text-base">
              {subtitle}
            </p>
          ) : null}
          <Link href={ctaHref || "#catalog"} className="btn btn-primary mt-6 inline-flex">
            {ctaLabel || "Shop now"}
          </Link>
          <div className="mt-8 hidden flex-wrap gap-5 sm:flex">
            {["Authentic", "Certified", "Eco-friendly", "Made in India"].map((label) => (
              <div key={label} className="flex items-center gap-2 text-xs text-white/90 md:text-sm">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-[10px]">
                  ✓
                </span>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
      */}
    </section>
  );
}
