"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  productId: string;
  slug: string;
  title: string;
  image: string;
  variantId?: string | null;
  variantLabel?: string;
  unitSalePrice: number;
  unitMrp: number;
  qty: number;
  maxQty?: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty"> & { qty?: number }) => void;
  removeItem: (productId: string, variantId?: string | null) => void;
  updateQty: (productId: string, variantId: string | null | undefined, qty: number) => void;
  clear: () => void;
  count: () => number;
  subtotal: () => number;
};

function sameLine(a: CartItem, productId: string, variantId?: string | null) {
  return a.productId === productId && (a.variantId || null) === (variantId || null);
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const qty = item.qty ?? 1;
        set((state) => {
          const existing = state.items.find((i) =>
            sameLine(i, item.productId, item.variantId),
          );
          if (existing) {
            const nextQty = Math.min(
              existing.qty + qty,
              existing.maxQty ?? item.maxQty ?? 99,
            );
            return {
              items: state.items.map((i) =>
                sameLine(i, item.productId, item.variantId)
                  ? { ...i, qty: nextQty }
                  : i,
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                ...item,
                qty: Math.min(qty, item.maxQty ?? 99),
              },
            ],
          };
        });
      },
      removeItem: (productId, variantId) => {
        set((state) => ({
          items: state.items.filter((i) => !sameLine(i, productId, variantId)),
        }));
      },
      updateQty: (productId, variantId, qty) => {
        if (qty <= 0) {
          get().removeItem(productId, variantId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            sameLine(i, productId, variantId)
              ? { ...i, qty: Math.min(qty, i.maxQty ?? 99) }
              : i,
          ),
        }));
      },
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((sum, i) => sum + i.qty, 0),
      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.unitSalePrice * i.qty, 0),
    }),
    { name: "tathaastu-cart-v1" },
  ),
);
