"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { CatalogFacets } from "@/types/product";
import { titleCase } from "@/lib/format";
import { cn } from "@/lib/cn";

const FACET_ORDER: { key: keyof CatalogFacets; label: string }[] = [
  { key: "intention", label: "Intention" },
  { key: "color", label: "Color" },
  { key: "shape", label: "Shape" },
  { key: "origin", label: "Origin" },
  { key: "material", label: "Material" },
  { key: "mukhi", label: "Mukhi / Faces" },
  { key: "stone", label: "Stone" },
  { key: "jewelryType", label: "Type" },
  { key: "zodiac", label: "Zodiac" },
  { key: "gender", label: "Gender" },
  { key: "planet", label: "Planet" },
  { key: "tags", label: "Tags" },
  { key: "availability", label: "Availability" },
];

const PRICE_PRESETS = [
  { label: "Under ₹2,000", min: undefined, max: 2000 },
  { label: "₹2,001 – ₹5,000", min: 2001, max: 5000 },
  { label: "₹5,001 – ₹10,000", min: 5001, max: 10000 },
  { label: "₹10,001 – ₹25,000", min: 10001, max: 25000 },
  { label: "₹25,000 & above", min: 25000, max: undefined },
];

type Props = {
  facets?: CatalogFacets | null;
  className?: string;
};

export function FilterSidebar({ facets, className }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const active = useMemo(() => {
    const obj: Record<string, string> = {};
    searchParams.forEach((v, k) => {
      obj[k] = v;
    });
    return obj;
  }, [searchParams]);

  function setParam(key: string, value?: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    if (!value) params.delete(key);
    else params.set(key, value);
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  function toggleCsv(key: string, value: string) {
    const current = (active[key] || "").split(",").filter(Boolean);
    const exists = current.includes(value);
    const next = exists ? current.filter((v) => v !== value) : [...current, value];
    setParam(key, next.length ? next.join(",") : undefined);
  }

  function clearAll() {
    router.push(pathname);
  }

  const hasFilters = Array.from(searchParams.keys()).some(
    (k) => !["page", "sort", "limit"].includes(k),
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-semibold text-ink"
      >
        Filters
        {hasFilters ? <span className="h-2 w-2 rounded-full bg-temple" aria-hidden /> : null}
      </button>

      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40"
          aria-label="Close filters"
          onClick={() => setOpen(false)}
        />
      ) : null}

    <aside
      className={cn(
        "fixed bottom-0 left-0 top-0 z-50 w-[min(100%,320px)] space-y-6 overflow-y-auto bg-[#faf8f5] p-5 shadow-xl transition-transform duration-300",
        open ? "translate-x-0" : "-translate-x-full",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl">Filters</h2>
        <div className="flex items-center gap-3">
          {hasFilters ? (
            <button type="button" onClick={clearAll} className="text-sm text-temple hover:underline">
              Clear all
            </button>
          ) : null}
          <button type="button" onClick={() => setOpen(false)} className="text-sm font-semibold text-ink">
            Close
          </button>
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brass">Price</p>
        <div className="space-y-2">
          {PRICE_PRESETS.map((p) => {
            const selected =
              String(active.minPrice || "") === String(p.min || "") &&
              String(active.maxPrice || "") === String(p.max || "");
            return (
              <button
                key={p.label}
                type="button"
                onClick={() => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.delete("page");
                  if (p.min) params.set("minPrice", String(p.min));
                  else params.delete("minPrice");
                  if (p.max) params.set("maxPrice", String(p.max));
                  else params.delete("maxPrice");
                  router.push(`${pathname}?${params.toString()}`);
                }}
                className={cn(
                  "block w-full rounded-xl border px-3 py-2 text-left text-sm",
                  selected
                    ? "border-temple bg-temple/10 text-temple"
                    : "border-[var(--border)] bg-white/40 hover:bg-white/70",
                )}
              >
                {p.label}
              </button>
            );
          })}
        </div>
        {facets?.price ? (
          <p className="mt-2 text-xs text-ink-soft">
            Range in view: ₹{Math.floor(facets.price.min)} – ₹{Math.ceil(facets.price.max)}
          </p>
        ) : null}
      </div>

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brass">
          Weight
        </p>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            step="0.01"
            placeholder="Min carat"
            defaultValue={active.minCarat || ""}
            onBlur={(e) => setParam("minCarat", e.target.value || undefined)}
            className="rounded-xl border border-[var(--border)] bg-white/50 px-3 py-2 text-sm"
          />
          <input
            type="number"
            step="0.01"
            placeholder="Max carat"
            defaultValue={active.maxCarat || ""}
            onBlur={(e) => setParam("maxCarat", e.target.value || undefined)}
            className="rounded-xl border border-[var(--border)] bg-white/50 px-3 py-2 text-sm"
          />
          <input
            type="number"
            step="0.01"
            placeholder="Min ratti"
            defaultValue={active.minRatti || ""}
            onBlur={(e) => setParam("minRatti", e.target.value || undefined)}
            className="rounded-xl border border-[var(--border)] bg-white/50 px-3 py-2 text-sm"
          />
          <input
            type="number"
            step="0.01"
            placeholder="Max ratti"
            defaultValue={active.maxRatti || ""}
            onBlur={(e) => setParam("maxRatti", e.target.value || undefined)}
            className="rounded-xl border border-[var(--border)] bg-white/50 px-3 py-2 text-sm"
          />
        </div>
      </div>

      {FACET_ORDER.map(({ key, label }) => {
        const values = facets?.[key];
        if (!Array.isArray(values) || !values.length) return null;
        const selected = (active[key] || "").split(",").filter(Boolean);
        return (
          <div key={key}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brass">
              {label}
            </p>
            <ul className="max-h-48 space-y-2 overflow-auto pr-1">
              {values.map((item) => {
                const checked = selected.includes(item.value);
                return (
                  <li key={item.value}>
                    <label className="flex cursor-pointer items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleCsv(key, item.value)}
                        className="accent-temple"
                      />
                      <span className="flex-1">{item.label || titleCase(item.value)}</span>
                      <span className="text-xs text-ink-soft">{item.count}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}

      <div className="rounded-2xl border border-[var(--border)] bg-white/40 p-4 text-sm text-ink-soft">
        Looking for a curated page?{" "}
        <Link href="/collections/bestsellers" className="font-medium text-temple">
          Bestsellers
        </Link>
      </div>
    </aside>
    </>
  );
}
