"use client";

import { getCompletedInterviews } from "@/data/interviews";
import { Clock, Phone, User2 } from "lucide-react";
import { getUser } from "@/utils/auth/user";
import Link from "next/link";
import dayjs from "dayjs";
import { getGradeColor } from "@/utils";

export default function CompletedCard({
  interview,
  user,
}: {
  interview: Awaited<ReturnType<typeof getCompletedInterviews>>[0];
  user: Awaited<ReturnType<typeof getUser>>;
}) {
  return (
    <Link href={`/interviews/${interview.id}`} legacyBehavior>
      <div className="h-fit cursor-pointer rounded-lg border p-4 shadow-md">
        <div key={interview.id} className="flex flex-col">
          <div className="flex flex-col gap-1">
            <h3 className="truncate text-lg font-semibold">
              {interview.delegate.firstName} {interview.delegate.lastName}
            </h3>
            <p className="text-sm font-medium text-secondary">
              Grade:{" "}
              <span
                className={getGradeColor(interview.grade, "text-secondary")}
              >
                {interview.grade}
              </span>
            </p>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <p className="flex items-center gap-2 text-sm font-medium text-secondary">
              <User2 size={20} className="text-tertiary" />
              {interview.user?.id === user?.id
                ? "Me"
                : `${interview.user?.firstName} ${interview.user?.lastName}`}
            </p>
            <p className="flex items-center gap-2 text-sm font-medium text-secondary">
              <Clock size={20} className="text-tertiary" />
              {dayjs(interview.date).format("dddd, MMMM D, hh:mm A")}
            </p>
            <a
              href={`tel:${interview.delegate.phoneNumber}`}
              onClick={(e) => e.stopPropagation()}
              className="flex w-fit items-center gap-2 text-sm font-medium text-secondary"
            >
              <Phone size={20} className="text-tertiary" />
              {interview.delegate.phoneNumber}
            </a>
          </div>
        </div>
      </div>
    </Link>
  );
}
