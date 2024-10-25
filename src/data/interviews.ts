import prisma from "@/utils/db";
import { $Enums } from "@prisma/client";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export async function getTodaysInterviews({
  council,
}: {
  council?: $Enums.Council;
}) {
  const interviews = await prisma.interview.findMany({
    where: {
      date: {
        gte: dayjs().tz("Africa/Cairo").startOf("day").toDate(),
        lte: dayjs().tz("Africa/Cairo").endOf("day").toDate(),
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
          id: true,
          status: true,
          council: true,
          name: true,
          phoneNumber: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  const questions = await prisma.question.findMany({
    where: {
      OR: [
        {
          deletedAt: null,
        },
        {
          answers: {
            some: {},
          },
        },
      ],
    },
    select: { council: true },
  });

  return interviews.map((interview) => ({
    ...interview,
    _count: {
      ...interview._count,
      questions: questions.filter(
        (q) => q.council === interview.delegate.council,
      ).length,
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
        gte: dayjs().tz("Africa/Cairo").add(1, "day").startOf("day").toDate(),
        lte: dayjs().tz("Africa/Cairo").add(1, "day").endOf("day").toDate(),
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
          id: true,
          status: true,
          council: true,
          name: true,
          phoneNumber: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  const questions = await prisma.question.findMany({
    where: {
      OR: [
        {
          deletedAt: null,
        },
        {
          answers: {
            some: {},
          },
        },
      ],
    },
    select: { council: true },
  });

  return interviews.map((interview) => ({
    ...interview,
    _count: {
      ...interview._count,
      questions: questions.filter(
        (q) => q.council === interview.delegate.council,
      ).length,
    },
  }));
}

export async function getAllInterviews({
  council,
  pageIndex,
  pageSize,
  search,
  orderBy,
}: {
  council?: $Enums.Council;
  pageIndex: number;
  pageSize: number;
  search?: string;
  orderBy:
    | { delegate: { [p: string]: "asc" | "desc" } }
    | { answers: { _count: "asc" | "desc" } }
    | { [p: string]: "asc" | "desc" };
}) {
  const councils = Object.keys($Enums.Council);

  const councilSearch = search
    ? councils.filter((council) =>
        council.toLowerCase().includes(search.toLowerCase()),
      )
    : null;

  const constraints: {
    delegate: {
      council?: $Enums.Council;
      name?: {
        contains: string;
        mode: "insensitive";
      };
    };
  }[] = [];

  if (council) {
    constraints.push({
      delegate: {
        council,
      },
    });
  } else if (councilSearch?.length) {
    councilSearch.forEach((council) => {
      constraints.push({
        delegate: {
          council: council as $Enums.Council,
        },
      });
    });
  }

  const interviews = await prisma.interview.findMany({
    where: {
      OR: constraints.length ? constraints : undefined,
      delegate: search
        ? {
            name: {
              contains: search,
              mode: "insensitive",
            },
          }
        : undefined,
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
          id: true,
          status: true,
          council: true,
          name: true,
          phoneNumber: true,
        },
      },
    },
    orderBy,
    skip: pageIndex * pageSize,
    take: pageSize,
  });

  const questions = await prisma.question.findMany({
    where: {
      OR: [
        {
          deletedAt: null,
        },
        {
          answers: {
            some: {},
          },
        },
      ],
    },
    select: { council: true },
  });

  return {
    interviews: interviews.map((interview) => ({
      ...interview,
      _count: {
        ...interview._count,
        questions: questions.filter(
          (q) => q.council === interview.delegate.council,
        ).length,
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

export async function getAllPaginatedInterviews({
  council,
  search,
  pageIndex,
  pageSize,
  orderBy,
}: {
  council?: $Enums.Council;
  search?: string;
  pageIndex: number;
  pageSize: number;
  orderBy:
    | { delegate: { [p: string]: "asc" | "desc" } }
    | { answers: { _count: "asc" | "desc" } }
    | { [p: string]: "asc" | "desc" };
}) {
  const councils = Object.keys($Enums.Council);

  const councilSearch = search
    ? councils.filter((council) =>
        council.toLowerCase().includes(search.toLowerCase()),
      )
    : null;

  const constraints: {
    delegate: {
      council?: $Enums.Council;
      name?: {
        contains: string;
        mode: "insensitive";
      };
    };
  }[] = [];

  if (council) {
    constraints.push({
      delegate: {
        council,
      },
    });
  } else if (councilSearch?.length) {
    councilSearch.forEach((council) => {
      constraints.push({
        delegate: {
          council: council as $Enums.Council,
        },
      });
    });
  }

  const interviews = await prisma.interview.findMany({
    where: {
      OR: constraints.length ? constraints : undefined,
      delegate: search
        ? {
            name: {
              contains: search,
              mode: "insensitive",
            },
          }
        : undefined,
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
          id: true,
          status: true,
          council: true,
          name: true,
          phoneNumber: true,
        },
      },
    },
    orderBy,
    skip: pageIndex * pageSize,
    take: pageSize,
  });

  const questions = await prisma.question.findMany({
    where: {
      OR: [
        {
          deletedAt: null,
        },
        {
          answers: {
            some: {},
          },
        },
      ],
    },
    select: { council: true },
  });

  return interviews.map((interview) => ({
    ...interview,
    _count: {
      ...interview._count,
      questions: questions.filter(
        (q) => q.council === interview.delegate.council,
      ).length,
    },
  }));
}
