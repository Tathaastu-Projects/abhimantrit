"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Home / category banner carousel.
 * Each slide is 100% of the viewport strip; track moves by -index * 100%.
 * Autoplay + arrows are plain React state (no external script).
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

export function HomeHero({ slides }: { slides?: HeroSlide[] }) {
  if (!slides?.length) return null;
  return <HomeHeroCarousel slides={slides} />;
}

function HomeHeroCarousel({ slides }: { slides: HeroSlide[] }) {
  // [cloneLast, ...real, cloneFirst] for infinite loop
  const trackSlides = [slides[slides.length - 1], ...slides, slides[0]];
  const realCount = slides.length;

  // index 1 = first real slide
  const [index, setIndex] = useState(1);
  const [animating, setAnimating] = useState(false);
  const indexRef = useRef(1);
  const animatingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current != null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const jumpWithoutAnim = useCallback((next: number) => {
    animatingRef.current = false;
    setAnimating(false);
    indexRef.current = next;
    setIndex(next);
  }, []);

  const goTo = useCallback(
    (next: number, withAnim: boolean) => {
      if (withAnim) {
        animatingRef.current = true;
        setAnimating(true);
      } else {
        animatingRef.current = false;
        setAnimating(false);
      }
      indexRef.current = next;
      setIndex(next);
    },
    [],
  );

  const step = useCallback(
    (direction: 1 | -1) => {
      if (realCount < 1) return;
      const cur = indexRef.current;
      let next = cur + direction;
      if (next < 0) next = 0;
      if (next > realCount + 1) next = realCount + 1;
      goTo(next, true);

      // After reaching a clone, snap to the matching real slide
      window.setTimeout(() => {
        if (indexRef.current === 0) jumpWithoutAnim(realCount);
        else if (indexRef.current === realCount + 1) jumpWithoutAnim(1);
      }, MOVE_MS);
    },
    [goTo, jumpWithoutAnim, realCount],
  );

  const startAuto = useCallback(() => {
    clearTimer();
    if (realCount < 2) return;
    timerRef.current = setInterval(() => {
      step(1);
    }, AUTO_MS);
  }, [clearTimer, realCount, step]);

  useEffect(() => {
    startAuto();
    const onVisibility = () => {
      if (document.hidden) clearTimer();
      else startAuto();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      clearTimer();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [clearTimer, startAuto]);

  const onPrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    step(-1);
    startAuto();
  };

  const onNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    step(1);
    startAuto();
  };

  return (
    <section
      id="home-hero"
      data-count={realCount}
      className="relative h-[500px] w-full overflow-hidden bg-[#efe6d8]"
      aria-roledescription="carousel"
      aria-label="Home banners"
    >
      <div
        data-hero-track
        className="flex h-full w-full"
        style={{
          transform: `translate3d(-${index * 100}%, 0, 0)`,
          transition: animating ? `transform ${MOVE_MS}ms ease-in-out` : "none",
          willChange: "transform",
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
              className="relative block h-[500px] w-full min-w-full max-w-full shrink-0 grow-0 basis-full group focus:outline-none cursor-pointer"
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

      {realCount > 1 ? (
        <>
          {/* z-[60] keeps arrows above sticky header (z-50) so clicks work */}
          <button
            type="button"
            onClick={onPrev}
            className="absolute left-3 top-1/2 z-[60] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-forest bg-forest text-white shadow-[0_8px_20px_rgba(15,61,46,0.28)] transition hover:bg-forest-deep md:left-5"
            aria-label="Previous banner"
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            type="button"
            onClick={onNext}
            className="absolute right-3 top-1/2 z-[60] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-forest bg-forest text-white shadow-[0_8px_20px_rgba(15,61,46,0.28)] transition hover:bg-forest-deep md:right-5"
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
