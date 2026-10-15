"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
 * Full-bleed hero. Height stays 500px. Width follows the screen.
 * Headline stays exactly 2 lines on desktop.
 */
export function HomeHero() {
  const count = SLIDES.length;
  const track = [SLIDES[count - 1], ...SLIDES, SLIDES[0]];
  const [index, setIndex] = useState(1);
  const [animate, setAnimate] = useState(true);
  const [autoplayKey, setAutoplayKey] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setAnimate(true);
      setIndex((current) => {
        if (current === 0 || current === count + 1) return current;
        return current + 1;
      });
    }, SLIDE_MS);

    return () => window.clearInterval(timer);
  }, [autoplayKey, count]);

  useEffect(() => {
    if (index !== 0 && index !== count + 1) return;
    const timer = window.setTimeout(() => {
      setAnimate(false);
      setIndex(index === 0 ? count : 1);
    }, MOVE_MS);
    return () => window.clearTimeout(timer);
  }, [index, count]);

  const go = (direction: -1 | 1) => {
    setAnimate(true);
    setIndex((current) => {
      if (current === 0 || current === count + 1) return current;
      return current + direction;
    });
    setAutoplayKey((key) => key + 1);
  };

  return (
    <section
      className="relative h-[500px] w-full overflow-hidden bg-[#efe6d8]"
      aria-roledescription="carousel"
      aria-label="Home banners"
    >
      <div
        className="flex h-[500px]"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: animate ? `transform ${MOVE_MS}ms ease-in-out` : "none",
        }}
      >
        {track.map((slide, i) => {
          const isClone = i === 0 || i === count + 1;
          return (
            <div
              key={`${slide.src}-${i}`}
              className="relative h-[500px] w-full min-w-full shrink-0"
              aria-hidden={isClone ? true : undefined}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.src}
                alt={isClone ? "" : slide.alt}
                width={1920}
                height={500}
                className="absolute inset-0 h-[500px] w-full object-cover object-center"
              />

              <div
                className="pointer-events-none absolute inset-y-0 left-0 w-[62%] sm:w-[56%] md:w-[52%]"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(243,235,224,0.92) 0%, rgba(243,235,224,0.72) 48%, rgba(243,235,224,0.18) 78%, rgba(243,235,224,0) 100%)",
                }}
                aria-hidden
              />

              <div className="absolute inset-0 flex items-center">
                <div className="w-full px-5 sm:px-8 md:px-10 lg:px-14 xl:px-16">
                  <div className="home-hero__copy">
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
        className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-forest shadow-md transition hover:bg-white md:left-5"
        aria-label="Previous banner"
        onClick={() => go(-1)}
      >
        <ArrowIcon direction="left" />
      </button>
      <button
        type="button"
        className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-forest shadow-md transition hover:bg-white md:right-5"
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
