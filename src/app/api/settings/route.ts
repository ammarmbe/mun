import { getUser } from "@/utils/auth";
import { getSettings } from "@/data/settings";
import prisma from "@/utils/db";

export async function GET() {
  const { user } = await getUser();

  if (!user) {
    return new Response(null, { status: 401 });
  }

  const settings = await getSettings();

  return new Response(JSON.stringify(settings));
}

export async function PATCH(req: Request) {
  const { user } = await getUser();

  if (!user || !user.admin) {
    return new Response(null, { status: 401 });
  }

  const data: NonNullable<Awaited<ReturnType<typeof getSettings>>> =
    await req.json();

  if (!data) {
    return new Response(null, { status: 400 });
  }

  await prisma.setting.deleteMany();

  await prisma.setting.createMany({
    data,
  });

  return new Response("OK");
}
