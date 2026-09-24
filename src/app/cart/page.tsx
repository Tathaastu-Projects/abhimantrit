"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import { formatINR } from "@/lib/format";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const updateQty = useCartStore((s) => s.updateQty);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.subtotal);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="container-pad py-16">
        <div className="skeleton h-40 w-full" />
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="container-pad py-20 text-center">
        <h1 className="font-display text-4xl">Your cart is empty</h1>
        <p className="mt-3 text-ink-soft">Explore the collection and add a sacred piece.</p>
        <Link href="/shop" className="btn btn-primary mt-8">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container-pad py-10 md:py-14">
      <h1 className="font-display text-4xl">Cart</h1>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={`${item.productId}-${item.variantId || "base"}`}
              className="flex gap-4 rounded-2xl border border-[var(--border)] bg-white/50 p-4"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                className="h-24 w-24 rounded-xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <Link href={`/product/${item.slug}`} className="font-medium hover:text-temple">
                  {item.title}
                </Link>
                {item.variantLabel ? (
                  <p className="mt-1 text-sm text-ink-soft">{item.variantLabel}</p>
                ) : null}
                <p className="mt-2 text-sm font-semibold">{formatINR(item.unitSalePrice)}</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className="flex items-center rounded-full border border-[var(--border)]">
                    <button
                      type="button"
                      className="px-3 py-1"
                      onClick={() =>
                        updateQty(item.productId, item.variantId, item.qty - 1)
                      }
                    >
                      −
                    </button>
                    <span className="min-w-6 text-center text-sm">{item.qty}</span>
                    <button
                      type="button"
                      className="px-3 py-1"
                      onClick={() =>
                        updateQty(item.productId, item.variantId, item.qty + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-sale"
                    onClick={() => removeItem(item.productId, item.variantId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <p className="text-sm font-semibold">
                {formatINR(item.unitSalePrice * item.qty)}
              </p>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-3xl border border-[var(--border)] bg-white/60 p-6">
          <h2 className="font-display text-2xl">Order summary</h2>
          <div className="mt-4 flex justify-between text-sm">
            <span className="text-ink-soft">Subtotal</span>
            <span className="font-semibold">{formatINR(subtotal())}</span>
          </div>
          <p className="mt-2 text-xs text-ink-soft">Shipping calculated at checkout. COD available.</p>
          <Link href="/checkout" className="btn btn-primary mt-6 w-full">
            Proceed to checkout
          </Link>
        </aside>
      </div>
    </div>
  );
}
