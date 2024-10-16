import {
  deleteSessionTokenCookie,
  getUser,
  invalidateSessions,
} from "@/utils/auth";
import buttonStyles from "@/utils/styles/button";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import * as Avatar from "@radix-ui/react-avatar";

export default async function User() {
  const { user } = await getUser();

  return (
    <form
      action={async () => {
        "use server";

        user && (await invalidateSessions(user?.id));

        await deleteSessionTokenCookie();

        return redirect("/login");
      }}
      className="m-4 flex gap-2 rounded-xl border p-1.5 shadow-xs"
    >
      <div className="flex flex-grow items-center gap-2 p-1.5">
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
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-sm font-medium text-tertiary">{user?.council}</p>
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
