"use client";

import { useQuery } from "@tanstack/react-query";
import { queryFunctions, queryKeys } from "@/utils/react-query";
import Loading from "@/app/home/@today/loading";
import InterviewCard from "@/components/interview-card";

export default function Today() {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.interviews.today({ upcoming: true }),
    queryFn: queryFunctions.interviews.today({ upcoming: true }),
  });

  if (isLoading) return <Loading />;

  if (data === null) {
    return (
      <div className="flex flex-col gap-px overflow-hidden rounded-2xl border bg-secondary-subtle shadow-xs">
        <h2 className="flex-none px-6 pb-2 pt-3 text-sm font-semibold text-secondary">
          Up next
        </h2>
        <div className="-m-px flex flex-grow flex-col divide-y overflow-auto rounded-2xl border bg-primary md:max-h-[calc(100dvh-4rem-2.375rem-2.5rem-1px)]">
          <div className="flex flex-grow flex-col items-center justify-center">
            <h1 className="text-xl font-semibold">You are not logged in</h1>
            <p className="mt-1 text-sm font-medium text-secondary">
              Please log in to view your interviews
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-px overflow-hidden rounded-2xl border bg-secondary-subtle shadow-xs">
      <h2 className="flex-none px-6 pb-2 pt-3 text-sm font-semibold text-secondary">
        Up next
      </h2>
      <div className="-m-px flex flex-grow flex-col divide-y overflow-auto rounded-2xl border bg-primary md:max-h-[calc(100dvh-4rem-2.375rem-2.5rem-1px)]">
        {data?.map((interview) => (
          <InterviewCard
            key={interview.id}
            interview={interview}
            upNext={interview.date === data[0]?.date}
          />
        ))}
        <div className="flex flex-grow flex-col items-center justify-center">
          <p className="px-4 py-10 text-center text-sm font-medium text-disabled">
            No {(data?.length || 0) > 0 ? "more " : null}interviews today (yet)
          </p>
        </div>
      </div>
    </div>
  );
}
