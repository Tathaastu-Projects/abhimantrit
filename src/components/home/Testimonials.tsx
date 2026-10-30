import Script from "next/script";
import { resolveBannerUrl } from "@/lib/format";

export type Testimonial = {
  quote: string;
  name: string;
  imageUrl?: string;
  videoUrl?: string;
  playbackUrl?: string;
};

function driveFileId(url: string) {
  const file = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (file) return file[1];
  if (!/drive\.google\.com|googleusercontent\.com/.test(url)) return "";
  const id = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  return id ? id[1] : "";
}

function imageSrc(url?: string) {
  if (!url) return "";
  const id = driveFileId(url);
  if (id) return `https://lh3.googleusercontent.com/d/${id}`;
  return resolveBannerUrl(url);
}

function videoSrc(url?: string) {
  if (!url) return "";
  const id = driveFileId(url);
  if (id) return `https://drive.usercontent.google.com/download?id=${id}&export=download`;
  return resolveBannerUrl(url);
}

export function Testimonials({ items }: { items?: Testimonial[] }) {
  const cards = (items || []).filter((item) => item.quote && item.name);
  if (!cards.length) return null;
  const showArrows = cards.length > 1;

  return (
    <section id="testimonials" data-testimonials className="w-full bg-white py-8 md:py-10">
      <h2 className="text-center font-display text-[2rem] font-medium tracking-[-0.02em] text-[#1c1c1c] md:text-[2.4rem]">
        Testimonials
      </h2>
      <div className="relative mx-auto mt-5 max-w-[1100px] px-12 md:mt-6 md:px-16">
        {showArrows ? (
          <button
            type="button"
            data-testimonials-prev
            aria-label="Previous review"
            className="absolute left-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-forest bg-forest text-white shadow-[0_8px_20px_rgba(15,61,46,0.28)] transition hover:bg-forest-deep"
          >
            <Arrow direction="left" />
          </button>
        ) : null}
        <div data-testimonials-frame className="overflow-hidden">
          <div data-testimonials-track className="flex">
            {cards.map((item, cardIndex) => (
              <ReviewCard key={`${item.name}-${cardIndex}`} item={item} />
            ))}
          </div>
        </div>
        {showArrows ? (
          <button
            type="button"
            data-testimonials-next
            aria-label="Next review"
            className="absolute right-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-forest bg-forest text-white shadow-[0_8px_20px_rgba(15,61,46,0.28)] transition hover:bg-forest-deep"
          >
            <Arrow direction="right" />
          </button>
        ) : null}
      </div>
      {showArrows ? <Script src="/testimonials-slider.js?v=1" strategy="afterInteractive" /> : null}
    </section>
  );
}

function ReviewCard({ item }: { item: Testimonial }) {
  const photo = imageSrc(item.imageUrl);
  const video = item.playbackUrl ? resolveBannerUrl(item.playbackUrl) : videoSrc(item.videoUrl);

  return (
    <article data-testimonials-slide className="grid h-[300px] w-full min-w-full shrink-0 overflow-hidden bg-[#f3f3f3] md:grid-cols-[1.15fr_0.85fr]">
      <div className="flex min-h-0 flex-col justify-center overflow-hidden px-6 py-5 md:px-10">
        <div className="flex gap-1 text-[#e0b100]" aria-label="5 stars">
          {Array.from({ length: 5 }).map((_, star) => (
            <Star key={star} />
          ))}
        </div>
        <p className="mt-3 line-clamp-4 max-w-xl whitespace-pre-line text-sm leading-6 text-[#3a3a3a]">{item.quote}</p>
        <p className="mt-4 text-sm text-[#1c1c1c]">{item.name}</p>
      </div>
      <div className="relative min-h-0 overflow-hidden bg-[#d9d9d9]">
        {video ? (
          <video
            src={video}
            poster={photo || undefined}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : null}
      </div>
    </article>
  );
}

function Star() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5 fill-current" aria-hidden>
      <path d="M10 1.6 12.4 7l5.9.6-4.5 3.9 1.4 5.8L10 14.6 4.8 17.3l1.4-5.8L1.7 7.6 7.6 7 10 1.6Z" />
    </svg>
  );
}

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      {direction === "left" ? <path d="M14.5 6 8.5 12l6 6" /> : <path d="M9.5 6l6 6-6 6" />}
    </svg>
  );
}
