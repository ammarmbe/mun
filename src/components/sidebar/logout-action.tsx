"use server";

import {
  deleteSessionTokenCookie,
  getUser,
  invalidateSessions,
} from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function logoutAction() {
  const { user } = await getUser();

  user && (await invalidateSessions(user.id));

  await deleteSessionTokenCookie();

  return redirect("/login");
}
