"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { StoreMenu } from "@/types/product";
import { useCartStore } from "@/lib/cart-store";
import { useAuthStore } from "@/lib/auth-store";
import { SearchBox } from "@/components/layout/SearchBox";
import { cn } from "@/lib/cn";

type Props = {
  menu: StoreMenu | null;
};

/** Main nav — Bracelets and Malas are separate */
const MAIN_NAV = [
  { label: "Rudraksha", href: "/shop/rudraksha" },
  { label: "Gemstones", href: "/shop/gemstone" },
  { label: "Bracelets", href: "/shop/bracelet" },
  { label: "Malas", href: "/shop?q=mala" },
  { label: "Shop by Intention", href: "/#intentions" },
  { label: "Sale", href: "/shop?onSale=true" },
];

export function SiteHeader({ menu: _menu }: Props) {
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [mounted, setMounted] = useState(false);
  const count = useCartStore((s) => s.items.reduce((n, i) => n + i.qty, 0));
  const customer = useAuthStore((s) => s.customer);

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-white">
      {/* Full-bleed header so logo sits near the left screen edge */}
      <div className="grid w-full grid-cols-[1fr_auto] items-center gap-3 py-2.5 pl-2 pr-2 sm:pl-3 sm:pr-3 md:grid-cols-[auto_1fr_auto] md:gap-5 md:py-3 md:pl-4 md:pr-4 lg:pl-5 lg:pr-5">
        {/* Left: logo flush left */}
        <div className="flex min-w-0 items-center gap-2 justify-self-start">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-ink md:hidden"
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
          >
            <MenuIcon />
          </button>
          <Link href="/" className="shrink-0" aria-label="Tathaastu home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/tathaastu_logo.png"
              alt="Tathaastu"
              className="h-12 w-auto object-contain object-left sm:h-14 md:h-[3.75rem]"
            />
          </Link>
        </div>

        {/* Center: larger nav links */}
        <nav className="hidden items-center justify-center gap-1 lg:flex">
          {MAIN_NAV.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-2 text-[15px] font-semibold tracking-wide text-ink transition hover:bg-mist hover:text-pink xl:px-3.5 xl:text-base",
                item.label === "Sale" && "text-pink hover:text-pink-deep",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right: stronger utility icons */}
        <div className="flex items-center justify-end gap-1.5 justify-self-end sm:gap-2">
          <button
            type="button"
            className="header-icon-btn hidden md:inline-flex"
            aria-label="Search"
            onClick={() => setShowSearch((v) => !v)}
          >
            <SearchIcon />
          </button>
          <Link href="/account" className="header-icon-btn hidden sm:inline-flex" aria-label="Account">
            <UserIcon />
            {mounted && customer ? (
              <span className="ml-1 hidden max-w-[4.5rem] truncate text-xs font-semibold text-ink xl:inline">
                {customer.name.split(" ")[0]}
              </span>
            ) : null}
          </Link>
          <Link href="/wishlist" className="header-icon-btn hidden sm:inline-flex" aria-label="Wishlist">
            <HeartIcon />
          </Link>
          <Link href="/cart" className="header-icon-btn header-icon-btn--cart relative" aria-label="Cart">
            <CartIcon />
            {mounted && count > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink px-1 text-[11px] font-bold text-white shadow-sm">
                {count}
              </span>
            ) : null}
          </Link>
        </div>
      </div>

      {showSearch ? (
        <div className="border-t border-[var(--border)] bg-white px-4 py-3">
          <div className="container-pad max-w-xl">
            <SearchBox />
          </div>
        </div>
      ) : null}

      {open ? (
        <div className="border-t border-[var(--border)] bg-white px-4 py-4 lg:hidden">
          <SearchBox />
          <div className="mt-4 grid gap-1">
            {MAIN_NAV.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                className="rounded-xl px-3 py-3 text-base font-semibold text-ink hover:bg-mist"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/account"
              className="rounded-xl px-3 py-3 text-base font-medium"
              onClick={() => setOpen(false)}
            >
              Account
            </Link>
            <Link
              href="/wishlist"
              className="rounded-xl px-3 py-3 text-base font-medium"
              onClick={() => setOpen(false)}
            >
              Wishlist
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.2-3.2" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 19c1.6-3.6 4.2-5.2 7-5.2s5.4 1.6 7 5.2" strokeLinecap="round" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path
        d="M12 20s-7-4.5-7-10a4.2 4.2 0 0 1 7-3 4.2 4.2 0 0 1 7 3c0 5.5-7 10-7 10z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 6h2l1.2 2M8 8h11l-1.4 8H8.6L7 8" strokeLinejoin="round" />
      <circle cx="10" cy="19" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="17" cy="19" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}
