/*
  Warnings:

  - A unique constraint covering the columns `[clubId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "members" ALTER COLUMN "lionMemberId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "clubId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_clubId_key" ON "users"("clubId");
