import buttonStyles from "@/utils/styles/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-72 flex-grow flex-col items-center justify-center">
      <h1 className="text-center text-xl font-semibold">Interview not found</h1>
      <p className="mt-1 text-center text-sm font-medium text-secondary">
        The interview you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/home"
        className={buttonStyles(
          {
            variant: "secondary",
            size: "md",
          },
          "mt-5",
        )}
      >
        <span>Return to home</span>
      </Link>
    </div>
  );
}
