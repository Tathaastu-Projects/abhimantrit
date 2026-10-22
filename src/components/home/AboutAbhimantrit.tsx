"use client";

import { useEffect, useRef, useState } from "react";
import { getApiBaseUrl } from "@/lib/env";
import { resolveBannerUrl } from "@/lib/format";

const DEFAULT_INTRO =
  "Abhimantrit brings together authentic Rudraksha, crystals, and spiritual essentials, thoughtfully chosen for their astrological and spiritual significance. Each piece is carefully checked for authenticity and quality, then energised through traditional Vedic rituals with care and intention.";

export type AboutFeature = {
  id: string;
  title: string;
  description: string;
  icon?: "badge" | "ritual" | "check" | "star";
  image?: string;
  videoUrl?: string;
  playbackUrl?: string;
};

export type AboutSection = {
  image?: string;
  intro?: string;
  videoUrl?: string;
  playbackUrl?: string;
  features?: AboutFeature[];
};

function driveFileId(url: string) {
  const file = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (file) return file[1];
  if (!/drive\.google\.com|googleusercontent\.com/.test(url)) return "";
  const id = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  return id ? id[1] : "";
}

function mediaVideo(item?: { videoUrl?: string; playbackUrl?: string } | null) {
  if (item?.playbackUrl) return resolveBannerUrl(item.playbackUrl);
  const video = item?.videoUrl || "";
  if (!video || driveFileId(video)) return "";
  return resolveBannerUrl(video);
}

function posterUrl(item?: { image?: string; imageUrl?: string; videoUrl?: string; playbackUrl?: string } | null) {
  if (item?.image) return resolveBannerUrl(item.image);
  if (item?.imageUrl) return resolveBannerUrl(item.imageUrl);
  const video = mediaVideo(item);
  if (video && !video.includes("drive.google.com")) {
    return video.replace(/\.(mp4|webm|mov)$/i, ".jpg");
  }
  return "";
}

const FEATURES: AboutFeature[] = [
  {
    id: "lab",
    title: "Lab Certified",
    description: "Quality you can trust, backed by recognised laboratory certification.",
    icon: "badge",
  },
  {
    id: "ritual",
    title: "Abhimantrit",
    description: "Each piece is energised through traditional Vedic rituals with care and intention.",
    icon: "ritual",
  },
  {
    id: "quality",
    title: "Authenticity & Quality",
    description: "Carefully checked to ensure authenticity, purity, and quality in every piece.",
    icon: "check",
  },
  {
    id: "guided",
    title: "Astrologically Guided",
    description: "Selected with astrological guidance for a more personal experience.",
    icon: "star",
  },
];

