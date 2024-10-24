import React, { useEffect, useState } from "react";
import { $Enums } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import Toast from "@/components/toast";
import InputWrapper from "@/components/input-wrapper";
import { Check, ChevronsUpDown, Pencil } from "lucide-react";
import { inputStyles } from "@/utils/styles/input";
import type { getInterviewById } from "@/data/interview";
import buttonStyles from "@/utils/styles/button";
import Spinner from "@/components/spinner";

export default function UpdateStatus({
  interview,
}: {
  interview: NonNullable<Awaited<ReturnType<typeof getInterviewById>>>;
}) {
  const [editing, setEditing] = useState(false);

  const [status, setStatus] = useState<$Enums.DelegateStatus>(
    interview.delegate.status,
  );

  const statusMutation = useMutation({
    mutationFn: async (status: $Enums.DelegateStatus) => {
      const res = await fetch(`/api/interview/${interview.id}/status`, {
        method: "PATCH",
        body: JSON.stringify({
          delegateId: interview.delegate.id,
          status,
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
          message="We couldn't update the status. Please try again."
        />
      ));

      setEditing(false);
      setStatus(interview.delegate.status);
    },
    onSuccess: async () => {
      toast.custom((t) => (
        <Toast
          variant="success"
          title="Status updated"
          t={t}
          message="The delegate's status has been saved successfully."
        />
      ));

      setEditing(false);
    },
  });

  useEffect(() => {
    setStatus(interview.delegate.status);
  }, [interview.delegate.status]);

  return (
    <div className="flex w-full items-center justify-between">
      {!editing ? (
        <div className="flex items-center gap-2">
          {status === "ACCEPTED" ? (
            <>
              <div className="size-2 rounded-full bg-success-600" />
              <span>Accepted</span>
            </>
          ) : status === "REJECTED" ? (
            <>
              <div className="size-2 rounded-full bg-error-600" />
              <span>Rejected</span>
            </>
          ) : (
            <>
              <div className="size-2 rounded-full bg-gray-600" />
              <span>Pending</span>
            </>
          )}
        </div>
      ) : (
        <InputWrapper
          side="left"
          size="xs"
          IconPrimitive={
            <div
              className={`size-2 rounded-full ${status === "ACCEPTED" ? "bg-success-600" : status === "REJECTED" ? "bg-error-600" : "bg-gray-600"}`}
            />
          }
        >
          <InputWrapper side="right" size="xs" Icon={ChevronsUpDown}>
            <select
              name="status"
              id={`status-${interview.id}`}
              className={inputStyles(
                {
                  variant: "primary",
                  size: "xs",
                },
                "!pl-[2rem] !pr-[2.5rem] text-sm",
              )}
              onClick={(e) => {
                e.stopPropagation();
              }}
              onMouseEnter={(e) => {
                e.currentTarget.parentElement?.parentElement?.parentElement?.parentElement?.classList.remove(
                  "hover",
                );
              }}
              onMouseLeave={(e) => {
                e.currentTarget.parentElement?.parentElement?.parentElement?.parentElement?.classList.add(
                  "hover",
                );
              }}
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as $Enums.DelegateStatus)
              }
              disabled={statusMutation.isPending}
            >
              <option value="PENDING">Pending</option>
              <option value="ACCEPTED">Accepted</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </InputWrapper>
        </InputWrapper>
      )}
      <button
        className={buttonStyles({
          size: "md",
          variant: "secondary",
          symmetrical: true,
        })}
        onClick={() => {
          if (editing) {
            statusMutation.mutate(status);
          } else {
            setEditing(true);
          }
        }}
        disabled={statusMutation.isPending}
      >
        {statusMutation.isPending ? (
          <Spinner size={16} />
        ) : editing ? (
          <Check size={16} />
        ) : (
          <Pencil size={16} />
        )}
      </button>
    </div>
  );
}
