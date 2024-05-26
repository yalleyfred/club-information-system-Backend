/*
  Warnings:

  - You are about to drop the column `duesId` on the `memberDuesPayments` table. All the data in the column will be lost.
  - Added the required column `duesTypeId` to the `memberDuesPayments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "memberDuesPayments" DROP CONSTRAINT "memberDuesPayments_duesId_fkey";

-- AlterTable
ALTER TABLE "memberDuesPayments" DROP COLUMN "duesId",
ADD COLUMN     "duesTypeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "memberDuesPayments" ADD CONSTRAINT "memberDuesPayments_duesTypeId_fkey" FOREIGN KEY ("duesTypeId") REFERENCES "duesTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
