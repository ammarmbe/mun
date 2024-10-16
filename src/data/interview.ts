import prisma from "@/utils/db";
import { $Enums } from "@prisma/client";

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
  council?: $Enums.Council;
}) {
  const questions = await prisma.question.findMany({
    where: {
      council,
    },
    select: {
      id: true,
      question: true,
      answers: {
        where: {
          interviewId: id,
        },
        select: {
          answer: true,
        },
      },
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
