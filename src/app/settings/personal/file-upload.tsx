import React, { Dispatch, SetStateAction, useRef } from "react";
import { Trash2, UploadCloud } from "lucide-react";
import buttonStyles from "@/utils/styles/button";
import JpegIcon from "@/components/file-upload/jpeg-icon";
import JpgIcon from "@/components/file-upload/jpg-icon";
import PngIcon from "@/components/file-upload/png-icon";
import WebpIcon from "@/components/file-upload/webp-icon";
import ImgIcon from "@/components/file-upload/img-icon";
import * as Avatar from "@radix-ui/react-avatar";

export default function FileUpload({
  file,
  setFile,
  userId,
}: {
  file: File | undefined;
  setFile: Dispatch<SetStateAction<File | undefined>>;
  userId: string;
}) {
  const ref = useRef<HTMLLabelElement>(null);

  return (
    <div className="flex flex-wrap gap-5 sm:flex-nowrap">
      <Avatar.Root className="size-16 h-fit leading-none">
        <Avatar.Image
          className="!size-16 rounded-full"
          width={64}
          height={64}
          alt="Profile picture"
          src={file ? URL.createObjectURL(file) : `/uploads/${userId}.jpg`}
        />
        <Avatar.Fallback>
          <div className="size-16 rounded-full bg-utility-gray-300" />
        </Avatar.Fallback>
      </Avatar.Root>
      <div className="flex flex-grow flex-col gap-4">
        <label
          ref={ref}
          htmlFor="file"
          className="group relative flex h-[8.25rem] cursor-pointer flex-col items-center justify-center rounded-xl border px-4 py-3 text-center hover:border-primary aria-disabled:pointer-events-none aria-disabled:!bg-disabled-subtle aria-disabled:!text-disabled"
        >
          <div className="pointer-events-none rounded-md border border-primary p-2.5 text-secondary shadow-xs-skeuomorphic">
            <UploadCloud size={20} />
          </div>
          <p className="pointer-events-none mt-3 text-sm text-tertiary">
            <span className="font-semibold text-brand-secondary group-aria-disabled:text-disabled">
              Click to upload
            </span>{" "}
            or drag and drop
          </p>
          <p className="pointer-events-none mt-1 text-xs text-tertiary">
            PNG, JPG or WEBP
          </p>
          <input
            type="file"
            id="file"
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
        {file ? (
          <div className="relative flex gap-3 rounded-xl border p-4">
            {file.name.endsWith(".jpeg") ? (
              <JpegIcon />
            ) : file.name.endsWith(".jpg") ? (
              <JpgIcon />
            ) : file.name.endsWith(".png") ? (
              <PngIcon />
            ) : file.name.endsWith(".webp") ? (
              <WebpIcon />
            ) : (
              <ImgIcon />
            )}
            <div className="flex flex-grow flex-col">
              <p className="min-w-0 truncate text-sm font-medium text-secondary">
                {file.name}
              </p>
              <p className="text-sm text-tertiary">
                {(file.size / 1000 / 1000).toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}{" "}
                MB
              </p>
            </div>
            <button
              className={buttonStyles(
                {
                  variant: "tertiary",
                  size: "sm",
                  symmetrical: true,
                },
                "absolute right-2 top-2",
              )}
              onClick={() => setFile(undefined)}
            >
              <Trash2 size={20} />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
