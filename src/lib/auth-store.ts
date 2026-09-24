"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { StoreCustomer } from "@/types/product";

type AuthState = {
  token: string | null;
  customer: StoreCustomer | null;
  setSession: (token: string, customer: StoreCustomer) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      customer: null,
      setSession: (token, customer) => set({ token, customer }),
      clearSession: () => set({ token: null, customer: null }),
    }),
    { name: "tathaastu-auth-v1" },
  ),
);

export function getGuestId(): string {
  if (typeof window === "undefined") return "";
  const key = "tathaastu-guest-id";
  let id = localStorage.getItem(key);
  if (!id) {
    id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `guest_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(key, id);
  }
  return id;
}
