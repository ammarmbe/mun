import { $Enums } from "@prisma/client";
import prisma from "@/utils/db";
import groupBy from "object.groupby";

export async function getCouncilQuestions({
  council,
  admin,
}: {
  council?: $Enums.Council;
  admin: boolean;
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

  const groupedQuestions = groupBy(data, ({ council }) => council);

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
    canEdit: admin ? true : canEdit?.value === "TRUE",
  };
}
