import buttonStyles from "@/utils/styles/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Skeleton from "react-loading-skeleton";

export default function Loading() {
  return (
    <div className="m-4 mt-0 flex flex-grow flex-col md:ml-3">
      <div className="relative flex-grow">
        <div className="absolute inset-0 flex overflow-auto">
          <div className="flex min-w-[850px] flex-grow flex-col rounded-2xl border bg-secondary-subtle">
            <table className="w-full table-fixed">
              <thead>
                <tr>
                  <th
                    style={{
                      width: "30%",
                    }}
                    className="px-6 pb-2 pt-3 text-start text-sm font-semibold text-secondary"
                  >
                    Delegate name
                  </th>
                  <th
                    style={{
                      width: "30%",
                    }}
                    className="px-6 pb-2 pt-3 text-start text-sm font-semibold text-secondary"
                  >
                    Date
                  </th>
                  <th
                    style={{
                      width: "15%",
                    }}
                    className="px-6 pb-2 pt-3 text-start text-sm font-semibold text-secondary"
                  >
                    Council
                  </th>
                  <th
                    style={{
                      width: "calc(90px + 3rem)",
                    }}
                    className="px-6 pb-2 pt-3 text-start text-sm font-semibold text-secondary"
                  >
                    Answers
                  </th>
                </tr>
              </thead>
            </table>
            <div className="-m-px mt-0 flex-grow overflow-hidden rounded-2xl border bg-primary">
              <table className="w-full table-fixed">
                <tbody>
                  {Array.from({ length: 10 }).map((_, i) => (
                    <tr key={i} className="border-b last:border-b-0">
                      <td
                        style={{
                          width: "30%",
                        }}
                        className="px-6 py-4 text-secondary"
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
                        className="px-6 py-4 text-secondary"
                      >
                        <Skeleton
                          style={{
                            width: `${Math.floor(Math.random() * (90 - 40 + 1)) + 40}%`,
                          }}
                        />
                      </td>
                      <td
                        style={{
                          width: "15%",
                        }}
                        className="px-6 py-4 text-secondary"
                      >
                        <Skeleton
                          style={{
                            width: `${Math.floor(Math.random() * (100 - 80 + 1)) + 80}%`,
                          }}
                        />
                      </td>
                      <td
                        style={{
                          width: "calc(90px + 3rem)",
                        }}
                        className="px-6 py-4 text-secondary"
                      >
                        <Skeleton
                          style={{
                            width: `40%`,
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
          disabled
        >
          <ArrowLeft size={20} className="self-center" />
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
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
