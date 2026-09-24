"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { StoreProduct } from "@/types/product";
import { PriceBlock } from "@/components/product/PriceBlock";
import { resolveImageUrl } from "@/lib/format";
import { useCartStore } from "@/lib/cart-store";
import { ProductCarousel } from "@/components/home/ProductCarousel";
import { WishlistButton } from "@/components/product/WishlistButton";
import { ProductReviews } from "@/components/product/ProductReviews";
import { cn } from "@/lib/cn";

export function ProductDetail({
  product,
  related,
}: {
  product: StoreProduct;
  related: StoreProduct[];
}) {
  const addItem = useCartStore((s) => s.addItem);
  const activeVariants = useMemo(
    () => (product.variants || []).filter((v) => v.isActive),
    [product.variants],
  );
  const [variantId, setVariantId] = useState<string | undefined>(activeVariants[0]?._id);
  const [qty, setQty] = useState(1);
  const [msg, setMsg] = useState("");

  const selected = activeVariants.find((v) => v._id === variantId);
  const images = product.images?.length
    ? product.images
    : [{ url: "/placeholder-product.svg", alt: product.title, isPrimary: true }];
  const [activeImage, setActiveImage] = useState(
    images.find((i) => i.isPrimary)?.url || images[0].url,
  );

  const sale = selected?.salePrice ?? product.effectiveSalePrice ?? product.salePrice;
  const mrp = selected?.mrp ?? product.effectiveMrp ?? product.mrp;
  const stock = selected?.quantity ?? product.effectiveStock ?? product.totalStock ?? product.quantity;
  const discount = product.effectiveDiscountPercent ?? product.discountPercent;
  const outOfStock = stock <= 0;

  function addToCart(goCheckout = false) {
    if (activeVariants.length && !selected) {
      setMsg("Please select a variant");
      return;
    }
    if (outOfStock) {
      setMsg("This item is out of stock");
      return;
    }
    addItem({
      productId: product._id,
      slug: product.slug,
      title: product.title,
      image: resolveImageUrl(activeImage),
      variantId: selected?._id || null,
      variantLabel: selected?.label,
      unitSalePrice: sale,
      unitMrp: mrp,
      qty,
      maxQty: stock,
    });
    setMsg(goCheckout ? "Redirecting…" : "Added to cart");
    if (goCheckout) window.location.href = "/checkout";
  }

  return (
    <div className="w-full">
      {/* Main product — full viewport width */}
      <div className="w-full px-4 py-8 sm:px-6 md:px-8 md:py-10 lg:px-10">
        <nav className="mb-6 text-sm text-ink-soft">
          <Link href="/" className="hover:text-pink">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/shop/${product.category}`} className="capitalize hover:text-pink">
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{product.title}</span>
        </nav>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 xl:gap-16">
          {/* Gallery */}
          <div className="min-w-0">
            <div className="overflow-hidden rounded-2xl bg-[#f3f2ef] ring-1 ring-black/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resolveImageUrl(activeImage)}
                alt={product.title}
                className="aspect-square w-full object-cover"
              />
            </div>
            {images.length > 1 ? (
              <div className="mt-4 grid grid-cols-5 gap-2.5 sm:grid-cols-6 md:grid-cols-7">
                {images.slice(0, 7).map((img) => (
                  <button
                    key={img.url}
                    type="button"
                    onClick={() => setActiveImage(img.url)}
                    className={cn(
                      "aspect-square overflow-hidden rounded-xl border-2 bg-[#f3f2ef] transition",
                      activeImage === img.url
                        ? "border-pink"
                        : "border-transparent hover:border-black/10",
                    )}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={resolveImageUrl(img.url)}
                      alt={img.alt || product.title}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {/* Info */}
          <div className="min-w-0 lg:sticky lg:top-28">
            <div className="flex flex-wrap gap-2">
              {product.isBestSeller ? (
                <span className="rounded-full bg-forest/10 px-3 py-1 text-xs font-semibold text-forest">
                  Bestseller
                </span>
              ) : null}
              {product.isFeatured ? (
                <span className="rounded-full bg-pink-soft px-3 py-1 text-xs font-semibold text-pink">
                  Featured
                </span>
              ) : null}
            </div>

            <h1 className="mt-3 font-display text-3xl leading-tight text-ink md:text-4xl xl:text-5xl">
              {product.title}
            </h1>

            {(product.ratingCount || 0) > 0 ? (
              <p className="mt-2 text-sm text-ink-soft">
                <span className="text-[#f5a623]">★</span> {product.ratingAvg?.toFixed(1)} ·{" "}
                {product.ratingCount} reviews
              </p>
            ) : null}

            {product.shortDescription ? (
              <p className="mt-4 text-base leading-relaxed text-ink-soft">{product.shortDescription}</p>
            ) : null}

            <div className="mt-6">
              <PriceBlock mrp={mrp} salePrice={sale} discount={discount} size="lg" />
            </div>

            {activeVariants.length ? (
              <div className="mt-8">
                <p className="mb-3 text-sm font-semibold text-ink">Select option</p>
                <div className="flex flex-wrap gap-2">
                  {activeVariants.map((v) => (
                    <button
                      key={v._id || v.label}
                      type="button"
                      onClick={() => setVariantId(v._id)}
                      className={cn(
                        "rounded-full border px-4 py-2.5 text-sm font-medium transition",
                        variantId === v._id
                          ? "border-forest bg-forest text-white"
                          : "border-[var(--border)] bg-white hover:border-forest/40",
                      )}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <p className={`mt-6 text-sm font-semibold ${outOfStock ? "text-sale" : "text-forest"}`}>
              {outOfStock ? "Out of stock" : stock <= 5 ? `Only ${stock} left` : "In stock"}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-full border border-[var(--border)] bg-white">
                <button type="button" className="px-4 py-2.5 text-lg" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                  −
                </button>
                <span className="min-w-8 text-center text-sm font-semibold">{qty}</span>
                <button
                  type="button"
                  className="px-4 py-2.5 text-lg"
                  onClick={() => setQty((q) => Math.min(stock || 99, q + 1))}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                disabled={outOfStock}
                onClick={() => addToCart(false)}
                className="btn btn-primary min-w-[160px] disabled:opacity-50"
              >
                Add to Cart
              </button>
              <button
                type="button"
                disabled={outOfStock}
                onClick={() => addToCart(true)}
                className="btn btn-ghost disabled:opacity-50"
              >
                Buy Now
              </button>
              <WishlistButton productId={product._id} />
            </div>
            {msg ? <p className="mt-3 text-sm text-forest">{msg}</p> : null}

            {product.intentions?.length ? (
              <div className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brass">Intentions</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.intentions.map((i) => (
                    <Link
                      key={i}
                      href={`/intention/${i}`}
                      className="rounded-full border border-[var(--border)] bg-white px-3.5 py-1.5 text-sm hover:border-pink/40 hover:text-pink"
                    >
                      {i}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            {product.description ? (
              <div className="mt-10 border-t border-[var(--border)] pt-8">
                <h2 className="font-display text-2xl text-ink">About this piece</h2>
                <div className="mt-3 space-y-3 whitespace-pre-wrap text-sm leading-relaxed text-ink-soft md:text-[15px]">
                  {product.description}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <ProductReviews
        slug={product.slug}
        ratingAvg={product.ratingAvg}
        ratingCount={product.ratingCount}
      />

      <ProductCarousel title="You may also like" products={related} limit={4} variant="related" />
    </div>
  );
}
