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

const TRUST = [
  { label: "Lab certified", hint: "Authenticity checked" },
  { label: "Secure checkout", hint: "Encrypted payments" },
  { label: "Pan-India delivery", hint: "Careful packaging" },
];

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
    <div className="w-full bg-white">
      <div className="w-full px-4 py-8 sm:px-6 md:px-8 md:py-12 lg:px-10">
        <nav className="mb-8 text-[13px] text-ink-soft">
          <Link href="/" className="transition hover:text-pink">
            Home
          </Link>
          <span className="mx-2 opacity-40">/</span>
          <Link href={`/shop/${product.category}`} className="capitalize transition hover:text-pink">
            {product.category}
          </Link>
          <span className="mx-2 opacity-40">/</span>
          <span className="text-ink">{product.title}</span>
        </nav>

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          {/* Gallery */}
          <div className="min-w-0">
            <div className="overflow-hidden rounded-[1.35rem] bg-[#f6f3ee] shadow-[0_20px_50px_rgba(15,61,46,0.08)] ring-1 ring-black/[0.04]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resolveImageUrl(activeImage)}
                alt={product.title}
                className="aspect-square w-full object-contain object-center p-4 md:p-8"
              />
            </div>
            {images.length > 1 ? (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                {images.slice(0, 8).map((img) => (
                  <button
                    key={img.url}
                    type="button"
                    onClick={() => setActiveImage(img.url)}
                    className={cn(
                      "h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-2xl bg-[#f6f3ee] ring-2 transition",
                      activeImage === img.url
                        ? "ring-pink"
                        : "ring-transparent hover:ring-black/10",
                    )}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={resolveImageUrl(img.url)}
                      alt={img.alt || product.title}
                      className="h-full w-full object-contain object-center p-1.5"
                    />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {/* Buy box */}
          <div className="min-w-0 lg:pt-2">
            <div className="flex flex-wrap gap-2">
              {product.isBestSeller ? (
                <span className="rounded-full bg-forest px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-white">
                  Bestseller
                </span>
              ) : null}
              {product.isFeatured ? (
                <span className="rounded-full bg-pink-soft px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-pink">
                  Featured
                </span>
              ) : null}
              {product.isNewArrival ? (
                <span className="rounded-full bg-mist px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-ink">
                  New
                </span>
              ) : null}
            </div>

            <h1 className="mt-4 font-display text-[2rem] leading-[1.15] tracking-tight text-ink md:text-4xl xl:text-[2.75rem]">
              {product.title}
            </h1>

            {(product.ratingCount || 0) > 0 ? (
              <p className="mt-3 flex items-center gap-2.5 text-sm text-ink-soft">
                <span className="stars text-[1.15rem]">
                  <span>{"★".repeat(Math.round(product.ratingAvg || 0))}</span>
                  <span className="stars__empty">
                    {"★".repeat(5 - Math.round(product.ratingAvg || 0))}
                  </span>
                </span>
                <span className="font-medium">
                  {product.ratingAvg?.toFixed(1)} · {product.ratingCount} reviews
                </span>
              </p>
            ) : null}

            {product.shortDescription ? (
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-soft">
                {product.shortDescription}
              </p>
            ) : null}

            <div className="mt-7 border-y border-[var(--border)] py-5">
              <PriceBlock mrp={mrp} salePrice={sale} discount={discount} size="lg" />
              <p className="mt-2 text-xs text-ink-soft">Inclusive of all taxes · Secure checkout</p>
            </div>

            {activeVariants.length ? (
              <div className="mt-7">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
                  Select option
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {activeVariants.map((v) => (
                    <button
                      key={v._id || v.label}
                      type="button"
                      onClick={() => setVariantId(v._id)}
                      className={cn(
                        "rounded-full border px-5 py-2.5 text-sm font-medium transition",
                        variantId === v._id
                          ? "border-forest bg-forest text-white shadow-sm"
                          : "border-[var(--border)] bg-white text-ink hover:border-forest/30",
                      )}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <p
              className={cn(
                "mt-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold",
                outOfStock ? "bg-sale/10 text-sale" : "bg-forest/10 text-forest",
              )}
            >
              <span className={cn("h-2 w-2 rounded-full", outOfStock ? "bg-sale" : "bg-forest")} />
              {outOfStock ? "Out of stock" : stock <= 5 ? `Only ${stock} left` : "In stock · Ready to ship"}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex h-12 items-center rounded-full border border-[var(--border)] bg-white">
                <button type="button" className="h-full px-4 text-lg" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                  −
                </button>
                <span className="min-w-10 text-center text-sm font-semibold">{qty}</span>
                <button
                  type="button"
                  className="h-full px-4 text-lg"
                  onClick={() => setQty((q) => Math.min(stock || 99, q + 1))}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                disabled={outOfStock}
                onClick={() => addToCart(false)}
                className="btn btn-primary h-12 min-w-[180px] disabled:opacity-50"
              >
                Add to Cart
              </button>
              <button
                type="button"
                disabled={outOfStock}
                onClick={() => addToCart(true)}
                className="btn btn-ghost h-12 disabled:opacity-50"
              >
                Buy Now
              </button>
              <WishlistButton productId={product._id} />
            </div>
            {msg ? <p className="mt-3 text-sm font-medium text-forest">{msg}</p> : null}

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {TRUST.map((t) => (
                <div
                  key={t.label}
                  className="rounded-2xl border border-[var(--border)] bg-[#faf8f5] px-3.5 py-3"
                >
                  <p className="text-sm font-semibold text-ink">{t.label}</p>
                  <p className="mt-0.5 text-xs text-ink-soft">{t.hint}</p>
                </div>
              ))}
            </div>

            {product.intentions?.length ? (
              <div className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
                  Intentions
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.intentions.map((i) => (
                    <Link
                      key={i}
                      href={`/intention/${i}`}
                      className="rounded-full border border-[var(--border)] bg-white px-4 py-1.5 text-sm text-ink transition hover:border-pink/40 hover:text-pink"
                    >
                      {i}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {product.description ? (
          <section className="mt-14 border-t border-[var(--border)] pt-12 md:mt-16 md:pt-14">
            <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-14">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-pink">The story</p>
                <h2 className="mt-2 font-display text-3xl text-ink md:text-4xl">About this piece</h2>
              </div>
              <div className="max-w-3xl space-y-4 text-[15px] leading-[1.75] text-ink-soft whitespace-pre-wrap md:text-base">
                {product.description}
              </div>
            </div>
          </section>
        ) : null}
      </div>

      <ProductReviews
        slug={product.slug}
        ratingAvg={product.ratingAvg}
        ratingCount={product.ratingCount}
      />

      <div className="border-t border-[var(--border)] bg-[#faf8f5]">
        <ProductCarousel title="You may also like" products={related} limit={4} variant="related" />
      </div>
    </div>
  );
}
