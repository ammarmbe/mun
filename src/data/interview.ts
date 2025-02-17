import prisma from "@/utils/db";
import { $Enums } from "@prisma/client";
import fs from "fs";

export async function getInterviewById({
  id,
  council,
}: {
  id: string;
  council?: $Enums.Council;
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
          id: true,
          name: true,
          status: true,
          council: true,
          imageUrl: true,
          universityId: true,
          phoneNumber: true,
          faculty: true,
        },
      },
    },
  });

  if (!interview) return null;

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

  return {
    ...interview,
    _count: {
      ...interview._count,
      questions: questionCount,
    },
  };
}

export async function getInterviewQuestions({
  id,
  council,
}: {
  id: string;
  council?: $Enums.Council;
}) {
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
          council: true,
        },
      },
      notes: true,
    },
  });

  const questions = await prisma.question.findMany({
    where: {
      council: council ?? interview?.delegate.council,
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

  if (!interview) return null;

  return {
    questions,
    grade: interview?.grade,
    universityId: interview?.delegate.universityId,
    notes: interview?.notes,
  };
}
