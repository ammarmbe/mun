import { ChevronDown } from "lucide-react";
import React from "react";
import Skeleton from "react-loading-skeleton";

export default function MobileLoading() {
  return (
    <div className="m-4 mt-0 flex flex-grow flex-col overflow-hidden rounded-2xl border bg-primary md:ml-3">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="hover flex items-center justify-between border-b bg-primary p-4 transition-all last:border-b-0 data-[state=open]:!bg-active [&[data-state=open]>svg]:rotate-180"
        >
          <div className="flex items-center gap-3">
            <div className={`size-2 rounded-full bg-utility-gray-200`} />
            <h2 className="text-md font-medium text-primary">
              <Skeleton className="!w-32" />
            </h2>
          </div>
          <ChevronDown size={20} className="text-tertiary transition-all" />
        </div>
      ))}
    </div>
  );
}
