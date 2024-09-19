"use server";

import * as v from "valibot";
import prisma from "@/utils/db";
import { createSession } from "@/utils/auth/session";

const schema = v.object({
  username: v.string("Username is required"),
  password: v.string("Password is required"),
});

type FormState = {
  errors: Record<keyof typeof schema.entries | "root", string>;
};

export default async function action(
  _: FormState | undefined,
  formData: FormData,
) {
  const data = v.safeParse(schema, {
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!data.success) {
    return {
      errors: Object.fromEntries(
        data.issues.map(({ path, message }) => [path?.[0]?.key, message]),
      ),
    } as FormState;
  }

  const user = await prisma.user.findUnique({
    where: {
      username: data.output.username,
      password: data.output.password,
    },
  });

  if (!user) {
    return {
      errors: {
        root: "Invalid username or password",
      },
    } as FormState;
  }

  await createSession(user.id);
}
