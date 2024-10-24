"use client";

import { labelStyles } from "@/utils/styles/input";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import Toast from "@/components/toast";
import { queryFunctions, queryKeys } from "@/utils/react-query";
import Loading from "@/app/settings/questions/loading";
import type { getNotificationSettings } from "@/data/settings";
import { User } from "@prisma/client";
import Switch from "@/components/switch";
import { subscribe } from "@/utils";

export default function Notifications({ user }: { user: User }) {
  const [lastClicked, setLastClicked] = useState<"NEW" | "UPCOMING" | null>(
    null,
  );

  const [settings, setSettings] = useState<NonNullable<
    Awaited<ReturnType<typeof getNotificationSettings>>
  > | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: queryKeys.user.notifications(),
    queryFn: queryFunctions.user.notifications,
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      value,
      type,
    }: {
      value: boolean;
      type: "NEW" | "UPCOMING";
    }) => {
      let subscription: PushSubscription | undefined = undefined;

      if (value) {
        subscription = (await subscribe(user?.id)) ?? undefined;
      }

      const res = await fetch("/api/user/notifications", {
        method: "PATCH",
        body: JSON.stringify({
          value,
          type,
          subscription: JSON.stringify(subscription),
        }),
      });

      if (!res.ok) {
        throw new Error();
      }
    },
    onError: () => {
      toast.custom((t) => (
        <Toast
          variant="error"
          title="An error occurred"
          t={t}
          message="We couldn't save your settings. Please try again."
        />
      ));
    },
    onSuccess: async (_, { value, type }) => {
      toast.custom((t) => (
        <Toast
          variant="success"
          title="Settings saved"
          t={t}
          message="Your settings have been saved successfully."
        />
      ));

      setSettings((prev) =>
        prev
          ? {
              ...prev,
              [`${type}InterviewNotification`]: value,
            }
          : null,
      );
    },
  });

  useEffect(() => {
    !settings && data && setSettings(data);
  }, [data]);

  if (isLoading) return <Loading />;

  return (
    <div className="-m-px mt-0 flex flex-grow flex-col overflow-hidden rounded-2xl border bg-primary">
      <div className="flex flex-col gap-1 border-b p-4">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <p className="text-sm text-tertiary">
          Update settings related to notifications.
        </p>
      </div>
      <div className="flex flex-grow flex-col">
        <label
          htmlFor="new"
          className="flex gap-1.5 gap-x-6 border-b p-4 last:border-b-0"
        >
          <Switch
            id="new"
            value={settings?.newInterviewNotification}
            disabled={lastClicked === "NEW" && updateMutation.isPending}
            onChange={(value) => {
              setLastClicked("NEW");

              updateMutation.mutate({
                value,
                type: "NEW",
              });
            }}
          />
          <div className="flex flex-col gap-1">
            <p className={labelStyles({ required: true })}>
              New interview notification
            </p>
            <p className="mb-2 text-sm text-tertiary md:mb-0">
              Get a notification when someone fills out the interview form.
            </p>
          </div>
        </label>
        <div className="flex flex-grow flex-col">
          <label
            htmlFor="upcoming"
            className="flex gap-1.5 gap-x-6 border-b p-4 last:border-b-0"
          >
            <Switch
              id="upcoming"
              value={settings?.upcomingInterviewNotification}
              disabled={lastClicked === "UPCOMING" && updateMutation.isPending}
              onChange={(value) => {
                setLastClicked("UPCOMING");

                updateMutation.mutate({
                  value,
                  type: "UPCOMING",
                });
              }}
            />
            <div className="flex flex-col gap-1">
              <p className={labelStyles({ required: true })}>
                Upcoming interview notification
              </p>
              <p className="mb-2 text-sm text-tertiary md:mb-0">
                Get a notification 10 minutes before an interview starts.
              </p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
