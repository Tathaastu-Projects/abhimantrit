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
      setStatus("Review submitted. Thank you.");
      e.currentTarget.reset();
      setRating(5);
      await load();
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Could not submit review");
    }
  }

  const avg = ratingAvg || 0;
  const count = ratingCount || 0;

  return (
    <section className="w-full border-y border-[var(--border)] bg-[#faf8f5]">
      <div className="w-full px-4 py-12 sm:px-6 md:px-8 md:py-14 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl text-ink md:text-4xl">Reviews</h2>
            <p className="mt-2 text-sm text-ink-soft md:text-base">
              {count > 0
                ? `${avg.toFixed(1)} / 5 from ${count} ${count === 1 ? "review" : "reviews"}`
                : "Be the first to share your experience with this piece"}
            </p>
          </div>
          {count > 0 ? (
            <div className="rounded-2xl bg-white px-5 py-3 shadow-sm ring-1 ring-black/5">
              <p className="text-2xl font-semibold text-ink">{avg.toFixed(1)}</p>
              <p className="text-sm text-[#f5a623]">{"★".repeat(Math.round(avg))}{"☆".repeat(5 - Math.round(avg))}</p>
            </div>
          ) : null}
        </div>

        {/* Two columns: reviews list + form — fills the width, no empty right void */}
        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-14">
          <div className="min-w-0 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-ink-soft">
              Customer voices
            </h3>
            {reviews.length ? (
              <ul className="space-y-4">
                {reviews.map((r) => (
                  <li
                    key={r._id}
                    className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-semibold text-ink">{r.name}</p>
                      <p className="text-sm text-[#f5a623]">
                        {"★".repeat(r.rating)}
                        {"☆".repeat(5 - r.rating)}
                      </p>
                    </div>
                    {r.title ? <p className="mt-2 text-sm font-semibold text-ink">{r.title}</p> : null}
                    {r.body ? (
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{r.body}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-2xl border border-dashed border-[var(--border)] bg-white/60 px-6 py-12 text-center">
                <p className="font-display text-xl text-ink">No reviews yet</p>
                <p className="mt-2 text-sm text-ink-soft">Your words help others choose with confidence.</p>
              </div>
            )}
          </div>

          <div className="min-w-0">
            <form
              onSubmit={onSubmit}
              className="h-full rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm md:p-8"
            >
              <h3 className="font-display text-2xl text-ink">Write a review</h3>
              <p className="mt-1 text-sm text-ink-soft">Share how this piece feels in your life.</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-ink sm:col-span-2">
                  Rating
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[#faf8f5] px-3 py-2.5 text-sm outline-none focus:border-pink"
                  >
                    {[5, 4, 3, 2, 1].map((n) => (
                      <option key={n} value={n}>
                        {n} stars
                      </option>
                    ))}
                  </select>
                </label>

                {!customer ? (
                  <>
                    <label className="block text-sm font-medium text-ink">
                      Name
                      <input
                        name="name"
                        required
                        placeholder="Your name"
                        className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[#faf8f5] px-3 py-2.5 text-sm outline-none focus:border-pink"
                      />
                    </label>
                    <label className="block text-sm font-medium text-ink">
                      Email
                      <input
                        name="email"
                        type="email"
                        placeholder="you@email.com"
                        className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[#faf8f5] px-3 py-2.5 text-sm outline-none focus:border-pink"
                      />
                    </label>
                  </>
                ) : null}

                <label className="block text-sm font-medium text-ink sm:col-span-2">
                  Title <span className="font-normal text-ink-soft">(optional)</span>
                  <input
                    name="title"
                    placeholder="A short headline"
                    className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[#faf8f5] px-3 py-2.5 text-sm outline-none focus:border-pink"
                  />
                </label>

                <label className="block text-sm font-medium text-ink sm:col-span-2">
                  Your experience
                  <textarea
                    name="body"
                    required
                    rows={5}
                    placeholder="How has this piece supported you?"
                    className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[#faf8f5] px-3 py-2.5 text-sm outline-none focus:border-pink"
                  />
                </label>
              </div>

              <button type="submit" className="btn btn-primary mt-6">
                Submit review
              </button>
              {status ? <p className="mt-3 text-sm text-forest">{status}</p> : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
