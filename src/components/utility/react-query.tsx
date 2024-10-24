"use client";

import { getQueryClient } from "@/utils/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode } from "react";

export default function ReactQueryProvider(
  props: Readonly<{
    children: ReactNode;
  }>,
) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
}
