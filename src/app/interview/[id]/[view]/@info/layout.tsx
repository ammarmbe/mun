import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-grow flex-col gap-4 bg-primary p-4 shadow-xs md:m-1 md:max-h-[calc(100dvh-0.5rem)] md:w-72 md:gap-5 md:overflow-auto md:rounded-2xl md:border md:p-5">
      {children}
    </main>
  );
}
