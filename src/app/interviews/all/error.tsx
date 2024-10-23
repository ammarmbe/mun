"use client";

import React, { useEffect } from "react";
import buttonStyles from "@/utils/styles/button";
import Toast from "@/components/toast";
import { toast } from "sonner";
import Search from "@/components/search";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    toast.custom((t) => (
      <Toast
        variant="error"
        title="An error occurred"
        t={t}
        message="We couldn't load interviews. Please try again."
      />
    ));
  }, [error]);

  return (
    <main className="flex flex-grow flex-col">
      <div className="flex min-h-[5.625rem] flex-wrap items-center justify-between gap-y-3 p-6">
        <h1 className="text-display-xs font-semibold md:text-display-sm">
          All Interviews
        </h1>
        <Search
          value="query"
          placeholder="Search by name or council..."
          className="w-full md:w-auto"
        />
      </div>
      <div className="flex min-h-72 flex-grow flex-col items-center justify-center">
        <h1 className="text-center text-xl font-semibold">An error occurred</h1>
        <p className="mt-1 text-center text-sm font-medium text-secondary">
          We couldn&apos;t load interviews. Please try again.
        </p>
        <button
          className={buttonStyles(
            {
              variant: "secondary",
              size: "md",
            },
            "mt-5",
          )}
          onClick={() => reset()}
        >
          <span>Try again</span>
        </button>
      </div>
    </main>
  );
}
