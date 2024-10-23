"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryFunctions, queryKeys } from "@/utils/react-query";
import Loading from "@/app/interviews/[id]/@info/loading";
import React, { use, useEffect, useState } from "react";
import dayjs from "dayjs";
import { councilColors, faculties, getGradeColor } from "@/utils";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { notFound } from "next/navigation";
import FileUpload from "./file-upload";
import { toast } from "sonner";
import Toast from "@/components/toast";
import Badge from "@/components/badge";
import * as Avatar from "@radix-ui/react-avatar";
import UpdateStatus from "@/app/interviews/[id]/@info/update-status";

export default function Page(props: { params: Promise<{ id: string }> }) {
  const queryClient = useQueryClient();
  const params = use(props.params);

  const [file, setFile] = useState<File>();

  const { data: interview, isLoading } = useQuery({
    queryKey: queryKeys.interview.id({ id: params.id }),
    queryFn: queryFunctions.interview.id({ id: params.id }),
  });

  const imageMutation = useMutation({
    mutationFn: async ({
      file,
      delegateId,
    }: {
      file: File | undefined;
      delegateId: string;
    }) => {
      if (!file) return;

      const formData = new FormData();

      formData.append("file", file);
      formData.append("id", delegateId);

      const res = await fetch(`/api/interview/${params.id}/image/`, {
        method: "PATCH",
        body: formData,
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
          message="We couldn't save the image. Please try again."
        />
      ));
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.interview.id({ id: params.id }),
      });

      toast.custom((t) => (
        <Toast
          variant="success"
          title="Image saved"
          t={t}
          message="Please refresh to see the updated image."
        />
      ));
    },
  });

  useEffect(() => {
    if (file && interview?.delegate.id) {
      imageMutation.mutate({ file, delegateId: interview.delegate.id });
    }
  }, [file]);

  useEffect(() => {
    window.onbeforeunload = () =>
      "You have unsaved changes. Are you sure you want to leave?";
  }, [imageMutation.isPending]);

  if (isLoading) return <Loading />;

  if (interview === undefined) {
    return (
      <main className="m-4 flex flex-col gap-4 rounded-2xl border p-4 shadow-xs md:m-1 md:max-h-[calc(100dvh-0.5rem)] md:w-72 md:gap-5 md:overflow-auto md:p-5">
        <div className="flex min-h-72 flex-grow flex-col items-center justify-center">
          <h1 className="text-xl font-semibold">You are not logged in</h1>
          <p className="mt-1 text-sm font-medium text-secondary">
            Please log in to view this interview
          </p>
        </div>
      </main>
    );
  }

  if (interview === null) return notFound();

  return (
    <main className="m-4 flex flex-col gap-4 rounded-2xl border p-4 shadow-xs md:m-1 md:max-h-[calc(100dvh-0.5rem)] md:w-72 md:gap-5 md:overflow-auto md:p-5">
      <h2 className="flex-none truncate text-display-xs font-semibold">
        {interview.delegate.name}
      </h2>
      <AspectRatio ratio={1} className="relative overflow-hidden rounded-md">
        {interview.imageExists ? (
          <img
            src={`/uploads/${interview.delegate.id}.jpg`}
            sizes="(min-width: 768px) 15.375rem, calc(100vw - 4rem - 2px)"
            alt="Photo"
            className="pointer-events-none absolute inset-0 z-10 h-full w-full object-cover"
          />
        ) : null}
        <FileUpload setFile={setFile} isLoading={imageMutation.isPending} />
      </AspectRatio>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-primary">Council</p>
          <p className="text-secondary">
            <Badge
              text={interview.delegate.council}
              color={councilColors[interview.delegate.council]}
              size="sm"
            />
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-primary">Status</p>
          <p className="text-secondary">
            <UpdateStatus interview={interview} />
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
          <p className="text-sm font-medium text-primary">University ID</p>
          <p className="text-secondary">
            {interview.delegate.universityId || (
              <span className="text-disabled">Not specified</span>
            )}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-primary">Date</p>
          <p className="text-secondary">
            {dayjs(interview.date).format("MMM D, hh:mm A")}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-primary">Grade</p>
          <p className={getGradeColor(interview.grade, "text-disabled")}>
            {interview.grade || "Not graded"}
          </p>
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="text-sm font-medium text-primary">Interviewed by</p>
          <p className="flex items-center gap-1.5 text-secondary">
            {interview.user ? (
              <>
                <Avatar.Root className="size-6 leading-none">
                  <Avatar.Image
                    className="rounded-full"
                    alt="Profile picture"
                    width={24}
                    height={24}
                    src={`/uploads/${interview.user?.id}.jpg`}
                  />
                  <Avatar.Fallback>
                    <div className="size-6 rounded-full bg-utility-gray-300" />
                  </Avatar.Fallback>
                </Avatar.Root>
                {interview.user?.firstName} {interview.user?.lastName}
              </>
            ) : (
              <span className="text-disabled">Not interviewed yet</span>
            )}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-primary">Faculty</p>
          <p className="text-secondary">
            {faculties[interview.delegate.faculty] || (
              <span className="text-disabled">Not specified</span>
            )}
          </p>
        </div>
      </div>
    </main>
  );
}
