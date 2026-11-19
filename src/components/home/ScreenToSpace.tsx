"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import type { ScreenToSpaceSection, ScreenToSpaceItem, StoreProduct } from "@/types/product";
import { formatINR, primaryImage, productHref, resolveBannerUrl } from "@/lib/format";
import { useNearViewport } from "@/hooks/useNearViewport";

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

const PRODUCT_ROTATE_MS = 3500;

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

function ReelProductCard({
  products,
  active,
}: {
  products: StoreProduct[];
  active: boolean;
}) {
  const [index, setIndex] = useState(0);
  const list = products.slice(0, 5);
  const current = list[index] || list[0];

  useEffect(() => {
    setIndex(0);
  }, [products]);

  useEffect(() => {
    if (!active || list.length <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % list.length);
    }, PRODUCT_ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [active, list.length]);

  if (!current) return null;

  const img = primaryImage(current.images);
  const sale = current.effectiveSalePrice ?? current.salePrice;
  const href = productHref(current);

  return (
    <div className="pointer-events-auto absolute inset-x-2.5 bottom-2.5 z-20 sm:inset-x-3 sm:bottom-3">
      <div className="overflow-hidden rounded-xl bg-white shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
        <Link
          href={href}
          prefetch={false}
          onClick={(e) => e.stopPropagation()}
          className="block p-2.5"
        >
          <div className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.url}
              alt={img.alt || current.title}
              className="h-12 w-12 shrink-0 rounded-md object-cover bg-[#f3efe8]"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-semibold leading-snug text-[#1c1c1c]">
                {current.title}
              </p>
              <p className="mt-0.5 text-[12px] font-bold text-[#1c1c1c]">{formatINR(sale)}</p>
            </div>
          </div>
          <span className="mt-2 flex h-9 w-full items-center justify-center rounded-md bg-[#1c1c1c] text-[11px] font-bold uppercase tracking-[0.08em] text-white transition hover:bg-black">
            Shop now
          </span>
        </Link>

        {list.length > 1 ? (
          <div className="flex items-center justify-center gap-1.5 pb-2">
            {list.map((product, i) => (
              <button
                key={product._id || i}
                type="button"
                aria-label={`Show product ${i + 1}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIndex(i);
                }}
                className={`h-1.5 w-1.5 rounded-full transition ${
                  i === index ? "bg-[#1c1c1c]" : "bg-[#d4d0c8]"
                }`}
              />
            ))}
          </div>
        ) : (
          <div className="pb-1" />
        )}
      </div>
    </div>
  );
}

function ReelCard({ item }: { item: ScreenToSpaceItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref: nearRef, near } = useNearViewport<HTMLElement>("160px");

  const video = resolveBannerUrl(item.videoUrl);
  const image = resolveBannerUrl(item.imageUrl);
  const tab = resolveCategoryTab(item);
  const href = categoryHref(item);
  const label = tab?.label || item.categoryLabel || item.overlayTag || "Shop category";
  const products = (item.products || []).slice(0, 5);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !near || !video) return;
    el.muted = true;
    el.play().catch(() => {});
  }, [near, video]);

  return (
    <article
      ref={nearRef}
      className="relative w-[250px] sm:w-[275px] md:w-[290px] shrink-0 aspect-[9/16] rounded-2xl overflow-hidden bg-stone-100 shadow-md border border-stone-200/50 select-none snap-start"
    >
      {/* Full-card hit area → category shop page */}
      <Link
        href={href}
        prefetch={false}
        aria-label={`Open ${label} category`}
        className="absolute inset-0 z-[1]"
      />

      {video && near ? (
        <video
          ref={videoRef}
          src={video}
          poster={image || undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="pointer-events-none h-full w-full object-cover"
        />
      ) : image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={label}
          loading="lazy"
          decoding="async"
          className="pointer-events-none h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-stone-200 text-sm text-stone-400">
          No Media
        </div>
      )}

      {item.overlayTag ? (
        <div className="pointer-events-none absolute top-4 left-4 z-10 max-w-[85%]">
          <p className="font-serif text-sm sm:text-base text-white font-medium drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] leading-snug">
            {item.overlayTag}
          </p>
        </div>
      ) : null}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />

      {products.length ? <ReelProductCard products={products} active={near} /> : null}
    </article>
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
