"use client";

/**
 * Embeds the original 3D explorer as-is (public/3d/index.html).
 * No layout overrides — keeps the working UI from the Downloads build.
 */
export function Remedies3DExplorer() {
  return (
    <section id="remedies-3d" className="w-full bg-[#f7f1e8]">
      <div className="mx-auto w-full max-w-[1500px] px-3 py-5 md:px-5 md:py-7 lg:px-6">
        <div className="mb-3 px-1 md:mb-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-forest">
            Interactive 3D
          </p>
          <h2 className="mt-1 font-display text-[1.6rem] font-semibold tracking-[-0.02em] text-ink md:text-[1.9rem]">
            Explore Remedies in 3D
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-ink-soft">
            Drag to rotate. Use tabs and arrows to switch models.
          </p>
        </div>

        <div className="overflow-hidden rounded-[20px] border border-black/5 bg-[#12151a] shadow-[0_18px_48px_rgba(15,20,25,0.16)]">
          <iframe
            title="Abhimantrit 3D remedies explorer"
            src="/3d/index.html"
            className="remedies-3d-frame block w-full border-0 bg-[#12151a]"
            loading="eager"
            allow="fullscreen"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </section>
  );
}
