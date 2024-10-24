import { ChevronsUpDown } from "lucide-react";
import { inputStyles } from "@/utils/styles/input";
import InputWrapper from "@/components/input-wrapper";
import { queryFunctions } from "@/utils/react-query";
import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import Toast from "@/components/toast";
import { $Enums } from "@prisma/client";

export default function UpdateStatus({
  interview,
}: {
  interview: NonNullable<
    Awaited<ReturnType<ReturnType<typeof queryFunctions.interviews.all>>>
  >["interviews"][number];
}) {
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
    onMutate: (status) => {
      setStatus(status);
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
    },
  });

  useEffect(() => {
    setStatus(interview.delegate.status);
  }, [interview.delegate.status]);

  return (
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
            statusMutation.mutate(e.target.value as $Enums.DelegateStatus)
          }
          disabled={statusMutation.isPending}
        >
          <option value="PENDING">Pending</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </InputWrapper>
    </InputWrapper>
  );
}