/** About Abhimantrit — text and list on the left, image on the right. Hover a point to swap the image. */
export function AboutAbhimantrit({ about }: { about?: AboutSection | null }) {
  const [live, setLive] = useState<AboutSection | null | undefined>(about);
  const source = live || about;

  useEffect(() => {
    let cancelled = false;
    fetch(`${getApiBaseUrl()}/api/store/content/home`, { cache: "no-store" })
      .then((res) => res.json())
      .then((body) => {
        const section = body?.data?.aboutSection as AboutSection | undefined;
        if (!cancelled && section) setLive(section);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const features = FEATURES.map((item) => {
    const custom = source?.features?.find((feature) => feature.id === item.id);
    return {
      ...item,
      title: custom?.title || item.title,
      description: custom?.description || item.description,
      image: custom?.image || "",
      videoUrl: custom?.videoUrl || "",
      playbackUrl: custom?.playbackUrl || "",
    };
  });
  const intro = source?.intro || DEFAULT_INTRO;
  const [activeId, setActiveId] = useState("");

  return (
    <section id="about" className="about-swap w-full overflow-hidden bg-[#f7f1e8]">
      <div className="grid items-stretch md:grid-cols-2">
        <div className="relative z-10 order-2 px-5 py-8 md:order-1 md:px-7 md:py-12 xl:px-8 xl:py-14">
          <div onMouseEnter={() => setActiveId("")}>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#9a9590] md:text-xs">
              About
            </p>
            <h2 className="mt-2.5 font-display text-[2rem] font-semibold tracking-[-0.02em] text-forest md:text-4xl lg:text-[2.55rem]">
              ABHIMANTRIT
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-[#5c5752] md:text-[0.95rem] md:leading-[1.75]">
              {intro}
            </p>
          </div>

          <ul
            className="mt-6 divide-y divide-[#e4dcd0] border-y border-[#e4dcd0]"
            onMouseLeave={() => setActiveId("")}
          >
            {features.map((item) => {
              const selected = item.id === activeId;
              return (
                <li
                  key={item.id}
                  data-about={item.id}
                  className={`about-point flex cursor-pointer items-center gap-4 py-4 transition-all duration-300 md:gap-5 md:py-5 ${
                    selected ? "is-active" : ""
                  }`}
                  tabIndex={0}
                  onMouseEnter={() => setActiveId(item.id)}
                  onPointerEnter={() => setActiveId(item.id)}
                  onFocus={() => setActiveId(item.id)}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white ${
                      selected ? "bg-forest" : "bg-forest/70"
                    }`}
                    aria-hidden
                  >
                    <FeatureIcon name={item.icon} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`font-display text-[0.95rem] md:text-base ${
                        selected ? "font-semibold text-forest" : "font-medium text-[#5c5752]"
                      }`}
                    >
                      {item.title}
                    </p>
                    <p
                      className={`about-point__copy overflow-hidden text-xs leading-relaxed text-[#3f3c39] transition-all duration-300 md:text-[13px] ${
                        selected ? "is-open" : ""
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                  <span className={`shrink-0 ${selected ? "text-[#3f3c39]" : "text-[#c4bfb8]"}`} aria-hidden>
                    <ChevronIcon />
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="about-stage relative z-0 order-1 min-h-[220px] overflow-hidden bg-[#f7f1e8] md:order-2 md:min-h-full">
          {mediaVideo(source) ? (
            <StageMedia
              video={mediaVideo(source)}
              poster={posterUrl(source)}
              base
              playing={!activeId}
            />
          ) : null}
          {features.map((item) =>
            mediaVideo(item) ? (
              <StageMedia
                key={item.id}
                aboutId={item.id}
                video={mediaVideo(item)}
                poster={posterUrl(item)}
                active={item.id === activeId}
                playing={item.id === activeId}
              />
            ) : null,
          )}
        </div>
      </div>
    </section>
  );
}

function StageMedia({
  video,
  poster,
  aboutId,
  base,
  active,
  playing,
}: {
  video: string;
  poster?: string;
  aboutId?: string;
  base?: boolean;
  active?: boolean;
  playing?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return;
    node.muted = true;
    node.defaultMuted = true;
    if (playing) {
      const p = node.play();
      if (p !== undefined) {
        p.catch(() => {});
      }
    } else {
      node.pause();
    }
  }, [playing]);

  const className = `about-stage__img${base ? " about-stage__img--base" : ""}${active ? " is-active" : ""}`;
  return (
    <video
      ref={videoRef}
      data-about-image={aboutId}
      src={video}
      poster={poster}
      autoPlay={playing}
      loop
      muted
      playsInline
      preload={base ? "auto" : "metadata"}
      className={className}
    />
  );
}

function ChevronIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FeatureIcon({ name }: { name: AboutFeature["icon"] }) {
  if (name === "badge") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 3l2.2 2.4 3.1-.4 1 3 2.8 1.5-1.5 2.8.4 3.1-3 1-1.5 2.8-2.8-1.5-3.1.4-1-3-2.8-1.5 1.5-2.8-.4-3.1 3-1L12 3z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M9.5 12.2l1.7 1.7 3.5-3.6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (name === "ritual") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 3v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M9 15c0 2.2 1.3 4 3 4s3-1.8 3-4H9z" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M12 3c1.2-1.4 2.8-1.2 3.2.2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (name === "check") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M8.8 12.2l2.2 2.2 4.2-4.4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 4.5l1.6 3.6 3.9.4-2.9 2.6.9 3.8L12 13.2 8.5 14.9l.9-3.8-2.9-2.6 3.9-.4L12 4.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
