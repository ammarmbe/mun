"use client";

import { usePathname } from "next/navigation";
import React from "react";

export default function SidebarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (
    pathname === "/login" ||
    pathname === "/form" ||
    pathname === "/success"
  ) {
    return null;
  }

  return children;
}
