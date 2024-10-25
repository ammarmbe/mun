"use client";

import buttonStyles from "@/utils/styles/button";
import { inputStyles, labelStyles } from "@/utils/styles/input";
import InputWrapper from "@/components/input-wrapper";
import { ChevronsUpDown } from "lucide-react";
import FileUpload from "@/app/settings/personal/file-upload";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Toast from "@/components/toast";
import { queryFunctions, queryKeys } from "@/utils/react-query";
import Spinner from "@/components/spinner";
import Loading from "./loading";

export default function Page() {
  const queryClient = useQueryClient();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { data: user, isLoading } = useQuery({
    queryKey: queryKeys.user.current(),
    queryFn: queryFunctions.user.current,
  });

  const updateMutation = useMutation({
    mutationFn: async () => {
      if (!firstName || !lastName) {
        throw new Error("MISSING_DATA");
      }

      const res = await fetch("/api/user", {
        method: "PATCH",
        body: JSON.stringify({
          firstName,
          lastName,
        }),
      });

      if (!res.ok) {
        throw new Error();
      }
    },
    onError: () => {
      if (
        updateMutation.error instanceof Error &&
        updateMutation.error.message === "MISSING_DATA"
      ) {
        toast.custom((t) => (
          <Toast
            variant="error"
            title="Missing data"
            t={t}
            message="Please fill out all required fields."
          />
        ));
      }

      toast.custom((t) => (
        <Toast
          variant="error"
          title="An error occurred"
          t={t}
          message="We couldn't save your data. Please try again."
        />
      ));
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.user.current(),
      });

      toast.custom((t) => (
        <Toast
          variant="success"
          title="Data saved"
          t={t}
          message="Your data has been saved successfully."
        />
      ));
    },
  });

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }
  }, [user]);

  if (isLoading) return <Loading />;

  return (
    <div className="-m-px mt-0 flex flex-grow flex-col rounded-2xl border bg-primary">
      <div className="flex justify-between gap-4 border-b p-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Personal info</h2>
          <p className="text-sm text-tertiary">
            Update your personal info, like your name and photo
          </p>
        </div>
        <button
          className={buttonStyles({
            variant: "primary",
            size: "sm",
          })}
          disabled={updateMutation.isPending}
          onClick={() => updateMutation.mutate()}
        >
          {updateMutation.isPending ? <Spinner size={16} /> : null}
          <span>Save</span>
        </button>
      </div>
      <div className="flex flex-col">
        <div className="grid gap-1.5 border-b p-4 sm:grid-cols-2 md:grid-cols-[1fr,2fr]">
          <p className={labelStyles({ required: true }, "hidden md:block")}>
            Name
          </p>
          <div className="flex gap-5">
            <div className="flex w-full flex-col gap-1.5">
              <label
                htmlFor="first-name"
                className={labelStyles({ required: true }, "md:hidden")}
              >
                First name
              </label>
              <input
                type="text"
                id="first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={inputStyles(
                  {
                    variant: "primary",
                    size: "sm",
                  },
                  "w-full",
                )}
              />
            </div>
            <div className="flex w-full flex-col gap-1.5">
              <label
                htmlFor="last-name"
                className={labelStyles({ required: true }, "md:hidden")}
              >
                Last name
              </label>
              <input
                type="text"
                id="last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={inputStyles(
                  {
                    variant: "primary",
                    size: "sm",
                  },
                  "w-full",
                )}
              />
            </div>
          </div>
        </div>
        <div className="grid gap-1.5 border-b p-4 sm:grid-cols-2 md:grid-cols-[1fr,2fr]">
          <p className={labelStyles({ required: true })}>Photo</p>
          <FileUpload user={user} />
        </div>
        {user?.council ? (
          <div className="grid gap-1.5 p-4 sm:grid-cols-2 md:grid-cols-[1fr,2fr]">
            <p className={labelStyles({ required: true })}>Council</p>
            <InputWrapper size="sm" Icon={ChevronsUpDown}>
              <select
                className={inputStyles({
                  variant: "primary",
                  size: "sm",
                })}
                disabled
              >
                <option value={user.council}>{user.council}</option>
              </select>
            </InputWrapper>
          </div>
        ) : null}
      </div>
    </div>
  );
}
