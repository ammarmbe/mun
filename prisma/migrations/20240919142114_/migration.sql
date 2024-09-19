/*
  Warnings:

  - You are about to drop the column `startTime` on the `Interview` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Interview" DROP COLUMN "startTime",
ADD COLUMN     "grade" TEXT;
