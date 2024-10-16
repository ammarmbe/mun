import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="m-4 flex flex-col gap-5 rounded-2xl border p-4 shadow-xs md:m-1 md:w-72 md:p-5">
      {children}
    </main>
  );
}
