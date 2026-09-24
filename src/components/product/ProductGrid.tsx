import type { StoreProduct } from "@/types/product";
import { ProductCard } from "@/components/product/ProductCard";

export function ProductGrid({ products }: { products: StoreProduct[] }) {
  if (!products.length) return null;
  return (
    <div className="grid grid-cols-2 items-stretch gap-x-4 gap-y-7 sm:gap-x-5 md:grid-cols-3 md:gap-x-6 md:gap-y-8 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-9">
      {products.map((p) => (
        <div key={p._id} className="min-w-0 h-full">
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-3">
          <div className="skeleton aspect-square w-full" />
          <div className="skeleton h-4 w-4/5" />
          <div className="skeleton h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}
