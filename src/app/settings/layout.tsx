import { ReactNode } from "react";
import Links from "@/app/settings/links";
import { getUser } from "@/utils/auth";

export default async function Layout({ children }: { children: ReactNode }) {
  const { user } = await getUser();

  return (
    <main className="flex flex-grow flex-col">
      <div className="flex min-h-[5.625rem] items-center p-6">
        <h1 className="text-display-xs font-semibold md:text-display-sm">
          Settings
        </h1>
      </div>
      <div className="flex flex-grow grid-cols-3 gap-4 p-4 pt-0 md:grid md:grid-cols-2 md:pl-3 xl:grid-cols-3">
        <div className="col-span-2 flex flex-grow flex-col rounded-2xl border bg-tertiary dark:bg-secondary-subtle">
          <Links user={user!} />
          {children}
        </div>
      </div>
    </main>
  );
}
