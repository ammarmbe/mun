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
        message="We couldn't load completed interviews. Please try again."
      />
    ));
  }, [error]);

  return (
    <div className="flex min-h-72 flex-grow flex-col items-center justify-center">
      <h1 className="text-center text-xl font-semibold">An error occurred</h1>
      <p className="mt-1 text-center text-sm font-medium text-secondary">
        We couldn&apos;t load completed interviews. Please try again.
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
        Try again
      </button>
    </div>
  );
}
