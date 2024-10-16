import prisma from "@/utils/db";
import { $Enums } from "@prisma/client";
import dayjs from "dayjs";

export async function getTodaysInterviews({
  council,
  upcoming,
}: {
  council?: $Enums.Council;
  upcoming?: boolean;
}) {
  const interviews = await prisma.interview.findMany({
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
      grade: true,
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
      _count: {
        select: {
          answers: true,
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
    orderBy: {
      date: "asc",
    },
  });

  const questionCount = await prisma.question.count({
    where: {
      council,
    },
  });

  return interviews.map((interview) => ({
    ...interview,
    _count: {
      ...interview._count,
      questions: questionCount,
    },
  }));
}

export async function getTomorrowsInterviews({
  council,
}: {
  council?: $Enums.Council;
}) {
  const interviews = await prisma.interview.findMany({
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
      grade: true,
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
      _count: {
        select: {
          answers: true,
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
    orderBy: {
      date: "asc",
    },
  });

  const questionCount = await prisma.question.count({
    where: {
      council,
    },
  });

  return interviews.map((interview) => ({
    ...interview,
    _count: {
      ...interview._count,
      questions: questionCount,
    },
  }));
}

export async function getAllInterviews({
  council,
  pageIndex,
  pageSize,
}: {
  council?: $Enums.Council;
  pageIndex: number;
  pageSize: number;
}) {
  const interviews = await prisma.interview.findMany({
    where: {
      delegate: {
        council,
      },
    },
    select: {
      id: true,
      date: true,
      grade: true,
      _count: {
        select: {
          answers: true,
        },
      },
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
    orderBy: { date: "desc" },
    skip: pageIndex * pageSize,
    take: pageSize,
  });

  const questionCount = await prisma.question.count({
    where: {
      council,
    },
  });

  return {
    interviews: interviews.map((interview) => ({
      ...interview,
      _count: {
        ...interview._count,
        questions: questionCount,
      },
    })),
    rowCount: await prisma.interview.count({
      where: {
        delegate: {
          council,
        },
      },
    }),
  };
}
