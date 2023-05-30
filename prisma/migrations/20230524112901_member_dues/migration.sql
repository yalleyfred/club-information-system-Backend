/*
  Warnings:

  - Added the required column `lionYear` to the `memberDuesPayments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "memberDuesPayments" ADD COLUMN     "lionYear" TEXT NOT NULL;
