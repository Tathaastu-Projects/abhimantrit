"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { subscribeNewsletter } from "@/lib/api";
import { BUSINESS, copyrightLine, supportEmail, supportPhone } from "@/lib/business";

type Props = {
  support?: { email?: string; phone?: string };
};

export function SiteFooter({ support }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");
  /** Avoid LastPass/1Password injecting nodes before hydrate (mismatched DOM). */
  const [formReady, setFormReady] = useState(false);
  const contactEmail = supportEmail(support?.email);
  const contactPhone = supportPhone(support?.phone);

  useEffect(() => setFormReady(true), []);

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
    <footer className="mt-0 bg-forest text-white">
      <div className="container-pad grid gap-5 py-5 md:grid-cols-[1.2fr_1fr_1fr_1fr] md:gap-6 md:py-6">
        <div>
          <p className="font-display text-xl leading-tight md:text-2xl">{BUSINESS.displayName}</p>
          <p className="mt-1.5 max-w-sm text-[12px] leading-snug text-white/75 md:text-[13px]">
            Sacred objects chosen with care — Rudraksha, gemstones, crystals and yantras for a
            calmer, clearer path. By {BUSINESS.founder}.
          </p>
          <p className="mt-1.5 max-w-sm text-[11px] leading-snug text-white/55">
            {BUSINESS.companyAbout}
          </p>
          {formReady ? (
            <form
              onSubmit={onSubmit}
              className="mt-3 flex max-w-sm gap-1.5"
              autoComplete="off"
              data-lpignore="true"
              data-1p-ignore="true"
              data-bwignore="true"
              data-form-type="other"
            >
              <input
                type="email"
                name="newsletter-email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email for blessings & drops"
                autoComplete="off"
                data-lpignore="true"
                data-1p-ignore="true"
                data-bwignore="true"
                data-form-type="other"
                className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-xs outline-none placeholder:text-white/45 focus:border-brass-soft"
              />
              <button
                type="submit"
                className="shrink-0 rounded-md bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-forest"
              >
                Join
              </button>
            </form>
          ) : (
            <div className="mt-3 h-8 max-w-sm" aria-hidden />
          )}
          {status !== "idle" ? (
            <p className={`mt-1.5 text-[11px] ${status === "ok" ? "text-brass-soft" : "text-red-300"}`}>
              {message}
            </p>
          ) : null}
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brass-soft">Shop</p>
          <ul className="mt-2 space-y-1 text-[12px] leading-snug text-white/80 md:text-[13px]">
            <li>
              <Link href="/shop/crystal-bracelets">Crystal Bracelets</Link>
            </li>
            <li>
              <Link href="/shop/rudraksha">Rudraksha</Link>
            </li>
            <li>
              <Link href="/shop/crystal-anklets">Crystal Anklets</Link>
            </li>
            <li>
              <Link href="/shop/tumbles">Tumbles</Link>
            </li>
            <li>
              <Link href="/shop/crystal-trees">Crystal Trees</Link>
            </li>
            <li>
              <Link href="/shop/pyramids">Pyramids</Link>
            </li>
            <li>
              <Link href="/shop/mala">Mala</Link>
            </li>
            <li>
              <Link href="/shop/photo-frames">Photo Frames</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brass-soft">Policies</p>
          <ul className="mt-2 space-y-1 text-[12px] leading-snug text-white/80 md:text-[13px]">
            <li>
              <Link href="/policies/terms">Terms &amp; Conditions</Link>
            </li>
            <li>
              <Link href="/policies/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/policies/refund">Refund &amp; Cancellation</Link>
            </li>
            <li>
              <Link href="/policies/shipping">Shipping &amp; Delivery</Link>
            </li>
            <li>
              <Link href="/track-order">Track Order</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brass-soft">Company</p>
          <ul className="mt-2 space-y-1 text-[12px] leading-snug text-white/80 md:text-[13px]">
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
            <li>
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
            </li>
            {contactPhone ? (
              <li>
                <a href={`tel:${contactPhone.replace(/\s/g, "")}`}>{contactPhone}</a>
              </li>
            ) : null}
            {BUSINESS.addressLines.map((line) => (
              <li key={line} className="text-white/55">
                {line}
              </li>
            ))}
            <li className="text-white/55">COD available · Lab certified</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-2.5 text-center text-[10px] text-white/45 md:text-[11px]">
        {copyrightLine()}
      </div>
    </footer>
  );
}
