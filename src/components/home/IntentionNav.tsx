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

const FALLBACK_KEYS = [
  "Peace",
  "Wealth",
  "Health",
  "Protection",
  "Relationship",
  "Success",
  "Spirituality",
] as const;

/** Figma Shop by Intention — tall pastel cards with icon, title, blurb */
export function IntentionNav({ intentions }: { intentions?: HomeIntention[] }) {
  const source =
    intentions?.length
      ? intentions.slice(0, 7)
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
              className="group flex min-h-[168px] flex-col items-center rounded-2xl px-3 py-5 text-center transition hover:-translate-y-0.5 hover:shadow-md md:min-h-[196px] md:py-6"
              style={{ backgroundColor: bg }}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-lg text-forest shadow-sm md:h-14 md:w-14 md:text-xl">
                {intention.icon && intention.icon.length <= 2
                  ? intention.icon
                  : meta.icon}
              </span>
              <p className="mt-4 text-sm font-semibold text-ink">{meta.label || intention.label}</p>
              <p className="mt-1 text-[11px] leading-snug text-ink-soft md:text-xs">
                {meta.description}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
