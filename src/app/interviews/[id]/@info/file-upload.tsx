import React, { Dispatch, SetStateAction, useRef } from "react";
import { UploadCloud } from "lucide-react";

export default function FileUpload({
  setFile,
  isLoading,
}: {
  setFile: Dispatch<SetStateAction<File | undefined>>;
  isLoading: boolean;
}) {
  const ref = useRef<HTMLLabelElement>(null);

  return (
    <label
      ref={ref}
      htmlFor="file"
      className="group relative flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-xl border px-4 py-3 text-center hover:border-primary aria-disabled:pointer-events-none aria-disabled:!bg-disabled-subtle aria-disabled:!text-disabled"
      aria-disabled={isLoading}
    >
      <div className="pointer-events-none rounded-md border p-2.5 text-secondary shadow-xs-skeuomorphic">
        <UploadCloud size={20} />
      </div>
      <p className="pointer-events-none mt-3 text-sm text-tertiary">
        <span className="font-semibold text-brand-secondary group-aria-disabled:text-disabled">
          Click to upload
        </span>{" "}
        an image
      </p>
      <p className="pointer-events-none mt-1 text-xs text-tertiary">
        PNG, JPG or WEBP
      </p>
      <input
        type="file"
        id="file"
        disabled={isLoading}
        accept="image/png, image/jpeg, image/webp"
        className="absolute inset-0 appearance-none opacity-0"
        onDragEnter={() => {
          ref.current?.classList.add("border-brand");
          ref.current?.classList.add("border-2");
        }}
        onDragLeave={() => {
          ref.current?.classList.remove("border-brand");
          ref.current?.classList.remove("border-2");
        }}
        onChange={(e) => {
          if (e.target.files?.[0]) {
            setFile(e.target.files[0]);

            e.target.value = "";
          }

          ref.current?.classList.remove("border-brand");
          ref.current?.classList.remove("border-2");
        }}
      />
    </label>
  );
}
