"use client";

import { getCompletedInterviews } from "@/data/interviews";
import { Phone, User2 } from "lucide-react";
import { getUser } from "@/utils/auth/user";
import Link from "next/link";

export default function CompletedCard({
  interview,
  user,
}: {
  interview: Awaited<ReturnType<typeof getCompletedInterviews>>[0];
  user: Awaited<ReturnType<typeof getUser>>;
}) {
  return (
    <Link href={`/interview/${interview.id}`} legacyBehavior>
      <div className="rounded-lg border p-4 shadow-md">
        <div key={interview.id} className="flex flex-col">
          <div className="flex flex-col gap-1">
            <h3 className="truncate text-lg font-semibold">
              {interview.delegate.firstName} {interview.delegate.lastName}
            </h3>
            <p className="text-sm font-medium text-secondary">
              Grade:{" "}
              <span
                className={
                  ["10", "9", "a", "a-", "a+"].includes(
                    interview.grade?.toLowerCase() || "",
                  )
                    ? "text-utility-success-800"
                    : ["8", "7", "b", "b-", "b+"].includes(
                          interview.grade?.toLowerCase() || "",
                        )
                      ? "text-utility-success-600"
                      : ["6", "5", "c", "c-", "c+"].includes(
                            interview.grade?.toLowerCase() || "",
                          )
                        ? "text-utility-warning-600"
                        : [
                              "4",
                              "3",
                              "2",
                              "1",
                              "0",
                              "d",
                              "d-",
                              "d+",
                              "e",
                              "e+",
                              "e-",
                              "f",
                              "f+",
                              "f-",
                            ].includes(interview.grade?.toLowerCase() || "")
                          ? "text-utility-error-600"
                          : "text-secondary"
                }
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
