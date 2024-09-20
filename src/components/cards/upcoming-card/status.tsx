"use client";

import buttonStyles from "@/utils/styles/button";
import { getTodaysInterviews } from "@/data/interviews";
import { $Enums } from "@prisma/client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useActionState,
  useEffect,
  useState,
} from "react";
import serverAction from "@/components/cards/upcoming-card/status-action";
import { toast } from "sonner";
import Toast from "@/components/toast";
import { useQueryClient } from "@tanstack/react-query";

export default function Status({
  dropdown,
  interview,
  status,
  icon,
  setOpen,
}: {
  dropdown?: boolean;
  interview: Awaited<ReturnType<typeof getTodaysInterviews>>[0];
  status: $Enums.InterviewStatus;
  icon?: ReactNode;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, action, pending] = useActionState(serverAction, undefined);

  const [previousPending, setPreviousPending] = useState(false);

  useEffect(() => {
    if (!pending && previousPending) {
      queryClient
        .invalidateQueries({
          predicate: () => true,
        })
        .then(() =>
          toast.custom((t) => (
            <Toast
              title="Status updated successfully"
              variant="success"
              t={t}
              message={`Status for interview with ${interview.delegate.firstName} has been updated successfully`}
            />
          )),
        );

      setOpen?.(false);
    }

    setPreviousPending(pending);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pending]);

  return (
    <form action={action}>
      <input hidden readOnly name="id" value={interview.id} />
      <input hidden readOnly name="status" value={status} />
      {dropdown ? (
        <button
          className={buttonStyles(
            {
              variant: "dropdown",
              size: "sm",
            },
            "items-center gap-2",
          )}
          type="submit"
          disabled={pending}
        >
          {icon}
          {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
        </button>
      ) : (
        <button
          className={buttonStyles({
            size: "sm",
            variant: "secondary",
          })}
          type="submit"
          disabled={pending}
        >
          <span>
            {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
          </span>
        </button>
      )}
    </form>
  );
}
