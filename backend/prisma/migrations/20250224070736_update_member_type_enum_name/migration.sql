/*
  Warnings:

  - The `role` column on the `Member` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "MemberRoleEnum" AS ENUM ('ADMIN', 'MODERATOR', 'GUEST');

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "role",
ADD COLUMN     "role" "MemberRoleEnum" NOT NULL DEFAULT 'GUEST';

-- DropEnum
DROP TYPE "MemberRole";
