import Link from "next/link";
import type { StoreProduct } from "@/types/product";
import { ProductCard } from "@/components/product/ProductCard";
import { CardScroller } from "@/components/home/CardScroller";

type Props = {
  title?: string;
  products: StoreProduct[];
  href?: string;
  limit?: number;
};

/** Home Bestsellers — 5 visible, scroll for up to 10, with nav + Explore more */
export function HomeProductSection({
  title = "Bestsellers",
  products,
  href = "/collections/bestsellers",
  limit = 10,
}: Props) {
  const list = products.slice(0, limit);

  return (
    <section className="bestsellers-section w-full bg-[#f7f4ef]">
      <div className="w-full px-4 pb-6 pt-4 sm:px-6 md:px-8 md:pb-8 md:pt-5 lg:px-10">
        <div className="mb-2 max-w-xl md:mb-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-forest">
            Most loved
          </p>
          <h2 className="mt-1.5 font-display text-3xl text-ink md:text-4xl lg:text-[2.5rem]">
            {title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft md:text-base">
            Handpicked sacred pieces chosen for authenticity, beauty, and everyday wear.
          </p>
        </div>

        {list.length ? (
          <CardScroller className="flex gap-4 overflow-x-auto px-1 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-5 [&::-webkit-scrollbar]:hidden">
            {list.map((p) => (
              <div
                key={p._id}
                className="w-[calc(50%-0.5rem)] shrink-0 sm:w-[calc(33.333%-0.67rem)] md:w-[calc(25%-0.9rem)] lg:w-[calc(20%-1rem)]"
              >
                <div className="h-full min-h-0">
                  <ProductCard product={p} tone="premium" />
                </div>
              </div>
            ))}
          </CardScroller>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-5 md:gap-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-white/70 p-3 ring-1 ring-black/[0.04]">
                <div className="aspect-square rounded-xl bg-[#ebe6de]" />
                <div className="mt-4 h-3 w-4/5 rounded bg-[#ebe6de]" />
                <div className="mt-2 h-3 w-1/2 rounded bg-[#ebe6de]/70" />
                <div className="mt-5 h-11 rounded-full bg-forest/15" />
              </div>
            ))}
          </div>
        )}

        <div className="mt-5 flex justify-center md:mt-6">
          <Link href={href} className="btn btn-primary min-w-[180px] px-10">
            Explore more
          </Link>
        </div>
      </div>
    </section>
  );
}
