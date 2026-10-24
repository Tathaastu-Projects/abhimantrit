"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import type { ScreenToSpaceSection, ScreenToSpaceItem } from "@/types/product";
import { resolveBannerUrl, resolveImageUrl } from "@/lib/format";

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function Volume2Icon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

function VolumeXIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="22" x2="16" y1="9" y2="15" />
      <line x1="16" x2="22" y1="9" y2="15" />
    </svg>
  );
}

interface ScreenToSpaceProps {
  section?: ScreenToSpaceSection | null;
}

function ReelCard({ item }: { item: ScreenToSpaceItem }) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Media must come from admin/backend (/uploads/...) — no frontend hardcoded assets
  const video = resolveBannerUrl(item.videoUrl);
  const image = resolveBannerUrl(item.imageUrl);
  const productImg = resolveImageUrl(item.productImage || item.imageUrl || "");
  const productHref = item.productSlug
    ? item.productSlug.startsWith("/")
      ? item.productSlug
      : `/product/${item.productSlug}`
    : "/shop";

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const formattedPrice = item.productPrice
    ? `Rs. ${Number(item.productPrice).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : "";

  const dots = Array.from({ length: item.dotsCount || 4 });

  return (
    <div className="group relative w-[250px] sm:w-[275px] md:w-[290px] shrink-0 aspect-[9/16] rounded-2xl overflow-hidden bg-stone-100 shadow-md border border-stone-200/50 select-none snap-start">
      {/* Background Video or Image */}
      {video ? (
        <video
          ref={videoRef}
          src={video}
          poster={image}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={item.productTitle}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-stone-200 text-stone-400 text-sm">
          No Media
        </div>
      )}

      {/* Top Overlay Tag (like "1. Beal Gond Katira cooler") */}
      {item.overlayTag ? (
        <div className="absolute top-4 left-4 z-10 max-w-[85%]">
          <p className="font-serif text-sm sm:text-base text-white font-medium drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] leading-snug">
            {item.overlayTag}
          </p>
        </div>
      ) : null}

      {/* Sound Toggle (if video) */}
      {video ? (
        <button
          type="button"
          onClick={toggleSound}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          className="absolute top-3 right-3 z-10 rounded-full bg-black/40 p-1.5 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
        >
          {isMuted ? <VolumeXIcon /> : <Volume2Icon />}
        </button>
      ) : null}

      {/* Subtle bottom gradient to ensure overlay readability */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/50 via-black/20 to-transparent pointer-events-none" />

      {/* Bottom Floating White Product Box */}
      <div className="absolute bottom-3.5 left-3 right-3 z-10 bg-white rounded-xl p-2.5 sm:p-3 shadow-lg border border-stone-100 flex flex-col gap-2 transition-transform duration-300 group-hover:-translate-y-0.5">
        <div className="flex items-center gap-2.5">
          {/* Product Thumbnail */}
          <div className="relative h-12 w-12 sm:h-13 sm:w-13 shrink-0 rounded-lg overflow-hidden bg-stone-100 border border-stone-200/70">
            {productImg ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={productImg}
                alt={item.productTitle}
                className="h-full w-full object-cover"
              />
            ) : null}
          </div>

          {/* Product Details */}
          <div className="min-w-0 flex-1">
            <h4
              title={item.productTitle}
              className="text-[12px] sm:text-[13px] font-medium text-stone-900 leading-tight truncate font-sans"
            >
              {item.productTitle}
            </h4>
            {formattedPrice ? (
              <p className="text-[12px] sm:text-[13px] font-bold text-stone-950 mt-0.5 font-sans">
                {formattedPrice}
              </p>
            ) : null}
          </div>
        </div>

        {/* SHOP NOW Button */}
        <Link
          href={productHref}
          className="w-full rounded-lg text-[11px] sm:text-xs font-bold py-2.5 uppercase tracking-wider text-center transition-colors block shadow-sm hover:opacity-90"
          style={{ color: "#ffffff", backgroundColor: "#123f33" }}
        >
          {item.buttonText || "SHOP NOW"}
        </Link>

        {/* Pagination / Variant Dots (matching screenshot) */}
        <div className="flex items-center justify-center gap-1.5 pt-0.5">
          {dots.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === 0 ? "w-2.5 bg-stone-900" : "w-1.5 bg-stone-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ScreenToSpace({ section }: ScreenToSpaceProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  if (section && section.isActive === false) {
    return null;
  }

  const title = section?.title || "from screen to space, seamlessly";
  const subtitle = section?.subtitle || "";
  // Only admin/CMS items — never use hardcoded frontend media
  const items = (section?.items || []).filter((item) => item.isActive !== false);

  if (!items.length) {
    return null;
  }

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [items]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const offset = direction === "left" ? -320 : 320;
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <section id="screen-to-space" className="w-full bg-[#fdfbf7] py-14 md:py-20 overflow-hidden">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-serif text-[1.75rem] sm:text-3xl md:text-[2.25rem] text-stone-900 font-normal tracking-[-0.015em] lowercase">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-xl mx-auto font-sans">
              {subtitle}
            </p>
          ) : null}
        </div>

        {/* Carousel Container with Arrows */}
        <div className="relative group/carousel">
          {/* Left Arrow Button */}
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-white/90 text-stone-800 shadow-md backdrop-blur-md flex items-center justify-center hover:bg-white hover:scale-105 active:scale-95 transition-all border border-stone-200/60"
            >
              <ChevronLeftIcon />
            </button>
          )}

          {/* Right Arrow Button */}
          {canScrollRight && (
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-white/90 text-stone-800 shadow-md backdrop-blur-md flex items-center justify-center hover:bg-white hover:scale-105 active:scale-95 transition-all border border-stone-200/60"
            >
              <ChevronRightIcon />
            </button>
          )}

          {/* Horizontal Reel Track */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto scrollbar-none pb-4 pt-1 px-2 snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {items.map((item) => (
              <ReelCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
