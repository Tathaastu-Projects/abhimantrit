import { getHomeAbove, getHomeBelow, getStoreMeta } from "@/lib/api";
import { HomeBootstrap } from "@/components/home/HomeBootstrap";

/**
 * First visit: SSR home data into the client cache.
 * Later product → home trips reuse HomeKeepAlive (no cold remount).
 */
export const revalidate = 60;

export default async function HomePage() {
  const [above, below, meta] = await Promise.all([
    getHomeAbove(),
    getHomeBelow(),
    getStoreMeta(),
  ]);

  return (
    <HomeBootstrap initialAbove={above} initialBelow={below} initialMeta={meta} />
  );
}
