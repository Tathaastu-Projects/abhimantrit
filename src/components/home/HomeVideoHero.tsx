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
 * No black flash: warm placeholder + poster (or auto-captured first frame) under the video.
 */
export function HomeVideoHero({
  hero,
  logoSrc = "",
  brandName = "Abhimantrit",
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [framePoster, setFramePoster] = useState("");
  const videoUrl = resolveBannerUrl(hero?.videoUrl || "");
  const adminPoster = resolveBannerUrl(hero?.posterUrl || "");
  const posterUrl = adminPoster || framePoster;
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

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !videoUrl) return;
    let captured = Boolean(adminPoster);
    el.muted = true;
    el.defaultMuted = true;
    el.volume = 0;
    el.setAttribute("muted", "");

    const play = () => {
      el.muted = true;
      el.play().catch(() => {
        /* autoplay may be blocked until interaction */
      });
    };

    /** If admin did not set a poster, grab the first decoded frame so we never sit on black. */
    const captureFrame = () => {
      if (captured || adminPoster) return;
      try {
        if (!el.videoWidth || !el.videoHeight) return;
        const canvas = document.createElement("canvas");
        const maxW = 1280;
        const scale = Math.min(1, maxW / el.videoWidth);
        canvas.width = Math.max(1, Math.round(el.videoWidth * scale));
        canvas.height = Math.max(1, Math.round(el.videoHeight * scale));
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(el, 0, 0, canvas.width, canvas.height);
        const data = canvas.toDataURL("image/jpeg", 0.72);
        if (data && data.length > 800) {
          captured = true;
          setFramePoster(data);
        }
      } catch {
        /* cross-origin / decode — ignore */
      }
    };

    const onLoaded = () => {
      captureFrame();
      play();
    };

    play();
    el.addEventListener("loadeddata", onLoaded);
    el.addEventListener("canplay", play);
    el.addEventListener("playing", captureFrame);

    const onVisibility = () => {
      if (document.hidden) el.pause();
      else play();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      el.removeEventListener("loadeddata", onLoaded);
      el.removeEventListener("canplay", play);
      el.removeEventListener("playing", captureFrame);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [videoUrl, adminPoster]);

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
      {/* Always under video — kills black flash while MP4 buffers */}
      {posterUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={posterUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
          aria-hidden
        />
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

      <video
        ref={videoRef}
        className="home-bg-video absolute inset-0 h-full w-full object-cover"
        src={videoUrl}
        poster={posterUrl || undefined}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        aria-hidden
      />

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
