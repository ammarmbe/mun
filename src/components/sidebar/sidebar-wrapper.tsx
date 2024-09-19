"use client";

import { usePathname } from "next/navigation";

export default function SidebarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === "/login") {
    return null;
  }

  return children;
}
