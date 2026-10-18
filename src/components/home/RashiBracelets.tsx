"use client";

import Link from "next/link";
import { useState } from "react";
import type { StoreProduct } from "@/types/product";
import { discountPercent, formatINR, primaryImage, resolveImageUrl } from "@/lib/format";
import { useCartStore } from "@/lib/cart-store";

const SIGNS = [
  { slug: "aries", english: "Aries", hindi: "मेष", name: "Mesh" },
  { slug: "taurus", english: "Taurus", hindi: "वृषभ", name: "Vrishabha" },
  { slug: "gemini", english: "Gemini", hindi: "मिथुन", name: "Mithun" },
  { slug: "cancer", english: "Cancer", hindi: "कर्क", name: "Karka" },
  { slug: "leo", english: "Leo", hindi: "सिंह", name: "Simha" },
  { slug: "virgo", english: "Virgo", hindi: "कन्या", name: "Kanya" },
  { slug: "libra", english: "Libra", hindi: "तुला", name: "Tula" },
  { slug: "scorpio", english: "Scorpio", hindi: "वृश्चिक", name: "Vrishchik" },
  { slug: "sagittarius", english: "Sagittarius", hindi: "धनु", name: "Dhanu" },
  { slug: "capricorn", english: "Capricorn", hindi: "मकर", name: "Makar" },
  { slug: "aquarius", english: "Aquarius", hindi: "कुम्भ", name: "Kumbh" },
  { slug: "pisces", english: "Pisces", hindi: "मीन", name: "Meen" },
] as const;

function signOf(title: string) {
  const text = title.toLowerCase();
  return SIGNS.find(
    (sign) => title.includes(sign.hindi) || text.includes(`(${sign.english.toLowerCase()}`),
  );
}

function stonesOf(title: string) {
  const parts = title.split(/\s[–—-]\s/);
  return parts.length > 1 ? parts.slice(1).join(" · ") : "";
}

function pickOnePerSign(products: StoreProduct[]) {
  const chosen: { sign: (typeof SIGNS)[number]; product: StoreProduct }[] = [];
  for (const sign of SIGNS) {
    const product = products.find((item) => signOf(item.title)?.slug === sign.slug);
    if (product) chosen.push({ sign, product });
  }
  return chosen;
}

export function RashiBracelets({ products }: { products: StoreProduct[] }) {
  const cards = pickOnePerSign(products);
  if (!cards.length) return null;

  return (
    <section id="rashi-bracelets" className="w-full bg-[#fbf8f4] py-12 md:py-16">
      <div className="px-5 md:px-8 xl:px-10">
        <h2 className="font-display text-[1.7rem] font-semibold tracking-[-0.02em] text-[#1c1c1c] md:text-[2rem]">
          Rashi Bracelets Collection
        </h2>
      </div>

      <div className="mt-6 flex gap-4 overflow-x-auto px-5 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-5 md:px-8 xl:px-10 [&::-webkit-scrollbar]:hidden">
        {cards.map(({ sign, product }) => (
          <RashiCard key={sign.slug} sign={sign} product={product} />
        ))}
      </div>
    </section>
  );
}

function RashiCard({
  sign,
  product,
}: {
  sign: (typeof SIGNS)[number];
  product: StoreProduct;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);
  const img = primaryImage(product.images);
  const sale = product.effectiveSalePrice ?? product.salePrice;
  const mrp = product.effectiveMrp ?? product.mrp;
  const off = product.effectiveDiscountPercent ?? product.discountPercent ?? discountPercent(mrp, sale);
  const stock = product.effectiveStock ?? product.totalStock ?? product.quantity;
  const needsVariant = (product.variants || []).some((variant) => variant.isActive);
  const stones = stonesOf(product.title);
  const intention = product.intentions?.[0];
  const rating = product.ratingCount ? product.ratingAvg : undefined;

  function add() {
    if (needsVariant || stock <= 0) return;
    addItem({
      productId: product._id,
      slug: product.slug,
      title: product.title,
      image: img.url,
      unitSalePrice: sale,
      unitMrp: mrp,
      maxQty: stock,
      qty: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <article className="flex w-[250px] shrink-0 flex-col rounded-2xl border border-black/[0.06] bg-white p-3 shadow-[0_8px_24px_rgba(28,28,28,0.05)] sm:w-[270px]">
      <div className="flex items-center gap-2.5 px-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/zodiac/${sign.slug}-cut.webp`}
          alt=""
          className="h-9 w-9 object-contain"
        />
        <div className="min-w-0">
          <p className="truncate font-display text-[0.95rem] font-semibold text-[#1c1c1c]">
            {sign.name} ({sign.english})
          </p>
          <p className="text-[11px] text-[#8a8580]">Rashi Crystal Bracelet</p>
        </div>
      </div>

      <Link href={`/product/${product.slug}`} className="relative mt-3 block overflow-hidden rounded-xl bg-[#f6f3ee]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={resolveImageUrl(img.url)}
          alt={product.title}
          className="h-[168px] w-full object-contain p-3"
        />
        {off > 0 ? (
          <span className="absolute right-2 top-2 rounded-md bg-[#1c2434] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
            Sale
          </span>
        ) : null}
      </Link>

      <div className="mt-3 flex items-center gap-1.5 px-1 text-[11px] text-[#6b6660]">
        {rating ? (
          <span className="inline-flex items-center gap-1 font-semibold text-[#1c1c1c]">
            <span className="text-[#f5a524]">●</span>
            {rating.toFixed(1)}
          </span>
        ) : null}
        {stones ? <span className="truncate">{stones}</span> : null}
      </div>

      {intention ? (
        <p className="mt-2 px-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8a6a2f]">
          {intention}
        </p>
      ) : null}

      <Link
        href={`/product/${product.slug}`}
        className="mt-1 line-clamp-2 px-1 text-[13px] font-medium leading-snug text-[#1c1c1c]"
      >
        {product.title}
      </Link>

      <p className="mt-2 flex items-baseline gap-2 px-1">
        <span className="text-base font-semibold text-[#1c1c1c]">{formatINR(sale)}</span>
        {mrp > sale ? (
          <span className="text-xs text-[#9a9590] line-through">{formatINR(mrp)}</span>
        ) : null}
        {off > 0 ? <span className="text-xs font-semibold text-[#c45c26]">{off}% off</span> : null}
      </p>

      {needsVariant ? (
        <Link
          href={`/product/${product.slug}`}
          className="mt-3 rounded-xl bg-[#1c2434] py-2.5 text-center text-sm font-semibold text-white"
        >
          Add {formatINR(sale)}
        </Link>
      ) : (
        <button
          type="button"
          onClick={add}
          disabled={stock <= 0}
          className="mt-3 rounded-xl bg-[#1c2434] py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-stone-300"
        >
          {stock <= 0 ? "Out of stock" : added ? "Added" : `Add ${formatINR(sale)}`}
        </button>
      )}
    </article>
  );
}
