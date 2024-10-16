import { ReactNode } from "react";
import Links from "@/app/settings/links";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-grow flex-col">
      <h1 className="p-6 text-display-xs font-semibold md:text-display-sm">
        Settings
      </h1>
      <div className="flex flex-grow grid-cols-3 gap-4 p-4 pt-0 md:grid md:grid-cols-2 md:pl-3 xl:grid-cols-3">
        <div className="col-span-2 flex flex-grow flex-col rounded-2xl border bg-secondary-subtle">
          <Links />
          {children}
        </div>
      </div>
    </main>
  );
}
