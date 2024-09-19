import prisma from "@/utils/db";
import { $Enums } from "@prisma/client";
import dayjs from "dayjs";

export async function getTodaysInterviews({
  council,
  upcoming,
}: {
  council: $Enums.Council;
  upcoming?: boolean;
}) {
  return (
    await prisma.interview.findMany({
      where: {
        date: dayjs().format("YYYY-MM-DD"),
        delegate: {
          council,
        },
      },
      select: {
        id: true,
        date: true,
        status: true,
        time: true,
        delegate: {
          select: {
            council: true,
            firstName: true,
            lastName: true,
            phoneNumber: true,
          },
        },
      },
      orderBy: {
        time: "asc",
      },
    })
  ).filter((interview) => {
    if (upcoming) {
      return dayjs(`${interview.date} ${interview.time}`).isAfter(dayjs());
    }

    return true;
  });
}

export async function getTomorrowsInterviews({
  council,
}: {
  council: $Enums.Council;
}) {
  return prisma.interview.findMany({
    where: {
      date: dayjs().add(1, "day").format("YYYY-MM-DD"),
      delegate: {
        council,
      },
    },
    select: {
      id: true,
      date: true,
      status: true,
      time: true,
      delegate: {
        select: {
          council: true,
          firstName: true,
          lastName: true,
          phoneNumber: true,
        },
      },
    },
    orderBy: {
      time: "asc",
    },
  });
}

export async function getCompletedInterviews({
  council,
}: {
  council: $Enums.Council;
}) {
  return prisma.interview.findMany({
    where: {
      status: "COMPLETED",
      delegate: {
        council,
      },
    },
    select: {
      id: true,
      date: true,
      time: true,
      grade: true,
      status: true,
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
      delegate: {
        select: {
          council: true,
          firstName: true,
          lastName: true,
          phoneNumber: true,
        },
      },
    },
    orderBy: [{ date: "desc" }, { time: "desc" }],
  });
}
