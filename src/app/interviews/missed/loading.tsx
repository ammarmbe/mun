import Skeleton from "@/components/skeleton";

export default function Loading() {
  return (
    <div className="relative flex-grow">
      <div
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        }}
        className="absolute inset-0 grid gap-4 overflow-auto"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="min-h-44 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
