"use client";

import CompletedCard from "@/components/cards/completed-card";
import { useQuery } from "@tanstack/react-query";
import { queryFunctions, queryKeys } from "@/utils/react-query";
import Loading from "@/app/home/@completed/loading";

export default function Completed() {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.interviews.completed(),
    queryFn: queryFunctions.interviews.completed,
    throwOnError: true,
  });

  const { data: user } = useQuery({
    queryKey: queryKeys.user(),
    queryFn: queryFunctions.user,
    throwOnError: true,
  });

  if (isLoading) return <Loading />;

  if (data === null) {
    return (
      <div className="flex flex-col gap-5 md:col-span-2 xl:col-span-1">
        <h3 className="text-xl font-semibold">Completed</h3>
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
      <div className="flex flex-col gap-5 md:col-span-2 xl:col-span-1">
        <h3 className="text-xl font-semibold">Completed</h3>
        <div className="flex min-h-72 flex-grow flex-col items-center justify-center">
          <h1 className="text-center text-xl font-semibold">
            No completed interviews
          </h1>
          <p className="mt-1 text-center text-sm font-medium text-secondary">
            You haven&apos;t completed any interviews (yet)
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 md:col-span-2 xl:col-span-1">
      <h3 className="text-xl font-semibold">Completed</h3>
      <div className="relative flex-grow">
        <div className="inset-0 flex flex-col gap-4 overflow-auto md:absolute">
          {data.map((interview) => (
            <CompletedCard
              interview={interview}
              key={interview.id}
              user={user ?? null}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
