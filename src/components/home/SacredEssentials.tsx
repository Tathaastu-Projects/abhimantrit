import Link from "next/link";
import type { HomeCategoryCard } from "@/types/product";
import { CategoryCardImage } from "@/components/home/CategoryCardImage";

const FIGMA_CARDS: {
  id: string;
  label: string;
  description: string;
  href: string;
  image?: string;
}[] = [
  {
    id: "pooja",
    label: "Puja Essentials",
    description: "Sacred tools for daily rituals and festivals.",
    href: "/shop",
  },
  {
    id: "crystal",
    label: "Crystals & Stones",
    description: "Healing stones to balance energy and calm.",
    href: "/shop/crystal",
  },
  {
    id: "rudraksha",
    label: "Rudraksha",
    description: "Authenticated beads for protection and focus.",
    href: "/shop/rudraksha",
  },
  {
    id: "gemstone",
    label: "Gemstones",
    description: "Lab-checked gems for intention and planet.",
    href: "/shop/gemstone",
  },
  {
    id: "yantra",
    label: "Yantras",
    description: "Sacred geometry for home and altar energy.",
    href: "/shop/yantra",
  },
  {
    id: "bracelet",
    label: "Bracelets & Malas",
    description: "Wearable pieces for prayer and everyday grace.",
    href: "/shop/bracelet",
  },
];

function pickImage(fromApi?: HomeCategoryCard, fallback?: string) {
  const url = fromApi?.image || fallback || "";
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/")) {
    return url;
  }
  return "/placeholder-product.svg";
}

/** Figma Sacred Essentials — full-width row with generous card gaps */
export function SacredEssentials({ categories }: { categories?: HomeCategoryCard[] }) {
  const byId = new Map((categories || []).map((c) => [c.id, c]));
  // Also match common API aliases
  if (byId.has("stone") && !byId.has("crystal")) {
    byId.set("crystal", byId.get("stone")!);
  }

  const list = FIGMA_CARDS.map((card) => {
    const fromApi = byId.get(card.id);
    return {
      ...card,
      image: pickImage(fromApi, card.image),
      href: fromApi?.href || card.href,
      label: fromApi?.label || card.label,
    };
  });

  return (
    <section id="categories" className="w-full px-4 py-14 sm:px-6 md:px-8 md:py-16 lg:px-10">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl text-ink md:text-4xl">Sacred Essentials</h2>
        <p className="mt-3 text-sm text-ink-soft md:text-base">
          Products to bring positivity, peace and well-being into your life.
        </p>
      </div>

      <div className="mt-10 grid w-full grid-cols-2 gap-x-8 gap-y-10 sm:gap-x-10 md:grid-cols-3 md:gap-x-12 md:gap-y-12 lg:grid-cols-6 lg:gap-x-14 lg:gap-y-10">
        {list.map((category) => (
          <Link
            key={category.id}
            href={category.href}
            className="group flex flex-col rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="aspect-square overflow-hidden rounded-xl bg-mist">
              <CategoryCardImage src={category.image} alt={category.label} />
            </div>
            <div className="flex flex-1 flex-col px-1.5 pb-2 pt-3">
              <h3 className="text-sm font-semibold leading-snug text-ink md:text-[15px]">
                {category.label}
              </h3>
              <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-ink-soft md:text-xs">
                {category.description}
              </p>
              <span className="mt-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-forest text-[#f7f3ec] transition group-hover:bg-forest-deep">
                <ArrowIcon />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
