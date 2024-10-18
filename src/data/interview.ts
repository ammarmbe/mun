import prisma from "@/utils/db";
import { $Enums } from "@prisma/client";

export async function getInterviewById({
  id,
  council,
}: {
  id: string;
  council?: $Enums.Council | null;
}) {
  const interview = await prisma.interview.findFirst({
    where: {
      id,
      delegate: {
        council,
      },
    },
    select: {
      id: true,
      date: true,
      grade: true,
      notes: true,
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
          universityId: true,
          phoneNumber: true,
          faculty: true,
        },
      },
    },
  });

  const questionCount = await prisma.question.count({
    where: {
      council,
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
  });

  return interview
    ? {
        ...interview,
        _count: {
          ...interview._count,
          questions: questionCount,
        },
      }
    : null;
}

export async function getInterviewQuestions({
  id,
  council,
}: {
  id: string;
  council?: $Enums.Council | null;
}) {
  const questions = await prisma.question.findMany({
    where: {
      council,
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
    select: {
      id: true,
      value: true,
      answers: {
        where: {
          interviewId: id,
        },
        select: {
          answer: true,
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  const interview = await prisma.interview.findFirst({
    where: {
      id,
      delegate: {
        council,
      },
    },
    select: {
      grade: true,
      delegate: {
        select: {
          universityId: true,
        },
      },
      notes: true,
    },
  });

  return {
    questions,
    grade: interview?.grade,
    universityId: interview?.delegate.universityId,
    notes: interview?.notes,
  };
}
