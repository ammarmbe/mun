import React from "react";
import Skeleton from "react-loading-skeleton";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

export default function Loading() {
  return (
    <main className="m-4 flex flex-col gap-4 rounded-2xl border p-4 shadow-xs md:m-1 md:max-h-[calc(100dvh-0.5rem)] md:w-72 md:gap-5 md:overflow-auto md:p-5">
      <h2 className="flex-none truncate text-display-xs font-semibold">
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
          <p className="text-sm font-medium text-primary">Council</p>
          <p className="flex h-6 items-end leading-none text-secondary">
            <Skeleton
              style={{
                width: "5rem",
                height: "21px !important",
                borderRadius: "999px",
              }}
            />
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-primary">Status</p>
          <p className="text-secondary">
            <Skeleton className="!w-40" />
          </p>
        </div>
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
        <div className="flex flex-col gap-1.5">
          <p className="text-sm font-medium text-primary">Interviewed by</p>
          <p className="flex items-center gap-1.5 leading-none text-secondary">
            <Skeleton className="!size-6 !rounded-full" />
            <span>
              <Skeleton className="!w-24" />
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-primary">Faculty</p>
          <p className="text-secondary">
            <Skeleton className="!w-36" />
          </p>
        </div>
      </div>
    </main>
  );
}
