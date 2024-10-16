import { twMerge } from "tailwind-merge";

const sizes = {
  sm: "py-2 px-3",
  md: "py-2.5 px-3.5",
};

const variants = {
  primary:
    "border-primary enabled:focus:!border-brand enabled:focus:!ring-brand-500 dark:enabled:focus:!ring-brand-400",
  error:
    "border-error-subtle enabled:focus:!border-error enabled:focus:!ring-error-500 dark:enabled:focus:!ring-error-400",
};

export function inputStyles(
  {
    variant,
    size,
  }: {
    variant: keyof typeof variants;
    size: keyof typeof sizes;
  },
  className?: string,
) {
  return twMerge(
    "relative peer appearance-none text-md rounded-md resize-none shadow-xs border placeholder:text-placeholder text-primary bg-primary enabled:focus:ring-1 disabled:bg-disabled-subtle disabled:!border-disabled disabled:!text-disabled",
    variants[variant],
    sizes[size],
    className,
  );
}

export function labelStyles(
  { required }: { required?: boolean },
  className?: string,
) {
  return twMerge(
    "text-sm font-medium text-secondary",
    required ? "after:content-['_*'] after:text-brand-tertiary" : undefined,
    className,
  );
}

export function helperTextStyles(
  { error }: { error?: boolean },
  className?: string,
) {
  return twMerge(
    "text-sm",
    error ? "text-error-primary" : "text-tertiary",
    className,
  );
}
