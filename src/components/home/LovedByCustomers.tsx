"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Review = {
  quote: string;
  name: string;
  age: number;
  role: string;
  tint: "pink" | "white";
  initials: string;
};

const REVIEWS: Review[] = [
  {
    quote:
      "The AI birth chart was scary-accurate. It explained things about my personality I hadn't put into words.",
    name: "Ankit",
    age: 34,
    role: "Product Designer",
    tint: "pink",
    initials: "A",
  },
  {
    quote:
      "We consulted for Vastu when renovating our home. The recommendations were simple yet powerful.",
    name: "Meera",
    age: 41,
    role: "Homemaker",
    tint: "white",
    initials: "M",
  },
  {
    quote:
      "Guidance felt personal and practical — not generic. Helped me choose crystals aligned with my goals.",
    name: "Neeraj",
    age: 55,
    role: "Business Man",
    tint: "pink",
    initials: "N",
  },
  {
    quote:
      "I was curious about astrology consultations. The session was clear, kind, and gave actionable next steps.",
    name: "Priya",
    age: 29,
    role: "Marketing Lead",
    tint: "white",
    initials: "P",
  },
  {
    quote:
      "Rudraksha quality and packaging were excellent. Felt authentic — and the energy guidance was thoughtful.",
    name: "Rahul",
    age: 38,
    role: "Engineer",
    tint: "pink",
    initials: "R",
  },
  {
    quote:
      "Loved how they explained which gemstone suited my rashi. Shopping felt intentional, not random.",
    name: "Sana",
    age: 32,
    role: "Teacher",
    tint: "white",
    initials: "S",
  },
  {
    quote:
      "Bracelet arrived energised and beautifully packed. Wearing it daily has become part of my morning ritual.",
    name: "Kavya",
    age: 27,
    role: "Designer",
    tint: "pink",
    initials: "K",
  },
  {
    quote:
      "Support team helped me pick the right mukhi. Transparent about certification — that built real trust.",
    name: "Vikram",
    age: 44,
    role: "CA",
    tint: "white",
    initials: "V",
  },
  {
    quote:
      "My first online spiritual purchase. Tracking, packaging and product quality all exceeded expectations.",
    name: "Ananya",
    age: 31,
    role: "HR Manager",
    tint: "pink",
    initials: "A",
  },
  {
    quote:
      "Consultation clarified so much about timing and remedies. Felt heard, not rushed through a script.",
    name: "Deepak",
    age: 48,
    role: "Banker",
    tint: "white",
    initials: "D",
  },
  {
    quote:
      "Crystal tree looks stunning on our altar. Friends keep asking where we got it — happy to recommend.",
    name: "Ishita",
    age: 36,
    role: "Architect",
    tint: "pink",
    initials: "I",
  },
  {
    quote:
      "Fast shipping and careful packing for fragile items. Will order again for festival gifting.",
    name: "Arjun",
    age: 40,
    role: "Entrepreneur",
    tint: "white",
    initials: "A",
  },
];

