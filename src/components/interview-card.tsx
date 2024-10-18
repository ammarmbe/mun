import type { getAllInterviews } from "@/data/interviews";
import dayjs from "dayjs";
import { Badge, Clock, Flag, MessageCircle, Phone } from "lucide-react";
import buttonStyles from "@/utils/styles/button";
import Link from "next/link";
import relativeTime from "dayjs/plugin/relativeTime";
import { getGradeColor } from "@/utils";

dayjs.extend(relativeTime);

export default function InterviewCard({
  interview,
  upNext,
}: {
  interview: Awaited<ReturnType<typeof getAllInterviews>>["interviews"][number];
  upNext?: boolean;
}) {
  return (
    <Link href={`/interviews/${interview.id}`} legacyBehavior>
      <div className="hover h-fit cursor-pointer bg-primary p-5 transition-all">
        <div key={interview.id} className="flex flex-col">
          <div className="flex min-w-0 flex-col gap-1">
            <h3 className="truncate text-lg font-semibold">
              {interview.delegate.firstName} {interview.delegate.lastName}
            </h3>
            <p className="text-sm font-medium text-secondary">
              {dayjs(interview.date).fromNow()}
            </p>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <p className="flex items-center gap-2 text-sm font-medium text-secondary">
              <Flag size={16} className="text-tertiary" />
              {interview.delegate.council}
            </p>
            <p className="flex items-center gap-2 text-sm font-medium text-secondary">
              <Clock size={16} className="text-tertiary" />
              {dayjs(interview.date).format("dddd, MMMM D, hh:mm A")}
            </p>
            {interview._count.answers > 0 ? (
              <p className="flex items-center gap-2 text-sm font-medium text-secondary">
                <MessageCircle size={16} className="text-tertiary" />
                {interview._count.answers}/{interview._count.questions}{" "}
                {interview._count.answers > 1 ? "questions" : "question"}{" "}
                answered
              </p>
            ) : null}
            {interview.grade ? (
              <p className="flex items-center gap-2 text-sm font-medium text-secondary">
                <Badge size={16} className="text-tertiary" />
                <span
                  className={getGradeColor(interview.grade, "text-secondary")}
                >
                  Grade: {interview.grade}
                </span>
              </p>
            ) : null}
            <a
              href={`tel:${interview.delegate.phoneNumber}`}
              onClick={(e) => e.stopPropagation()}
              className="flex w-fit items-center gap-2 text-sm font-medium text-secondary"
            >
              <Phone size={16} className="text-tertiary" />
              {interview.delegate.phoneNumber}
            </a>
          </div>
          {upNext ? (
            <Link
              href={`/interviews/${interview.id}?editing=true`}
              onClick={(e) => e.stopPropagation()}
              className={buttonStyles(
                {
                  size: "md",
                  variant: "primary",
                },
                "mt-4",
              )}
            >
              <span>{interview._count.answers > 0 ? "Edit" : "Start"}</span>
            </Link>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
