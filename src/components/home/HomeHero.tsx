"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * Hero slides. Add another object here and it joins the loop.
 * Image and text move together. Auto-advances every 3 seconds.
 */
const SLIDES = [
  {
    src: "/banners/home_banner_1.svg",
    alt: "Sacred Rudraksha, Shiva Lingam and ritual offerings",
    title: ["Keep the Blessings of Shiva Close", "With Every Rudraksha."],
    subtitle: "Original • Authentic • Energised Through Vedic Rituals",
    cta: "Explore Rudraksha",
    href: "/shop/rudraksha",
  },
];

const SLIDE_MS = 3000;
const MOVE_MS = 700;

/**
 * Full-bleed hero. Height is locked at 500px. Width follows the screen.
 * The picture is stretched to that frame so the whole image stays visible,
 * edge to edge, with nothing cut off the top or bottom.
 * Headline stays exactly 2 lines on desktop.
 */
export function HomeHero() {
  const count = SLIDES.length;
  const track = [SLIDES[count - 1], ...SLIDES, SLIDES[0]];
  const sectionRef = useRef<HTMLElement>(null);
  const indexRef = useRef(1);
  const [index, setIndex] = useState(1);
  const [animate, setAnimate] = useState(true);
  const [width, setWidth] = useState(0);

  const commit = (next: number, withMotion: boolean) => {
    indexRef.current = next;
    setAnimate(withMotion);
    setIndex(next);
  };

  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const apply = () => setWidth(el.clientWidth);
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      const current = indexRef.current;
      const base = current === 0 ? count : current === count + 1 ? 1 : current;
      commit(base + 1, true);
    }, SLIDE_MS);

    return () => window.clearInterval(timer);
  }, [count]);

  useEffect(() => {
    if (index !== 0 && index !== count + 1) return;
    const timer = window.setTimeout(() => {
      commit(index === 0 ? count : 1, false);
    }, MOVE_MS);
    return () => window.clearTimeout(timer);
  }, [index, count]);

  const go = (direction: -1 | 1) => {
    const current = indexRef.current;
    const base = current === 0 ? count : current === count + 1 ? 1 : current;
    commit(base + direction, true);
  };

  const offset = width > 0 ? `translate3d(-${index * width}px, 0, 0)` : `translateX(-${index * 100}%)`;

  return (
    <section
      ref={sectionRef}
      className="relative h-[500px] w-full overflow-hidden bg-[#efe6d8]"
      aria-roledescription="carousel"
      aria-label="Home banners"
    >
      <div
        className="flex h-[500px]"
        style={{
          transform: offset,
          transition: animate ? `transform ${MOVE_MS}ms ease-in-out` : "none",
          width: width > 0 ? width * track.length : undefined,
        }}
      >
        {track.map((slide, i) => {
          const isClone = i === 0 || i === count + 1;
          return (
            <div
              key={`${slide.src}-${i}`}
              className="relative h-[500px] w-full min-w-full shrink-0"
              style={width > 0 ? { width, minWidth: width, flex: `0 0 ${width}px` } : undefined}
              aria-hidden={isClone ? true : undefined}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.src}
                alt={isClone ? "" : slide.alt}
                width={1920}
                height={785}
                draggable={false}
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
                    <Link href={slide.href} className="home-hero__cta" tabIndex={isClone ? -1 : undefined}>
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
        className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-forest shadow-md transition hover:bg-white md:left-5"
        aria-label="Previous banner"
        onClick={() => go(-1)}
      >
        <ArrowIcon direction="left" />
      </button>
      <button
        type="button"
        className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-forest shadow-md transition hover:bg-white md:right-5"
        aria-label="Next banner"
        onClick={() => go(1)}
      >
        <ArrowIcon direction="right" />
      </button>
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
