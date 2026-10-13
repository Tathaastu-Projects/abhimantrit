import Image from "next/image";
import Link from "next/link";
import type { HomeIntention } from "@/types/product";

/**
 * Static intention art: /public/intentions (frontend only).
 * Figma card size: 237.43 × 277
 */
const INTENTION_META: Record<
  string,
  {
    label: string;
    description: string;
    image: string;
    gradient: string;
    titleColor: string;
  }
> = {
  Peace: {
    label: "Peace",
    description: "Calm mind & balance",
    image: "/intentions/peace-cut.webp",
    gradient: "linear-gradient(180deg, #f4eefc 0%, #dcc8f4 55%, #c9aee8 100%)",
    titleColor: "#5b3d8a",
  },
  Wealth: {
    label: "Wealth",
    description: "Abundance & growth",
    image: "/intentions/wealth-cut.webp",
    gradient: "linear-gradient(180deg, #f8f1e4 0%, #e8d4b0 55%, #d9bc8a 100%)",
    titleColor: "#7a5a2e",
  },
  Health: {
    label: "Health",
    description: "Vitality & healing",
    image: "/intentions/health-cut.webp",
    gradient: "linear-gradient(180deg, #eef8f0 0%, #cfe8d4 55%, #aed9ba 100%)",
    titleColor: "#2f6b45",
  },
  Protection: {
    label: "Protection",
    description: "Shield & strength",
    image: "/intentions/protection-cut.webp",
    gradient: "linear-gradient(180deg, #eef5fb 0%, #c9dff3 55%, #a8c9e8 100%)",
    titleColor: "#2f5f8a",
  },
  Relationship: {
    label: "Relationship",
    description: "Harmony & love",
    image: "/intentions/relationship-cut.webp",
    gradient: "linear-gradient(180deg, #fdecef 0%, #f5c9d2 55%, #e8a8b6 100%)",
    titleColor: "#8a3d52",
  },
  Love: {
    label: "Relationship",
    description: "Harmony & love",
    image: "/intentions/relationship-cut.webp",
    gradient: "linear-gradient(180deg, #fdecef 0%, #f5c9d2 55%, #e8a8b6 100%)",
    titleColor: "#8a3d52",
  },
  Success: {
    label: "Success",
    description: "Clarity & progress",
    image: "/intentions/success-cut.webp",
    gradient: "linear-gradient(180deg, #fff7e6 0%, #f5dfb0 55%, #ebc878 100%)",
    titleColor: "#8a6a1e",
  },
  Spirituality: {
    label: "Spirituality",
    description: "Devotion & depth",
    image: "/intentions/spirituality-cut.webp",
    gradient: "linear-gradient(180deg, #f5f0e8 0%, #e2d5c2 55%, #cfc0a8 100%)",
    titleColor: "#6b5740",
  },
};

/** Figma left → right */
const INTENTION_ORDER = [
  "Peace",
  "Wealth",
  "Health",
  "Protection",
  "Relationship",
  "Success",
  "Spirituality",
] as const;

const FALLBACK_KEYS = INTENTION_ORDER;

function normalizeIntentionKey(value: string) {
  if (value === "Love" || value === "love") return "Relationship";
  return value;
}

function sortIntentions(list: HomeIntention[]) {
  const rank = new Map(INTENTION_ORDER.map((key, index) => [key, index]));
  return [...list].sort((a, b) => {
    const aKey = normalizeIntentionKey(a.id || a.label);
    const bKey = normalizeIntentionKey(b.id || b.label);
    return (
      (rank.get(aKey as (typeof INTENTION_ORDER)[number]) ?? 99) -
      (rank.get(bKey as (typeof INTENTION_ORDER)[number]) ?? 99)
    );
  });
}

/** Shop by Intention — Figma: 237×277 cards, white arrow CTA */
export function IntentionNav({ intentions }: { intentions?: HomeIntention[] }) {
  const source = intentions?.length
    ? sortIntentions(intentions).slice(0, 7)
    : FALLBACK_KEYS.map((id) => ({
        id,
        label: INTENTION_META[id].label,
        href: `/intention/${encodeURIComponent(id)}`,
      }));

  return (
    <section id="intentions" className="container-pad py-12 md:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#9a9590] md:text-xs">
          What are you seeking?
        </p>
        <h2 className="mt-2 font-display text-[1.85rem] font-semibold text-forest md:text-[2.15rem]">
          Shop By Intention
        </h2>
      </div>

      {/* Figma: 7 cards × 237×277, ~18px gap */}
      <div className="mt-9 flex flex-wrap justify-center gap-3 md:gap-4 lg:gap-[18px]">
        {source.map((intention, i) => {
          const key = normalizeIntentionKey(intention.label || intention.id);
          const meta =
            INTENTION_META[key] ||
            INTENTION_META[intention.id] ||
            INTENTION_META.Peace;
          const href =
            intention.href ||
            `/intention/${encodeURIComponent(
              intention.id === "Love" || intention.label === "Love"
                ? "Relationship"
                : intention.id || intention.label,
            )}`;

          return (
            <Link
              key={intention.id || intention.label}
              href={href}
              className="group flex h-[240px] w-full max-w-[190px] shrink-0 flex-col items-center rounded-[16px] px-2.5 pb-3.5 pt-4 text-center transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{ background: meta.gradient }}
            >
              {/* White arch size fixed — only the image scales up inside */}
              <div className="flex h-[122px] w-[112px] items-center justify-center overflow-hidden rounded-t-[999px] rounded-b-[1.15rem] bg-white/75">
                <Image
                  src={meta.image}
                  alt={meta.label}
                  width={200}
                  height={200}
                  priority={i < 4}
                  sizes="112px"
                  className="h-[128%] w-[128%] max-w-none object-contain transition duration-300 group-hover:scale-[1.32]"
                />
              </div>

              <p
                className="mt-2.5 font-display text-[0.98rem] font-semibold leading-tight tracking-[-0.01em]"
                style={{ color: meta.titleColor }}
              >
                {meta.label || intention.label}
              </p>
              <p className="mt-0.5 px-1 text-[10px] leading-snug text-[#6b6560]">
                {meta.description}
              </p>

              <span
                className="mt-auto inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#8a8580] shadow-sm transition group-hover:scale-105"
                aria-hidden
              >
                <ArrowIcon />
              </span>
            </Link>
          );
        })}
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
