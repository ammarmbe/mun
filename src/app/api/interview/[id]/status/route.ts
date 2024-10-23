import { getUser } from "@/utils/auth";
import prisma from "@/utils/db";

export async function PATCH(req: Request) {
  const { user } = await getUser();

  if (!user) {
    return new Response(null, { status: 401 });
  }

  const { status, delegateId } = await req.json();

  const canAccess = await prisma.setting.findUnique({
    where: {
      id: "allowCrossCouncil",
    },
  });

  await prisma.delegate.update({
    where: {
      id: delegateId,
      council:
        canAccess || user.admin ? undefined : (user.council ?? undefined),
    },
    data: {
      status,
    },
  });

  return new Response("OK");
}
