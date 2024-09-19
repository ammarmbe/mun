"use client";

import buttonStyles from "@/utils/styles/button";
import {
  CalendarClock,
  CalendarOff,
  CalendarX,
  EllipsisVertical,
  Play,
} from "lucide-react";
import { getTodaysInterviews } from "@/data/interviews";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Dropdown from "@/components/dropdown";
import Link from "next/link";
import Status from "@/components/upcoming-card/status";
import { useState } from "react";

export default function Options({
  interview,
}: {
  interview: Awaited<ReturnType<typeof getTodaysInterviews>>[0];
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dropdown
      open={open}
      onOpenChange={setOpen}
      trigger={
        <button
          className={buttonStyles(
            {
              size: "sm",
              variant: "tertiary",
              symmetrical: true,
            },
            "h-fit",
          )}
        >
          <EllipsisVertical size={20} />
        </button>
      }
    >
      <DropdownMenu.Item asChild>
        <Link
          href={`/interview/${interview.id}`}
          className={buttonStyles({
            variant: "dropdown",
            size: "sm",
          })}
        >
          <Play size={16} className="text-tertiary" /> Start
        </Link>
      </DropdownMenu.Item>
      <Status
        interview={interview}
        dropdown
        status={interview.status === "CANCELLED" ? "PENDING" : "CANCELLED"}
        icon={
          interview.status === "CANCELLED" ? (
            <CalendarClock size={16} className="text-tertiary" />
          ) : (
            <CalendarOff size={16} className="text-tertiary" />
          )
        }
        setOpen={setOpen}
      />
      <Status
        interview={interview}
        dropdown
        status={interview.status === "MISSED" ? "PENDING" : "MISSED"}
        icon={
          interview.status === "MISSED" ? (
            <CalendarClock size={16} className="text-tertiary" />
          ) : (
            <CalendarX size={16} className="text-tertiary" />
          )
        }
        setOpen={setOpen}
      />
    </Dropdown>
  );
}
