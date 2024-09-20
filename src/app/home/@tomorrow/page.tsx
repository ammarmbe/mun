"use client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import UpcomingCard from "@/components/cards/upcoming-card/upcoming-card";
import { useQuery } from "@tanstack/react-query";
import { queryFunctions, queryKeys } from "@/utils/react-query";
import Loading from "@/app/home/@tomorrow/loading";

dayjs.extend(relativeTime);

export default function Tomorrow() {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.interviews.tomorrow(),
    queryFn: queryFunctions.interviews.tomorrow,
    throwOnError: true,
  });

  if (isLoading) return <Loading />;

  if (data === null) {
    return (
      <div className="flex flex-col gap-5">
        <h3 className="text-xl font-semibold">Tomorrow</h3>
        <div className="flex min-h-72 flex-grow flex-col items-center justify-center">
          <h1 className="text-xl font-semibold">You are not logged in</h1>
          <p className="mt-1 text-sm font-medium text-secondary">
            Please log in to view your interviews
          </p>
        </div>
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="flex flex-col gap-5">
        <h3 className="text-xl font-semibold">Tomorrow</h3>
        <div className="flex min-h-72 flex-grow flex-col items-center justify-center">
          <h1 className="text-center text-xl font-semibold">
            No interviews tomorrow
          </h1>
          <p className="mt-1 text-center text-sm font-medium text-secondary">
            You don&apos;t have any interviews scheduled for tomorrow (yet)
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-xl font-semibold">Tomorrow</h3>
      <div className="relative flex-grow">
        <div className="inset-0 flex flex-col gap-4 overflow-auto md:absolute">
          {data.map((interview) => (
            <UpcomingCard interview={interview} key={interview.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
