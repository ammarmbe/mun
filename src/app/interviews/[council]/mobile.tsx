import { useInfiniteQuery } from "@tanstack/react-query";
import { queryFunctions, queryKeys } from "@/utils/react-query";
import { SortingState } from "@tanstack/react-table";
import React, { useState } from "react";
import dayjs from "dayjs";
import { ChevronDown } from "lucide-react";
import UpdateStatus from "@/app/interviews/[council]/update-status";
import { useQueryState } from "nuqs";
import * as Accordion from "@radix-ui/react-accordion";
import Badge from "@/components/badge";
import { councilColors } from "@/utils";
import MobileLoading from "./mobile-loading";
import buttonStyles from "@/utils/styles/button";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "@/components/spinner";

type TInterview = NonNullable<
  Awaited<ReturnType<ReturnType<typeof queryFunctions.interviews.all>>>
>["interviews"][number];

export default function Mobile({ council }: { council?: string }) {
  const [search, setSearch] = useQueryState("query");

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "date",
      desc: true,
    },
  ]);

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: queryKeys.interviews.allPaginated({
      council,
      sortingId: sorting[0]?.id || "date",
      sortingDirection: !sorting[0]?.desc ? "asc" : "desc",
      search,
    }),
    queryFn: queryFunctions.interviews.allPaginated({
      council,
      sortingId: sorting[0]?.id || "date",
      sortingDirection: !sorting[0]?.desc ? "asc" : "desc",
      search,
    }),
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if ((lastPage?.length || 0) < 10) return undefined;
      return lastPageParam + 1;
    },
    select: (data) => {
      return data.pages.flatMap((page) => page).filter(Boolean) as TInterview[];
    },
    initialPageParam: 0,
  });

  if (isLoading || data === undefined) return <MobileLoading />;

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

  return (
    <Accordion.Root
      type="multiple"
      className="m-4 mt-0 flex flex-grow flex-col overflow-hidden rounded-2xl border bg-primary md:ml-3"
    >
      {!data.length ? (
        <div className="flex flex-grow flex-col items-center justify-center">
          <h1 className="text-center text-xl font-semibold">
            No interviews found
          </h1>
          <p className="mt-1 text-center text-sm font-medium text-secondary">
            {search
              ? "Try searching for something else"
              : "You have no interviews yet"}
          </p>
          {search ? (
            <button
              className={buttonStyles(
                {
                  size: "sm",
                  variant: "secondary",
                },
                "mt-4",
              )}
              onClick={() => setSearch(null)}
            >
              <span>Clear search</span>
            </button>
          ) : null}
        </div>
      ) : (
        <InfiniteScroll
          dataLength={data.length}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={
            <div className="flex items-center justify-center p-6">
              <Spinner size={16} />
            </div>
          }
          endMessage={
            <div className="flex items-center justify-center p-6">
              <p className="text-center text-sm font-medium text-secondary">
                No more interviews
              </p>
            </div>
          }
        >
          {data?.map((interview) => (
            <Accordion.Item
              key={interview.id}
              value={interview.id}
              className="flex flex-col border-b last:border-b-0"
            >
              <Accordion.Trigger className="hover flex items-center justify-between bg-primary p-4 transition-all data-[state=open]:!bg-active [&[data-state=open]>svg]:rotate-180">
                <div className="flex items-center gap-3">
                  <div
                    className={`size-2 rounded-full ${interview.delegate.status === "ACCEPTED" ? "bg-success-600" : interview.delegate.status === "REJECTED" ? "bg-error-600" : "bg-gray-600"}`}
                  />
                  <h2 className="text-md font-medium text-primary">
                    {interview.delegate.name}
                  </h2>
                </div>
                <ChevronDown
                  size={20}
                  className="text-tertiary transition-all"
                />
              </Accordion.Trigger>
              <Accordion.Content className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden transition-all">
                <div className="flex flex-wrap gap-x-6 gap-y-4 p-4">
                  <div className="flex flex-col gap-1.5">
                    <p className="text-sm font-medium text-secondary">
                      Council
                    </p>
                    <Badge
                      text={interview.delegate.council}
                      color={councilColors[interview.delegate.council]}
                      size="sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <p className="text-sm font-medium text-secondary">Date</p>
                    <p className="font-primary text-sm">
                      {dayjs(interview.date).format("MMM DD, hh:mm A")}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <p className="text-sm font-medium text-secondary">
                      Answers
                    </p>
                    <p className="font-primary text-sm">
                      {interview._count.answers}/{interview._count.questions}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 p-4 pt-0">
                  <div className="flex flex-col gap-1.5">
                    <p className="text-sm font-medium text-secondary">Status</p>
                    <UpdateStatus interview={interview} />
                  </div>
                  <div className="flex flex-grow flex-col gap-1.5">
                    <div className="h-5" />
                    <Link
                      href={`/interview/${interview.id}/questions`}
                      className={buttonStyles(
                        {
                          variant: "secondary",
                          size: "sm",
                        },
                        "w-full",
                      )}
                    >
                      View answers
                    </Link>
                  </div>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </InfiniteScroll>
      )}
    </Accordion.Root>
  );
}
