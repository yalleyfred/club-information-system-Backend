/*
  Warnings:

  - Added the required column `userId` to the `duesTypes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "duesTypes" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "duesTypes" ADD CONSTRAINT "duesTypes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
