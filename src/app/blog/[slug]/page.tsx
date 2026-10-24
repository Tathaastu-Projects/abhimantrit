import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/lib/api";
import { resolveBannerUrl } from "@/lib/format";
import { BlogCover } from "@/components/home/BlogCover";

function localUpload(url?: string) {
  if (!url) return "";
  if (/^https?:\/\//i.test(url) && !url.includes("/uploads/")) return "";
  return resolveBannerUrl(url);
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) notFound();

  return (
    <article className="container-pad max-w-3xl py-12">
      <Link href="/blog" className="text-sm text-temple hover:underline">
        ← Journal
      </Link>
      <h1 className="mt-4 font-display text-4xl md:text-5xl">{post.title}</h1>
      {post.author ? (
        <p className="mt-3 text-sm text-ink-soft">
          By {post.author}
          {post.publishedAt ? ` · ${new Date(post.publishedAt).toLocaleDateString("en-IN")}` : ""}
        </p>
      ) : null}
      {localUpload(post.coverImage) || localUpload(post.playbackUrl) || localUpload(post.videoUrl) ? (
        <BlogCover
          image={localUpload(post.coverImage)}
          video={localUpload(post.playbackUrl) || localUpload(post.videoUrl)}
          className="mt-8 aspect-[16/9] w-full overflow-hidden rounded-3xl bg-[#f3f3f3]"
        />
      ) : null}
      <div className="mt-8 whitespace-pre-wrap text-base leading-relaxed text-ink-soft">
        {post.content}
      </div>
    </article>
  );
}
