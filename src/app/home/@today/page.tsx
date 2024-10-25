"use client";

import { useQuery } from "@tanstack/react-query";
import { queryFunctions, queryKeys } from "@/utils/react-query";
import Loading from "@/app/home/@today/loading";
import InterviewCard from "@/components/interview-card";
import dayjs from "dayjs";
import { Fragment, useCallback, useEffect, useState } from "react";

export default function Today() {
  const [nowRef, setNowRef] = useState<HTMLDivElement | null>(null);

  const setRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setNowRef(node);
    }
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: queryKeys.interviews.today(),
    queryFn: queryFunctions.interviews.today(),
  });

  useEffect(() => {
    if (nowRef) {
      nowRef.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [nowRef]);

  if (isLoading) return <Loading />;

  if (data === null) {
    return (
      <div className="flex flex-col gap-px overflow-hidden rounded-2xl border bg-tertiary shadow-xs dark:bg-primary">
        <h2 className="flex-none px-5 pb-2 pt-3 text-sm font-semibold text-secondary">
          Today
        </h2>
        <div className="-m-px flex flex-grow flex-col divide-y overflow-auto rounded-2xl border bg-primary md:max-h-[calc(100dvh-4rem-2.625rem-2.5rem-1px)]">
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
    <div className="flex flex-col gap-px overflow-hidden rounded-2xl border bg-tertiary shadow-xs dark:bg-primary">
      <h2 className="flex-none px-5 pb-2 pt-3 text-sm font-semibold text-secondary">
        Today
      </h2>
      <div className="-m-px flex flex-grow flex-col divide-y overflow-auto rounded-2xl border bg-primary md:max-h-[calc(100dvh-4rem-2.625rem-2.5rem-1px)]">
        {data?.map((interview, index) => (
          <Fragment key={interview.id}>
            <InterviewCard
              interview={interview}
              upNext={interview.date === data[0]?.date}
            />
            {interview.date &&
            data[index + 1]?.date &&
            dayjs().isAfter(interview.date) &&
            dayjs().isBefore(data[index + 1]?.date) ? (
              <div
                ref={setRef}
                className="grid grid-cols-[1fr,auto,1fr] gap-2 py-2"
              >
                <div className="self-center border-t" />
                <p className="text-sm font-medium text-tertiary">Now</p>
                <div className="self-center border-t" />
              </div>
            ) : null}
          </Fragment>
        ))}
        <div className="flex flex-grow flex-col items-center justify-center">
          <p className="px-4 py-10 text-center text-sm font-medium text-disabled">
            No {(data?.length || 0) > 0 ? "more " : null}interviews today
            {(data?.length || 0) > 1 ? null : " yet"}
          </p>
        </div>
      </div>
    </div>
  );
}
