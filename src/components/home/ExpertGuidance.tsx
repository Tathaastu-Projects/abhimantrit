import Image from "next/image";
import Link from "next/link";
import { resolveBannerUrl } from "@/lib/format";

type Props = {
  /** Backend-managed collage (`/uploads/...`). Section hides if missing. */
  imageUrl?: string | null;
};

/** Expert guidance — image from backend/admin only. */
export function ExpertGuidance({ imageUrl }: Props) {
  const src = resolveBannerUrl(imageUrl || "/uploads/consult/expert-collage.webp");
  if (!src) return null;

  return (
    <section id="expert-guidance" className="relative w-full overflow-hidden bg-white">
      <div className="container-pad py-16 md:py-24 lg:py-28">
        <div className="grid items-center gap-12 md:gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20 xl:gap-28">
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative aspect-[1024/719] w-full">
              <Image
                src={src}
                alt="Talk to Abhimantrit experts — astrology, Vastu, tarot and more"
                fill
                priority
                unoptimized
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain object-center"
              />
            </div>
          </div>

          <div className="max-w-md lg:max-w-lg lg:justify-self-start lg:pl-4 xl:pl-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9a9590] md:text-xs">
              Not sure what&apos;s right for you?
            </p>
            <h2 className="mt-4 font-display text-[1.75rem] font-semibold leading-[1.2] tracking-[-0.02em] text-forest md:text-3xl lg:text-[2.35rem]">
              Talk to an Expert for Guidance
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-ink-soft md:text-[0.95rem] md:leading-[1.75]">
              Get personalised spiritual guidance based on your birth chart, rashi, and individual
              needs. From an astrology expert with{" "}
              <strong className="font-semibold text-ink">15+ years of experience.</strong>
            </p>
            <Link
              href="/contact"
              className="btn btn-primary mt-10 min-h-[3.15rem] px-9"
            >
              Book Your Consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
