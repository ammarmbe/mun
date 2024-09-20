"use client";

import { useQuery } from "@tanstack/react-query";
import { queryFunctions, queryKeys } from "@/utils/react-query";
import Loading from "@/app/interviews/completed/loading";
import UpcomingCard from "@/components/cards/upcoming-card/upcoming-card";

export default function Page() {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.interviews.upcoming(),
    queryFn: queryFunctions.interviews.upcoming,
    throwOnError: true,
  });

  if (isLoading) return <Loading />;

  if (data === null) {
    return (
      <div className="flex min-h-72 flex-grow flex-col items-center justify-center">
        <h1 className="text-xl font-semibold">You are not logged in</h1>
        <p className="mt-1 text-sm font-medium text-secondary">
          Please log in to view your interviews
        </p>
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="flex min-h-72 flex-grow flex-col items-center justify-center">
        <h1 className="text-center text-xl font-semibold">
          No upcoming interviews
        </h1>
        <p className="mt-1 text-center text-sm font-medium text-secondary">
          You don&apos;t have any upcoming interviews (yet)
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex-grow">
      <div
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        }}
        className="absolute inset-0 grid gap-4 overflow-auto"
      >
        {data.map((interview) => (
          <UpcomingCard interview={interview} key={interview.id} />
        ))}
      </div>
    </div>
  );
}
