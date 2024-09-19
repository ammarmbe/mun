import { twMerge } from "tailwind-merge";

const sizes = {
  sm: "py-2 px-3 gap-1 text-sm rounded-md",
  md: "py-2.5 px-3.5 gap-1.5 text-sm rounded-md",
  lg: "py-3 px-4 gap-1.5 text-md rounded-md",
  xl: "py-3.5 px-[1.125rem] gap-1.5 text-md rounded-md",
  "2xl": "py-[1.125rem] px-[1.375rem] gap-2.5 text-lg rounded-lg",
};

const primarySizes = {
  sm: "py-[calc(0.5rem-1px)] px-[calc(0.75rem-1px)] gap-1 text-sm rounded-md",
  md: "py-[calc(0.625rem-1px)] px-[calc(0.875rem-1px)] gap-1.5 text-sm rounded-md",
  lg: "py-[calc(0.75rem-1px)] px-[calc(1rem-1px)] gap-1.5 text-md rounded-md",
  xl: "py-[calc(0.875rem-1px)] px-[calc(1.125rem-1px)] gap-1.5 text-md rounded-md",
  "2xl":
    "py-[calc(1.125rem-1px)] px-[calc(1.375rem-1px)] gap-2.5 text-lg rounded-lg",
};

const variants = {
  primary:
    "transition-all after:transition-all before:transition-all before:absolute after:absolute bg-brand-solid hover:bg-brand-700 active:bg-brand-solid shadow-xs-skeuomorphic enabled:active:shadow-focus-ring-shadow-xs-skeuomorphic before:inset-px enabled:before:bg-gradient-to-b before:from-[#FFFFFF1F] before:to-[#FFFFFF00] after:inset-0.5 after:bg-brand-solid hover:after:bg-brand-700 active:after:bg-brand-solid text-white relative [&_*]:z-10 disabled:!text-disabled disabled:!bg-disabled disabled:!border-disabled_subtle disabled:before:!bg-disabled disabled:after:!bg-disabled",
  secondary:
    "bg-primary-alt border-primary hover active active:bg-primary-alt shadow-xs-skeuomorphic text-secondary enabled:active:shadow-focus-ring-shadow-xs-skeuomorphic disabled:!text-disabled disabled:!border-disabled_subtle border",
  tertiary:
    "bg-primary border-primary active text-secondary hover enabled:active:shadow-focus-ring disabled:!text-disabled",
  danger:
    "transition-all after:transition-all before:transition-all before:absolute after:absolute bg-error-solid hover:bg-error-700 active:bg-error-solid shadow-xs-skeuomorphic enabled:active:shadow-focus-ring-error-shadow-xs-skeuomorphic before:inset-px enabled:before:bg-gradient-to-b before:from-[#FFFFFF1F] before:to-[#FFFFFF00] after:inset-0.5 after:bg-error-solid hover:after:bg-error-700 active:after:bg-error-solid text-white relative [&_*]:z-10 disabled:!text-disabled disabled:!bg-disabled disabled:!border-disabled_subtle disabled:before:!bg-disabled disabled:after:!bg-disabled",
};

export default function buttonStyles(
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
    "transition-all flex items-center justify-center [&_span]:px-0.5 font-semibold",
    variants[variant],
    variant === "primary" ? primarySizes[size] : sizes[size],
    className,
    variant === "primary"
      ? size === "2xl"
        ? "before:rounded-[calc(0.625rem-1px)] after:rounded-[calc(0.625rem-2px)] rounded-lg"
        : "before:rounded-[calc(0.5rem-1px)] after:rounded-[calc(0.5rem-2px)] rounded-md"
      : undefined,
  );
}
