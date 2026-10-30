"use client";

import Link from "next/link";
import { useState, type MouseEvent } from "react";
import type { StoreProduct } from "@/types/product";
import { discountPercent, formatINR, hoverLines, primaryImage } from "@/lib/format";
import { useCartStore } from "@/lib/cart-store";
import { CardScroller } from "@/components/home/CardScroller";
import { BagButton, HoverDetails } from "@/components/home/RashiBracelets";

function ProductTile({ product }: { product: StoreProduct }) {
  const addItem = useCartStore((s) => s.addItem);
  const inCart = useCartStore((s) => s.items.some((i) => i.productId === product._id));
  const img = primaryImage(product.images);
  const [imgSrc, setImgSrc] = useState(img.url);
  const sale = product.effectiveSalePrice ?? product.salePrice;
  const mrp = product.effectiveMrp ?? product.mrp;
  const off = product.effectiveDiscountPercent ?? product.discountPercent ?? discountPercent(mrp, sale);
  const stock = product.effectiveStock ?? product.totalStock ?? product.quantity;
  const variant = (product.variants || []).find((item) => item.isActive);
  const details = hoverLines(product);
  const bagLabel = inCart ? "In cart" : stock <= 0 ? "Out of stock" : "Add to bag";

  function add(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    if (stock <= 0 || inCart) return;
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
  }

  return (
    <article className="flex w-[250px] shrink-0 flex-col rounded-2xl border border-[#ececec] bg-white p-3 shadow-[0_8px_24px_rgba(0,0,0,0.04)] sm:w-[270px]">
      <div className="card-hover relative overflow-hidden rounded-xl bg-[#f7f7f7]">
        <Link href={`/product/${product.slug}`} className="block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgSrc}
            alt={img.alt || product.title}
            loading="lazy"
            decoding="async"
            className="block aspect-square w-full object-cover object-center"
            onError={() => setImgSrc("/placeholder-product.svg")}
          />
        </Link>
        <HoverDetails labels={details} />
        <BagButton label={bagLabel} onClick={add} disabled={stock <= 0 || inCart} />
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
      {inCart ? (
        <Link href="/cart" className="card-hover__cta mt-auto pt-2 btn btn-primary w-full text-center">
          In cart
        </Link>
      ) : (
        <button
          type="button"
          onClick={add}
          disabled={stock <= 0}
          className="card-hover__cta mt-auto pt-2 btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
        >
          {stock <= 0 ? "Out of stock" : "Add To Cart"}
        </button>
      )}
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
      <CardScroller className="flex gap-4 overflow-x-auto px-5 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-5 md:px-8 xl:px-10 [&::-webkit-scrollbar]:hidden">
        {products.slice(0, 20).map((product) => (
          <ProductTile key={product._id} product={product} />
        ))}
      </CardScroller>
      <div className="mt-8 flex justify-center">
        <Link href="/shop?sort=newest" className="btn btn-primary min-w-[180px] px-10">
          View all
        </Link>
      </div>
    </section>
  );
}
