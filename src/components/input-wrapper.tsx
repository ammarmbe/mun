import { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";
import { LucideProps } from "lucide-react";

export default function InputWrapper({
  size,
  children,
  Icon,
}: {
  size: "sm" | "md";
  children: ReactNode;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}) {
  return (
    <div
      className={`relative [&_select]:w-full ${size === "md" ? "[&_select]:pr-[2.875rem]" : "[&_select]:pr-[2.625rem]"}`}
    >
      {children}
      <div
        className={`pointer-events-none absolute right-0 top-0 flex items-center justify-center text-tertiary peer-disabled:text-disabled ${size === "md" ? "size-[2.875rem]" : "size-[2.625rem]"}`}
      >
        <Icon size={20} />
      </div>
    </div>
  );
}
