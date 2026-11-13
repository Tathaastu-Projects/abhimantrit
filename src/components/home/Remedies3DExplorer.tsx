"use client";

/**
 * Embeds the 3D explorer (public/3d/index.html).
 * Sized to fit title + stage in one viewport without page scroll.
 */
export function Remedies3DExplorer() {
  return (
    <section
      id="remedies-3d"
      className="remedies-3d-section flex w-full flex-col justify-center bg-[#f7f1e8]"
    >
      <div className="mx-auto flex w-full max-w-[1500px] flex-col px-3 py-3 md:px-5 md:py-4 lg:px-6">
        <div className="mb-2 flex flex-wrap items-end justify-between gap-x-4 gap-y-1 px-1 md:mb-2.5">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-forest md:text-[11px]">
              Interactive 3D
            </p>
            <h2 className="mt-0.5 font-display text-[1.25rem] font-semibold leading-tight tracking-[-0.02em] text-ink md:text-[1.45rem]">
              Explore Remedies in 3D
            </h2>
          </div>
          <p className="hidden max-w-md text-xs text-ink-soft sm:block md:text-sm">
            Drag to rotate. Use tabs and arrows to switch models.
          </p>
        </div>

        <div className="overflow-hidden rounded-[16px] border border-black/5 bg-[#12151a] shadow-[0_12px_32px_rgba(15,20,25,0.14)] md:rounded-[18px]">
          <iframe
            title="Abhimantrit 3D remedies explorer"
            src="/3d/index.html"
            className="remedies-3d-frame block w-full border-0 bg-[#12151a]"
            loading="eager"
            allow="fullscreen"
            referrerPolicy="no-referrer"
            scrolling="no"
          />
        </div>
      </div>
    </section>
  );
}
