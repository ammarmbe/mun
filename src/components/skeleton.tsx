import React from "react";
import { twMerge } from "tailwind-merge";

export default function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={twMerge("animate-pulse bg-tertiary", className)}
      {...props}
    />
  );
}
