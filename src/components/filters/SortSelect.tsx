"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "best_selling", label: "Best selling" },
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "discount_desc", label: "Biggest discount" },
];

export function SortSelect({ options }: { options?: { value: string; label: string }[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("sort") || "featured";
  const list = options?.length ? options : SORTS;

  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="text-ink-soft">Sort</span>
      <select
        value={current}
        onChange={(e) => {
          const params = new URLSearchParams(searchParams.toString());
          params.set("sort", e.target.value);
          params.delete("page");
          router.push(`${pathname}?${params.toString()}`);
        }}
        className="rounded-full border border-[var(--border)] bg-white/70 px-3 py-2 outline-none"
      >
        {list.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
