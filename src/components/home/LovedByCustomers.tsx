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
        <MarqueeRow reviews={ROW_TOP} direction="left" />
        <MarqueeRow reviews={ROW_BOTTOM} direction="right" />
      </div>

      <div className="mt-8 flex items-center justify-center gap-1.5 md:mt-10" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={`l-${i}`} className="h-1.5 w-1.5 rounded-full bg-[#d4d0cb]" />
        ))}
        <span className="mx-1 h-1.5 w-9 rounded-full bg-forest md:w-11" />
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
}: {
  reviews: Review[];
  direction: "left" | "right";
}) {
  const loop = [...reviews, ...reviews];

  return (
    <div className="reviews-marquee-wrap relative w-full">
      <div className={direction === "left" ? "reviews-marquee" : "reviews-marquee reviews-marquee--right"}>
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
