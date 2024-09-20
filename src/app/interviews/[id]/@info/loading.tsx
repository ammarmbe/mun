import Skeleton from "@/components/skeleton";
import React from "react";

export default function Loading() {
  return (
    <>
      <h1 className="text-display-xs font-semibold">
        <Skeleton className="h-8 w-full rounded-md" />
      </h1>
      <Skeleton className="size-[calc(100vw-2rem)] rounded-md md:size-[13.9375rem]" />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-1/2 rounded-md" />
          <Skeleton className="h-8 w-full rounded-md" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-2/3 rounded-md" />
          <Skeleton className="h-8 w-full rounded-md" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-1/2 rounded-md" />
          <Skeleton className="h-8 w-full rounded-md" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-3/4 rounded-md" />
          <Skeleton className="h-8 w-full rounded-md" />
        </div>
      </div>
    </>
  );
}
