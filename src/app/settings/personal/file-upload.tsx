import React, { useEffect, useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import * as Avatar from "@radix-ui/react-avatar";
import { User } from "@prisma/client";
import Skeleton from "react-loading-skeleton";
import { useUploadThing } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/utils/react-query";
import { toast } from "sonner";
import Toast from "@/components/toast";
import imageCompression from "browser-image-compression";

export default function FileUpload({ user }: { user?: User | null }) {
  const queryClient = useQueryClient();

  const ref = useRef<HTMLLabelElement>(null);
  const [file, setFile] = useState<File>();

  const { startUpload, isUploading } = useUploadThing("upload", {
    onClientUploadComplete: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.user.current(),
      });

      toast.custom((t) => (
        <Toast
          variant="success"
          title="Image saved"
          t={t}
          message="Please refresh to see the updated image."
        />
      ));
    },
    onUploadError: () => {
      toast.custom((t) => (
        <Toast
          variant="error"
          title="An error occurred"
          t={t}
          message="We couldn't save the image. Please try again."
        />
      ));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/user/image", {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error();
      }
    },
    onError: () => {
      toast.custom((t) => (
        <Toast
          variant="error"
          title="An error occurred"
          t={t}
          message="We couldn't delete your image. Please try again."
        />
      ));
    },
    onSuccess: async (_) => {
      toast.custom((t) => (
        <Toast
          variant="success"
          title="Image deleted"
          t={t}
          message="Your image has been deleted successfully."
        />
      ));

      queryClient.setQueryData(
        queryKeys.user.current(),
        (oldData: typeof user) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            imageUrl: null,
          };
        },
      );
    },
  });

  useEffect(() => {
    if (file && user?.id) {
      startUpload([file], { userId: user.id });
    }
  }, [file]);

  return (
    <div className="flex flex-wrap gap-5 sm:flex-nowrap">
      {user?.imageUrl ? (
        <Avatar.Root className="size-16 h-fit leading-none">
          <Avatar.Image
            className="!size-16 rounded-full object-cover"
            width={64}
            height={64}
            alt="Profile picture"
            src={`https://utfs.io/f/${user.imageUrl}`}
          />
          <Avatar.Fallback>
            <Skeleton className="!size-16 !rounded-full" />
          </Avatar.Fallback>
        </Avatar.Root>
      ) : (
        <div className="size-16 rounded-full bg-utility-gray-300" />
      )}
      <label
        ref={ref}
        htmlFor="file"
        className="group relative flex h-[8.25rem] flex-grow cursor-pointer flex-col items-center justify-center rounded-xl border px-4 py-3 text-center hover:border-primary aria-disabled:pointer-events-none aria-disabled:!bg-disabled-subtle aria-disabled:!text-disabled"
        aria-disabled={isUploading}
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
          onChange={async (e) => {
            if (e.target.files?.[0]) {
              const file = e.target.files[0];

              const compressedFile = await imageCompression(file, {
                maxWidthOrHeight: 100,
              });

              setFile(compressedFile);

              e.target.value = "";
            }

            ref.current?.classList.remove("border-brand");
            ref.current?.classList.remove("border-2");
          }}
        />
      </label>
    </div>
  );
}
