"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { queryFunctions, queryKeys } from "@/utils/react-query";
import Loading from "@/app/interviews/all/loading";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import buttonStyles from "@/utils/styles/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getGradeColor } from "@/utils";

type TInterview = NonNullable<
  Awaited<ReturnType<ReturnType<typeof queryFunctions.interviews.all>>>
>["interviews"][number];

export default function Page() {
  const columns = useMemo<ColumnDef<TInterview>[]>(
    () => [
      {
        id: "delegate",
        accessorFn: (interview) =>
          `${interview.delegate.firstName} ${interview.delegate.lastName}`,
        cell: (info) => info.getValue(),
        header: () => <span>Delegate name</span>,
        meta: "30%",
      },
      {
        id: "date",
        accessorKey: "date",
        cell: (info) =>
          dayjs(info.getValue() as Date).format("DD/MM/YYYY, hh:mm A"),
        header: () => <span>Date</span>,
        meta: "30%",
      },
      {
        id: "council",
        accessorKey: "delegate.council",
        cell: (info) => info.getValue(),
        header: () => <span>Council</span>,
        meta: "15%",
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
        id: "answers",
        accessorFn: (interview) =>
          `${interview._count.answers}/${interview._count.questions}`,
        cell: (info) => info.getValue(),
        header: () => <span>Answers</span>,
        meta: "calc(90px + 3rem)",
      },
    ],
    [],
  );

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isLoading } = useQuery({
    queryKey: queryKeys.interviews.all({
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
    }),
    queryFn: queryFunctions.interviews.all({
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
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
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: true,
  });

  if (isLoading) return <Loading />;

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
          <div className="flex min-w-[850px] flex-grow flex-col rounded-2xl border bg-secondary-subtle">
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
                          className="px-6 pb-2 pt-3 text-start text-sm font-semibold text-secondary"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>
            </table>
            <div className="-m-px mt-0 flex-grow overflow-hidden rounded-2xl border bg-primary">
              {data?.interviews?.length ? (
                <table className="w-full table-fixed">
                  <tbody>
                    {table.getRowModel().rows.map((row) => {
                      return (
                        <Link
                          href={`/interviews/${row.original.id}`}
                          key={row.id}
                          legacyBehavior
                        >
                          <tr
                            key={row.id}
                            className="hover cursor-pointer border-b bg-primary transition-all last:border-b-0"
                          >
                            {row.getVisibleCells().map((cell) => {
                              return (
                                <td
                                  style={{
                                    width: cell.column.columnDef.meta as string,
                                  }}
                                  className="px-6 py-4 text-secondary"
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
                <div className="flex h-full flex-grow flex-col items-center justify-center">
                  <h1 className="text-center text-xl font-semibold">
                    No completed interviews
                  </h1>
                  <p className="mt-1 text-center text-sm font-medium text-secondary">
                    You haven&apos;t completed any interviews (yet)
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-[auto,1fr,auto] rounded-2xl border p-3 shadow-xs md:p-4">
        <button
          className={buttonStyles(
            {
              size: "sm",
              variant: "secondary",
            },
            "items-baseline self-baseline px-2 md:px-3",
          )}
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          <ArrowLeft size={20} className="self-center" />
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
            "self-baseline px-2 md:px-3",
          )}
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          <span className="hidden md:inline">Next</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
