"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import type { ScreenToSpaceSection, ScreenToSpaceItem } from "@/types/product";
import { resolveBannerUrl } from "@/lib/format";

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

/** Same tabs as header category nav */
const CATEGORY_TABS = [
  { id: "crystal-bracelets", label: "Crystal Bracelets" },
  { id: "rudraksha", label: "Rudraksha" },
  { id: "crystal-anklets", label: "Crystal Anklets" },
  { id: "tumbles", label: "Tumbles" },
  { id: "crystal-trees", label: "Crystal Trees" },
  { id: "pyramids", label: "Pyramids" },
  { id: "mala", label: "Mala" },
  { id: "photo-frames", label: "Photo Frames" },
] as const;

function normalizeSlug(value?: string) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, "")
    .replace(/^shop\//, "")
    .replace(/\s+/g, "-");
}

function resolveCategoryTab(item: ScreenToSpaceItem) {
  const fromHref = normalizeSlug(item.categoryHref);
  const fromSlug = normalizeSlug(item.categorySlug);
  const slugCandidate = fromHref || fromSlug;

  const byId = CATEGORY_TABS.find((tab) => tab.id === slugCandidate);
  if (byId) return byId;

  const label = String(item.categoryLabel || item.overlayTag || "")
    .trim()
    .toLowerCase();
  if (label) {
    const byLabel = CATEGORY_TABS.find(
      (tab) => tab.label.toLowerCase() === label || label.includes(tab.label.toLowerCase()),
    );
    if (byLabel) return byLabel;
  }

  return null;
}

function categoryHref(item: ScreenToSpaceItem) {
  const tab = resolveCategoryTab(item);
  if (tab) return `/shop/${tab.id}`;

  const raw = normalizeSlug(item.categoryHref || item.categorySlug);
  if (raw && raw !== "shop") return `/shop/${raw}`;
  return "/shop";
}

function ReelCard({ item }: { item: ScreenToSpaceItem }) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const video = resolveBannerUrl(item.videoUrl);
  const image = resolveBannerUrl(item.imageUrl);
  const tab = resolveCategoryTab(item);
  const href = categoryHref(item);
  const label = tab?.label || item.categoryLabel || item.overlayTag || "Shop category";

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <Link
      href={href}
      prefetch={false}
      aria-label={`Open ${label} category`}
      className="group relative block w-[250px] sm:w-[275px] md:w-[290px] shrink-0 aspect-[9/16] rounded-2xl overflow-hidden bg-stone-100 shadow-md border border-stone-200/50 select-none snap-start"
    >
      {video ? (
        <video
          ref={videoRef}
          src={video}
          poster={image}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          preload="metadata"
          className="pointer-events-none h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={label}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-stone-200 text-sm text-stone-400">
          No Media
        </div>
      )}

      {item.overlayTag ? (
        <div className="absolute top-4 left-4 z-10 max-w-[85%]">
          <p className="font-serif text-sm sm:text-base text-white font-medium drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] leading-snug">
            {item.overlayTag}
          </p>
        </div>
      ) : null}

      {video ? (
        <button
          type="button"
          onClick={toggleSound}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          className="absolute top-3 right-3 z-10 rounded-full bg-black/40 p-1.5 text-white backdrop-blur-md opacity-0 transition-opacity hover:bg-black/60 group-hover:opacity-100"
        >
          {isMuted ? <VolumeXIcon /> : <Volume2Icon />}
        </button>
      ) : null}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/45 via-black/15 to-transparent" />
    </Link>
  );
}

export function ScreenToSpace({ section }: ScreenToSpaceProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  if (section && section.isActive === false) {
    return null;
  }

  const title = "Unlock Your Destiny With Abhimantrit Products";
  const subtitle = section?.subtitle || "";
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
    <section id="screen-to-space" className="w-full bg-[#fdfbf7] py-8 md:py-10 overflow-hidden">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8">
        <div className="mb-5 md:mb-6">
          <h2 className="font-display text-[1.7rem] font-semibold tracking-[-0.02em] text-[#1c1c1c] md:text-[2rem]">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-2 max-w-xl text-sm text-stone-600 sm:text-base">{subtitle}</p>
          ) : null}
        </div>

        <div className="relative group/carousel">
          {canScrollLeft ? (
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-forest bg-forest text-white shadow-[0_8px_20px_rgba(15,61,46,0.28)] transition hover:bg-forest-deep sm:h-11 sm:w-11"
            >
              <ChevronLeftIcon />
            </button>
          ) : null}

          {canScrollRight ? (
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-forest bg-forest text-white shadow-[0_8px_20px_rgba(15,61,46,0.28)] transition hover:bg-forest-deep sm:h-11 sm:w-11"
            >
              <ChevronRightIcon />
            </button>
          ) : null}

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
