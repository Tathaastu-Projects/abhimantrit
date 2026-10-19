"use client";

import { FormEvent, useEffect, useState } from "react";
import { getProductReviews, submitProductReview } from "@/lib/api";
import { useAuthStore } from "@/lib/auth-store";
import type { StoreReview } from "@/types/product";

export function ProductReviews({
  slug,
  ratingAvg,
  ratingCount,
}: {
  slug: string;
  ratingAvg?: number;
  ratingCount?: number;
}) {
  const token = useAuthStore((s) => s.token);
  const customer = useAuthStore((s) => s.customer);
  const [reviews, setReviews] = useState<StoreReview[]>([]);
  const [status, setStatus] = useState("");
  const [rating, setRating] = useState(5);

  async function load() {
    const res = await getProductReviews(slug);
    setReviews(res.reviews);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
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
      setStatus("Review submitted. Thank you for sharing.");
      e.currentTarget.reset();
      setRating(5);
      await load();
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Could not submit review");
    }
  }

  const avg = ratingAvg || 0;
  const count = ratingCount || 0;
  const filled = Math.round(avg);

  return (
    <section className="w-full border-y border-[var(--border)] bg-[#f7f4ef]">
      <div className="w-full px-4 py-14 sm:px-6 md:px-8 md:py-16 lg:px-10">
        <div className="flex flex-col gap-6 border-b border-[var(--border)] pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest">Community</p>
            <h2 className="mt-2 font-display text-3xl text-ink md:text-4xl">Reviews</h2>
            <p className="mt-2 max-w-lg text-sm text-ink-soft md:text-base">
              {count > 0
                ? `Loved by ${count} ${count === 1 ? "customer" : "customers"} — real stories from real seekers.`
                : "Be the first to share how this piece has supported you."}
            </p>
          </div>
          <div className="flex items-center gap-4 rounded-[1.25rem] bg-white px-5 py-4 shadow-sm ring-1 ring-black/[0.04]">
            <div>
              <p className="font-display text-3xl text-ink">{count > 0 ? avg.toFixed(1) : "—"}</p>
              <p className="text-sm tracking-wide text-[#f5a623]">
                {count > 0 ? `${"★".repeat(filled)}${"☆".repeat(5 - filled)}` : "No ratings yet"}
              </p>
            </div>
            <div className="h-10 w-px bg-[var(--border)]" />
            <p className="text-sm text-ink-soft">
              {count} {count === 1 ? "review" : "reviews"}
            </p>
          </div>
        </div>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
          <div className="min-w-0 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
              Customer voices
            </h3>
            {reviews.length ? (
              <ul className="space-y-4">
                {reviews.map((r) => (
                  <li
                    key={r._id}
                    className="rounded-[1.25rem] border border-white bg-white p-6 shadow-[0_10px_30px_rgba(15,61,46,0.04)]"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3efe6] text-sm font-bold text-forest">
                          {(r.name || "T").slice(0, 1).toUpperCase()}
                        </span>
                        <div>
                          <p className="font-semibold text-ink">{r.name}</p>
                          <p className="text-xs text-[#f5a623]">
                            {"★".repeat(r.rating)}
                            {"☆".repeat(5 - r.rating)}
                          </p>
                        </div>
                      </div>
                    </div>
                    {r.title ? <p className="mt-4 text-sm font-semibold text-ink">{r.title}</p> : null}
                    {r.body ? (
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{r.body}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex min-h-[280px] flex-col items-center justify-center rounded-[1.25rem] border border-dashed border-[var(--border)] bg-white/70 px-6 py-12 text-center">
                <p className="font-display text-2xl text-ink">No reviews yet</p>
                <p className="mt-2 max-w-sm text-sm text-ink-soft">
                  Your words help others choose with clarity and confidence.
                </p>
              </div>
            )}
          </div>

          <form
            onSubmit={onSubmit}
            className="min-w-0 rounded-[1.35rem] bg-white p-6 shadow-[0_16px_40px_rgba(15,61,46,0.06)] ring-1 ring-black/[0.04] md:p-8"
          >
            <h3 className="font-display text-2xl text-ink md:text-3xl">Write a review</h3>
            <p className="mt-1.5 text-sm text-ink-soft">Tell us how this piece feels in your daily life.</p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-ink sm:col-span-2">
                Rating
                <div className="mt-2 flex flex-wrap gap-2">
                  {[5, 4, 3, 2, 1].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setRating(n)}
                      className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
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
                  <label className="block text-sm font-medium text-ink">
                    Name
                    <input
                      name="name"
                      required
                      placeholder="Your name"
                      className="mt-1.5 w-full rounded-2xl border border-[var(--border)] bg-[#faf8f5] px-4 py-3 text-sm outline-none transition focus:border-pink"
                    />
                  </label>
                  <label className="block text-sm font-medium text-ink">
                    Email
                    <input
                      name="email"
                      type="email"
                      placeholder="you@email.com"
                      className="mt-1.5 w-full rounded-2xl border border-[var(--border)] bg-[#faf8f5] px-4 py-3 text-sm outline-none transition focus:border-pink"
                    />
                  </label>
                </>
              ) : null}

              <label className="block text-sm font-medium text-ink sm:col-span-2">
                Title <span className="font-normal text-ink-soft">(optional)</span>
                <input
                  name="title"
                  placeholder="A short headline"
                  className="mt-1.5 w-full rounded-2xl border border-[var(--border)] bg-[#faf8f5] px-4 py-3 text-sm outline-none transition focus:border-pink"
                />
              </label>

              <label className="block text-sm font-medium text-ink sm:col-span-2">
                Your experience
                <textarea
                  name="body"
                  required
                  rows={5}
                  placeholder="How has this piece supported you?"
                  className="mt-1.5 w-full rounded-2xl border border-[var(--border)] bg-[#faf8f5] px-4 py-3 text-sm outline-none transition focus:border-pink"
                />
              </label>
            </div>

            <button type="submit" className="btn btn-primary mt-7 min-w-[180px]">
              Submit review
            </button>
            {status ? <p className="mt-3 text-sm font-medium text-forest">{status}</p> : null}
          </form>
        </div>
      </div>
    </section>
  );
}
