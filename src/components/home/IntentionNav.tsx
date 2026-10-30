"use client";

import Link from "next/link";
import type { StoreProduct } from "@/types/product";
import { discountPercent, formatINR, hoverLines, primaryImage, resolveImageUrl } from "@/lib/format";
import { useCartStore } from "@/lib/cart-store";
import { CardScroller } from "@/components/home/CardScroller";
import { BagButton, HoverDetails } from "@/components/home/RashiBracelets";

const INTENTIONS = [
  { id: "Peace", label: "Peace", description: "Calm mind & balance" },
  { id: "Wealth", label: "Wealth", description: "Abundance & growth" },
  { id: "Health", label: "Health", description: "Vitality & healing" },
  { id: "Protection", label: "Protection", description: "Shield & strength" },
  { id: "Relationship", label: "Relationship", description: "Harmony & love" },
  { id: "Success", label: "Success", description: "Clarity & progress" },
  { id: "Spirituality", label: "Spirituality", description: "Devotion & depth" },
] as const;

function stonesOf(title: string) {
  const parts = title.split(/\s[–—-]\s/);
  return parts.length > 1 ? parts.slice(1).join(" · ") : "";
}

export function IntentionNav({ products }: { products: Record<string, StoreProduct> }) {
  const cards = INTENTIONS.flatMap((intention) => {
    const product = products[intention.id];
    return product ? [{ intention, product }] : [];
  });
  if (!cards.length) return null;

  return (
    <section id="intentions" className="w-full bg-[#fbf8f4] pt-4 pb-3 md:pt-5 md:pb-4">
      <div className="px-5 md:px-8 xl:px-10">
        <h2 className="font-display text-[1.7rem] font-semibold tracking-[-0.02em] text-[#1c1c1c] md:text-[2rem]">
          Shop By Intention
        </h2>
      </div>

      <CardScroller className="flex gap-4 overflow-x-auto px-5 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-5 md:px-8 xl:px-10 [&::-webkit-scrollbar]:hidden">
        {cards.map(({ intention, product }) => (
          <IntentionCard key={intention.id} intention={intention} product={product} />
        ))}
      </CardScroller>
    </section>
  );
}

function IntentionCard({
  intention,
  product,
}: {
  intention: (typeof INTENTIONS)[number];
  product: StoreProduct;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const inCart = useCartStore((s) => s.items.some((i) => i.productId === product._id));
  const img = primaryImage(product.images);
  const sale = product.effectiveSalePrice ?? product.salePrice;
  const mrp = product.effectiveMrp ?? product.mrp;
  const off = product.effectiveDiscountPercent ?? product.discountPercent ?? discountPercent(mrp, sale);
  const stock = product.effectiveStock ?? product.totalStock ?? product.quantity;
  const activeVariant = (product.variants || []).find((variant) => variant.isActive);
  const stones = stonesOf(product.title);
  const rating = product.ratingCount ? product.ratingAvg : undefined;
  const details = hoverLines(product);
  const bagLabel = inCart ? "In cart" : stock <= 0 ? "Out of stock" : "Add to bag";

  function add(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (stock <= 0 || inCart) return;
    addItem({
      productId: product._id,
      slug: product.slug,
      title: product.title,
      image: img.url,
      variantId: activeVariant?._id || null,
      variantLabel: activeVariant?.label,
      unitSalePrice: activeVariant?.salePrice || sale,
      unitMrp: activeVariant?.mrp || mrp,
      maxQty: activeVariant?.quantity || stock,
      qty: 1,
    });
  }

  return (
    <article className="flex w-[calc(50%-0.5rem)] shrink-0 flex-col rounded-2xl border border-black/[0.06] bg-white p-3 shadow-[0_8px_24px_rgba(28,28,28,0.05)] sm:w-[calc(33.333%-0.67rem)] md:w-[calc(25%-0.9rem)] lg:w-[calc(20%-1rem)]">
      <div className="flex items-center gap-2.5 px-1">
        {/* Intention icon uses product photo from backend catalog — no frontend static assets */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={resolveImageUrl(img.url)}
          alt=""
          className="h-9 w-9 rounded-full object-cover"
        />
        <div className="min-w-0">
          <p className="truncate font-display text-[0.95rem] font-semibold text-[#1c1c1c]">{intention.label}</p>
          <p className="truncate text-[11px] text-[#8a8580]">{intention.description}</p>
        </div>
      </div>

      <div className="card-hover relative mt-3 overflow-hidden rounded-xl bg-[#f6f3ee]">
        <Link href={`/product/${product.slug}`} className="block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={resolveImageUrl(img.url)}
            alt={product.title}
            className="block aspect-square w-full object-cover object-center"
          />
        </Link>
        {off > 0 ? (
          <span className="absolute right-2 top-2 z-[2] rounded-md bg-[#1c2434] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
            Sale
          </span>
        ) : null}
        <HoverDetails labels={details} />
        <BagButton label={bagLabel} onClick={add} disabled={stock <= 0 || inCart} />
      </div>

      <div className="mt-3 flex items-center gap-1.5 px-1 text-[11px] text-[#6b6660]">
        {rating ? (
          <span className="inline-flex items-center gap-1 font-semibold text-[#1c1c1c]">
            <span className="text-[#f5a524]">●</span>
            {rating.toFixed(1)}
          </span>
        ) : null}
        {stones ? <span className="truncate">{stones}</span> : null}
      </div>

      <Link
        href={`/product/${product.slug}`}
        className="mt-1 line-clamp-2 px-1 text-[13px] font-medium leading-snug text-[#1c1c1c]"
      >
        {product.title}
      </Link>

      <p className="mt-2 flex items-baseline gap-2 px-1">
        <span className="text-base font-semibold text-[#1c1c1c]">{formatINR(sale)}</span>
        {mrp > sale ? <span className="text-xs text-[#9a9590] line-through">{formatINR(mrp)}</span> : null}
        {off > 0 ? <span className="text-xs font-semibold text-[#c45c26]">{off}% off</span> : null}
      </p>

      <div className="card-hover__cta mt-auto pt-2">
        {inCart ? (
          <Link href="/cart" className="btn btn-primary w-full text-center">
            In cart
          </Link>
        ) : (
          <button
            type="button"
            onClick={add}
            disabled={stock <= 0}
            className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
          >
            {stock <= 0 ? "Out of stock" : "Add To Cart"}
          </button>
        )}
      </div>
    </article>
  );
}
