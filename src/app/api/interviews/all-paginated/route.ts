import { getAllPaginatedInterviews } from "@/data/interviews";
import { getUser } from "@/utils/auth";
import prisma from "@/utils/db";
import { $Enums } from "@prisma/client";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const search = searchParams.get("search");
  let sortingId = searchParams.get("sorting_id");
  const sortingDirection = searchParams.get("sorting_direction");
  const lastDate = searchParams.get("last_date");
  let council = searchParams.get("council") as $Enums.Council | null;

  const { user } = await getUser();

  if (!user) {
    return new Response(null, { status: 401 });
  }

  const canAccess = await prisma.setting.findUnique({
    where: {
      id: "allowCrossCouncil",
    },
  });

  if (
    ![
      "delegate.name",
      "delegate.council",
      "delegate.status",
      "date",
      "grade",
      "answers",
    ].includes(sortingId ?? "")
  ) {
    sortingId = null;
  }

  let orderBy;

  if (sortingId?.startsWith("delegate")) {
    orderBy = {
      delegate: {
        [sortingId!.split(".")[1]]: sortingDirection === "asc" ? "asc" : "desc",
      },
    } as const;
  } else if (sortingId === "answers") {
    orderBy = {
      answers: {
        _count: sortingDirection === "asc" ? "asc" : "desc",
      },
    } as const;
  } else {
    orderBy = {
      [sortingId ?? "date"]: sortingDirection === "asc" ? "asc" : "desc",
    } as const;
  }

  if (!Object.keys($Enums.Council).includes(council ?? "")) {
    council = null;
  }

  const interviews = await getAllPaginatedInterviews({
    council:
      canAccess?.value === "TRUE" || user.admin
        ? (council ?? undefined)
        : (user.council ?? undefined),
    lastDate: lastDate ? new Date(lastDate) : undefined,
    search: search || undefined,
    orderBy: orderBy as any,
  });

  return new Response(JSON.stringify(interviews));
}
