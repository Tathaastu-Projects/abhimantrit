import Link from "next/link";
import Script from "next/script";
import { preload } from "react-dom";

/**
 * Hero slides come from the admin panel. Image and text move together.
 * Auto-advances every 3 seconds. The motion is plain HTML/CSS plus
 * /hero-slider.js so it still runs after a production deploy.
 */
export type HeroSlide = {
  src: string;
  alt: string;
  title: [string, string];
  subtitle: string;
  cta: string;
  href: string;
};

/**
 * Full-bleed hero. Height is locked at 500px. Width follows the screen.
 * The picture is stretched so the whole image stays visible, edge to edge.
 */
export function HomeHero({ slides }: { slides?: HeroSlide[] }) {
  if (!slides?.length) return null;
  const source = slides;
  const track = [source[source.length - 1], ...source, source[0]];
  const pages = track.length;
  if (source[0]?.src) {
    preload(source[0].src, { as: "image", fetchPriority: "high" });
  }

  return (
    <section
      id="home-hero"
      data-count={source.length}
      className="relative h-[500px] w-full overflow-hidden bg-[#efe6d8]"
      aria-roledescription="carousel"
      aria-label="Home banners"
      suppressHydrationWarning
    >

      <div
        data-hero-track
        className="flex h-[500px]"
        style={{ width: `${pages * 100}%`, transform: `translate3d(-${100 / pages}%, 0, 0)` }}
        suppressHydrationWarning
      >
        {track.map((slide, i) => {
          const isClone = i === 0 || i === track.length - 1;
          return (
            <div
              key={`${slide.src}-${i}`}
              className="relative h-[500px] shrink-0"
              style={{ width: `${100 / pages}%` }}
              aria-hidden={isClone ? true : undefined}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.src}
                alt={isClone ? "" : slide.alt}
                width={1920}
                height={785}
                draggable={false}
                decoding="async"
                fetchPriority={i === 1 ? "high" : "low"}
                loading={i === 1 ? "eager" : "lazy"}
                className="absolute inset-0 h-full w-full object-fill"
              />

              <div
                className="pointer-events-none absolute inset-y-0 left-0 w-[62%] sm:w-[56%] md:w-[52%]"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(243,235,224,0.92) 0%, rgba(243,235,224,0.72) 48%, rgba(243,235,224,0.18) 78%, rgba(243,235,224,0) 100%)",
                }}
                aria-hidden
              />

              <div className="pointer-events-none absolute inset-0 flex items-center">
                <div className="w-full px-14 sm:px-16 md:px-20 lg:px-24">
                  <div className="home-hero__copy pointer-events-auto">
                    {i === 1 ? (
                      <h1 className="home-hero__title">
                        <span className="home-hero__title-line">{slide.title[0]}</span>
                        <span className="home-hero__title-line home-hero__title-line--strong">
                          {slide.title[1]}
                        </span>
                      </h1>
                    ) : (
                      <p className="home-hero__title">
                        <span className="home-hero__title-line">{slide.title[0]}</span>
                        <span className="home-hero__title-line home-hero__title-line--strong">
                          {slide.title[1]}
                        </span>
                      </p>
                    )}
                    <p className="home-hero__sub">{slide.subtitle}</p>
                    <Link
                      href={slide.href}
                      className="home-hero__cta"
                      data-hero-pause
                      tabIndex={isClone ? -1 : undefined}
                    >
                      {slide.cta}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        data-hero-dir="-1"
        className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-forest shadow-md transition hover:bg-white md:left-5"
        aria-label="Previous banner"
      >
        <ArrowIcon direction="left" />
      </button>
      <button
        type="button"
        data-hero-dir="1"
        className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-forest shadow-md transition hover:bg-white md:right-5"
        aria-label="Next banner"
      >
        <ArrowIcon direction="right" />
      </button>

      <Script src="/hero-slider.js?v=4" strategy="afterInteractive" />
    </section>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d={direction === "left" ? "M14.5 6.5 8.5 12l6 5.5" : "M9.5 6.5 15.5 12l-6 5.5"}
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
