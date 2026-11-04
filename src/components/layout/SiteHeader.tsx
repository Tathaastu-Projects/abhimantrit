"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { StoreMenu } from "@/types/product";
import { useCartStore } from "@/lib/cart-store";
import { useAuthStore } from "@/lib/auth-store";
import { SearchBox } from "@/components/layout/SearchBox";
import { cn } from "@/lib/cn";

const DEFAULT_HEADER_BAR = [
  "💎 Energised Crystals by Dr. Priyanka Singh",
  "✅ X-Ray & Lab-Certified",
  "📦 Free-Insured Worldwide Shipping",
];

type Props = {
  menu: StoreMenu | null;
  logoSrc?: string;
  /** Top utility bar phrases from Admin → Home Page → Top header bar */
  headerBar?: string[];
};

type NavItem = {
  id: string;
  label: string;
  href: string;
  icon?: "home";
};

/** Figma main nav */
const MAIN_NAV: NavItem[] = [
  { id: "crystal-bracelets", label: "Crystal Bracelets", href: "/shop/crystal-bracelets" },
  { id: "rudraksha", label: "Rudraksha", href: "/shop/rudraksha" },
  { id: "crystal-anklets", label: "Crystal Anklets", href: "/shop/crystal-anklets" },
  { id: "tumbles", label: "Tumbles", href: "/shop/tumbles" },
  { id: "crystal-trees", label: "Crystal Trees", href: "/shop/crystal-trees" },
  { id: "pyramids", label: "Pyramids", href: "/shop/pyramids" },
  { id: "mala", label: "Mala", href: "/shop/mala" },
  { id: "photo-frames", label: "Photo Frames", href: "/shop/photo-frames" },
];

function useActiveNavId() {
  const pathname = usePathname() || "/";

  if (pathname === "/shop/crystal-bracelets") return "crystal-bracelets";
  if (pathname === "/shop/rudraksha") return "rudraksha";
  if (pathname === "/shop/crystal-anklets") return "crystal-anklets";
  if (pathname === "/shop/tumbles") return "tumbles";
  if (pathname === "/shop/crystal-trees") return "crystal-trees";
  if (pathname === "/shop/pyramids") return "pyramids";
  if (pathname === "/shop/mala") return "mala";
  if (pathname === "/shop/photo-frames") return "photo-frames";

  return null;
}

function navLinkClass(active: boolean) {
  return cn(
    "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide transition whitespace-nowrap xl:text-[13px]",
    active
      ? "bg-[#F3B754] text-ink font-semibold shadow-sm shadow-[#F3B754]/30"
      : "text-ink hover:bg-mist hover:text-forest",
  );
}

export function SiteHeader({ menu, logoSrc, headerBar }: Props) {
  return (
    <Suspense
      fallback={
        <SiteHeaderShell
          menu={menu}
          logoSrc={logoSrc}
          headerBar={headerBar}
          activeId={null}
          isHome={false}
        />
      }
    >
      <SiteHeaderInner menu={menu} logoSrc={logoSrc} headerBar={headerBar} />
    </Suspense>
  );
}

function SiteHeaderInner({ menu, logoSrc, headerBar }: Props) {
  const activeId = useActiveNavId();
  const pathname = usePathname() || "/";
  return (
    <SiteHeaderShell
      menu={menu}
      logoSrc={logoSrc}
      headerBar={headerBar}
      activeId={activeId}
      isHome={pathname === "/"}
    />
  );
}

function navLinkClassOverVideo(active: boolean) {
  return cn(
    "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide transition whitespace-nowrap xl:text-[13px]",
    active
      ? "bg-[#F3B754] !text-ink font-semibold shadow-sm shadow-[#F3B754]/30"
      : "!text-white hover:bg-white/15 drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)]",
  );
}

