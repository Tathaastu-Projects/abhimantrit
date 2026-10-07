import Link from "next/link";
import type { HomeIntention } from "@/types/product";

const PASTELS = [
  "#FFF8E7",
  "#EAF8F0",
  "#E8F3FC",
  "#F3E9FF",
  "#FFE8F0",
  "#FFF0E4",
  "#EEE9FE",
];

const INTENTION_META: Record<
  string,
  { label: string; description: string; icon: string; color: string }
> = {
  Peace: {
    label: "Peace",
    description: "Calm mind and home.",
    icon: "ॐ",
    color: PASTELS[0],
  },
  Wealth: {
    label: "Wealth",
    description: "Invite abundance.",
    icon: "₹",
    color: PASTELS[1],
  },
  Health: {
    label: "Health",
    description: "Vitality and balance.",
    icon: "+",
    color: PASTELS[2],
  },
  Protection: {
    label: "Protection",
    description: "Shield from negativity.",
    icon: "⛨",
    color: PASTELS[3],
  },
  Relationship: {
    label: "Relationship",
    description: "Harmony in bonds.",
    icon: "♡",
    color: PASTELS[4],
  },
  Love: {
    label: "Relationship",
    description: "Harmony in bonds.",
    icon: "♡",
    color: PASTELS[4],
  },
  Success: {
    label: "Success",
    description: "Clarity and growth.",
    icon: "★",
    color: PASTELS[5],
  },
  Spirituality: {
    label: "Spirituality",
    description: "Deeper connection.",
    icon: "☽",
    color: PASTELS[6],
  },
};

/** Display order: 1 Relationship, 2 Wealth, 3 Success, 4 Peace, 5 Health, 6 Protection, 7 Spirituality */
const INTENTION_ORDER = [
  "Relationship",
  "Wealth",
  "Success",
  "Peace",
  "Health",
  "Protection",
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
    return (rank.get(aKey as (typeof INTENTION_ORDER)[number]) ?? 99) -
      (rank.get(bKey as (typeof INTENTION_ORDER)[number]) ?? 99);
  });
}

/** Figma Shop by Intention — tall pastel cards with icon, title, blurb */
export function IntentionNav({ intentions }: { intentions?: HomeIntention[] }) {
  const source = intentions?.length
    ? sortIntentions(intentions).slice(0, 7)
    : FALLBACK_KEYS.map((id) => ({
        id,
        label: INTENTION_META[id].label,
        href: `/intention/${encodeURIComponent(id)}`,
      }));

  return (
    <section id="intentions" className="container-pad py-14 md:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl text-ink md:text-4xl">Shop by Intention</h2>
        <p className="mt-3 text-sm text-ink-soft md:text-base">
          Begin with what you seek — we guide you to the right sacred power.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 lg:gap-4">
        {source.map((intention, i) => {
          const key = intention.label || intention.id;
          const meta =
            INTENTION_META[key] ||
            INTENTION_META[intention.id] ||
            INTENTION_META.Peace;
          const bg = intention.color || meta.color || PASTELS[i % PASTELS.length];
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
              className="group flex min-h-[168px] flex-col items-center justify-center rounded-2xl px-3 py-5 text-center transition hover:-translate-y-0.5 hover:shadow-md md:min-h-[196px] md:py-6"
              style={{ backgroundColor: bg }}
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/80 text-3xl text-forest shadow-sm md:h-20 md:w-20 md:text-4xl">
                {intention.icon && intention.icon.length <= 2
                  ? intention.icon
                  : meta.icon}
              </span>
              <p className="mt-4 text-sm font-semibold text-ink md:text-base">
                {meta.label || intention.label}
              </p>
              {/* Description under labels temporarily hidden
              <p className="mt-1 text-[11px] leading-snug text-ink-soft md:text-xs">
                {meta.description}
              </p>
              */}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
