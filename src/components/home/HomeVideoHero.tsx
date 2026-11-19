"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { resolveBannerUrl } from "@/lib/format";

export type HomeVideoHeroData = {
  enabled?: boolean;
  videoUrl?: string;
  posterUrl?: string;
  headline?: string;
  subheadline?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

type Props = {
  hero?: HomeVideoHeroData | null;
  logoSrc?: string;
  brandName?: string;
};

/**
 * Full-viewport looping background video.
 * Instant paint from poster image; video fades in when enough data is ready.
 */
export function HomeVideoHero({
  hero,
  logoSrc = "",
  brandName = "Abhimantrit",
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const videoUrl = resolveBannerUrl(hero?.videoUrl || "");
  const posterUrl = resolveBannerUrl(hero?.posterUrl || "");
  const enabled = hero?.enabled !== false;
  const headline =
    hero?.headline?.trim() || "Blessed crystals & sacred essentials";
  const subheadline =
    hero?.subheadline?.trim() ||
    "Authentic rudraksha, gemstones, and ritual pieces — energised with care for your intention.";
  const ctaLabel = hero?.ctaLabel?.trim() || "Shop now";
  const ctaHref = hero?.ctaHref?.trim() || "/shop";

  useEffect(() => {
    if (!enabled || !videoUrl) return;
    document.documentElement.setAttribute("data-home-video-hero", "1");
    window.dispatchEvent(new Event("abhi:home-video-hero"));
    return () => {
      document.documentElement.removeAttribute("data-home-video-hero");
      window.dispatchEvent(new Event("abhi:home-video-hero"));
    };
  }, [enabled, videoUrl]);

  // Paint poster first, then kick off video on the next frame / idle — feels instant
  useEffect(() => {
    if (!enabled || !videoUrl) return;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const start = () => setShouldLoadVideo(true);

    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (typeof w.requestIdleCallback === "function") {
      idleId = w.requestIdleCallback(start, { timeout: 280 });
    } else {
      timeoutId = setTimeout(start, 80);
    }
    return () => {
      if (idleId != null && typeof w.cancelIdleCallback === "function") {
        w.cancelIdleCallback(idleId);
      }
      if (timeoutId != null) clearTimeout(timeoutId);
    };
  }, [enabled, videoUrl]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !videoUrl || !shouldLoadVideo) return;

    el.muted = true;
    el.defaultMuted = true;
    el.volume = 0;
    el.setAttribute("muted", "");

    const markReady = () => setVideoReady(true);
    const play = () => {
      el.muted = true;
      el.play()
        .then(markReady)
        .catch(() => {
          /* autoplay may be blocked until interaction */
        });
    };

    const onCanPlay = () => {
      markReady();
      play();
    };

    // Source is set via src attribute; ensure load starts immediately
    try {
      el.load();
    } catch {
      /* ignore */
    }
    play();

    el.addEventListener("loadeddata", markReady);
    el.addEventListener("canplay", onCanPlay);
    el.addEventListener("playing", markReady);

    const onVisibility = () => {
      if (document.hidden) el.pause();
      else play();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      el.removeEventListener("loadeddata", markReady);
      el.removeEventListener("canplay", onCanPlay);
      el.removeEventListener("playing", markReady);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [videoUrl, shouldLoadVideo]);

  if (!enabled || !videoUrl) return null;

  const scrollNext = () => {
    const next = document.getElementById("home-after-video");
    if (next) {
      next.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
  };

  return (
    <section
      id="home-video-hero"
      className="home-video-hero relative isolate flex h-[100svh] min-h-[100svh] w-full items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 80% at 50% 20%, #5c4030 0%, #2a1f18 45%, #1a1510 100%)",
      }}
      aria-label="Welcome"
    >
      {/* High-priority poster — LCP / first paint (do not wait for MP4) */}
      {posterUrl ? (
        <>
          <link rel="preload" as="image" href={posterUrl} fetchPriority="high" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={posterUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority="high"
            decoding="sync"
            loading="eager"
            aria-hidden
          />
        </>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(145deg, #6b4a32 0%, #3d2a1f 40%, #241810 100%)",
          }}
          aria-hidden
        />
      )}

      {shouldLoadVideo ? (
        <video
          ref={videoRef}
          className={`home-bg-video absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
          src={videoUrl}
          poster={posterUrl || undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden
        />
      ) : null}

      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(12,10,8,0.42)_0%,rgba(12,10,8,0.28)_40%,rgba(12,10,8,0.55)_100%)]"
        aria-hidden
      />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center px-6 pb-28 pt-[clamp(7.5rem,22vh,11rem)] text-center text-white sm:px-8">
        {logoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoSrc}
            alt=""
            className="mb-5 h-14 w-auto max-w-[220px] object-contain drop-shadow-[0_4px_24px_rgba(0,0,0,0.35)] sm:h-16"
            fetchPriority="low"
            decoding="async"
          />
        ) : null}

        <p className="home-video-hero__brand font-display text-4xl font-semibold tracking-tight text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)] sm:text-5xl md:text-6xl">
          {brandName}
        </p>

        <h1 className="mt-5 max-w-2xl font-display text-2xl font-medium leading-snug text-white/95 sm:text-3xl md:text-[2.15rem]">
          {headline}
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
          {subheadline}
        </p>

        {ctaLabel ? (
          <Link
            href={ctaHref}
            className="mt-8 inline-flex items-center justify-center rounded-full border border-white/80 bg-white/10 px-7 py-2.5 text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            {ctaLabel}
          </Link>
        ) : null}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-7 z-10 flex justify-center">
        <button
          type="button"
          onClick={scrollNext}
          className="home-video-hero__scroll pointer-events-auto flex flex-col items-center gap-1 text-white/90"
          aria-label="Scroll down"
        >
          <span className="text-center text-[11px] font-medium uppercase tracking-[0.22em]">
            Scroll down
          </span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M6.5 9.5 12 15l5.5-5.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
