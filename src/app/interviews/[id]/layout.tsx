import React, { Suspense } from "react";
import Loading from "@/app/interviews/[id]/@questions/loading";

export default async function Layout({
  info,
  questions,
}: {
  info: React.ReactNode;
  questions: React.ReactNode;
}) {
  return (
    <main className="flex flex-grow flex-col-reverse md:flex-row">
      <Suspense fallback={<Loading />}>{questions}</Suspense>
      {info}
    </main>
  );
}
