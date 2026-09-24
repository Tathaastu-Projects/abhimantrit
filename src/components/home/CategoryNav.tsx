import Link from "next/link";
import type { HomeCategoryCard } from "@/types/product";
import { FALLBACK_CATEGORIES } from "@/lib/api";
import { titleCase } from "@/lib/format";

const FALLBACK: HomeCategoryCard[] = FALLBACK_CATEGORIES.filter((c) => c !== "other").map(
  (id) => ({
    id,
    label: titleCase(id),
    href: `/shop/${id}`,
    productCount: 0,
    image: id === "yantra" || id === "combo" ? "/pooja_essential_banner.svg" : "/home_banner.svg",
  }),
);

export function CategoryNav({ categories }: { categories?: HomeCategoryCard[] }) {
  const list = categories?.length ? categories : FALLBACK;

  return (
    <section id="categories" className="container-pad py-10 md:py-14">
      <h2 className="font-display text-3xl md:text-4xl">Explore Categories</h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((category) => (
          <Link
            key={category.id}
            href={category.href || `/shop/${category.id}`}
            className="group relative flex min-h-[148px] items-center overflow-hidden rounded-2xl bg-mist px-6 py-5 transition hover:bg-[#f0efeb]"
          >
            <div className="relative z-10 max-w-[55%]">
              <p className="font-display text-2xl text-forest">{category.label}</p>
              {typeof category.productCount === "number" && category.productCount > 0 ? (
                <p className="mt-1 text-xs text-ink-soft">{category.productCount} products</p>
              ) : null}
              <p className="mt-2 text-sm font-semibold text-pink">Shop collection →</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={category.image || "/placeholder-product.svg"}
              alt=""
              className="absolute bottom-0 right-0 h-[92%] w-auto max-w-[46%] object-contain opacity-95 transition duration-500 group-hover:scale-105"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
