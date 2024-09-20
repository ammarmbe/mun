import { getUser } from "@/utils/auth/user";
import { getInterviewQuestions } from "@/data/interview";
import prisma from "@/utils/db";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const user = await getUser();

  if (!user) {
    return new Response(null, { status: 401 });
  }

  const questions = await getInterviewQuestions({
    id: params.id,
    council: user.council,
  });

  return new Response(JSON.stringify(questions));
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  const user = await getUser();

  if (!user) {
    return new Response(null, { status: 401 });
  }

  const data: {
    answers: {
      id: string;
      answer: string;
    }[];
    grade: string;
    notes: string;
  } = await req.json();

  for (const d of data.answers) {
    await prisma.answer.upsert({
      where: {
        questionId_interviewId: {
          interviewId: params.id,
          questionId: d.id,
        },
        interview: {
          delegate: {
            council: user.council,
          },
        },
      },
      create: {
        answer: d.answer,
        questionId: d.id,
        interviewId: params.id,
      },
      update: {
        answer: d.answer,
      },
    });
  }

  await prisma.interview.update({
    where: {
      id: params.id,
    },
    data: {
      grade: data.grade,
      notes: data.notes,
    },
  });

  return new Response("OK");
}
