import { getTodaysInterviews } from "@/data/interviews";
import dayjs from "dayjs";
import { Clock, Phone } from "lucide-react";
import buttonStyles from "@/utils/styles/button";
import Options from "@/components/cards/upcoming-card/options";
import Status from "@/components/cards/upcoming-card/status";
import Badge from "@/components/badge";

export default function UpcomingCard({
  interview,
  upNext,
}: {
  interview: Awaited<ReturnType<typeof getTodaysInterviews>>[0];
  upNext?: boolean;
}) {
  return (
    <div className="h-fit rounded-lg border p-4 shadow-md">
      <div key={interview.id} className="flex flex-col">
        <div className="flex justify-between">
          <div className="flex min-w-0 flex-col gap-1">
            <h3 className="flex items-center gap-3 text-lg font-semibold">
              <span className="truncate">
                {interview.delegate.firstName} {interview.delegate.lastName}
              </span>
              {interview.status !== "PENDING" ? (
                <Badge
                  text={
                    interview.status.charAt(0).toUpperCase() +
                    interview.status.slice(1).toLowerCase()
                  }
                  color={
                    interview.status === "MISSED"
                      ? "red"
                      : interview.status === "COMPLETED"
                        ? "green"
                        : "gray"
                  }
                  size="sm"
                />
              ) : null}
            </h3>
            <p className="text-sm font-medium text-secondary">
              {dayjs(interview.date).fromNow()}
            </p>
          </div>
          {!upNext ? <Options interview={interview} /> : null}
        </div>
        <div className="mt-4 flex flex-col gap-3">
          <p className="flex items-center gap-2 text-sm font-medium text-secondary">
            <Clock size={20} className="text-tertiary" />
            {dayjs(interview.date).format("hh:mm A")}
          </p>
          <a
            href={`tel:${interview.delegate.phoneNumber}`}
            className="flex w-fit items-center gap-2 text-sm font-medium text-secondary"
          >
            <Phone size={20} className="text-tertiary" />
            {interview.delegate.phoneNumber}
          </a>
        </div>
        {upNext ? (
          <div className="mt-4 flex justify-between gap-5">
            <div className="flex gap-2">
              <Status
                interview={interview}
                status={
                  interview.status === "CANCELLED" ? "PENDING" : "CANCELLED"
                }
              />
              <Status
                interview={interview}
                status={interview.status === "MISSED" ? "PENDING" : "MISSED"}
              />
            </div>
            <button
              className={buttonStyles({
                size: "sm",
                variant: "primary",
              })}
            >
              <span>Start</span>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
