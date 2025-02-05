-- CreateEnum
CREATE TYPE "PreferredLanguageEnum" AS ENUM ('en', 'ar');

-- DropForeignKey
ALTER TABLE "user_profile" DROP CONSTRAINT "user_profile_id_fkey";

-- AlterTable
ALTER TABLE "user_profile" ADD COLUMN     "preferred_language" "PreferredLanguageEnum" NOT NULL DEFAULT 'en';

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_id_fkey" FOREIGN KEY ("id") REFERENCES "user_data"("id") ON DELETE CASCADE ON UPDATE CASCADE;
