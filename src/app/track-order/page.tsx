"use client";

import { FormEvent, Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { trackOrder } from "@/lib/api";
import { formatINR } from "@/lib/format";

type TrackedOrder = {
  orderNumber: string;
  status: string;
  paymentMethod?: string;
  paymentStatus?: string;
  pricing?: {
    subtotal?: number;
    discount?: number;
    shipping?: number;
    total?: number;
  };
  items?: Array<{
    title?: string;
    quantity?: number;
    variantLabel?: string;
    lineTotal?: number;
    unitSalePrice?: number;
  }>;
  shippingAddress?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    pincode?: string;
    country?: string;
  };
  customer?: { name?: string; phone?: string; email?: string };
  createdAt?: string;
  updatedAt?: string;
};

const TIMELINE = [
  { key: "placed", label: "Order placed", hint: "We received your order" },
  { key: "confirmed", label: "Confirmed", hint: "Payment / COD confirmed" },
  { key: "packed", label: "Packed", hint: "Ready at the warehouse" },
  { key: "shipped", label: "Shipped", hint: "On the way to you" },
  { key: "delivered", label: "Delivered", hint: "Order completed" },
] as const;

function statusIndex(status: string) {
  if (status === "cancelled") return -1;
  const idx = TIMELINE.findIndex((s) => s.key === status);
  return idx >= 0 ? idx : 0;
}

function formatDate(value?: string) {
  if (!value) return "";
  try {
    return new Date(value).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return value;
  }
}

function OrderTimeline({ order }: { order: TrackedOrder }) {
  const cancelled = order.status === "cancelled";
  const current = statusIndex(order.status);

  return (
    <div className="mt-8 rounded-2xl border border-[var(--border)] bg-white/70 p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-forest/70">
            Order
          </p>
          <h2 className="mt-1 font-display text-2xl text-ink">{order.orderNumber}</h2>
          {order.createdAt ? (
            <p className="mt-1 text-sm text-ink-soft">Placed {formatDate(order.createdAt)}</p>
          ) : null}
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
            cancelled
              ? "bg-sale/10 text-sale"
              : "bg-forest/10 text-forest"
          }`}
        >
          {cancelled ? "Cancelled" : order.status}
        </span>
      </div>

      {cancelled ? (
        <p className="mt-6 rounded-xl bg-pink-soft px-4 py-3 text-sm text-ink-soft">
          This order was cancelled
          {order.paymentStatus === "failed" ? " (payment not completed)." : "."} Contact support if
          you need help placing it again.
        </p>
      ) : (
        <ol className="relative mt-8 space-y-0 border-l-2 border-[var(--border)] pl-6">
          {TIMELINE.map((step, idx) => {
            const done = idx <= current;
            const active = idx === current;
            return (
              <li key={step.key} className="relative pb-8 last:pb-0">
                <span
                  className={`absolute -left-[1.55rem] top-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                    done
                      ? "border-forest bg-forest"
                      : "border-[var(--border)] bg-white"
                  }`}
                  aria-hidden
                >
                  {done ? <span className="h-1.5 w-1.5 rounded-full bg-white" /> : null}
                </span>
                <p
                  className={`text-sm font-semibold ${
                    active ? "text-forest" : done ? "text-ink" : "text-ink-soft"
                  }`}
                >
                  {step.label}
                </p>
                <p className="mt-0.5 text-xs text-ink-soft">{step.hint}</p>
              </li>
            );
          })}
        </ol>
      )}

      <div className="mt-6 grid gap-4 border-t border-[var(--border)] pt-6 text-sm md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-forest/70">Payment</p>
          <p className="mt-2 text-ink">
            {(order.paymentMethod || "—").toUpperCase()}
            {order.paymentStatus ? ` · ${order.paymentStatus}` : ""}
          </p>
          {order.pricing?.total != null ? (
            <p className="mt-1 font-semibold text-ink">{formatINR(order.pricing.total)}</p>
          ) : null}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-forest/70">Ship to</p>
          {order.shippingAddress ? (
            <div className="mt-2 space-y-0.5 text-ink-soft">
              {order.customer?.name ? <p className="font-medium text-ink">{order.customer.name}</p> : null}
              <p>{order.shippingAddress.line1}</p>
              {order.shippingAddress.line2 ? <p>{order.shippingAddress.line2}</p> : null}
              <p>
                {[order.shippingAddress.city, order.shippingAddress.state, order.shippingAddress.pincode]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            </div>
          ) : (
            <p className="mt-2 text-ink-soft">—</p>
          )}
        </div>
      </div>

      {order.items?.length ? (
        <div className="mt-6 border-t border-[var(--border)] pt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-forest/70">Items</p>
          <ul className="mt-3 space-y-3">
            {order.items.map((item, i) => (
              <li
                key={`${item.title}-${i}`}
                className="flex items-start justify-between gap-4 text-sm"
              >
                <div>
                  <p className="font-medium text-ink">{item.title || "Item"}</p>
                  <p className="text-ink-soft">
                    Qty {item.quantity || 1}
                    {item.variantLabel ? ` · ${item.variantLabel}` : ""}
                  </p>
                </div>
                <p className="shrink-0 text-ink">
                  {formatINR(item.lineTotal ?? (item.unitSalePrice || 0) * (item.quantity || 1))}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function TrackForm() {
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState(searchParams.get("orderNumber") || "");
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState<TrackedOrder | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await trackOrder(orderNumber, phone);
      setResult(res.data as TrackedOrder);
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
      {result ? <OrderTimeline order={result} /> : null}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense
      fallback={
        <div className="container-pad py-12">
          <div className="skeleton h-40" />
        </div>
      }
    >
      <TrackForm />
    </Suspense>
  );
}
