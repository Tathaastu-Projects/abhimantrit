"use client";

import { useEffect, useRef, useState } from "react";
import { resolveBannerUrl } from "@/lib/format";

export type Testimonial = {
  quote: string;
  name: string;
  imageUrl?: string;
  videoUrl?: string;
  playbackUrl?: string;
};

function driveFileId(url: string) {
  const file = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (file) return file[1];
  if (!/drive\.google\.com|googleusercontent\.com/.test(url)) return "";
  const id = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  return id ? id[1] : "";
}

function imageSrc(url?: string) {
  if (!url) return "";
  const id = driveFileId(url);
  if (id) return `https://lh3.googleusercontent.com/d/${id}`;
  return resolveBannerUrl(url);
}

function videoSrc(url?: string) {
  if (!url) return "";
  const id = driveFileId(url);
  if (id) return `https://drive.usercontent.google.com/download?id=${id}&export=download`;
  return resolveBannerUrl(url);
}

function useVisibleCount() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setCount(mq.matches ? 2 : 1);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return count;
}

export function Testimonials({ items }: { items?: Testimonial[] }) {
  const cards = (items || []).filter((item) => item.quote && item.name);
  const visible = useVisibleCount();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const maxIndex = Math.max(0, cards.length - visible);
  const canSlide = maxIndex > 0;

  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    const frame = frameRef.current;
    const track = trackRef.current;
    if (!frame || !track) return;

    const applySizes = () => {
      const width = frame.clientWidth;
      if (!width) return;
      const styles = window.getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
      const slideWidth = (width - gap * (visible - 1)) / visible;
      const slides = track.querySelectorAll<HTMLElement>("[data-testimonials-slide]");
      slides.forEach((slide) => {
        slide.style.flex = `0 0 ${slideWidth}px`;
        slide.style.width = `${slideWidth}px`;
        slide.style.minWidth = `${slideWidth}px`;
      });
      track.style.transform = `translateX(-${index * (slideWidth + gap)}px)`;
    };

    applySizes();
    window.addEventListener("resize", applySizes);
    return () => window.removeEventListener("resize", applySizes);
  }, [index, visible, cards.length]);

  useEffect(() => {
    if (!canSlide || paused) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current >= maxIndex ? 0 : current + 1));
    }, 5000);
    return () => window.clearInterval(timer);
  }, [canSlide, paused, maxIndex]);

  if (!cards.length) return null;

  const goPrev = () => {
    setIndex((current) => (current <= 0 ? maxIndex : current - 1));
  };

  const goNext = () => {
    setIndex((current) => (current >= maxIndex ? 0 : current + 1));
  };

  return (
    <section
      id="testimonials"
      className="w-full bg-white py-8 md:py-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <h2 className="text-center font-display text-[2rem] font-medium tracking-[-0.02em] text-[#1c1c1c] md:text-[2.4rem]">
        Testimonials
      </h2>
      <div className="relative mx-auto mt-5 max-w-[1200px] px-12 md:mt-6 md:px-16">
        {canSlide ? (
          <button
            type="button"
            aria-label="Previous review"
            onClick={goPrev}
            className="absolute left-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-forest bg-forest text-white shadow-[0_8px_20px_rgba(15,61,46,0.28)] transition hover:bg-forest-deep"
          >
            <Arrow direction="left" />
          </button>
        ) : null}
        <div ref={frameRef} className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-4 transition-transform duration-700 ease-out md:gap-5"
          >
            {cards.map((item, cardIndex) => (
              <ReviewCard key={`${item.name}-${cardIndex}`} item={item} />
            ))}
          </div>
        </div>
        {canSlide ? (
          <button
            type="button"
            aria-label="Next review"
            onClick={goNext}
            className="absolute right-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-forest bg-forest text-white shadow-[0_8px_20px_rgba(15,61,46,0.28)] transition hover:bg-forest-deep"
          >
            <Arrow direction="right" />
          </button>
        ) : null}
      </div>
    </section>
  );
}

function ReviewCard({ item }: { item: Testimonial }) {
  const photo = imageSrc(item.imageUrl);
  const video = item.playbackUrl ? resolveBannerUrl(item.playbackUrl) : videoSrc(item.videoUrl);

  return (
    <article
      data-testimonials-slide
      className="grid h-[280px] w-full min-w-full shrink-0 overflow-hidden rounded-2xl border border-black/[0.05] bg-[#f6f3ee] md:h-[300px] md:min-w-0 md:grid-cols-[1.1fr_0.9fr]"
    >
      <div className="flex min-h-0 flex-col justify-center overflow-hidden px-5 py-5 md:px-6">
        <div className="flex gap-0.5 text-[#e0b100]" aria-label="5 stars">
          {Array.from({ length: 5 }).map((_, star) => (
            <Star key={star} />
          ))}
        </div>
        <p className="mt-3 line-clamp-5 whitespace-pre-line text-[13px] leading-6 text-[#3a3a3a] md:line-clamp-6">
          {item.quote}
        </p>
        <p className="mt-4 text-sm font-semibold text-[#1c1c1c]">{item.name}</p>
      </div>
      <div className="relative min-h-0 overflow-hidden bg-[#d9d9d9]">
        {video ? (
          <video
            src={video}
            poster={photo || undefined}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : null}
      </div>
    </article>
  );
}

function Star() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current md:h-5 md:w-5" aria-hidden>
      <path d="M10 1.6 12.4 7l5.9.6-4.5 3.9 1.4 5.8L10 14.6 4.8 17.3l1.4-5.8L1.7 7.6 7.6 7 10 1.6Z" />
    </svg>
  );
}

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      {direction === "left" ? <path d="M14.5 6 8.5 12l6 6" /> : <path d="M9.5 6l6 6-6 6" />}
    </svg>
  );
}
