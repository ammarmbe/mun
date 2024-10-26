"use client";

import useMediaQuery from "@mui/material/useMediaQuery";
import Table from "./table";
import Spinner from "@/components/spinner";
import Mobile from "./mobile";
import { use } from "react";
import { $Enums } from "@prisma/client";

export default function Interviews({
  params,
}: {
  params: Promise<{ council: string }>;
}) {
  let council: string | undefined = use(params).council;

  council = Object.keys($Enums.Council).includes(council) ? council : undefined;

  const isDesktop = useMediaQuery("(min-width: 768px)");

  return typeof "window" === undefined ? (
    <div className="flex flex-grow items-center justify-center">
      <Spinner size={24} />
    </div>
  ) : isDesktop === true ? (
    <Table council={council} />
  ) : (
    <Mobile council={council} />
  );
}
