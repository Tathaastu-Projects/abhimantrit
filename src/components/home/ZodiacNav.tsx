"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { resolveImageUrl } from "@/lib/format";

const ZODIAC_SIGNS = [
  { label: "Aries", slug: "aries" },
  { label: "Taurus", slug: "taurus" },
  { label: "Gemini", slug: "gemini" },
  { label: "Cancer", slug: "cancer" },
  { label: "Leo", slug: "leo" },
  { label: "Virgo", slug: "virgo" },
  { label: "Libra", slug: "libra" },
  { label: "Scorpio", slug: "scorpio" },
  { label: "Sagittarius", slug: "sagittarius" },
  { label: "Capricorn", slug: "capricorn" },
  { label: "Aquarius", slug: "aquarius" },
  { label: "Pisces", slug: "pisces" },
] as const;

/** Shop by Zodiac — icons served from backend `/uploads/zodiac/` (admin/backend storage). */
export function ZodiacNav() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    // Always start at the left (Aries) — no centered empty gap
    el.scrollLeft = 0;

    function sync() {
      const node = scrollerRef.current;
      if (!node) return;
      const max = node.scrollWidth - node.clientWidth;
      setProgress(max <= 0 ? 0 : node.scrollLeft / max);
    }

    sync();
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  return (
    <section id="zodiac" className="pt-2 pb-3 md:pt-2 md:pb-4">
      <div className="container-pad mx-auto max-w-3xl text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#9a9590] md:text-xs">
          Guided by the stars
        </p>
        <h2 className="mt-2 font-display text-[1.85rem] font-semibold text-forest md:text-[2.15rem]">
          Shop by Zodiac
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft md:text-base">
          Explore Crystals &amp; rudraksha aligned with your Rasi and personal astrological guidance.
        </p>
      </div>

      {/* Left = container-pad; right = flush to edge (cards peek off-screen) */}
      <div
        ref={scrollerRef}
        className="mt-6 flex gap-3 overflow-x-auto scroll-smooth pb-3 pl-5 pr-0 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-4 md:pl-7 xl:pl-8 [&::-webkit-scrollbar]:hidden"
      >
        {ZODIAC_SIGNS.map((sign, i) => (
          <Link
            key={sign.label}
            href={`/shop?zodiac=${encodeURIComponent(sign.label)}`}
            className="group relative flex h-[210px] w-[148px] shrink-0 flex-col items-center justify-center rounded-[1.35rem] px-3 pt-4 pb-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(231,70,96,0.12)] sm:h-[230px] sm:w-[160px]"
            style={{
              background:
                "linear-gradient(165deg, #fff6f4 0%, #ffe4e8 42%, #ffd0d8 100%)",
            }}
          >
            <div className="relative h-[108px] w-[108px] sm:h-[118px] sm:w-[118px]">
              <Image
                src={resolveImageUrl(`/uploads/zodiac/${sign.slug}-cut.webp`)}
                alt={sign.label}
                fill
                priority={i < 4}
                sizes="118px"
                unoptimized
                className="object-contain drop-shadow-sm transition duration-300 group-hover:scale-[1.04]"
              />
            </div>

            <p className="mt-3 font-display text-sm font-semibold text-forest sm:text-base">
              {sign.label}
            </p>

            <span
              className="absolute bottom-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink-soft shadow-sm transition group-hover:text-pink"
              aria-hidden
            >
              <ArrowIcon />
            </span>
          </Link>
        ))}
      </div>

      {/* Scroll progress indicator */}
      <div className="container-pad mt-5 flex justify-center">
        <div className="relative h-1.5 w-40 overflow-hidden rounded-full bg-[#e8e4df] md:w-52">
          <span
            className="absolute top-0 h-full w-[28%] rounded-full bg-forest transition-[left] duration-150 ease-out"
            style={{ left: `${progress * 72}%` }}
          />
        </div>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12h12M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
