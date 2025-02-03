/*
  Warnings:

  - You are about to drop the column `username` on the `user_profile` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "user_profile_username_key";

-- AlterTable
ALTER TABLE "user_profile" DROP COLUMN "username";
