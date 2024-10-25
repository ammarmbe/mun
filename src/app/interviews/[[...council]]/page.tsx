"use client";

import { use } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Table from "./table";
import Spinner from "@/components/spinner";
import Mobile from "./mobile";

export default function Page({
  params,
}: {
  params: Promise<{ council: string[] | undefined }>;
}) {
  const council = use(params).council?.[0];
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return typeof "window" === undefined ? (
    <div className="flex flex-grow items-center justify-center">
      <Spinner size={24} />
    </div>
  ) : isDesktop ? (
    <Table council={council} />
  ) : (
    <Mobile council={council} />
  );
}
