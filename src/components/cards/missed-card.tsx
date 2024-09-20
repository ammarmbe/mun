"use client";

import { getMissedInterviews } from "@/data/interviews";
import { Clock, Phone } from "lucide-react";
import Link from "next/link";
import dayjs from "dayjs";

export default function MissedCard({
  interview,
}: {
  interview: Awaited<ReturnType<typeof getMissedInterviews>>[0];
}) {
  return (
    <Link href={`/interviews/${interview.id}`} legacyBehavior>
      <div className="h-fit cursor-pointer rounded-lg border p-4 shadow-md">
        <div key={interview.id} className="flex flex-col">
          <h3 className="truncate text-lg font-semibold">
            {interview.delegate.firstName} {interview.delegate.lastName}
          </h3>
          <div className="mt-4 flex flex-col gap-3">
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
