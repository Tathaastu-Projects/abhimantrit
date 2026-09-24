import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-pad py-20 text-center">
      <h1 className="font-display text-4xl">Page not found</h1>
      <p className="mt-3 text-ink-soft">This path isn’t in the Tathaastu store.</p>
      <Link href="/" className="btn btn-primary mt-8">
        Back home
      </Link>
    </div>
  );
}
