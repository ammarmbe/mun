import React from "react";

export default async function Layout({
  info,
  questions,
}: {
  info: React.ReactNode;
  questions: React.ReactNode;
}) {
  return (
    <main className="flex flex-grow flex-col-reverse md:flex-row">
      {questions}
      {info}
    </main>
  );
}
