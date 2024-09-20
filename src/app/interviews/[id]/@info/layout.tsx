import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col gap-8 border-b px-4 py-8 md:w-72 md:border-b-0 md:border-l md:px-8">
      {children}
    </main>
  );
}
