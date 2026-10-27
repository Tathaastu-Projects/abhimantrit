import Link from "next/link";
import type { CategoryTile } from "@/types/product";
import { resolveBannerUrl } from "@/lib/format";
import { shopCategoryHref } from "@/lib/categoryRoutes";

function TileLabel({ label }: { label: string }) {
  return (
    <span className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] bg-gradient-to-t from-black/55 via-black/20 to-transparent px-3 pb-3 pt-10 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-white md:pb-4 md:text-[11px]">
      {label}
    </span>
  );
}

function Tile({ tile }: { tile: CategoryTile }) {
  const src = resolveBannerUrl(tile.image);
  const href = shopCategoryHref(tile.href, tile.id);
  return (
    <Link
      href={href}
      className="group relative block min-h-0 overflow-hidden bg-[#efe8dc]"
      style={{ gridArea: tile.area }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={tile.label}
          className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
        />
      ) : null}
      <TileLabel label={tile.label} />
    </Link>
  );
}

const FULL_WIDTH_MOBILE = new Set(["bracelets", "frame", "rudraksha", "tumbles"]);

/** Shop by Category — images from admin/backend only (`/uploads/...`). */
export function ShopByCategory({ tiles }: { tiles?: CategoryTile[] }) {
  const items = (tiles || []).filter((tile) => tile?.id);
  if (!items.length) return null;

  return (
    <section id="shop-by-category" className="bg-[#f6efe4] py-10 md:py-14">
      <h2 className="text-center font-display text-[1.7rem] font-medium tracking-[-0.02em] text-[#1c1c1c] md:text-[2rem]">
        Shop by Category
      </h2>

      <div className="category-mosaic mt-8 hidden w-full overflow-hidden md:grid">
        {items.map((tile) => (
          <Tile key={tile.id} tile={tile} />
        ))}
      </div>

      <div className="relative mt-8 grid grid-cols-2 gap-2.5 px-4 md:hidden">
        {items.map((tile) => {
          const full = FULL_WIDTH_MOBILE.has(tile.id);
          const src = resolveBannerUrl(tile.image);
          const href = shopCategoryHref(tile.href, tile.id);
          return (
            <Link
              key={tile.id}
              href={href}
              className={`group relative overflow-hidden bg-[#efe8dc] ${
                full ? "col-span-2 min-h-[170px]" : "min-h-[150px]"
              }`}
            >
              {src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={src}
                  alt={tile.label}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : null}
              <TileLabel label={tile.label} />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
