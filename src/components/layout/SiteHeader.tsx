"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import type { StoreMenu } from "@/types/product";
import { useCartStore } from "@/lib/cart-store";
import { useAuthStore } from "@/lib/auth-store";
import { SearchBox } from "@/components/layout/SearchBox";
import { cn } from "@/lib/cn";

type Props = {
  menu: StoreMenu | null;
  logoSrc?: string;
};

type NavItem = {
  id: string;
  label: string;
  href: string;
  icon?: "home";
};

/** Figma main nav */
const MAIN_NAV: NavItem[] = [
  { id: "home", label: "Home", href: "/", icon: "home" },
  { id: "rudraksha", label: "Rudraksha", href: "/shop/rudraksha" },
  { id: "gemstone", label: "Gemstones", href: "/shop/gemstone" },
  { id: "bracelet", label: "Bracelets & Malas", href: "/shop/bracelet" },
  { id: "intention", label: "Shop by Intention", href: "/#intentions" },
  { id: "sale", label: "Sale", href: "/shop?onSale=true" },
];

function useActiveNavId() {
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const syncHash = () => setHash(typeof window !== "undefined" ? window.location.hash : "");
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  const onSale = searchParams.get("onSale") === "true" || searchParams.get("sale") === "true";

  if (pathname.startsWith("/shop/rudraksha")) return "rudraksha";
  if (pathname.startsWith("/shop/gemstone")) return "gemstone";
  if (pathname.startsWith("/shop/bracelet")) return "bracelet";
  if (pathname.startsWith("/intention")) return "intention";
  if (pathname === "/shop" && onSale) return "sale";
  if (pathname === "/" && (hash === "#intentions" || hash.startsWith("#intentions"))) {
    return "intention";
  }
  if (pathname === "/") return "home";
  return null;
}

function navLinkClass(active: boolean, isSale: boolean) {
  return cn(
    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-2 text-[13px] font-medium tracking-wide transition xl:px-3 xl:text-sm",
    active
      ? "bg-[#F3B754] text-ink shadow-sm shadow-[#F3B754]/40"
      : isSale
        ? "font-semibold text-pink hover:bg-pink-soft hover:text-pink-deep"
        : "text-ink hover:bg-mist hover:text-forest",
  );
}

export function SiteHeader({ menu, logoSrc }: Props) {
  return (
    <Suspense fallback={<SiteHeaderShell menu={menu} logoSrc={logoSrc} activeId={null} />}>
      <SiteHeaderInner menu={menu} logoSrc={logoSrc} />
    </Suspense>
  );
}

function SiteHeaderInner({ menu, logoSrc }: Props) {
  const activeId = useActiveNavId();
  return <SiteHeaderShell menu={menu} logoSrc={logoSrc} activeId={activeId} />;
}

function SiteHeaderShell({
  menu: _menu,
  activeId,
  logoSrc = "/tathaastu_logo.png",
}: Props & { activeId: string | null }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const count = useCartStore((s) => s.items.reduce((n, i) => n + i.qty, 0));
  const customer = useAuthStore((s) => s.customer);

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 bg-white">
      {/* Figma top utility bar — light, above nav */}
      <div className="hidden border-b border-[var(--border)] bg-[#f5f5f3] px-4 py-1.5 sm:block md:px-6 lg:px-8">
        <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 text-[11px] text-ink-soft md:text-xs">
          <span aria-hidden />
          <p className="text-center tracking-wide text-forest">
            By Priyanka Singh
            <span className="mx-2 text-forest/40" aria-hidden>
              |
            </span>
            X-Ray &amp; Lab Certified
            <span className="mx-2 text-forest/40" aria-hidden>
              |
            </span>
            Free Insured Worldwide Shipping
          </p>
          <div className="flex shrink-0 items-center justify-end gap-3 whitespace-nowrap tracking-wide">
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
            <Link href="/" className="shrink-0" aria-label="Abhimantrit home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoSrc}
                alt="Abhimantrit by Tathaastu"
                className="h-9 w-auto object-contain object-left sm:h-10 md:h-12"
              />
            </Link>
          </div>

          <nav className="hidden items-center justify-center gap-0.5 lg:flex xl:gap-1" aria-label="Primary">
            {MAIN_NAV.map((item) => {
              const active = activeId === item.id;
              const isSale = item.id === "sale";
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={navLinkClass(active, isSale)}
                >
                  {item.icon === "home" ? <HomeIcon /> : null}
                  {item.label}
                </Link>
              );
            })}
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
            {MAIN_NAV.map((item) => {
              const active = activeId === item.id;
              const isSale = item.id === "sale";
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-xl px-3 py-3 text-base font-semibold",
                    active
                      ? "bg-[#F3B754] text-ink"
                      : isSale
                        ? "text-pink hover:bg-pink-soft"
                        : "text-ink hover:bg-mist",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.icon === "home" ? <HomeIcon /> : null}
                  {item.label}
                </Link>
              );
            })}
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

function HomeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5z" strokeLinejoin="round" />
    </svg>
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
