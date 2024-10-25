"use client";

import { usePathname } from "next/navigation";

export default function SafeArea() {
  const pathname = usePathname();

  return (
    <div
      className={`sticky bottom-0 h-[env(safe-area-inset-bottom,20px)] md:hidden ${pathname.startsWith("/interview/") ? "bg-primary" : "bg-secondary"}`}
    />
  );
}
