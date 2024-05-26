/*
  Warnings:

  - Added the required column `userId` to the `expenseTypes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `incometypes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "expenseTypes" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "incometypes" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "incometypes" ADD CONSTRAINT "incometypes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenseTypes" ADD CONSTRAINT "expenseTypes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
