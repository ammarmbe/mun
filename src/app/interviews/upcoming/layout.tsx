import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-grow flex-col gap-8 px-4 py-8 md:px-8">
      <h1 className="text-display-xs font-semibold md:text-display-sm">
        Upcoming Interviews
      </h1>
      {children}
    </main>
  );
}
