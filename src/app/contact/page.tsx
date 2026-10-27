"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { submitConsultation } from "@/lib/api";
import { BUSINESS, supportEmail, supportPhone } from "@/lib/business";

export default function ContactPage() {
  const [status, setStatus] = useState("");
  const email = supportEmail();
  const phone = supportPhone();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    try {
      await submitConsultation({
        name: String(fd.get("name") || ""),
        phone: String(fd.get("phone") || ""),
        email: String(fd.get("email") || ""),
        message: String(fd.get("message") || ""),
        interest: "General contact",
      });
      setStatus("Message sent. We’ll respond soon.");
      e.currentTarget.reset();
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Failed to send");
    }
  }

  return (
    <div className="container-pad max-w-3xl py-14 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest/70">Support</p>
      <h1 className="mt-2 font-display text-4xl text-ink md:text-5xl">Contact Us</h1>
      <p className="mt-3 text-ink-soft">
        Questions about products, orders, shipping, or recommendations — we are here to help.
      </p>

      <div className="mt-8 grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
        <aside className="space-y-5 rounded-2xl bg-mist px-5 py-6 text-sm leading-relaxed text-ink-soft">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-forest/70">Business</p>
            <p className="mt-2 font-semibold text-ink">{BUSINESS.displayName}</p>
            <p className="mt-1 text-xs leading-relaxed">{BUSINESS.companyAbout}</p>
            <p className="mt-2">Legal entity: {BUSINESS.legalName}</p>
            <p>Curated by {BUSINESS.founder}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-forest/70">Email</p>
            <a className="mt-2 block font-medium text-pink underline" href={`mailto:${email}`}>
              {email}
            </a>
          </div>
          {phone ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-forest/70">Phone</p>
              <a className="mt-2 block font-medium text-ink" href={`tel:${phone.replace(/\s/g, "")}`}>
                {phone}
              </a>
            </div>
          ) : null}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-forest/70">Hours</p>
            <p className="mt-2">{BUSINESS.hours}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-forest/70">Address</p>
            <div className="mt-2 space-y-0.5">
              {BUSINESS.addressLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
          <div className="border-t border-[var(--border)] pt-4 text-xs">
            <Link href="/policies/shipping" className="text-pink underline">
              Shipping
            </Link>
            {" · "}
            <Link href="/policies/refund" className="text-pink underline">
              Refunds
            </Link>
            {" · "}
            <Link href="/policies/privacy" className="text-pink underline">
              Privacy
            </Link>
          </div>
        </aside>

        <form onSubmit={onSubmit} className="space-y-3">
          <input
            name="name"
            required
            placeholder="Name"
            className="w-full rounded-xl border border-[var(--border)] bg-white/70 px-4 py-3 text-sm"
          />
          <input
            name="phone"
            required
            placeholder="Phone"
            className="w-full rounded-xl border border-[var(--border)] bg-white/70 px-4 py-3 text-sm"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full rounded-xl border border-[var(--border)] bg-white/70 px-4 py-3 text-sm"
          />
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Message"
            className="w-full rounded-xl border border-[var(--border)] bg-white/70 px-4 py-3 text-sm"
          />
          <button type="submit" className="btn btn-primary">
            Send message
          </button>
          {status ? <p className="text-sm text-temple">{status}</p> : null}
        </form>
      </div>
    </div>
  );
}
