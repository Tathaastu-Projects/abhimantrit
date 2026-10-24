export default function RootLoading() {
  return (
    <div className="container-pad py-10">
      <div className="skeleton h-10 w-48 rounded-full" />
      <div className="mt-6 skeleton aspect-[21/9] w-full rounded-3xl" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="skeleton h-56 rounded-2xl" />
        <div className="skeleton h-56 rounded-2xl" />
        <div className="skeleton h-56 rounded-2xl" />
      </div>
    </div>
  );
}
