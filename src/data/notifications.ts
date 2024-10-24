import prisma from "@/utils/db";

export async function getUnreadNotificationCount({
  userId,
}: {
  userId: string;
}) {
  return prisma.notification.count({
    where: {
      userId,
      read: false,
    },
  });
}

export async function getNotifications({
  userId,
  type,
}: {
  userId: string;
  type: "all" | "new";
}) {
  const notifications = prisma.notification.findMany({
    where: {
      userId,
      read: type === "new" ? false : undefined,
    },
    select: {
      id: true,
      createdAt: true,
      title: true,
      body: true,
      interviewId: true,
      read: true,
    },
  });

  await prisma.notification.updateMany({
    where: {
      userId,
    },
    data: {
      read: true,
    },
  });

  return notifications;
}
