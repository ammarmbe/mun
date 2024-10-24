"use client";

import { useQueryState } from "nuqs";
import { useQuery } from "@tanstack/react-query";
import { queryFunctions, queryKeys } from "@/utils/react-query";
import Loading from "@/app/notifications/loading";
import React from "react";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";

dayjs.extend(relativeTime);

export default function Page() {
  const [type] = useQueryState("type", { defaultValue: "all" });

  const { data, isLoading } = useQuery({
    queryKey: queryKeys.notifications.get({
      type: type === "new" ? "new" : "all",
    }),
    queryFn: queryFunctions.notifications.get({
      type: type === "new" ? "new" : "all",
    }),
  });

  if (isLoading) return <Loading />;

  return (
    <div className="-m-px mt-0 flex flex-grow flex-col overflow-hidden rounded-2xl border bg-primary">
      <div className="flex flex-grow flex-col gap-4">
        {data?.length
          ? data.map((notification) => {
              const content = (
                <>
                  <div className="size-10 flex-none rounded-full border bg-white">
                    <Image src="/logo.png" height={38} width={38} alt="Logo" />
                  </div>
                  <div className="flex flex-grow flex-col">
                    <div className="flex w-full items-start justify-between">
                      <div className="flex items-baseline gap-2">
                        <p className="text-sm font-medium text-secondary">
                          {notification.title}
                        </p>
                        <p className="text-xs text-tertiary">
                          {dayjs(notification.createdAt).fromNow()}
                        </p>
                      </div>
                      {dayjs().diff(notification.readAt, "second") < 5 ? (
                        <div className="size-2 rounded-full bg-success-600" />
                      ) : null}
                    </div>
                    <p className="text-sm text-tertiary">{notification.body}</p>
                  </div>
                </>
              );

              return notification.interviewId ? (
                <Link
                  key={notification.id}
                  href={`/interview/${notification.interviewId}`}
                  className="hover flex gap-3 border-b bg-primary p-4"
                >
                  {content}
                </Link>
              ) : (
                <div key={notification.id} className="flex gap-3 border-b p-4">
                  {content}
                </div>
              );
            })
          : null}
        <div className="flex flex-grow flex-col items-center justify-center">
          <p className="px-4 py-10 text-center text-sm font-medium text-disabled">
            No {(data?.length || 0) > 0 ? "more " : null}notifications
          </p>
        </div>
      </div>
    </div>
  );
}
