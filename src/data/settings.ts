import prisma from "@/utils/db";

export async function getSettings() {
  return prisma.setting.findMany();
}

export async function getNotificationSettings({ userId }: { userId: string }) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      newInterviewNotification: true,
      upcomingInterviewNotification: true,
    },
  });
}
