import { AlertCircle, CheckCircle2, X } from "lucide-react";
import buttonStyles from "@/utils/styles/button";
import { toast } from "sonner";

export default function Toast({
  variant,
  title,
  message,
  t,
}: {
  variant: "default" | "success" | "error";
  title: string;
  message?: string;
  t: string | number;
}) {
  return (
    <div className="relative flex w-full gap-3 rounded-xl border border-primary bg-primary-alt p-4 shadow-lg">
      {variant === "success" ? (
        <CheckCircle2 size={32} className="text-success-primary" />
      ) : variant === "error" ? (
        <AlertCircle size={32} className="text-error-primary" />
      ) : null}
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold">{title}</p>
        {message ? (
          <p className="pr-14 text-sm text-secondary">{message}</p>
        ) : null}
      </div>
      <button
        className={buttonStyles(
          {
            variant: "tertiary",
            size: "sm",
            symmetrical: true,
          },
          "absolute right-2 top-2 h-fit bg-primary-alt enabled:active:shadow-focus-ring-alt",
        )}
        onClick={() => {
          toast.dismiss(t);
        }}
      >
        <X size={20} />
      </button>
    </div>
  );
}
