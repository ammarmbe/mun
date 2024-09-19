import Image from "next/image";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-grow justify-center bg-secondary py-24">
      <div className="flex h-fit flex-col items-center rounded-2xl border bg-primary px-10 py-8 shadow-sm">
        <Image priority src="/logo.png" height={48} width={48} alt="Logo" />
        <h1 className="mt-6 text-display-xs font-semibold">Sign in</h1>
        {children}
      </div>
    </div>
  );
}
