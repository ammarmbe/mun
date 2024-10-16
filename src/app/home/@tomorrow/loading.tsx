import { Clock, Phone } from "lucide-react";
import Skeleton from "react-loading-skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-px overflow-hidden rounded-2xl border bg-secondary-subtle shadow-xs">
      <h2 className="flex-none px-6 pb-2 pt-3 text-sm font-semibold text-secondary">
        Tomorrow
      </h2>
      <div className="-m-px flex flex-grow flex-col divide-y overflow-hidden rounded-2xl border bg-primary md:max-h-[calc(100dvh-4rem-2.375rem-2.5rem-1px)]">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="h-fit p-5">
            <div className="flex flex-col">
              <div className="flex justify-between">
                <div className="flex min-w-0 flex-col gap-1">
                  <h3 className="flex items-center gap-3 text-lg font-semibold">
                    <Skeleton className="!w-56" />
                  </h3>
                  <p className="text-sm font-medium text-secondary">
                    <Skeleton className="!w-24" />
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-3">
                <p className="flex items-center gap-2 text-sm font-medium text-secondary">
                  <Clock size={16} className="text-tertiary" />
                  <Skeleton className="!w-36" />
                </p>
                <p className="flex w-fit items-center gap-2 text-sm font-medium text-secondary">
                  <Phone size={16} className="text-tertiary" />
                  <Skeleton className="!w-28" />
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
