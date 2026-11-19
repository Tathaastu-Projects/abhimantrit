"use client";

import { create } from "zustand";
import type { HomeContent, StoreMeta } from "@/types/product";

const HOME_TTL_MS = 5 * 60 * 1000; // reuse home payload for 5 minutes while browsing

type HomeState = {
  above: HomeContent | null;
  below: HomeContent | null;
  meta: StoreMeta | null;
  loadedAt: number;
  /** After first home visit, keep-alive holds the tree across navigations */
  pinned: boolean;
  hydrate: (above: HomeContent, below: HomeContent, meta: StoreMeta | null) => void;
  pin: () => void;
  isFresh: () => boolean;
};

/**
 * In-memory home cache (survives product ↔ home navigations; cleared on full page refresh).
 * Combined with HomeKeepAlive so returning to home does not remount / refetch cold.
 */
export const useHomeStore = create<HomeState>((set, get) => ({
  above: null,
  below: null,
  meta: null,
  loadedAt: 0,
  pinned: false,
  hydrate: (above, below, meta) =>
    set({
      above,
      below,
      meta,
      loadedAt: Date.now(),
    }),
  pin: () => set({ pinned: true }),
  isFresh: () => {
    const { loadedAt, above, below } = get();
    return Boolean(above && below && Date.now() - loadedAt < HOME_TTL_MS);
  },
}));

export const HOME_CACHE_TTL_MS = HOME_TTL_MS;
