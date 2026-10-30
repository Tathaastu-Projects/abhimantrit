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
  const inCart = useCartStore((s) =>
    s.items.some(
      (i) =>
        i.productId === product._id &&
        (i.variantId || null) === (selected?._id || null),
    ),
  );
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
    if (inCart) {
      window.location.href = goCheckout ? "/checkout" : "/cart";
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
      <div className="w-full px-3 py-4 sm:px-4 md:px-5 md:py-5 lg:px-6 xl:px-8">
        <nav className="mb-3 truncate text-[12px] text-ink-soft">
          <Link href="/" className="transition hover:text-forest">
            Home
          </Link>
          <span className="mx-1.5 opacity-40">/</span>
          <Link href={`/shop/${product.category}`} className="capitalize transition hover:text-forest">
            {product.category}
          </Link>
          <span className="mx-1.5 opacity-40">/</span>
          <span className="text-ink">{product.title}</span>
        </nav>

        <div className="grid w-full items-start gap-4 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-6 lg:items-center xl:gap-8">
          {/* Gallery — frame hugs image (no blank side bars), full image, no zoom */}
          <div className="mx-auto w-fit max-w-full lg:mx-0">
            <div className="w-fit max-w-full overflow-hidden rounded-2xl bg-[#f6f3ee] ring-1 ring-black/[0.04]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resolveImageUrl(activeImage)}
                alt={product.title}
                className="block h-auto max-h-[min(52vh,420px)] w-auto max-w-full object-contain sm:max-h-[min(56vh,460px)]"
              />
            </div>
            {images.length > 1 ? (
              <div className="mt-2.5 flex max-w-full gap-2 overflow-x-auto pb-1">
                {images.slice(0, 8).map((img) => (
                  <button
                    key={img.url}
                    type="button"
                    onClick={() => setActiveImage(img.url)}
                    className={cn(
                      "flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f6f3ee] ring-2 transition sm:h-16 sm:w-16",
                      activeImage === img.url
                        ? "ring-forest"
                        : "ring-transparent hover:ring-black/10",
                    )}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={resolveImageUrl(img.url)}
                      alt={img.alt || product.title}
                      className="max-h-full max-w-full object-contain object-center"
                    />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {/* Buy box takes remaining width */}
          <div className="flex min-w-0 w-full flex-col justify-center">
            <div className="flex flex-wrap gap-1.5">
              {product.isBestSeller ? (
                <span className="rounded-full bg-forest px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-white">
                  Bestseller
                </span>
              ) : null}
              {product.isFeatured ? (
                <span className="rounded-full bg-[#f3efe6] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-gold">
                  Featured
                </span>
              ) : null}
              {product.isNewArrival ? (
                <span className="rounded-full bg-mist px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-ink">
                  New
                </span>
              ) : null}
            </div>

            <h1 className="mt-2 font-display text-[1.45rem] leading-[1.2] tracking-tight text-ink md:text-[1.75rem] xl:text-[1.9rem]">
              {product.title}
            </h1>

            {(product.ratingCount || 0) > 0 ? (
              <p className="mt-1.5 flex items-center gap-2 text-xs text-ink-soft">
                <span className="stars text-sm">
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
              <p className="mt-2 line-clamp-2 max-w-xl text-[13px] leading-snug text-ink-soft">
                {product.shortDescription}
              </p>
            ) : null}

            <div className="mt-3 border-y border-[var(--border)] py-2.5">
              <PriceBlock mrp={mrp} salePrice={sale} discount={discount} size="md" />
              <p className="mt-1 text-[11px] text-ink-soft">Inclusive of all taxes · Secure checkout</p>
            </div>

            {activeVariants.length ? (
              <div className="mt-3">
                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                  Select option
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeVariants.map((v) => (
                    <button
                      key={v._id || v.label}
                      type="button"
                      onClick={() => setVariantId(v._id)}
                      className={cn(
                        "rounded-full border px-3.5 py-1.5 text-xs font-medium transition",
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
                "mt-3 inline-flex items-center gap-2 rounded-full px-2.5 py-0.5 text-xs font-semibold",
                outOfStock ? "bg-sale/10 text-sale" : "bg-forest/10 text-forest",
              )}
            >
              <span className={cn("h-1.5 w-1.5 rounded-full", outOfStock ? "bg-sale" : "bg-forest")} />
              {outOfStock ? "Out of stock" : stock <= 5 ? `Only ${stock} left` : "In stock · Ready to ship"}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              {!inCart ? (
                <div className="flex h-10 items-center rounded-full border border-[var(--border)] bg-white">
                  <button type="button" className="h-full px-3 text-base" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                    −
                  </button>
                  <span className="min-w-8 text-center text-sm font-semibold">{qty}</span>
                  <button
                    type="button"
                    className="h-full px-3 text-base"
                    onClick={() => setQty((q) => Math.min(stock || 99, q + 1))}
                  >
                    +
                  </button>
                </div>
              ) : null}
              {inCart ? (
                <Link href="/cart" className="btn btn-primary h-10 min-w-[140px] px-5 text-center text-xs leading-10">
                  In cart — View bag
                </Link>
              ) : (
                <button
                  type="button"
                  disabled={outOfStock}
                  onClick={() => addToCart(false)}
                  className="btn btn-primary h-10 min-w-[140px] px-5 text-xs disabled:opacity-50"
                >
                  Add to Cart
                </button>
              )}
              <button
                type="button"
                disabled={outOfStock}
                onClick={() => addToCart(true)}
                className="btn btn-ghost h-10 px-5 text-xs disabled:opacity-50"
              >
                {inCart ? "Checkout" : "Buy Now"}
              </button>
              <WishlistButton productId={product._id} />
            </div>
            {msg ? <p className="mt-2 text-xs font-medium text-forest">{msg}</p> : null}

            <div className="mt-4 grid grid-cols-3 gap-2">
              {TRUST.map((t) => (
                <div
                  key={t.label}
                  className="rounded-xl border border-[var(--border)] bg-[#faf8f5] px-2.5 py-2"
                >
                  <p className="text-[11px] font-semibold text-ink md:text-xs">{t.label}</p>
                  <p className="mt-0.5 text-[10px] text-ink-soft">{t.hint}</p>
                </div>
              ))}
            </div>

            {product.intentions?.length ? (
              <div className="mt-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                  Intentions
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {product.intentions.map((i) => (
                    <Link
                      key={i}
                      href={`/intention/${i}`}
                      className="rounded-full border border-[var(--border)] bg-white px-3 py-1 text-xs text-ink transition hover:border-forest/40 hover:text-forest"
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
          <section className="mt-8 border-t border-[var(--border)] pt-6 md:mt-10 md:pt-8">
            <div className="grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-forest">The story</p>
                <h2 className="mt-1 font-display text-2xl text-ink md:text-3xl">About this piece</h2>
              </div>
              <div className="max-w-3xl space-y-3 text-[14px] leading-relaxed text-ink-soft whitespace-pre-wrap md:text-[15px]">
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
