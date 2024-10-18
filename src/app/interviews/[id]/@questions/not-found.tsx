import buttonStyles from "@/utils/styles/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-72 flex-grow flex-col items-center justify-center">
      <h1 className="text-center text-xl font-semibold">No questions found</h1>
      <p className="mt-1 text-center text-sm font-medium text-secondary">
        You haven&apos;t added any questions yet.
      </p>
      <Link
        href="/settings/questions"
        className={buttonStyles(
          {
            variant: "secondary",
            size: "md",
          },
          "mt-5",
        )}
      >
        <span>Go to settings</span>
      </Link>
    </div>
  );
}
