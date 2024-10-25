import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { queryFunctions, queryKeys } from "@/utils/react-query";
import TableLoading from "@/app/interviews/[council]/table-loading";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import dayjs from "dayjs";
import buttonStyles from "@/utils/styles/button";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import { councilColors, getGradeColor } from "@/utils";
import Badge from "@/components/badge";
import { $Enums } from "@prisma/client";
import UpdateStatus from "@/app/interviews/[council]/update-status";
import { useQueryState } from "nuqs";
import Spinner from "@/components/spinner";

type TInterview = NonNullable<
  Awaited<ReturnType<ReturnType<typeof queryFunctions.interviews.all>>>
>["interviews"][number];

export default function Table({ council }: { council?: string }) {
  const [search, setSearch] = useQueryState("query");
  const [lastClicked, setLastClicked] = useState<string | null>(null);

  const columns = useMemo<ColumnDef<TInterview>[]>(
    () => [
      {
        id: "delegate.name",
        accessorKey: "delegate.name",
        cell: (info) => info.getValue(),
        header: () => <span>Delegate name</span>,
        meta: "35%",
      },
      {
        id: "date",
        accessorKey: "date",
        cell: (info) =>
          dayjs(info.getValue() as Date).format("MMM DD, hh:mm A"),
        header: () => <span>Date</span>,
        meta: "30%",
      },
      {
        id: "delegate.council",
        accessorKey: "delegate.council",
        cell: (info) => (
          <Badge
            text={info.getValue() as $Enums.Council}
            color={councilColors[info.getValue() as $Enums.Council]}
            size="sm"
          />
        ),
        header: () => <span>Council</span>,
        meta: "calc(70px + 3rem)",
      },
      {
        id: "answers",
        accessorFn: (interview) =>
          `${interview._count.answers}/${interview._count.questions}`,
        cell: (info) => info.getValue(),
        header: () => <span>Answers</span>,
        meta: "calc(70px + 3rem)",
      },
      {
        id: "grade",
        accessorKey: "grade",
        cell: (info) => (
          <span
            className={getGradeColor(
              info.getValue() as string,
              "text-disabled",
            )}
          >
            {(info.getValue() as string) || "–"}
          </span>
        ),
        header: () => <span>Grade</span>,
        meta: "15%",
      },
      {
        id: "delegate.status",
        accessorFn: (interview) => interview,
        cell: (info) => (
          <UpdateStatus interview={info.getValue() as TInterview} />
        ),
        header: () => <span>Status</span>,
        meta: "calc(140px + 3rem)",
      },
    ],
    [],
  );

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "date",
      desc: true,
    },
  ]);

  const { data, isLoading, isPlaceholderData } = useQuery({
    queryKey: queryKeys.interviews.all({
      council,
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      sortingId: sorting[0]?.id || "date",
      sortingDirection: !sorting[0]?.desc ? "asc" : "desc",
      search,
    }),
    queryFn: queryFunctions.interviews.all({
      council,
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      sortingId: sorting[0]?.id || "date",
      sortingDirection: !sorting[0]?.desc ? "asc" : "desc",
      search,
    }),
    placeholderData: keepPreviousData,
  });

  const defaultData = useMemo(() => [], []);

  const table = useReactTable({
    data: data?.interviews ?? defaultData,
    columns,
    rowCount: data?.rowCount,
    state: {
      pagination,
      sorting,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  if (isLoading) return <TableLoading />;

  if (data === null || data?.interviews === null) {
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
    <div className="m-4 mt-0 flex flex-grow flex-col md:ml-3">
      <div className="relative flex-grow">
        <div className="absolute inset-0 flex overflow-auto">
          <div className="flex h-fit min-h-full min-w-[850px] flex-grow flex-col overflow-hidden rounded-t-2xl border bg-tertiary dark:bg-primary">
            <table className="w-full table-fixed">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <th
                          key={header.id}
                          colSpan={header.colSpan}
                          style={{
                            width: header.column.columnDef.meta as string,
                          }}
                          onClick={(e) => {
                            setLastClicked(header.id);

                            header.column.getToggleSortingHandler()?.(e);
                          }}
                          className="cursor-pointer px-4 pb-2 pt-3 text-start text-sm font-semibold text-secondary"
                        >
                          <div className="flex items-center gap-1">
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                            {isPlaceholderData && lastClicked === header.id ? (
                              <Spinner size={12} className="flex-none" />
                            ) : (
                              ({
                                asc: (
                                  <ChevronUp
                                    size={12}
                                    className="text-quinary flex-none"
                                  />
                                ),
                                desc: (
                                  <ChevronDown
                                    size={12}
                                    className="text-quinary flex-none"
                                  />
                                ),
                                false: (
                                  <ChevronsUpDown
                                    size={12}
                                    className="text-quinary flex-none"
                                  />
                                ),
                              }[header.column.getIsSorted() as string] ?? null)
                            )}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>
            </table>
            <div className="-m-px mt-0 flex flex-grow overflow-hidden rounded-t-2xl border bg-primary">
              {data?.interviews?.length ? (
                <table className="h-fit w-full table-fixed">
                  <tbody>
                    {table.getRowModel().rows.map((row) => {
                      return (
                        <Link
                          href={`/interview/${row.original.id}`}
                          key={row.id}
                          legacyBehavior
                        >
                          <tr
                            key={row.id}
                            className="hover group cursor-pointer border-b bg-primary transition-all last:border-b-0"
                          >
                            {row.getVisibleCells().map((cell) => {
                              return (
                                <td
                                  style={{
                                    width: cell.column.columnDef.meta as string,
                                  }}
                                  className="px-4 py-3 text-sm font-medium text-secondary first:text-primary"
                                  key={cell.id}
                                >
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext(),
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        </Link>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
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
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[1fr,auto,1fr] rounded-b-2xl border border-t-0 bg-primary p-3 shadow-xs md:p-4">
        <button
          className={buttonStyles(
            {
              size: "sm",
              variant: "secondary",
            },
            "w-fit items-baseline self-baseline px-2 md:px-3",
          )}
          disabled={
            !table.getCanPreviousPage() ||
            (isPlaceholderData && lastClicked === "previous")
          }
          onClick={() => {
            setLastClicked("previous");
            table.previousPage();
          }}
        >
          {isPlaceholderData && lastClicked === "previous" ? (
            <Spinner
              className="!size-5 self-center md:!size-4"
              containerClassName="!size-5 md:!size-4"
            />
          ) : (
            <ArrowLeft className="size-5 self-center md:size-4" />
          )}
          <span className="hidden md:inline">Previous</span>
        </button>
        <p className="self-center text-center text-sm leading-none text-secondary md:self-baseline">
          Page {pagination.pageIndex + 1} of{" "}
          {data ? Math.ceil(data.rowCount / pagination.pageSize) : 1}
        </p>
        <button
          className={buttonStyles(
            {
              size: "sm",
              variant: "secondary",
            },
            "w-fit self-baseline justify-self-end px-2 md:px-3",
          )}
          disabled={
            !table.getCanNextPage() ||
            (isPlaceholderData && lastClicked === "next")
          }
          onClick={() => {
            setLastClicked("next");
            table.nextPage();
          }}
        >
          <span className="hidden md:inline">Next</span>
          {isPlaceholderData && lastClicked === "next" ? (
            <Spinner
              className="!size-5 md:!size-4"
              containerClassName="!size-5 md:!size-4"
            />
          ) : (
            <ArrowRight className="size-5 md:size-4" />
          )}
        </button>
      </div>
    </div>
  );
}
