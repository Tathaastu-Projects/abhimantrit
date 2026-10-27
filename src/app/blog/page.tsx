import Link from "next/link";
import { getBlogs } from "@/lib/api";
import { resolveBannerUrl } from "@/lib/format";
import { BlogCover } from "@/components/home/BlogCover";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildPageMetadata("blog");
}

function localUpload(url?: string) {
  if (!url) return "";
  if (/^https?:\/\//i.test(url) && !url.includes("/uploads/")) return "";
  return resolveBannerUrl(url);
}

function coverSrc(post: { coverImage?: string; playbackUrl?: string; videoUrl?: string }) {
  if (post.coverImage) return localUpload(post.coverImage);
  const video = localUpload(post.playbackUrl || post.videoUrl);
  if (video.endsWith(".mp4")) return video.replace(/\.mp4$/, ".jpg");
  return "";
}

function videoSrc(post: { playbackUrl?: string; videoUrl?: string }) {
  return localUpload(post.playbackUrl || post.videoUrl);
}

export default async function BlogIndexPage() {
  const { posts } = await getBlogs(1, 24);

  return (
    <div className="container-pad py-12">
      <h1 className="font-display text-4xl md:text-5xl">Journal</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        Guides on Rudraksha, gemstones and intention-led living from Tathaastu.
      </p>

      {!posts.length ? (
        <p className="mt-10 text-ink-soft">No posts yet.</p>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="overflow-hidden rounded-3xl border border-[var(--border)] bg-white/45 transition hover:-translate-y-0.5"
            >
              <BlogCover
                image={coverSrc(post)}
                video={videoSrc(post)}
                className="aspect-[16/10] w-full bg-[#f3f3f3]"
              />
              <div className="p-5">
                <h2 className="font-display text-2xl">{post.title}</h2>
                {post.excerpt ? (
                  <p className="mt-2 line-clamp-3 text-sm text-ink-soft">{post.excerpt}</p>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
