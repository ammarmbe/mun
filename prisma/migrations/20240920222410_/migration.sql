/*
  Warnings:

  - The values [STARTED,RESCHEDULED] on the enum `InterviewStatus` will be removed. If these variants are still used in the database, this will fail.
  - Changed the type of `faculty` on the `Delegate` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Faculty" AS ENUM ('ALSUN', 'BUSINESS', 'PHARMACY', 'ENGINEERING', 'CS', 'ARCHITECTURE', 'DENTISTRY', 'MASS_COM');

-- AlterEnum
BEGIN;
CREATE TYPE "InterviewStatus_new" AS ENUM ('PENDING', 'COMPLETED', 'MISSED', 'CANCELLED');
ALTER TABLE "Interview" ALTER COLUMN "status" TYPE "InterviewStatus_new" USING ("status"::text::"InterviewStatus_new");
ALTER TYPE "InterviewStatus" RENAME TO "InterviewStatus_old";
ALTER TYPE "InterviewStatus_new" RENAME TO "InterviewStatus";
DROP TYPE "InterviewStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "Delegate" DROP COLUMN "faculty",
ADD COLUMN     "faculty" "Faculty" NOT NULL;

-- CreateTable
CREATE TABLE "Settings" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "allowInterviewsFromDifferentCouncils" BOOLEAN NOT NULL DEFAULT false,
    "allowChangeQuestions" BOOLEAN NOT NULL DEFAULT false,
    "allowEditDelegateInfo" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);
