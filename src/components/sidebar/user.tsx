import buttonStyles from "@/utils/styles/button";
import { LogOut } from "lucide-react";
import React from "react";
import * as Avatar from "@radix-ui/react-avatar";
import logoutAction from "./logout-action";
import Skeleton from "react-loading-skeleton";
import type { User } from "@prisma/client";

export default function User({ user }: { user: User | null | undefined }) {
  return (
    <form
      action={logoutAction}
      className="m-4 flex gap-2 rounded-xl border p-1.5 shadow-xs"
    >
      <div className="flex min-w-0 flex-grow items-center gap-2 p-1.5">
        <Avatar.Root className="size-10 leading-none">
          <Avatar.Image
            className="rounded-full"
            alt="Profile picture"
            width={40}
            height={40}
            src={`/uploads/${user?.id}.jpg`}
          />
          <Avatar.Fallback>
            <div className="size-10 rounded-full bg-utility-gray-300" />
          </Avatar.Fallback>
        </Avatar.Root>
        <div className="flex min-w-0 flex-grow flex-col">
          <p className="truncate text-sm font-semibold text-secondary">
            {user?.firstName} {user?.lastName ?? <Skeleton className="!w-32" />}
          </p>
          <p className="text-sm font-medium text-tertiary">
            {user?.admin
              ? "Admin"
              : (user?.council ?? <Skeleton className="!w-16" />)}
          </p>
        </div>
      </div>
      <button
        className={buttonStyles(
          {
            variant: "tertiary",
            size: "sm",
            symmetrical: true,
          },
          "h-fit flex-none",
        )}
        type="submit"
      >
        <LogOut size={20} />
      </button>
    </form>
  );
}
