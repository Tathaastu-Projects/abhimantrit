"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cart-store";
import { useAuthStore } from "@/lib/auth-store";
import {
  cancelUnpaidOrder,
  createRazorpayOrder,
  createStoreOrder,
  validateCoupon,
  verifyRazorpayPayment,
} from "@/lib/api";
import { formatINR } from "@/lib/format";
import type { CouponValidation } from "@/types/product";

const fieldClass =
  "w-full rounded-[0.9rem] border border-[var(--border)] bg-white/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-temple/30";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

async function loadRazorpayScript() {
  if (typeof window === "undefined") return false;
  if (window.Razorpay) return true;
  return new Promise<boolean>((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const subtotalFn = useCartStore((s) => s.subtotal);
  const customer = useAuthStore((s) => s.customer);
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
    setCouponMsg("");
    try {
      const res = await validateCoupon(couponInput.trim(), subtotal);
      setCoupon(res.data);
      setCouponMsg(res.data.description || "Coupon applied");
    } catch (err) {
      setCoupon(null);
      setCouponMsg(err instanceof Error ? err.message : "Invalid coupon");
    }
  }

  async function finishOnlinePayment(storeOrderId: string, amount: number, orderNumber: string) {
    const rz = await createRazorpayOrder(amount, orderNumber);
    const pay = rz.data;

    if (pay.mode === "mock") {
      await verifyRazorpayPayment({
        razorpay_order_id: pay.id,
        razorpay_payment_id: `pay_dev_${Date.now()}`,
        razorpay_signature: "dev_mock_signature",
        storeOrderId,
      });
      return;
    }

    const ok = await loadRazorpayScript();
    if (!ok || !window.Razorpay) {
      throw new Error("Could not load Razorpay checkout");
    }

    await new Promise<void>((resolve, reject) => {
      const rzp = new window.Razorpay!({
        key: pay.keyId,
        amount: pay.amount,
        currency: pay.currency || "INR",
        name: "Tathaastu",
        description: `Order ${orderNumber}`,
        order_id: pay.id,
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          try {
            await verifyRazorpayPayment({
              ...response,
              storeOrderId,
            });
            resolve();
          } catch (e) {
            reject(e);
          }
        },
        modal: {
          ondismiss: () => reject(new Error("Payment cancelled")),
        },
      });
      rzp.open();
    });
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    let createdOrderId: string | null = null;
    try {
      const res = await createStoreOrder({
        customer: {
          name: String(fd.get("name") || ""),
          email: String(fd.get("email") || ""),
          phone: String(fd.get("phone") || ""),
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
        couponCode: coupon?.code,
        notes: String(fd.get("notes") || ""),
      });

      const order = res.data;
      createdOrderId = order.id;
      if (paymentMethod === "online") {
        await finishOnlinePayment(order.id, order.pricing?.total || total, order.orderNumber);
      }

      clear();
      router.push(`/order/success?orderNumber=${encodeURIComponent(order.orderNumber || "")}`);
    } catch (err) {
      if (paymentMethod === "online" && createdOrderId) {
        try {
          await cancelUnpaidOrder(createdOrderId);
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
        Pay with Cash on Delivery or online (Razorpay). Coupons: try <code>WELCOME10</code> or{" "}
        <code>FLAT200</code>.
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
                Pay online (Razorpay / UPI / Cards)
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

          <div className="mt-4 flex gap-2">
            <input
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              placeholder="Coupon code"
              className={fieldClass}
            />
            <button type="button" onClick={applyCoupon} className="btn btn-ghost shrink-0">
              Apply
            </button>
          </div>
          {couponMsg ? <p className="mt-2 text-xs text-ink-soft">{couponMsg}</p> : null}

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
