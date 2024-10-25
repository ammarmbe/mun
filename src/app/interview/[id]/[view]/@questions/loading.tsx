import React from "react";
import Spinner from "@/components/spinner";
import Skeleton from "react-loading-skeleton";
import buttonStyles from "@/utils/styles/button";

export default function Loading() {
  return (
    <main className="flex flex-grow flex-col overflow-hidden bg-primary md:my-1 md:h-[calc(100dvh-0.5rem)] md:rounded-2xl md:border">
      <div className="flex items-center justify-between border-b bg-primary p-4 md:p-6">
        <h1 className="text-display-xs font-semibold md:text-display-sm">
          Answers
        </h1>
        <div className="flex gap-3">
          <button
            className={buttonStyles({
              size: "sm",
              variant: "secondary",
            })}
          >
            <Skeleton className="!w-16" />
          </button>
          <button
            className={buttonStyles(
              {
                size: "sm",
                variant: "primary",
              },
              "min-h-[2.375rem]",
            )}
          >
            <Skeleton
              className="!w-12"
              highlightColor="rgba(var(--utility-brand-400))"
              baseColor="rgba(var(--utility-brand-500))"
            />
          </button>
        </div>
      </div>
      <div className="flex flex-grow items-center justify-center p-10">
        <Spinner size={24} />
      </div>
    </main>
  );
}
