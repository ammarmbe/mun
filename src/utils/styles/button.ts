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

const primarySizes: Record<Size, string> = {
  sm: "[&:not(:disabled)]:py-[calc(0.5rem+1px)] [&:not(:disabled)]:px-[calc(0.75rem+1px)]",
  md: "[&:not(:disabled)]:py-[calc(0.625rem+1px)] [&:not(:disabled)]:px-[calc(0.875rem+1px)]",
  lg: "[&:not(:disabled)]:py-[calc(0.75rem+1px)] [&:not(:disabled)]:px-[calc(1rem+1px)]",
  xl: "[&:not(:disabled)]:py-[calc(0.875rem+1px)] [&:not(:disabled)]:px-[calc(1.125rem+1px)]",
  "2xl":
    "[&:not(:disabled)]:py-[calc(1.125rem+1px)] [&:not(:disabled)]:px-[calc(1.375rem+1px)]",
};

const primarySymmetricalSizes: Record<Size, string> = {
  sm: "[&:not(:disabled)]:p-[calc(0.5rem+1px)]",
  md: "[&:not(:disabled)]:p-[calc(0.625rem+1px)]",
  lg: "[&:not(:disabled)]:p-[calc(0.75rem+1px)]",
  xl: "[&:not(:disabled)]:p-[calc(0.875rem+1px)]",
  "2xl": "[&:not(:disabled)]:p-[calc(1.125rem+1px)]",
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
    transition-[box-shadow] button-skeuomorphic border-transparent
    bg-brand-600 hover:bg-brand-700 active:bg-brand-600 relative before:rounded-[inherit]
    shadow-xs-skeuomorphic [&:not(:disabled)]:active:shadow-ring-shadow-xs-skeuomorphic [&_*]:z-10
    disabled:!text-disabled disabled:!bg-disabled disabled:!border-disabled-subtle disabled:border disabled:shadow-none
  `,
  secondary: `
    [&_*]:z-10 border-primary border text-secondary transition-all
    hover hover:bg-primary bg-primary-alt active
    shadow-xs-skeuomorphic-alt [&:not(:disabled)]:active:shadow-ring-shadow-xs-skeuomorphic 
    disabled:!text-disabled disabled:!bg-disabled disabled:!border-disabled-subtle
  `,
  tertiary: `
    bg-primary active text-secondary hover border border-transparent
    [&:not(:disabled)]:active:shadow-ring disabled:!text-disabled
  `,
  dropdown: `
    bg-primary border-primary hover text-secondary
    disabled:!text-disabled !rounded-none w-full !justify-start
  `,
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
  const classes: string[] = [];

  classes.push(
    "transition-all flex items-center justify-center [&_span]:px-0.5 font-semibold h-fit",
  );

  classes.push(variants[variant]);

  classes.push(symmetrical ? symmetricalSizes[size] : sizes[size]);

  if (variant === "primary") {
    classes.push(
      symmetrical ? primarySymmetricalSizes[size] : primarySizes[size],
    );
  }

  return twMerge(...classes, className);
}
