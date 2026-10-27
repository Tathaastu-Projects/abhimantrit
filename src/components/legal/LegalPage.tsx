import type { ReactNode } from "react";
import { BUSINESS } from "@/lib/business";

type Props = {
  title: string;
  updated?: string;
  children: ReactNode;
};

export function LegalPage({ title, updated = "September 2026", children }: Props) {
  return (
    <article className="container-pad max-w-3xl py-14 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest/70">
        {BUSINESS.displayName}
      </p>
      <h1 className="mt-2 font-display text-4xl text-ink md:text-5xl">{title}</h1>
      <p className="mt-3 text-sm text-ink-soft">Last updated: {updated}</p>
      <div className="legal-prose mt-8 space-y-4 text-[15px] leading-relaxed text-ink-soft [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-ink [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-ink [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_a]:text-pink [&_a]:underline">
        {children}
      </div>
    </article>
  );
}
