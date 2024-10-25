import { getUser } from "@/utils/auth";
import prisma from "@/utils/db";

export async function GET() {
  const { user } = await getUser();

  return new Response(JSON.stringify(user));
}

export async function PATCH(req: Request) {
  const { firstName, lastName } = await req.json();

  const { user } = await getUser();

  if (!user) {
    return new Response(null, { status: 401 });
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      firstName,
      lastName,
    },
  });

  return new Response("OK");
}
