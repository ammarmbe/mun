"use client";

import { useQuery } from "@tanstack/react-query";
import { queryFunctions, queryKeys } from "@/utils/react-query";
import Loading from "@/app/interviews/[id]/@info/loading";
import Image from "next/image";
import React from "react";
import dayjs from "dayjs";
import Badge from "@/components/badge";
import Options from "@/components/cards/upcoming-card/options";

export default function Page({ params }: { params: { id: string } }) {
  const { data: interview, isLoading } = useQuery({
    queryKey: queryKeys.interview.id({ id: params.id }),
    queryFn: queryFunctions.interview.id({ id: params.id }),
    throwOnError: true,
  });

  const { data: user } = useQuery({
    queryKey: queryKeys.user(),
    queryFn: queryFunctions.user,
    throwOnError: true,
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

  if (interview === null) return null;

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="truncate text-display-xs font-semibold">
          {interview.delegate.firstName} {interview.delegate.lastName}
        </h2>
        <Options interview={interview} />
      </div>
      <div className="relative size-[calc(100vw-2rem)] overflow-hidden rounded-md md:size-[13.9375rem]">
        <Image
          src="/logo.png"
          fill
          sizes="(min-width: 768px) 13.9375rem, calc(100vw - 2rem)"
          alt="Photo"
        />
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-primary">Status</p>
          <Badge
            size="md"
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
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-primary">Date</p>
          <p className="text-secondary">
            {dayjs(interview.date).format("dddd, MMMM D, hh:mm A")}
          </p>
        </div>
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
          <p className="text-sm font-medium text-primary">Interviewed by</p>
          <p className="text-secondary">
            {interview.user?.id === user?.id ? (
              "Me"
            ) : interview.user ? (
              `${interview.user?.firstName} ${interview.user?.lastName}`
            ) : (
              <span className="text-disabled">Not interviewed yet</span>
            )}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-primary">Faculty</p>
          <p className="text-secondary">
            {interview.delegate.faculty ?? (
              <span className="text-disabled">Not specified</span>
            )}
          </p>
        </div>
      </div>
    </>
  );
}
