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
        message="We couldn't load notification settings. Please try again."
      />
    ));
  }, [error]);

  return (
    <div className="-m-px mt-0 flex flex-grow flex-col items-center justify-center rounded-2xl border bg-primary">
      <h1 className="text-center text-xl font-semibold">An error occurred</h1>
      <p className="mt-1 text-center text-sm font-medium text-secondary">
        We couldn&apos;t load notification settings. Please try again.
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
  );
}
