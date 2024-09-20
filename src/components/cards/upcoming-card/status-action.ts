"use server";

import * as v from "valibot";
import prisma from "@/utils/db";
import { $Enums } from "@prisma/client";

const schema = v.object({
  id: v.string("Interview ID is required"),
  status: v.picklist(Object.values($Enums.InterviewStatus)),
});

type FormState = {
  errors: Record<keyof typeof schema.entries | "root", string>;
};

export default async function action(
  _: FormState | undefined,
  formData: FormData,
) {
  const data = v.safeParse(schema, {
    id: formData.get("id"),
    status: formData.get("status"),
  });

  if (!data.success) {
    return {
      errors: Object.fromEntries(
        data.issues.map(({ path, message }) => [path?.[0]?.key, message]),
      ),
    } as FormState;
  }

  await prisma.interview.update({
    where: {
      id: data.output.id,
    },
    data: {
      status: data.output.status,
    },
  });
}
