"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { subscribeNewsletter } from "@/lib/api";

type Props = {
  support?: { email?: string; phone?: string };
};

export function SiteFooter({ support }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await subscribeNewsletter(email);
      setStatus("ok");
      setMessage("You’re on the list. Blessings ahead.");
      setEmail("");
    } catch (err) {
      setStatus("err");
      setMessage(err instanceof Error ? err.message : "Could not subscribe");
    }
  }

  return (
    <footer className="mt-16 bg-forest text-white">
      <div className="container-pad grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl">Tathaastu</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">
            Sacred objects chosen with care — Rudraksha, gemstones, crystals and yantras for a
            calmer, clearer path.
          </p>
          <form onSubmit={onSubmit} className="mt-6 flex max-w-sm gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email for blessings & drops"
              className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm outline-none placeholder:text-white/45 focus:border-brass-soft"
            />
            <button type="submit" className="btn btn-primary shrink-0">
              Join
            </button>
          </form>
          {status !== "idle" ? (
            <p className={`mt-2 text-xs ${status === "ok" ? "text-brass-soft" : "text-red-300"}`}>
              {message}
            </p>
          ) : null}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-soft">Shop</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li><Link href="/shop/rudraksha">Rudraksha</Link></li>
            <li><Link href="/shop/gemstone">Gemstones</Link></li>
            <li><Link href="/shop/crystal">Crystals</Link></li>
            <li><Link href="/shop/bracelet">Bracelets</Link></li>
            <li><Link href="/collections/bestsellers">Bestsellers</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-soft">Help</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li><Link href="/track-order">Track Order</Link></li>
            <li><Link href="/wishlist">Wishlist</Link></li>
            <li><Link href="/account">Account</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/policies/shipping">Shipping</Link></li>
            <li><Link href="/policies/refund">Returns</Link></li>
            <li><Link href="/policies/privacy">Privacy</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-soft">Visit</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li><Link href="/about">About Tathaastu</Link></li>
            <li>{support?.email || "hello@tathaastu.in"}</li>
            <li>{support?.phone || "+91 XXXXX XXXXX"}</li>
            <li>COD available · Lab certified</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Tathaastu. All rights reserved.
      </div>
    </footer>
  );
}
