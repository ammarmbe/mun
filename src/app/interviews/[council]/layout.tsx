import { ReactNode } from "react";
import Search from "@/components/search";
import { $Enums } from "@prisma/client";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ council: string }>;
}) {
  let council: string | undefined = (await params).council;

  council = Object.keys($Enums.Council).includes(council) ? council : undefined;

  return (
    <main className="flex flex-grow flex-col">
      <div className="flex min-h-[5.625rem] flex-none flex-wrap items-center justify-between gap-y-3 p-4 md:p-6">
        <h1 className="text-display-xs font-semibold md:text-display-sm">
          <span className={!council ? "capitalize" : "uppercase"}>
            {council ?? "All"}
          </span>{" "}
          Interviews
        </h1>
        <Search
          value="query"
          placeholder="Search by name or council..."
          className="w-full md:w-auto md:min-w-80"
        />
      </div>
      {/* <Suspense
        fallback={
          <div className="flex flex-grow items-center justify-center">
            <Spinner size={24} />
          </div>
        }
      > */}
      {children}
      {/* </Suspense> */}
    </main>
  );
}
