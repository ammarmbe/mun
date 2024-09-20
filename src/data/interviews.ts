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
  return prisma.interview.findMany({
    where: {
      date: {
        gte: upcoming ? dayjs().startOf("day").toDate() : dayjs().toDate(),
        lte: dayjs().endOf("day").toDate(),
      },
      delegate: {
        council,
      },
    },
    select: {
      id: true,
      date: true,
      status: true,
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
      date: "asc",
    },
  });
}

export async function getTomorrowsInterviews({
  council,
}: {
  council: $Enums.Council;
}) {
  return prisma.interview.findMany({
    where: {
      date: {
        gte: dayjs().add(1, "day").startOf("day").toDate(),
        lte: dayjs().add(1, "day").endOf("day").toDate(),
      },
      delegate: {
        council,
      },
    },
    select: {
      id: true,
      date: true,
      status: true,
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
      date: "asc",
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
    orderBy: { date: "desc" ,
  });
}

export async function getMissedInterviews({
                                            council
                                          }: {
  council: $Enums.Council;
}) {
  return prisma.interview.findMany({
    where: {
      status: "MISSED",
      delegate: {
        council
      },
    },
    select: {
      id: true,
      date: true,
      status: true,
      delegate: {
        select: {
          council: true,
          firstName: true,
          lastName: true,
          phoneNumber: true
        },
      },
    },
    orderBy: { date: "desc" }
  });
}

export async function getUpcomingInterviews({
                                              council
                                            }: {
  council: $Enums.Council;
}) {
  return prisma.interview.findMany({
    where: {
      date: {
        gte: dayjs().toDate()
      },
      status: "PENDING",
      delegate: {
        council
      },
    },
    select: {
      id: true,
      date: true,
      status: true,
      delegate: {
        select: {
          council: true,
          firstName: true,
          lastName: true,
          phoneNumber: true
        },
      },
    },
    orderBy: { date: "asc" }
  });
}
