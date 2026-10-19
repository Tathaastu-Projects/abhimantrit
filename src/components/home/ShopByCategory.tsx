import Link from "next/link";
import type { CategoryTile } from "@/types/product";
import { resolveBannerUrl } from "@/lib/format";

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
];

function TileLabel({ label }: { label: string }) {
  return (
    <span className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] bg-gradient-to-t from-black/55 via-black/20 to-transparent px-3 pb-3 pt-10 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-white md:pb-4 md:text-[11px]">
      {label}
    </span>
  );
}

function Tile({ tile }: { tile: CategoryTile }) {
  return (
    <Link
      href={tile.href}
      className="group relative block min-h-0 overflow-hidden bg-[#efe8dc]"
      style={{ gridArea: tile.area }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={resolveBannerUrl(tile.image)}
        alt={tile.label}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
      />
      <TileLabel label={tile.label} />
    </Link>
  );
}

const FULL_WIDTH_MOBILE = new Set(["bracelets", "frame", "rudraksha", "tumbles"]);

export function ShopByCategory({ tiles }: { tiles?: CategoryTile[] }) {
  const items = tiles?.length ? tiles : TILES;
  return (
    <section id="shop-by-category" className="relative overflow-hidden bg-[#f6efe4] py-14 md:py-20">
      <SideArt side="left" />
      <SideArt side="right" />

      <h2 className="relative text-center font-display text-[1.7rem] font-medium tracking-[-0.02em] text-[#1c1c1c] md:text-[2rem]">
        Shop by Category
      </h2>

      <div className="category-mosaic relative mx-auto mt-8 hidden w-[min(920px,72vw)] overflow-hidden md:grid">
        {items.map((tile) => (
          <Tile key={tile.id} tile={tile} />
        ))}
      </div>

      <div className="relative mt-8 grid grid-cols-2 gap-2.5 px-4 md:hidden">
        {items.map((tile) => {
          const full = FULL_WIDTH_MOBILE.has(tile.id);
          return (
            <Link
              key={tile.id}
              href={tile.href}
              className={`group relative overflow-hidden bg-[#efe8dc] ${
                full ? "col-span-2 min-h-[170px]" : "min-h-[150px]"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resolveBannerUrl(tile.image)}
                alt={tile.label}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <TileLabel label={tile.label} />
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function SideArt({ side }: { side: "left" | "right" }) {
  const place = side === "left" ? "left-0" : "right-0";
  return (
    <div className={`pointer-events-none absolute bottom-0 top-0 hidden w-[18%] xl:block ${place}`} aria-hidden>
      {side === "left" ? <GiftScene /> : <VaseScene />}
    </div>
  );
}

function GiftScene() {
  return (
    <svg viewBox="0 0 220 520" className="h-full w-full" fill="none">
      <path d="M40 150c30-70 90-90 120-40 18 30 8 70-20 90" stroke="#e7a090" strokeWidth="10" strokeLinecap="round" />
      <rect x="58" y="230" width="92" height="78" rx="8" fill="#f0b7a4" />
      <path d="M104 230v78M58 268h92" stroke="#fff7ef" strokeWidth="8" />
      <path d="M86 230c-16-22-2-36 18-22 8 6 10 16 0 22M122 230c16-22 2-36-18-22-8 6-10 16 0 22" stroke="#d98474" strokeWidth="6" strokeLinecap="round" />
      <path d="M30 390c28-18 46-8 58 16 10 20 6 48-16 62" stroke="#8eae86" strokeWidth="8" strokeLinecap="round" />
      <path d="M48 420c20-24 48-20 58 6" stroke="#6d9470" strokeWidth="6" strokeLinecap="round" />
      <circle cx="156" cy="360" r="18" fill="#f3d7a4" />
    </svg>
  );
}

function VaseScene() {
  return (
    <svg viewBox="0 0 220 520" className="h-full w-full" fill="none">
      <path d="M70 250c8-40 18-70 8-110" stroke="#7ea184" strokeWidth="6" strokeLinecap="round" />
      <path d="M78 170c18-8 28 6 22 22" stroke="#6d9470" strokeWidth="5" strokeLinecap="round" />
      <path d="M118 240c6-36 22-64 36-96" stroke="#8eae86" strokeWidth="6" strokeLinecap="round" />
      <ellipse cx="92" cy="268" rx="28" ry="10" fill="#d7efe4" />
      <path d="M70 268c-6 28 4 70 22 92 10 12 28 16 36 4 8-14 10-48 2-78" fill="#c9ebe0" />
      <path d="M150 300c-4 24 6 58 22 74 12 12 26 8 30-6 4-16-2-46-10-68" fill="#f6d7b0" />
      <ellipse cx="164" cy="304" rx="22" ry="8" fill="#f8e6cf" />
      <rect x="126" y="430" width="36" height="48" rx="6" fill="#f0c36e" />
    </svg>
  );
}