function SiteHeaderShell({
  menu: _menu,
  activeId,
  logoSrc = "",
  headerBar,
  isHome = false,
}: Props & { activeId: string | null; isHome?: boolean }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hasVideoHero, setHasVideoHero] = useState(false);
  const [overVideo, setOverVideo] = useState(false);
  const count = useCartStore((s) => s.items.reduce((n, i) => n + i.qty, 0));
  const customer = useAuthStore((s) => s.customer);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const sync = () => {
      const present = document.documentElement.getAttribute("data-home-video-hero") === "1";
      const active = present && isHome;
      setHasVideoHero(active);
      // Assume over video until IntersectionObserver reports otherwise (avoids white flash)
      if (active) setOverVideo(true);
      else setOverVideo(false);
    };
    sync();
    window.addEventListener("abhi:home-video-hero", sync);
    return () => window.removeEventListener("abhi:home-video-hero", sync);
  }, [isHome]);

  useEffect(() => {
    if (!hasVideoHero) {
      setOverVideo(false);
      return;
    }
    const hero = document.getElementById("home-video-hero");
    if (!hero) {
      setOverVideo(false);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setOverVideo(entry.isIntersecting && entry.intersectionRatio > 0.35);
      },
      { threshold: [0, 0.35, 0.6, 1] },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [hasVideoHero]);

  const barItems =
    headerBar && headerBar.length
      ? headerBar.map((s) => String(s || "").trim()).filter(Boolean)
      : DEFAULT_HEADER_BAR;

  const transparent = hasVideoHero && overVideo && !open;
  const linkClass = transparent ? navLinkClassOverVideo : navLinkClass;

  return (
    <header
      className={cn(
        "z-50 transition-[background-color,box-shadow,backdrop-filter,border-color] duration-300",
        hasVideoHero
          ? cn("fixed inset-x-0 top-0", transparent ? "bg-transparent" : "bg-white shadow-sm")
          : "sticky top-0 bg-white shadow-sm",
      )}
    >
      {/* Top utility bar — managed from Admin → Home Page → Top header bar */}
      <div
        className={cn(
          "hidden px-4 py-1.5 sm:block md:px-6 lg:px-8",
          transparent
            ? "border-b border-white/15 bg-forest/55 backdrop-blur-md"
            : "border-b border-forest-deep bg-forest",
        )}
      >
        <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 text-[11px] text-white md:text-xs">
          <span aria-hidden />
          <p className="text-center tracking-wide text-white">
            {barItems.map((phrase, index) => (
              <span key={`${index}-${phrase}`}>
                {index > 0 ? (
                  <span className="mx-2 text-white/50" aria-hidden>
                    |
                  </span>
                ) : null}
                {phrase}
              </span>
            ))}
          </p>
          <div className="flex shrink-0 items-center justify-end gap-3 whitespace-nowrap tracking-wide text-white">
            <Link href="/account" className="hover:text-white/80">
              Account
            </Link>
            <span className="text-white/40" aria-hidden>
              |
            </span>
            <Link href="/#faq" className="hover:text-white/80">
              Help
            </Link>
            <span className="text-white/40" aria-hidden>
              |
            </span>
            <Link href="/contact" className="hover:text-white/80">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Main header row — logo left, tabs center, cart then search right */}
      <div
        className={cn(
          transparent ? "border-b-0 bg-transparent" : "border-b border-[var(--border)]",
        )}
      >
        <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-2 px-3 py-2.5 sm:px-4 md:gap-3 md:px-6 md:py-3 lg:px-8">
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-full lg:hidden",
                transparent
                  ? "border border-white/40 bg-white/10 text-white"
                  : "border border-[var(--border)] text-ink",
              )}
              aria-label="Open menu"
              onClick={() => setOpen((v) => !v)}
            >
              <MenuIcon />
            </button>
            <Link href="/" className="shrink-0" aria-label="Abhimantrit home">
              {logoSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logoSrc}
                  alt="Abhimantrit"
                  width={160}
                  height={48}
                  fetchPriority="high"
                  decoding="async"
                  className={cn(
                    "h-9 w-auto max-w-[10rem] object-contain sm:h-10 md:h-12",
                    transparent && "drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]",
                  )}
                />
              ) : (
                <span
                  className={cn(
                    "font-display text-lg font-semibold tracking-tight sm:text-xl",
                    transparent ? "text-white" : "text-forest",
                  )}
                >
                  Abhimantrit
                </span>
              )}
            </Link>
          </div>

          <nav
            className={cn(
              "hidden min-w-0 items-center justify-center gap-1 overflow-x-auto lg:flex xl:gap-1.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
              transparent && "text-white",
            )}
            aria-label="Category Tabs"
          >
            {MAIN_NAV.map((item) => {
              const active = activeId === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={linkClass(active)}
                >
                  {item.icon === "home" ? <HomeIcon /> : null}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center justify-end gap-2 sm:gap-2.5">
            <Link
              href="/account"
              className={cn("header-icon-btn hidden sm:inline-flex", transparent && "header-icon-btn--on-video")}
              aria-label="Account"
            >
              <UserIcon />
              {mounted && customer ? (
                <span
                  className={cn(
                    "ml-1 hidden max-w-[4.5rem] truncate text-xs font-semibold 2xl:inline",
                    transparent ? "text-white" : "text-ink",
                  )}
                >
                  {customer.name.split(" ")[0]}
                </span>
              ) : null}
            </Link>
            <Link
              href="/wishlist"
              className={cn("header-icon-btn hidden sm:inline-flex", transparent && "header-icon-btn--on-video")}
              aria-label="Wishlist"
            >
              <HeartIcon />
            </Link>
            <Link
              href="/cart"
              className={cn("header-icon-btn relative", transparent && "header-icon-btn--on-video")}
              aria-label="Cart"
            >
              <CartIcon />
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-forest px-1 text-[10px] font-bold text-white">
                {mounted ? count : 0}
              </span>
            </Link>
            <SearchBox
              iconOnly
              placeholder="Search for products, rituals, or remedies..."
              iconButtonClassName={transparent ? "header-icon-btn--on-video" : undefined}
              inputClassName={cn(
                "w-full rounded-full py-2 pl-9 pr-3 text-xs outline-none focus:ring-2",
                transparent
                  ? "border border-white/35 bg-white/15 text-white placeholder:text-white/70 focus:border-white/55 focus:ring-white/20"
                  : "border border-[var(--border)] bg-[#f7f3ec] placeholder:text-ink-soft/80 focus:border-forest/40 focus:ring-forest/10",
              )}
            />
          </div>
        </div>
      </div>

      {open ? (
        <div className="border-b border-[var(--border)] bg-white px-4 py-4 lg:hidden">
          <SearchBox placeholder="Search for products, rituals, or remedies..." />
          <div className="mt-4 grid gap-1">
            {MAIN_NAV.map((item) => {
              const active = activeId === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-xl px-3 py-3 text-base font-semibold",
                    active ? "bg-[#F3B754] text-ink" : "text-ink hover:bg-mist",
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
