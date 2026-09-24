"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { submitConsultation } from "@/lib/api";
import type { HomeConsultCta } from "@/types/product";

export function ConsultationCta({ cta }: { cta?: HomeConsultCta | null }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");

  const title = cta?.title || "Not sure what to wear? Talk to our experts";
  const subtitle = cta?.subtitle || "";
  const buttonLabel = cta?.ctaLabel || "Request consultation";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    try {
      await submitConsultation({
        name: String(fd.get("name") || ""),
        phone: String(fd.get("phone") || ""),
        email: String(fd.get("email") || ""),
        interest: String(fd.get("interest") || ""),
        message: String(fd.get("message") || ""),
      });
      setStatus("ok");
      setMessage("Thank you. Our guide will reach out soon.");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("err");
      setMessage(err instanceof Error ? err.message : "Could not submit");
    }
  }

  return (
    <section className="container-pad py-10 md:py-12">
      <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-[#f7f4ef] px-6 py-9 md:flex-row md:items-center md:px-10 md:py-10">
        <div className="max-w-xl">
          <h2 className="font-display text-2xl text-ink md:text-3xl">{title}</h2>
          {subtitle ? <p className="mt-2 text-ink-soft">{subtitle}</p> : null}
        </div>
        <button type="button" className="btn btn-primary shrink-0" onClick={() => setOpen((v) => !v)}>
          {open ? "Close" : buttonLabel}
        </button>
      </div>

      {open ? (
        <form
          onSubmit={onSubmit}
          className="mt-4 grid gap-3 rounded-2xl border border-[var(--border)] bg-white p-5 md:grid-cols-2"
        >
          <input name="name" required placeholder="Your name" className="rounded-xl border border-[var(--border)] px-4 py-3 text-sm" />
          <input name="phone" required placeholder="Phone" className="rounded-xl border border-[var(--border)] px-4 py-3 text-sm" />
          <input name="email" type="email" placeholder="Email" className="rounded-xl border border-[var(--border)] px-4 py-3 text-sm" />
          <input name="interest" placeholder="Interest" className="rounded-xl border border-[var(--border)] px-4 py-3 text-sm" />
          <textarea name="message" rows={3} placeholder="Message" className="rounded-xl border border-[var(--border)] px-4 py-3 text-sm md:col-span-2" />
          <button type="submit" className="btn btn-primary md:col-span-2 md:w-fit">
            Submit request
          </button>
          {status !== "idle" ? (
            <p className={`md:col-span-2 text-sm ${status === "ok" ? "text-forest" : "text-sale"}`}>
              {message}
            </p>
          ) : null}
        </form>
      ) : null}

      {!open && cta?.ctaHref ? (
        <p className="sr-only">
          <Link href={cta.ctaHref}>{buttonLabel}</Link>
        </p>
      ) : null}
    </section>
  );
}
