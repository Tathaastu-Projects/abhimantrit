"use client";

import { FormEvent, useEffect, useState } from "react";
import { getProductReviews, submitProductReview } from "@/lib/api";
import { useAuthStore } from "@/lib/auth-store";
import type { StoreReview } from "@/types/product";

function avgFromReviews(list: StoreReview[]) {
  if (!list.length) return 0;
  const sum = list.reduce((total, item) => total + Number(item.rating || 0), 0);
  return Math.round((sum / list.length) * 10) / 10;
}

export function ProductReviews({
  slug,
  ratingAvg,
  ratingCount,
  embedded = false,
}: {
  slug: string;
  ratingAvg?: number;
  ratingCount?: number;
  /** Use inside product left/right panel (no full-bleed section chrome) */
  embedded?: boolean;
}) {
  const token = useAuthStore((s) => s.token);
  const customer = useAuthStore((s) => s.customer);
  const [reviews, setReviews] = useState<StoreReview[]>([]);
  const [avg, setAvg] = useState(Number(ratingAvg || 0));
  const [count, setCount] = useState(Number(ratingCount || 0));
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [rating, setRating] = useState(5);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function load() {
    const res = await getProductReviews(slug);
    const list = res.reviews || [];
    setReviews(list);
    const total = Number(res.pagination?.total ?? list.length);
    setCount(total);
    if (total > 0) {
      setAvg(avgFromReviews(list) || Number(ratingAvg || 0));
    } else {
      setAvg(0);
    }
    return { list, total };
  }

  useEffect(() => {
    setAvg(Number(ratingAvg || 0));
    setCount(Number(ratingCount || 0));
  }, [ratingAvg, ratingCount, slug]);

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setSubmitting(true);
    setError("");
    setStatus("");
    try {
      await submitProductReview(
        slug,
        {
          rating,
          title: String(fd.get("title") || ""),
          body: String(fd.get("body") || ""),
          name: customer?.name || String(fd.get("name") || ""),
          email: customer?.email || String(fd.get("email") || ""),
        },
        token,
      );
      form.reset();
      setRating(5);
      setShowForm(false);
      await load();
      setStatus("Review submitted successfully. Thank you!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not submit review");
    } finally {
      setSubmitting(false);
    }
  }

  const filled = Math.round(avg);
  const field =
    "mt-1 w-full rounded-xl border border-[var(--border)] bg-[#faf8f5] px-3 py-2 text-[13px] outline-none transition focus:border-forest/40";

  const body = (
    <>
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[var(--border)] pb-3">
          <div>
            <h2 className="font-display text-xl text-ink md:text-2xl">Reviews</h2>
            <p className="mt-0.5 text-[12px] text-ink-soft md:text-[13px]">
              {count > 0
                ? `${count} ${count === 1 ? "customer review" : "customer reviews"}`
                : "Be the first to share your experience."}
            </p>
          </div>
          <div className="inline-flex items-center gap-2.5 rounded-xl bg-white px-3 py-1.5 text-[12px] shadow-sm ring-1 ring-black/[0.04]">
            <span className="font-display text-lg text-ink">{count > 0 ? avg.toFixed(1) : "—"}</span>
            <span className="text-[#f5a623]">
              {count > 0 ? `${"★".repeat(filled)}${"☆".repeat(5 - filled)}` : "☆☆☆☆☆"}
            </span>
            <span className="text-ink-soft">
              {count} {count === 1 ? "review" : "reviews"}
            </span>
          </div>
        </div>

        {status ? (
          <p className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-[12px] font-medium text-emerald-800">
            {status}
          </p>
        ) : null}

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
            Customer voices
          </p>
          {!showForm ? (
            <button
              type="button"
              onClick={() => {
                setShowForm(true);
                setStatus("");
                setError("");
              }}
              className="btn btn-primary h-8 px-4 text-xs"
            >
              Add review
            </button>
          ) : null}
        </div>

        {showForm ? (
          <form
            onSubmit={onSubmit}
            className="mt-3 min-w-0 rounded-xl bg-white p-3.5 shadow-sm ring-1 ring-black/[0.04] sm:p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-lg text-ink md:text-xl">Write a review</h3>
                <p className="mt-0.5 text-[12px] text-ink-soft">Share how this piece feels for you.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-full px-2.5 py-1 text-[11px] font-medium text-ink-soft transition hover:bg-[#f7f4ef] hover:text-ink"
              >
                Close
              </button>
            </div>

            <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
              <label className="block text-[12px] font-medium text-ink sm:col-span-2">
                Rating
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {[5, 4, 3, 2, 1].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setRating(n)}
                      className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition ${
                        rating === n
                          ? "bg-forest text-white"
                          : "bg-[#f7f4ef] text-ink hover:bg-mist"
                      }`}
                    >
                      {n} ★
                    </button>
                  ))}
                </div>
              </label>

              {!customer ? (
                <>
                  <label className="block text-[12px] font-medium text-ink">
                    Name
                    <input name="name" required placeholder="Your name" className={field} />
                  </label>
                  <label className="block text-[12px] font-medium text-ink">
                    Email
                    <input
                      name="email"
                      type="email"
                      placeholder="you@email.com"
                      className={field}
                    />
                  </label>
                </>
              ) : null}

              <label className="block text-[12px] font-medium text-ink sm:col-span-2">
                Title <span className="font-normal text-ink-soft">(optional)</span>
                <input name="title" placeholder="A short headline" className={field} />
              </label>

              <label className="block text-[12px] font-medium text-ink sm:col-span-2">
                Your experience
                <textarea
                  name="body"
                  required
                  rows={3}
                  placeholder="How has this piece supported you?"
                  className={field}
                />
              </label>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary h-9 px-4 text-xs disabled:opacity-60"
              >
                {submitting ? "Submitting…" : "Submit review"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn btn-ghost h-9 px-4 text-xs"
              >
                Cancel
              </button>
            </div>
            {error ? <p className="mt-2 text-[12px] font-medium text-sale">{error}</p> : null}
          </form>
        ) : null}

        <div className="mt-3 min-w-0">
          {reviews.length ? (
            <ul className="max-h-[18rem] space-y-2 overflow-y-auto overscroll-contain pr-1">
              {reviews.map((r) => (
                <li
                  key={r._id}
                  className="rounded-xl border border-white bg-white px-3 py-2.5 shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f3efe6] text-[11px] font-bold text-forest">
                      {(r.name || "T").slice(0, 1).toUpperCase()}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-[13px] font-semibold text-ink">{r.name}</p>
                      <p className="text-[11px] text-[#f5a623]">
                        {"★".repeat(r.rating)}
                        {"☆".repeat(5 - r.rating)}
                      </p>
                    </div>
                  </div>
                  {r.title ? (
                    <p className="mt-1.5 text-[12px] font-semibold text-ink">{r.title}</p>
                  ) : null}
                  {r.body ? (
                    <p className="mt-1 text-[12px] leading-relaxed text-ink-soft">{r.body}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-xl border border-dashed border-[var(--border)] bg-white/80 px-3 py-3 text-center">
              <p className="text-[13px] font-medium text-ink">No reviews yet</p>
              <p className="mt-0.5 text-[11px] text-ink-soft">
                Your words help others choose with clarity.
              </p>
            </div>
          )}
        </div>
    </>
  );

  if (embedded) {
    return <div className="min-w-0">{body}</div>;
  }

  return (
    <section className="w-full border-y border-[var(--border)] bg-[#f7f4ef]">
      <div className="mx-auto w-full max-w-5xl px-3 py-5 sm:px-4 md:px-5 md:py-6">{body}</div>
    </section>
  );
}
