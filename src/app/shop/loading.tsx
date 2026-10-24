export default function ShopLoading() {
  return (
    <div className="container-pad py-8">
      <div className="skeleton aspect-[21/8] w-full rounded-3xl" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="skeleton h-64 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
