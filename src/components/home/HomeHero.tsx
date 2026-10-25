"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { preload } from "react-dom";

/**
 * Hero slides from the admin panel. Auto-advances every 3s.
 * Client-side timer (not an external script) so production deploy
 * and soft navigation keep autoplay working.
 */
export type HeroSlide = {
  src: string;
  alt: string;
  title: [string, string];
  subtitle: string;
  cta: string;
  href: string;
};

const AUTO_MS = 3000;
const MOVE_MS = 700;

/**
 * Full-bleed hero. Height is locked at 500px. Width follows the screen.
 */
export function HomeHero({ slides }: { slides?: HeroSlide[] }) {
  if (!slides?.length) return null;
  return <HomeHeroCarousel slides={slides} />;
}

function HomeHeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const source = slides;
  const trackSlides = [source[source.length - 1], ...source, source[0]];
  const pages = trackSlides.length;
  const count = source.length;

  const indexRef = useRef(1);
  const timerRef = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const countRef = useRef(count);
  const goRef = useRef<(direction: number) => void>(() => {});
  countRef.current = count;

  const [index, setIndex] = useState(1);
  const [animate, setAnimate] = useState(false);

  if (source[0]?.src) {
    preload(source[0].src, { as: "image", fetchPriority: "high" });
  }

  useEffect(() => {
    function clearTimer() {
      if (timerRef.current != null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    function render(next: number, withAnim: boolean) {
      indexRef.current = next;
      setAnimate(withAnim);
      setIndex(next);
    }

    function arm() {
      clearTimer();
      if (pausedRef.current || countRef.current < 1) return;
      timerRef.current = window.setInterval(() => {
        goRef.current(1);
      }, AUTO_MS);
    }

    function go(direction: number) {
      const total = countRef.current;
      let next = indexRef.current + direction;
      if (next < 0) next = 0;
      if (next > total + 1) next = total + 1;
      render(next, true);

      if (next === 0) {
        window.setTimeout(() => {
          if (indexRef.current === 0) render(total, false);
        }, MOVE_MS);
      } else if (next === total + 1) {
        window.setTimeout(() => {
          if (indexRef.current === total + 1) render(1, false);
        }, MOVE_MS);
      }
      arm();
    }

    goRef.current = go;
    pausedRef.current = false;
    arm();

    const onVisibility = () => {
      if (document.hidden) {
        clearTimer();
      } else if (!pausedRef.current) {
        arm();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      clearTimer();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [count]);

  const pauseHover = () => {
    // Touch can fire enter without leave — only pause for real mouse hover
    if (typeof window !== "undefined" && window.matchMedia && !window.matchMedia("(hover: hover)").matches) {
      return;
    }
    pausedRef.current = true;
    if (timerRef.current != null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resumeHover = () => {
    if (!pausedRef.current) return;
    pausedRef.current = false;
    if (timerRef.current != null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (countRef.current < 1) return;
    timerRef.current = window.setInterval(() => {
      goRef.current(1);
    }, AUTO_MS);
  };

  return (
    <section
      id="home-hero"
      data-count={count}
      className="relative h-[500px] w-full overflow-hidden bg-[#efe6d8]"
      aria-roledescription="carousel"
      aria-label="Home banners"
      onMouseEnter={pauseHover}
      onMouseLeave={resumeHover}
    >
      <div
        data-hero-track
        className="flex h-[500px]"
        style={{
          width: `${pages * 100}%`,
          transform: `translate3d(-${(index * 100) / pages}%, 0, 0)`,
          transition: animate ? `transform ${MOVE_MS}ms ease-in-out` : "none",
        }}
      >
        {trackSlides.map((slide, i) => {
          const isClone = i === 0 || i === trackSlides.length - 1;
          const line1 = slide.title?.[0]?.trim() || "";
          const line2 = slide.title?.[1]?.trim() || "";
          const hasTitle = Boolean(line1 || line2);
          const hasSubtitle = Boolean(slide.subtitle?.trim());
          const hasCta = Boolean(slide.cta?.trim());
          const hasText = hasTitle || hasSubtitle || hasCta;
          const bannerHref = slide.href || "/shop";

          return (
            <Link
              key={`${slide.src}-${i}`}
              href={bannerHref}
              className="relative block h-[500px] shrink-0 group focus:outline-none cursor-pointer"
              style={{ width: `${100 / pages}%` }}
              aria-hidden={isClone ? true : undefined}
              tabIndex={isClone ? -1 : undefined}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.src}
                alt={isClone ? "" : slide.alt || "Banner"}
                width={1920}
                height={785}
                draggable={false}
                decoding="async"
                fetchPriority={i === 1 ? "high" : "low"}
                loading={i === 1 ? "eager" : "lazy"}
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
                    <div className="w-full px-14 sm:px-16 md:px-20 lg:px-24">
                      <div className="home-hero__copy">
                        {hasTitle ? (
                          i === 1 ? (
                            <h1 className="home-hero__title">
                              {line1 ? <span className="home-hero__title-line">{line1}</span> : null}
                              {line2 ? (
                                <span className="home-hero__title-line home-hero__title-line--strong">
                                  {line2}
                                </span>
                              ) : null}
                            </h1>
                          ) : (
                            <p className="home-hero__title">
                              {line1 ? <span className="home-hero__title-line">{line1}</span> : null}
                              {line2 ? (
                                <span className="home-hero__title-line home-hero__title-line--strong">
                                  {line2}
                                </span>
                              ) : null}
                            </p>
                          )
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
          );
        })}
      </div>

      {count > 1 ? (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              goRef.current(-1);
            }}
            className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-forest shadow-md transition hover:bg-white md:left-5"
            aria-label="Previous banner"
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              goRef.current(1);
            }}
            className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-forest shadow-md transition hover:bg-white md:right-5"
            aria-label="Next banner"
          >
            <ArrowIcon direction="right" />
          </button>
        </>
      ) : null}
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
