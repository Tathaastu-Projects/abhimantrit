"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export function Pagination({
  page,
  pages,
  total,
}: {
  page: number;
  pages: number;
  total: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (pages <= 1) {
    return (
      <p className="mt-8 text-center text-sm text-ink-soft">
        {total} {total === 1 ? "product" : "products"}
      </p>
    );
  }

  function hrefFor(p: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    return `${pathname}?${params.toString()}`;
  }

  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
      {page > 1 ? (
        <Link href={hrefFor(page - 1)} className="btn btn-ghost">
          Previous
        </Link>
      ) : null}
      <span className="text-sm text-ink-soft">
        Page {page} of {pages} · {total} products
      </span>
      {page < pages ? (
        <Link href={hrefFor(page + 1)} className="btn btn-ghost">
          Next
        </Link>
      ) : null}
    </div>
  );
}
