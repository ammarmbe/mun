import React from "react";
import Skeleton from "react-loading-skeleton";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

export default function Loading() {
  return (
    <>
      <h2 className="truncate text-display-xs font-semibold">
        <Skeleton className="!w-44" />
      </h2>
      <AspectRatio
        ratio={1}
        className="relative overflow-hidden rounded-md leading-none"
      >
        <Skeleton className="!h-full !w-full" />
      </AspectRatio>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-primary">Phone number</p>
          <p className="text-secondary">
            <Skeleton className="!w-44" />
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-primary">University ID</p>
          <p className="text-secondary">
            <Skeleton className="!w-28" />
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-primary">Date</p>
          <p className="text-secondary">
            <Skeleton className="!w-36" />
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-primary">Grade</p>
          <p className="text-secondary">
            <Skeleton className="!w-32" />
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-primary">Interviewed by</p>
          <p className="text-secondary">
            <Skeleton className="!w-24" />
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-primary">Faculty</p>
          <p className="text-secondary">
            <Skeleton className="!w-36" />
          </p>
        </div>
      </div>
    </>
  );
}
