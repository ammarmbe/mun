import buttonStyles from "@/utils/styles/button";
import { ArrowLeft, ArrowRight, ChevronsUpDown } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import { inputStyles } from "@/utils/styles/input";
import InputWrapper from "@/components/input-wrapper";
import React from "react";

export default function TableLoading() {
  return (
    <div className="m-4 mt-0 flex flex-grow flex-col md:ml-3">
      <div className="relative flex-grow">
        <div className="absolute inset-0 flex overflow-auto">
          <div className="flex h-fit min-h-full min-w-[850px] flex-grow flex-col overflow-hidden rounded-t-2xl border bg-tertiary dark:bg-secondary-subtle">
            <table className="w-full table-fixed">
              <thead>
                <tr>
                  <th
                    style={{
                      width: "35%",
                    }}
                    className="cursor-pointer px-4 pb-2 pt-3 text-start text-sm font-semibold text-secondary"
                  >
                    <div className="flex items-center gap-1">
                      Delegate name
                      <ChevronsUpDown size={12} className="text-quinary" />
                    </div>
                  </th>
                  <th
                    style={{
                      width: "30%",
                    }}
                    className="cursor-pointer px-4 pb-2 pt-3 text-start text-sm font-semibold text-secondary"
                  >
                    <div className="flex items-center gap-1">
                      Date
                      <ChevronsUpDown size={12} className="text-quinary" />
                    </div>
                  </th>
                  <th
                    style={{
                      width: "calc(70px + 3rem)",
                    }}
                    className="cursor-pointer px-4 pb-2 pt-3 text-start text-sm font-semibold text-secondary"
                  >
                    <div className="flex items-center gap-1">
                      Council
                      <ChevronsUpDown size={12} className="text-quinary" />
                    </div>
                  </th>
                  <th
                    style={{
                      width: "calc(70px + 3rem)",
                    }}
                    className="cursor-pointer px-4 pb-2 pt-3 text-start text-sm font-semibold text-secondary"
                  >
                    <div className="flex items-center gap-1">
                      Answers
                      <ChevronsUpDown size={12} className="text-quinary" />
                    </div>
                  </th>
                  <th
                    style={{
                      width: "15%",
                    }}
                    className="cursor-pointer px-4 pb-2 pt-3 text-start text-sm font-semibold text-secondary"
                  >
                    <div className="flex items-center gap-1">
                      Grade
                      <ChevronsUpDown size={12} className="text-quinary" />
                    </div>
                  </th>
                  <th
                    style={{
                      width: "calc(140px + 3rem)",
                    }}
                    className="cursor-pointer px-4 pb-2 pt-3 text-start text-sm font-semibold text-secondary"
                  >
                    <div className="flex items-center gap-1">
                      Status
                      <ChevronsUpDown size={12} className="text-quinary" />
                    </div>
                  </th>
                </tr>
              </thead>
            </table>
            <div className="-m-px mt-0 flex-grow overflow-hidden rounded-t-2xl border bg-primary">
              <table className="w-full table-fixed">
                <tbody>
                  {Array.from({ length: 10 }).map((_, i) => (
                    <tr key={i} className="border-b last:border-b-0">
                      <td
                        style={{
                          width: "35%",
                        }}
                        className="px-4 py-3 text-sm text-secondary"
                      >
                        <Skeleton
                          style={{
                            width: `${Math.floor(Math.random() * (90 - 40 + 1)) + 40}%`,
                          }}
                        />
                      </td>
                      <td
                        style={{
                          width: "30%",
                        }}
                        className="px-4 py-3 text-sm text-secondary"
                      >
                        <Skeleton
                          style={{
                            width: `${Math.floor(Math.random() * (90 - 40 + 1)) + 40}%`,
                          }}
                        />
                      </td>
                      <td
                        style={{
                          width: "calc(70px + 3rem)",
                        }}
                        className="px-4 py-3 text-sm leading-none text-secondary"
                      >
                        <Skeleton
                          style={{
                            width: "80%",
                            height: "21px",
                            borderRadius: "999px",
                          }}
                        />
                      </td>
                      <td
                        style={{
                          width: "calc(70px + 3rem)",
                        }}
                        className="px-4 py-3 text-sm text-secondary"
                      >
                        <Skeleton
                          style={{
                            width: `${Math.floor(Math.random() * (100 - 80 + 1)) + 80}%`,
                          }}
                        />
                      </td>
                      <td
                        style={{
                          width: "15%",
                        }}
                        className="px-4 py-3 text-sm text-secondary"
                      >
                        <Skeleton
                          style={{
                            width: `90%`,
                          }}
                        />
                      </td>
                      <td
                        style={{
                          width: "calc(140px + 3rem)",
                        }}
                        className="px-4 py-3 text-sm text-secondary"
                      >
                        <InputWrapper size="xs" Icon={ChevronsUpDown}>
                          <select
                            className={inputStyles({
                              variant: "primary",
                              size: "xs",
                            })}
                            id={`status-${i}`}
                            disabled
                            aria-readonly={true}
                          />
                        </InputWrapper>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[auto,1fr,auto] rounded-b-2xl border border-t-0 bg-primary p-3 shadow-xs md:p-4">
        <button
          className={buttonStyles(
            {
              size: "sm",
              variant: "secondary",
            },
            "items-baseline self-baseline px-2 md:px-3",
          )}
          disabled
        >
          <ArrowLeft size={16} className="self-center" />
          <span className="hidden md:inline">Previous</span>
        </button>
        <p className="self-center text-center text-sm leading-none text-secondary md:self-baseline">
          <Skeleton className="!w-20" />
        </p>
        <button
          className={buttonStyles(
            {
              size: "sm",
              variant: "secondary",
            },
            "self-baseline px-2 md:px-3",
          )}
          disabled
        >
          <span className="hidden md:inline">Next</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
