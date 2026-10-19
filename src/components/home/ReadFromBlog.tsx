import Link from "next/link";
import type { StoreBlogPost } from "@/types/product";
import { resolveBannerUrl } from "@/lib/format";
import { BlogCover } from "@/components/home/BlogCover";

const FALLBACK_POSTS: {
  slug: string;
  title: string;
  category: string;
  date: string;
  coverTint: string;
  coverImage?: string;
  videoUrl?: string;
  playbackUrl?: string;
}[] = [
  {
    slug: "planets-not-aligned-vedic-astrology",
    title: "Top 5 Signs Your Planets Are Not Aligned According to Vedic Astrology",
    category: "Vedic Astrology",
    date: "March 25, 2026",
    coverTint: "#f3e6d4",
  },
  {
    slug: "vastu-tips-for-home-positive-energy",
    title: "10 Vastu Tips for Home to Attract Positive Energy",
    category: "Vastu Tips",
    date: "March 25, 2026",
    coverTint: "#f3e6d4",
  },
  {
    slug: "vastu-plants-for-home-luck",
    title: "Vastu Plants for Home: Which Ones Bring Luck and Positivity?",
    category: "Vastu Shastra",
    date: "March 25, 2026",
    coverTint: "#e8edd4",
  },
];

function driveFileId(url: string) {
  const file = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (file) return file[1];
  if (!/drive\.google\.com|googleusercontent\.com/.test(url)) return "";
  const id = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  return id ? id[1] : "";
}

function mediaImage(url?: string) {
  if (!url) return "";
  const id = driveFileId(url);
  if (id) return `https://lh3.googleusercontent.com/d/${id}`;
  return resolveBannerUrl(url);
}

function mediaVideo(post: { videoUrl?: string; playbackUrl?: string }) {
  if (post.playbackUrl) return resolveBannerUrl(post.playbackUrl);
  if (!post.videoUrl) return "";
  const id = driveFileId(post.videoUrl);
  if (id) return "";
  return resolveBannerUrl(post.videoUrl);
}

function posterFor(video?: string, image?: string) {
  if (image) return image;
  if (!video) return "";
  const clean = video.split("?")[0];
  if (!clean.endsWith(".mp4")) return "";
  return clean.replace(/\.mp4$/, ".jpg");
}

function formatDate(value?: string) {
  if (!value) return "March 25, 2026";
  try {
    return new Date(value).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return value;
  }
}

/** Read From Our Blog — after Certified & Authentic */
export function ReadFromBlog({ posts }: { posts?: StoreBlogPost[] }) {
  const fromApi = (posts || []).slice(0, 3).map((post, i) => ({
    slug: post.slug,
    title: post.title,
    category: post.tags?.[0] || "Journal",
    date: formatDate(post.publishedAt),
    coverTint: FALLBACK_POSTS[i % FALLBACK_POSTS.length].coverTint,
    coverImage: post.coverImage,
    videoUrl: post.videoUrl,
    playbackUrl: post.playbackUrl,
  }));

  const list = fromApi.length ? fromApi : FALLBACK_POSTS;

  return (
    <section id="blog" className="w-full bg-white py-14 md:py-16">
      <div className="container-pad mx-auto max-w-3xl text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-pink md:text-xs">
          Learn
        </p>
        <h2 className="mt-2 font-display text-[1.85rem] font-semibold text-ink md:text-[2.15rem]">
          Read From Our <span className="text-forest">Blog</span>
        </h2>
        <p className="mt-3 text-sm text-ink-soft md:text-base">
          Insights, remedies, and ancient wisdom for a more aligned life.
        </p>
      </div>

      <div className="container-pad mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {list.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-[0_1px_0_rgba(15,61,46,0.04)] transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <BlogCover
              image={posterFor(mediaVideo(post), mediaImage(post.coverImage))}
              video={mediaVideo(post)}
              className="relative aspect-[16/11] w-full overflow-hidden bg-[#f3f3f3]"
            />

            <div className="flex flex-1 flex-col bg-[#fffafb] px-5 pb-5 pt-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-pink">
                {post.category}
              </p>
              <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-ink md:text-[1.15rem]">
                {post.title}
              </h3>

              <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                <p className="text-xs text-ink-soft">{post.date}</p>
                <span
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-forest text-white transition group-hover:bg-forest-deep"
                  aria-hidden
                >
                  <ArrowIcon />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/blog"
          className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-forest px-8 text-sm font-semibold text-white transition hover:bg-forest-deep"
        >
          View all
        </Link>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12h12M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
