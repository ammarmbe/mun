import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-grow flex-col">
      <h1 className="p-6 text-display-xs font-semibold md:text-display-sm">
        All Interviews
      </h1>
      {children}
    </main>
  );
}
