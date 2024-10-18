import { $Enums } from "@prisma/client";
import prisma from "@/utils/db";

export async function getCouncilQuestions({
  council,
}: {
  council?: $Enums.Council | null;
}) {
  const data = await prisma.question.findMany({
    where: {
      council,
    },
    orderBy: {
      order: "asc",
    },
  });

  const canEdit = await prisma.setting.findUnique({
    where: {
      id: "canEditQuestions",
    },
  });

  const groupedQuestions = Object.groupBy(data, ({ council }) => council);

  if (!council) {
    // Add all keys to the object if they are not present
    Object.values($Enums.Council).forEach((council) => {
      if (!groupedQuestions[council]) {
        groupedQuestions[council] = [];
      }
    });
  } else {
    if (!groupedQuestions[council]) {
      groupedQuestions[council] = [];
    }
  }

  const questionsArray = Object.entries(groupedQuestions) as [
    $Enums.Council,
    {
      id: string;
      order: number;
      value: string;
      council: $Enums.Council;
      deletedAt: Date | null;
    }[],
  ][];

  return {
    questions: questionsArray,
    canEdit: canEdit?.value === "TRUE",
  };
}
