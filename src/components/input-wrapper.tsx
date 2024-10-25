import { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";
import { LucideProps } from "lucide-react";
import { twMerge } from "tailwind-merge";

export default function InputWrapper({
  size,
  side = "right",
  children,
  Icon,
  IconPrimitive,
  className,
}: {
  size: "sm" | "md" | "xs";
  side?: "left" | "right";
  children: ReactNode;
  Icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  IconPrimitive?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        `relative [&_select]:w-full ${
          size === "md"
            ? side === "right"
              ? "[&_select]:pr-[2.75rem]"
              : "[&_select]:pl-[2.75rem]"
            : size === "sm"
              ? side === "right"
                ? "[&_select]:pr-[2.5rem]"
                : "[&_select]:pl-[2.5rem]"
              : side === "right"
                ? "[&_select]:pr-[2.25rem]"
                : "[&_select]:pl-[2.25rem]"
        }`,
        className,
      )}
    >
      {children}
      <div
        className={`pointer-events-none absolute top-0 flex items-center justify-center text-tertiary peer-disabled:text-disabled ${side === "right" ? "right-0" : "left-0"} ${
          size === "md"
            ? "size-[2.875rem]"
            : size === "sm"
              ? "size-[2.625rem]"
              : "size-[2.325rem]"
        }`}
      >
        {IconPrimitive ? IconPrimitive : Icon ? <Icon size={20} /> : null}
      </div>
    </div>
  );
}
