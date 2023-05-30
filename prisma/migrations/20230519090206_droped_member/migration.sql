-- AlterTable
ALTER TABLE "dropedMembers" ALTER COLUMN "dropedDate" SET DATA TYPE TEXT,
ALTER COLUMN "activatedDate" DROP NOT NULL,
ALTER COLUMN "activatedDate" SET DATA TYPE TEXT;
