import React from "react";
import Skeleton from "react-loading-skeleton";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { ChevronsUpDown } from "lucide-react";
import InputWrapper from "@/components/input-wrapper";
import { inputStyles } from "@/utils/styles/input";
import buttonStyles from "@/utils/styles/button";

export default function Loading() {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="flex-none truncate text-display-xs font-semibold">
          <Skeleton className="!w-44" />
        </h2>
        <button
          className={buttonStyles(
            {
              variant: "secondary",
              size: "sm",
            },
            "md:hidden",
          )}
        >
          <Skeleton className="!w-24" />
        </button>
      </div>
      <AspectRatio
        ratio={1}
        className="relative overflow-hidden rounded-md leading-none"
      >
        <Skeleton className="!h-full !w-full" />
      </AspectRatio>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-primary">Council</p>
          <p className="flex h-6 items-end leading-none text-secondary">
            <Skeleton
              style={{
                width: "5rem",
                height: "21px !important",
                borderRadius: "999px",
              }}
            />
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-primary">Status</p>
          <div className="text-secondary">
            <InputWrapper
              side="right"
              size="xs"
              Icon={ChevronsUpDown}
              className="w-fit"
            >
              <select
                name="status"
                className={inputStyles(
                  {
                    variant: "primary",
                    size: "xs",
                  },
                  "w-fit min-w-44 !pl-[2rem] !pr-[2.5rem] text-sm",
                )}
                disabled
              />
            </InputWrapper>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-primary">Phone number</p>
          <p className="text-secondary">
            <Skeleton className="!w-44" />
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-primary">University ID</p>
          <p className="text-secondary">
            <Skeleton className="!w-28" />
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-primary">Date</p>
          <p className="text-secondary">
            <Skeleton className="!w-36" />
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-primary">Grade</p>
          <p className="text-secondary">
            <Skeleton className="!w-32" />
          </p>
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="text-sm font-medium text-primary">Interviewed by</p>
          <p className="flex items-center gap-1.5 leading-none text-secondary">
            <Skeleton className="!size-6 !rounded-full" />
            <span>
              <Skeleton className="!w-24" />
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-primary">Faculty</p>
          <p className="text-secondary">
            <Skeleton className="!w-36" />
          </p>
        </div>
      </div>
    </>
  );
}
