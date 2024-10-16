"use client";

import { useQuery } from "@tanstack/react-query";
import { queryFunctions, queryKeys } from "@/utils/react-query";
import Loading from "@/app/interviews/[id]/@info/loading";
import Image from "next/image";
import React, { use } from "react";
import dayjs from "dayjs";
import { notFound } from "next/navigation";
import { faculties, getGradeColor } from "@/utils";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

export default function Page(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const { data: interview, isLoading } = useQuery({
    queryKey: queryKeys.interview.id({ id: params.id }),
    queryFn: queryFunctions.interview.id({ id: params.id }),
  });

  if (isLoading) return <Loading />;

  if (interview === undefined) {
    return (
      <div className="flex min-h-72 flex-grow flex-col items-center justify-center">
        <h1 className="text-xl font-semibold">You are not logged in</h1>
        <p className="mt-1 text-sm font-medium text-secondary">
          Please log in to view this interview
        </p>
      </div>
    );
  }

  if (interview === null) notFound();

  return (
    <>
      <h2 className="truncate text-display-xs font-semibold">
        {interview.delegate.firstName} {interview.delegate.lastName}
      </h2>
      <AspectRatio ratio={1} className="relative overflow-hidden rounded-md">
        <Image
          src="/logo.png"
          fill
          sizes="(min-width: 768px) 15.375rem, calc(100vw - 4rem - 2px)"
          alt="Photo"
        />
      </AspectRatio>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-primary">Phone number</p>
          <a
            href={`tel:${interview.delegate.phoneNumber}`}
            className="text-secondary"
          >
            {interview.delegate.phoneNumber}
          </a>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-primary">University ID</p>
          <p className="text-secondary">
            {interview.delegate.universityId ?? (
              <span className="text-disabled">Not specified</span>
            )}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-primary">Date</p>
          <p className="text-secondary">
            {dayjs(interview.date).format("dddd, MMMM D, hh:mm A")}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-primary">Grade</p>
          <p className={getGradeColor(interview.grade, "text-disabled")}>
            {interview.grade || "Not graded"}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-primary">Interviewed by</p>
          <p className="text-secondary">
            {interview.user ? (
              `${interview.user?.firstName} ${interview.user?.lastName}`
            ) : (
              <span className="text-disabled">Not interviewed yet</span>
            )}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-primary">Faculty</p>
          <p className="text-secondary">
            {faculties[interview.delegate.faculty] ?? (
              <span className="text-disabled">Not specified</span>
            )}
          </p>
        </div>
      </div>
    </>
  );
}
