import Link from "next/link";

export default function AccountFaqsPage() {
  return (
    <div className="container-pad max-w-3xl py-12">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-forest">Account</p>
      <h1 className="mt-2 font-display text-4xl text-ink">FAQs</h1>
      <p className="mt-3 max-w-xl text-ink-soft">
        Helpful answers for your Abhimantrit account and orders will appear here soon.
      </p>

      <div className="mt-10 rounded-2xl border border-[var(--border)] bg-[#f7f3ec] px-6 py-12 text-center">
        <p className="font-display text-3xl text-ink md:text-4xl">Coming Soon</p>
        <p className="mt-3 text-sm text-ink-soft">FAQs are on the way. Please check back shortly.</p>
      </div>

      <div className="mt-8">
        <Link href="/account" className="btn btn-ghost">
          Back to account
        </Link>
      </div>
    </div>
  );
}
