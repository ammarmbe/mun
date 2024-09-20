import Skeleton from "@/components/skeleton";
import React from "react";

export default function Loading() {
  return (
    <main className="flex flex-grow flex-col gap-8 px-4 py-8 md:px-8">
      <h1 className="text-display-xs font-semibold md:text-display-sm">
        <Skeleton className="h-8 w-64 rounded-md md:h-[2.375rem]" />
      </h1>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-1/3 rounded-md" />
          <Skeleton className="h-8 w-5/6 rounded-md" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-1/2 rounded-md" />
          <Skeleton className="h-8 w-5/6 rounded-md" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-2/3 rounded-md" />
          <Skeleton className="h-8 w-5/6 rounded-md" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-1/2 rounded-md" />
          <Skeleton className="h-8 w-5/6 rounded-md" />
        </div>
      </div>
    </main>
  );
}
