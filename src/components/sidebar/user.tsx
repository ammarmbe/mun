import { getUser } from "@/utils/auth/user";
import buttonStyles from "@/utils/styles/button";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { deleteSession } from "@/utils/auth/session";

export default async function User() {
  const user = await getUser();

  return (
    <div className="mb-6 mt-5 flex flex-col md:mb-8 md:mt-6">
      <div className="mx-2 border-t md:mx-4" />
      <form
        action={async () => {
          "use server";

          deleteSession();
        }}
        className="mt-6 flex items-center gap-3 px-4"
      >
        <Image
          src="/logo.png"
          alt="Profile picture"
          className="rounded-full"
          height={40}
          width={40}
        />
        <div className="flex min-w-0 flex-grow flex-col">
          <p className="truncate text-sm font-semibold text-secondary">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-sm font-medium text-tertiary">{user?.council}</p>
        </div>
        <button
          className={buttonStyles({
            variant: "tertiary",
            size: "sm",
            symmetrical: true,
          })}
          type="submit"
        >
          <LogOut size={20} />
        </button>
      </form>
    </div>
  );
}
