/*
  Warnings:

  - The primary key for the `Answer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Answer` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Answer_questionId_interviewId_key";

-- AlterTable
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Answer_pkey" PRIMARY KEY ("questionId", "interviewId");
