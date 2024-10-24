import { getUser } from "@/utils/auth";
import { getNotificationSettings } from "@/data/settings";
import prisma from "@/utils/db";

export async function GET() {
  const { user } = await getUser();

  if (!user) {
    return new Response(null, { status: 401 });
  }

  const settings = await getNotificationSettings({ userId: user.id });

  return new Response(JSON.stringify(settings));
}

export async function PATCH(req: Request) {
  const {
    value,
    subscription,
    type,
  }: { value: boolean; subscription?: string; type: "NEW" | "UPCOMING" } =
    await req.json();

  const { user } = await getUser();

  if (!user) {
    return new Response(null, { status: 401 });
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      newInterviewNotification: type === "NEW" ? value : undefined,
      upcomingInterviewNotification: type === "UPCOMING" ? value : undefined,
      notificationSubscription: subscription,
    },
  });

  return new Response("OK");
}
