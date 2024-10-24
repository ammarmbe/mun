-- AlterTable
ALTER TABLE "User" ADD COLUMN     "newInterviewNotification" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "notificationSubscription" TEXT,
ADD COLUMN     "upcomingInterviewNotification" BOOLEAN NOT NULL DEFAULT false;
