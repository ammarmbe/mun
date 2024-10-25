import prisma from "@/utils/db";

export async function getUnreadNotificationCount({
  userId,
}: {
  userId: string;
}) {
  return prisma.notification.count({
    where: {
      userId,
      readAt: {
        equals: null,
      },
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
      readAt:
        type === "new"
          ? {
              equals: null,
            }
          : undefined,
    },
    select: {
      id: true,
      createdAt: true,
      title: true,
      body: true,
      interviewId: true,
      readAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  await prisma.notification.updateMany({
    where: {
      userId,
      readAt: {
        equals: null,
      },
    },
    data: {
      readAt: new Date(),
    },
  });

  return notifications;
}
