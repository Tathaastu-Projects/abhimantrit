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

/** Figma main nav */
const MAIN_NAV = [
  { label: "Rudraksha", href: "/shop/rudraksha" },
  { label: "Gemstones", href: "/shop/gemstone" },
  { label: "Bracelets & Malas", href: "/shop/bracelet" },
  { label: "Shop by Intention", href: "/#intentions" },
  { label: "Sale", href: "/shop?onSale=true" },
];

export function SiteHeader({ menu: _menu }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const count = useCartStore((s) => s.items.reduce((n, i) => n + i.qty, 0));
  const customer = useAuthStore((s) => s.customer);

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 bg-white">
      {/* Figma top utility bar — light, above nav */}
      <div className="hidden border-b border-[var(--border)] bg-[#f5f5f3] px-4 py-1.5 sm:block md:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 text-[11px] text-ink-soft md:text-xs">
          <p className="tracking-wide">
            By Priyanka Singh
            <span className="mx-2 text-ink/25" aria-hidden>
              |
            </span>
            X-Ray &amp; Lab Certified
            <span className="mx-2 text-ink/25" aria-hidden>
              |
            </span>
            Free Insured Worldwide Shipping
          </p>
          <div className="flex shrink-0 items-center gap-3 tracking-wide">
            <Link href="/account" className="hover:text-pink">
              Account
            </Link>
            <span className="text-ink/25" aria-hidden>
              |
            </span>
            <Link href="/#faq" className="hover:text-pink">
              Help
            </Link>
            <span className="text-ink/25" aria-hidden>
              |
            </span>
            <Link href="/contact" className="hover:text-pink">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav row */}
      <div className="border-b border-[var(--border)]">
        <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 px-3 py-2.5 sm:px-4 md:gap-5 md:px-6 md:py-3 lg:px-8">
          <div className="flex min-w-0 items-center gap-2">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-ink lg:hidden"
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
                className="h-11 w-auto object-contain object-left sm:h-12 md:h-14"
              />
            </Link>
          </div>

          <nav className="hidden items-center justify-center gap-0.5 lg:flex xl:gap-1">
            {MAIN_NAV.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={cn(
                  "rounded-md px-2.5 py-2 text-[13px] font-medium tracking-wide text-ink transition hover:text-pink xl:px-3 xl:text-sm",
                  item.label === "Sale" && "font-semibold text-pink hover:text-pink-deep",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-2 sm:gap-2.5">
            <div className="hidden w-[220px] xl:block xl:w-[260px]">
              <SearchBox
                placeholder="Search for products, rituals, or remedies..."
                className="max-w-none"
                inputClassName="w-full rounded-full border border-[var(--border)] bg-[#f7f7f5] py-2 pl-9 pr-3 text-xs outline-none placeholder:text-ink-soft/80 focus:border-pink/40 focus:ring-2 focus:ring-pink/15"
              />
            </div>
            <Link href="/account" className="header-icon-btn hidden sm:inline-flex" aria-label="Account">
              <UserIcon />
              {mounted && customer ? (
                <span className="ml-1 hidden max-w-[4.5rem] truncate text-xs font-semibold text-ink 2xl:inline">
                  {customer.name.split(" ")[0]}
                </span>
              ) : null}
            </Link>
            <Link href="/wishlist" className="header-icon-btn hidden sm:inline-flex" aria-label="Wishlist">
              <HeartIcon />
            </Link>
            <Link href="/cart" className="header-icon-btn relative" aria-label="Cart">
              <CartIcon />
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink px-1 text-[10px] font-bold text-white">
                {mounted ? count : 0}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {open ? (
        <div className="border-b border-[var(--border)] bg-white px-4 py-4 lg:hidden">
          <SearchBox placeholder="Search for products, rituals, or remedies..." />
          <div className="mt-4 grid gap-1">
            {MAIN_NAV.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={cn(
                  "rounded-xl px-3 py-3 text-base font-semibold text-ink hover:bg-mist",
                  item.label === "Sale" && "text-pink",
                )}
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
              href="/contact"
              className="rounded-xl px-3 py-3 text-base font-medium"
              onClick={() => setOpen(false)}
            >
              Contact Us
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

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 19c1.6-3.6 4.2-5.2 7-5.2s5.4 1.6 7 5.2" strokeLinecap="round" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path
        d="M12 20s-7-4.5-7-10a4.2 4.2 0 0 1 7-3 4.2 4.2 0 0 1 7 3c0 5.5-7 10-7 10z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 6h2l1.2 2M8 8h11l-1.4 8H8.6L7 8" strokeLinejoin="round" />
      <circle cx="10" cy="19" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="17" cy="19" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}
