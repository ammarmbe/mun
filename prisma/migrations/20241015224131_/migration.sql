/*
  Warnings:

  - You are about to drop the column `status` on the `Interview` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Interview" DROP COLUMN "status";

-- DropEnum
DROP TYPE "InterviewStatus";
