"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryFunctions, queryKeys } from "@/utils/react-query";
import Loading from "@/app/interview/[id]/[view]/@info/loading";
import React, { use, useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  councilColors,
  faculties,
  getGradeColor,
  useUploadThing,
} from "@/utils";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { notFound } from "next/navigation";
import FileUpload from "./file-upload";
import { toast } from "sonner";
import Toast from "@/components/toast";
import Badge from "@/components/badge";
import * as Avatar from "@radix-ui/react-avatar";
import UpdateStatus from "@/app/interview/[id]/[view]/@info/update-status";
import buttonStyles from "@/utils/styles/button";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { Trash2 } from "lucide-react";
import Spinner from "@/components/spinner";

export default function Page(props: {
  params: Promise<{ id: string; view: string }>;
}) {
  const queryClient = useQueryClient();
  const params = use(props.params);

  const { startUpload, isUploading } = useUploadThing("upload", {
    onClientUploadComplete: async () => {
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
    onUploadError: () => {
      toast.custom((t) => (
        <Toast
          variant="error"
          title="An error occurred"
          t={t}
          message="We couldn't save the image. Please try again."
        />
      ));
    },
  });

  const [file, setFile] = useState<File>();

  const { data: interview, isLoading } = useQuery({
    queryKey: queryKeys.interview.id({ id: params.id }),
    queryFn: queryFunctions.interview.id({ id: params.id }),
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/interview/${interview?.id}/image`, {
        method: "DELETE",
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
          message="We couldn't delete the image. Please try again."
        />
      ));
    },
    onSuccess: async (_) => {
      toast.custom((t) => (
        <Toast
          variant="success"
          title="Image deleted"
          t={t}
          message="The delegate's image has been deleted successfully."
        />
      ));

      queryClient.setQueryData(
        queryKeys.interview.id({ id: params.id }),
        (oldData: typeof interview) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            delegate: {
              ...oldData.delegate,
              imageUrl: null,
            },
          };
        },
      );
    },
  });

  useEffect(() => {
    if (file && interview?.delegate.id) {
      startUpload([file], { delegateId: interview.delegate.id });
    }
  }, [file]);

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

  if (interview === null) return notFound();

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="flex-none truncate text-display-xs font-semibold">
          {interview.delegate.name}
        </h2>
        <Link
          href={`/interview/${params.id}/questions`}
          className={buttonStyles(
            {
              variant: "secondary",
              size: "sm",
            },
            "md:hidden",
          )}
        >
          <span>{interview.user ? "View answers" : "Start interview"}</span>
        </Link>
      </div>
      <AspectRatio ratio={1} className="relative overflow-hidden rounded-md">
        {interview.delegate.imageUrl ? (
          <>
            <Avatar.Root>
              <Avatar.Image
                src={`https://utfs.io/f/${interview.delegate.imageUrl}`}
                sizes="(min-width: 768px) 15.375rem, calc(100vw - 4rem - 2px)"
                alt="Photo"
                className="h-full w-full object-cover"
              />
              <Avatar.Fallback>
                <Skeleton className="!h-full !w-full !rounded-md" />
                <span className="block h-full w-full rounded-md bg-utility-gray-300" />
              </Avatar.Fallback>
            </Avatar.Root>
            <button
              className={buttonStyles(
                {
                  size: "sm",
                  variant: "secondary",
                  symmetrical: true,
                },
                "absolute right-2 top-2 z-10 rounded-sm active:!shadow-xs-skeuomorphic",
              )}
              onClick={() => deleteMutation.mutate()}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? (
                <Spinner size={16} />
              ) : (
                <Trash2 size={16} />
              )}
            </button>
          </>
        ) : (
          <FileUpload setFile={setFile} isLoading={isUploading} />
        )}
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
          <div className="text-secondary">
            <UpdateStatus interview={interview} />
          </div>
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
                    src={
                      interview.user
                        ? `/uploads/${interview.user.id}.jpg`
                        : undefined
                    }
                  />
                  <Avatar.Fallback>
                    <span className="block size-6 rounded-full bg-utility-gray-300" />
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
    </>
  );
}
