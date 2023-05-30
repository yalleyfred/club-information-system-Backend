/*
  Warnings:

  - Changed the type of `month` on the `activeMembers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Month" AS ENUM ('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');

-- AlterTable
ALTER TABLE "activeMembers" DROP COLUMN "month",
ADD COLUMN     "month" "Month" NOT NULL;
