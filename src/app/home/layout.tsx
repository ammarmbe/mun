import { getUser } from "@/utils/auth/user";
import React from "react";

export default async function Layout({
  today,
  tomorrow,
  completed,
}: {
  today: React.ReactNode;
  tomorrow: React.ReactNode;
  completed: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <main className="flex flex-grow flex-col gap-8 px-4 py-8 md:px-8">
      <h1 className="text-display-xs font-semibold md:text-display-sm">
        Hello, {user?.firstName}
      </h1>
      <div className="grid flex-grow grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {today}
        {tomorrow}
        {completed}
      </div>
    </main>
  );
}
