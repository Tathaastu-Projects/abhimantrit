"use client";

import { resolveBannerUrl } from "@/lib/format";

export type HowAbhimantritStep = {
  id: string;
  title: string;
  image?: string;
};

export type HowAbhimantritSection = {
  enabled?: boolean;
  title?: string;
  steps?: HowAbhimantritStep[];
};

/** Four circular process images — shown after Explore Remedies in 3D. */
export function HowAbhimantrit({ section }: { section?: HowAbhimantritSection | null }) {
  if (section && section.enabled === false) return null;

  const title = section?.title?.trim() || "How Abhimantrit";
  const steps = (section?.steps || []).filter((step) => step?.image || step?.title);
  if (!steps.length) return null;

  return (
    <section id="how-abhimantrit" className="w-full bg-[#f7f1e8] py-8 md:py-10">
      <div className="mx-auto w-full max-w-5xl px-5 md:px-8">
        <h2 className="text-center font-display text-[1.7rem] font-semibold tracking-[-0.02em] text-[#1c1c1c] md:text-[2.05rem]">
          {title}
        </h2>

        <div className="mt-7 grid grid-cols-2 gap-5 sm:gap-6 md:mt-9 md:grid-cols-4 md:gap-8">
          {steps.map((step) => {
            const image = resolveBannerUrl(step.image);
            return (
              <figure key={step.id} className="flex flex-col items-center text-center">
                <div className="relative aspect-square w-full max-w-[180px] md:max-w-[200px]">
                  {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={image}
                      alt={step.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center rounded-full bg-[#efe6d8] text-xs text-stone-400">
                      No image
                    </div>
                  )}
                </div>
                <figcaption className="mt-3 max-w-[11rem] font-display text-sm font-semibold leading-snug text-[#1c1c1c] md:text-[0.95rem]">
                  {step.title}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
