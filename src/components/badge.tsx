import { twMerge } from "tailwind-merge";

const colors = {
  gray: "bg-utility-gray-50 text-utility-700 border-utility-gray-200",
  brand: "bg-utility-brand-50 text-utility-brand-700 border-utility-brand-200",
  red: "bg-utility-error-50 text-utility-error-700 border-utility-error-200",
  yellow:
    "bg-utility-warning-50 text-utility-warning-700 border-utility-warning-200",
  green:
    "bg-utility-success-50 text-utility-success-700 border-utility-success-200",
  blue: "bg-utility-blue-50 text-utility-blue-700 border-utility-blue-200",
};

const sizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-0.5 text-sm",
  lg: "px-3 py-1 text-sm",
};

export default function Badge({
  text,
  color,
  size,
  className,
}: {
  text: string;
  color: keyof typeof colors;
  size: "sm" | "md" | "lg";
  className?: string;
}) {
  return (
    <span
      className={twMerge(
        "w-fit rounded-full border font-medium",
        sizes[size],
        colors[color],
        className,
      )}
    >
      {text}
    </span>
  );
}
