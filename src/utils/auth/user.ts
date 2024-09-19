import "server-only";
import { cache } from "react";
import { verifySession } from "./session";
import prisma from "../db";

export const getUser = cache(async () => {
  const session = await verifySession();

  if (!session) return null;

  return await prisma.user.findUnique({
    where: {
      id: session.userId,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      council: true,
      admin: true,
    },
  });
});
