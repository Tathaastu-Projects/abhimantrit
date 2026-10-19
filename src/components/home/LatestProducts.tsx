"use client";

import Link from "next/link";
import { useState, type MouseEvent } from "react";
import type { StoreProduct } from "@/types/product";
import { discountPercent, formatINR, hoverLines, primaryImage } from "@/lib/format";
import { useCartStore } from "@/lib/cart-store";
import { BagButton, HoverDetails } from "@/components/home/RashiBracelets";

function ProductTile({ product }: { product: StoreProduct }) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);
  const img = primaryImage(product.images);
  const [imgSrc, setImgSrc] = useState(img.url);
  const sale = product.effectiveSalePrice ?? product.salePrice;
  const mrp = product.effectiveMrp ?? product.mrp;
  const off = product.effectiveDiscountPercent ?? product.discountPercent ?? discountPercent(mrp, sale);
  const stock = product.effectiveStock ?? product.totalStock ?? product.quantity;
  const variant = (product.variants || []).find((item) => item.isActive);
  const details = hoverLines(product);
  const bagLabel = added ? "Added" : stock <= 0 ? "Out of stock" : "Add to bag";

  function add(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    if (stock <= 0) return;
    addItem({
      productId: product._id,
      slug: product.slug,
      title: product.title,
      image: img.url,
      variantId: variant?._id || null,
      variantLabel: variant?.label,
      unitSalePrice: variant?.salePrice || sale,
      unitMrp: variant?.mrp || mrp,
      maxQty: variant?.quantity || stock,
      qty: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <article className="flex min-w-0 flex-col rounded-2xl border border-[#ececec] bg-white p-3 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
      <div className="card-hover relative overflow-hidden rounded-xl bg-[#f7f7f7]">
        <Link href={`/product/${product.slug}`} className="block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgSrc}
            alt={img.alt || product.title}
            loading="lazy"
            decoding="async"
            className="aspect-square w-full object-contain p-2"
            onError={() => setImgSrc("/placeholder-product.svg")}
          />
        </Link>
        <HoverDetails labels={details} />
        <BagButton label={bagLabel} onClick={add} disabled={stock <= 0} />
      </div>
      <Link
        href={`/product/${product.slug}`}
        className="mt-3 line-clamp-2 min-h-[2.6rem] text-sm font-medium leading-snug text-[#1c1c1c]"
      >
        {product.title}
      </Link>
      <p className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="text-base font-semibold text-[#111]">{formatINR(sale)}</span>
        {mrp > sale ? <span className="text-sm text-[#9a9a9a] line-through">{formatINR(mrp)}</span> : null}
        {off > 0 ? <span className="text-sm font-bold text-gold">{off}% OFF</span> : null}
      </p>
      <button
        type="button"
        onClick={add}
        disabled={stock <= 0}
        className="card-hover__cta mt-3 w-full rounded-full bg-forest py-2.5 text-sm font-semibold text-white transition hover:bg-forest-deep disabled:cursor-not-allowed disabled:bg-[#c8c8c8]"
      >
        {stock <= 0 ? "Out of stock" : added ? "Added" : "Add to Cart"}
      </button>
    </article>
  );
}

export function LatestProducts({ products }: { products: StoreProduct[] }) {
  if (!products.length) return null;

  return (
    <section id="our-products" className="w-full bg-white py-12 md:py-16">
      <div className="container-pad text-center">
        <h2 className="inline-block rounded-md border border-[#d9d9d9] px-4 py-1.5 text-lg font-semibold text-[#1c1c1c] md:text-xl">
          Our Products
        </h2>
        <p className="mt-3 text-sm font-medium text-[#1c1c1c] underline underline-offset-4">
          Browse our collection of products
        </p>
      </div>
      <div className="container-pad mt-8 grid grid-cols-5 gap-3 md:gap-4">
        {products.slice(0, 20).map((product) => (
          <ProductTile key={product._id} product={product} />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Link
          href="/shop?sort=newest"
          className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-forest px-8 text-sm font-semibold transition hover:bg-forest-deep"
          style={{ color: "#ffffff" }}
        >
          View all
        </Link>
      </div>
    </section>
  );
}
