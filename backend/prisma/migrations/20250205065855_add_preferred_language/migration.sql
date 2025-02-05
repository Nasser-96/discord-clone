/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `user_profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `user_profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_profile" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_user_id_key" ON "user_profile"("user_id");
