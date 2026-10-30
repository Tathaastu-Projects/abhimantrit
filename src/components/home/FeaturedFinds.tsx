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

function getEmbedUrl(url?: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  const ytMatch = trimmed.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&mute=1&loop=1&playlist=${ytMatch[1]}`;
  }
  const vimeoMatch = trimmed.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&muted=1&loop=1`;
  }
  const driveMatch = trimmed.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveMatch) {
    return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
  }
  return null;
}

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
  const videoEmbed = getEmbedUrl(video);

  return (
    <section id="featured-finds" className="w-full bg-[#f6f1ea] py-8 md:py-10">
      <div className="mx-auto w-full max-w-5xl px-5 md:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9a9590]">
          {eyebrow}
        </p>
        <h2 className="mt-2 max-w-xl font-display text-[1.7rem] font-semibold tracking-[-0.02em] text-[#1c1c1c] md:text-[2.05rem]">
          {title}
        </h2>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 md:gap-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-[#e7e1d8] sm:aspect-[5/4]">
            {videoEmbed ? (
              <iframe
                src={videoEmbed}
                className="h-full w-full object-cover"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : video ? (
              <video
                src={video}
                poster={image || undefined}
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                controls
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

        <div className="mt-5 flex justify-center">
          <Link href={ctaHref} className="btn btn-primary min-w-[180px] px-10">
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
