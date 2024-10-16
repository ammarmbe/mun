"use server";

import * as v from "valibot";
import prisma from "@/utils/db";
import {
  createSession,
  generateSessionToken,
  setSessionTokenCookie,
} from "@/utils/auth";
import { redirect } from "next/navigation";

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

  const token = generateSessionToken();

  await createSession(token, user.id);

  setSessionTokenCookie(token, new Date(Date.now() + 1000 * 60 * 60 * 24 * 30));

  return redirect("/");
}
