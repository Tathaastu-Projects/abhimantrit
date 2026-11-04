"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cart-store";
import { useAuthStore } from "@/lib/auth-store";
import {
  cancelUnpaidOrder,
  createStoreOrder,
  initiateEasebuzzPayment,
  validateCoupon,
} from "@/lib/api";
import { formatINR } from "@/lib/format";
import type { CouponValidation } from "@/types/product";

const fieldClass =
  "w-full rounded-[0.9rem] border border-[var(--border)] bg-white/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-temple/30";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const subtotalFn = useCartStore((s) => s.subtotal);
  const customer = useAuthStore((s) => s.customer);
  const token = useAuthStore((s) => s.token);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "online">("cod");
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState<CouponValidation | null>(null);
  const [couponMsg, setCouponMsg] = useState("");

  useEffect(() => setMounted(true), []);

  const subtotal = mounted ? subtotalFn() : 0;
  const discount = coupon?.discount || 0;
  const total = Math.max(0, subtotal - discount);

  if (!mounted) {
    return (
      <div className="container-pad py-16">
        <div className="skeleton h-48 w-full" />
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="container-pad py-20 text-center">
        <h1 className="font-display text-4xl">Nothing to checkout</h1>
        <Link href="/shop" className="btn btn-primary mt-8">
          Browse products
        </Link>
      </div>
    );
  }

  async function applyCoupon() {
    const code = couponInput.trim();
    // Coupon is optional — empty field just clears any previous coupon.
    if (!code) {
      setCoupon(null);
      setCouponMsg("");
      return;
    }
    setCouponMsg("");
    try {
      const res = await validateCoupon(code, subtotal);
      setCoupon(res.data);
      setCouponMsg(res.data.description || "Coupon applied");
    } catch (err) {
      setCoupon(null);
      setCouponMsg(err instanceof Error ? err.message : "Invalid coupon code");
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    let createdOrderId: string | null = null;
    let paymentToken = "";
    let phoneDigits = "";
    try {
      phoneDigits = String(fd.get("phone") || customer?.phone || "").replace(/\D/g, "").slice(-10);
      if (phoneDigits.length !== 10) {
        throw new Error("Enter a valid 10-digit mobile number");
      }
      const email = String(fd.get("email") || customer?.email || "").trim().toLowerCase();
      if (!email || !email.includes("@")) {
        throw new Error("Enter a valid email address");
      }

      const res = await createStoreOrder(
        {
          customer: {
            name: String(fd.get("name") || customer?.name || ""),
            email,
            phone: phoneDigits,
          },
          shippingAddress: {
            line1: String(fd.get("line1") || ""),
            line2: String(fd.get("line2") || ""),
            city: String(fd.get("city") || ""),
            state: String(fd.get("state") || ""),
            pincode: String(fd.get("pincode") || ""),
            country: "India",
          },
          items: items.map((i) => ({
            productId: i.productId,
            variantId: i.variantId || null,
            quantity: i.qty,
          })),
          paymentMethod,
          // Only send when a valid coupon was applied (never required)
          ...(coupon?.code ? { couponCode: coupon.code } : {}),
          notes: String(fd.get("notes") || ""),
        },
        { token },
      );

      const order = res.data;
      createdOrderId = order.id;
      paymentToken = order.paymentToken || "";

      if (paymentMethod === "online") {
        if (!paymentToken) {
          throw new Error("Payment token missing. Please try checkout again.");
        }
        const pay = await initiateEasebuzzPayment(order.id, paymentToken, phoneDigits);
        clear();
        window.location.href = pay.data.paymentUrl;
        return;
      }

      clear();
      router.push(`/order/success?orderNumber=${encodeURIComponent(order.orderNumber || "")}`);
    } catch (err) {
      if (paymentMethod === "online" && createdOrderId && paymentToken) {
        try {
          await cancelUnpaidOrder(createdOrderId, paymentToken, phoneDigits);
        } catch {
          /* best-effort stock restore */
        }
      }
      setError(err instanceof Error ? err.message : "Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-pad py-10 md:py-14">
      <h1 className="font-display text-4xl">Checkout</h1>
      <p className="mt-2 text-ink-soft">
        Pay with Cash on Delivery or online (Easebuzz). Coupon code is optional.
      </p>

      <form onSubmit={onSubmit} className="mt-8 grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-6">
          <section className="rounded-3xl border border-[var(--border)] bg-white/50 p-6">
            <h2 className="font-display text-2xl">Contact</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <input
                name="name"
                required
                defaultValue={customer?.name || ""}
                placeholder="Full name"
                className={fieldClass}
              />
              <input
                name="phone"
                required
                defaultValue={customer?.phone || ""}
                placeholder="Phone"
                className={fieldClass}
              />
              <input
                name="email"
                type="email"
                required
                defaultValue={customer?.email || ""}
                placeholder="Email"
                className={`${fieldClass} md:col-span-2`}
              />
            </div>
          </section>

          <section className="rounded-3xl border border-[var(--border)] bg-white/50 p-6">
            <h2 className="font-display text-2xl">Shipping address</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <input name="line1" required placeholder="Address line 1" className={`${fieldClass} md:col-span-2`} />
              <input name="line2" placeholder="Address line 2" className={`${fieldClass} md:col-span-2`} />
              <input name="city" required placeholder="City" className={fieldClass} />
              <input name="state" required placeholder="State" className={fieldClass} />
              <input name="pincode" required placeholder="Pincode" className={`${fieldClass} md:col-span-2`} />
              <textarea name="notes" placeholder="Order notes (optional)" className={`${fieldClass} md:col-span-2`} rows={3} />
            </div>
          </section>

          <section className="rounded-3xl border border-[var(--border)] bg-temple/5 p-6">
            <h2 className="font-display text-2xl">Payment</h2>
            <div className="mt-4 space-y-3 text-sm">
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="pay"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="accent-temple"
                />
                Cash on Delivery (COD)
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="pay"
                  checked={paymentMethod === "online"}
                  onChange={() => setPaymentMethod("online")}
                  className="accent-temple"
                />
                Pay online (Easebuzz — UPI / Cards / Netbanking)
              </label>
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-3xl border border-[var(--border)] bg-white/60 p-6">
          <h2 className="font-display text-2xl">Summary</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {items.map((i) => (
              <li key={`${i.productId}-${i.variantId}`} className="flex justify-between gap-3">
                <span className="text-ink-soft">
                  {i.title} × {i.qty}
                </span>
                <span className="font-medium">{formatINR(i.unitSalePrice * i.qty)}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 space-y-2 border-t border-[var(--border)] pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-ink-soft">Subtotal</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            {discount > 0 ? (
              <div className="flex justify-between text-temple">
                <span>Coupon ({coupon?.code})</span>
                <span>-{formatINR(discount)}</span>
              </div>
            ) : null}
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{formatINR(total)}</span>
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-1.5 block text-xs font-medium text-ink-soft">
              Coupon code <span className="font-normal">(optional)</span>
            </label>
            <div className="flex gap-2">
              <input
                value={couponInput}
                onChange={(e) => {
                  setCouponInput(e.target.value);
                  if (!e.target.value.trim()) {
                    setCoupon(null);
                    setCouponMsg("");
                  }
                }}
                placeholder="Have a code? Enter here"
                autoComplete="off"
                className={fieldClass}
              />
              <button type="button" onClick={applyCoupon} className="btn btn-ghost shrink-0">
                Apply
              </button>
            </div>
          </div>
          {couponMsg ? (
            <p className={`mt-2 text-xs ${coupon ? "text-temple" : "text-sale"}`}>{couponMsg}</p>
          ) : null}

          {error ? <p className="mt-3 text-sm text-sale">{error}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary mt-6 w-full disabled:opacity-60"
          >
            {loading
              ? "Processing…"
              : paymentMethod === "cod"
                ? "Place COD order"
                : "Pay & place order"}
          </button>
        </aside>
      </form>
    </div>
  );
}
