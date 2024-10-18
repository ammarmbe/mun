/*
  Warnings:

  - You are about to drop the column `allowChangeQuestions` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `allowEditDelegateInfo` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `allowInterviewsFromDifferentCouncils` on the `Settings` table. All the data in the column will be lost.
  - Added the required column `name` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Settings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE settings_id_seq;
ALTER TABLE "Settings" DROP COLUMN "allowChangeQuestions",
DROP COLUMN "allowEditDelegateInfo",
DROP COLUMN "allowInterviewsFromDifferentCouncils",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "value" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('settings_id_seq');
ALTER SEQUENCE settings_id_seq OWNED BY "Settings"."id";
