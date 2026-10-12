import type { StoreBanner, StoreBlogPost } from "@/types/product";
import Link from "next/link";
import { HomeHero } from "@/components/home/HomeHero";

/** Home hero — Figma banner with overlay copy (CMS banners unused for now) */
export function HomeBanners({ banners: _banners }: { banners?: StoreBanner[] }) {
  return <HomeHero />;
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
