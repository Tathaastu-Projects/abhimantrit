import Link from "next/link";
import type { StoreProduct } from "@/types/product";
import { ProductGrid } from "@/components/product/ProductGrid";

type Props = {
  title?: string;
  products: StoreProduct[];
  href?: string;
  limit?: number;
};

/** Figma home product block — dense 4-column grid (not a sparse carousel) */
export function HomeProductSection({
  title = "Bestsellers",
  products,
  href = "/collections/bestsellers",
  limit = 8,
}: Props) {
  const list = products.slice(0, limit);

  return (
    <section className="container-pad py-10 md:py-14">
      <div className="mb-8 flex items-end justify-between gap-4">
        <h2 className="font-display text-3xl text-ink md:text-4xl">{title}</h2>
        <Link href={href} className="text-sm font-semibold text-pink hover:underline">
          View all
        </Link>
      </div>

      {list.length ? (
        <ProductGrid products={list} />
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-[var(--border)] bg-mist/60 p-3">
              <div className="aspect-square rounded-lg bg-stone-200/80" />
              <div className="mt-3 h-3 w-3/4 rounded bg-stone-200/80" />
              <div className="mt-2 h-3 w-1/2 rounded bg-stone-200/60" />
              <div className="mt-4 h-10 rounded-lg bg-pink/30" />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
