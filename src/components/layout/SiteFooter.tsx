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
    <footer className="mt-16 bg-forest text-white">
      <div className="container-pad grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl">{BUSINESS.displayName}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">
            Sacred objects chosen with care — Rudraksha, gemstones, crystals and yantras for a
            calmer, clearer path. By {BUSINESS.founder}.
          </p>
          <p className="mt-3 max-w-sm text-xs leading-relaxed text-white/60">
            {BUSINESS.companyAbout}
          </p>
          {formReady ? (
            <form
              onSubmit={onSubmit}
              className="mt-6 flex max-w-sm gap-2"
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
                className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm outline-none placeholder:text-white/45 focus:border-brass-soft"
              />
              <button type="submit" className="btn btn-primary shrink-0">
                Join
              </button>
            </form>
          ) : (
            <div className="mt-6 h-11 max-w-sm" aria-hidden />
          )}
          {status !== "idle" ? (
            <p className={`mt-2 text-xs ${status === "ok" ? "text-brass-soft" : "text-red-300"}`}>
              {message}
            </p>
          ) : null}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-soft">Shop</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
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
              <Link href="/shop/loose-stones">Loose Stones</Link>
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
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-soft">Policies</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
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
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-soft">Company</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
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
              <li key={line} className="text-white/60">
                {line}
              </li>
            ))}
            <li className="text-white/60">COD available · Lab certified</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        {copyrightLine()}
      </div>
    </footer>
  );
}
