import Image from "next/image";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[100dvh] flex-grow justify-center bg-secondary md:py-24">
      <div className="flex h-fit min-h-[100dvh] w-full flex-col items-center bg-primary px-10 py-8 shadow-sm md:min-h-0 md:w-auto md:rounded-2xl md:border">
        <Image priority src="/logo.png" height={48} width={48} alt="Logo" />
        <h1 className="mt-6 text-display-xs font-semibold">Interview form</h1>
        {children}
      </div>
    </div>
  );
}
