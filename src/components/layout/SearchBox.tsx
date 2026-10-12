"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { searchSuggest } from "@/lib/api";
import { primaryImage, formatINR } from "@/lib/format";
import type { StoreProduct } from "@/types/product";

type Props = {
  placeholder?: string;
  className?: string;
  inputClassName?: string;
};

export function SearchBox({
  placeholder = "Search products…",
  className,
  inputClassName,
}: Props) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<StoreProduct[]>([]);
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    if (!q.trim()) {
      setHits([]);
      return;
    }
    const t = setTimeout(async () => {
      const data = await searchSuggest(q, 6);
      setHits(data);
      setOpen(true);
    }, 220);
    return () => clearTimeout(t);
  }, [q]);

  return (
    <div ref={boxRef} className={className ? `relative w-full ${className}` : "relative w-full max-w-md"}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!q.trim()) return;
          setOpen(false);
          router.push(`/search?q=${encodeURIComponent(q.trim())}`);
        }}
        className="relative"
      >
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.2-3.2" strokeLinecap="round" />
          </svg>
        </span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => hits.length && setOpen(true)}
          placeholder={placeholder}
          className={
            inputClassName ||
            "w-full rounded-lg border border-[var(--border)] bg-mist py-2 pl-9 pr-3 text-sm outline-none ring-pink/25 focus:ring-2"
          }
          aria-label="Search products"
        />
      </form>

      {open && hits.length > 0 ? (
        <div className="absolute left-0 right-0 top-[calc(100%+0.4rem)] z-50 overflow-hidden rounded-2xl border border-[var(--border)] bg-cream shadow-xl">
          {hits.map((p) => {
            const img = primaryImage(p.images);
            const price = p.effectiveSalePrice ?? p.salePrice;
            return (
              <Link
                key={p._id}
                href={`/product/${p.slug}`}
                className="flex items-center gap-3 px-3 py-2.5 hover:bg-stone-100/70"
                onClick={() => setOpen(false)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt={img.alt} className="h-12 w-12 rounded-lg object-cover" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{p.title}</p>
                  <p className="text-xs text-ink-soft">{formatINR(price)}</p>
                </div>
              </Link>
            );
          })}
          <button
            type="button"
            className="w-full border-t border-[var(--border)] px-3 py-2 text-left text-sm text-temple"
            onClick={() => {
              setOpen(false);
              router.push(`/search?q=${encodeURIComponent(q.trim())}`);
            }}
          >
            View all results for “{q}”
          </button>
        </div>
      ) : null}
    </div>
  );
}
