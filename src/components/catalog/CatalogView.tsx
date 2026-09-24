import Link from "next/link";
import { Suspense } from "react";
import type { CatalogFacets, CatalogResponse, StoreProduct } from "@/types/product";
import { ProductGrid } from "@/components/product/ProductGrid";
import { FilterSidebar } from "@/components/filters/FilterSidebar";
import { SortSelect } from "@/components/filters/SortSelect";
import { Pagination } from "@/components/filters/Pagination";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { titleCase } from "@/lib/format";

type Props = {
  title: string;
  subtitle?: string;
  description?: string;
  hideTitle?: boolean;
  breadcrumbs?: { label: string; href?: string }[];
  products: StoreProduct[];
  pagination: CatalogResponse["pagination"];
  facets?: CatalogFacets | null;
  sortOptions?: { value: string; label: string }[];
  error?: string;
  faqs?: { question: string; answer: string }[];
  comparisonTable?: { headers?: string[]; rows?: string[][] };
};

export function CatalogView({
  title,
  subtitle,
  description,
  hideTitle,
  breadcrumbs,
  products,
  pagination,
  facets,
  sortOptions,
  error,
  faqs,
  comparisonTable,
}: Props) {
  return (
    <div id="catalog" className="bg-[#faf8f5]">
      <div className="container-pad py-8 md:py-10">
        {breadcrumbs?.length ? (
          <nav className="mb-5 flex flex-wrap gap-2 text-sm text-ink-soft">
            {breadcrumbs.map((b, i) => (
              <span key={b.label} className="flex items-center gap-2">
                {i > 0 ? <span className="text-ink-soft/50">›</span> : null}
                {b.href ? (
                  <Link href={b.href} className="hover:text-pink">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-ink">{b.label}</span>
                )}
              </span>
            ))}
          </nav>
        ) : null}

        {!hideTitle ? (
          <div className="mb-8 max-w-3xl">
            <h1 className="font-display text-4xl text-ink md:text-5xl">{title}</h1>
            {subtitle ? <p className="mt-3 text-lg text-ink-soft">{subtitle}</p> : null}
            {description ? (
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{description}</p>
            ) : null}
          </div>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[220px_1fr] lg:gap-8">
          <Suspense fallback={<div className="skeleton h-96" />}>
            <FilterSidebar facets={facets} className="lg:sticky lg:top-24 lg:self-start" />
          </Suspense>

          <div>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
              <p className="text-sm text-ink-soft">
                {pagination.total} {pagination.total === 1 ? "result" : "results"}
              </p>
              <Suspense fallback={null}>
                <SortSelect options={sortOptions} />
              </Suspense>
            </div>

            {error ? (
              <div className="rounded-2xl border border-sale/30 bg-[rgba(138,59,44,0.06)] p-6 text-sm text-sale">
                {error}. Showing an empty catalog until the API is reachable.
              </div>
            ) : null}

            {!products.length && !error ? (
              <div className="rounded-3xl border border-[var(--border)] bg-white/50 px-6 py-16 text-center">
                <p className="font-display text-2xl">No products match those filters</p>
                <p className="mt-2 text-ink-soft">
                  Try clearing filters or browsing another collection.
                </p>
                <Link href="/shop" className="btn btn-primary mt-6">
                  Browse all
                </Link>
              </div>
            ) : (
              <ProductGrid products={products} />
            )}

            <Suspense fallback={null}>
              <Pagination
                page={pagination.page}
                pages={pagination.pages}
                total={pagination.total}
              />
            </Suspense>
          </div>
        </div>

        {comparisonTable?.rows?.length ? (
          <section className="mt-16">
            <h2 className="font-display text-3xl">Compare at a glance</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[var(--border)] bg-white/40">
              <table className="min-w-full text-left text-sm">
                {comparisonTable.headers?.length ? (
                  <thead className="bg-temple/5 text-ink">
                    <tr>
                      {comparisonTable.headers.map((h) => (
                        <th key={h} className="px-4 py-3 font-semibold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                ) : null}
                <tbody>
                  {comparisonTable.rows.map((row, idx) => (
                    <tr key={idx} className="border-t border-[var(--border)]">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="px-4 py-3 text-ink-soft">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        {faqs?.length ? <FaqAccordion faqs={faqs} /> : null}

        {!faqs?.length && title ? (
          <section className="mt-10 max-w-3xl border-t border-[var(--border)] pt-8 text-sm leading-relaxed text-ink-soft">
            <h2 className="font-display text-2xl text-ink">About {titleCase(title)}</h2>
            <p className="mt-3">
              Discover authentic, carefully selected pieces from Tathaastu. Every listed product is
              managed from our admin catalog — only items marked as listed appear in this store.
            </p>
          </section>
        ) : null}
      </div>
    </div>
  );
}
