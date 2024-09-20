import prisma from "@/utils/db";
import { $Enums } from "@prisma/client";

export async function getInterviewById({
  id,
  council,
}: {
  id: string;
  council: $Enums.Council;
}) {
  return prisma.interview.findFirst({
    where: {
      id,
      delegate: {
        council,
      },
    },
    select: {
      id: true,
      date: true,
      status: true,
      grade: true,
      notes: true,
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
          faculty: true,
        },
      },
    },
  });
}

export async function getInterviewQuestions({
  id,
  council,
}: {
  id: string;
  council: $Enums.Council;
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
      notes: true,
    },
  });

  return {
    questions,
    grade: interview?.grade,
    notes: interview?.notes,
  };
}
