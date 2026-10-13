import Image from "next/image";
import Link from "next/link";

/**
 * Static collage: /public/categories/*.webp (frontend only).
 * Figma mosaic ~1920×1308 — sits before Sacred Essentials.
 */
const TILES = [
  {
    id: "rudraksha",
    label: "Rudraksha",
    href: "/shop/rudraksha",
    image: "/categories/rudraksha.webp",
    area: "rudraksha",
    underline: true,
  },
  {
    id: "tumbles",
    label: "Tumbles",
    href: "/shop?q=tumble",
    image: "/categories/tumbles.webp",
    area: "tumbles",
    underline: true,
  },
  {
    id: "bracelets",
    label: "Premium Crystal Bracelets",
    href: "/shop/bracelet",
    image: "/categories/bracelets.webp",
    area: "bracelets",
    underline: true,
  },
  {
    id: "pyramids",
    label: "Pyramids",
    href: "/shop?q=pyramid",
    image: "/categories/pyramids.webp",
    area: "pyramids",
    underline: true,
  },
  {
    id: "frame",
    label: "Photo Frame",
    href: "/shop?q=frame",
    image: "/categories/photo-frame.webp",
    area: "frame",
    underline: false,
  },
  {
    id: "stones",
    label: "Loose Stones",
    href: "/shop/gemstone",
    image: "/categories/loose-stones.webp",
    area: "stones",
    underline: false,
  },
  {
    id: "trees",
    label: "Crystal Trees",
    href: "/shop?q=tree",
    image: "/categories/crystal-trees.webp",
    area: "trees",
    underline: false,
  },
  {
    id: "anklets",
    label: "Anklets",
    href: "/shop?q=anklet",
    image: "/categories/anklets.webp",
    area: "anklets",
    underline: false,
  },
] as const;

function Tile({
  tile,
  priority,
}: {
  tile: (typeof TILES)[number];
  priority?: boolean;
}) {
  return (
    <Link
      href={tile.href}
      className="group relative block min-h-0 overflow-hidden bg-[#f3f0ea]"
      style={{ gridArea: tile.area }}
    >
      <Image
        src={tile.image}
        alt={tile.label}
        fill
        priority={priority}
        sizes="(max-width: 768px) 92vw, 33vw"
        className="object-cover transition duration-500 group-hover:scale-[1.03]"
      />
      <span
        className={`absolute bottom-3 left-3 z-[1] font-display text-sm font-semibold text-forest md:bottom-4 md:left-4 md:text-base lg:text-[1.05rem] ${
          tile.underline ? "underline decoration-forest/70 underline-offset-4" : ""
        }`}
      >
        {tile.label}
      </span>
    </Link>
  );
}

const FULL_WIDTH_MOBILE = new Set(["bracelets", "frame", "rudraksha", "tumbles"]);

export function ShopByCategory() {
  return (
    <section id="shop-by-category" className="container-pad py-12 md:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#9a9590] md:text-xs">
          Explore the collection
        </p>
        <h2 className="mt-2 font-display text-[1.85rem] font-semibold text-forest md:text-[2.15rem]">
          Shop by Category
        </h2>
      </div>

      {/* Desktop / tablet — Figma 1920×1308 mosaic */}
      <div className="category-mosaic mt-9 hidden w-full overflow-hidden md:grid">
        {TILES.map((tile, i) => (
          <Tile key={tile.id} tile={tile} priority={i < 3} />
        ))}
      </div>

      {/* Mobile — simple stacked tiles */}
      <div className="mt-8 grid grid-cols-2 gap-2.5 md:hidden">
        {TILES.map((tile, i) => {
          const full = FULL_WIDTH_MOBILE.has(tile.id);
          return (
          <Link
            key={tile.id}
            href={tile.href}
            className={`group relative overflow-hidden bg-[#f3f0ea] ${
              full ? "col-span-2 min-h-[170px]" : "min-h-[150px]"
            }`}
          >
            <Image
              src={tile.image}
              alt={tile.label}
              fill
              priority={i < 2}
              sizes={full ? "92vw" : "46vw"}
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
            />
            <span
              className={`absolute bottom-3 left-3 z-[1] font-display text-sm font-semibold text-forest ${
                tile.underline ? "underline decoration-forest/70 underline-offset-4" : ""
              }`}
            >
              {tile.label}
            </span>
          </Link>
          );
        })}
      </div>
    </section>
  );
}
