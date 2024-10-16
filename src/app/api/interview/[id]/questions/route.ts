import { getUser } from "@/utils/auth";
import { getInterviewQuestions } from "@/data/interview";
import prisma from "@/utils/db";

export async function GET(_: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { user } = await getUser();

  if (!user) {
    return new Response(null, { status: 401 });
  }

  const questions = await getInterviewQuestions({
    id: params.id,
    council: user.admin ? undefined : user.council,
  });

  return new Response(JSON.stringify(questions));
}

export async function POST(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { user } = await getUser();

  if (!user) {
    return new Response(null, { status: 401 });
  }

  const data: {
    answers: {
      id: string;
      answer: string;
    }[];
    grade: string;
    universityId: string;
    notes: string;
  } = await req.json();

  for (const d of data.answers) {
    if (d.answer)
      await prisma.answer.upsert({
        where: {
          questionId_interviewId: {
            interviewId: params.id,
            questionId: d.id,
          },
          interview: {
            delegate: {
              council: user.admin ? undefined : user.council,
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

  const userId = await prisma.interview.findFirst({
    where: {
      id: params.id,
    },
    select: {
      userId: true,
    },
  });

  await prisma.interview.update({
    where: {
      id: params.id,
    },
    data: {
      grade: data.grade,
      notes: data.notes,
      user: {
        connect: {
          id: userId?.userId || user.id,
        },
      },
      delegate: {
        update: {
          universityId: data.universityId,
        },
      },
    },
  });

  return new Response("OK");
}