/** Loved by Our Customers — horizontal scroll before Certified & Authentic */
export function LovedByCustomers() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const dragRef = useRef<{ active: boolean; startX: number; startScroll: number }>({
    active: false,
    startX: 0,
    startScroll: 0,
  });

  const syncProgress = useCallback(() => {
    const node = scrollerRef.current;
    if (!node) return;
    const max = node.scrollWidth - node.clientWidth;
    setProgress(max <= 0 ? 0 : node.scrollLeft / max);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    syncProgress();
    el.addEventListener("scroll", syncProgress, { passive: true });
    window.addEventListener("resize", syncProgress);
    return () => {
      el.removeEventListener("scroll", syncProgress);
      window.removeEventListener("resize", syncProgress);
    };
  }, [syncProgress]);

  /** Vertical mouse wheel → horizontal scroll */
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    function onWheel(e: WheelEvent) {
      if (!el) return;
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      if (el.scrollWidth <= el.clientWidth) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    }

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  function onPointerDown(e: React.PointerEvent) {
    const el = scrollerRef.current;
    if (!el) return;
    dragRef.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
    el.style.cursor = "grabbing";
  }

  function onPointerMove(e: React.PointerEvent) {
    const el = scrollerRef.current;
    if (!el || !dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.startX;
    el.scrollLeft = dragRef.current.startScroll - dx;
  }

  function onPointerUp(e: React.PointerEvent) {
    const el = scrollerRef.current;
    dragRef.current.active = false;
    if (el) {
      el.releasePointerCapture(e.pointerId);
      el.style.cursor = "grab";
    }
  }

  function scrollByCards(dir: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 340, behavior: "smooth" });
  }

  const columns = Array.from({ length: Math.ceil(REVIEWS.length / 2) }, (_, col) => ({
    top: REVIEWS[col * 2],
    bottom: REVIEWS[col * 2 + 1],
  }));

  return (
    <section id="reviews" className="w-full bg-white py-14 md:py-16">
      <div className="container-pad mx-auto max-w-3xl text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#9a9590] md:text-xs">
          Trusted by 1,00,000+ people
        </p>
        <h2 className="mt-2 font-display text-[1.85rem] font-semibold text-forest md:text-[2.15rem]">
          Loved by Our Customers
        </h2>
      </div>

      <div className="relative mt-9">
        <button
          type="button"
          aria-label="Scroll reviews left"
          onClick={() => scrollByCards(-1)}
          className="absolute left-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border)] bg-white text-forest shadow-md md:flex lg:left-4"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Scroll reviews right"
          onClick={() => scrollByCards(1)}
          className="absolute right-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border)] bg-white text-forest shadow-md md:flex lg:right-4"
        >
          ›
        </button>

        <div
          ref={scrollerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="flex cursor-grab gap-4 overflow-x-auto overscroll-x-contain px-4 pb-2 active:cursor-grabbing md:px-14 lg:px-16 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {columns.map((col, i) => (
            <div key={i} className="flex w-[300px] shrink-0 flex-col gap-4 sm:w-[320px]">
              {col.top ? <ReviewCard review={col.top} /> : null}
              {col.bottom ? <ReviewCard review={col.bottom} /> : null}
            </div>
          ))}
        </div>
      </div>

      <div className="container-pad mt-6 flex justify-center">
        <div className="relative h-1.5 w-40 overflow-hidden rounded-full bg-[#e8e4df] md:w-52">
          <span
            className="absolute top-0 h-full w-[28%] rounded-full bg-pink transition-[left] duration-150 ease-out"
            style={{ left: `${progress * 72}%` }}
          />
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-ink-soft md:hidden">Swipe to see more reviews</p>
    </section>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const pink = review.tint === "pink";
  return (
    <article
      className={`relative flex min-h-[210px] select-none flex-col rounded-2xl border p-5 md:min-h-[220px] md:p-6 ${
        pink
          ? "border-transparent bg-gradient-to-br from-[#fff6f4] via-[#ffe8ec] to-[#ffd6de]"
          : "border-[var(--border)] bg-white"
      }`}
    >
      <p className="text-sm leading-relaxed text-ink md:text-[0.95rem] md:leading-[1.65]">
        {review.quote}
      </p>

      <div className="mt-4 flex gap-0.5 text-[#c9a227]" aria-label="5 star rating">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} />
        ))}
      </div>

      <div className="mt-auto flex items-end justify-between gap-3 pt-5">
        <span
          className={`inline-flex h-9 w-9 items-center justify-center rounded-xl text-lg font-serif ${
            pink ? "bg-white/70 text-pink/50" : "bg-[#fff0f3] text-pink/45"
          }`}
          aria-hidden
        >
          ”
        </span>
        <div className="flex items-center gap-2.5 text-right">
          <div>
            <p className="text-sm font-semibold text-ink">
              {review.name}, {review.age}
            </p>
            <p className="text-xs text-ink-soft">{review.role}</p>
          </div>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest text-sm font-semibold text-white">
            {review.initials}
          </span>
        </div>
      </div>
    </article>
  );
}

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 3.5l2.6 5.4 5.9.7-4.4 4 1.2 5.8L12 16.8 6.7 19.4l1.2-5.8-4.4-4 5.9-.7L12 3.5z" />
    </svg>
  );
}
