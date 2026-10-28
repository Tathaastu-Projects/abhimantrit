/**
 * Five-step ritual banner — directly above Most loved / Best Sellers.
 */
export function FiveStepRitual() {
  return (
    <section className="w-full bg-[#f7f4ef] px-3 pb-1 pt-3 sm:px-5 md:px-8 md:pb-2 md:pt-4 lg:px-10">
      <div className="mx-auto w-full max-w-[1400px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/home/five-step-ritual.jpg"
          alt="01 Thoughtfully Sourced — 02 Cleansed with Care — 03 Energised with Intention — 04 Pack with Care — 05 Deliver & Wear"
          className="block h-auto w-full object-contain object-center"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  );
}
