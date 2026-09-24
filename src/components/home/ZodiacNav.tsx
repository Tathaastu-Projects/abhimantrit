import Link from "next/link";
import type { HomeZodiac } from "@/types/product";
import { FALLBACK_ZODIAC } from "@/lib/api";

export function ZodiacNav({ signs }: { signs?: HomeZodiac[] | string[] }) {
  const list: HomeZodiac[] = (signs?.length ? signs : FALLBACK_ZODIAC).map((s) =>
    typeof s === "string"
      ? { label: s, href: `/shop?zodiac=${encodeURIComponent(s)}` }
      : s,
  );

  return (
    <section className="container-pad py-10 md:py-14">
      <h2 className="font-display text-3xl md:text-4xl">Shop by Zodiac</h2>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {list.map((sign) => (
          <Link
            key={sign.label}
            href={sign.href || `/shop?zodiac=${encodeURIComponent(sign.label)}`}
            className="rounded-xl border border-[var(--border)] bg-white px-4 py-3.5 text-center text-sm font-semibold text-ink transition hover:border-pink/40 hover:text-pink"
          >
            {sign.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
