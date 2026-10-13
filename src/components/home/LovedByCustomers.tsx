"use client";

import { useEffect, useRef } from "react";

type Review = {
  quote: string;
  name: string;
  age: number;
  role: string;
  tint: "gradient" | "solid";
  initials: string;
};

const ROW_TOP: Review[] = [
  {
    quote:
      "The AI birth chart was scary-accurate. It explained things about my personality I hadn't put into words.",
    name: "Ankit",
    age: 34,
    role: "Product Designer",
    tint: "gradient",
    initials: "A",
  },
  {
    quote:
      "We consulted for Vastu when renovating our home. The recommendations were simple yet powerful.",
    name: "Meera",
    age: 41,
    role: "Homemaker",
    tint: "solid",
    initials: "M",
  },
  {
    quote:
      "Guidance felt personal and practical — not generic. Helped me choose crystals aligned with my goals.",
    name: "Neeraj",
    age: 55,
    role: "Business Man",
    tint: "gradient",
    initials: "N",
  },
  {
    quote:
      "I was curious about astrology consultations. The session was clear, kind, and gave actionable next steps.",
    name: "Priya",
    age: 29,
    role: "Marketing Lead",
    tint: "solid",
    initials: "P",
  },
  {
    quote:
      "Rudraksha quality and packaging were excellent. Felt authentic — and the energy guidance was thoughtful.",
    name: "Rahul",
    age: 38,
    role: "Engineer",
    tint: "gradient",
    initials: "R",
  },
  {
    quote:
      "Loved how they explained which gemstone suited my rashi. Shopping felt intentional, not random.",
    name: "Sana",
    age: 32,
    role: "Teacher",
    tint: "solid",
    initials: "S",
  },
];

const ROW_BOTTOM: Review[] = [
  {
    quote:
      "Bracelet arrived energised and beautifully packed. Wearing it daily has become part of my morning ritual.",
    name: "Kavya",
    age: 27,
    role: "Designer",
    tint: "solid",
    initials: "K",
  },
  {
    quote:
      "Support team helped me pick the right mukhi. Transparent about certification — that built real trust.",
    name: "Vikram",
    age: 44,
    role: "CA",
    tint: "gradient",
    initials: "V",
  },
  {
    quote:
      "My first online spiritual purchase. Tracking, packaging and product quality all exceeded expectations.",
    name: "Ananya",
    age: 31,
    role: "HR Manager",
    tint: "solid",
    initials: "A",
  },
  {
    quote:
      "Consultation clarified so much about timing and remedies. Felt heard, not rushed through a script.",
    name: "Deepak",
    age: 48,
    role: "Banker",
    tint: "gradient",
    initials: "D",
  },
  {
    quote:
      "Crystal tree looks stunning on our altar. Friends keep asking where we got it — happy to recommend.",
    name: "Ishita",
    age: 36,
    role: "Architect",
    tint: "solid",
    initials: "I",
  },
  {
    quote:
      "Fast shipping and careful packing for fragile items. Will order again for festival gifting.",
    name: "Arjun",
    age: 40,
    role: "Entrepreneur",
    tint: "gradient",
    initials: "A",
  },
];

/** Loved by Our Customers — opposite rows; pause + manual scroll on hover */
export function LovedByCustomers() {
  return (
    <section id="reviews" className="w-full overflow-hidden bg-white py-14 md:py-16">
      <div className="container-pad mx-auto max-w-3xl text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#9a9590] md:text-xs">
          Trusted by 1,00,000+ people
        </p>
        <h2 className="mt-2 font-display text-[1.85rem] font-semibold text-forest md:text-[2.15rem]">
          Loved by Our Customers
        </h2>
      </div>

      <div className="mt-10 space-y-4 md:mt-12 md:space-y-5">
        <MarqueeRow reviews={ROW_TOP} direction="left" speed={0.55} />
        <MarqueeRow reviews={ROW_BOTTOM} direction="right" speed={0.55} />
      </div>

      <div className="mt-8 flex items-center justify-center gap-1.5 md:mt-10" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={`l-${i}`} className="h-1.5 w-1.5 rounded-full bg-[#d4d0cb]" />
        ))}
        <span className="mx-1 h-1.5 w-9 rounded-full bg-pink md:w-11" />
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={`r-${i}`} className="h-1.5 w-1.5 rounded-full bg-[#d4d0cb]" />
        ))}
      </div>
    </section>
  );
}

