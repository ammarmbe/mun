import { twMerge } from "tailwind-merge";

const sizes = {
  sm: "py-2 px-3 focus:py-[calc(0.5rem-1px)] focus:px-[calc(0.75rem-1px)]",
  md: "py-2.5 px-3.5 focus:py-[calc(0.625rem-1px)] focus:px-[calc(0.875rem-1px)]",
};

const variants = {
  primary: "border-primary enabled:focus:!border-brand",
  error: "border-error-subtle enabled:focus:!border-error",
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
    "text-md rounded-md resize-none shadow-xs border placeholder:text-placeholder text-primary bg-primary enabled:focus:border-2 disabled:bg-disabled_subtle disabled:!border-disabled",
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
