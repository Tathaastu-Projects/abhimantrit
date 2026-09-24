import Link from "next/link";
import type { StoreProduct } from "@/types/product";
import { ProductCard } from "@/components/product/ProductCard";

type Props = {
  title: string;
  subtitle?: string;
  products: StoreProduct[];
  href?: string;
  limit?: number;
  variant?: "carousel" | "related";
};

export function ProductCarousel({
  title,
  subtitle,
  products,
  href,
  limit = 12,
  variant = "carousel",
}: Props) {
  if (!products?.length) return null;

  const list = products.slice(0, variant === "related" ? Math.min(limit, 4) : limit);

  return (
    <section className="related-products w-full px-4 py-10 sm:px-6 md:px-8 md:py-12 lg:px-10">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl text-ink md:text-4xl">{title}</h2>
          {subtitle ? <p className="mt-2 max-w-xl text-ink-soft">{subtitle}</p> : null}
        </div>
        {href ? (
          <Link href={href} className="text-sm font-semibold text-pink hover:underline">
            View all
          </Link>
        ) : null}
      </div>

      <div
        className={
          variant === "related"
            ? "related-products__grid"
            : "flex gap-5 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible lg:grid-cols-4"
        }
      >
        {list.map((p) => (
          <div key={p._id} className="related-products__cell">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
