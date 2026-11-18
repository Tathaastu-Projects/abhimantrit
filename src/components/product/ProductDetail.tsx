"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { StoreProduct } from "@/types/product";
import { PriceBlock } from "@/components/product/PriceBlock";
import { productHref, productUrlKey, resolveImageUrl } from "@/lib/format";
import { useCartStore } from "@/lib/cart-store";
import { requireCheckoutLogin } from "@/lib/requireCheckoutLogin";
import { ProductCarousel } from "@/components/home/ProductCarousel";
import { WishlistButton } from "@/components/product/WishlistButton";
import { ProductReviews } from "@/components/product/ProductReviews";
import { FaqAccordion } from "@/components/home/FaqAccordion";
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
  const productFaqs = (product.faqs || []).filter(
    (f) => String(f?.question || "").trim() && String(f?.answer || "").trim(),
  );
  const addItem = useCartStore((s) => s.addItem);
  const updateQty = useCartStore((s) => s.updateQty);
  const router = useRouter();
  const pathname = usePathname();
  const activeVariants = useMemo(
    () => (product.variants || []).filter((v) => v.isActive),
    [product.variants],
  );
  const [variantId, setVariantId] = useState<string | undefined>(activeVariants[0]?._id);
  const [msg, setMsg] = useState("");

  // Keep address bar on SKU URL even if user opened an old title link
  useEffect(() => {
    const want = productHref(product);
    if (!want || !pathname) return;
    if (pathname.replace(/\/$/, "") !== want.replace(/\/$/, "")) {
      router.replace(want);
    }
  }, [pathname, product, router]);

  const selected = activeVariants.find((v) => v._id === variantId);
  const cartLine = useCartStore((s) =>
    s.items.find(
      (i) =>
        i.productId === product._id &&
        (i.variantId || null) === (selected?._id || null),
    ) || null,
  );
  const inCart = Boolean(cartLine);
  const cartQty = cartLine?.qty || 0;
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
    if (goCheckout && !requireCheckoutLogin("/checkout")) {
      setMsg("Please sign in to continue to checkout");
      return;
    }
    if (inCart) {
      window.location.href = goCheckout ? "/checkout" : "/cart";
      return;
    }
    addItem({
      productId: product._id,
      slug: productUrlKey(product) || product.slug,
      title: product.title,
      image: resolveImageUrl(activeImage),
      variantId: selected?._id || null,
      variantLabel: selected?.label,
      unitSalePrice: sale,
      unitMrp: mrp,
      qty: 1,
      maxQty: stock,
    });
    setMsg(goCheckout ? "Redirecting…" : "Added to cart");
    if (goCheckout) window.location.href = "/checkout";
  }

  return (
    <div className="w-full bg-white">
      <div className="w-full px-3 py-3 sm:px-4 md:px-5 lg:px-6 xl:px-8">
        <nav className="mb-2 truncate text-[12px] text-ink-soft">
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

        {/* Two columns: gallery left, buy box + description right — each scrolls in viewport */}
        <div className="grid w-full items-start gap-4 lg:grid-cols-2 lg:gap-6 xl:gap-8">
          {/* Gallery */}
          <div className="flex w-full min-w-0 items-start gap-2 sm:gap-2.5 lg:sticky lg:top-20 lg:max-h-[calc(100vh-5.5rem)] lg:overflow-y-auto lg:overscroll-contain lg:pr-1">
            <div className="flex min-h-0 min-w-0 flex-1 items-center justify-center overflow-hidden rounded-2xl bg-[#f6f3ee] ring-1 ring-black/[0.04] aspect-square max-h-[min(58vh,480px)] lg:max-h-[min(70vh,520px)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resolveImageUrl(activeImage)}
                alt={product.title}
                className="max-h-full max-w-full object-contain object-center"
              />
            </div>

            {images.length > 1 ? (
              <div className="flex max-h-[min(58vh,480px)] w-[3.75rem] shrink-0 flex-col gap-1.5 overflow-y-auto overscroll-contain sm:w-[4.25rem] sm:gap-2 lg:max-h-[min(70vh,520px)]">
                {images.slice(0, 8).map((img) => (
                  <button
                    key={img.url}
                    type="button"
                    onClick={() => setActiveImage(img.url)}
                    className={cn(
                      "flex aspect-square w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f6f3ee] ring-2 transition",
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

          {/* Details + description (right) */}
          <div className="flex min-w-0 w-full flex-col lg:sticky lg:top-20 lg:max-h-[calc(100vh-5.5rem)] lg:overflow-y-auto lg:overscroll-contain lg:pr-1">
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

            <h1 className="mt-1.5 font-display text-[1.4rem] leading-[1.2] tracking-tight text-ink md:text-[1.65rem] xl:text-[1.8rem]">
              {product.title}
            </h1>
            {product.sku ? (
              <p className="mt-1 text-xs font-medium tracking-wide text-ink-soft">
                SKU: <span className="font-mono text-ink">{product.sku}</span>
              </p>
            ) : null}

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
              <p className="mt-2 max-w-xl text-[13px] leading-snug text-ink-soft">
                {product.shortDescription}
              </p>
            ) : null}

            <div className="mt-2.5 border-y border-[var(--border)] py-2">
              <PriceBlock mrp={mrp} salePrice={sale} discount={discount} size="md" />
              <p className="mt-1 text-[11px] text-ink-soft">Inclusive of all taxes · Secure checkout</p>
            </div>

            {activeVariants.length ? (
              <div className="mt-2.5">
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
                "mt-2.5 inline-flex items-center gap-2 rounded-full px-2.5 py-0.5 text-xs font-semibold",
                outOfStock ? "bg-sale/10 text-sale" : "bg-forest/10 text-forest",
              )}
            >
              <span className={cn("h-1.5 w-1.5 rounded-full", outOfStock ? "bg-sale" : "bg-forest")} />
              {outOfStock ? "Out of stock" : stock <= 5 ? `Only ${stock} left` : "In stock · Ready to ship"}
            </p>

            <div className="mt-2.5 flex flex-wrap items-center gap-2">
              {inCart ? (
                <div
                  className="btn btn-primary flex h-10 min-w-[148px] items-center justify-between gap-1 px-2"
                  role="group"
                  aria-label="Cart quantity"
                >
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-full text-base leading-none transition hover:bg-white/15"
                    aria-label="Decrease quantity"
                    onClick={() => updateQty(product._id, selected?._id || null, cartQty - 1)}
                  >
                    −
                  </button>
                  <span className="min-w-[1.5rem] text-center text-sm font-semibold tabular-nums">
                    {cartQty}
                  </span>
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-full text-base leading-none transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Increase quantity"
                    disabled={cartQty >= (cartLine?.maxQty ?? stock ?? 99)}
                    onClick={() => updateQty(product._id, selected?._id || null, cartQty + 1)}
                  >
                    +
                  </button>
                </div>
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

            <div className="mt-3 grid grid-cols-3 gap-2">
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

            {product.description ? (
              <section className="mt-4 border-t border-[var(--border)] pt-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-forest">
                  The story
                </p>
                <h2 className="mt-0.5 font-display text-xl text-ink md:text-2xl">About this piece</h2>
                <div className="mt-2 space-y-2 text-[13px] leading-relaxed text-ink-soft whitespace-pre-wrap md:text-[14px]">
                  {product.description}
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </div>

      <section className="w-full border-y border-[var(--border)] bg-[#f7f4ef]">
        <div className="mx-auto grid w-full max-w-6xl items-start gap-5 px-3 py-5 sm:px-4 md:grid-cols-2 md:gap-6 md:px-5 md:py-6 lg:px-6">
          <div className="min-w-0">
            {productFaqs.length ? (
              <FaqAccordion faqs={productFaqs} compact embedded />
            ) : (
              <div className="min-w-0">
                <h2 className="font-display text-xl text-ink md:text-2xl">FAQs</h2>
                <p className="mt-0.5 text-[12px] text-ink-soft">No product FAQs yet.</p>
              </div>
            )}
          </div>
          <div className="min-w-0 border-t border-[var(--border)] pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
            <ProductReviews
              slug={product.slug}
              ratingAvg={product.ratingAvg}
              ratingCount={product.ratingCount}
              embedded
            />
          </div>
        </div>
      </section>

      <div className="border-t border-[var(--border)] bg-[#faf8f5]">
        <ProductCarousel title="You may also like" products={related} limit={4} variant="related" />
      </div>
    </div>
  );
}
