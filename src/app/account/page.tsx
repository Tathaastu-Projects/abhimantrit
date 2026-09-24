"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { getMe, getMyOrders, loginCustomer, registerCustomer } from "@/lib/api";
import { useAuthStore } from "@/lib/auth-store";
import { formatINR } from "@/lib/format";

const field =
  "w-full rounded-xl border border-[var(--border)] bg-white/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-temple/30";

export default function AccountPage() {
  const { token, customer, setSession, clearSession } = useAuthStore();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [error, setError] = useState("");
  const [orders, setOrders] = useState<unknown[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const me = await getMe(token);
        setSession(token, me.data);
        const o = await getMyOrders(token);
        setOrders(o.data || []);
      } catch {
        clearSession();
      }
    })();
  }, [token, setSession, clearSession]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    try {
      if (mode === "login") {
        const res = await loginCustomer({
          email: String(fd.get("email") || ""),
          password: String(fd.get("password") || ""),
        });
        setSession(res.data.token, res.data.customer);
      } else {
        const res = await registerCustomer({
          name: String(fd.get("name") || ""),
          email: String(fd.get("email") || ""),
          phone: String(fd.get("phone") || ""),
          password: String(fd.get("password") || ""),
        });
        setSession(res.data.token, res.data.customer);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Auth failed");
    }
  }

  if (!mounted) {
    return (
      <div className="container-pad py-16">
        <div className="skeleton h-40" />
      </div>
    );
  }

  if (customer && token) {
    return (
      <div className="container-pad max-w-3xl py-12">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl">Hello, {customer.name}</h1>
            <p className="mt-2 text-ink-soft">{customer.email}</p>
          </div>
          <button type="button" className="btn btn-ghost" onClick={() => clearSession()}>
            Log out
          </button>
        </div>

        <section className="mt-10">
          <h2 className="font-display text-2xl">Your orders</h2>
          {!orders.length ? (
            <p className="mt-3 text-sm text-ink-soft">
              No orders yet. <Link href="/shop" className="text-temple">Browse the shop</Link>
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {orders.map((raw) => {
                const o = raw as {
                  _id: string;
                  orderNumber: string;
                  status: string;
                  paymentStatus?: string;
                  pricing?: { total?: number };
                  createdAt?: string;
                };
                return (
                  <li
                    key={o._id}
                    className="rounded-2xl border border-[var(--border)] bg-white/50 px-4 py-3 text-sm"
                  >
                    <div className="flex flex-wrap justify-between gap-2">
                      <span className="font-semibold">{o.orderNumber}</span>
                      <span className="text-ink-soft capitalize">{o.status}</span>
                    </div>
                    <p className="mt-1 text-ink-soft">
                      {o.pricing?.total != null ? formatINR(o.pricing.total) : ""} ·{" "}
                      {o.paymentStatus || "pending"}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/wishlist" className="btn btn-ghost">
            Wishlist
          </Link>
          <Link href="/track-order" className="btn btn-ghost">
            Track order
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-pad max-w-md py-12">
      <h1 className="font-display text-4xl">{mode === "login" ? "Sign in" : "Create account"}</h1>
      <p className="mt-2 text-ink-soft">Save wishlist and view order history.</p>

      <div className="mt-6 flex gap-2">
        <button
          type="button"
          className={`btn ${mode === "login" ? "btn-primary" : "btn-ghost"}`}
          onClick={() => setMode("login")}
        >
          Login
        </button>
        <button
          type="button"
          className={`btn ${mode === "register" ? "btn-primary" : "btn-ghost"}`}
          onClick={() => setMode("register")}
        >
          Register
        </button>
      </div>

      <form onSubmit={onSubmit} className="mt-6 space-y-3">
        {mode === "register" ? (
          <>
            <input name="name" required placeholder="Full name" className={field} />
            <input name="phone" placeholder="Phone" className={field} />
          </>
        ) : null}
        <input name="email" type="email" required placeholder="Email" className={field} />
        <input
          name="password"
          type="password"
          required
          minLength={6}
          placeholder="Password (min 6)"
          className={field}
        />
        <button type="submit" className="btn btn-primary w-full">
          {mode === "login" ? "Sign in" : "Create account"}
        </button>
        {error ? <p className="text-sm text-sale">{error}</p> : null}
      </form>
    </div>
  );
}
