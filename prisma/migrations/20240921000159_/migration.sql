/*
  Warnings:

  - You are about to drop the column `email` on the `Delegate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Delegate" DROP COLUMN "email",
ADD COLUMN     "universityId" TEXT;
