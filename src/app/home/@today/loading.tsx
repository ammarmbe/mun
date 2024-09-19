import Skeleton from "@/components/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl font-semibold">Up next</h2>
      <Skeleton className="h-44 rounded-lg" />
      <h3 className="text-md font-semibold text-secondary">Today</h3>
      <div className="relative flex-grow">
        <div className="inset-0 flex flex-col gap-4 overflow-hidden md:absolute">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="min-h-32 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
