"use client";

import buttonStyles from "@/utils/styles/button";
import { inputStyles, labelStyles } from "@/utils/styles/input";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import Toast from "@/components/toast";
import { queryFunctions, queryKeys } from "@/utils/react-query";
import Spinner from "@/components/spinner";
import Loading from "@/app/settings/questions/loading";
import type { getSettings } from "@/data/settings";
import InputWrapper from "@/components/input-wrapper";
import { ChevronsUpDown } from "lucide-react";

export default function Admin() {
  const [settings, setSettings] = useState<NonNullable<
    Awaited<ReturnType<typeof getSettings>>
  > | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: queryKeys.settings(),
    queryFn: queryFunctions.settings,
  });

  const updateMutation = useMutation({
    mutationFn: async (
      settings: NonNullable<Awaited<ReturnType<typeof getSettings>>>,
    ) => {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        body: JSON.stringify(settings),
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
    onSuccess: async () => {
      toast.custom((t) => (
        <Toast
          variant="success"
          title="Page saved"
          t={t}
          message="Your settings have been saved successfully."
        />
      ));
    },
  });

  useEffect(() => {
    !settings && data && setSettings(data);
  }, [data]);

  if (isLoading) return <Loading />;

  return (
    <div className="-m-px mt-0 flex flex-grow flex-col overflow-hidden rounded-2xl border bg-primary">
      <div className="flex justify-between gap-4 border-b p-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Admin settings</h2>
          <p className="text-sm text-tertiary">
            Update settings related to the website.
          </p>
        </div>
        <button
          className={buttonStyles({
            variant: "primary",
            size: "sm",
          })}
          disabled={updateMutation.isPending || !settings}
          onClick={() => settings && updateMutation.mutate(settings)}
        >
          {updateMutation.isPending ? <Spinner size={16} /> : null}
          <span>Save</span>
        </button>
      </div>
      <div className="flex flex-grow flex-col">
        {settings?.length ? (
          settings.map((setting) => (
            <div
              key={setting.id}
              className="grid gap-1.5 gap-x-6 border-b p-4 last:border-b-0 sm:grid-cols-2 md:grid-cols-[1fr,2fr]"
            >
              <div className="flex flex-col gap-1">
                <p className={labelStyles({ required: true })}>
                  {setting.label}
                </p>
                <p className="mb-2 text-sm text-tertiary md:mb-0">
                  {setting.description}
                </p>
              </div>
              {setting.type === "BOOLEAN" ? (
                <InputWrapper size="sm" Icon={ChevronsUpDown}>
                  <select
                    className={inputStyles({
                      variant: "primary",
                      size: "sm",
                    })}
                    value={setting.value || "FALSE"}
                    onChange={(e) => {
                      setSettings((prev) => {
                        if (!prev) return prev;

                        return prev.map((s) =>
                          s.id === setting.id
                            ? {
                                ...s,
                                value: e.target.value,
                              }
                            : s,
                        );
                      });
                    }}
                  >
                    <option value="TRUE">Yes</option>
                    <option value="FALSE">No</option>
                  </select>
                </InputWrapper>
              ) : (
                <input
                  className={inputStyles({
                    variant: "primary",
                    size: "sm",
                  })}
                  value={setting.value}
                  type={setting.type === "STRING" ? "text" : "number"}
                  onChange={(e) => {
                    setSettings((prev) => {
                      if (!prev) return prev;

                      return prev.map((s) =>
                        s.id === setting.id
                          ? {
                              ...s,
                              value: e.target.value,
                            }
                          : s,
                      );
                    });
                  }}
                />
              )}
            </div>
          ))
        ) : (
          <div className="flex flex-grow items-center justify-center">
            <p className="text-sm text-tertiary">No settings found</p>
          </div>
        )}
      </div>
    </div>
  );
}
