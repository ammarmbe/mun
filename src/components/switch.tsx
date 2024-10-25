import * as SwitchPrimitive from "@radix-ui/react-switch";
import { twMerge } from "tailwind-merge";

export default function Switch({
  value,
  onChange,
  className,
  id,
  disabled,
}: {
  value?: boolean;
  onChange?: (value: boolean) => void;
  className?: string;
  id?: string;
  disabled?: boolean;
}) {
  return (
    <SwitchPrimitive.Root
      checked={value}
      onCheckedChange={onChange}
      id={id}
      disabled={disabled}
      className={twMerge(
        "hover group relative h-6 w-11 flex-none rounded-full bg-secondary p-0.5 transition-all active:shadow-ring disabled:bg-disabled disabled:!shadow-none data-[state=checked]:bg-brand-solid disabled:data-[state=checked]:bg-quaternary",
        className,
      )}
    >
      <SwitchPrimitive.Thumb className="absolute right-[1.375rem] top-0.5 inline-block size-5 rounded-full bg-white shadow-sm transition-all group-disabled:bg-secondary data-[state=checked]:right-0.5 group-disabled:dark:bg-white" />
    </SwitchPrimitive.Root>
  );
}
