import { getUser } from "@/utils/auth";
import React from "react";

export default async function Layout({
  today,
  tomorrow,
}: {
  today: React.ReactNode;
  tomorrow: React.ReactNode;
}) {
  const { user } = await getUser();

  return (
    <main className="flex flex-grow flex-col">
      <div className="flex min-h-[5.625rem] items-center p-6">
        <h1 className="text-display-xs font-semibold md:text-display-sm">
          Hello, {user?.firstName}
        </h1>
      </div>
      <div className="grid flex-grow grid-cols-1 gap-4 p-4 pt-0 md:grid-cols-2 md:pl-3 xl:grid-cols-3">
        {today}
        {tomorrow}
      </div>
    </main>
  );
}
