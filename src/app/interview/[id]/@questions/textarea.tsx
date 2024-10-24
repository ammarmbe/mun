import { inputStyles } from "@/utils/styles/input";
import React, { ChangeEventHandler, useLayoutEffect } from "react";

export default function Textarea({
  value,
  onChange,
}: {
  value?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
}) {
  const ref = React.useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.height = "inherit";
      ref.current.style.height = `${Math.max(ref.current.scrollHeight + 2, 48)}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={ref}
      style={{
        minHeight: 48,
      }}
      className={inputStyles(
        {
          size: "md",
          variant: "primary",
        },
        "w-full max-w-96",
      )}
      value={value}
      onChange={onChange}
    />
  );
}
