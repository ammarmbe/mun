/*
  Warnings:

  - You are about to drop the column `firstName` on the `Delegate` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Delegate` table. All the data in the column will be lost.
  - Added the required column `name` to the `Delegate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Delegate" DROP COLUMN "lastName";

ALTER TABLE "Delegate" RENAME COLUMN "firstName" TO "name";
