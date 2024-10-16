import { twMerge } from "tailwind-merge";

type Size = "sm" | "md" | "lg" | "xl" | "2xl";
type Variant = "primary" | "secondary" | "tertiary" | "dropdown";

const sizes: Record<Size, string> = {
  sm: "py-2 px-3 gap-1 text-sm rounded-md",
  md: "py-2.5 px-3.5 gap-1.5 text-sm rounded-md",
  lg: "py-3 px-4 gap-1.5 text-md rounded-md",
  xl: "py-3.5 px-[1.125rem] gap-1.5 text-md rounded-md",
  "2xl": "py-[1.125rem] px-[1.375rem] gap-2.5 text-lg rounded-lg",
};

const symmetricalSizes: Record<Size, string> = {
  sm: "p-2 gap-1 text-sm rounded-md",
  md: "p-2.5 gap-1.5 text-sm rounded-md",
  lg: "p-3 gap-1.5 text-md rounded-md",
  xl: "p-3.5 gap-1.5 text-md rounded-md",
  "2xl": "p-4 gap-2.5 text-lg rounded-lg",
};

const variants: Record<Variant, string> = {
  primary: `
    transition-all after:transition-all before:transition-all 
    before:absolute after:absolute bg-brand-solid 
    hover:bg-brand-700 active:bg-brand-solid border border-transparent
    before:inset-0 disabled:before:!bg-transparent before:bg-gradient-to-b before:from-[#FFFFFF1F] before:to-[#FFFFFF00] 
    after:inset-0.5 after:bg-brand-solid hover:after:bg-brand-700 active:after:!bg-brand-solid 
    text-white relative [&_*]:z-10 !border-0 shadow-xs-skeuomorphic [&:not(:disabled)]:active:shadow-focus-ring-shadow-xs-skeuomorphic 
    disabled:!text-disabled disabled:!bg-disabled disabled:!border-disabled 
    disabled:before:!hidden disabled:after:!bg-disabled disabled:after:!bg-disabled disabled:after:!border-disabled-subtle disabled:!shadow-none
  `,
  secondary: `
    transition-all after:transition-all before:transition-all 
    before:absolute after:absolute before:inset-0 before:absolute
    before:bg-gradient-to-b before:from-[#FFFFFF00] before:to-[#FFFFFF00] 
    after:absolute bg-primary-alt active:bg-primary-alt hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-primary-alt 
    shadow-xs-skeuomorphic [&:not(:disabled)]:active:shadow-focus-ring-shadow-xs-skeuomorphic 
    after:inset-px after:bg-primary-alt active:after:!bg-primary-alt
    hover:after:bg-gray-50 dark:hover:after:bg-gray-800 
    relative [&_*]:z-10 border-primary border text-secondary 
    disabled:!text-disabled disabled:!bg-disabled disabled:!border-disabled-subtle disabled:after:!bg-disabled disabled:!shadow-none
  `,
  tertiary: `
    bg-primary border-primary active text-secondary hover 
    [&:not(:disabled)]:active:shadow-focus-ring disabled:!text-disabled
  `,
  dropdown: `
    bg-primary border-primary hover text-secondary
    disabled:!text-disabled !rounded-none w-full !justify-start
  `,
};

const primarySecondaryRoundedClasses: Record<Size, string> = {
  sm: "before:rounded-md after:rounded-[calc(0.5rem-2px)] rounded-md",
  md: "before:rounded-md after:rounded-[calc(0.5rem-2px)] rounded-md",
  lg: "before:rounded-md after:rounded-[calc(0.5rem-2px)] rounded-md",
  xl: "before:rounded-md after:rounded-[calc(0.5rem-2px)] rounded-md",
  "2xl": "before:rounded-lg after:rounded-[calc(0.625rem-2px)] rounded-lg",
};

export default function buttonStyles(
  {
    variant,
    size,
    symmetrical = false,
  }: {
    variant: Variant;
    size: Size;
    symmetrical?: boolean;
  },
  className?: string,
) {
  const baseClasses =
    "transition-all flex items-center justify-center [&_span]:px-0.5 font-semibold";
  const variantClasses = variants[variant];

  let sizeClasses: string;

  sizeClasses = symmetrical ? symmetricalSizes[size] : sizes[size];

  if (variant === "primary" || variant === "secondary") {
    sizeClasses += ` ${primarySecondaryRoundedClasses[size]}`;
  }

  return twMerge(baseClasses, variantClasses, sizeClasses, className);
}
