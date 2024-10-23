import prisma from "@/utils/db";

export async function getSettings() {
  return prisma.setting.findMany();
}
