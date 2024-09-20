/*
  Warnings:

  - You are about to drop the column `time` on the `Interview` table. All the data in the column will be lost.
  - Changed the type of `date` on the `Interview` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Interview" DROP COLUMN "time",
DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
