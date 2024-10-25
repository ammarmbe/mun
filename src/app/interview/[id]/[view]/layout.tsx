import React, { Suspense } from "react";
import Loading from "@/app/interview/[id]/[view]/@questions/loading";

export default async function Layout({
  info,
  questions,
  params,
}: {
  info: React.ReactNode;
  questions: React.ReactNode;
  params: Promise<{ view: string }>;
}) {
  const { view } = await params;

  return (
    <main className="flex flex-grow flex-col-reverse md:flex-row">
      <div
        className={`flex flex-grow ${view === "questions" ? "" : "hidden md:flex"}`}
      >
        <Suspense fallback={<Loading />}>{questions}</Suspense>
      </div>
      <div
        className={`flex flex-grow md:flex-grow-0 ${view === "questions" ? "hidden md:flex" : ""}`}
      >
        {info}
      </div>
    </main>
  );
}
