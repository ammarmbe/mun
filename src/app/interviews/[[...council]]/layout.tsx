import { ReactNode, Suspense } from "react";
import Loading from "@/app/interviews/[[...council]]/loading";
import Search from "@/components/search";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ council: string[] | undefined }>;
}) {
  const council = (await params).council?.[0];

  return (
    <main className="flex flex-grow flex-col">
      <div className="flex min-h-[5.625rem] flex-wrap items-center justify-between gap-y-3 p-6">
        <h1 className="text-display-xs font-semibold md:text-display-sm">
          <span className={council ? "uppercase" : undefined}>
            {council ?? "All"}
          </span>{" "}
          Interviews
        </h1>
        <Search
          value="query"
          placeholder="Search by name or council..."
          className="w-full md:w-auto"
        />
      </div>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </main>
  );
}