function MarqueeRow({
  reviews,
  direction,
  speed,
}: {
  reviews: Review[];
  direction: "left" | "right";
  speed: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const hoveredRef = useRef(false);
  const dragRef = useRef<{ active: boolean; startX: number; startScroll: number }>({
    active: false,
    startX: 0,
    startScroll: 0,
  });
  const loop = [...reviews, ...reviews, ...reviews];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let ready = false;
    let raf = 0;

    const initIfReady = () => {
      const third = el.scrollWidth / 3;
      if (third < 50) return false;
      // Start in the middle copy so both directions can wrap forever
      el.scrollLeft = third;
      ready = true;
      return true;
    };

    initIfReady();
    const ro = new ResizeObserver(() => {
      if (!ready) initIfReady();
    });
    ro.observe(el);

    const tick = () => {
      const node = trackRef.current;
      if (node) {
        if (!ready) initIfReady();
        if (ready && !pausedRef.current && !dragRef.current.active) {
          const third = node.scrollWidth / 3;
          if (third >= 50) {
            if (direction === "left") {
              node.scrollLeft += speed;
              if (node.scrollLeft >= third * 2) {
                node.scrollLeft -= third;
              }
            } else {
              // Scroll content to the right
              node.scrollLeft -= speed;
              if (node.scrollLeft <= 1) {
                node.scrollLeft += third;
              }
            }
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [direction, speed]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    function onWheel(e: WheelEvent) {
      if (!hoveredRef.current) return;
      const node = trackRef.current;
      if (!node) return;
      const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (!dx) return;
      e.preventDefault();
      node.scrollLeft += dx;
    }

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  function onPointerDown(e: React.PointerEvent) {
    const el = trackRef.current;
    if (!el) return;
    pausedRef.current = true;
    dragRef.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
    el.style.cursor = "grabbing";
  }

  function onPointerMove(e: React.PointerEvent) {
    const el = trackRef.current;
    if (!el || !dragRef.current.active) return;
    el.scrollLeft = dragRef.current.startScroll - (e.clientX - dragRef.current.startX);
  }

  function onPointerUp(e: React.PointerEvent) {
    const el = trackRef.current;
    dragRef.current.active = false;
    pausedRef.current = hoveredRef.current;
    if (el) {
      el.releasePointerCapture(e.pointerId);
      el.style.cursor = "grab";
    }
  }

  return (
    <div
      ref={wrapRef}
      className="relative w-full"
      onMouseEnter={() => {
        hoveredRef.current = true;
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        hoveredRef.current = false;
        if (!dragRef.current.active) pausedRef.current = false;
      }}
    >
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="flex cursor-grab gap-4 overflow-x-auto overscroll-x-contain px-4 pb-1 active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {loop.map((review, i) => (
          <ReviewCard key={`${review.name}-${i}`} review={review} />
        ))}
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const gradient = review.tint === "gradient";
  return (
    <article
      className={`relative flex w-[300px] shrink-0 flex-col rounded-[1.25rem] p-5 sm:w-[340px] md:min-h-[200px] md:p-6 ${
        gradient
          ? "bg-gradient-to-r from-[#ffe8d6] via-[#ffdcc8] to-[#ffd0dc]"
          : "bg-[#f3f1ef]"
      }`}
      style={{ borderBottomRightRadius: "0.55rem" }}
    >
      <div className="flex gap-0.5 text-[#e0b84a]" aria-label="5 star rating">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} />
        ))}
      </div>

      <p className="mt-3 text-sm leading-relaxed text-[#4a4642] md:text-[0.95rem] md:leading-[1.65]">
        {review.quote}
      </p>

      <div className="mt-auto flex items-end justify-between gap-3 pt-5">
        <span className="text-3xl leading-none text-black/10" aria-hidden>
          ”
        </span>
        <div className="flex items-center gap-2.5 text-right">
          <div>
            <p className="text-sm font-semibold text-[#2c2a28]">
              {review.name}, {review.age}
            </p>
            <p className="text-xs text-[#8a8580]">{review.role}</p>
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8e4e0] text-xs font-semibold text-forest">
            {review.initials}
          </span>
        </div>
      </div>
    </article>
  );
}

function StarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 3.5l2.6 5.4 5.9.7-4.4 4 1.2 5.8L12 16.8 6.7 19.4l1.2-5.8-4.4-4 5.9-.7L12 3.5z" />
    </svg>
  );
}
