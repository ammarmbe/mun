"use client";

import buttonStyles from "@/utils/styles/button";
import {
  CalendarClock,
  CalendarOff,
  CalendarX,
  CheckCircle2,
  EllipsisVertical,
  Play,
} from "lucide-react";
import { getTodaysInterviews } from "@/data/interviews";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Dropdown from "@/components/dropdown";
import Link from "next/link";
import Status from "@/components/cards/upcoming-card/status";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Options({
  interview,
}: {
  interview: Awaited<ReturnType<typeof getTodaysInterviews>>[0];
}) {
  const pathname = usePathname();

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
      {!pathname.includes(interview.id) ? (
        <DropdownMenu.Item asChild>
          <Link
            href={`/interviews/${interview.id}`}
            className={buttonStyles({
              variant: "dropdown",
              size: "sm",
            })}
          >
            <Play size={16} className="text-tertiary" /> Start
          </Link>
        </DropdownMenu.Item>
      ) : null}
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
      <Status
        interview={interview}
        dropdown
        status={interview.status === "COMPLETED" ? "PENDING" : "COMPLETED"}
        icon={
          interview.status === "COMPLETED" ? (
            <CalendarClock size={16} className="text-tertiary" />
          ) : (
            <CheckCircle2 size={16} className="text-tertiary" />
          )
        }
        setOpen={setOpen}
      />
    </Dropdown>
  );
}
