"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import { trackOrder } from "@/lib/api";
import { Suspense } from "react";

function TrackForm() {
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState(searchParams.get("orderNumber") || "");
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState<unknown>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await trackOrder(orderNumber, phone);
      setResult(res.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not find order");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-pad max-w-xl py-12">
      <h1 className="font-display text-4xl">Track order</h1>
      <p className="mt-2 text-ink-soft">Enter your order number and the phone used at checkout.</p>
      <form onSubmit={onSubmit} className="mt-8 space-y-3">
        <input
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          required
          placeholder="Order number (e.g. TST-20260916-1234)"
          className="w-full rounded-xl border border-[var(--border)] bg-white/70 px-4 py-3 text-sm outline-none"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          placeholder="Phone"
          className="w-full rounded-xl border border-[var(--border)] bg-white/70 px-4 py-3 text-sm outline-none"
        />
        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? "Checking…" : "Track"}
        </button>
      </form>
      {error ? <p className="mt-4 text-sm text-sale">{error}</p> : null}
      {result ? (
        <pre className="mt-6 overflow-auto rounded-2xl border border-[var(--border)] bg-white/50 p-4 text-xs text-ink-soft">
          {JSON.stringify(result, null, 2)}
        </pre>
      ) : null}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="container-pad py-12"><div className="skeleton h-40" /></div>}>
      <TrackForm />
    </Suspense>
  );
}
