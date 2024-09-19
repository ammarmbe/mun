-- CreateEnum
CREATE TYPE "Council" AS ENUM ('ECOSOC', 'ODC', 'UNSC', 'ICJ', 'ASAM', 'JDC');

-- CreateEnum
CREATE TYPE "DelegateStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "InterviewStatus" AS ENUM ('PENDING', 'STARTED', 'COMPLETED', 'MISSED', 'RESCHEDULED', 'CANCELLED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "council" "Council",
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "council" "Council" NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Delegate" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "faculty" TEXT NOT NULL,
    "council" "Council" NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT,
    "status" "DelegateStatus" NOT NULL,
    "interviewId" TEXT,

    CONSTRAINT "Delegate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interview" (
    "id" TEXT NOT NULL,
    "delegateId" TEXT NOT NULL,
    "userId" TEXT,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "status" "InterviewStatus" NOT NULL,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "interviewId" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Delegate_interviewId_key" ON "Delegate"("interviewId");

-- CreateIndex
CREATE UNIQUE INDEX "Interview_delegateId_key" ON "Interview"("delegateId");

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_delegateId_fkey" FOREIGN KEY ("delegateId") REFERENCES "Delegate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "Interview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
