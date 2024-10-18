import { getUser } from "@/utils/auth";
import { getCouncilQuestions } from "@/data/council";
import prisma from "@/utils/db";
import { $Enums } from "@prisma/client";

export async function GET() {
  const { user } = await getUser();

  if (!user) {
    return new Response(null, { status: 401 });
  }

  const questions = await getCouncilQuestions({
    council: user.admin ? undefined : (user.council ?? undefined),
  });

  return new Response(JSON.stringify(questions));
}

export async function PATCH(req: Request) {
  const { user } = await getUser();

  if (!user) {
    return new Response(null, { status: 401 });
  }

  const data: NonNullable<
    Awaited<ReturnType<typeof getCouncilQuestions>>
  >["questions"] = await req.json();

  if (!data) {
    return new Response(null, { status: 400 });
  }

  for (let [council, questions] of data) {
    if (!user.admin && council !== user.council) {
      continue;
    }

    await prisma.question.updateMany({
      where: {
        council,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    questions = questions.filter((question) => question.value);

    for (const question of questions) {
      const res = await prisma.question.updateMany({
        where: {
          value: question.value,
          council,
        },
        data: {
          order: question.order,
          deletedAt: null,
        },
      });

      if (!res.count) {
        await prisma.question.create({
          data: {
            value: question.value,
            order: question.order,
            council,
          },
        });
      }
    }
  }

  return new Response("OK");
}
