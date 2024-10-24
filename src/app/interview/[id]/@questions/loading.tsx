import React from "react";
import Spinner from "@/components/spinner";
import Skeleton from "react-loading-skeleton";

export default function Loading() {
  return (
    <main className="m-4 mt-0 flex flex-grow flex-col overflow-hidden rounded-2xl border md:m-1 md:mx-0 md:mt-1 md:h-[calc(100dvh-0.5rem)]">
      <div className="flex items-center justify-between border-b bg-primary p-4 md:p-6">
        <h1 className="text-display-xs font-semibold md:text-display-sm">
          Answers
        </h1>
        <div className="flex gap-3 leading-none">
          <Skeleton className="!h-[2.375rem] !w-[5.125rem] !rounded-md" />
          <Skeleton className="!h-[2.375rem] !w-[4.825rem] !rounded-md" />
        </div>
      </div>
      <div className="flex flex-grow items-center justify-center p-10">
        <Spinner size={24} />
      </div>
    </main>
  );
}
