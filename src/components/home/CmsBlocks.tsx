import type { StoreBanner, StoreBlogPost } from "@/types/product";
import Link from "next/link";

/** Home hero — full-width front banner (SVG needs explicit aspect or it collapses) */
export function HomeBanners({ banners: _banners }: { banners?: StoreBanner[] }) {
  return (
    <section className="w-full overflow-hidden bg-forest">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/home_banner.svg"
        alt="Tathaastu — Is your home blocking positive energy?"
        width={1848}
        height={669}
        className="block w-full"
        style={{ aspectRatio: "1848 / 669", height: "auto" }}
      />

      {/* Overlay copy/CTAs temporarily hidden — banner asset already includes text & buttons
      <div className="relative container-pad flex items-center py-14 md:py-16 lg:py-20">
        <div className="fade-up max-w-xl text-white">
          <h1>...</h1>
          <Link href="/contact" className="btn btn-primary">Talk to Vastu expert</Link>
        </div>
      </div>
      */}
    </section>
  );
}

export function BlogTeasers({ posts }: { posts: StoreBlogPost[] }) {
  if (!posts.length) return null;
  const [featured, ...rest] = posts;

  return (
    <section className="container-pad py-10 md:py-14">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 className="font-display text-3xl md:text-4xl">From the journal</h2>
        <Link href="/blog" className="text-sm font-semibold text-pink hover:underline">
          View all
        </Link>
      </div>
      <Link href={`/blog/${featured.slug}`} className="group block">
        {featured.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={featured.coverImage}
            alt=""
            className="aspect-[21/9] w-full rounded-2xl object-cover"
          />
        ) : (
          <div className="aspect-[21/9] rounded-2xl bg-pink-soft" />
        )}
        <h3 className="mt-5 font-display text-2xl text-ink md:text-3xl">{featured.title}</h3>
        {featured.excerpt ? (
          <p className="mt-2 max-w-3xl text-sm text-ink-soft md:text-base">{featured.excerpt}</p>
        ) : null}
      </Link>
      {rest.length ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {rest.slice(0, 2).map((post) => (
            <Link key={post._id} href={`/blog/${post.slug}`} className="group block">
              {post.coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.coverImage}
                  alt=""
                  className="aspect-[16/10] w-full rounded-xl object-cover"
                />
              ) : (
                <div className="aspect-[16/10] rounded-xl bg-mist" />
              )}
              <h3 className="mt-3 font-display text-xl text-ink">{post.title}</h3>
            </Link>
          ))}
        </div>
      ) : null}
    </section>
  );
}

/** @deprecated import from `@/components/catalog/CategoryBanner` */
export { CategoryBanner } from "@/components/catalog/CategoryBanner";
