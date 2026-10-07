import Link from "next/link";
import type { StoreProduct } from "@/types/product";
import { ProductCard } from "@/components/product/ProductCard";

type Props = {
  title?: string;
  products: StoreProduct[];
  href?: string;
  limit?: number;
};

/** Home Bestsellers — premium curated product band */
export function HomeProductSection({
  title = "Bestsellers",
  products,
  href = "/collections/bestsellers",
  limit = 8,
}: Props) {
  const list = products.slice(0, limit);

  return (
    <section className="bestsellers-section w-full bg-[#f7f4ef]">
      <div className="w-full px-4 py-14 sm:px-6 md:px-8 md:py-16 lg:px-10">
        <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-pink">
              Most loved
            </p>
            <h2 className="mt-2 font-display text-3xl text-ink md:text-4xl lg:text-[2.75rem]">
              {title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft md:text-base">
              Handpicked sacred pieces chosen for authenticity, beauty, and everyday wear.
            </p>
          </div>
          <Link
            href={href}
            className="inline-flex items-center gap-2 self-start rounded-full border border-forest/20 bg-white px-5 py-2.5 text-sm font-semibold text-forest transition hover:border-pink/40 hover:text-pink md:self-auto"
          >
            View all
            <span aria-hidden>→</span>
          </Link>
        </div>

        {list.length ? (
          <div className="grid grid-cols-2 items-stretch gap-x-4 gap-y-8 sm:gap-x-5 md:grid-cols-3 md:gap-x-6 md:gap-y-10 lg:grid-cols-4 lg:gap-x-7 lg:gap-y-12">
            {list.map((p) => (
              <div key={p._id} className="min-h-0 h-full">
                <ProductCard product={p} tone="premium" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-7">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-white/70 p-3 ring-1 ring-black/[0.04]">
                <div className="aspect-square rounded-xl bg-[#ebe6de]" />
                <div className="mt-4 h-3 w-4/5 rounded bg-[#ebe6de]" />
                <div className="mt-2 h-3 w-1/2 rounded bg-[#ebe6de]/70" />
                <div className="mt-5 h-11 rounded-full bg-pink/20" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
