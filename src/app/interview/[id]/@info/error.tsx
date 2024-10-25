"use client";

import { useEffect } from "react";
import buttonStyles from "@/utils/styles/button";
import Toast from "@/components/toast";
import { toast } from "sonner";

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
        message="We couldn't load interview info. Please try again."
      />
    ));
  }, [error]);

  return (
    <main className="m-4 flex flex-col gap-4 rounded-2xl border bg-primary p-4 shadow-xs md:m-1 md:max-h-[calc(100dvh-0.5rem)] md:w-72 md:gap-5 md:overflow-auto md:p-5">
      <div className="flex min-h-72 flex-grow flex-col items-center justify-center">
        <h1 className="text-center text-xl font-semibold">An error occurred</h1>
        <p className="mt-1 text-center text-sm font-medium text-secondary">
          We couldn&apos;t load interview info. Please try again.
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
