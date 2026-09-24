"use client";

import { FormEvent, useState } from "react";
import { submitConsultation } from "@/lib/api";

export default function ContactPage() {
  const [status, setStatus] = useState("");

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
    <div className="container-pad max-w-xl py-14">
      <h1 className="font-display text-4xl">Contact</h1>
      <p className="mt-3 text-ink-soft">Questions about products, orders, or recommendations.</p>
      <form onSubmit={onSubmit} className="mt-8 space-y-3">
        <input name="name" required placeholder="Name" className="w-full rounded-xl border border-[var(--border)] bg-white/70 px-4 py-3 text-sm" />
        <input name="phone" required placeholder="Phone" className="w-full rounded-xl border border-[var(--border)] bg-white/70 px-4 py-3 text-sm" />
        <input name="email" type="email" placeholder="Email" className="w-full rounded-xl border border-[var(--border)] bg-white/70 px-4 py-3 text-sm" />
        <textarea name="message" required rows={5} placeholder="Message" className="w-full rounded-xl border border-[var(--border)] bg-white/70 px-4 py-3 text-sm" />
        <button type="submit" className="btn btn-primary">Send</button>
      </form>
      {status ? <p className="mt-4 text-sm text-temple">{status}</p> : null}
    </div>
  );
}
